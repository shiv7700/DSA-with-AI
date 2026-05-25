/**
 * Q10 — Merge K Sorted Lists
 * Difficulty: Hard
 * Expected:   O(n log k) time · O(k) space
 * Problem:    ../questions/10-merge-k-sorted-lists.md
 */

function mergeKSortedLists(lists) {
  // TODO: use a min-heap seeded with the first element of each non-empty list
  // Each heap entry: { val, listIdx, elemIdx }
  // Pop the minimum, push the next element from the same list
}

// ── quick tests ──────────────────────────────────────────────
console.log(mergeKSortedLists([[1, 4, 5], [1, 3, 4], [2, 6]]));
// [1, 1, 2, 3, 4, 4, 5, 6]
console.log(mergeKSortedLists([]));   // []
console.log(mergeKSortedLists([[]])); // []

module.exports = { mergeKSortedLists };
