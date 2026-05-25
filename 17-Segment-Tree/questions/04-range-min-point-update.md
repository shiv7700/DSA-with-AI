# Q4 — Range Min Query, Point Update

**Difficulty:** Easy
**Pattern:** Segment Tree — point update, range query (min)
**Expected:** O(n) build · O(log n) per update/query · O(n) space

## Problem

Given an integer array `nums`, implement a data structure that supports:

- **`update(index, val)`** — set `nums[index] = val`.
- **`minRange(left, right)`** — return the **minimum** value in `nums[left..right]` (inclusive).

## Examples

### Example 1

```
nums = [3, 1, 4, 1, 5, 9, 2, 6]

minRange(0, 7)   →  1
minRange(2, 5)   →  1
minRange(5, 7)   →  2
update(3, 8)               nums becomes [3, 1, 4, 8, 5, 9, 2, 6]
minRange(2, 5)   →  4
```

### Example 2

```
nums = [5, 5, 5, 5, 5]

minRange(0, 4)   →  5
update(2, 1)               nums becomes [5, 5, 1, 5, 5]
minRange(0, 4)   →  1
minRange(3, 4)   →  5
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i], val <= 10^9`
- `0 <= left <= right < nums.length`

## Hints

<details>
<summary>Hint 1 — one-line change from the sum tree</summary>

Take your sum segment tree from Q1 or Q3. Change exactly two things:
1. The **merge function**: instead of `left + right`, use `Math.min(left, right)`.
2. The **identity element**: instead of `0`, use `Infinity` (returned when the range is empty / no overlap).
</details>

<details>
<summary>Hint 2 — identity element</summary>

The identity for `min` is `+Infinity` — because `Math.min(anything, Infinity) === anything`. When a query falls entirely outside a node's range (Case A), return `Infinity` so it doesn't contaminate the `min` result.
</details>

<details>
<summary>Hint 3 — build initialisation</summary>

Leaf nodes: `tree[node] = arr[index]`.
Internal nodes: `tree[node] = Math.min(tree[leftChild], tree[rightChild])`.
</details>

## Write your solution

→ [`../solutions/04-range-min-point-update.js`](../solutions/04-range-min-point-update.js)

## Follow-ups

- Extend to also support `maxRange(left, right)` in the same data structure (store both min and max at each node).
- What is the minimum value in the entire array? Can you do it in O(1) after building the tree?
