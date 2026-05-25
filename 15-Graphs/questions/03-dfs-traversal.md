# Q3 — DFS Traversal (Recursive & Iterative)

**Difficulty:** Easy
**Pattern:** Depth-First Search · Recursion · Stack
**Expected:** O(V + E) time · O(V) space

## Problem

Given an undirected graph (as an adjacency list) and a starting vertex, implement DFS traversal in **two ways**:

1. `dfsRecursive(graph, start)` — using recursion
2. `dfsIterative(graph, start)` — using an explicit stack (no recursion)

Both should return the array of vertices in the order they were first visited.

## Examples

### Example 1

```
Graph:
       1
      / \
     2   5
    / \
   3   4

Adjacency list:
  1: [2, 5]
  2: [1, 3, 4]
  3: [2]
  4: [2]
  5: [1]

dfsRecursive(graph, 1)  → [1, 2, 3, 4, 5]
dfsIterative(graph, 1)  → [1, 5, 2, 4, 3]   (stack reverses neighbor order)
```

Note: the two versions often produce different orderings — both are valid DFS orderings.

### Example 2 — Deeper graph

```
Graph:
  A — B — D
  |
  C — E

dfsRecursive(graph, 'A')  → ['A', 'B', 'D', 'C', 'E']  (order depends on adjacency list)
```

### Example 3 — Single node

```
dfsRecursive(graph, 'X') → ['X']
```

## Constraints

- `1 <= V <= 10^4`, `0 <= E <= 10^4`
- Return only nodes reachable from `start`.
- The graph may have cycles (undirected) — handle the visited set correctly.

## Hints

<details>
<summary>Hint 1 — recursive structure</summary>

The recursive version is beautifully simple:

```js
function dfsHelper(graph, node, visited, result) {
  visited.add(node);
  result.push(node);
  for (const neighbor of graph.get(node)) {
    if (!visited.has(neighbor)) {
      dfsHelper(graph, neighbor, visited, result);
    }
  }
}
```

Call it with a fresh `visited = new Set()` and `result = []`.
</details>

<details>
<summary>Hint 2 — iterative structure</summary>

Use a stack (just a JavaScript array with `push`/`pop`):

```js
const stack = [start];
const visited = new Set();

while (stack.length > 0) {
  const node = stack.pop();
  if (visited.has(node)) continue;   // skip if already processed
  visited.add(node);
  result.push(node);
  for (const neighbor of graph.get(node)) {
    if (!visited.has(neighbor)) stack.push(neighbor);
  }
}
```

In the iterative version, mark visited when you **pop** (not push) — otherwise the ordering gets complicated. This does mean duplicates can sit in the stack, but the `if (visited.has(node)) continue` guard handles it.
</details>

<details>
<summary>Hint 3 — why different orders?</summary>

Recursive DFS visits neighbors in the **original list order**, diving deep on the first neighbor before touching others.

Iterative DFS with a stack reverses the order because the last-pushed neighbor is popped first. You can make them match by reversing the neighbor list before pushing, but it's rarely necessary — both are valid DFS orderings.
</details>

## Write your solution
→ [`../solutions/03-dfs-traversal.js`](../solutions/03-dfs-traversal.js)

## Follow-ups
- What is the maximum recursion depth if the graph is a straight chain of N nodes?
- Modify DFS to detect a cycle in an undirected graph.
- How would you implement DFS iteratively on a **directed** graph?
