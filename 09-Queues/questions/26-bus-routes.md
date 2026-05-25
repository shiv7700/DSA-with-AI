# Q26 — Bus Routes

**Difficulty:** Hard
**Pattern:** BFS on bus-route graph (not stop graph) — minimum buses
**Expected:** O(Σ|routes[i]|²) time · O(Σ|routes[i]|) space

## Problem

You are given an array `routes` where `routes[i]` is a bus route that the `i`th bus repeats **forever**. For example, if `routes[0] = [1, 5, 7]`, this means that the first bus travels `1 → 5 → 7 → 1 → 5 → 7 → 1 → …` forever.

You start at bus stop `source` and want to reach bus stop `target`. You can **board a new bus** at any stop where your current bus and another bus share a stop.

Return the **minimum number of buses** you must take to travel from `source` to `target`. Return `-1` if it is not possible.

**Signature:**
```js
function numBusesToDestination(routes, source, target) { ... }
```

## Examples

### Example 1
```
Input:  routes = [[1,2,7],[3,6,7]], source = 1, target = 6
Output: 2
(Take route 0 to stop 7, then transfer to route 1 to stop 6.)
```

### Example 2
```
Input:  routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
Output: -1
```

### Example 3
```
Input:  routes = [[1,2]], source = 1, target = 2
Output: 1
```

## Constraints
- `1 <= routes.length <= 500`
- `1 <= routes[i].length <= 10^5`
- All the values of `routes[i]` are unique.
- `sum(routes[i].length) <= 10^5`
- `0 <= routes[i][j], source, target <= 10^6`

## Hints

<details>
<summary>Hint 1 — BFS on stops is expensive</summary>

If you BFS on individual stops, the number of edges can be enormous (each stop could be on many routes). Instead, BFS on **routes** (buses): each node in the BFS is a route you board, not a stop you visit.
</details>

<details>
<summary>Hint 2 — preprocessing: build stop → routes mapping</summary>

Build a map: `stopToRoutes[stop]` = list of route indices that include this stop.

Then:
1. Enqueue all routes that include `source`. Mark them as visited. Start with `buses = 1`.
2. BFS: dequeue a route. For each stop on that route, if it's `target` → return current depth. Otherwise, for each other route that passes through this stop (using `stopToRoutes`), if unvisited, enqueue it.
</details>

<details>
<summary>Hint 3 — edge case</summary>

If `source === target`, return `0` immediately.
</details>

## Write your solution
→ [`../solutions/26-bus-routes.js`](../solutions/26-bus-routes.js)

## Follow-ups
- What if each bus route has a different cost per ride (not all cost 1)? You'd need Dijkstra on the route graph.
- How does this problem relate to "minimum number of hops through overlapping sets"? Can you generalize it?
