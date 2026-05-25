/**
 * Q9 — Count Range Sum (LeetCode 327)
 * Difficulty: Medium
 * Expected:   O(n log n) time · O(n) space
 * Problem:    ../questions/09-count-range-sum.md
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
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
function countRangeSum(nums, lower, upper) {
  // TODO: your solution here
  //
  // Steps:
  //  1. Build prefix sum array pre[] (length n+1, pre[0]=0)
  //  2. Collect all values: pre[i], pre[i]-lower, pre[i]-upper for all i
  //     Sort and deduplicate these for coordinate compression
  //  3. Walk left to right through prefix sums
  //  4. For each pre[i]: count = bit.rangeQuery(rank(pre[i]-upper), rank(pre[i]-lower))
  //                      then insert pre[i] into BIT
  //  5. Return total count
}

// ── quick tests ──────────────────────────────────────────────

console.log(countRangeSum([-2, 5, -1], -2, 2)); // 3
console.log(countRangeSum([0], 0, 0));           // 1
console.log(countRangeSum([1, -1], 0, 0));       // 1

module.exports = { countRangeSum, BIT };
