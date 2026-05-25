/**
 * Q21 — Backspace String Compare
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/21-backspace-string-compare.md
 */

function backspaceStringCompare(s, t) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(backspaceStringCompare('ab#c', 'ad#c'));  // true
console.log(backspaceStringCompare('ab##', 'c#d#'));  // true
console.log(backspaceStringCompare('a#c', 'b'));      // false
console.log(backspaceStringCompare('a##c', '#a#c')); // true

module.exports = { backspaceStringCompare };
