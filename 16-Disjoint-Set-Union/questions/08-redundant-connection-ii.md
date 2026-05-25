# Q8 — Redundant Connection II (Directed)

**Difficulty:** Medium
**Pattern:** DSU — directed graph, in-degree analysis + cycle detection
**Expected:** O(n · α(n)) time · O(n) space

## Problem

In this problem, a **directed** rooted tree has `n` nodes labeled `1` to `n`. The tree's root is node `1`, and every node except the root has exactly one parent.

Exactly **one extra directed edge** has been added. Return the edge that can be removed so the remaining graph is a valid rooted tree. If there are multiple answers, return the one that appears **last** in the input.

> **Why is directed harder?** In an undirected graph, any edge in a cycle is a candidate. In a directed graph, a node might have two parents (in-degree 2), which violates the tree property even without a traditional cycle. You must handle both cases.

## Examples

### Example 1

```
Input:  edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
```

Node 3 has in-degree 2 (from 1 and 2). Removing [2,3] leaves a valid directed tree.

### Example 2

```
Input:  edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
Output: [4,1]
```

No node has in-degree 2, but there's a cycle: 1→2→3→4→1. The cycle-closing edge is [4,1].

### Example 3

```
Input:  edges = [[2,1],[3,1],[4,2],[1,4]]
Output: [2,1]
```

Node 1 has in-degree 2 (from nodes 2 and 3). Candidate edges: [2,1] and [3,1]. Must figure out which one to remove. Answer: [2,1].

## Constraints

- `n == edges.length`
- `3 <= n <= 1000`
- `edges[i].length == 2`
- `1 <= a, b <= n`
- `a != b`
- No duplicate edges.

## Hints

<details>
<summary>Hint 1 — two cases to handle</summary>

**Case 1 — a node has in-degree 2:**
Find the node with two parents. Call the two edges into it `cand1` (appears first) and `cand2` (appears last).
- Try removing `cand2` (the later one). If the remaining graph is a valid tree, return `cand2`.
- Otherwise, return `cand1`.

**Case 2 — no node has in-degree 2 (pure cycle):**
There's a cycle among directed edges. Find the edge in the cycle that appears last. Return it. (This is like the original Redundant Connection problem but with directed edges.)
</summary>

<details>
<summary>Hint 2 — detecting in-degree 2</summary>

Scan all edges and count in-degrees (number of edges pointing into each node). If any node has in-degree ≥ 2, you're in Case 1.

Store the two candidate edges (first and last edge pointing into the duplicated node).
</details>

<details>
<summary>Hint 3 — using DSU for cycle detection</summary>

Build a DSU treating all edges as undirected, but skip one of the two candidate edges:
- First try: skip `cand2`. If DSU finds a cycle → return `cand1`.
- Otherwise: return `cand2`.

For Case 2 (no in-degree 2): process edges with DSU and return the first edge where `union` fails (same component).
</details>

## Write your solution

→ [`../solutions/08-redundant-connection-ii.js`](../solutions/08-redundant-connection-ii.js)

## Follow-ups

- **Q07 — Redundant Connection**: the simpler undirected version. Do that first if you haven't.
- Why can't you just treat all edges as undirected and run the Q07 solution here?
