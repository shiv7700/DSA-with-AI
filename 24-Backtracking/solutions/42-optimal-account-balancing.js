/**
 * Q42 — Optimal Account Balancing
 * Difficulty: Hard
 * Expected:   O(n!) time · O(n) space (n = non-zero net balances)
 * Problem:    ../questions/42-optimal-account-balancing.md
 */

function minTransfers(transactions) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(minTransfers([[0,1,10],[2,0,5]]));             // 2
console.log(minTransfers([[0,1,10],[1,0,1],[1,2,5],[2,0,5]])); // 1

module.exports = { minTransfers };
