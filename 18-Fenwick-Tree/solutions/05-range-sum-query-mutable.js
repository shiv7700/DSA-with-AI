/**
 * Q5 — Range Sum Query — Mutable (LeetCode 307)
 * Difficulty: Medium
 * Expected:   O(n log n) build · O(log n) update · O(log n) sumRange · O(n) space
 * Problem:    ../questions/05-range-sum-query-mutable.md
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

class NumArray {
  /**
   * @param {number[]} nums
   */
  constructor(nums) {
    // TODO: your solution here
  }

  /**
   * Set nums[index] = val. O(log n).
   * @param {number} index
   * @param {number} val
   */
  update(index, val) {
    // TODO: your solution here
  }

  /**
   * Return sum of nums[left..right] inclusive. O(log n).
   * @param {number} left
   * @param {number} right
   * @return {number}
   */
  sumRange(left, right) {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────

const na = new NumArray([1, 3, 5]);
console.log(na.sumRange(0, 2)); // 9
na.update(1, 2);
console.log(na.sumRange(0, 2)); // 8

const na2 = new NumArray([0, 0, 0]);
console.log(na2.sumRange(0, 2)); // 0
na2.update(0, 1);
na2.update(1, 3);
na2.update(2, 5);
console.log(na2.sumRange(0, 2)); // 9

module.exports = { NumArray, BIT };
