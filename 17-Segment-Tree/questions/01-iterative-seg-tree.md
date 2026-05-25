# Q1 — Iterative Segment Tree (Sum + Point Update)

**Difficulty:** Easy (foundation)
**Pattern:** Segment Tree — iterative bottom-up
**Expected:** O(n) build · O(log n) update · O(log n) query · O(n) space

## Problem

Implement an iterative segment tree that supports:

1. **Build** from an initial integer array `arr` of length `n`.
2. **Point update** — set `arr[i] = val` and reflect the change in the tree.
3. **Range sum query** — return the sum of `arr[l..r]` (both ends inclusive).

Do **not** use recursion. Use the bottom-up array representation where leaf for `arr[i]` lives at `tree[n + i]` and internal node `k` has children at `2k` and `2k+1`.

> **Why implement this first?** Every segment tree problem in this chapter builds on this skeleton. Once you can write it from memory, the harder variants become manageable changes — you're just swapping the `merge` function.

## Examples

### Example 1 — build then query

```
arr = [3, 1, 4, 1, 5, 9, 2, 6]

query(0, 7)  →  31    (sum of entire array)
query(2, 5)  →  19    (4 + 1 + 5 + 9)
query(0, 0)  →  3     (single element)
query(3, 3)  →  1
```

### Example 2 — update then query

```
arr = [1, 2, 3, 4, 5]

query(1, 3)  →  9     (2 + 3 + 4)
update(2, 10)         set arr[2] = 10
query(1, 3)  →  16    (2 + 10 + 4)
update(0, 0)          set arr[0] = 0
query(0, 4)  →  21    (0 + 2 + 10 + 4 + 5)
```

## Constraints

- `1 <= arr.length <= 10^5`
- `-10^9 <= arr[i], val <= 10^9`
- `0 <= l <= r < arr.length`
- Up to `10^5` calls to `update` and `query` each.

## Hints

<details>
<summary>Hint 1 — the tree layout</summary>

Store the tree in an array of size `2n`. Leaf for `arr[i]` is at `tree[n + i]`. Internal node at index `k` is the parent of `tree[2k]` and `tree[2k+1]`.

Build bottom-up: first copy `arr` into the leaves, then loop `i` from `n-1` down to `1`, setting `tree[i] = tree[2i] + tree[2i+1]`.
</details>

<details>
<summary>Hint 2 — point update</summary>

To update index `i`:
1. Set `tree[n + i] = val`.
2. Walk up: `pos = (n + i) >> 1`. While `pos >= 1`, set `tree[pos] = tree[2*pos] + tree[2*pos+1]`, then `pos >>= 1`.
</details>

<details>
<summary>Hint 3 — range query (the tricky part)</summary>

Convert `l` and `r` to leaf positions: `l += n; r += n + 1` (making `r` exclusive). Then:

```
while (l < r):
  if l is a right child (l & 1):  add tree[l] to sum, then l++
  if r is a right child (r & 1):  r--,  add tree[r] to sum
  l >>= 1  (go to parent)
  r >>= 1  (go to parent)
```

Why check `l & 1`? A right child's parent also covers the element to the left, which is outside our query range — so we must take the right child directly rather than going up.
</details>

<details>
<summary>Hint 4 — full class skeleton</summary>

```js
class SegTree {
  constructor(arr) { /* build */ }
  update(i, val)   { /* point update */ }
  query(l, r)      { /* range sum [l..r] inclusive */ }
}
```
</details>

## Write your solution

→ [`../solutions/01-iterative-seg-tree.js`](../solutions/01-iterative-seg-tree.js)

## Follow-ups

- Change the merge operation from `+` to `Math.min`. How few lines does the code actually change?
- What happens if `n = 0`? Add a guard.
- Can you support a `queryAll()` shortcut that returns `tree[1]` directly?
