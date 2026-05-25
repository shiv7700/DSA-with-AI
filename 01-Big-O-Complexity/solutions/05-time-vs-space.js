/**
 * Q5 — Time Complexity vs Space Complexity
 * Difficulty: Easy (Conceptual)
 * Expected:   Written explanation — no executable code required
 * Problem:    ../questions/05-time-vs-space.md
 */

// Conceptual question — write your answer as a comment below.
//
// Explain the difference between time complexity and space complexity.
// Analyze the two functions below and state the time AND space complexity
// of each. Then explain the classic time-space trade-off.
//
// ── functions to analyze ─────────────────────────────────────

function sumArray(arr) {
  let total = 0;
  for (const x of arr) total += x;
  return total;
}
// Time: O(?)  because...
// Space: O(?) because...

function sumWithCopy(arr) {
  const copy = [...arr];
  let total = 0;
  for (const x of copy) total += x;
  return total;
}
// Time: O(?)  because...
// Space: O(?) because...

// ── your explanation ─────────────────────────────────────────
//
// Time complexity measures...
// Space complexity measures...
// The "extra space" rule: ...
//
// Time-space trade-off example:
//   ...
//
// (write here)

module.exports = { sumArray, sumWithCopy };
