/**
 * Q14 — Evaluate an Infix Expression
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/14-evaluate-infix.md
 */

function evaluateInfix(s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(evaluateInfix('3+5*2'));      // 13
console.log(evaluateInfix('(3+5)*2'));    // 16
console.log(evaluateInfix('10+2*6'));     // 22
console.log(evaluateInfix('100*2+12'));   // 212

module.exports = { evaluateInfix };
