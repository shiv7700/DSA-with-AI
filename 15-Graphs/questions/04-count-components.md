# Q4 — Count Connected Components

**Difficulty:** Easy
**Pattern:** BFS / DFS over the whole graph · Visited tracking
**Expected:** O(V + E) time · O(V) space

## Problem

Given an undirected graph with `V` vertices (labeled `0` to `V - 1`) and an array of edges, return the number of **connected components**.

A connected component is a maximal group of vertices where every vertex is reachable from every other vertex via some path.

```
Input:  V = 5, edges = [[0, 1], [1, 2], [3, 4]]

Graph:
  0 — 1 — 2    3 — 4

Output: 2
```

## Examples

### Example 1

```
V = 5
edges = [[0, 1], [1, 2], [3, 4]]

  0 — 1 — 2     3 — 4
  └───────┘     └───┘
  component 1   component 2

Output: 2
```

### Example 2

```
V = 6
edges = [[0, 1], [0, 2], [3, 4], [3, 5], [4, 5]]

  0 — 1        3
  |           / \
  2          4 — 5

Output: 2
```

### Example 3 — No edges

```
V = 4
edges = []

  0   1   2   3   (every vertex is isolated)

Output: 4
```

### Example 4 — Fully connected

```
V = 4
edges = [[0,1],[1,2],[2,3],[3,0]]

  0 — 1
  |   |
  3 — 2

Output: 1
```

## Constraints

- `1 <= V <= 10^4`
- `0 <= edges.length <= 10^4`
- No self-loops. No duplicate edges.

## Hints

<details>
<summary>Hint 1 — the outer loop strategy</summary>

Build your adjacency list first. Then loop over every vertex from `0` to `V - 1`. If a vertex hasn't been visited yet, it's the start of a new component — increment your counter and run BFS or DFS from that vertex to mark all of its connected nodes as visited.
</details>

<details>
<summary>Hint 2 — template</summary>

```js
let components = 0;
const visited = new Set();

for (let v = 0; v < V; v++) {
  if (!visited.has(v)) {
    components++;
    bfs(v, visited, adj);   // or dfs(v, visited, adj)
  }
}
return components;
```
</details>

<details>
<summary>Hint 3 — alternative: Union-Find</summary>

This problem is a classic use case for Union-Find (disjoint set union). Initially each vertex is its own component. For each edge `[u, v]`, union the two sets. At the end, count distinct roots.

Union-Find gives O(α(V)) per operation — essentially O(1). But BFS/DFS is simpler to code and sufficient here.
</details>

## Write your solution
→ [`../solutions/04-count-components.js`](../solutions/04-count-components.js)

## Follow-ups
- Instead of the count, return an array where `result[i]` is the component ID of vertex `i`.
- What is the **size** of the largest connected component?
- Solve it using Union-Find (topic 13) for practice.
