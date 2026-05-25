/**
 * Q7 — Identify the Complexity: Nested Loops
 * Difficulty: Easy
 * Expected:   O(n²) time · O(1) space
 * Problem:    ../questions/07-nested-loops.md
 */

function printPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}

// ── your complexity analysis ──────────────────────────────────
//
// Time complexity: O(?)
//   Justification: ...
//
// Space complexity: O(?)
//   Justification: ...

// ── quick tests ──────────────────────────────────────────────
// printPairs([1, 2, 3]);
// Expected: (1,1) (1,2) (1,3) (2,1) (2,2) (2,3) (3,1) (3,2) (3,3) — 9 pairs for n=3

module.exports = { printPairs };
