# Q15 — 2D BIT Implementation

**Difficulty:** Hard
**Pattern:** 2D Fenwick Tree — construction
**Expected:** O(m * n * log m * log n) build · O(log m * log n) per operation · O(m * n) space

## Problem

Implement a 2D Binary Indexed Tree (Fenwick Tree) class `BIT2D` that supports:

- `constructor(rows, cols)` — initialise an `rows × cols` grid of zeros.
- `update(r, c, delta)` — add `delta` to cell `(r, c)` (0-indexed).
- `query(r, c)` — return the sum of all cells in the rectangle `(0, 0)` to `(r, c)` (0-indexed, inclusive).
- `rectQuery(r1, c1, r2, c2)` — return the sum of all cells in the rectangle from `(r1, c1)` to `(r2, c2)` (0-indexed, inclusive).

## Examples

### Example 1

```
BIT2D(3, 3)  →  3×3 grid of zeros

update(0, 0, 1)
update(1, 1, 2)
update(2, 2, 3)

query(0, 0)          → 1
query(1, 1)          → 3   (1 + 2)
query(2, 2)          → 6   (1 + 2 + 3)
rectQuery(0,0, 1,1)  → 3   (1 + 0 + 0 + 2)
rectQuery(1,1, 2,2)  → 5   (2 + 0 + 0 + 3)
```

### Example 2

```
BIT2D(1, 1)

update(0, 0, 100)
query(0, 0)          → 100
update(0, 0, -40)
query(0, 0)          → 60
```

## Constraints

- `1 <= rows, cols <= 200`
- `-10^9 <= delta <= 10^9`
- All operation indexes are within bounds.

## Hints

<details>
<summary>Hint 1 — two nested BIT loops</summary>

The 2D BIT is the 1D BIT applied twice. The outer loop walks over row indexes; the inner loop walks over column indexes. Both use the same `i += i & -i` (update) or `i -= i & -i` (query) pattern.

```js
update(r, c, delta):
  for i from r+1 to rows, step i += i & -i:
    for j from c+1 to cols, step j += j & -j:
      tree[i][j] += delta
```

</details>

<details>
<summary>Hint 2 — 2D prefix query</summary>

`query(r, c)` returns the sum of the top-left rectangle `(0,0)` to `(r,c)`.

```js
query(r, c):
  let s = 0
  for i from r+1 down to 1, step i -= i & -i:
    for j from c+1 down to 1, step j -= j & -j:
      s += tree[i][j]
  return s
```

</details>

<details>
<summary>Hint 3 — inclusion-exclusion for rectQuery</summary>

```
rectQuery(r1,c1, r2,c2) =
    query(r2, c2)
  - query(r1 - 1, c2)
  - query(r2, c1 - 1)
  + query(r1 - 1, c1 - 1)
```

The last term is added back because it was subtracted twice. This is the 2D version of `rangeQuery = query(r) - query(l - 1)`.

</details>

## Write your solution

→ [`../solutions/15-2d-bit-implementation.js`](../solutions/15-2d-bit-implementation.js)

## Follow-ups

- How would you build a 2D BIT from an existing matrix (analogous to Q1)?
- What is the space cost of a 2D BIT vs a 2D Segment Tree for a 200×200 grid?
- Can a 2D BIT support range-update + rect-query? (Yes, with a 4-BIT generalisation of the two-BIT trick, but it's rarely used in practice.)
