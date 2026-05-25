/**
 * Q10 — Extra Character Between Two Strings
 * Difficulty: Easy
 * Expected:   O(n) time · O(k) space
 * Problem:    ../questions/10-extra-char.md
 */

function findExtraChar(s, t) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(findExtraChar('abcd', 'abecd'));  // 'e'
console.log(findExtraChar('aa', 'aaa'));       // 'a'
console.log(findExtraChar('', 'z'));           // 'z'
console.log(findExtraChar('abcde', 'edbcfa')); // 'f'

module.exports = { findExtraChar };
