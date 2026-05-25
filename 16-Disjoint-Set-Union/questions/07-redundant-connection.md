# Q7 — Redundant Connection

**Difficulty:** Medium
**Pattern:** DSU — cycle detection, return the offending edge
**Expected:** O(n · α(n)) time · O(n) space

## Problem

You are given a graph with `n` nodes labeled `1` to `n`. The graph starts as a tree (no cycles), and exactly **one extra edge** has been added, creating exactly one cycle.

The input `edges` lists all edges in the order they were added. Return the **last edge** that can be removed to make the graph a tree again. If there are multiple candidates, return the one that appears **last in the input**.

> **Why "last"?** All edges in a cycle are technically "redundant" in the sense that any one of them could be removed to break the cycle. But the problem asks for the one that appears latest — that's the one that created the cycle (since you process edges one by one and a cycle can only be created by the final edge that closes it).

## Examples

### Example 1

```
Input:  edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
```

```
    1
   / \
  2 — 3   ← cycle created by edge [2,3] (the last one)
```

Removing [2,3] leaves a valid tree: 1-2 and 1-3.

### Example 2

```
Input:  edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
```

```
5 - 1 - 2
    |   |
    4 - 3
```

Edge [1,4] closes the cycle 1-2-3-4-1. It appears before [1,5] but after [1,2],[2,3],[3,4], so it's the one that created the cycle. [1,5] doesn't create a cycle.

Actually trace: [1,2] ok, [2,3] ok, [3,4] ok, [1,4]: find(1) and find(4) → same group (1→2→3→4, all connected). Cycle! Return [1,4].

## Constraints

- `n == edges.length`
- `3 <= n <= 1000`
- `edges[i].length == 2`
- `1 <= a, b <= n`
- `a != b`
- No duplicate edges.
- The given graph is connected.

## Hints

<details>
<summary>Hint 1 — when does an edge create a cycle?</summary>

Process edges one by one. When you call `union(a, b)`:
- If `find(a) !== find(b)`: safe to add. No cycle yet.
- If `find(a) === find(b)`: `a` and `b` are already in the same component. Adding this edge creates a cycle. **Return this edge.**

Since there's exactly one extra edge, the first time `union` returns `false` is your answer.
</details>

<details>
<summary>Hint 2 — node labeling</summary>

Nodes are labeled 1 to n (not 0 to n-1). Create `DSU(n + 1)` and just ignore index 0. This avoids off-by-one confusion.
</details>

<details>
<summary>Hint 3 — full algorithm</summary>

```
1. Initialize DSU(n + 1).  (nodes 1..n)
2. For each edge [a, b] in edges:
     if union(a, b) returns false:
       return [a, b]   ← this edge creates a cycle
3. (Should never reach here per problem guarantees)
```
</details>

## Write your solution

→ [`../solutions/07-redundant-connection.js`](../solutions/07-redundant-connection.js)

## Follow-ups

- **Q08 — Redundant Connection II**: same problem but the edges are now directed. Much harder.
- **Q04 — Graph Valid Tree**: instead of returning the bad edge, just detect whether one exists.
- If there were multiple "redundant" edges (multiple cycles), how would you find all of them?
