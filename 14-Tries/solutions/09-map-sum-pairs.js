/**
 * Q9 — Map Sum Pairs
 * Difficulty: Medium
 * Expected:   O(L) per operation · O(N × L) space
 * Problem:    ../questions/09-map-sum-pairs.md
 */

class MapSum {
  constructor() {
    // TODO
  }
  insert(key, val)   { /* TODO */ }
  sum(prefix)        { /* TODO: return sum of vals for keys starting with prefix */ }
}

// ── quick tests ──────────────────────────────────────────────
const ms = new MapSum();
ms.insert("apple", 3);
console.log(ms.sum("ap")); // 3
ms.insert("app", 2);
console.log(ms.sum("ap")); // 5

module.exports = { MapSum };
