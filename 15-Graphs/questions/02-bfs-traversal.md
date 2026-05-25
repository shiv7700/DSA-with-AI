# Q2 — BFS Traversal

**Difficulty:** Easy
**Pattern:** Breadth-First Search · Queue
**Expected:** O(V + E) time · O(V) space

## Problem

Given an undirected graph (as an adjacency list) and a starting vertex, return the **BFS traversal order** — the order in which nodes are first visited when traversing level by level.

Use an iterative approach (queue).

## Examples

### Example 1

```
Graph:
  1 — 2 — 5
  |   |
  3   4

Adjacency list:
  1: [2, 3]
  2: [1, 4, 5]
  3: [1]
  4: [2]
  5: [2]

bfsTraversal(graph, 1) → [1, 2, 3, 4, 5]
```

Visiting order:
- Level 0: 1
- Level 1: 2, 3 (neighbors of 1)
- Level 2: 4, 5 (new neighbors of 2; 1 already visited)

### Example 2 — Disconnected graph

```
Graph:
  A — B     C — D

bfsTraversal(graph, 'A') → ['A', 'B']
```
Only nodes reachable from A are returned. C and D are in a separate component.

### Example 3 — Single node

```
bfsTraversal(graph, 'X') → ['X']
```

## Constraints

- `1 <= V <= 10^4`, `0 <= E <= 10^4`
- The graph may be disconnected. Return only nodes reachable from `start`.
- Neighbors are visited in the order they appear in the adjacency list.

## Hints

<details>
<summary>Hint 1 — queue setup</summary>

Initialize the queue with just the start node. Also create a `visited` Set and add the start node immediately (before the loop, not after you dequeue — otherwise you can enqueue duplicates).

```js
const queue = [start];
const visited = new Set([start]);
```
</details>

<details>
<summary>Hint 2 — the loop</summary>

While the queue is not empty:
1. Dequeue the front element (use `queue.shift()`).
2. Add it to the result array.
3. For each neighbor, if not visited, mark it visited and enqueue it.

Order matters: mark visited when you **enqueue**, not when you **dequeue**.
</details>

<details>
<summary>Hint 3 — why mark when enqueuing?</summary>

If you mark visited when dequeuing (processing), the same node can be enqueued multiple times — once for each neighbor that points to it. This can make BFS O(V + E²) in the worst case. Always mark as visited when you enqueue.
</details>

## Write your solution
→ [`../solutions/02-bfs-traversal.js`](../solutions/02-bfs-traversal.js)

## Follow-ups
- Modify BFS to also return the **distance** (number of hops) from the start to each visited node.
- Return nodes grouped by level: `[[1], [2, 3], [4, 5]]`.
- Given a target node, stop BFS as soon as you reach it and return the distance.
