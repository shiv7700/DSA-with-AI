/**
 * Q0 — Implement a HashMap from Scratch
 * Difficulty: Medium
 * Expected:   O(1) average per operation · O(n) space
 * Problem:    ../questions/00-implement-hashmap.md
 */

class HashMap {
  constructor(size = 53) {
    this.keyMap = new Array(size);
    this._count = 0;
  }

  _hash(key) {
    // TODO: polynomial rolling hash
    // Return an integer in [0, this.keyMap.length - 1]
  }

  set(key, value) {
    // TODO: separate chaining insert/update
    // Increment this._count only for new keys (not updates)
  }

  get(key) {
    // TODO: return value for key, or undefined
  }

  delete(key) {
    // TODO: remove key, decrement count, return true/false
  }

  has(key) {
    // TODO: return true if key exists
  }

  keys() {
    // TODO: return array of all unique keys
  }

  values() {
    // TODO: return array of all values
  }

  get size() {
    return this._count;
  }

  // ── Stretch: resize when load factor > 0.75 ──────────────
  _resize() {
    // TODO: double the bucket array and rehash all entries
  }
}

// ── quick tests ──────────────────────────────────────────────
const map = new HashMap();
map.set('name', 'Alice');
map.set('age', 30);
map.set('name', 'Bob');

console.log(map.get('name'));  // 'Bob'
console.log(map.get('city'));  // undefined
console.log(map.has('age'));   // true
console.log(map.size);         // 2

map.delete('age');
console.log(map.has('age'));   // false
console.log(map.keys());       // ['name']

module.exports = { HashMap };
