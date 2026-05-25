# Q3 — Range Sum Query, Point Update

**Difficulty:** Easy
**Pattern:** Segment Tree — point update, range query
**Expected:** O(n) build · O(log n) per update/query · O(n) space

## Problem

You are given an integer array `nums`. Handle two types of operations:

- **`update(index, val)`** — set `nums[index] = val`.
- **`sumRange(left, right)`** — return the sum of `nums[left]` through `nums[right]` (inclusive).

Both operations are called up to `3 * 10^4` times.

> This is LeetCode 307 — Range Sum Query - Mutable. It's the canonical "plug in a segment tree" problem and the best way to confirm your iterative or recursive implementation is correct.

## Examples

### Example 1

```
nums = [1, 3, 5]

sumRange(0, 2)  →  9
update(1, 2)             nums becomes [1, 2, 5]
sumRange(0, 2)  →  8
```

### Example 2

```
nums = [0, -3, 5, -2, 8, 1]

sumRange(2, 5)   →  12
update(3, 10)            nums becomes [0, -3, 5, 10, 8, 1]
sumRange(2, 5)   →  24
update(0, -5)            nums becomes [-5, -3, 5, 10, 8, 1]
sumRange(0, 0)   →  -5
sumRange(0, 5)   →  16
```

## Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `0 <= index < nums.length`
- `-100 <= val <= 100`
- `0 <= left <= right < nums.length`
- At most `3 * 10^4` calls to each of `update` and `sumRange`.

## Hints

<details>
<summary>Hint 1 — recognize the approach</summary>

This is the exact problem that a segment tree is designed for. Build a sum segment tree, wire `update` to a point update, and `sumRange` to a range query.

A Fenwick tree (BIT) also works here and is simpler — but practice the segment tree so you have the pattern ready for when only a segment tree will do.
</details>

<details>
<summary>Hint 2 — why a prefix sum doesn't work</summary>

A prefix sum would make `sumRange` O(1), but each `update` would require recomputing O(n) prefix values. With `3 * 10^4` updates on an array of `3 * 10^4` elements that's potentially 9 * 10^8 operations. Too slow.

A segment tree: O(n) build, then O(log n) per operation.
</details>

<details>
<summary>Hint 3 — class interface</summary>

```js
class NumArray {
  constructor(nums) { /* build segment tree */ }
  update(index, val) { /* point update */ }
  sumRange(left, right) { /* range query */ }
}
```
</details>

## Write your solution

→ [`../solutions/03-range-sum-point-update.js`](../solutions/03-range-sum-point-update.js)

## Follow-ups

- What if queries can be prefix queries (always starting at index 0)? Does that simplify anything?
- Benchmark your segment tree implementation against a Fenwick tree on the same test cases. Is there a measurable speed difference in JavaScript?
