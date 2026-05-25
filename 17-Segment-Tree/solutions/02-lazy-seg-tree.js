/**
 * Q2 — Recursive Segment Tree with Lazy Propagation
 * Difficulty: Medium (foundation)
 * Expected:   O(n) build · O(log n) range update · O(log n) range query · O(n) space
 * Problem:    ../questions/02-lazy-seg-tree.md
 */

class LazySegTree {
  constructor(arr) {
    // TODO: build + allocate lazy arrays
  }

  _build(node, start, end) {
    // TODO: recursive build
  }

  _pushDown(node, start, end) {
    // TODO: push lazy pending add to children
  }

  rangeUpdate(l, r, val) {
    // TODO: public API — add val to arr[l..r]
  }

  _update(node, start, end, l, r, val) {
    // TODO: recursive range update
  }

  rangeQuery(l, r) {
    // TODO: public API — sum of arr[l..r]
  }

  _query(node, start, end, l, r) {
    // TODO: recursive range query
  }
}

// ── quick tests ──────────────────────────────────────────────
const lst = new LazySegTree([1, 2, 3, 4, 5]);
console.log(lst.rangeQuery(0, 4)); // 15

module.exports = { LazySegTree };
