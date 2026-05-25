/**
 * Q1 — Iterative Segment Tree (Sum + Point Update)
 * Difficulty: Easy (foundation)
 * Expected:   O(n) build · O(log n) update · O(log n) query · O(n) space
 * Problem:    ../questions/01-iterative-seg-tree.md
 */

class SegTree {
  constructor(arr) {
    // TODO: build iterative segment tree
  }

  update(i, val) {
    // TODO: point update — set arr[i] = val
  }

  query(l, r) {
    // TODO: range sum query [l..r] inclusive
  }
}

// ── quick tests ──────────────────────────────────────────────
const st = new SegTree([3, 1, 4, 1, 5, 9, 2, 6]);
console.log(st.query(0, 7)); // 31

module.exports = { SegTree };
