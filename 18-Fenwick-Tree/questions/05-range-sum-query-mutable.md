# Q5 — Range Sum Query — Mutable (LeetCode 307)

**Difficulty:** Medium
**Pattern:** Fenwick Tree — direct application
**Expected:** O(n log n) build · O(log n) update · O(log n) query · O(n) space

## Problem

This is [LeetCode 307 — Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/).

Implement the `NumArray` class:

- `NumArray(nums)` — initialise the object with the integer array `nums`.
- `update(index, val)` — set `nums[index]` to `val` (0-indexed). This is a **set** operation, not a delta.
- `sumRange(left, right)` — return the sum of elements between `left` and `right` (0-indexed, both inclusive).

## Examples

### Example 1

```
Input:
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]

Output:
[null, 9, null, 8]

Explanation:
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); → 1 + 3 + 5 = 9
numArray.update(1, 2);   → nums[1] = 2, array becomes [1, 2, 5]
numArray.sumRange(0, 2); → 1 + 2 + 5 = 8
```

### Example 2

```
NumArray([0, 0, 0])
sumRange(0, 2)  → 0
update(0, 1)
update(1, 3)
update(2, 5)
sumRange(0, 2)  → 9
```

## Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `0 <= index < nums.length`
- `-100 <= val <= 100`
- `0 <= left <= right < nums.length`
- At most `3 * 10^4` calls to `update` and `sumRange`.

## Hints

<details>
<summary>Hint 1 — reuse Q4</summary>

`update(index, val)` sets an element to an exact value — the same operation you implemented in Q4. Use the `vals` array trick to convert `set` into a `delta` before calling the BIT.

</details>

<details>
<summary>Hint 2 — LeetCode class interface</summary>

LeetCode expects a class named `NumArray` with exactly these methods: `update(index, val)` and `sumRange(left, right)`. Just wrap your BIT inside it.

</details>

<details>
<summary>Hint 3 — why not a plain prefix array?</summary>

A plain prefix array would give O(1) queries but O(n) updates. With up to 3 * 10^4 updates on an array of up to 3 * 10^4 elements, that's up to 9 * 10^8 operations — too slow. BIT gives O(log n) for both.

</details>

## Write your solution

→ [`../solutions/05-range-sum-query-mutable.js`](../solutions/05-range-sum-query-mutable.js)

## Follow-ups

- Can you implement this with a Segment Tree instead? How does the code complexity compare?
- What if the array could have up to 10^9 values with up to 10^5 non-zero entries? (Hint: sparse BIT with a Map instead of an array.)
