/**
 * Q15 — Longest Consecutive Sequence
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/15-longest-consecutive.md
 */

function longestConsecutive(nums) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));           // 4
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));  // 9
console.log(longestConsecutive([]));                                 // 0
console.log(longestConsecutive([1, 2, 0, 1]));                      // 3

module.exports = { longestConsecutive };
