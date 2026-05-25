# 17 — Segment Tree

> When you need range queries AND point/range updates faster than O(n) per operation, the segment tree is your answer. It is the Swiss army knife of competitive programming — any operation that's **associative** (sum, min, max, GCD, XOR) can ride on the same skeleton.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — concepts, ASCII tree diagrams, build/query/update walkthroughs, lazy propagation, space analysis, and when to use a segment tree vs a Fenwick tree.
2. Work through the "Implement First" questions (01–02) — they are the foundation. Every other question builds on them.
3. Solve the remaining questions in order. Each lives in `questions/<NN>-<slug>.md`.
4. Write your solution in the matching `solutions/<NN>-<slug>.js`.
5. Tick off the checklist below as you finish.

## Progress

### Foundations (implement first)
- [ ] [01 — Iterative Segment Tree (Sum + Point Update)](./questions/01-iterative-seg-tree.md)
- [ ] [02 — Recursive Segment Tree with Lazy Propagation](./questions/02-lazy-seg-tree.md)

### Easy
- [ ] [03 — Range Sum Query, Point Update](./questions/03-range-sum-point-update.md)
- [ ] [04 — Range Min Query, Point Update](./questions/04-range-min-point-update.md)
- [ ] [05 — Range Max Query, Point Update](./questions/05-range-max-point-update.md)
- [ ] [06 — Range XOR Query, Point Update](./questions/06-range-xor-point-update.md)
- [ ] [07 — Range GCD Query, Point Update](./questions/07-range-gcd-point-update.md)

### Medium
- [ ] [08 — Range Sum Query — Mutable (LeetCode 307)](./questions/08-range-sum-mutable.md)
- [ ] [09 — Count of Smaller Numbers After Self](./questions/09-count-smaller-after-self.md)
- [ ] [10 — Count of Range Sum](./questions/10-count-range-sum.md)
- [ ] [11 — Reverse Pairs](./questions/11-reverse-pairs.md)
- [ ] [12 — The Skyline Problem](./questions/12-skyline-problem.md)
- [ ] [13 — Falling Squares (Coordinate Compression)](./questions/13-falling-squares.md)
- [ ] [14 — Range Module](./questions/14-range-module.md)
- [ ] [15 — My Calendar III](./questions/15-my-calendar-iii.md)
- [ ] [16 — Number of Longest Increasing Subsequences](./questions/16-number-of-lis.md)
- [ ] [17 — K-th Smallest Number in a Range](./questions/17-kth-smallest-range.md)

### Hard — Lazy Propagation
- [ ] [18 — Range Add, Range Sum](./questions/18-range-add-range-sum.md)
- [ ] [19 — Range Assign, Range Sum](./questions/19-range-assign-range-sum.md)
- [ ] [20 — Range Add, Range Min/Max](./questions/20-range-add-range-minmax.md)
- [ ] [21 — Range XOR Update, Range Sum](./questions/21-range-xor-range-sum.md)
- [ ] [22 — Increment & Range Sum](./questions/22-increment-range-sum.md)
- [ ] [23 — Painting Walls](./questions/23-painting-walls.md)

### Advanced
- [ ] [24 — 2D Segment Tree — Matrix Sum](./questions/24-2d-seg-tree-matrix-sum.md)
- [ ] [25 — Subrectangle Sum with Point Updates](./questions/25-subrectangle-sum.md)
- [ ] [26 — Persistent Segment Tree — K-th Smallest in Range](./questions/26-persistent-seg-tree-kth.md)
- [ ] [27 — Coordinate Compression Drill](./questions/27-coordinate-compression.md)

## Related Topics

- [02 — Arrays](../02-Arrays/) — prefix sum (the baseline this topic beats).
- [05 — Searching](../05-Searching/) — binary search; segment tree nodes essentially binary-search the range.
- [18 — Fenwick Tree (BIT)](../18-Fenwick-Tree/) — simpler, faster constant, but less flexible than a segment tree.
- [10 — Hash Tables](../10-Hash-Tables/) — coordinate compression uses a hash map.
