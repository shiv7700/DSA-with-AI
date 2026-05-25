/**
 * Q5 — Print All Words Stored in a Trie
 * Difficulty: Easy
 * Expected:   O(N × L) time · O(N × L) space
 * Problem:    ../questions/05-print-all-words.md
 */

class Trie {
  constructor() {
    // TODO
  }
  insert(word)    { /* TODO */ }
  getAllWords()    { /* TODO: return string[] in lexicographic order */ }
}

// ── quick tests ──────────────────────────────────────────────
const trie = new Trie();
["cat","car","cart","dog"].forEach(w => trie.insert(w));
console.log(trie.getAllWords()); // ["car","cart","cat","dog"]

module.exports = { Trie };
