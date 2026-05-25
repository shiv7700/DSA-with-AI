/**
 * Q11 — Implement Stack Using Queues
 * Difficulty: Medium
 * Expected:   push O(n) · pop O(1) (or vice versa) · O(n) space
 * Problem:    ../questions/11-stack-using-queues.md
 */

class MyStack {
  constructor() {
    // TODO: your solution here
    // Hint: use plain arrays as queues — shift() dequeues, push() enqueues
  }

  push(x) {
    // TODO: your solution here
  }

  pop() {
    // TODO: your solution here
  }

  top() {
    // TODO: your solution here
  }

  empty() {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────

const s = new MyStack();
s.push(1); s.push(2);
console.log(s.top());    // 2
console.log(s.pop());    // 2
console.log(s.empty());  // false

module.exports = { MyStack };
