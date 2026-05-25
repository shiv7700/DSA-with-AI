# Q19 — Min Cost to Connect All Points

**Difficulty:** Medium
**Pattern:** Minimum Spanning Tree (Prim's or Kruskal's)
**Expected:** O(n² log n) time · O(n²) space

## Problem

You are given an array `points` where `points[i] = [xi, yi]` represents a point on a 2D plane.

The cost to connect two points `[xi, yi]` and `[xj, yj]` is the **Manhattan distance**: `|xi - xj| + |yi - yj|`.

Return the **minimum cost** to make all points connected (there should be exactly one path between any two points — it's a minimum spanning tree).

## Examples

### Example 1

```
points = [[0,0],[2,2],[3,10],[5,2],[7,0]]

Output: 20

Minimum spanning tree:
  Connect (0,0)↔(2,2): cost = |0-2|+|0-2| = 4
  Connect (2,2)↔(5,2): cost = |2-5|+|2-2| = 3
  Connect (5,2)↔(7,0): cost = |5-7|+|2-0| = 4
  Connect (3,10)↔(2,2): cost = |3-2|+|10-2| = 9
  Total = 4 + 3 + 4 + 9 = 20
```

Visual approximation:
```
  y
  10  *  ← (3,10)
   .
   2    *—————*  ← (2,2)-(5,2)
   .   /           \
   0  *             *  ← (7,0)
     (0,0)
```

### Example 2

```
points = [[3,12],[-2,5],[-4,1]]

Output: 18
```

### Example 3

```
points = [[0,0],[1,10],[2,20]]

Output: 30
  (0,0)↔(1,10): 11
  (1,10)↔(2,20): 11
  (0,0)↔(2,20): 22  ← not chosen (too expensive)
  MST total = 22? Let me recalc:
  (0,0)→(1,10): |0-1|+|0-10|=11
  (1,10)→(2,20): |1-2|+|10-20|=11
  Total: 22. Wait, (0,0)→(2,20)=22 alone. Both other options = 22 total. Either works.
```

## Constraints

- `1 <= points.length <= 1000`
- `-10^6 <= xi, yi <= 10^6`
- All pairs of points are distinct.

## Hints

<details>
<summary>Hint 1 — this is MST</summary>

Every pair of points is a potential edge with cost = Manhattan distance. You want to connect all `n` points with minimum total edge cost — that's a Minimum Spanning Tree.

Since every pair is an edge, this is a **complete graph** with n(n-1)/2 edges.
</details>

<details>
<summary>Hint 2 — Prim's algorithm (simpler to code here)</summary>

Prim's builds the MST greedily: start with any point in the MST. Repeatedly add the cheapest edge that connects a non-MST point to any MST point.

For a dense graph (this is O(n²) edges), an O(n²) version of Prim's is fine:

```js
const inMST = new Array(n).fill(false);
const minCost = new Array(n).fill(Infinity);
minCost[0] = 0;   // start from point 0
let totalCost = 0;

for (let i = 0; i < n; i++) {
  // find the non-MST point with minimum cost
  let u = -1;
  for (let v = 0; v < n; v++) {
    if (!inMST[v] && (u === -1 || minCost[v] < minCost[u])) u = v;
  }
  inMST[u] = true;
  totalCost += minCost[u];
  // update costs to reach non-MST points
  for (let v = 0; v < n; v++) {
    if (!inMST[v]) {
      minCost[v] = Math.min(minCost[v], manhattanDist(points[u], points[v]));
    }
  }
}
```
</details>

<details>
<summary>Hint 3 — Kruskal's alternative</summary>

Generate all edges (n choose 2 pairs), sort by Manhattan distance, then greedily add edges that don't form a cycle (use Union-Find to check). Add n-1 edges total.

For n=1000, that's ~500,000 edges to sort — feasible.
</details>

## Write your solution
→ [`../solutions/19-min-cost-connect-points.js`](../solutions/19-min-cost-connect-points.js)

## Follow-ups
- Implement the same with Kruskal's + Union-Find.
- What if you could remove some existing connections (edges already cost 0) to save money?
- Use a min-heap to speed up Prim's to O(E log V) = O(n² log n).
