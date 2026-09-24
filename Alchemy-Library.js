
const Alchemy = (() => {
  // ── Core State ──────────────────────────────────────────
  const discovered = new Map();   // name → { elements, value, formula }
  const recipes = new Map();      // "a+b" → result name
  const inventory = new Map();    // name → count

  // ── Element Registry ────────────────────────────────────
  const BASE_ELEMENTS = [
    { name: 'zero',     value: 0,            type: 'number' },
    { name: 'one',      value: 1,            type: 'number' },
    { name: 'two',      value: 2,            type: 'number' },
    { name: 'three',    value: 3,            type: 'number' },
    { name: 'ten',      value: 10,           type: 'number' },
    { name: 'add',      value: (a, b) => a + b, type: 'operator' },
    { name: 'subtract', value: (a, b) => a - b, type: 'operator' },
    { name: 'multiply', value: (a, b) => a * b, type: 'operator' },
    { name: 'divide',   value: (a, b) => b !== 0 ? a / b : NaN, type: 'operator' },
    { name: 'power',    value: (a, b) => a ** b, type: 'operator' },
    { name: 'pi',       value: Math.PI,      type: 'constant' },
    { name: 'e',        value: Math.E,       type: 'constant' },
    { name: 'sqrt',     value: (a) => Math.sqrt(a), type: 'function' },
    { name: 'factorial',value: (a) => fact(a), type: 'function' },
  ];

  function fact(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n <= 1) return 1;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  // ── Initialize ──────────────────────────────────────────
  function init() {
    for (const el of BASE_ELEMENTS) {
      discovered.set(el.name, { ...el, discovered: true });
      inventory.set(el.name, Infinity);
    }
  }

  // ── Combine ─────────────────────────────────────────────
  function combine(a, b) {
    const key = [a, b].sort().join('+');
    if (recipes.has(key)) {
      const resultName = recipes.get(key);
      return resultName;
    }
    // Try to compute a numeric result
    const ea = discovered.get(a);
    const eb = discovered.get(b);
    if (!ea || !eb) return null;

    // Operator + Number
    if (ea.type === 'operator' && eb.type === 'number') {
      return _tryNumeric(ea, eb, key, `${a}(${b})`);
    }
    if (eb.type === 'operator' && ea.type === 'number') {
      return _tryNumeric(eb, ea, key, `${b}(${a})`);
    }
    // Number + Number with implicit add
    if (ea.type === 'number' && eb.type === 'number') {
      return _tryNumeric({ value: (x, y) => x + y, type: 'operator' }, null, key, `${a}+${b}`, ea.value, eb.value);
    }
    // Function + Number
    if (ea.type === 'function' && eb.type === 'number') {
      return _tryNumeric(ea, null, key, `${a}(${b})`, eb.value);
    }
    if (eb.type === 'function' && ea.type === 'number') {
      return _tryNumeric(eb, null, key, `${b}(${a})`, ea.value);
    }
    return null;
  }

  function _tryNumeric(op, _unused, key, formula, valA, valB) {
    let result;
    if (typeof op.value === 'function') {
      if (valA !== undefined && valB !== undefined) {
        result = op.value(valA, valB);
      } else if (valA !== undefined) {
        result = op.value(valA);
      } else {
        return null;
      }
    } else {
      return null;
    }
    if (result === undefined || (typeof result === 'number' && !isFinite(result))) return null;

    const name = _resultName(result, formula);
    if (discovered.has(name)) return name;

    // Register new discovery
    discovered.set(name, { name, value: result, type: 'result', formula, discovered: true });
    inventory.set(name, 1);
    recipes.set(key, name);
    return name;
  }

  function _resultName(val, formula) {
    if (Number.isInteger(val)) return `number_${val}`;
    const rounded = Math.round(val * 1e6) / 1e6;
    return `number_${rounded}`;
  }

  // ── Query ───────────────────────────────────────────────
  function get(name) {
    return discovered.get(name) || null;
  }

  function list() {
    return [...discovered.values()].map(d => ({
      name: d.name,
      value: typeof d.value === 'function' ? d.type : d.value,
      formula: d.formula || null,
    }));
  }

  function has(name) {
    return discovered.has(name);
  }

  // ── Discover (manual recipe registration) ───────────────
  function register(name, elements, value, formula) {
    discovered.set(name, { name, value, formula, type: 'custom', discovered: true });
    inventory.set(name, 1);
    const key = [...elements].sort().join('+');
    recipes.set(key, name);
  }

  // ── Stats ───────────────────────────────────────────────
  function stats() {
    return {
      total: discovered.size,
      base: BASE_ELEMENTS.length,
      discovered: discovered.size - BASE_ELEMENTS.length,
    };
  }

  init();

  return { combine, get, list, has, register, stats, BASE_ELEMENTS };
})();

// ── Export ────────────────────────────────────────────────
if (typeof module !== 'undefined') module.exports = Alchemy;
export default Alchemy;   
