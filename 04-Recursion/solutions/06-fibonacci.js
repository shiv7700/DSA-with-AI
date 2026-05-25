/**
 * Q6 — Fibonacci: Naive O(2^n) then Memoized O(n)
 * Difficulty: Easy → Medium
 * Expected:   Naive O(2^n) · Memoized O(n) time · O(n) space
 * Problem:    ../questions/06-fibonacci.md
 */

function fibNaive(n) {
  // TODO: your solution here
}

function fibMemo(n, memo = {}) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(fibNaive(10)); // 55
console.log(fibMemo(10));  // 55

module.exports = { fibNaive, fibMemo };
