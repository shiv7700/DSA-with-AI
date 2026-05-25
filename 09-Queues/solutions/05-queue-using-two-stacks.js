/**
 * Q5 — Implement a Queue Using Two Stacks
 * Difficulty: Easy
 * Expected:   O(1) amortized enqueue and dequeue · O(n) space
 * Problem:    ../questions/05-queue-using-two-stacks.md
 */

class MyQueue {
  constructor() {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────
const mq = new MyQueue();
mq.enqueue(1); mq.enqueue(2); mq.enqueue(3);
console.log(mq.dequeue()); // 1
console.log(mq.peek());    // 2

module.exports = { MyQueue };
