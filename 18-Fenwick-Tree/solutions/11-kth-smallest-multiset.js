/**
 * Q11 — Kth Smallest in a Dynamic Multiset
 * Difficulty: Medium
 * Expected:   O(log V) insert/delete · O(log V) kth-smallest · O(V) space
 * Problem:    ../questions/11-kth-smallest-multiset.md
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

class DynamicMultiset {
  constructor() {
    // TODO: create a BIT of size MAX_VAL and track total count
  }

  /**
   * Add val to the multiset. O(log V).
   * @param {number} val  1 <= val <= MAX_VAL
   */
  insert(val) {
    // TODO: bit.update(val, 1)
  }

  /**
   * Remove one occurrence of val. Guaranteed to exist. O(log V).
   * @param {number} val
   */
  remove(val) {
    // TODO: bit.update(val, -1)
  }

  /**
   * Return the k-th smallest element (1-indexed). O(log V).
   * @param {number} k
   * @return {number}
   */
  kthSmallest(k) {
    // TODO: binary lifting on the BIT
    // Walk through powers of 2 from high to low
    // At each step, greedily descend left if left subtree count < k
  }
}

// ── quick tests ──────────────────────────────────────────────

const ms = new DynamicMultiset();
ms.insert(3);
ms.insert(1);
ms.insert(5);
ms.insert(2);
console.log(ms.kthSmallest(1)); // 1
console.log(ms.kthSmallest(2)); // 2
console.log(ms.kthSmallest(3)); // 3
ms.remove(2);
console.log(ms.kthSmallest(2)); // 3
console.log(ms.kthSmallest(3)); // 5

module.exports = { DynamicMultiset, BIT };
