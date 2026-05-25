/**
 * Q3 — Implement a Deque (double-ended queue)
 * Difficulty: Easy–Medium
 * Expected:   O(1) all four add/remove operations · O(n) space
 * Problem:    ../questions/03-implement-deque.md
 */

class Deque {
  constructor() {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────
const dq = new Deque();
dq.addBack(1); dq.addBack(2); dq.addFront(0);
console.log(dq.removeFront()); // 0
console.log(dq.removeBack());  // 2

module.exports = { Deque };
