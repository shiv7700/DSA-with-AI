/**
 * Q24 — Knight's Tour
 * Difficulty: Hard
 * Expected:   O(8^(n²)) time naive; O(n²) with Warnsdorff's heuristic
 * Problem:    ../questions/24-knights-tour.md
 */

function knightsTour(n) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
const tour5 = knightsTour(5);
if (tour5.length > 0) {
  console.log("n=5 tour move 1 at:", JSON.stringify(tour5.map(r => r.indexOf(1))));
}
console.log("n=1:", JSON.stringify(knightsTour(1))); // [[1]]

module.exports = { knightsTour };
