/**
 * Q16 — How Does Array.prototype.sort Work in V8?
 * Difficulty: Medium (Conceptual + Practical)
 * Expected:   Written explanation + correct numeric sort
 * Problem:    ../questions/16-array-sort-algorithm.md
 */

// ── Part A: algorithm (write as a comment) ────────────────────
//
// V8 uses ______________ (name the algorithm).
//
// Time complexity:
//   Best case:    O(?)
//   Average case: O(?)
//   Worst case:   O(?)
//
// Space complexity: O(?)
//
// Brief description of how this algorithm works:
//   ...
//
// Is it stable (since which spec version)? ...
//
// (write here)

// ── Part B: the correctness pitfall ──────────────────────────

const nums = [10, 2, 1, 25, 5, 100, 3];

// Buggy sort — explain what it actually does:
// nums.sort();
// console.log(nums);   // What does this print? Why is it wrong?
//
// Explanation: ...

// Fixed sort:
function sortNumerically(arr) {
  // TODO: return a sorted copy of arr in ascending numeric order
  // Use the correct comparator — do not mutate the original
}

// ── quick tests ──────────────────────────────────────────────
// console.log(sortNumerically([10, 2, 1, 25, 5, 100, 3]));
// Expected: [1, 2, 3, 5, 10, 25, 100]

module.exports = { sortNumerically };
