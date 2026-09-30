// mafia.js — single-file text-based mafia RPG (Node.js, no deps)
'use strict';
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const SAVE_FILE = path.join(__dirname, 'mafia_save.json');
const ENERGY_MAX = 100;
const ENERGY_REGEN_MS = 60_000; // 1 energy per minute

// ─── DATA ───────────────────────────────────────────────────────────────
const FACTIONS = [
  { id: 'corleone', name: 'Corleone Family', color: '\x1b[31m', desc: 'Old-school Sicilian mob. Disciplined, patient.' },
  { id: 'moretti',  name: 'Moretti Syndicate', color: '\x1b[33m', desc: 'Aggressive, flashy. They hit hard and often.' },
  { id: 'vito',     name: 'Vito Cartel', color: '\x1b[35m', desc: 'New money, new blood. Ruthless and unpredictable.' },
  { id: 'salieri',  name: 'Salieri Brotherhood', color: '\x1b[36m', desc: 'Intellectuals of the underworld. They plan three moves ahead.' },
];

const WEAPONS = [
  { id: 'fists',    name: 'Bare Fists',       atk: 0,  cost: 0 },
  { id: 'knife',    name: 'Switchblade',       atk: 5,  cost: 200 },
  { id: 'pistol',   name: '9mm Pistol',        atk: 12, cost: 800 },
  { id: 'smg',      name: 'SMG',               atk: 22, cost: 2500 },
  { id: 'shotgun',  name: 'Sawed-off Shotgun', atk: 30, cost: 5000 },
  { id: 'ak',       name: 'AK-47',             atk: 45, cost: 12000 },
  { id: 'sniper',   name: 'Sniper Rifle',      atk: 60, cost: 25000 },
];

const HEISTS = [
  { id: 'rob_store',   name: 'Rob a Bodega',      minLvl: 1,  energy: 10, reward: [200, 500],   xp: 15,  desc: 'Easy money. Low risk.' },
  { id: 'rob_bank',    name: 'Rob a Bank',        minLvl: 3,  energy: 25, reward: [1000, 3000], xp: 50,  desc: 'High stakes. They\'ll send goons.' },
  { id: 'fence',       name: 'Fence Stolen Goods',minLvl: 5,  energy: 15, reward: [800, 2000],  xp: 30,  desc: 'Quiet work. No heat.' },
  { id: 'rob_casino',  name: 'Rob a Casino',      minLvl: 7,  energy: 40, reward: [5000, 15000],xp: 120, desc: 'Big score. Security is tight.' },
  { id: 'extort',      name: 'Extort a Business', minLvl: 4,  energy: 20, reward: [500, 1500],  xp: 35,  desc: 'Knock on the door. Make them pay.' },
];

const ENEMY_NAMES = ['Tommy Two-Times','Vinnie the Knife','Sal "The Hammer" Marino',
  'Big Joe','Ricky the Rat','Frankie "Fingers" D\'Angelo','Lucky Charms',
  'Nino the Silent','Patsy "The Wrench"','Gino "The Ghost"','Bobby B',
  'Chico the Quick','Tony T','Dino "The Drill"','Mickey "Mickey" Malone'];

// ─── STATE ──────────────────────────────────────────────────────────────
function newPlayer(name) {
  return {
    name, faction: null, level: 1, xp: 0, xpNext: 100,
    hp: 100, hpMax: 100, energy: ENERGY_MAX, energyMax: ENERGY_MAX,
    money: 500, reputation: 0,
    weapon: 'fists', weapons: ['fists'],
    crew: [], crewMax: 1,
    kills: 0, heistsDone: 0,
    lastEnergy: Date.now(),
    lastDaily: new Date().toDateString(),
  };
}

function load() {
  try { return JSON.parse(fs.readFileSync(SAVE_FILE, 'utf8')); } catch { return null; }
}
function save(p) { fs.writeFileSync(SAVE_FILE, JSON.stringify(p, null, 2)); }
function regenEnergy(p) {
  const now = Date.now();
  const ticks = Math.floor((now - p.lastEnergy) / ENERGY_REGEN_MS);
  if (ticks > 0) {
    p.energy = Math.min(p.energyMax, p.energy + ticks);
    p.lastEnergy += ticks * ENERGY_REGEN_MS;
  }
}

// ─── HELPERS ────────────────────────────────────────────────────────────
const $ = (s) => console.log(s);
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const rand = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const weaponAtk = (p) => WEAPONS.find(w => w.id === p.weapon)?.atk || 0;
const isDaily = (p) => p.lastDaily !== new Date().toDateString();

function bar(cur, max, w = 20) {
  const filled = Math.round((cur / max) * w);
  return '[' + '█'.repeat(filled) + '░'.repeat(w - filled) + '] ' + cur + '/' + max;
}

function printStatus(p) {
  const fac = FACTIONS.find(f => f.id === p.faction);
  const w = WEAPONS.find(w => w.id === p.weapon);
  const reset = '\x1b[0m';
  $('\n' + '='.repeat(50));
  $('  \x1b[1m' + p.name + reset + '  |  Lv.' + p.level + '  |  Rep: ' + p.reputation);
  if (fac) $('  Faction: ' + fac.color + fac.name + reset);
  $('  HP:     ' + bar(p.hp, p.hpMax));
  $('  Energy: ' + bar(p.energy, p.energyMax));
  $('  Money:  $' + p.money.toLocaleString());
  $('  Weapon: ' + w.name + ' (ATK +' + w.atk + ')');
  $('  Crew:   ' + p.crew.length + '/' + p.crewMax);
  $('  Kills:  ' + p.kills + '  |  Heists: ' + p.heistsDone);
  $('  XP:     ' + p.xp + '/' + p.xpNext);
  $('  ' + (isDaily(p) ? '\x1b[32mDaily actions available!\x1b[0m' : 'Daily actions used.'));
  $('=' + '='.repeat(50) + '\n');
}

// ─── COMBAT ─────────────────────────────────────────────────────────────
function makeEnemy(p) {
  const lvl = Math.max(1, p.level + rand(-1, 1));
  const atk = 5 + lvl * 3 + weaponAtk(p) * 0.3;
  return {
    name: pick(ENEMY_NAMES), lvl,
    hp: 50 + lvl * 15, hpMax: 50 + lvl * 15,
    atk: Math.round(atk),
    money: rand(100, 300) * lvl,
    xp: 20 + lvl * 10,
  };
}

function combat(p, enemy) {
  let eHp = enemy.hp, pHp = p.hp;
  const pAtk = 10 + p.level * 3 + weaponAtk(p);
  const eAtk = enemy.atk;
  const rounds = [];

  while (eHp > 0 && pHp > 0) {
    const pDmg = Math.max(1, pAtk + rand(-3, 5) - Math.floor(eAtk / 4));
    const eDmg = Math.max(1, eAtk + rand(-3, 5) - Math.floor(pAtk / 4));
    eHp -= pDmg;
    rounds.push('  You hit ' + enemy.name + ' for ' + pDmg + ' dmg.');
    if (eHp <= 0) break;
    pHp -= eDmg;
    rounds.push('  ' + enemy.name + ' hits you for ' + eDmg + ' dmg.');
  }

  const won = eHp <= 0;
  rounds.push('');
  if (won) {
    const loot = enemy.money;
    rounds.push('\x1b[32m  VICTORY! You defeated ' + enemy.name + '! (' + enemy.lvl + ')\x1b[0m');
    rounds.push('  +$' + loot + '  +XP ' + enemy.xp);
    p.money += loot;
    p.kills++;
    p.reputation += 5;
    gainXp(p, enemy.xp);
  } else {
    rounds.push('\x1b[31m  DEFEAT... ' + enemy.name + ' got the best of you.\x1b[0m');
    const lost = Math.min(p.money, Math.floor(p.money * 0.1));
    p.money -= lost;
    rounds.push('  You lost $' + lost + ' in the scuffle.');
  }
  p.hp = Math.max(1, pHp);
  p.energy = Math.max(0, p.energy - 10);
  p.lastEnergy = Date.now();
  return rounds;
}

function gainXp(p, amt) {
  p.xp += amt;
  while (p.xp >= p.xpNext) {
    p.xp -= p.xpNext;
    p.level++;
    p.xpNext = Math.floor(p.xpNext * 1.4);
    p.hpMax += 10;
    p.hp = p.hpMax;
    p.energyMax += 5;
    p.energy = p.energyMax;
    p.crewMax += 1;
    console.log('\n\x1b[33m  ★ LEVEL UP! You are now level ' + p.level + '! ★\x1b[0m');
    console.log('  Max HP +' + 10 + ', Max Energy +' + 5 + ', Crew slot +1');
  }
}

// ─── ACTIONS ────────────────────────────────────────────────────────────
function doAttack(p) {
  if (p.energy < 10) { $('  Not enough energy! (need 10)'); return; }
  const enemy = makeEnemy(p);
  $('  \x1b[1m--- COMBAT ---\x1b[0m');
  $('  You encounter ' + enemy.name + ' (Lv.' + enemy.lvl + ', HP ' + enemy.hpMax + ')');
  for (const line of combat(p, enemy)) $(line);
  save(p);
}

function doHeist(p) {
  if (!isDaily(p)) { $('  Daily actions already used today.'); return; }
  $('  \x1b[1m--- HEISTS ---\x1b[0m');
  const available = HEISTS.filter(h => p.level >= h.minLvl);
  available.forEach((h, i) => {
    $('  ' + (i + 1) + '. ' + h.name + '  [Lv.' + h.minLvl + '+]  Energy: ' + h.energy +
      '  Reward: $' + h.reward[0] + '-' + h.reward[1] + '  XP: ' + h.xp);
    $('     ' + h.desc);
  });
  $('  0. Back');
  rl.question('\n  Choose a heist: ', (ans) => {
    const idx = parseInt(ans) - 1;
    if (idx < 0 || idx >= available.length) { mainMenu(p); return; }
    const h = available[idx];
    if (p.energy < h.energy) { $('  Not enough energy! (need ' + h.energy + ')'); mainMenu(p); return; }
    const success = Math.random() < (0.5 + p.level * 0.04);
    p.energy -= h.energy;
    p.lastEnergy = Date.now();
    if (success) {
      const reward = rand(h.reward[0], h.reward[1]);
      p.money += reward;
      p.heistsDone++;
      p.reputation += 10;
      gainXp(p, h.xp);
      $('  \x1b[32m  HEIST SUCCESS! You scored $' + reward + '! (+XP ' + h.xp + ')\x1b[0m');
    } else {
      const fine = rand(50, 200) * p.level;
      p.money = Math.max(0, p.money - fine);
      $('  \x1b[31m  HEIST FAILED! You got caught and paid a $' + fine + ' fine.\x1b[0m');
    }
    p.lastDaily = new Date().toDateString();
    save(p);
    mainMenu(p);
  });
}

function doRecruit(p) {
  if (p.crew.length >= p.crewMax) { $('  Crew is full (' + p.crewMax + ').'); return; }
  const cost = 500 * p.crew.length;
  if (p.money < cost) { $('  Not enough money. Need $' + cost + '.'); return; }
  const name = pick(ENEMY_NAMES);
  p.money -= cost;
  p.crew.push({ name, atk: 5 + p.level * 2 });
  $('  You recruited ' + name + ' for $' + cost + '. Crew: ' + p.crew.length + '/' + p.crewMax);
  save(p);
}

function doShop(p) {
  $('  \x1b[1m--- WEAPON SHOP ---\x1b[0m');
  WEAPONS.forEach((w, i) => {
    const owned = p.weapons.includes(w.id) ? ' [OWNED]' : '';
    const equipped = p.weapon === w.id ? ' [EQUIPPED]' : '';
    $('  ' + (i + 1) + '. ' + w.name + '  ATK +' + w.atk + '  $' + w.cost + owned + equipped);
  });
  $('  0. Back');
  rl.question('\n  Buy/equip (number) or 0: ', (ans) => {
    const idx = parseInt(ans) - 1;
    if (idx < 0 || idx >= WEAPONS.length) { mainMenu(p); return; }
    const w = WEAPONS[idx];
    if (p.weapons.includes(w.id)) {
      p.weapon = w.id;
      $('  Equipped ' + w.name + '.');
    } else if (p.money >= w.cost) {
      p.money -= w.cost;
      p.weapons.push(w.id);
      p.weapon = w.id;
      $('  Bought and equipped ' + w.name + '! (-$' + w.cost + ')');
    } else {
      $('  Not enough money. Need $' + w.cost + '.');
    }
    save(p);
    mainMenu(p);
  });
}

function doJoinFaction(p) {
  if (p.faction) { $('  You already belong to a faction.'); return; }
  $('  \x1b[1m--- JOIN A FACTION ---\x1b[0m');
  FACTIONS.forEach((f, i) => {
    $('  ' + (i + 1) + '. ' + f.color + f.name + '\x1b[0m  — ' + f.desc);
  });
  rl.question('\n  Choose (1-' + FACTIONS.length + '): ', (ans) => {
    const idx = parseInt(ans) - 1;
    if (idx < 0 || idx >= FACTIONS.length) { mainMenu(p); return; }
    p.faction = FACTIONS[idx].id;
    p.reputation += 20;
    const f = FACTIONS[idx];
    $('  \x1b[32m  Welcome to the ' + f.name + '! +20 Rep.\x1b[0m');
    save(p);
    mainMenu(p);
  });
}

function doRest(p) {
  if (p.hp >= p.hpMax) { $('  Already at full HP.'); return; }
  const heal = Math.floor(p.hpMax * 0.3);
  p.hp = Math.min(p.hpMax, p.hp + heal);
  p.energy = Math.max(0, p.energy - 5);
  p.lastEnergy = Date.now();
  $('  You rest up. +HP ' + heal + ' (-5 Energy)');
  save(p);
}

function doCrewInfo(p) {
  if (p.crew.length === 0) { $('  Your crew is empty. Recruit some muscle.'); return; }
  $('  \x1b[1m--- YOUR CREW ---\x1b[0m');
  p.crew.forEach((c, i) => $('  ' + (i + 1) + '. ' + c.name + ' (ATK ' + c.atk + ')'));
  $('  Total crew ATK bonus: +' + p.crew.reduce((s, c) => s + c.atk, 0));
}

function doStats(p) { printStatus(p); }

// ─── MENU ───────────────────────────────────────────────────────────────
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function mainMenu(p) {
  regenEnergy(p);
  printStatus(p);
  $('  \x1b[1mWhat do you want to do?\x1b[0m');
  $('  1. \x1b[31mAttack\x1b[0m (fight a rival)         7. \x1b[36mRecruit\x1b[0m crew member');
  $('  2. \x1b[33mHeist\x1b[0m (daily)                   8. \x1b[35mJoin Faction\x1b[0m');
  $('  3. \x1b[32mShop\x1b[0m (buy weapons)              9. \x1b[34mRest\x1b[0m (heal HP)');
  $('  4. \x1b[37mCrew\x1b[0m info                        0. \x1b[90mQuit & Save\x1b[0m');
  $('  5. \x1b[1mStats\x1b[0m');
  $('  6. \x1b[90mHelp\x1b[0m');
  rl.question('\n  > ', (ans) => {
    switch (ans.trim()) {
      case '1': doAttack(p); mainMenu(p); break;
      case '2': doHeist(p); break;
      case '3': doShop(p); break;
      case '4': doCrewInfo(p); mainMenu(p); break;
      case '5': doStats(p); mainMenu(p); break;
      case '6':
        $('  \x1b[90m  Attack: fight a rival for money & XP (costs 10 energy)\n' +
        '  Heist: daily action, pick a job for big rewards\n' +
        '  Shop: buy & equip weapons to boost your ATK\n' +
        '  Recruit: hire crew members (costs money, boosts crew ATK)\n' +
        '  Join Faction: pick a mob family (one-time, +20 rep)\n' +
        '  Rest: heal 30% max HP (costs 5 energy)\n' +
        '  Energy regenerates 1 per minute. Save is automatic.\x1b[0m');
        mainMenu(p); break;
      case '0':
        save(p);
        $('  \x1b[32mGame saved. See you around, boss.\x1b[0m');
        rl.close();
        process.exit(0);
        break;
      default: mainMenu(p);
    }
  });
}

// ─── START ──────────────────────────────────────────────────────────────
function start() {
  $('  ╔══════════════════════════════════════╗');
  $('  ║     \x1b[1mM A F I A   W A R S\x1b[0m              ║');
  $('  ║     Text-Based Crime RPG             ║');
  $('  ╚══════════════════════════════════════╝');
  const existing = load();
  if (existing) {
    $('  \x1b[36m  Save found: ' + existing.name + ' (Lv.' + existing.level + ')\x1b[0m');
    rl.question('  Continue? (y/n): ', (ans) => {
      if (ans.trim().toLowerCase() === 'y') {
        regenEnergy(existing);
        mainMenu(existing);
      } else {
        createChar();
      }
    });
  } else {
    createChar();
  }
}

function createChar() {
  rl.question('  What\'s your name, boss? ', (name) => {
    name = name.trim() || 'John Doe';
    const p = newPlayer(name);
    save(p);
    $('  \x1b[32m  Welcome to the streets, ' + name + '.\x1b[0m');
    $('  \x1b[90m  You start with $500, bare fists, and a dream.\x1b[0m');
    mainMenu(p);
  });
}

start();   