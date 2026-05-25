/**
 * Q4 — Recurrence Analysis: T(n) = 7T(n/2) + n²
 * Difficulty: Easy (theory)
 * Expected:   Θ(n^(log₂ 7)) ≈ Θ(n^2.807)
 * Problem:    ../questions/04-recurrence-strassen.md
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
// Strassen vs naive: log2(7) ≈ 2.807 vs log2(8) = 3
console.log('log2(7) ≈', Math.log2(7).toFixed(3)); // 2.807

module.exports = {};
