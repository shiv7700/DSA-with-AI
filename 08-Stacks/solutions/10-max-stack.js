/**
 * Q10 — Max Stack
 * Difficulty: Medium
 * Expected:   O(1) per operation · O(n) space
 * Problem:    ../questions/10-max-stack.md
 */

class MaxStack {
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

  getMax() {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────

const s = new MaxStack();
s.push(1); s.push(5); s.push(3);
console.log(s.getMax());  // 5
console.log(s.pop());     // 3
console.log(s.getMax());  // 5
console.log(s.pop());     // 5
console.log(s.getMax());  // 1

module.exports = { MaxStack };
