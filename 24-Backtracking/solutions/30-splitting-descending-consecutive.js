/**
 * Q30 — Splitting a String Into Descending Consecutive Values
 * Difficulty: Medium
 * Expected:   O(n · 2^n) time · O(n) space
 * Problem:    ../questions/30-splitting-descending-consecutive.md
 */

function splitString(s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(splitString("1234"));     // false
console.log(splitString("050043"));   // true
console.log(splitString("9080701"));  // false
console.log(splitString("10009998")); // true

module.exports = { splitString };
