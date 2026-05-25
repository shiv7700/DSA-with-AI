/**
 * Q2 — Implement a Circular Queue (fixed-size ring)
 * Difficulty: Easy–Medium
 * Expected:   O(1) enqueue · O(1) dequeue · O(capacity) space
 * Problem:    ../questions/02-implement-circular-queue.md
 */

class CircularQueue {
  constructor(capacity) {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────
const cq = new CircularQueue(3);
cq.enqueue(1); cq.enqueue(2); cq.enqueue(3);
console.log(cq.isFull());  // true
console.log(cq.dequeue()); // 1

module.exports = { CircularQueue };
