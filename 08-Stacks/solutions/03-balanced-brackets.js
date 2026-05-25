/**
 * Q3 — Balanced Brackets
 * Difficulty: Easy
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/03-balanced-brackets.md
 */

function isBalanced(s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(isBalanced('()'));         // true
console.log(isBalanced('()[]{}')); // true
console.log(isBalanced('([{}])'));  // true
console.log(isBalanced('([)]'));    // false
console.log(isBalanced('{'));          // false
console.log(isBalanced(''));           // true

module.exports = { isBalanced };
