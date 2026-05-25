/**
 * Q22 — Bulls and Cows
 * Difficulty: Medium
 * Expected:   O(n) time · O(1) space
 * Problem:    ../questions/22-bulls-and-cows.md
 */

function getHint(secret, guess) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(getHint('1807', '7810')); // '1A3B'
console.log(getHint('1123', '0111')); // '1A1B'
console.log(getHint('1', '1'));       // '1A0B'

module.exports = { getHint };
