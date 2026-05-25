/**
 * Q25 — Ransom Note
 * Difficulty: Medium
 * Expected:   O(n + m) time · O(1) space
 * Problem:    ../questions/25-ransom-note.md
 */

function canConstruct(ransomNote, magazine) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(canConstruct('a', 'b'));          // false
console.log(canConstruct('aa', 'ab'));        // false
console.log(canConstruct('aa', 'aab'));       // true
console.log(canConstruct('hello', 'helloo world')); // true

module.exports = { canConstruct };
