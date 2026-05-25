/**
 * Q12 — Longest Substring Without Repeating Characters
 * Difficulty: Medium
 * Expected:   O(n) time · O(k) space
 * Problem:    ../questions/12-longest-substring-no-repeat.md
 */

function lengthOfLongestSubstring(s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(lengthOfLongestSubstring('abcabcbb')); // 3
console.log(lengthOfLongestSubstring('bbbbb'));     // 1
console.log(lengthOfLongestSubstring('pwwkew'));    // 3
console.log(lengthOfLongestSubstring(''));           // 0

module.exports = { lengthOfLongestSubstring };
