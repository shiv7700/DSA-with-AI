# Q14 — K Closest Points to Origin

**Difficulty:** Medium
**Pattern:** Max-heap of size K (by distance)
**Expected:** O(n log k) time · O(k) space

## Problem

Given an array of `points` where `points[i] = [xi, yi]` represents a point on a 2D plane, and an integer `k`, return the `k` closest points to the origin `(0, 0)`.

The **Euclidean distance** from a point `(x, y)` to the origin is `√(x² + y²)`. You may return the answer in any order. The answer is guaranteed to be unique (no two points have the same distance to the origin).

> Note: you do not need to compute the actual square root — comparing `x² + y²` values is sufficient since the square root is a monotonically increasing function.

## Examples

### Example 1
```
Input:  points = [[1, 3], [-2, 2]],  k = 1
Output: [[-2, 2]]
```
`dist([1,3])  = √10 ≈ 3.16`
`dist([-2,2]) = √8  ≈ 2.83`
`[-2, 2]` is closer.

### Example 2
```
Input:  points = [[3, 3], [5, -1], [-2, 4]],  k = 2
Output: [[3, 3], [-2, 4]]
```
Distances squared: 18, 26, 20. Two closest: [3,3] (18) and [-2,4] (20).

### Example 3
```
Input:  points = [[0, 1], [1, 0]],  k = 2
Output: [[0, 1], [1, 0]]
```

## Constraints
- `1 <= k <= points.length <= 10^4`
- `-10^4 <= xi, yi <= 10^4`

## Hints

<details>
<summary>Hint 1 — adapt the top-K pattern to use distance as the key</summary>

This is the "top K" pattern from Q8/Q9, but the comparison key is squared Euclidean distance instead of the raw value.

Use a **max-heap** of size k ordered by distance. The root holds the farthest point among the k closest seen so far. When a new point is closer than the root, swap it in.
</details>

<details>
<summary>Hint 2 — custom comparator for the heap</summary>

```js
const dist = ([x, y]) => x * x + y * y;

// max-heap by distance: comparator returns positive if a is closer (should be popped later)
// i.e., we want the FARTHEST at the root → comparator (a, b) => dist(b) - dist(a)
const pq = new PriorityQueue((a, b) => dist(b) - dist(a));
```

Push each point. If heap size exceeds k, pop the farthest (root). What remains is the k closest.
</details>

<details>
<summary>Hint 3 — alternatively: sort by distance</summary>

Sort `points` by `x² + y²` and return the first `k`. This is O(n log n) time — simpler but slower than the heap approach.
</details>

## Write your solution
→ [`../solutions/14-k-closest-points-to-origin.js`](../solutions/14-k-closest-points-to-origin.js)

## Follow-ups
- What if the input were a stream and you needed to maintain the k closest at all times?
- Can QuickSelect solve this in O(n) average time? (Yes — partition by distance.)
- **K closest points to a query point** (not the origin) — how does the formula change?
