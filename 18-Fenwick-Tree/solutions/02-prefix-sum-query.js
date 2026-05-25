/**
 * Q2 — Prefix Sum Query
 * Difficulty: Easy
 * Expected:   O(n log n) build · O(log n) per query · O(n) space
 * Problem:    ../questions/02-prefix-sum-query.md
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
 * @param {number[]} queries  - array of 0-indexed positions to query
 * @return {number[]}         - prefix sum at each queried position
 */
function prefixSumQueries(nums, queries) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(prefixSumQueries([2, 4, 1, 3, 6], [0, 1, 2, 3, 4]));
// [2, 6, 7, 10, 16]

console.log(prefixSumQueries([5], [0]));
// [5]

console.log(prefixSumQueries([0, 0, 5, 0, 0], [1, 2, 4]));
// [0, 5, 5]

module.exports = { prefixSumQueries, BIT };
