# Q8 — Range Sum Query — Mutable (LeetCode 307)

**Difficulty:** Medium
**Pattern:** Segment Tree — point update, range query
**Expected:** O(n) build · O(log n) per update/query · O(n) space

## Problem

Given a mutable integer array `nums`, implement a `NumArray` class:

- **`NumArray(nums)`** — initialise with the given array.
- **`update(index, val)`** — set `nums[index] = val`.
- **`sumRange(left, right)`** — return the sum of `nums[left]` through `nums[right]` (inclusive).

This is **LeetCode 307** verbatim.

> **Why is this "Medium" if Q3 looks the same?** Because LeetCode grades it medium for its constraints and because it expects you to know *which* data structure to reach for and defend that choice. Use this problem to lock in your preferred segment tree implementation and benchmark it.

## Examples

### Example 1

```
Input:
  ["NumArray", "sumRange", "update", "sumRange"]
  [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output:
  [null, 9, null, 8]
```

Explanation:
- `NumArray([1,3,5])` — initialise.
- `sumRange(0, 2) → 1+3+5 = 9`
- `update(1, 2)` — nums is now `[1,2,5]`
- `sumRange(0, 2) → 1+2+5 = 8`

### Example 2

```
nums = [9, -8, 0, 3, 7]

sumRange(0, 4)   →   11
update(0, 6)
sumRange(0, 4)   →   8
update(4, -2)
sumRange(2, 4)   →   1
```

## Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `0 <= index < nums.length`
- `-100 <= val <= 100`
- `0 <= left <= right < nums.length`
- At most `3 * 10^4` calls to `update` and `sumRange` each.

## Hints

<details>
<summary>Hint 1 — brute force first</summary>

Just store the array and loop on `sumRange`. O(n) per query. Passes smaller tests but TLEs on the full input. That's your baseline — then optimise.
</details>

<details>
<summary>Hint 2 — two approaches that both work</summary>

**Segment tree:** O(n) build, O(log n) per operation. About 40 lines.
**Fenwick tree (BIT):** O(n) build, O(log n) per operation. About 15 lines, but only for sums.

For this problem, both pass easily. Use the one you want to drill.
</details>

<details>
<summary>Hint 3 — don't forget the class interface</summary>

LeetCode wraps your solution in a class. Make sure `update` and `sumRange` are methods on `NumArray`, not standalone functions.
</details>

## Write your solution

→ [`../solutions/08-range-sum-mutable.js`](../solutions/08-range-sum-mutable.js)

## Follow-ups

- Implement the same class using a **Fenwick tree** (BIT). Compare the code length and the feel of each approach.
- Can you make `sumRange(0, n-1)` return in O(1) time with a small constant-space trick?
