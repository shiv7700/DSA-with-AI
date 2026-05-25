/**
 * Q33 — Stock Span Problem
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/33-stock-span.md
 */

function stockSpan(prices) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(stockSpan([100, 80, 60, 70, 60, 75, 85])); // [1, 1, 1, 2, 1, 4, 6]
console.log(stockSpan([10, 20, 30, 40, 50]));           // [1, 2, 3, 4, 5]
console.log(stockSpan([50, 40, 30, 20, 10]));           // [1, 1, 1, 1, 1]

module.exports = { stockSpan };
