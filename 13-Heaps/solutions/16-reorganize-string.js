/**
 * Q16 — Reorganize String
 * Difficulty: Medium
 * Expected:   O(n log 26) = O(n) time · O(1) space
 * Problem:    ../questions/16-reorganize-string.md
 */

function reorganizeString(s) {
  // TODO: count character frequencies
  // If any character appears more than Math.ceil(n/2) times, return ""
  // Use a max-heap by frequency, greedily placing the most frequent character
  // while holding back the previously placed character for one step
}

// ── quick tests ──────────────────────────────────────────────
console.log(reorganizeString("aab"));  // "aba"
console.log(reorganizeString("aaab")); // ""
console.log(reorganizeString("vvvlo")); // e.g. "vlvov"

module.exports = { reorganizeString };
