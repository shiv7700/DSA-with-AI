# Q5 — Range Max Query, Point Update

**Difficulty:** Easy
**Pattern:** Segment Tree — point update, range query (max)
**Expected:** O(n) build · O(log n) per update/query · O(n) space

## Problem

Given an integer array `nums`, implement a data structure that supports:

- **`update(index, val)`** — set `nums[index] = val`.
- **`maxRange(left, right)`** — return the **maximum** value in `nums[left..right]` (inclusive).

## Examples

### Example 1

```
nums = [2, 4, 3, 1, 6, 7, 8, 5]

maxRange(0, 7)   →  8
maxRange(0, 3)   →  4
maxRange(4, 6)   →  8
update(5, 0)               nums becomes [2, 4, 3, 1, 6, 0, 8, 5]
maxRange(4, 6)   →  8
update(6, 1)               nums becomes [2, 4, 3, 1, 6, 0, 1, 5]
maxRange(4, 7)   →  6
```

### Example 2

```
nums = [-3, -1, -4, -1, -5]

maxRange(0, 4)   →  -1
update(4, 0)
maxRange(0, 4)   →  0
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i], val <= 10^9`
- `0 <= left <= right < nums.length`

## Hints

<details>
<summary>Hint 1 — same structure, different identity</summary>

Mirror of Q4 (Range Min). Change the merge to `Math.max(left, right)` and the identity to `-Infinity`.
</details>

<details>
<summary>Hint 2 — negative numbers</summary>

Don't initialise with `0` as the identity — if all elements are negative, the answer would be wrong. Use `-Infinity` (or `Number.NEGATIVE_INFINITY`).
</details>

## Write your solution

→ [`../solutions/05-range-max-point-update.js`](../solutions/05-range-max-point-update.js)

## Follow-ups

- How would you find the **index** of the maximum element in a range, not just the value? What changes in your node structure?
- Combine Q4 and Q5 into a single `RangeMinMax` class that answers both queries.
