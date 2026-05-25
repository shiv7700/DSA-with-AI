/**
 * Q8 — Identify the Complexity: Fixed Cap Loop
 * Difficulty: Easy
 * Expected:   O(1) time · O(1) space
 * Problem:    ../questions/08-fixed-cap-loop.md
 */

function printFirstTen(arr) {
  for (let i = 0; i < 10 && i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// ── your complexity analysis ──────────────────────────────────
//
// Time complexity: O(?)
//   Justification: ...
//
// Space complexity: O(?)
//   Justification: ...
//
// Key insight: ...

// ── quick tests ──────────────────────────────────────────────
// printFirstTen([1,2,3,4,5,6,7,8,9,10,11,12]);   // prints 1 through 10 only
// printFirstTen([1,2,3]);                          // prints 1, 2, 3 (only 3 elements)

module.exports = { printFirstTen };
