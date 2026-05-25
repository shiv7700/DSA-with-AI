/**
 * Q35 — 24 Game
 * Difficulty: Hard
 * Expected:   O(1) time (fixed 4-card input) · O(1) space
 * Problem:    ../questions/35-24-game.md
 */

function judgePoint24(cards) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(judgePoint24([4, 1, 8, 7])); // true  — (8-4)*(7-1)
console.log(judgePoint24([1, 2, 1, 2])); // false

module.exports = { judgePoint24 };
