/**
 * Q18 — Maximum XOR of Two Numbers in an Array
 * Difficulty: Hard
 * Expected:   O(n × 32) time · O(n × 32) space
 * Problem:    ../questions/18-maximum-xor.md
 */

function findMaximumXOR(nums) {
  // TODO: bit trie — insert all, then greedily query each
}

// ── quick tests ──────────────────────────────────────────────
console.log(findMaximumXOR([3,10,5,25,2,8])); // 28  (5 XOR 25)

module.exports = { findMaximumXOR };
