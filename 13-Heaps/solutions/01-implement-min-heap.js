/**
 * Q1 — Implement MinHeap
 * Difficulty: Easy (foundational)
 * Expected:   push O(log n) · pop O(log n) · peek O(1) · heapify O(n)
 * Problem:    ../questions/01-implement-min-heap.md
 */

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    // TODO: your solution here
  }

  peek() {
    // TODO: your solution here
  }

  push(val) {
    // TODO: your solution here
  }

  pop() {
    // TODO: your solution here
  }

  _siftUp(i) {
    // TODO: your solution here
  }

  _siftDown(i) {
    // TODO: your solution here
  }

  static heapify(arr) {
    // TODO: build heap from arr in O(n) using Floyd's algorithm
  }
}

// ── quick tests ──────────────────────────────────────────────
const h = new MinHeap();
h.push(5); h.push(3); h.push(8); h.push(1);
console.log(h.peek());  // 1
console.log(h.pop());   // 1
console.log(h.pop());   // 3
console.log(h.size());  // 2

const h2 = MinHeap.heapify([9, 4, 7, 1, 8, 3, 5]);
console.log(h2.peek()); // 1

module.exports = { MinHeap };
