# Q19 — Range Assign, Range Sum (Lazy Propagation)

**Difficulty:** Hard
**Pattern:** Segment Tree with lazy propagation (assign semantics)
**Expected:** O(n) build · O(log n) per operation · O(n) space

## Problem

Given an integer array `nums`, implement a data structure that supports:

- **`rangeAssign(left, right, val)`** — set every element in `nums[left..right]` to `val`.
- **`rangeSum(left, right)`** — return the sum of `nums[left..right]` (inclusive).

## Examples

### Example 1

```
nums = [1, 2, 3, 4, 5]

rangeSum(0, 4)          →  15
rangeAssign(1, 3, 7)         nums = [1, 7, 7, 7, 5]
rangeSum(0, 4)          →  27
rangeAssign(2, 4, 0)         nums = [1, 7, 0, 0, 0]
rangeSum(0, 4)          →  8
rangeAssign(0, 4, 3)         nums = [3, 3, 3, 3, 3]
rangeSum(0, 4)          →  15
```

### Example 2

```
nums = [5, 5, 5, 5, 5]

rangeAssign(0, 2, 1)
rangeAssign(1, 3, 9)
rangeSum(0, 4)          →  36   (1, 9, 9, 9, 5)
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i], val <= 10^9`
- `0 <= left <= right < nums.length`

## Hints

<details>
<summary>Hint 1 — assign vs add: key difference</summary>

With **add**, lazy tags accumulate: if node A has lazy `+3` and you push `+2` to it, the new lazy is `+5`.

With **assign**, the latest assignment overwrites all previous ones: if node A has a pending "assign to 7" and you apply "assign to 3", the result is just "assign to 3". Lazy tags do NOT accumulate for assign.
</details>

<details>
<summary>Hint 2 — sentinel for "no pending assign"</summary>

Use `null` (or a sentinel like `Number.MIN_SAFE_INTEGER`) to mean "no pending assign". In `pushDown`, only push if `lazy[node] !== null`.

When applying: `tree[child] = lazy[node] * (size of child range)`.
When passing down: `lazy[child] = lazy[node]` (overwrite, don't add).
Then clear: `lazy[node] = null`.
</details>

<details>
<summary>Hint 3 — order of operations in update</summary>

Total overlap case:
```js
tree[node] = val * (end - start + 1);
lazy[node] = val;
return;
```

Partial overlap: push down first (so children are up to date), then recurse, then recompute `tree[node]`.
</details>

## Write your solution

→ [`../solutions/19-range-assign-range-sum.js`](../solutions/19-range-assign-range-sum.js)

## Follow-ups

- Combine range-assign and range-add in the same data structure. What should happen when you first assign then add to an overlapping range? (Hint: the combined lazy tag becomes `(assign_val + add_val)`, still an assign.)
- How would you handle range-assign for range min/max queries instead of sum?
