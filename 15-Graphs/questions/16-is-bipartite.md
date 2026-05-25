# Q16 — Is Graph Bipartite?

**Difficulty:** Medium
**Pattern:** BFS 2-coloring · Graph coloring
**Expected:** O(V + E) time · O(V) space

## Problem

Given an undirected graph represented as an **adjacency list** (array of arrays, where `graph[i]` lists all neighbors of node `i`), determine if the graph is **bipartite**.

A graph is bipartite if you can split its vertices into **two groups** such that every edge connects a vertex from group A to a vertex from group B — no edge connects two vertices in the same group.

Equivalently: a graph is bipartite if and only if it has **no odd-length cycles**.

## Examples

### Example 1 — bipartite

```
graph = [[1,3],[0,2],[1,3],[0,2]]

  0 — 1
  |   |
  3 — 2

Output: true

Coloring:
  Group A: 0, 2
  Group B: 1, 3
  Every edge goes between the groups. ✓
```

### Example 2 — not bipartite

```
graph = [[1,2,3],[0,2],[0,1,3],[0,2]]

  0 — 1
  |\ /|
  | X |
  |/ \|
  3 — 2

Output: false

Node 0, 1, 2 form a triangle (odd cycle) — impossible to 2-color.
```

### Example 3 — disconnected graph

```
graph = [[1],[0],[3],[2]]

  0 — 1     2 — 3

Output: true   (both components are 2-colorable)
```

## Constraints

- `1 <= graph.length <= 100` (V nodes, labeled 0 to V-1)
- `0 <= graph[i].length <= 100`
- No self-loops. Edges are symmetric (`graph[u]` contains `v` iff `graph[v]` contains `u`).

## Hints

<details>
<summary>Hint 1 — 2-coloring</summary>

Try to color nodes with two colors (0 and 1) such that no two adjacent nodes share the same color.

BFS: assign color 0 to the start node. For each neighbor, assign the opposite color. If a neighbor already has the same color as the current node → not bipartite.
</details>

<details>
<summary>Hint 2 — handle disconnected graphs</summary>

Loop over all nodes. If a node is uncolored, start a fresh BFS from it. The graph is bipartite only if ALL connected components are 2-colorable.

```js
const color = new Array(V).fill(-1);
for (let i = 0; i < V; i++) {
  if (color[i] === -1) {
    // BFS from i
    if (!bfsCheck(i)) return false;
  }
}
return true;
```
</details>

<details>
<summary>Hint 3 — flipping colors</summary>

The key line: `color[neighbor] = 1 - color[current]`.

If current is 0, neighbor gets 1. If current is 1, neighbor gets 0.

If `color[neighbor]` is already set AND equals `color[current]`, the graph is not bipartite.
</details>

## Write your solution
→ [`../solutions/16-is-bipartite.js`](../solutions/16-is-bipartite.js)

## Follow-ups
- Return the two groups (arrays of node IDs) if the graph is bipartite.
- **Possible Bipartition**: given friendships and "disliked" pairs, can you split people into two groups such that no one is in the same group as someone they dislike? (Same bipartite check, different framing.)
- Prove: a graph is bipartite if and only if it contains no odd-length cycle.
