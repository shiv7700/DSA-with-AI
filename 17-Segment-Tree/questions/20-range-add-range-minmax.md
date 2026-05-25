# Q20 — Range Add, Range Min/Max (Lazy Propagation)

**Difficulty:** Hard
**Pattern:** Segment Tree with lazy propagation (add, query min or max)
**Expected:** O(n) build · O(log n) per operation · O(n) space

## Problem

Given an integer array `nums`, implement a data structure that supports:

- **`rangeAdd(left, right, val)`** — add `val` to every element in `nums[left..right]`.
- **`rangeMin(left, right)`** — return the minimum value in `nums[left..right]`.
- **`rangeMax(left, right)`** — return the maximum value in `nums[left..right]`.

## Examples

### Example 1

```
nums = [3, 1, 4, 1, 5, 9, 2, 6]

rangeMin(0, 7)       →  1
rangeMax(0, 7)       →  9
rangeAdd(2, 5, 10)        nums = [3, 1, 14, 11, 15, 19, 2, 6]
rangeMin(0, 7)       →  1
rangeMax(0, 7)       →  19
rangeAdd(0, 7, -5)        nums = [-2, -4, 9, 6, 10, 14, -3, 1]
rangeMin(3, 6)       →  -3
rangeMax(2, 5)       →  14
```

### Example 2

```
nums = [5, 5, 5, 5, 5]

rangeAdd(0, 4, 2)
rangeMin(0, 4)       →  7
rangeAdd(1, 3, -10)
rangeMin(0, 4)       →  -3
rangeMax(0, 4)       →  7
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i], val <= 10^9`
- `0 <= left <= right < nums.length`

## Hints

<details>
<summary>Hint 1 — adding to a range shifts min and max equally</summary>

If you add `val` to every element in a range, the minimum and maximum both increase by `val`. So: `tree_min[node] += val` and `tree_max[node] += val`. This is why add + min/max works with lazy propagation in a clean way.
</details>

<details>
<summary>Hint 2 — store both min and max at each node</summary>

Each node stores two values: `minVal` (the range minimum) and `maxVal` (the range maximum). One `lazy[]` array carries the pending add for both simultaneously.

Build: `minVal[node] = min(children)`, `maxVal[node] = max(children)`.

PushDown: apply `lazy[node]` to both `minVal` and `maxVal` of children, pass `lazy[node]` to children's `lazy`.
</details>

<details>
<summary>Hint 3 — recompute after partial overlap</summary>

After recursing into both children for a partial overlap:
```js
minVal[node] = Math.min(minVal[2*node], minVal[2*node+1]);
maxVal[node] = Math.max(maxVal[2*node], maxVal[2*node+1]);
```
</details>

## Write your solution

→ [`../solutions/20-range-add-range-minmax.js`](../solutions/20-range-add-range-minmax.js)

## Follow-ups

- Add support for `rangeSum` in the same class — now each node stores three values: sum, min, max.
- What changes if the operation is range-multiply instead of range-add? (Multiply propagation is slightly different — multiplying a range's min/max also multiplies the lazy tag.)
