/**
 * Q7 — Convert Min-Heap to Max-Heap
 * Difficulty: Easy
 * Expected:   O(n) time · O(1) extra space
 * Problem:    ../questions/07-min-to-max-heap.md
 */

function minToMaxHeap(arr) {
  // TODO: convert arr (a valid min-heap) into a valid max-heap in place
  // Ignore the min-heap structure; apply Floyd's bottom-up algorithm
  // with a max-heap siftDown (track largest child, not smallest)
}

// ── quick tests ──────────────────────────────────────────────
console.log(minToMaxHeap([1, 3, 2, 7, 5, 4, 6])); // e.g. [7, 5, 6, 1, 3, 2, 4]
console.log(minToMaxHeap([1]));                    // [1]
console.log(minToMaxHeap([1, 2, 3, 4, 5, 6, 7])); // e.g. [7, 5, 6, 4, 2, 1, 3]

module.exports = { minToMaxHeap };
