/**
 * Q6 — Recurrence Analysis: T(n) = T(n-1) + n
 * Difficulty: Easy (theory)
 * Expected:   Θ(n²)
 * Problem:    ../questions/06-recurrence-selection-sort.md
 */

/**
 * Write your analysis as a comment here.
 *
 * Note: Master Theorem does NOT apply (input shrinks by constant, not factor).
 * Expand manually: T(n) = n + (n-1) + ... + 1 = n(n+1)/2 = ?
 *
 * TODO: your analysis here
 */

// ── quick tests ──────────────────────────────────────────────
// T(5) manual: 5+4+3+2+1 = 15
console.log('T(5) =', 5 + 4 + 3 + 2 + 1); // 15

module.exports = {};
