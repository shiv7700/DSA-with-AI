/**
 * Q13 — Last Stone Weight
 * Difficulty: Easy
 * Expected:   O(n log n) time · O(n) space
 * Problem:    ../questions/13-last-stone-weight.md
 */

function lastStoneWeight(stones) {
  // TODO: use a max-heap
  // Repeatedly pop the two heaviest stones, compute the remainder,
  // push it back if non-zero
  // Return the last remaining stone weight, or 0 if none remain
}

// ── quick tests ──────────────────────────────────────────────
console.log(lastStoneWeight([2, 7, 4, 1, 8, 1])); // 1
console.log(lastStoneWeight([1]));                  // 1
console.log(lastStoneWeight([1, 1]));               // 0

module.exports = { lastStoneWeight };
