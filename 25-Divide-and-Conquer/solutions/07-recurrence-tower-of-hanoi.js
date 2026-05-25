/**
 * Q7 — Recurrence Analysis: T(n) = 2T(n-1) + 1
 * Difficulty: Easy/Medium (theory)
 * Expected:   Θ(2^n)
 * Problem:    ../questions/07-recurrence-tower-of-hanoi.md
 */

/**
 * Write your analysis as a comment here.
 *
 * Note: Master Theorem does NOT apply (input shrinks by constant, not factor).
 * Expand manually: T(n) = 2^(n-1) + 2^(n-2) + ... + 1 = 2^n - 1 = ?
 *
 * TODO: your analysis here
 */

// ── quick tests ──────────────────────────────────────────────
// T(3) = 7 moves, T(4) = 15 moves
console.log('T(3) =', Math.pow(2, 3) - 1); // 7

module.exports = {};
