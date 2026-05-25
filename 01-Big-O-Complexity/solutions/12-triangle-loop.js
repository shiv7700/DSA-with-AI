/**
 * Q12 — Identify the Complexity: Triangle Loop
 * Difficulty: Medium
 * Expected:   O(n²) time · O(1) space
 * Problem:    ../questions/12-triangle-loop.md
 */

function nestedLog(n) {
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      console.log(i, j);
    }
  }
}

// ── your complexity analysis ──────────────────────────────────
//
// Time complexity: O(?)
//   Total iterations when traced:
//     i=0: (n) iterations
//     i=1: (n-1) iterations
//     ...
//     i=n-1: 1 iteration
//   Sum = ?
//   After simplification: O(?)
//
// Space complexity: O(?)
//   Justification: ...
//
// Key insight: even though the inner loop doesn't always run n times,
// the total work is still...

// ── quick tests ──────────────────────────────────────────────
// Count iterations manually for n=4:
// nestedLog(4);
// Expected: 4 + 3 + 2 + 1 = 10 pairs printed

module.exports = { nestedLog };
