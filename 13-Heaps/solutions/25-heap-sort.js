/**
 * Q25 — Heap Sort
 * Difficulty: Medium
 * Expected:   O(n log n) time · O(1) extra space
 * Problem:    ../questions/25-heap-sort.md
 */

function heapSort(nums) {
  // TODO: Phase 1 — build a max-heap in place using Floyd's bottom-up algorithm
  //   Loop from Math.floor(n/2)-1 down to 0, calling siftDownMax each step
  //
  // TODO: Phase 2 — extract elements one by one
  //   For i from n-1 down to 1:
  //     swap nums[0] and nums[i]
  //     call siftDownMax(nums, i, 0) to restore heap on the reduced range
}

// ── quick tests ──────────────────────────────────────────────
const a = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(heapSort(a)); // [1, 1, 2, 3, 4, 5, 6, 9]

const b = [5, 4, 3, 2, 1];
console.log(heapSort(b)); // [1, 2, 3, 4, 5]

console.log(heapSort([1]));         // [1]
console.log(heapSort([2, 2, 2]));   // [2, 2, 2]

module.exports = { heapSort };
