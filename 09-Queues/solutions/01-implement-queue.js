/**
 * Q1 — Implement a Queue (linked-list backed)
 * Difficulty: Easy (foundational)
 * Expected:   O(1) enqueue · O(1) dequeue · O(n) space
 * Problem:    ../questions/01-implement-queue.md
 */

class Queue {
  constructor() {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────
const q = new Queue();
q.enqueue(10); q.enqueue(20); q.enqueue(30);
console.log(q.dequeue()); // 10
console.log(q.peek());    // 20

module.exports = { Queue };
