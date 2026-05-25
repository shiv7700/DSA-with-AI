/**
 * Q13 — Identify the Complexity: Two-Array Sequential Loops
 * Difficulty: Easy
 * Expected:   O(n + m) time · O(1) space
 * Problem:    ../questions/13-two-array-loops.md
 */

function twoLoops(arr1, arr2) {
  for (const a of arr1) console.log(a);
  for (const b of arr2) console.log(b);
}

// ── your complexity analysis ──────────────────────────────────
//
// Let n = arr1.length, m = arr2.length
//
// Time complexity: O(?)
//   Justification: ...
//   Common mistake to avoid: ...
//
// Space complexity: O(?)
//   Justification: ...

// ── quick tests ──────────────────────────────────────────────
// twoLoops([1, 2, 3], [10, 20]);
// Expected output: 1, 2, 3, 10, 20

module.exports = { twoLoops };
