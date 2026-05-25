# Q4 — Point Update: Set vs Delta

**Difficulty:** Easy
**Pattern:** Fenwick Tree — set operation
**Expected:** O(log n) per operation · O(n) space

## Problem

A basic BIT's `update(i, delta)` **adds** `delta` to position `i`. But sometimes you need to **set** a position to an exact value: `set(i, value)`.

Implement a BIT that supports:

- `set(i, value)` — change the element at 0-indexed position `i` to exactly `value`.
- `rangeQuery(l, r)` — return the sum of elements in the 0-indexed range `[l, r]`.

Both operations must run in O(log n).

> **Why this matters:** interview problems often say "update to a value" rather than "add a delta." Knowing how to convert between the two is fundamental.

## Examples

### Example 1

```
nums = [1, 2, 3, 4, 5]

rangeQuery(0, 4)  → 15
set(2, 10)                (replace 3 with 10)
rangeQuery(0, 4)  → 22   (1 + 2 + 10 + 4 + 5)
set(0, 0)                 (replace 1 with 0)
rangeQuery(0, 4)  → 21   (0 + 2 + 10 + 4 + 5)
```

### Example 2

```
nums = [0]

set(0, 7)
rangeQuery(0, 0)  → 7
set(0, 3)
rangeQuery(0, 0)  → 3
```

## Constraints

- `1 <= nums.length <= 10^4`
- `-10^9 <= nums[i], value <= 10^9`
- `0 <= l <= r < nums.length`

## Hints

<details>
<summary>Hint 1 — track the current values</summary>

To compute the delta for a `set` operation, you need to know the current value. BIT does not store individual element values — it only stores partial sums. So you need a separate `vals` array alongside the BIT.

```js
this.vals = [...nums];   // keeps the actual current values
```

</details>

<details>
<summary>Hint 2 — converting set to delta</summary>

If the current value at index `i` is `vals[i]` and you want to set it to `newValue`:

```js
const delta = newValue - this.vals[i];
this.vals[i] = newValue;
this._bitUpdate(i + 1, delta);
```

The BIT still only sees a delta — you just compute that delta yourself.

</details>

<details>
<summary>Hint 3 — initialisation</summary>

When building the BIT from `nums`, call `set(i, nums[i])` for each element — or directly `_bitUpdate(i + 1, nums[i])` while populating `vals`.

</details>

## Write your solution

→ [`../solutions/04-point-update-set-vs-delta.js`](../solutions/04-point-update-set-vs-delta.js)

## Follow-ups

- What if `set` is called many times on the same index? Does your extra `vals` array stay correct? Walk through two consecutive `set(0, ...)` calls to verify.
- Can you implement a `get(i)` method that returns the current value at index `i` in O(1)?
