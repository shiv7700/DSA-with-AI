/**
 * Q15 — Lexicographically Smallest Equivalent String
 * Difficulty: Medium
 * Expected:   O((n + m) · α(26)) time · O(1) space
 * Problem:    ../questions/15-lex-smallest-equivalent.md
 */

function smallestEquivalentString(s1, s2, baseStr) {
  // TODO: DSU(26) with union-by-smaller-char as root
}

// ── quick tests ──────────────────────────────────────────────
console.log(smallestEquivalentString("parker","morris","parser")); // "makkek"

module.exports = { smallestEquivalentString };
