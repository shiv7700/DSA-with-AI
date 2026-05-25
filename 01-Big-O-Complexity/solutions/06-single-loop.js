/**
 * Q6 — Identify the Complexity: Single Loop
 * Difficulty: Easy
 * Expected:   O(n) time · O(1) space
 * Problem:    ../questions/06-single-loop.md
 */

function printItems(arr) {
  for (let i = 0; i < arr.length; i++) {
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

// ── quick tests ──────────────────────────────────────────────
// printItems([10, 20, 30]);   // should print: 10  20  30

module.exports = { printItems };
