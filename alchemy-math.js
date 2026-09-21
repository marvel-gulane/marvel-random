/*
 * alchemy-math.js
 * Native JavaScript — single-file mathematical transformation engine.
 *
 * No dependencies.
 *
 * Core idea:
 *     state -> formula -> transformed state -> evaluate -> repeat
 */

"use strict";

class AlchemyMath {
  constructor(value = 0) {
    this.value = value;
    this.history = [];
    this.variables = Object.create(null);

    this.constants = {
      PI: Math.PI,
      E: Math.E,
      PHI: (1 + Math.sqrt(5)) / 2,
      SQRT2: Math.sqrt(2),
      SQRT3: Math.sqrt(3)
    };

    this.functions = {
      abs: Math.abs,
      floor: Math.floor,
      ceil: Math.ceil,
      round: Math.round,
      sqrt: Math.sqrt,
      cbrt: Math.cbrt,
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
      asin: Math.asin,
      acos: Math.acos,
      atan: Math.atan,
      log: Math.log,
      log10: Math.log10,
      exp: Math.exp,
      pow: Math.pow,
      min: Math.min,
      max: Math.max,
      sign: Math.sign
    };
  }

  /* ---------------------------------------------------------
   * State
   * --------------------------------------------------------- */

  set(value) {
    this._record("set", this.value, value);
    this.value = value;
    return this;
  }

  get() {
    return this.value;
  }

  clone() {
    const copy = new AlchemyMath(this.value);
    copy.variables = { ...this.variables };
    copy.history = [...this.history];
    return copy;
  }

  variable(name, value) {
    this.variables[name] = value;
    return this;
  }

  getVariable(name) {
    if (name in this.variables) return this.variables[name];
    if (name in this.constants) return this.constants[name];
    throw new Error(`Unknown variable: ${name}`);
  }

  _record(operation, before, after, extra = null) {
    this.history.push({
      operation,
      before,
      after,
      extra,
      time: Date.now()
    });
  }

  /* ---------------------------------------------------------
   * Basic arithmetic
   * --------------------------------------------------------- */

  add(x) {
    const before = this.value;
    this.value += this._number(x);
    this._record("add", before, this.value, x);
    return this;
  }

  subtract(x) {
    const before = this.value;
    this.value -= this._number(x);
    this._record("subtract", before, this.value, x);
    return this;
  }

  multiply(x) {
    const before = this.value;
    this.value *= this._number(x);
    this._record("multiply", before, this.value, x);
    return this;
  }

  divide(x) {
    x = this._number(x);

    if (x === 0) {
      throw new Error("Division by zero.");
    }

    const before = this.value;
    this.value /= x;
    this._record("divide", before, this.value, x);
    return this;
  }

  modulo(x) {
    const before = this.value;
    this.value %= this._number(x);
    this._record("modulo", before, this.value, x);
    return this;
  }

  power(x) {
    const before = this.value;
    this.value **= this._number(x);
    this._record("power", before, this.value, x);
    return this;
  }

  negate() {
    const before = this.value;
    this.value = -this.value;
    this._record("negate", before, this.value);
    return this;
  }

  absolute() {
    const before = this.value;
    this.value = Math.abs(this.value);
    this._record("absolute", before, this.value);
    return this;
  }

  _number(x) {
    if (typeof x === "number") return x;

    if (typeof x === "function") {
      return Number(x(this.value, this));
    }

    if (typeof x === "string") {
      return this.evaluate(x, this.value);
    }

    const n = Number(x);

    if (!Number.isFinite(n)) {
      throw new Error(`Invalid number: ${x}`);
    }

    return n;
  }

  /* ---------------------------------------------------------
   * Formula evaluation
   *
   * Supported:
   *   x
   *   x + 2
   *   x * x
   *   sin(x)
   *   sqrt(x)
   *   arbitrary variables
   *
   * This evaluator intentionally uses a restricted expression
   * grammar rather than eval().
   * --------------------------------------------------------- */

  evaluate(expression, x = this.value) {
    if (typeof expression === "number") {
      return expression;
    }

    if (typeof expression === "function") {
      return Number(expression(x, this));
    }

    if (typeof expression !== "string") {
      throw new Error("Expression must be a string, number, or function.");
    }

    const tokens = this._tokenize(expression);
    let position = 0;

    const peek = () => tokens[position];

    const consume = (type) => {
      const token = tokens[position];

      if (!token || token.type !== type) {
        throw new Error(`Expected ${type}`);
      }

      position++;
      return token;
    };

    const parseExpression = () => {
      let value = parseTerm();

      while (peek()?.type === "+" || peek()?.type === "-") {
        const op = consume(peek().type).type;
        const right = parseTerm();
        value = op === "+" ? value + right : value - right;
      }

      return value;
    };

    const parseTerm = () => {
      let value = parsePower();

      while (
        peek()?.type === "*" ||
        peek()?.type === "/" ||
        peek()?.type === "%"
      ) {
        const op = consume(peek().type).type;
        const right = parsePower();

        if (op === "*") value *= right;
        if (op === "/") value /= right;
        if (op === "%") value %= right;
      }

      return value;
    };

    const parsePower = () => {
      let value = parseUnary();

      if (peek()?.type === "^") {
        consume("^");
        value = Math.pow(value, parsePower());
      }

      return value;
    };

    const parseUnary = () => {
      if (peek()?.type === "+") {
        consume("+");
        return parseUnary();
      }

      if (peek()?.type === "-") {
        consume("-");
        return -parseUnary();
      }

      return parsePrimary();
    };

    const parsePrimary = () => {
      const token = peek();

      if (!token) {
        throw new Error("Unexpected end of expression.");
      }

      if (token.type === "number") {
        consume("number");
        return token.value;
      }

      if (token.type === "identifier") {
        const name = consume("identifier").value;

        if (peek()?.type === "(") {
          consume("(");

          const args = [];

          if (peek()?.type !== ")") {
            args.push(parseExpression());

            while (peek()?.type === ",") {
              consume(",");
              args.push(parseExpression());
            }
          }

          consume(")");

          const fn = this.functions[name];

          if (!fn) {
            throw new Error(`Unknown function: ${name}`);
          }

          return fn(...args);
        }

        if (name === "x") return x;

        return this.getVariable(name);
      }

      if (token.type === "(") {
        consume("(");
        const value = parseExpression();
        consume(")");
        return value;
      }

      throw new Error(`Unexpected token: ${token.value}`);
    };

    const result = parseExpression();

    if (position !== tokens.length) {
      throw new Error("Unexpected token after expression.");
    }

    return result;
  }

  _tokenize(input) {
    const tokens = [];
    let i = 0;

    while (i < input.length) {
      const c = input[i];

      if (/\s/.test(c)) {
        i++;
        continue;
      }

      if (/[0-9.]/.test(c)) {
        let start = i;

        while (i < input.length && /[0-9.eE+-]/.test(input[i])) {
          if (
            (input[i] === "+" || input[i] === "-") &&
            i > start &&
            !/[eE]/.test(input[i - 1])
          ) {
            break;
          }

          i++;
        }

        const value = Number(input.slice(start, i));

        if (Number.isNaN(value)) {
          throw new Error(`Invalid number near ${input.slice(start, i)}`);
        }

        tokens.push({
          type: "number",
          value
        });

        continue;
      }

      if (/[A-Za-z_]/.test(c)) {
        let start = i;

        while (i < input.length && /[A-Za-z0-9_]/.test(input[i])) {
          i++;
        }

        tokens.push({
          type: "identifier",
          value: input.slice(start, i)
        });

        continue;
      }

      if ("+-*/%^(),".includes(c)) {
        tokens.push({
          type: c,
          value: c
        });

        i++;
        continue;
      }

      throw new Error(`Invalid character: ${c}`);
    }

    return tokens;
  }

  /* ---------------------------------------------------------
   * Formula transformation
   * --------------------------------------------------------- */

  apply(formula) {
    const before = this.value;

    const next =
      typeof formula === "function"
        ? formula(this.value, this)
        : this.evaluate(formula, this.value);

    if (typeof next !== "number" || Number.isNaN(next)) {
      throw new Error("Formula did not produce a valid number.");
    }

    this.value = next;

    this._record("formula", before, next, formula);

    return this;
  }

  repeat(formula, times = 1) {
    for (let i = 0; i < times; i++) {
      this.apply((x) => {
        if (typeof formula === "function") {
          return formula(x, this, i);
        }

        return this.evaluate(formula, x);
      });
    }

    return this;
  }

  until(formula, condition, maxIterations = 10000) {
    for (let i = 0; i < maxIterations; i++) {
      if (condition(this.value, i, this)) {
        return this;
      }

      this.apply((x) => {
        if (typeof formula === "function") {
          return formula(x, this, i);
        }

        return this.evaluate(formula, x);
      });
    }

    throw new Error("Maximum iteration count reached.");
  }

  /* ---------------------------------------------------------
   * Fixed-point iteration
   *
   * Finds x where:
   *
   *     f(x) ≈ x
   * --------------------------------------------------------- */

  fixedPoint(formula, tolerance = 1e-10, maxIterations = 10000) {
    for (let i = 0; i < maxIterations; i++) {
      const next =
        typeof formula === "function"
          ? formula(this.value, this)
          : this.evaluate(formula, this.value);

      if (Math.abs(next - this.value) <= tolerance) {
        this.value = next;
        return this;
      }

      this.value = next;
    }

    throw new Error("Fixed-point iteration did not converge.");
  }

  /* ---------------------------------------------------------
   * Newton-Raphson
   *
   * Solves f(x) = 0.
   * --------------------------------------------------------- */

  newton(formula, derivative = null, tolerance = 1e-10, maxIterations = 100) {
    let x = this.value;

    for (let i = 0; i < maxIterations; i++) {
      const f =
        typeof formula === "function"
          ? formula(x, this)
          : this.evaluate(formula, x);

      if (Math.abs(f) <= tolerance) {
        this.value = x;
        return this;
      }

      let df;

      if (derivative) {
        df =
          typeof derivative === "function"
            ? derivative(x, this)
            : this.evaluate(derivative, x);
      } else {
        df = this.derivative(formula, x);
      }

      if (df === 0) {
        throw new Error("Newton-Raphson encountered zero derivative.");
      }

      x = x - f / df;
    }

    throw new Error("Newton-Raphson did not converge.");
  }

  /* ---------------------------------------------------------
   * Numerical derivative
   * --------------------------------------------------------- */

  derivative(formula, x = this.value, h = 1e-7) {
    const f = (v) =>
      typeof formula === "function"
        ? formula(v, this)
        : this.evaluate(formula, v);

    return (f(x + h) - f(x - h)) / (2 * h);
  }

  /* ---------------------------------------------------------
   * Numerical integration
   * --------------------------------------------------------- */

  integrate(formula, a, b, steps = 1000) {
    if (steps <= 0) {
      throw new Error("Steps must be positive.");
    }

    const h = (b - a) / steps;
    let sum = 0;

    const f = (x) =>
      typeof formula === "function"
        ? formula(x, this)
        : this.evaluate(formula, x);

    for (let i = 0; i < steps; i++) {
      const x1 = a + i * h;
      const x2 = x1 + h;

      sum += (f(x1) + f(x2)) * h / 2;
    }

    return sum;
  }

  /* ---------------------------------------------------------
   * Binary search for f(x) = target
   * --------------------------------------------------------- */

  solveRange(
    formula,
    target,
    low,
    high,
    tolerance = 1e-10,
    maxIterations = 1000
  ) {
    const f = (x) =>
      (typeof formula === "function"
        ? formula(x, this)
        : this.evaluate(formula, x)) - target;

    let a = low;
    let b = high;

    let fa = f(a);
    let fb = f(b);

    if (Math.abs(fa) <= tolerance) return a;
    if (Math.abs(fb) <= tolerance) return b;

    if (fa * fb > 0) {
      throw new Error(
        "Range does not bracket a root. f(low) and f(high) must have opposite signs."
      );
    }

    for (let i = 0; i < maxIterations; i++) {
      const mid = (a + b) / 2;
      const fm = f(mid);

      if (Math.abs(fm) <= tolerance || Math.abs(b - a) <= tolerance) {
        return mid;
      }

      if (fa * fm < 0) {
        b = mid;
        fb = fm;
      } else {
        a = mid;
        fa = fm;
      }
    }

    return (a + b) / 2;
  }

  /* ---------------------------------------------------------
   * Generic search
   * --------------------------------------------------------- */

  search(start, next, goal, options = {}) {
    const {
      maxIterations = 10000,
      key = (x) => String(x)
    } = options;

    const queue = [start];
    const visited = new Set();

    while (queue.length > 0) {
      const current = queue.shift();
      const k = key(current);

      if (visited.has(k)) continue;
      visited.add(k);

      if (goal(current)) {
        return current;
      }

      const candidates = next(current);

      for (const candidate of candidates) {
        if (!visited.has(key(candidate))) {
          queue.push(candidate);
        }
      }

      if (visited.size >= maxIterations) break;
    }

    return null;
  }

  /* ---------------------------------------------------------
   * Optimization
   *
   * Simple hill-climbing minimization.
   * --------------------------------------------------------- */

  minimize(formula, start = this.value, step = 1, iterations = 1000) {
    const f = (x) =>
      typeof formula === "function"
        ? formula(x, this)
        : this.evaluate(formula, x);

    let x = start;
    let best = f(x);

    for (let i = 0; i < iterations; i++) {
      const left = x - step;
      const right = x + step;

      const leftValue = f(left);
      const rightValue = f(right);

      if (leftValue < best) {
        x = left;
        best = leftValue;
      } else if (rightValue < best) {
        x = right;
        best = rightValue;
      } else {
        step /= 2;

        if (step < 1e-12) break;
      }
    }

    this.value = x;

    return {
      x,
      value: best
    };
  }

  maximize(formula, start = this.value, step = 1, iterations = 1000) {
    return this.minimize(
      (x) => {
        const value =
          typeof formula === "function"
            ? formula(x, this)
            : this.evaluate(formula, x);

        return -value;
      },
      start,
      step,
      iterations
    );
  }

  /* ---------------------------------------------------------
   * Algebraic utilities
   * --------------------------------------------------------- */

  quadratic(a, b, c) {
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
      return {
        type: "complex",
        real: -b / (2 * a),
        imaginary: Math.sqrt(-discriminant) / Math.abs(2 * a)
      };
    }

    if (discriminant === 0) {
      return {
        type: "real",
        roots: [-b / (2 * a)]
      };
    }

    return {
      type: "real",
      roots: [
        (-b + Math.sqrt(discriminant)) / (2 * a),
        (-b - Math.sqrt(discriminant)) / (2 * a)
      ]
    };
  }

  gcd(a, b) {
    a = Math.abs(Math.trunc(a));
    b = Math.abs(Math.trunc(b));

    while (b !== 0) {
      [a, b] = [b, a % b];
    }

    return a;
  }

  lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / this.gcd(a, b);
  }

  factorial(n) {
    n = Math.trunc(n);

    if (n < 0) {
      throw new Error("Factorial requires n >= 0.");
    }

    let result = 1;

    for (let i = 2; i <= n; i++) {
      result *= i;
    }

    return result;
  }

  fibonacci(n) {
    n = Math.trunc(n);

    if (n < 0) {
      throw new Error("Fibonacci requires n >= 0.");
    }

    let a = 0;
    let b = 1;

    for (let i = 0; i < n; i++) {
      [a, b] = [b, a + b];
    }

    return a;
  }

  /* ---------------------------------------------------------
   * Vectors
   * --------------------------------------------------------- */

  vectorAdd(a, b) {
    if (a.length !== b.length) {
      throw new Error("Vector dimensions must match.");
    }

    return a.map((x, i) => x + b[i]);
  }

  vectorSubtract(a, b) {
    if (a.length !== b.length) {
      throw new Error("Vector dimensions must match.");
    }

    return a.map((x, i) => x - b[i]);
  }

  dot(a, b) {
    if (a.length !== b.length) {
      throw new Error("Vector dimensions must match.");
    }

    return a.reduce((sum, x, i) => sum + x * b[i], 0);
  }

  magnitude(vector) {
    return Math.sqrt(this.dot(vector, vector));
  }

  normalize(vector) {
    const magnitude = this.magnitude(vector);

    if (magnitude === 0) {
      throw new Error("Cannot normalize zero vector.");
    }

    return vector.map(x => x / magnitude);
  }

