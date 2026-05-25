/**
 * Q8 — Number of Inversions
 * Difficulty: Medium
 * Expected:   O(n log n) time · O(n) space
 * Problem:    ../questions/08-number-of-inversions.md
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
function countInversions(nums) {
  // TODO: your solution here
  //
  // Steps:
  //  1. Coordinate-compress nums (values can be up to 10^9)
  //  2. Walk right to left
  //  3. For each nums[i]:
  //     inversions += bit.query(rank(nums[i]) - 1)
  //     bit.update(rank(nums[i]), 1)
  //  4. Return total inversions
}

// ── quick tests ──────────────────────────────────────────────

console.log(countInversions([2, 4, 1, 3, 5])); // 3
console.log(countInversions([5, 4, 3, 2, 1])); // 10
console.log(countInversions([1, 2, 3, 4, 5])); // 0
console.log(countInversions([1]));              // 0

module.exports = { countInversions, BIT };
