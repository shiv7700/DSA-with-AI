/**
 * Q13 — First Bad Version
 * Difficulty: Medium
 * Expected:   O(log n) time · O(1) space
 * Problem:    ../questions/13-first-bad-version.md
 */

// isBadVersion is provided by the problem environment.
// For local testing, we define it as a closure over a known bad version.
function makeSolution(bad) {
  function isBadVersion(version) {
    return version >= bad;
  }

  function firstBadVersion(n) {
    // TODO: your solution here using isBadVersion(version)
  }

  return firstBadVersion;
}

// ── quick tests ──────────────────────────────────────────────
console.log(makeSolution(4)(5));   // 4
console.log(makeSolution(1)(1));   // 1
console.log(makeSolution(7)(10));  // 7

module.exports = { makeSolution };
