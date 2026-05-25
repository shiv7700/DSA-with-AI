/**
 * Q2 — Implement MaxHeap
 * Difficulty: Easy
 * Expected:   push O(log n) · pop O(log n) · peek O(1)
 * Problem:    ../questions/02-implement-max-heap.md
 */

class MaxHeap {
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
}

// ── quick tests ──────────────────────────────────────────────
const h = new MaxHeap();
h.push(3); h.push(1); h.push(9); h.push(7);
console.log(h.peek()); // 9
console.log(h.pop());  // 9
console.log(h.pop());  // 7
console.log(h.size()); // 2

module.exports = { MaxHeap };
