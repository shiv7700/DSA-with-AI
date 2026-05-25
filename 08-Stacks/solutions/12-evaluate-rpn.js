/**
 * Q12 — Evaluate Reverse Polish Notation
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/12-evaluate-rpn.md
 */

function evalRPN(tokens) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(evalRPN(['2', '1', '+', '3', '*']));                          // 9
console.log(evalRPN(['4', '13', '5', '/', '+']));                         // 6
console.log(evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'])); // 22

module.exports = { evalRPN };
