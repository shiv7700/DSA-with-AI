/**
 * Q2 — Count Total Words in a Trie
 * Difficulty: Easy
 * Expected:   O(N × L) time · O(N × L) space
 * Problem:    ../questions/02-count-words.md
 */

class Trie {
  constructor() {
    // TODO
  }
  insert(word)      { /* TODO */ }
  countWords()      { /* TODO: return number of distinct words */ }
}

// ── quick tests ──────────────────────────────────────────────
const trie = new Trie();
trie.insert("cat");
trie.insert("car");
trie.insert("cart");
trie.insert("dog");
console.log(trie.countWords()); // 4

module.exports = { Trie };
