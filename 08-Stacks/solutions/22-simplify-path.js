/**
 * Q22 — Simplify Path
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/22-simplify-path.md
 */

function simplifyPath(path) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(simplifyPath('/home/'));              // "/home"
console.log(simplifyPath('/../'));                // "/"
console.log(simplifyPath('/home//foo/'));         // "/home/foo"
console.log(simplifyPath('/a/./b/../../c/'));     // "/c"

module.exports = { simplifyPath };
