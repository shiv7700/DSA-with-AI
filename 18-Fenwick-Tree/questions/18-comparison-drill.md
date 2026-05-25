# Q18 — Comparison Drill: Brute Force vs Prefix Array vs Segment Tree vs BIT

**Difficulty:** Hard (conceptual + implementation)
**Pattern:** All four approaches to range-sum + point-update
**Expected:** O(n) brute-force query / O(log n) BIT and Segment Tree / O(1) prefix array query

## Problem

Implement the **same interface** using four different data structures, and compare them.

The interface:

- `constructor(nums)` — initialise from an integer array.
- `update(i, val)` — set element at 0-indexed index `i` to `val`.
- `sumRange(l, r)` — return sum of elements from 0-indexed `l` to `r` (inclusive).

Implement this interface as four separate classes:

1. `BruteForce` — plain array, O(1) update, O(n) query.
2. `PrefixArray` — prefix sum array, O(n) update (rebuild), O(1) query.
3. `SegmentTree` — recursive segment tree, O(log n) both.
4. `FenwickTree` — BIT, O(log n) both.

Then, answer the analysis questions in the follow-ups below.

> **Why this exercise matters:** seeing all four side-by-side makes the trade-offs concrete. You'll understand not just how to use each structure, but *when* to choose it.

## Examples

All four classes must produce identical outputs for the same sequence of operations:

```
nums = [1, 3, 5, 7, 9, 11]

.sumRange(0, 5)   → 36
.update(1, 2)
.sumRange(0, 5)   → 35
.sumRange(2, 5)   → 32
.update(3, 0)
.sumRange(0, 5)   → 28
```

## Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i], val <= 100`
- `0 <= l <= r < nums.length`

## Hints

<details>
<summary>Hint 1 — BruteForce</summary>

Store the array directly. `update(i, val)` sets `arr[i] = val`. `sumRange(l, r)` loops from `l` to `r`. This is the baseline — correct but slow for large queries.

</details>

<details>
<summary>Hint 2 — PrefixArray</summary>

Store the original array and a prefix sum array. `sumRange` is O(1). But `update(i, val)` must recompute all prefix sums from index `i` onwards — O(n) in the worst case. For a mostly-read workload this is ideal; for a mostly-write workload it's terrible.

</details>

<details>
<summary>Hint 3 — SegmentTree</summary>

Build a segment tree: each node stores the sum of a range. Leaf nodes hold individual elements. Internal nodes hold the sum of their children. Update travels one path from root to leaf (O(log n)); query merges at most 2 * log n nodes (O(log n)). Code is more complex — typically 30–50 lines.

</details>

<details>
<summary>Hint 4 — FenwickTree</summary>

The BIT from Q3 and Q5. Same asymptotic complexity as the Segment Tree but half the code and better constant factors.

</details>

## Analysis questions (answer in code comments)

After implementing all four, add a comment block at the top of the solution file answering:

1. Which is fastest for pure queries with no updates?
2. Which is fastest for pure updates with no queries?
3. Which is the best overall for a 50/50 mix of updates and queries?
4. How many lines of code did each implementation take?
5. If someone asked you to add "range minimum" support tomorrow, which would you extend and why?

## Write your solution

→ [`../solutions/18-comparison-drill.js`](../solutions/18-comparison-drill.js)

## Follow-ups

- Benchmark all four with 10,000 operations on an array of 10,000 elements in Node.js. How many milliseconds does each take?
- Can a Segment Tree do everything a BIT can? (Yes.) Can a BIT do everything a Segment Tree can? (No — BIT can't do range min/max without tricks.)
- Write a simple benchmark harness and run it. Does the BIT actually beat the Segment Tree in your tests?
