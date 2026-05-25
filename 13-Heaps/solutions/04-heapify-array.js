/**
 * Q4 — Build a Heap from an Unsorted Array (Heapify)
 * Difficulty: Easy
 * Expected:   O(n) time · O(1) extra space
 * Problem:    ../questions/04-heapify-array.md
 */

function heapify(arr) {
  // TODO: rearrange arr in place into a valid min-heap using Floyd's algorithm
  // Start at the last non-leaf node (Math.floor(n/2) - 1) and sift down to 0
}

// ── quick tests ──────────────────────────────────────────────
console.log(heapify([9, 4, 7, 1, 8, 3, 5])); // valid min-heap, e.g. [1, 4, 3, 9, 8, 7, 5]
console.log(heapify([5]));                    // [5]
console.log(heapify([3, 1, 2]));              // [1, 3, 2]

module.exports = { heapify };
