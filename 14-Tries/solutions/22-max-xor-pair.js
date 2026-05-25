/**
 * Q22 — Maximum XOR Pair in an Array — O(n·32)
 * Difficulty: Hard
 * Expected:   O(n × 32) time · O(n × 32) space
 * Problem:    ../questions/22-max-xor-pair.md
 */

function maxXorPair(nums) {
  // TODO: BitTrie — insert all, then greedily query each
}

// ── quick tests ──────────────────────────────────────────────
console.log(maxXorPair([3,10,5,25,2,8])); // 28  (5 XOR 25)
console.log(maxXorPair([2,4]));           // 6   (2 XOR 4)

module.exports = { maxXorPair };
