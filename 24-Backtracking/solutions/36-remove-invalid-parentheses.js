/**
 * Q36 — Remove Invalid Parentheses
 * Difficulty: Hard
 * Expected:   O(2^n) time · O(n) space
 * Problem:    ../questions/36-remove-invalid-parentheses.md
 */

function removeInvalidParentheses(s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(removeInvalidParentheses("()())()"));  // ["(())()", "()()()"]
console.log(removeInvalidParentheses("(a)())()")); // ["(a)()()", "(a())()"]
console.log(removeInvalidParentheses(")("));       // [""]

module.exports = { removeInvalidParentheses };
