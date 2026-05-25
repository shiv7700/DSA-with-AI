/**
 * Q28 — Kth Largest Element in a Stream
 * Difficulty: Easy
 * Expected:   add O(log k) · constructor O(n log k) · O(k) space
 * Problem:    ../questions/28-k-th-largest-in-stream.md
 */

class KthLargest {
  constructor(k, nums) {
    // TODO: store k, initialize a min-heap
    // Call this.add() for each number in nums
  }

  add(val) {
    // TODO: push val to the min-heap
    // If heap size exceeds k, pop the smallest (it can't be the k-th largest)
    // Return heap.peek() — the k-th largest element
  }
}

// ── quick tests ──────────────────────────────────────────────
const kl = new KthLargest(3, [4, 5, 8, 2]);
console.log(kl.add(3));  // 4
console.log(kl.add(5));  // 5
console.log(kl.add(10)); // 5
console.log(kl.add(9));  // 8
console.log(kl.add(4));  // 8

module.exports = { KthLargest };
