/**
 * Q21 — Build a Bit Trie for 32-bit Integers
 * Difficulty: Medium
 * Expected:   O(n × 32) time · O(n × 32) space
 * Problem:    ../questions/21-bit-trie-build.md
 */

class BitTrie {
  constructor() {
    // TODO
  }
  insert(num)    { /* TODO: insert 32-bit integer MSB first */ }
  search(num)    { /* TODO: return boolean */ }
  getMax()       { /* TODO: return maximum stored number */ }
  getMin()       { /* TODO: return minimum stored number */ }
}

// ── quick tests ──────────────────────────────────────────────
const bt = new BitTrie();
bt.insert(5); bt.insert(10); bt.insert(25);
console.log(bt.search(5));  // true
console.log(bt.search(7));  // false
console.log(bt.getMax());   // 25

module.exports = { BitTrie };
