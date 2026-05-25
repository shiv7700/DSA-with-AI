/**
 * Q01 — Fibonacci Number
 * Difficulty: Easy
 * Expected:   O(n) time · O(1) space
 * Problem:    ../questions/01-fibonacci.md
 */

// Implement all three versions as practice:

// Version A: memoization (top-down)
function fibMemo(n, memo = {}) {
  // TODO: your solution here
}

// Version B: tabulation (bottom-up)
function fibTab(n) {
  // TODO: your solution here
}

// Version C: space-optimized O(1)
function fib(n) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(fib(0));  // 0
console.log(fib(1));  // 1
console.log(fib(6));  // 8
console.log(fib(10)); // 55

module.exports = { fib, fibMemo, fibTab };
