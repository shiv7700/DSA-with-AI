# Q18 — Range Add, Range Sum (Lazy Propagation)

**Difficulty:** Hard
**Pattern:** Segment Tree with lazy propagation
**Expected:** O(n) build · O(log n) per operation · O(n) space

## Problem

Given an integer array `nums`, implement a data structure that supports:

- **`rangeAdd(left, right, val)`** — add `val` to every element in `nums[left..right]` (inclusive).
- **`rangeSum(left, right)`** — return the sum of `nums[left..right]` (inclusive).

Both operations called up to `10^5` times.

> This is the canonical lazy propagation problem. It's labelled Hard because you must implement lazy propagation correctly — incorrect push-down logic leads to subtle, hard-to-debug errors.

## Examples

### Example 1

```
nums = [1, 2, 3, 4, 5]

rangeSum(0, 4)       →  15
rangeAdd(1, 3, 10)        nums = [1, 12, 13, 14, 5]
rangeSum(0, 4)       →  45
rangeAdd(0, 4, -1)        nums = [0, 11, 12, 13, 4]
rangeSum(2, 4)       →  29
rangeSum(0, 1)       →  11
```

### Example 2

```
nums = [0, 0, 0, 0, 0]

rangeAdd(0, 4, 3)
rangeAdd(2, 4, 2)
rangeSum(0, 4)       →  19   (3,3,5,5,5)
rangeAdd(1, 3, -4)
rangeSum(0, 4)       →  7    (3,-1,1,1,5)
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-1000 <= nums[i] <= 1000`
- `-1000 <= val <= 1000`
- `0 <= left <= right < nums.length`

## Hints

<details>
<summary>Hint 1 — why naive range update is O(n log n)</summary>

Without lazy propagation, updating every element in `[l, r]` individually requires `O(r - l + 1)` point updates, each O(log n). For r - l + 1 = n, that's O(n log n) per operation.
</details>

<details>
<summary>Hint 2 — the lazy tag meaning</summary>

`lazy[node]` means: "every element in this node's range still needs `lazy[node]` added to it, but we haven't propagated it down yet."

When `tree[node]` is set, we immediately apply the lazy to the node's **sum** (multiply by range size). But we defer applying it to children until we actually need to recurse into them.
</details>

<details>
<summary>Hint 3 — push-down formula</summary>

```js
function pushDown(node, start, end) {
  if (lazy[node] !== 0) {
    const mid = (start + end) >> 1;
    const lc = 2 * node, rc = 2 * node + 1;
    tree[lc] += lazy[node] * (mid - start + 1);
    tree[rc] += lazy[node] * (end - mid);
    lazy[lc] += lazy[node];
    lazy[rc] += lazy[node];
    lazy[node] = 0;
  }
}
```
</details>

<details>
<summary>Hint 4 — total overlap case for update</summary>

When the update range completely covers this node's range:
```js
tree[node] += val * (end - start + 1);
lazy[node] += val;
return;   // do NOT recurse further
```
This is what makes it O(log n) — we stop as soon as we have a total overlap.
</details>

## Write your solution

→ [`../solutions/18-range-add-range-sum.js`](../solutions/18-range-add-range-sum.js)

## Follow-ups

- Change `rangeAdd` to `rangeAssign` (set every element in the range to `val`). How does `pushDown` change?
- Add a `pointQuery(index)` method that returns the current value at a single index — what's the most efficient way?
