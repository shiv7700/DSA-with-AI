/**
 * Q41 — Cracking the Safe
 * Difficulty: Hard
 * Expected:   O(k^n) time · O(k^n) space
 * Problem:    ../questions/41-cracking-the-safe.md
 */

function crackSafe(n, k) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(crackSafe(1, 2)); // "01" or "10"
console.log(crackSafe(2, 2).length); // 5 (k^n + n - 1 = 4 + 1)

module.exports = { crackSafe };
