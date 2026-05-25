/**
 * Q3 — Count Words With a Given Prefix
 * Difficulty: Easy
 * Expected:   O(L + K) time · O(L + K) space
 * Problem:    ../questions/03-count-prefix-words.md
 */

class Trie {
  constructor() {
    // TODO
  }
  insert(word)                   { /* TODO */ }
  countWordsWithPrefix(prefix)   { /* TODO: return count */ }
}

// ── quick tests ──────────────────────────────────────────────
const trie = new Trie();
["cat","car","cart","carpet","dog"].forEach(w => trie.insert(w));
console.log(trie.countWordsWithPrefix("ca")); // 4
console.log(trie.countWordsWithPrefix("z"));  // 0

module.exports = { Trie };
