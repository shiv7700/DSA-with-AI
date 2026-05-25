/**
 * Q16 — Concatenated Words
 * Difficulty: Hard
 * Expected:   O(N × L²) time · O(N × L) space
 * Problem:    ../questions/16-concatenated-words.md
 */

function findAllConcatenatedWordsInADict(words) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(findAllConcatenatedWordsInADict(
  ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
)); // ["catsdogcats","dogcatsdog","ratcatdogcat"]

module.exports = { findAllConcatenatedWordsInADict };
