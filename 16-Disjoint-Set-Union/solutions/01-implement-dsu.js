/**
 * Q1 — Implement DSU (with Path Compression + Union by Rank)
 * Difficulty: Easy (Foundation)
 * Expected:   O(α(n)) per operation · O(n) space
 * Problem:    ../questions/01-implement-dsu.md
 */

class DSU {
  constructor(n) {
    // TODO: initialize parent, rank, components
  }
  find(x)           { /* TODO: with path compression */ }
  union(x, y)       { /* TODO: union by rank, return true if merged */ }
  connected(x, y)   { /* TODO: return boolean */ }
}

// ── quick tests ──────────────────────────────────────────────
const dsu = new DSU(5);
console.log(dsu.connected(0, 1)); // false
dsu.union(0, 1);
console.log(dsu.connected(0, 1)); // true
dsu.union(1, 2);
console.log(dsu.connected(0, 2)); // true

module.exports = { DSU };
