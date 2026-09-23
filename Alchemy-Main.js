import Alchemy from './Alchemy-Library.js';

// Basic combination
console.log(Alchemy.combine('one', 'two'));       // → "number_3"
console.log(Alchemy.combine('two', 'multiply'));  // → "number_2" (2 * 2)
console.log(Alchemy.combine('pi', 'power'));      // → null (needs two operands)

// Chained: discover 4, then square it
Alchemy.combine('one', 'three');                   // → "number_4"
Alchemy.combine('number_4', 'number_4');           // → "number_16"

// Custom recipe
Alchemy.register('golden_ratio', ['one', 'sqrt'], (1 + Math.sqrt(5)) / 2, '(1+√5)/2');
console.log(Alchemy.get('golden_ratio'));         // → { value: 1.618..., formula: '(1+√5)/2' }

console.log(Alchemy.stats());
// → { total: 20, base: 14, discovered: 6 }   
