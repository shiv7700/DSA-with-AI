/**
 * Q9 — Min Stack
 * Difficulty: Medium
 * Expected:   O(1) per operation · O(n) space
 * Problem:    ../questions/09-min-stack.md
 */

class MinStack {
  constructor() {
    // TODO: your solution here
  }

  push(val) {
    // TODO: your solution here
  }

  pop() {
    // TODO: your solution here
  }

  top() {
    // TODO: your solution here
  }

  getMin() {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────

const s = new MinStack();
s.push(-2); s.push(0); s.push(-3);
console.log(s.getMin());  // -3
s.pop();
console.log(s.top());     // 0
console.log(s.getMin());  // -2

module.exports = { MinStack };
