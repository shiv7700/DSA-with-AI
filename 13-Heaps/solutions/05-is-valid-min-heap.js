/**
 * Q5 — Validate Min-Heap Array
 * Difficulty: Easy
 * Expected:   O(n) time · O(1) space
 * Problem:    ../questions/05-is-valid-min-heap.md
 */

function isValidMinHeap(arr) {
  // TODO: return true if arr satisfies the min-heap property, false otherwise
  // For every index i, check that arr[i] <= arr[2*i+1] and arr[i] <= arr[2*i+2]
  // (if those children exist)
}

// ── quick tests ──────────────────────────────────────────────
console.log(isValidMinHeap([1, 3, 2, 7, 5, 4, 6])); // true
console.log(isValidMinHeap([1, 3, 2, 7, 5, 4, 0])); // false (0 < parent 2)
console.log(isValidMinHeap([1]));                    // true
console.log(isValidMinHeap([]));                     // true

module.exports = { isValidMinHeap };
