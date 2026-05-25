/**
 * Q22 — Bricks Falling When Hit
 * Difficulty: Hard
 * Expected:   O((m·n + hits.length) · α(m·n)) time · O(m·n) space
 * Problem:    ../questions/22-bricks-falling.md
 */

function hitBricks(grid, hits) {
  // TODO: reverse time — start from final state, add bricks back
  // Virtual roof node; measure roof component size change per step
}

// ── quick tests ──────────────────────────────────────────────
console.log(hitBricks([[1,0,0,0],[1,1,1,0]], [[1,0]]));       // [2]
console.log(hitBricks([[1,0,0,0],[1,1,0,0]], [[1,1],[1,0]])); // [0,0]

module.exports = { hitBricks };
