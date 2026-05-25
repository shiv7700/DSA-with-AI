# Q17 — Sort by Absolute Value

**Difficulty:** Easy
**Pattern:** Custom comparator
**Expected:** O(n log n) time · O(1) extra space (sort in place)

## Problem

Given an array of integers (including negatives), sort it by **absolute value** in ascending order.

If two elements have the same absolute value, the negative one should come first (e.g., `-3` before `3`).

## Examples

### Example 1
```
Input:  [-3, 1, -7, 4, -2]
Output: [1, -2, -3, 4, -7]
```
Because `|1|=1, |-2|=2, |-3|=3, |4|=4, |-7|=7`.

### Example 2
```
Input:  [3, -3, 2, -2, 1]
Output: [1, -2, 2, -3, 3]
```
Note: `-2` comes before `2` (same absolute value, negative first).

### Example 3
```
Input:  [0, -1, 1]
Output: [0, -1, 1]
```
`|0|=0`, `|-1|=1`, `|1|=1`. `-1` comes before `1`.

### Example 4
```
Input:  [-5]
Output: [-5]
```

## Constraints
- `1 <= arr.length <= 10^4`
- `-10^6 <= arr[i] <= 10^6`
- If two elements have the same absolute value, put the negative one first.

## Hints

<details>
<summary>Hint 1 — using a custom comparator</summary>

JavaScript's `.sort()` takes a comparator `(a, b) => number`. You need to define what "comes first" means.

Primary sort key: `Math.abs(a)` vs `Math.abs(b)`.
Secondary sort key (for ties): negative before positive, i.e., `a - b` (negative numbers are smaller).
</details>

<details>
<summary>Hint 2 — writing the comparator</summary>

```js
arr.sort((a, b) => {
  const absDiff = Math.abs(a) - Math.abs(b);
  if (absDiff !== 0) return absDiff;   // primary: absolute value ascending
  return a - b;                        // secondary: negative before positive
});
```

When `Math.abs(a) === Math.abs(b)` (e.g., `-3` and `3`): `a - b = -3 - 3 = -6` (negative) → `a` comes first, so `-3` is placed before `3`. Correct.
</details>

<details>
<summary>Hint 3 — do you need to copy first?</summary>

The problem asks you to sort in place. If you need to preserve the original, use `[...arr].sort(...)`. Otherwise, sort directly.
</details>

## Write your solution
→ [`../solutions/17-sort-by-absolute-value.js`](../solutions/17-sort-by-absolute-value.js)

## Follow-ups
- Sort by absolute value in **descending** order.
- What comparator would you write to sort a list of temperatures by distance from 0°C (i.e., how extreme they are)?
