/**
 * Q24 — Permutation in String
 * Difficulty: Medium
 * Expected:   O(n) time · O(k) space
 * Problem:    ../questions/24-permutation-in-string.md
 */

function checkInclusion(s1, s2) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(checkInclusion('ab', 'eidbaooo'));  // true
console.log(checkInclusion('ab', 'eidboaoo'));  // false
console.log(checkInclusion('adc', 'dcda'));     // true

module.exports = { checkInclusion };
