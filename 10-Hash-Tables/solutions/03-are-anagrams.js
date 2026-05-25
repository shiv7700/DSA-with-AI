/**
 * Q3 — Are Two Strings Anagrams?
 * Difficulty: Easy
 * Expected:   O(n) time · O(k) space
 * Problem:    ../questions/03-are-anagrams.md
 */

function areAnagrams(s, t) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(areAnagrams('anagram', 'nagaram')); // true
console.log(areAnagrams('rat', 'car'));          // false
console.log(areAnagrams('ab', 'a'));             // false
console.log(areAnagrams('aab', 'baa'));          // true

module.exports = { areAnagrams };
