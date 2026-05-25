/**
 * Q14 — Stream of Characters
 * Difficulty: Medium
 * Expected:   O(N × L) build · O(L × 26) per query · O(N × L) space
 * Problem:    ../questions/14-stream-of-characters.md
 */

class StreamChecker {
  constructor(words) {
    // TODO: insert reversed words into trie
  }
  query(letter) {
    // TODO: return true if any word is a suffix of characters seen so far
  }
}

// ── quick tests ──────────────────────────────────────────────
const sc = new StreamChecker(["cd","f","kl"]);
console.log(sc.query('a')); // false
console.log(sc.query('d')); // false (need 'c' first)
// ... (after 'c' then 'd' it would return true)

module.exports = { StreamChecker };
