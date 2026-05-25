/**
 * Q1 — Linear Search
 * Difficulty: Easy
 * Expected:   O(n) time · O(1) space
 * Problem:    ../questions/01-linear-search.md
 */

function linearSearch(arr, target) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(linearSearch([14, 3, 27, 8, 42], 27));  // 2
console.log(linearSearch([5, 10, 15, 20], 7));       // -1
console.log(linearSearch([4, 9, 4, 3, 4], 4));       // 0 (first occurrence)
console.log(linearSearch([], 1));                    // -1

module.exports = { linearSearch };
