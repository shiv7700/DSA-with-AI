/**
 * Q23 — Count Pairs With XOR Less Than K
 * Difficulty: Hard
 * Expected:   O(n × 32) time · O(n × 32) space
 * Problem:    ../questions/23-xor-pairs-less-than-k.md
 */

function countXorPairsLessThanK(nums, k) {
  // TODO: augmented bit trie with count per node
}

// ── quick tests ──────────────────────────────────────────────
console.log(countXorPairsLessThanK([1,2,3,4,5], 4)); // 4
console.log(countXorPairsLessThanK([0,1,2,3], 2));   // 2

module.exports = { countXorPairsLessThanK };
