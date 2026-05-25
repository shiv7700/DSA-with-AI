/**
 * Q8 — Add and Search Word (Wildcard `.`)
 * Difficulty: Medium
 * Expected:   O(L) addWord · O(26^M) worst-case search · O(N × L) space
 * Problem:    ../questions/08-add-search-word.md
 */

class WordDictionary {
  constructor() {
    // TODO
  }
  addWord(word)    { /* TODO */ }
  search(word)     { /* TODO: '.' matches any single letter */ }
}

// ── quick tests ──────────────────────────────────────────────
const wd = new WordDictionary();
wd.addWord("bad"); wd.addWord("dad"); wd.addWord("mad");
console.log(wd.search("pad")); // false
console.log(wd.search(".ad")); // true

module.exports = { WordDictionary };
