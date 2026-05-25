/**
 * Q12 — Find Median in a Stream (BIT approach)
 * Difficulty: Medium
 * Expected:   O(log V) per addNum · O(log V) per findMedian · O(V) space
 * Problem:    ../questions/12-find-median-stream.md
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

const MAX_VAL = 100001;

class MedianFinder {
  constructor() {
    // TODO: create a BIT of size MAX_VAL and a count variable
  }

  /**
   * Add num to the data stream. O(log V).
   * @param {number} num  1 <= num <= MAX_VAL
   */
  addNum(num) {
    // TODO: bit.update(num, 1), count++
  }

  /**
   * Return the median. O(log V).
   * @return {number}
   */
  findMedian() {
    // TODO:
    // If count is odd:  return kthSmallest(Math.ceil(count / 2))
    // If count is even: return (kthSmallest(count/2) + kthSmallest(count/2 + 1)) / 2
  }

  /** Internal: find kth smallest using binary lifting. O(log V). */
  _kthSmallest(k) {
    // TODO: same binary lifting as Q11
  }
}

// ── quick tests ──────────────────────────────────────────────

const mf = new MedianFinder();
mf.addNum(1);
console.log(mf.findMedian()); // 1.0
mf.addNum(2);
console.log(mf.findMedian()); // 1.5
mf.addNum(3);
console.log(mf.findMedian()); // 2.0
mf.addNum(7);
console.log(mf.findMedian()); // 2.5
mf.addNum(5);
console.log(mf.findMedian()); // 3.0

module.exports = { MedianFinder, BIT };
