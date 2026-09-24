const readline = require('readline');

// ─── Universe Definition ───────────────────────────────────────────
const universe = {
  water:   { name: 'Water',   start: true,  combines: { fire: 'steam', earth: 'mud', air: 'mist', steam: 'cloud' } },
  fire:    { name: 'Fire',    start: true,  combines: { water: 'steam', earth: 'lava', air: 'smoke', lava: 'obsidian' } },
  earth:   { name: 'Earth',   start: true,  combines: { water: 'mud', fire: 'lava', air: 'dust', lava: 'stone', stone: 'mountain' } },
  air:     { name: 'Air',     start: true,  combines: { water: 'mist', fire: 'smoke', earth: 'dust', steam: 'cloud', cloud: 'rain' } },
  steam:   { name: 'Steam',   start: false, combines: { water: 'cloud', air: 'cloud', fire: 'ice' } },
  cloud:   { name: 'Cloud',   start: false, combines: { air: 'rain', water: 'rain', lightning: 'thunder' } },
  rain:    { name: 'Rain',    start: false, combines: { earth: 'mud', fire: 'steam', lightning: 'thunder' } },
  mud:     { name: 'Mud',     start: false, combines: { earth: 'clay', fire: 'brick', water: 'water' } },
  lava:    { name: 'Lava',    start: false, combines: { water: 'obsidian', earth: 'stone', fire: 'obsidian' } },
  stone:   { name: 'Stone',   start: false, combines: { earth: 'mountain', fire: 'glass', water: 'sand' } },
  mountain:{ name: 'Mountain',start: false, combines: { water: 'river', air: 'wind' } },
  river:   { name: 'River',   start: false, combines: { earth: 'delta', fire: 'valley' } },
  obsidian:{ name: 'Obsidian',start: false, combines: { fire: 'glass', stone: 'crystal' } },
  glass:   { name: 'Glass',   start: false, combines: { air: 'prism', water: 'ice' } },
  crystal: { name: 'Crystal', start: false, combines: { fire: 'diamond', water: 'ice' } },
  diamond: { name: 'Diamond', start: false, combines: {} },
  ice:     { name: 'Ice',     start: false, combines: { fire: 'water', wind: 'snow' } },
  snow:    { name: 'Snow',    start: false, combines: { earth: 'glacier', fire: 'water' } },
  wind:    { name: 'Wind',    start: false, combines: { fire: 'storm', earth: 'dust' } },
  storm:   { name: 'Storm',   start: false, combines: { cloud: 'lightning', wind: 'hurricane' } },
  lightning:{ name: 'Lightning', start: false, combines: { cloud: 'thunder', water: 'electricity' } },
  thunder: { name: 'Thunder', start: false, combines: {} },
  electricity:{ name: 'Electricity', start: false, combines: { glass: 'neon', crystal: 'plasma' } },
  neon:    { name: 'Neon',    start: false, combines: {} },
  plasma:  { name: 'Plasma',  start: false, combines: {} },
  sand:    { name: 'Sand',    start: false, combines: { fire: 'glass', water: 'stone' } },
  clay:    { name: 'Clay',    start: false, combines: { fire: 'brick', water: 'mud' } },
  brick:   { name: 'Brick',   start: false, combines: {} },
  dust:    { name: 'Dust',    start: false, combines: { water: 'mud', fire: 'ash' } },
  ash:     { name: 'Ash',     start: false, combines: { water: 'clay', earth: 'soil' } },
  soil:    { name: 'Soil',    start: false, combines: { water: 'mud', air: 'dust' } },
  mist:    { name: 'Mist',    start: false, combines: { air: 'cloud', fire: 'smoke' } },
  smoke:   { name: 'Smoke',   start: false, combines: { air: 'fog', fire: 'ash' } },
  fog:     { name: 'Fog',     start: false, combines: {} },
  valley:  { name: 'Valley',  start: false, combines: {} },
  delta:   { name: 'Delta',   start: false, combines: {} },
  glacier: { name: 'Glacier', start: false, combines: { water: 'river', fire: 'water' } },
  hurricane:{ name: 'Hurricane', start: false, combines: {} },
  prism:   { name: 'Prism',   start: false, combines: { fire: 'rainbow' } },
  rainbow: { name: 'Rainbow', start: false, combines: {} },
};

// ─── Engine State ──────────────────────────────────────────────────
const state = {
  discovered: {},
  undiscovered: {},
  attempts: 0,
  history: [],
};

// Initialize: split into discovered (start items) and undiscovered
for (const [id, el] of Object.entries(universe)) {
  if (el.start) {
    state.discovered[id] = { ...el, id };
  } else {
    state.undiscovered[id] = { ...el, id };
  }
}

// ─── Core Engine Logic ─────────────────────────────────────────────
function mix(a, b) {
  state.attempts++;
  const result = universe[a]?.combines?.[b] ?? universe[b]?.combines?.[a];

  if (!result) {
    state.history.push({ a, b, result: null });
    return { success: false, message: `${universe[a]?.name ?? a} + ${universe[b]?.name ?? b} → nothing happens.` };
  }

  if (state.discovered[result]) {
    state.history.push({ a, b, result });
    return { success: true, message: `${universe[a].name} + ${universe[b].name} → ${universe[result].name} (already discovered)` };
  }

  // New discovery!
  const el = state.undiscovered[result];
  delete state.undiscovered[result];
  state.discovered[result] = { ...el, id: result };
  state.history.push({ a, b, result });

  return {
    success: true,
    message: `✨ DISCOVERED: ${universe[a].name} + ${universe[b].name} → ${universe[result].name}!`,
    isNew: true,
  };
}

function getProgress() {
  const total = Object.keys(universe).length;
  const found = Object.keys(state.discovered).length;
  return { found, total, pct: Math.round((found / total) * 100) };
}

function listDiscovered() {
  return Object.keys(state.discovered).map(id => universe[id].name);
}

function listUndiscovered() {
  return Object.keys(state.undiscovered).map(id => universe[id].name);
}

// ─── CLI Interface ─────────────────────────────────────────────────
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function prompt() {
  const { found, total, pct } = getProgress();
  process.stdout.write(`\n[Alchemy ${found}/${total} (${pct}%)] > `);
  rl.question('', (input) => {
    const cmd = input.trim().toLowerCase();

    if (cmd === 'quit' || cmd === 'exit') {
      console.log(`\nFinal: ${found}/${total} elements discovered (${pct}%)`);
      rl.close();
      process.exit(0);
    }

    if (cmd === 'help') {
      console.log('  mix <a> <b>  — combine two elements (e.g. "mix fire water")');
      console.log('  list          — show discovered elements');
      console.log('  hints         — show undiscovered count');
      console.log('  progress      — show progress bar');
      console.log('  history       — show recent mixes');
      console.log('  quit          — exit');
      return prompt();
    }

    if (cmd === 'list') {
      console.log(listDiscovered().join(', '));
      return prompt();
    }

    if (cmd === 'hints') {
      const { found: f, total: t } = getProgress();
      console.log(`${t - f} elements remaining: ${listUndiscovered().join(', ')}`);
      return prompt();
    }

    if (cmd === 'progress') {
      const { found, total, pct } = getProgress();
      const bar = '█'.repeat(Math.floor(pct / 5)) + '░'.repeat(20 - Math.floor(pct / 5));
      console.log(`[${bar}] ${pct}% (${found}/${total})`);
      return prompt();
    }

    if (cmd === 'history') {
      const recent = state.history.slice(-10);
      recent.forEach(h => {
        const res = h.result ? universe[h.result].name : '—';
        console.log(`  ${universe[h.a]?.name ?? h.a} + ${universe[h.b]?.name ?? h.b} → ${res}`);
      });
      return prompt();
    }

    if (cmd.startsWith('mix ')) {
      const parts = cmd.split(/\s+/).slice(1);
      if (parts.length < 2) {
        console.log('Usage: mix <element1> <element2>');
        return prompt();
      }
      const [a, b] = parts;
      if (!universe[a]) return console.log(`Unknown element: "${a}"`) || prompt();
      if (!universe[b]) return console.log(`Unknown element: "${b}"`) || prompt();
      const result = mix(a, b);
      console.log(`\n  ${result.message}`);
      return prompt();
    }

    console.log('Unknown command. Type "help" for commands.');
    return prompt();
  });
}

// ─── Start ─────────────────────────────────────────────────────────
console.log('╔══════════════════════════════════════╗');
console.log('║       ⚗️  ALCHEMY ENGINE  ⚗️       ║');
console.log('╚══════════════════════════════════════╝');
console.log(`\nStarting elements: ${listDiscovered().join(', ')}`);
console.log('Type "help" for commands.\n');

prompt();   
