/**
 * Q9 — Identify the Complexity: Halving Loop
 * Difficulty: Easy–Medium
 * Expected:   O(log n) time · O(1) space
 * Problem:    ../questions/09-halving-loop.md
 */

function logHalf(n) {
  for (let i = n; i > 0; i = Math.floor(i / 2)) {
    console.log(i);
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
// logHalf(16);   // 16, 8, 4, 2, 1  (5 steps)
// logHalf(32);   // 32, 16, 8, 4, 2, 1  (6 steps)
// logHalf(1024); // 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1  (11 steps)

module.exports = { logHalf };
