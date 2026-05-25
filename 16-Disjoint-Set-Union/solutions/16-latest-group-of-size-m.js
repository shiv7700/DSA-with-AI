/**
 * Q16 — Find Latest Group of Size M
 * Difficulty: Medium
 * Expected:   O(n · α(n)) time · O(n) space
 * Problem:    ../questions/16-latest-group-of-size-m.md
 */

function findLatestStep(arr, m) {
  // TODO: DSU with size tracking + countM counter
}

// ── quick tests ──────────────────────────────────────────────
console.log(findLatestStep([3,5,1,2,4], 1)); // 4
console.log(findLatestStep([3,1,5,4,2], 2)); // -1

module.exports = { findLatestStep };
