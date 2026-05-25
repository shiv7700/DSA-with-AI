/**
 * Q11 — Find Median from Data Stream
 * Difficulty: Hard
 * Expected:   addNum O(log n) · findMedian O(1) · O(n) space
 * Problem:    ../questions/11-find-median-from-data-stream.md
 */

class MedianFinder {
  constructor() {
    // TODO: initialize two heaps
    // this.lo = max-heap for the lower half
    // this.hi = min-heap for the upper half
  }

  addNum(num) {
    // TODO: add num to the appropriate heap, then rebalance
  }

  findMedian() {
    // TODO: return the median
    // odd total: return lo.peek()
    // even total: return (lo.peek() + hi.peek()) / 2
  }
}

// ── quick tests ──────────────────────────────────────────────
const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian()); // 1.5
mf.addNum(3);
console.log(mf.findMedian()); // 2.0

module.exports = { MedianFinder };
