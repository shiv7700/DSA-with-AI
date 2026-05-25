# Q11 — Kth Smallest in a Dynamic Multiset

**Difficulty:** Medium
**Pattern:** Fenwick Tree — frequency array + binary lifting
**Expected:** O(log n) insert/delete · O(log n) kth-smallest · O(V) space (V = value range)

## Problem

Design a data structure that supports a dynamic multiset of integers and can answer: "what is the **k-th smallest** element currently in the set?"

Implement the `DynamicMultiset` class:

- `insert(val)` — add `val` to the multiset.
- `remove(val)` — remove one occurrence of `val` from the multiset. Guaranteed that `val` exists.
- `kthSmallest(k)` — return the k-th smallest element (1-indexed: `k = 1` returns the minimum).

Assume all values are in the range `[1, MAX_VAL]` where `MAX_VAL = 10^5`.

## Examples

### Example 1

```
insert(3)
insert(1)
insert(5)
insert(2)
kthSmallest(1)  → 1
kthSmallest(2)  → 2
kthSmallest(3)  → 3
remove(2)
kthSmallest(2)  → 3
kthSmallest(3)  → 5
```

### Example 2

```
insert(7)
insert(7)
insert(7)
kthSmallest(1)  → 7
kthSmallest(2)  → 7
kthSmallest(3)  → 7
remove(7)
kthSmallest(1)  → 7
kthSmallest(2)  → 7
```

## Constraints

- `1 <= val <= 10^5`
- `1 <= k <= current size of multiset`
- At most `10^5` operations total.

## Hints

<details>
<summary>Hint 1 — BIT as a frequency counter</summary>

Maintain a BIT where `tree[v]` accumulates the count of how many times value `v` has been inserted. Then `bit.query(v)` = how many elements in the multiset are ≤ `v`.

`insert(val)`: `bit.update(val, +1)`
`remove(val)`: `bit.update(val, -1)`

</details>

<details>
<summary>Hint 2 — finding kth smallest: binary search on BIT</summary>

One approach: binary search on the value range [1, MAX_VAL]. For a midpoint `m`, `bit.query(m)` gives you how many elements are ≤ `m`. If that count is < `k`, the answer is > `m`; otherwise ≤ `m`.

Each `bit.query` is O(log V), so binary search gives O(log²V). That's fine.

</details>

<details>
<summary>Hint 3 — O(log V) kth smallest: binary lifting on BIT</summary>

There's a slicker O(log V) approach using the BIT structure directly:

```js
function kthSmallest(k) {
  let pos = 0;
  for (let pw = 1 << 17; pw > 0; pw >>= 1) {  // 2^17 > 10^5
    if (pos + pw <= MAX_VAL && tree[pos + pw] < k) {
      pos += pw;
      k -= tree[pos];
    }
  }
  return pos + 1;
}
```

This walks down the BIT in O(log V) by greedily taking the left half if it doesn't contain enough elements.

</details>

## Write your solution

→ [`../solutions/11-kth-smallest-multiset.js`](../solutions/11-kth-smallest-multiset.js)

## Follow-ups

- How would you extend this to support values outside [1, 10^5]? (Coordinate compression — but now you can't do kth-smallest without knowing all values upfront, or you use a dynamic structure.)
- This structure can be used for **order statistics** — finding rank of an element too. How?
- **Find Median in a Stream** (Q12) uses a similar idea.
