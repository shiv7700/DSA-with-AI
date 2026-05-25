/**
 * Q31 — LRU Cache
 * Difficulty: Hard
 * Expected:   O(1) get and put · O(capacity) space
 * Problem:    ../questions/31-lru-cache.md
 */

class LRUCache {
  constructor(capacity) {
    // TODO: your solution here
  }

  get(key) {
    // TODO: your solution here
  }

  put(key, value) {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────
const cache = new LRUCache(2);
cache.put(1, 1); cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3);           // evicts key 2
console.log(cache.get(2)); // -1

module.exports = { LRUCache };
