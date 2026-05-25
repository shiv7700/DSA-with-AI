/**
 * Q9 — Accounts Merge
 * Difficulty: Medium
 * Expected:   O(n · k · α(n · k)) time · O(n · k) space
 * Problem:    ../questions/09-accounts-merge.md
 */

function accountsMerge(accounts) {
  // TODO: DSU on emails, reconstruct groups with sorted emails
}

// ── quick tests ──────────────────────────────────────────────
console.log(accountsMerge([
  ["John","johnsmith@mail.com","john_newyork@mail.com"],
  ["John","johnsmith@mail.com","john00@mail.com"],
  ["Mary","mary@mail.com"],
  ["John","johnnybravo@mail.com"]
]));
// [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
//  ["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]

module.exports = { accountsMerge };
