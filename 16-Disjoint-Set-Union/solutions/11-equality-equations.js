/**
 * Q11 — Satisfiability of Equality Equations
 * Difficulty: Medium
 * Expected:   O(n · α(26)) = O(n) time · O(1) space
 * Problem:    ../questions/11-equality-equations.md
 */

function equationsPossible(equations) {
  // TODO: two passes — union equalities, check inequalities
}

// ── quick tests ──────────────────────────────────────────────
console.log(equationsPossible(["a==b","b!=c","b==c"])); // false
console.log(equationsPossible(["c==c","b==d","x!=z"])); // true

module.exports = { equationsPossible };
