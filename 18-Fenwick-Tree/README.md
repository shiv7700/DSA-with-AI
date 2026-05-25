# 18 — Fenwick Tree (Binary Indexed Tree / BIT)

> A Fenwick Tree is a compact, blazing-fast structure for answering prefix-sum queries and handling point updates in O(log n). It does everything a segment tree does for sum-based queries in half the code and with better cache performance.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — the lowbit trick, update/query mechanics, range-update variants, 2D BIT, what BIT can and cannot do.
2. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
3. Write your solution in the matching `solutions/<NN>-<slug>.js`.
4. Tick off the checklist below as you finish.

## Progress

### Easy (build the foundation)
- [ ] [01 — Build a BIT from an Array](./questions/01-build-bit.md)
- [ ] [02 — Prefix Sum Query](./questions/02-prefix-sum-query.md)
- [ ] [03 — Range Sum Query with Point Updates](./questions/03-range-sum-point-update.md)
- [ ] [04 — Point Update: Set vs Delta](./questions/04-point-update-set-vs-delta.md)

### Medium
- [ ] [05 — Range Sum Query — Mutable (LeetCode 307)](./questions/05-range-sum-query-mutable.md)
- [ ] [06 — Count of Smaller Numbers After Self (LeetCode 315)](./questions/06-count-smaller-after-self.md)
- [ ] [07 — Reverse Pairs (LeetCode 493)](./questions/07-reverse-pairs.md)
- [ ] [08 — Number of Inversions](./questions/08-number-of-inversions.md)
- [ ] [09 — Count Range Sum (LeetCode 327)](./questions/09-count-range-sum.md)
- [ ] [10 — Range Sum Query 2D — Mutable (LeetCode 308)](./questions/10-range-sum-2d-mutable.md)
- [ ] [11 — Kth Smallest in a Dynamic Multiset](./questions/11-kth-smallest-multiset.md)
- [ ] [12 — Find Median in a Stream (BIT approach)](./questions/12-find-median-stream.md)

### Hard / Advanced Tricks
- [ ] [13 — Range-Update Point-Query (Difference Array BIT)](./questions/13-range-update-point-query.md)
- [ ] [14 — Range-Update Range-Query (Two BITs)](./questions/14-range-update-range-query.md)
- [ ] [15 — 2D BIT Implementation](./questions/15-2d-bit-implementation.md)
- [ ] [16 — Submatrix Sum with Point Updates](./questions/16-submatrix-sum-point-updates.md)
- [ ] [17 — Number of Submatrices That Sum to Target](./questions/17-submatrices-sum-target.md)
- [ ] [18 — Comparison Drill: Brute Force vs Prefix Array vs Segment Tree vs BIT](./questions/18-comparison-drill.md)

## Related Topics

- [17 — Segment Tree](../17-Segment-Tree/) — the more powerful cousin; supports min/max queries.
- [02 — Arrays](../02-Arrays/) — prefix sums (the non-dynamic version BIT is built on top of).
- [01 — Big-O Complexity](../01-Big-O-Complexity/) — why O(log n) matters versus O(n).
