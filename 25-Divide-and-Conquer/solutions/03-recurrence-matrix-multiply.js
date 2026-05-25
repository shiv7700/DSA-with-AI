/**
 * Q3 — Recurrence Analysis: T(n) = 4T(n/2) + n
 * Difficulty: Easy (theory)
 * Expected:   Θ(n²)
 * Problem:    ../questions/03-recurrence-matrix-multiply.md
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
// T(4) manual: T(4) = 4*T(2) + 4 = 4*(4*1+2)+4 = 28
console.log('T(4) =', 4 * (4 * 1 + 2) + 4); // 28

module.exports = {};
