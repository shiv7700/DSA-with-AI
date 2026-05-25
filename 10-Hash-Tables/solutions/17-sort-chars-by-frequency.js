/**
 * Q17 — Sort Characters by Frequency
 * Difficulty: Medium
 * Expected:   O(n log n) time · O(n) space
 * Problem:    ../questions/17-sort-chars-by-frequency.md
 */

function frequencySort(s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(frequencySort('tree'));   // 'eert' or 'eetr'
console.log(frequencySort('cccaaa')); // 'cccaaa' or 'aaaccc'
console.log(frequencySort('Aabb'));   // 'bbAa' or 'bbaA'

module.exports = { frequencySort };
