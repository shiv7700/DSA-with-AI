/**
 * Q17 — Unique Paths III
 * Difficulty: Hard
 * Expected:   O(3^(m·n)) time · O(m·n) space
 * Problem:    ../questions/17-unique-paths-iii.md
 */

function uniquePathsIII(grid) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(uniquePathsIII([[1,0,0,0],[0,0,0,0],[0,0,2,-1]])); // 2
console.log(uniquePathsIII([[1,0,0,0],[0,0,0,0],[0,0,0,2]]));  // 4
console.log(uniquePathsIII([[0,1],[2,0]]));                      // 0

module.exports = { uniquePathsIII };
