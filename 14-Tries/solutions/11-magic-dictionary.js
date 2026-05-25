/**
 * Q11 — Implement Magic Dictionary
 * Difficulty: Medium
 * Expected:   O(N × L) build · O(26 × L) search · O(N × L) space
 * Problem:    ../questions/11-magic-dictionary.md
 */

class MagicDictionary {
  constructor() {
    // TODO
  }
  buildDict(words)   { /* TODO */ }
  search(query)      { /* TODO: true if exactly one char change matches a word */ }
}

// ── quick tests ──────────────────────────────────────────────
const md = new MagicDictionary();
md.buildDict(["hello","leetcode"]);
console.log(md.search("hello"));  // false (0 changes, not 1)
console.log(md.search("hhllo"));  // true  (1 change → "hello")

module.exports = { MagicDictionary };
