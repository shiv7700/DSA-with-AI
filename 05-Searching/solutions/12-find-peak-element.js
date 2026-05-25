/**
 * Q12 — Find Peak Element
 * Difficulty: Medium
 * Expected:   O(log n) time · O(1) space
 * Problem:    ../questions/12-find-peak-element.md
 */

function findPeakElement(nums) {
  // TODO: return the index of any peak element.
  // A peak is an element strictly greater than its neighbors.
}

// ── quick tests ──────────────────────────────────────────────
console.log(findPeakElement([1, 2, 3, 1]));           // 2
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // 1 or 5 (either valid)
console.log(findPeakElement([1]));                    // 0
console.log(findPeakElement([1, 2, 3, 4, 5]));       // 4

module.exports = { findPeakElement };
