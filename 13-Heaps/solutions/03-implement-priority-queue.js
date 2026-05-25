/**
 * Q3 — Implement Generic PriorityQueue
 * Difficulty: Easy-Medium
 * Expected:   push O(log n) · pop O(log n) · peek O(1)
 * Problem:    ../questions/03-implement-priority-queue.md
 */

class PriorityQueue {
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.cmp = comparator;
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
    // TODO: use this.cmp for all comparisons
  }

  _siftDown(i) {
    // TODO: use this.cmp for all comparisons
  }
}

// ── quick tests ──────────────────────────────────────────────
const minPQ = new PriorityQueue();
minPQ.push(5); minPQ.push(2); minPQ.push(8); minPQ.push(1);
console.log(minPQ.pop()); // 1
console.log(minPQ.pop()); // 2

const maxPQ = new PriorityQueue((a, b) => b - a);
maxPQ.push(5); maxPQ.push(2); maxPQ.push(8);
console.log(maxPQ.pop()); // 8

const byDist = new PriorityQueue((a, b) => a.dist - b.dist);
byDist.push({ node: 'A', dist: 5 });
byDist.push({ node: 'B', dist: 2 });
console.log(byDist.pop()); // { node: 'B', dist: 2 }

module.exports = { PriorityQueue };
