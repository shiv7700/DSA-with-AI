/**
 * Q30 — Longest Valid Parentheses
 * Difficulty: Hard
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/30-longest-valid-parentheses.md
 */

function longestValidParentheses(s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(longestValidParentheses('(()'));     // 2
console.log(longestValidParentheses(')()())'));  // 4
console.log(longestValidParentheses(''));        // 0
console.log(longestValidParentheses('()(())'));  // 6

module.exports = { longestValidParentheses };
