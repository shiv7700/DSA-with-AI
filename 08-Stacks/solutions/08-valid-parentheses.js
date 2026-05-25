/**
 * Q8 — Valid Parentheses
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/08-valid-parentheses.md
 */

function isValid(s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(isValid('()'));       // true
console.log(isValid('()[]{}'));   // true
console.log(isValid('([])'));     // true
console.log(isValid('([)]'));     // false
console.log(isValid('{[]'));      // false
console.log(isValid(']'));        // false

module.exports = { isValid };
