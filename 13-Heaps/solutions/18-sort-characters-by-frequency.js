/**
 * Q18 — Sort Characters by Frequency
 * Difficulty: Medium
 * Expected:   O(n log n) time · O(n) space
 * Problem:    ../questions/18-sort-characters-by-frequency.md
 */

function frequencySort(s) {
  // TODO: count character frequencies
  // Use a max-heap ordered by frequency
  // Pop each (freq, char) and append char.repeat(freq) to the result
}

// ── quick tests ──────────────────────────────────────────────
console.log(frequencySort("tree"));   // "eert" or "eetr"
console.log(frequencySort("cccaaa")); // "cccaaa" or "aaaccc"
console.log(frequencySort("Aabb"));   // "bbAa" or "bbaA"

module.exports = { frequencySort };
