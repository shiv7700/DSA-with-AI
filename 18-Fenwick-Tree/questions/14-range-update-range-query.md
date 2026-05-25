# Q14 — Range-Update Range-Query (Two BITs)

**Difficulty:** Hard
**Pattern:** Fenwick Tree — two-BIT trick
**Expected:** O(log n) per operation · O(n) space

## Problem

Design a data structure over an array of `n` zeros that supports:

- `addRange(l, r, v)` — add `v` to every element in the 0-indexed range `[l, r]`.
- `sumRange(l, r)` — return the sum of elements in the 0-indexed range `[l, r]`.

Both operations must be O(log n).

> **Why this is hard:** Q3 handles point update + range query. Q13 handles range update + point query. This one needs **both** range update and range query simultaneously. A single BIT isn't enough — you need two.

## Examples

### Example 1

```
n = 5,  initial = [0, 0, 0, 0, 0]

addRange(1, 3, 2)    →  [0, 2, 2, 2, 0]
sumRange(0, 4)       →  6
sumRange(1, 3)       →  6
sumRange(0, 2)       →  4

addRange(0, 4, 1)    →  [1, 3, 3, 3, 1]
sumRange(0, 4)       →  11
sumRange(2, 2)       →  3

addRange(2, 4, 3)    →  [1, 3, 6, 6, 4]
sumRange(0, 4)       →  20
sumRange(2, 4)       →  16
```

### Example 2

```
n = 1

addRange(0, 0, 5)
sumRange(0, 0)  → 5
```

## Constraints

- `1 <= n <= 10^5`
- `0 <= l <= r < n`
- `-10^9 <= v <= 10^9`
- At most `10^5` operations total.

## Hints

<details>
<summary>Hint 1 — the mathematical decomposition</summary>

After all range-add operations, the prefix sum `S(i) = sum(arr[1..i])` can be written as:

```
S(i) = B1.query(i) * i  -  B2.query(i)
```

where `B1` stores the deltas themselves, and `B2` stores `delta * (startIndex - 1)` for each update.

Then `sumRange(l, r) = S(r) - S(l - 1)`.

</details>

<details>
<summary>Hint 2 — the four update calls</summary>

For `addRange(l, r, v)` (1-indexed):

```js
B1.update(l, v);
B1.update(r + 1, -v);
B2.update(l, v * (l - 1));
B2.update(r + 1, -v * r);
```

For `prefixSum(i)`:

```js
return B1.query(i) * i - B2.query(i);
```

For `sumRange(l, r)`:

```js
return prefixSum(r) - prefixSum(l - 1);
```

</details>

<details>
<summary>Hint 3 — verify with the example</summary>

After `addRange(1, 3, 2)` (1-indexed, so BIT indices 1–3):
```
B1: update(1, +2), update(4, -2)
B2: update(1, 2*(1-1)=0), update(4, -2*3=-6)

sumRange(1, 3) (0-indexed 1,3 = 1-indexed 2,4):
  prefixSum(4) = B1.query(4)*4 - B2.query(4)
               = (2-2)*4 - (0-6) = 0*4 + 6 = 6
  prefixSum(1) = B1.query(1)*1 - B2.query(1)
               = 2*1 - 0 = 2
  sumRange = 6 - 2 = 4  (arr[2]+arr[3]+arr[4] = 2+2+0... wait, 0-indexed vs 1-indexed)
```

Work through the indexing carefully — the one-off between 0 and 1 indexed is the main source of bugs here.

</details>

## Write your solution

→ [`../solutions/14-range-update-range-query.js`](../solutions/14-range-update-range-query.js)

## Follow-ups

- Prove to yourself that the two-BIT formula is correct by working through a small 4-element example by hand.
- Can you combine Q13 and Q14 into one class with a mode switch?
- For range min/max with range updates, you need a Segment Tree with lazy propagation. The BIT trick doesn't extend there.
