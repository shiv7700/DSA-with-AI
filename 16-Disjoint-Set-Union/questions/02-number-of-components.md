# Q2 — Number of Connected Components in an Undirected Graph

**Difficulty:** Easy
**Pattern:** DSU — count components
**Expected:** O(n + e · α(n)) time · O(n) space

## Problem

You are given `n` nodes labeled `0` to `n - 1` and a list of undirected edges where `edges[i] = [a, b]` means there is an edge between node `a` and node `b`.

Return the **number of connected components** in the graph.

> **What's a connected component?** A maximal group of nodes where every node can reach every other node by following edges. If a node has no edges, it forms a component by itself.

## Examples

### Example 1

```
Input:  n = 5,  edges = [[0,1],[1,2],[3,4]]
Output: 2
```

```
Visualization:
  0 — 1 — 2        3 — 4

Component 1: {0, 1, 2}
Component 2: {3, 4}
```

### Example 2

```
Input:  n = 5,  edges = [[0,1],[1,2],[2,3],[3,4]]
Output: 1
```

```
Visualization:
  0 — 1 — 2 — 3 — 4

All nodes are connected: one component.
```

### Example 3

```
Input:  n = 4,  edges = []
Output: 4
```

No edges — every node is its own component.

### Example 4

```
Input:  n = 1,  edges = []
Output: 1
```

## Constraints

- `1 <= n <= 2000`
- `0 <= edges.length <= 5000`
- `edges[i].length == 2`
- `0 <= a, b < n`
- `a != b`
- No duplicate edges.

## Hints

<details>
<summary>Hint 1 — how DSU tracks components naturally</summary>

When you initialize `DSU(n)`, every node is its own component → `components = n`.

Each time `union(a, b)` successfully merges two nodes that were in different components, `components` decreases by 1.

At the end, `dsu.components` is the answer. No extra work needed.
</details>

<details>
<summary>Hint 2 — the full algorithm</summary>

```
1. Create DSU(n).
2. For each edge [a, b] in edges:
     union(a, b)   ← this decrements components if they were separate
3. Return dsu.components.
```

That's the whole thing. The key insight is that DSU's `components` counter tracks exactly what you need.
</details>

<details>
<summary>Hint 3 — what if you don't have a components counter?</summary>

Count the number of roots: after processing all edges, loop from 0 to n-1 and count how many nodes satisfy `find(i) === i`. Each such node is the root of exactly one component.

```js
let count = 0;
for (let i = 0; i < n; i++) {
  if (dsu.find(i) === i) count++;
}
return count;
```
</details>

## Write your solution

→ [`../solutions/02-number-of-components.js`](../solutions/02-number-of-components.js)

## Follow-ups

- **Q03 — Friend Circles**: the same problem, but the input is an adjacency matrix instead of an edge list.
- What if `n` can be 100 000? Does your solution still work?
- Could you solve this with DFS or BFS instead? Compare the code length and complexity.
