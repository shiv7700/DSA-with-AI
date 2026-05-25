/**
 * Q6 — Earliest Moment When Everyone Becomes Friends
 * Difficulty: Easy
 * Expected:   O(m log m + m · α(n)) time · O(n) space
 * Problem:    ../questions/06-earliest-friends.md
 */

function earliestAcq(logs, n) {
  // TODO: sort logs by timestamp, union until components === 1
}

// ── quick tests ──────────────────────────────────────────────
console.log(earliestAcq([
  [20190101,0,1],[20190104,3,4],[20190107,2,3],
  [20190211,1,5],[20190224,2,4],[20190301,0,3],
  [20190312,1,2],[20190322,4,5]], 6));   // 20190301

module.exports = { earliestAcq };
