# Q5 — Has Path (BFS / DFS)

**Difficulty:** Easy
**Pattern:** BFS or DFS · Reachability
**Expected:** O(V + E) time · O(V) space

## Problem

Given a directed graph represented as an adjacency list, a `source` vertex, and a `destination` vertex, return `true` if there exists a path from `source` to `destination`, and `false` otherwise.

## Examples

### Example 1

```
Graph (directed):
  A → B → D
  ↓
  C → E

hasPath(graph, 'A', 'E') → true   (A → C → E)
hasPath(graph, 'A', 'D') → true   (A → B → D)
hasPath(graph, 'D', 'A') → false  (edges only go one way)
```

### Example 2

```
Graph (directed):
  0 → 1 → 3
  ↓
  2

hasPath(graph, 0, 3) → true
hasPath(graph, 2, 3) → false   (2 has no outgoing edges)
```

### Example 3 — Source equals destination

```
hasPath(graph, 'A', 'A') → true
```

### Example 4 — No path

```
Graph:
  X → Y     Z (isolated)

hasPath(graph, 'X', 'Z') → false
```

## Constraints

- `1 <= V <= 10^4`, `0 <= E <= 10^4`
- Graph is **directed** and may contain cycles.
- Source and destination are guaranteed to exist in the graph.

## Hints

<details>
<summary>Hint 1 — base case</summary>

If `source === destination`, return `true` immediately — you're already there.
</details>

<details>
<summary>Hint 2 — BFS approach</summary>

Standard BFS from `source`. If you ever dequeue `destination`, return `true`. If the queue empties without finding it, return `false`.

Make sure you have a `visited` set to avoid infinite loops in cyclic graphs.
</details>

<details>
<summary>Hint 3 — DFS approach</summary>

Recursive DFS:
```js
function hasPath(graph, src, dst, visited = new Set()) {
  if (src === dst) return true;
  if (visited.has(src)) return false;
  visited.add(src);
  for (const neighbor of graph.get(src) || []) {
    if (hasPath(graph, neighbor, dst, visited)) return true;
  }
  return false;
}
```
</details>

## Write your solution
→ [`../solutions/05-has-path.js`](../solutions/05-has-path.js)

## Follow-ups
- Return the **path itself** (the sequence of nodes from source to destination), not just true/false.
- Return the **shortest path** (fewest edges). Which traversal strategy is required for this?
- Count the total number of **distinct paths** from source to destination in a DAG.
