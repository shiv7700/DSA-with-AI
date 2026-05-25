/**
 * Q6 — Two Stacks in One Array
 * Difficulty: Easy
 * Expected:   O(1) per operation · O(n) space total
 * Problem:    ../questions/06-two-stacks-one-array.md
 */

class TwoStacks {
  constructor(n) {
    // TODO: your solution here
  }

  push1(x) {
    // TODO: your solution here
  }

  push2(x) {
    // TODO: your solution here
  }

  pop1() {
    // TODO: your solution here
  }

  pop2() {
    // TODO: your solution here
  }

  peek1() {
    // TODO: your solution here
  }

  peek2() {
    // TODO: your solution here
  }

  isEmpty1() {
    // TODO: your solution here
  }

  isEmpty2() {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────

const ts = new TwoStacks(6);
ts.push1(10); ts.push1(20);
ts.push2(30); ts.push2(40); ts.push2(50);
console.log(ts.pop1());    // 20
console.log(ts.pop2());    // 50
console.log(ts.peek1());   // 10
console.log(ts.peek2());   // 40

module.exports = { TwoStacks };
