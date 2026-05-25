/**
 * Q4 — Point Update: Set vs Delta
 * Difficulty: Easy
 * Expected:   O(n log n) build · O(log n) set · O(log n) rangeQuery · O(n) space
 * Problem:    ../questions/04-point-update-set-vs-delta.md
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

class SetBIT {
  /**
   * @param {number[]} nums - 0-indexed input array
   */
  constructor(nums) {
    // TODO: your solution here
    // Hint: store a copy of nums as this.vals, then build the BIT
  }

  /**
   * Set 0-indexed position i to exactly newValue. O(log n).
   * @param {number} i
   * @param {number} newValue
   */
  set(i, newValue) {
    // TODO: compute delta = newValue - this.vals[i], update vals[i], call BIT update
  }

  /**
   * Return sum of nums[l..r] (0-indexed, inclusive). O(log n).
   * @param {number} l
   * @param {number} r
   * @return {number}
   */
  rangeQuery(l, r) {
    // TODO: your solution here
  }
}

// ── quick tests ──────────────────────────────────────────────

const sb = new SetBIT([1, 2, 3, 4, 5]);
console.log(sb.rangeQuery(0, 4)); // 15
sb.set(2, 10);
console.log(sb.rangeQuery(0, 4)); // 22
sb.set(0, 0);
console.log(sb.rangeQuery(0, 4)); // 21

const sb2 = new SetBIT([0]);
sb2.set(0, 7);
console.log(sb2.rangeQuery(0, 0)); // 7
sb2.set(0, 3);
console.log(sb2.rangeQuery(0, 0)); // 3

module.exports = { SetBIT, BIT };
