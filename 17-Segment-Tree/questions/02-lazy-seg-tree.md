# Q2 — Recursive Segment Tree with Lazy Propagation

**Difficulty:** Medium (foundation)
**Pattern:** Segment Tree — recursive with lazy propagation
**Expected:** O(n) build · O(log n) range update · O(log n) range query · O(n) space

## Problem

Implement a recursive segment tree that supports:

1. **Build** from an initial integer array `arr` of length `n`.
2. **Range add update** — add `val` to every element in `arr[l..r]`.
3. **Range sum query** — return the sum of `arr[l..r]` (both ends inclusive).

Use **lazy propagation** to ensure range updates run in O(log n), not O(n log n).

> **Why recursive?** The recursive version generalises more easily to complex lazy semantics (assign + add, XOR + sum, etc.). Learn this skeleton and you'll be able to adapt it to any of the hard problems in this chapter.

## Examples

### Example 1 — build then query

```
arr = [1, 2, 3, 4, 5]

rangeQuery(0, 4)   →  15
rangeQuery(1, 3)   →  9
```

### Example 2 — range update then query

```
arr = [1, 2, 3, 4, 5]

rangeUpdate(1, 3, 10)       add 10 to arr[1], arr[2], arr[3]
                             arr is now [1, 12, 13, 14, 5]
rangeQuery(0, 4)   →  45
rangeQuery(1, 3)   →  39
rangeUpdate(0, 4, -1)       subtract 1 from every element
                             arr is now [0, 11, 12, 13, 4]
rangeQuery(2, 4)   →  29
```

## Constraints

- `1 <= arr.length <= 10^5`
- `-10^9 <= arr[i], val <= 10^9`
- `0 <= l <= r < arr.length`
- Up to `10^5` calls to `rangeUpdate` and `rangeQuery` each.

## Hints

<details>
<summary>Hint 1 — the lazy array</summary>

Keep two arrays: `tree[]` and `lazy[]`, both of size `4n`. `tree[node]` stores the sum of the range this node covers. `lazy[node]` stores a **pending add** that has been applied to `tree[node]` but not yet pushed down to the children.
</details>

<details>
<summary>Hint 2 — pushDown</summary>

```js
function pushDown(node, start, end) {
  if (lazy[node] !== 0) {
    const mid = (start + end) >> 1;
    const lc = 2 * node, rc = 2 * node + 1;
    // apply pending add to children's sums
    tree[lc] += lazy[node] * (mid - start + 1);
    tree[rc] += lazy[node] * (end - mid);
    // pass down the pending add
    lazy[lc] += lazy[node];
    lazy[rc] += lazy[node];
    lazy[node] = 0;
  }
}
```

Call `pushDown` **before** recursing into children during both queries and updates.
</details>

<details>
<summary>Hint 3 — range update cases</summary>

Three cases (same shape as a regular range query):
- **No overlap:** return immediately.
- **Total overlap:** `tree[node] += val * (end - start + 1); lazy[node] += val;` then return.
- **Partial overlap:** `pushDown`, recurse into both children, then recompute `tree[node] = tree[lc] + tree[rc]`.
</details>

<details>
<summary>Hint 4 — full class skeleton</summary>

```js
class LazySegTree {
  constructor(arr)                              { /* build + allocate lazy */ }
  _build(node, start, end)                      { /* recursive */ }
  _pushDown(node, start, end)                   { /* push lazy to children */ }
  rangeUpdate(l, r, val)                        { /* public API */ }
  _update(node, start, end, l, r, val)          { /* recursive */ }
  rangeQuery(l, r)                              { /* public API */ }
  _query(node, start, end, l, r)                { /* recursive */ }
}
```
</details>

## Write your solution

→ [`../solutions/02-lazy-seg-tree.js`](../solutions/02-lazy-seg-tree.js)

## Follow-ups

- Change range add to **range assign** (set every element in a range to `val`). How does `pushDown` change?
- Support both point updates (special case: l === r) and range updates in the same class.
- What if `val` can be `0`? Does your lazy check still work?
