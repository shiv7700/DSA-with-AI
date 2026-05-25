/**
 * Q1 — Recurrence Analysis: T(n) = 2T(n/2) + n
 * Difficulty: Easy (theory)
 * Expected:   Θ(n log n)
 * Problem:    ../questions/01-recurrence-merge-sort.md
 */

/**
 * Write your analysis as a comment here.
 *
 * a = ?   b = ?   f(n) = ?
 * c = log_b(a) = ?
 * Master Theorem case: ?
 * Closed-form: T(n) = ?
 *
 * TODO: your analysis here
 */

// ── quick tests ──────────────────────────────────────────────
// T(4) manual: T(4) = 2*T(2) + 4 = 2*(2*1+2) + 4 = 12
console.log('T(4) =', 2 * (2 * 1 + 2) + 4); // 12

module.exports = {};
