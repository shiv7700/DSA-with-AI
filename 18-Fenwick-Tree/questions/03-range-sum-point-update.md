# Q3 — Range Sum Query with Point Updates

**Difficulty:** Easy
**Pattern:** Fenwick Tree — core operations
**Expected:** O(n log n) build · O(log n) per update/query · O(n) space

## Problem

Implement a data structure that supports a mixed sequence of:

- `update(i, delta)` — add `delta` to `nums[i]` (0-indexed).
- `rangeQuery(l, r)` — return the sum of `nums[l..r]` (0-indexed, both inclusive).

Both operations must run in O(log n).

> **Why this matters:** this is the exact use case BIT was designed for. If you can solve this one cleanly, you can solve most BIT problems.

## Examples

### Example 1

```
nums = [1, 3, 5]

rangeQuery(0, 2)  → 9   (1 + 3 + 5)
update(1, 2)             (nums[1] becomes 5)
rangeQuery(0, 2)  → 11  (1 + 5 + 5)
rangeQuery(1, 2)  → 10  (5 + 5)
```

### Example 2

```
nums = [0, 0, 0, 0, 0]

update(2, 100)
rangeQuery(0, 4)  → 100
rangeQuery(0, 1)  → 0
rangeQuery(2, 4)  → 100
rangeQuery(3, 4)  → 0
```

### Example 3 (negative delta)

```
nums = [10, 10, 10]

update(0, -3)
rangeQuery(0, 2)  → 27  (7 + 10 + 10)
update(2, -5)
rangeQuery(0, 2)  → 22  (7 + 10 + 5)
```

## Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i], delta <= 100`
- `0 <= l <= r < nums.length`
- At most `3 * 10^4` calls total to `update` and `rangeQuery`.

## Hints

<details>
<summary>Hint 1 — the subtraction trick</summary>

`rangeQuery(l, r)` is just two prefix queries:

```js
rangeQuery(l, r) {
  return this.query(r) - this.query(l - 1);
}
```

Remember to convert `l` and `r` from 0-indexed to 1-indexed before passing them to the internal `query`.

</details>

<details>
<summary>Hint 2 — what does query(l - 1) mean when l = 0?</summary>

If `l = 0` (0-indexed), then in 1-indexed terms `l = 1`, so `query(l - 1) = query(0) = 0`. The loop `for (; i > 0; ...)` never executes, returning 0 immediately. This is correct — there is no prefix to subtract.

</details>

<details>
<summary>Hint 3 — full class skeleton</summary>

```js
class BIT {
  constructor(n) { ... }
  _update(i, delta) { /* 1-indexed */ }
  _query(i) { /* 1-indexed prefix sum */ }
  update(i, delta) { this._update(i + 1, delta); }
  rangeQuery(l, r) {
    return this._query(r + 1) - this._query(l + 1 - 1);
    //     = this._query(r + 1) - this._query(l)
  }
}
```

</details>

## Write your solution

→ [`../solutions/03-range-sum-point-update.js`](../solutions/03-range-sum-point-update.js)

## Follow-ups

- What is the total time complexity for `q` queries and `u` updates on an array of size `n`? (Answer: O((n + q + u) log n).)
- This is exactly LeetCode 307. Try submitting there once you have it working.
