# Q5 — Find if Path Exists in an Undirected Graph

**Difficulty:** Easy
**Pattern:** DSU — single connectivity query
**Expected:** O((n + e) · α(n)) time · O(n) space

## Problem

You are given `n` nodes labeled `0` to `n - 1` and a list of undirected edges. You are also given two nodes `source` and `destination`.

Return `true` if there is a **valid path** from `source` to `destination`, or `false` otherwise.

> **What "valid path" means:** a sequence of distinct nodes where each adjacent pair is connected by an edge.

## Examples

### Example 1

```
Input:  n = 3,  edges = [[0,1],[1,2],[2,0]],  source = 0,  destination = 2
Output: true
```

Path: 0 → 1 → 2. Also: 0 → 2 directly.

### Example 2

```
Input:  n = 6,  edges = [[0,1],[0,2],[3,5],[5,4],[4,3]],  source = 0,  destination = 5
Output: false
```

```
  0 — 1          3
  |          /   |
  2         5    4
```

Node 0 and node 5 are in different components. No path exists.

### Example 3

```
Input:  n = 1,  edges = [],  source = 0,  destination = 0
Output: true
```

Source equals destination. A path of length 0 always exists.

## Constraints

- `1 <= n <= 2 * 10^5`
- `0 <= edges.length <= 2 * 10^5`
- `edges[i].length == 2`
- `0 <= a, b < n`
- `a != b`
- No duplicate edges.
- `0 <= source, destination < n`

## Hints

<details>
<summary>Hint 1 — path existence = same component</summary>

In an undirected graph, a path exists from `source` to `destination` if and only if they are in the same connected component.

So: build DSU, add all edges, then return `dsu.connected(source, destination)`.
</details>

<details>
<summary>Hint 2 — edge case: source === destination</summary>

If `source === destination`, return `true` immediately (a node can always reach itself). Your DSU's `connected` method will handle this correctly anyway (since `find(x) === find(x)` is always true), but it's good to be aware.
</details>

<details>
<summary>Hint 3 — overkill note</summary>

For this specific problem, a simple BFS or DFS works just as well and might be more intuitive. DSU gives you a bonus: after building it once, you can answer any number of path queries in O(α(n)) each. BFS/DFS would need to re-run from scratch for each query. That's why DSU shines when there are many connectivity questions on the same graph.
</details>

## Write your solution

→ [`../solutions/05-path-exists.js`](../solutions/05-path-exists.js)

## Follow-ups

- What if you need to answer `q` different path queries on the same graph? How does DSU's efficiency compare to DFS/BFS?
- **Q02 — Number of Connected Components**: after answering this question, Q02 is just extending the same idea.
