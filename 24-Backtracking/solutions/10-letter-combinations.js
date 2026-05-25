/**
 * Q10 — Letter Combinations of a Phone Number
 * Difficulty: Medium
 * Expected:   O(4^n · n) time · O(n) space
 * Problem:    ../questions/10-letter-combinations.md
 */

function letterCombinations(digits) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(letterCombinations("23")); // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(letterCombinations(""));   // []
console.log(letterCombinations("2"));  // ["a","b","c"]

module.exports = { letterCombinations };
