/**
 * Q0 — Implement a Stack
 * Difficulty: Easy (foundational)
 * Expected:   O(1) per operation · O(n) space
 * Problem:    ../questions/00-implement-stack.md
 */

// ── Part A: array-backed ──────────────────────────────────────

class Stack {
  constructor() {
    // TODO: your solution here
  }

  push(x) {
    // TODO: your solution here
  }

  pop() {
    // TODO: your solution here
  }

  peek() {
    // TODO: your solution here
  }

  isEmpty() {
    // TODO: your solution here
  }

  size() {
    // TODO: your solution here
  }
}

// ── Part B: linked-list-backed ────────────────────────────────

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class StackLL {
  constructor() {
    // TODO: your solution here
  }

  push(x) {
    // TODO: your solution here
  }

  pop() {
    // TODO: your solution here
  }

  peek() {
    // TODO: your solution here
  }

  isEmpty() {
    // TODO: your solution here
  }

  size() {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────

const s = new Stack();
console.log(s.isEmpty());  // true
s.push(10); s.push(20); s.push(30);
console.log(s.peek());     // 30
console.log(s.pop());      // 30
console.log(s.size());     // 2

const ll = new StackLL();
ll.push(1); ll.push(2); ll.push(3);
console.log(ll.pop());     // 3
console.log(ll.peek());    // 2

module.exports = { Stack, StackLL };
