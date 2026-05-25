/**
 * Q23 — Validate Stack Sequences
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/23-validate-stack-sequences.md
 */

function validateStackSequences(pushed, popped) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1])); // true
console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2])); // false

module.exports = { validateStackSequences };
