/**
 * Q23 — IPO (Maximize Capital)
 * Difficulty: Hard
 * Expected:   O(n log n) time · O(n) space
 * Problem:    ../questions/23-ipo-maximize-capital.md
 */

function findMaximizedCapital(k, w, profits, capital) {
  // TODO: initialize a min-heap by capital requirement and a max-heap by profit
  // Repeat up to k times:
  //   Move all newly affordable projects (capital[i] <= w) to the profit max-heap
  //   If the profit heap is empty, break early
  //   Pick the most profitable project (pop from profit heap), add profit to w
  // Return w
}

// ── quick tests ──────────────────────────────────────────────
console.log(findMaximizedCapital(2, 0, [1,2,3], [0,1,1])); // 4
console.log(findMaximizedCapital(3, 0, [1,2,3], [0,1,2])); // 6
console.log(findMaximizedCapital(1, 0, [1,2,3], [1,1,2])); // 0

module.exports = { findMaximizedCapital };
