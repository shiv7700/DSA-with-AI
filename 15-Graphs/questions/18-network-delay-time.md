# Q18 — Network Delay Time (Dijkstra)

**Difficulty:** Medium
**Pattern:** Dijkstra's algorithm · Single-source shortest path (weighted)
**Expected:** O((V + E) log V) time · O(V + E) space

## Problem

You have a network of `n` nodes labeled `1` to `n`. You are given a list of travel times as directed edges `times[i] = [ui, vi, wi]`, where `ui` is the source, `vi` is the target, and `wi` is the travel time.

We send a signal from node `k`. Return the **minimum time** for all `n` nodes to receive the signal. If it is impossible for all nodes to receive the signal, return `-1`.

## Examples

### Example 1

```
times = [[2,1,1],[2,3,1],[3,4,1]]
n = 4, k = 2

Graph:
  2 —(1)→ 1
  2 —(1)→ 3 —(1)→ 4

Signal sent from node 2.
  Node 1: reached at time 1
  Node 3: reached at time 1
  Node 4: reached at time 2 (via 2→3→4)

Output: 2   (node 4 is the last to receive the signal, at time 2)
```

### Example 2

```
times = [[1,2,1]]
n = 2, k = 2

Output: -1   (node 2 can only send to node 1, but nothing can reach node 2 from itself — 
               actually node 2 sends to 1 so 1 is reached at time 1. Wait, k=2, 
               signal starts from 2. Node 2 is already reached (time 0). Node 1 is 
               reached at time 1. But there's no edge from 2 to 2 and n=2, so all
               nodes reached. Output: 1.)
```

Actually let's redo:
```
times = [[1,2,1]]
n = 2, k = 1

Graph: 1 —(1)→ 2
Signal from node 1. Reaches node 2 at time 1. Output: 1.
```

### Example 3

```
times = [[1,2,1],[2,3,2],[1,3,4]]
n = 3, k = 1

Graph:
  1 —(1)→ 2 —(2)→ 3
  1 ————(4)————→ 3

Shortest to node 3:  1→2→3 = 1+2 = 3  (shorter than direct edge of 4)

Output: 3
```

## Constraints

- `1 <= k <= n <= 100`
- `1 <= times.length <= 6000`
- `times[i].length == 3`
- `1 <= ui, vi <= n`, `ui != vi`
- `0 <= wi <= 100`
- All (ui, vi) pairs are unique.

## Hints

<details>
<summary>Hint 1 — model the problem</summary>

This is a classic **single-source shortest path** problem on a weighted directed graph. You need the shortest distance from `k` to every other node, then return the maximum of those distances (because the signal must reach the LAST node).

If any node is unreachable, return `-1`.
</details>

<details>
<summary>Hint 2 — Dijkstra's algorithm</summary>

Dijkstra maintains `dist[v]` = current best known distance from source to `v`, initialized to `Infinity` for all nodes except the source (which is `0`).

Use a min-priority queue ordered by `dist[v]`. Always process the node with the smallest current distance.

When you process node `u`: for each edge `u→v` with weight `w`, if `dist[u] + w < dist[v]`, update `dist[v]` and re-enqueue `v`.
</details>

<details>
<summary>Hint 3 — JavaScript min-heap approximation</summary>

JavaScript has no built-in min-heap. For interview-sized inputs (n ≤ 100), you can use a sorted array or a simple approach:

```js
// Priority queue as sorted array (ok for small n):
const pq = [[0, k]];   // [distance, node]

while (pq.length > 0) {
  pq.sort((a, b) => a[0] - b[0]);   // sort by distance
  const [d, u] = pq.shift();
  if (d > dist[u]) continue;   // stale entry
  for (const [v, w] of adj.get(u) || []) {
    if (dist[u] + w < dist[v]) {
      dist[v] = dist[u] + w;
      pq.push([dist[v], v]);
    }
  }
}
```
</details>

## Write your solution
→ [`../solutions/18-network-delay-time.js`](../solutions/18-network-delay-time.js)

## Follow-ups
- What if edge weights could be negative? Would Dijkstra still work? (No — use Bellman-Ford.)
- **Path with Minimum Effort**: find a path from top-left to bottom-right of a grid minimizing the maximum height difference between consecutive cells. (Modified Dijkstra on a grid.)
- Implement a proper binary min-heap for the priority queue and compare performance.
