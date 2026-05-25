/**
 * Q15 — Decode String
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/15-decode-string.md
 */

function decodeString(s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(decodeString('3[a]'));        // 'aaa'
console.log(decodeString('3[a2[c]]'));    // 'accaccacc'
console.log(decodeString('2[abc]3[cd]ef')); // 'abcabccdcdcdef'

module.exports = { decodeString };
