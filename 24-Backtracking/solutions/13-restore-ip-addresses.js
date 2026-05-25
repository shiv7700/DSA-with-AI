/**
 * Q13 — Restore IP Addresses
 * Difficulty: Medium
 * Expected:   O(1) time · O(1) space (bounded input)
 * Problem:    ../questions/13-restore-ip-addresses.md
 */

function restoreIpAddresses(s) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(restoreIpAddresses("25525511135")); // ["255.255.11.135","255.255.111.35"]
console.log(restoreIpAddresses("0000"));         // ["0.0.0.0"]
console.log(restoreIpAddresses("101023"));       // ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

module.exports = { restoreIpAddresses };
