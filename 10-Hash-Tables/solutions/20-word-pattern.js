/**
 * Q20 — Word Pattern
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/20-word-pattern.md
 */

function wordPattern(pattern, s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(wordPattern('abba', 'dog cat cat dog'));  // true
console.log(wordPattern('abba', 'dog cat cat fish')); // false
console.log(wordPattern('aaaa', 'dog cat cat dog'));  // false
console.log(wordPattern('abba', 'dog dog dog dog'));  // false

module.exports = { wordPattern };
