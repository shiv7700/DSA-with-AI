/**
 * Q16 — Rat in a Maze
 * Difficulty: Medium
 * Expected:   O(4^(m·n)) time · O(m·n) space
 * Problem:    ../questions/16-rat-in-a-maze.md
 */

function findPath(maze) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
const maze1 = [[1,0,0,0],[1,1,0,1],[1,1,0,0],[0,1,1,1]];
console.log(findPath(maze1)); // ["DDRDRR","DRDDRR"]
console.log(findPath([[1,0],[1,0]])); // []

module.exports = { findPath };
