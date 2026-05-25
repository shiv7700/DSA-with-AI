/**
 * Q7 — Reverse Pairs (LeetCode 493)
 * Difficulty: Medium
 * Expected:   O(n log n) time · O(n) space
 * Problem:    ../questions/07-reverse-pairs.md
 */

class BIT {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0);
  }
  update(i, delta) {
    for (; i <= this.n; i += i & -i) this.tree[i] += delta;
  }
  query(i) {
    let s = 0;
    for (; i > 0; i -= i & -i) s += this.tree[i];
    return s;
  }
  rangeQuery(l, r) {
    return this.query(r) - this.query(l - 1);
  }
}

/**
 * @param {number[]} nums
 * @return {number}
 */
function reversePairs(nums) {
  // TODO: your solution here
  //
  // Steps:
  //  1. Collect all values and 2*nums[j] values, sort and deduplicate for compression
  //  2. Walk right to left
  //  3. For each nums[i]:
  //     a. count how many already-inserted values x satisfy x * 2 < nums[i]
  //        → query rank of (nums[i] - 1) in the "2x" sorted set
  //     b. insert nums[i] into BIT
  //  4. Return total count
}

// ── quick tests ──────────────────────────────────────────────

console.log(reversePairs([1, 3, 2, 3, 1])); // 2
console.log(reversePairs([2, 4, 3, 5, 1])); // 3
console.log(reversePairs([1, 1, 1, 1]));    // 0

module.exports = { reversePairs, BIT };
