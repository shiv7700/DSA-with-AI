/**
 * Q23 — Open the Lock (Combination Locker)
 * Difficulty: Medium
 * Expected:   O(10^4) time · O(10^4) space
 * Problem:    ../questions/23-combination-locker.md
 */

function openLock(deadends, target) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(openLock(["0201","0101","0102","1212","2002"], "0202")); // 6
console.log(openLock(["8888"], "0009"));                              // 1
console.log(openLock(["8887","8889","8878","8898","8788","8988","7888","9888"], "8888")); // -1

module.exports = { openLock };
