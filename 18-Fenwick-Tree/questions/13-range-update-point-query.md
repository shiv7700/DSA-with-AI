# Q13 — Range-Update Point-Query (Difference Array BIT)

**Difficulty:** Hard
**Pattern:** Fenwick Tree on difference array
**Expected:** O(log n) per operation · O(n) space

## Problem

Design a data structure over an array of `n` zeros that supports:

- `addRange(l, r, v)` — add `v` to every element in the 0-indexed range `[l, r]`.
- `pointQuery(i)` — return the current value of element at 0-indexed index `i`.

Both operations must be O(log n).

> **The twist:** compare this to the basic BIT (Q3). That one does O(log n) point updates and O(log n) range queries. This one does the **opposite**: O(log n) range updates and O(log n) point queries. You can't have both for free without the two-BIT trick in Q14.

## Examples

### Example 1

```
n = 5,  initial = [0, 0, 0, 0, 0]

addRange(1, 3, 2)   →  [0, 2, 2, 2, 0]
pointQuery(0)       →  0
pointQuery(1)       →  2
pointQuery(3)       →  2
pointQuery(4)       →  0
addRange(0, 4, 1)   →  [1, 3, 3, 3, 1]
pointQuery(2)       →  3
addRange(2, 2, 5)   →  [1, 3, 8, 3, 1]
pointQuery(2)       →  8
```

### Example 2

```
n = 1

addRange(0, 0, 100)
pointQuery(0)  → 100
addRange(0, 0, -50)
pointQuery(0)  → 50
```

## Constraints

- `1 <= n <= 10^5`
- `0 <= l <= r < n`
- `-10^9 <= v <= 10^9`
- At most `10^5` operations total.

## Hints

<details>
<summary>Hint 1 — the difference array idea</summary>

Define the "difference array" `diff` where `diff[i] = arr[i] - arr[i-1]` (with `arr[-1] = 0`).

Then `arr[i] = diff[0] + diff[1] + ... + diff[i]` — it's a prefix sum of `diff`.

So `pointQuery(i)` = prefix sum of `diff` up to `i`. That's a BIT query.

</details>

<details>
<summary>Hint 2 — range update as two point updates on diff</summary>

Adding `v` to `arr[l..r]` changes the difference array at exactly two places:

- `diff[l]` increases by `v` (the start of the range).
- `diff[r+1]` decreases by `v` (the end of the range, one past the last updated index).

In code:

```js
addRange(l, r, v):
  bit.update(l + 1, v);           // +1 for 1-indexed
  if (r + 2 <= n) bit.update(r + 2, -v);
```

Then `pointQuery(i) = bit.query(i + 1)`.

</details>

<details>
<summary>Hint 3 — verify with the example</summary>

`n = 5`, `addRange(1, 3, 2)`:

```
diff updates: diff[1] += 2, diff[4] -= 2
BIT state (1-indexed): [0, 2, 0, 0, -2, 0]

pointQuery(1) = prefix sum up to 1 = 2  ✓
pointQuery(3) = prefix sum up to 3 = 2  ✓
pointQuery(4) = prefix sum up to 4 = 2 + (-2) = 0  ✓
```

</details>

## Write your solution

→ [`../solutions/13-range-update-point-query.js`](../solutions/13-range-update-point-query.js)

## Follow-ups

- What if you need **both** range updates and range queries? See Q14.
- This pattern is useful in "paint the array" problems. Can you use it to solve: "apply K range-add operations, then answer M point queries"?
- Does this support overlapping ranges? (Yes — each range adds independently to the difference array.)
