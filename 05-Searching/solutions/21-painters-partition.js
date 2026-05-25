/**
 * Q21 — Painter's Partition Problem
 * Difficulty: Hard
 * Expected:   O(n log(sum)) time · O(1) space
 * Problem:    ../questions/21-painters-partition.md
 */

function paintersPartition(boards, k) {
  // TODO: your solution here
  // Assign contiguous boards to k painters to minimize the
  // maximum time any painter spends.
}

// ── quick tests ──────────────────────────────────────────────
console.log(paintersPartition([10, 20, 30, 40], 2));  // 60
console.log(paintersPartition([10, 20, 30, 40], 1));  // 100
console.log(paintersPartition([10, 20, 30, 40], 4));  // 40

module.exports = { paintersPartition };
