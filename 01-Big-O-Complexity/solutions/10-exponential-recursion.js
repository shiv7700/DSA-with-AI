/**
 * Q10 — Identify the Complexity: Exponential Recursion
 * Difficulty: Medium
 * Expected:   O(2ⁿ) time · O(n) space
 * Problem:    ../questions/10-exponential-recursion.md
 */

function mystery(n) {
  if (n <= 1) return 1;
  return mystery(n - 1) + mystery(n - 1);
}

// ── your complexity analysis ──────────────────────────────────
//
// Time complexity: O(?)
//   Justification: ...
//   (Hint: draw the call tree for mystery(4) and count total calls)
//
// Space complexity: O(?)
//   Justification: ...
//   (Hint: the call stack depth at any moment is at most ?)

// ── quick tests ──────────────────────────────────────────────
// console.log(mystery(1));   // 1
// console.log(mystery(4));   // 8
// console.log(mystery(5));   // 16
// console.log(mystery(10));  // 512
// ⚠️  Do NOT test mystery(40) or above — it will freeze your process

module.exports = { mystery };
