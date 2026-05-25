/**
 * Q13 — Infix to Postfix Conversion
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/13-infix-to-postfix.md
 */

function infixToPostfix(expression) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(infixToPostfix('3+4*2'));       // '342*+'
console.log(infixToPostfix('(3+4)*2'));     // '34+2*'
console.log(infixToPostfix('1+2*3-4/2'));   // '123*+42/-'

module.exports = { infixToPostfix };
