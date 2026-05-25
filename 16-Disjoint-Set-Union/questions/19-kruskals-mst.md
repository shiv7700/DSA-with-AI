# Q19 — Kruskal's Minimum Spanning Tree

**Difficulty:** Medium
**Pattern:** DSU — sort edges, greedily add non-cycle edges
**Expected:** O(e log e) time · O(n) space

## Problem

You are given `n` nodes (labeled `0` to `n - 1`) and a list of weighted undirected edges `edges` where `edges[i] = [u, v, weight]`.

Return the **total weight** of the Minimum Spanning Tree (MST).

A **Minimum Spanning Tree** is a subset of edges that:
1. Connects all `n` nodes.
2. Has no cycles.
3. Has the minimum possible total edge weight.

If the graph is disconnected and no MST exists, return `-1`.

> **Real-world analogy:** you're laying electrical cables between cities. Each cable between two cities costs a certain amount. You want to connect all cities with the minimum total cable cost — no city should be isolated, and you shouldn't lay redundant cables.

## Examples

### Example 1

```
Input:  n = 4,  edges = [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]
Output: 19
```

Sort by weight: (2,3,4), (0,3,5), (0,2,6), (0,1,10), (1,3,15).

- (2,3,4): add. MST = {(2,3)}.  Components: 3
- (0,3,5): add. MST = {(2,3),(0,3)}. Components: 2
- (0,2,6): find(0) and find(2) → same component (both connected to 3). Skip.
- (0,1,10): add. MST = {(2,3),(0,3),(0,1)}. Components: 1. Done!

Total weight: 4 + 5 + 10 = 19.

### Example 2

```
Input:  n = 3,  edges = [[0,1,1],[1,2,2]]
Output: 3
```

Both edges needed: 1 + 2 = 3.

### Example 3 (disconnected)

```
Input:  n = 4,  edges = [[0,1,1],[2,3,2]]
Output: -1
```

Nodes {0,1} and {2,3} can't be connected. No MST possible.

## Constraints

- `2 <= n <= 1000`
- `1 <= edges.length <= 10^4`
- `edges[i].length == 3`
- `0 <= u, v < n`
- `u != v`
- `1 <= weight <= 1000`
- No duplicate edges.

## Hints

<details>
<summary>Hint 1 — Kruskal's algorithm overview</summary>

```
1. Sort edges by weight (ascending).
2. Initialize DSU(n).
3. For each edge (u, v, w) in sorted order:
     if union(u, v) returns true:   ← they were in different components
       add w to the MST total
       if dsu.components === 1: done! return total
4. If after all edges, components > 1: return -1 (disconnected graph)
```
</details>

<details>
<summary>Hint 2 — why sort by weight first?</summary>

Kruskal's greedy argument: processing the cheapest edges first ensures we never "miss" a cheaper edge that could replace an expensive one. Once an edge is added, it stays. The next edge we add is the cheapest that doesn't create a cycle.

Proof of correctness: the "Cut Property" of MSTs guarantees this greedy choice is always optimal.
</details>

<details>
<summary>Hint 3 — early termination</summary>

An MST has exactly `n - 1` edges. Once you've successfully added `n - 1` edges (i.e., `dsu.components === 1`), stop — there's no need to process the remaining (more expensive) edges.
</details>

## Write your solution

→ [`../solutions/19-kruskals-mst.js`](../solutions/19-kruskals-mst.js)

## Follow-ups

- **Q20 — Minimum Cost to Connect All Points**: Kruskal's on a complete graph derived from 2D coordinates.
- What is Prim's algorithm? How does it differ from Kruskal's in approach and when is each preferred?
- Can you reconstruct the actual MST edges (not just the total weight)?
