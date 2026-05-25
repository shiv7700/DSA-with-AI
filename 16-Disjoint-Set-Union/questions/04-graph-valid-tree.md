# Q4 — Graph Valid Tree

**Difficulty:** Easy
**Pattern:** DSU — cycle detection + connectivity check
**Expected:** O(n + e · α(n)) time · O(n) space

## Problem

You are given `n` nodes labeled `0` to `n - 1` and a list of undirected edges. Determine whether these nodes form a **valid tree**.

A valid tree must satisfy **both** conditions:

1. The graph is **fully connected** — every node can reach every other node.
2. The graph has **no cycles** — there is exactly one path between any two nodes.

> **Shortcut check:** a connected undirected graph on `n` nodes is a tree if and only if it has exactly `n - 1` edges. But you still need to verify there are no disconnected components — just having n-1 edges isn't enough if the graph is disconnected with a cycle in one part.

## Examples

### Example 1

```
Input:  n = 5,  edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true
```

```
      0
    / | \
   1  2  3
   |
   4
All connected, no cycles. ✅
```

### Example 2

```
Input:  n = 5,  edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false
```

Cycle: 1 — 2 — 3 — 1. ❌

### Example 3

```
Input:  n = 4,  edges = [[0,1],[2,3]]
Output: false
```

Two separate components — not fully connected. ❌

### Example 4

```
Input:  n = 1,  edges = []
Output: true
```

One node, no edges. A single node is a valid tree.

## Constraints

- `1 <= n <= 2000`
- `0 <= edges.length <= 5000`
- `edges[i].length == 2`
- `0 <= a, b < n`
- `a != b`
- No duplicate edges.

## Hints

<details>
<summary>Hint 1 — the two conditions to check</summary>

Condition 1 (no cycle): when processing edge `[a, b]`, if `find(a) === find(b)`, they're already connected — this edge would create a cycle. Return false immediately.

Condition 2 (fully connected): after processing all edges, check that `dsu.components === 1` (or equivalently, `edges.length === n - 1`).

Return `true` only if both conditions pass.
</details>

<details>
<summary>Hint 2 — the elegant shortcut</summary>

A graph with `n` nodes is a valid tree if and only if:
1. `edges.length === n - 1`, AND
2. After adding all edges, `dsu.components === 1`.

You could check condition 1 before even running DSU — if `edges.length !== n - 1`, return false immediately.

But to be safe (and practice DSU), run the full union loop and let `union` return false on any cycle.
</details>

<details>
<summary>Hint 3 — putting it together</summary>

```
1. If edges.length !== n - 1, return false immediately.
2. Initialize DSU(n).
3. For each edge [a, b]:
     if union(a, b) returns false → cycle detected → return false
4. Return dsu.components === 1.
   (With n-1 successful unions from n nodes, this should always be 1.)
```
</details>

## Write your solution

→ [`../solutions/04-graph-valid-tree.js`](../solutions/04-graph-valid-tree.js)

## Follow-ups

- Why is it sufficient to check `edges.length === n - 1` AND no cycle? Think about what each condition rules out.
- **Q07 — Redundant Connection**: now find the specific edge that creates the cycle (instead of just detecting whether one exists).
- Could you solve this with DFS? How would you detect cycles in an undirected graph using DFS?
