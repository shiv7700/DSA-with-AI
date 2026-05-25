/**
 * Q18 — Comparison Drill: Brute Force vs Prefix Array vs Segment Tree vs BIT
 * Difficulty: Hard (conceptual + implementation)
 * Expected:   varies — see complexity table below
 * Problem:    ../questions/18-comparison-drill.md
 *
 * ── Analysis ────────────────────────────────────────────────
 *
 * 1. Fastest for pure queries with no updates?
 *    PrefixArray — O(1) query, as long as you never call update.
 *
 * 2. Fastest for pure updates with no queries?
 *    BruteForce — O(1) update (direct assignment), since queries never run.
 *
 * 3. Best for a 50/50 mix of updates and queries?
 *    FenwickTree — O(log n) for both, with the smallest constant factor.
 *
 * 4. Lines of code (approximate):
 *    BruteForce:   ~10 lines
 *    PrefixArray:  ~15 lines
 *    SegmentTree:  ~40 lines
 *    FenwickTree:  ~15 lines
 *
 * 5. Adding range minimum support?
 *    SegmentTree — BIT cannot support range min without major restructuring.
 *    SegTree stores arbitrary merge functions; just change sum→min.
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

// ── Implementation 1: Brute Force ────────────────────────────

class BruteForce {
  constructor(nums) {
    // TODO: store a copy of nums as this.arr
  }
  /** O(1) */
  update(i, val) {
    // TODO: this.arr[i] = val
  }
  /** O(n) */
  sumRange(l, r) {
    // TODO: loop from l to r, sum this.arr
  }
}

// ── Implementation 2: Prefix Array ───────────────────────────

class PrefixArray {
  constructor(nums) {
    // TODO: store nums, build prefix sum array
  }
  /** O(n) — must rebuild from index i onwards */
  update(i, val) {
    // TODO: update this.arr[i] = val, recompute prefix[j] for j >= i+1
  }
  /** O(1) */
  sumRange(l, r) {
    // TODO: prefix[r+1] - prefix[l]
  }
}

// ── Implementation 3: Segment Tree ───────────────────────────

class SegmentTree {
  constructor(nums) {
    // TODO: build a segment tree over nums
    // tree[1] = root, tree[2i] = left child, tree[2i+1] = right child
    // Leaf nodes store individual values; internal nodes store sums
  }
  /** O(log n) */
  update(i, val) {
    // TODO: update leaf, propagate sum up to root
  }
  /** O(log n) */
  sumRange(l, r) {
    // TODO: recursive or iterative query
  }
}

// ── Implementation 4: Fenwick Tree ───────────────────────────

class FenwickTree {
  constructor(nums) {
    // TODO: same as Q5 (NumArray) — use BIT with set→delta trick
  }
  /** O(log n) */
  update(i, val) {
    // TODO: your solution here
  }
  /** O(log n) */
  sumRange(l, r) {
    // TODO: your solution here
  }
}

// ── quick tests (all four must produce identical output) ──────

function runAll(label, instance) {
  const ops = [
    ['sumRange', 0, 5],
    ['update', 1, 2],
    ['sumRange', 0, 5],
    ['sumRange', 2, 5],
    ['update', 3, 0],
    ['sumRange', 0, 5],
  ];
  const results = ops.map(([op, a, b]) => instance[op](a, b));
  console.log(label, results);
  // Expected: [36, undefined, 35, 32, undefined, 28]
}

runAll('BruteForce:  ', new BruteForce([1, 3, 5, 7, 9, 11]));
runAll('PrefixArray: ', new PrefixArray([1, 3, 5, 7, 9, 11]));
runAll('SegmentTree: ', new SegmentTree([1, 3, 5, 7, 9, 11]));
runAll('FenwickTree: ', new FenwickTree([1, 3, 5, 7, 9, 11]));

module.exports = { BruteForce, PrefixArray, SegmentTree, FenwickTree, BIT };
