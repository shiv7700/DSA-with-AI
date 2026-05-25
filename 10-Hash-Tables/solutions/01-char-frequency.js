/**
 * Q1 — Character Frequency Count
 * Difficulty: Easy
 * Expected:   O(n) time · O(k) space
 * Problem:    ../questions/01-char-frequency.md
 */

function charFrequency(s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(charFrequency('hello'));
// Map { 'h' => 1, 'e' => 1, 'l' => 2, 'o' => 1 }

console.log(charFrequency('aabbcc'));
// Map { 'a' => 2, 'b' => 2, 'c' => 2 }

console.log(charFrequency(''));
// Map {}

module.exports = { charFrequency };
