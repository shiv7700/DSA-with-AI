/**
 * Q6 — Count of Smaller Numbers After Self (LeetCode 315)
 * Difficulty: Medium
 * Expected:   O(n log n) time · O(n) space
 * Problem:    ../questions/06-count-smaller-after-self.md
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
 * @return {number[]}
 */
function countSmaller(nums) {
  // TODO: your solution here
  //
  // Steps:
  //  1. Coordinate-compress nums to 1-indexed ranks
  //  2. Walk right to left
  //  3. For each element: counts[i] = bit.query(rank - 1)
  //                       then bit.update(rank, 1)
  //  4. Return counts
}

// ── quick tests ──────────────────────────────────────────────

console.log(countSmaller([5, 2, 6, 1])); // [2, 1, 1, 0]
console.log(countSmaller([1]));           // [0]
console.log(countSmaller([1, 1]));        // [0, 0]
console.log(countSmaller([-1, -1]));      // [0, 0]

module.exports = { countSmaller, BIT };
