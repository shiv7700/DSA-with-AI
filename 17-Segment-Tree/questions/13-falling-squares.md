# Q13 — Falling Squares (Coordinate Compression)

**Difficulty:** Medium
**Pattern:** Segment Tree with coordinate compression — range max query + range assign
**Expected:** O(n log n) time · O(n) space

## Problem

There are several squares falling onto the X-axis. You are given a 2D integer array `positions` where `positions[i] = [left, sideLength]`. The `i`-th square drops with its left edge at `left` and has a side length of `sideLength`.

Each square falls straight down onto the X-axis or on top of any previously landed square. After each square falls, you must return the **height of the tallest stack** of squares.

Squares that share only an edge (not interior) do NOT stack.

Return an array of `n` integers representing the tallest height after each square falls.

## Examples

### Example 1

```
Input:  [[1,2],[2,3],[6,1]]
Output: [2, 5, 5]
```
- Square 1: occupies `[1,3)`, height = 2. Max = 2.
- Square 2: occupies `[2,5)`, lands on top of square 1 in `[2,3)` (height 2). New height = 2+3 = 5. Max = 5.
- Square 3: occupies `[6,7)`, nothing below. Height = 1. Max still = 5.

### Example 2

```
Input:  [[100,100],[200,100]]
Output: [100, 100]
```

### Example 3

```
Input:  [[1,5],[2,4],[3,3]]
Output: [5, 9, 9]
```

## Constraints

- `1 <= positions.length <= 1000`
- `1 <= left <= 10^8`
- `1 <= sideLength <= 10^6`

## Hints

<details>
<summary>Hint 1 — coordinate compression</summary>

`left` can be up to `10^8` but there are at most 1000 squares. Collect all x-coordinates: each square contributes `left` and `left + sideLength`. Compress them to ranks `[0..k-1]` where `k <= 2000`.
</details>

<details>
<summary>Hint 2 — range max query + range assign</summary>

Build a max segment tree over compressed x-coordinates. For each square falling at `[l, r)`:
1. **Query** the max current height in `[l, r)` — call it `base`.
2. The new height for this square is `base + sideLength`.
3. **Range-assign** all positions in `[l, r)` to `base + sideLength` (if the new height exceeds the current max there).

The overall maximum after each square is `tree[root]` (the global max).
</details>

<details>
<summary>Hint 3 — why range assign not range add?</summary>

A falling square "fills in" the entire range below it to a fixed new height. It doesn't add its height to every column independently — instead it sets every column to `max(column_height, base + sideLength)`. This is a range-max-assign operation.
</details>

## Write your solution

→ [`../solutions/13-falling-squares.js`](../solutions/13-falling-squares.js)

## Follow-ups

- What happens when `positions.length` can be `10^5`? Does your coordinate compression still work?
- How would you reconstruct exactly which square is the tallest at any given point?
