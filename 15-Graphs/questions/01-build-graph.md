# Q1 — Build a Graph (Adjacency List)

**Difficulty:** Easy
**Pattern:** Graph construction · Adjacency list
**Expected:** O(V + E) time · O(V + E) space

## Problem

Build a `Graph` class that uses an **adjacency list** internally. The class must support directed or undirected mode, and expose methods to add vertices, add edges, remove edges, and retrieve a vertex's neighbors.

This is your foundation for every other graph problem. Get it solid.

```
Implement:

class Graph {
  constructor(directed = false)   // if directed=false, edges go both ways
  addVertex(v)                    // add node v (no-op if it already exists)
  addEdge(u, v, weight = 1)       // add an edge between u and v
  removeEdge(u, v)                // remove the edge between u and v
  neighbors(v)                    // return array of neighbors of v
  hasEdge(u, v)                   // return true if edge exists
}
```

## Examples

### Example 1 — Undirected graph

```
addVertex('A')
addVertex('B')
addVertex('C')
addEdge('A', 'B')
addEdge('B', 'C')

neighbors('A') → ['B']
neighbors('B') → ['A', 'C']
neighbors('C') → ['B']
```

Drawn:
```
  A — B — C
```

### Example 2 — Directed graph (directed = true)

```
addEdge('A', 'B')
addEdge('A', 'C')
addEdge('C', 'A')

neighbors('A') → ['B', 'C']   (A points to B and C)
neighbors('B') → []            (nothing points out from B)
neighbors('C') → ['A']         (C points back to A)
```

Drawn:
```
  A ——→ B
  ↑  ↘
  |   C
  └───┘
```

### Example 3 — Weighted edges

```
addEdge('X', 'Y', 5)
addEdge('X', 'Z', 3)

neighbors('X') → [{ node: 'Y', weight: 5 }, { node: 'Z', weight: 3 }]
```

### Example 4 — removeEdge

```
addEdge('A', 'B')
addEdge('A', 'C')
removeEdge('A', 'B')

neighbors('A') → ['C']
```

## Constraints

- Vertex labels can be strings or numbers.
- `addVertex` on an existing vertex should be a no-op (don't reset its edges).
- `addEdge` should call `addVertex` internally if a vertex doesn't yet exist.
- Weighted and unweighted modes: your choice of internal format as long as `neighbors` is consistent.

## Hints

<details>
<summary>Hint 1 — data structure choice</summary>

Use a `Map` from vertex label → array of neighbors. A `Map` handles any key type cleanly and has O(1) `get`/`set`/`has`.

```js
this.adj = new Map();
```

For `addVertex`: `this.adj.set(v, [])` (only if not already present).
</details>

<details>
<summary>Hint 2 — undirected means two entries</summary>

For an undirected graph, `addEdge('A', 'B')` means A knows about B AND B knows about A:

```js
this.adj.get(u).push(v);
this.adj.get(v).push(u);   // ← only if undirected
```

For directed, only add the forward direction.
</details>

<details>
<summary>Hint 3 — removeEdge</summary>

Use `filter` to remove the target from the neighbor list:

```js
this.adj.set(u, this.adj.get(u).filter(n => n !== v));
if (!this.directed) {
  this.adj.set(v, this.adj.get(v).filter(n => n !== u));
}
```
</details>

## Write your solution
→ [`../solutions/01-build-graph.js`](../solutions/01-build-graph.js)

## Follow-ups
- Add a `vertices()` method that returns all vertex labels.
- Add an `edges()` method that returns all edges as `[u, v]` pairs.
- How would you modify the class to support weighted edges while also keeping an unweighted `hasEdge` check fast?
