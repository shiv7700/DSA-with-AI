/**
 * Q6 — Implement a Stack Using Two Queues
 * Difficulty: Easy
 * Expected:   O(n) push or O(n) pop · O(n) space
 * Problem:    ../questions/06-stack-using-two-queues.md
 */

class MyStack {
  constructor() {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────
const s = new MyStack();
s.push(1); s.push(2); s.push(3);
console.log(s.pop()); // 3
console.log(s.top()); // 2

module.exports = { MyStack };
