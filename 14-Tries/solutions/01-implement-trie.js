/**
 * Q1 — Implement a Trie (insert / search / startsWith)
 * Difficulty: Easy
 * Expected:   O(L) per operation · O(N × L) space total
 * Problem:    ../questions/01-implement-trie.md
 */

class Trie {
  constructor() {
    // TODO
  }
  insert(word)          { /* TODO */ }
  search(word)          { /* TODO: return boolean */ }
  startsWith(prefix)    { /* TODO: return boolean */ }
}

// ── quick tests ──────────────────────────────────────────────
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));    // true
console.log(trie.search("app"));      // false
console.log(trie.startsWith("app"));  // true

module.exports = { Trie };
