/**
 * Q18 — Couples Holding Hands
 * Difficulty: Medium
 * Expected:   O(n · α(n)) time · O(n) space
 * Problem:    ../questions/18-couples-holding-hands.md
 */

function minSwapsCouples(row) {
  // TODO: union couples sharing a bench; answer = n - components
}

// ── quick tests ──────────────────────────────────────────────
console.log(minSwapsCouples([0,2,1,3]));       // 1
console.log(minSwapsCouples([3,2,0,1]));       // 0
console.log(minSwapsCouples([5,4,2,6,3,1,0,7])); // 2

module.exports = { minSwapsCouples };
