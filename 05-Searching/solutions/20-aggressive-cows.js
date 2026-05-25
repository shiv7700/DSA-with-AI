/**
 * Q20 — Aggressive Cows / Allocate Books
 * Difficulty: Hard
 * Expected:   O(n log(max_dist)) time · O(1) space
 * Problem:    ../questions/20-aggressive-cows.md
 */

// Part A: Aggressive Cows
// Place c cows in stalls to maximize the minimum distance between any two.
function aggressiveCows(stalls, c) {
  // TODO: your solution here
}

// Part B: Allocate Books
// Allocate n books to m students (contiguous, each student ≥ 1 book)
// to minimize the maximum pages any student reads.
function allocateBooks(pages, m) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(aggressiveCows([1, 2, 4, 8, 9], 3));         // 3
console.log(allocateBooks([12, 34, 67, 90], 2));          // 113

module.exports = { aggressiveCows, allocateBooks };
