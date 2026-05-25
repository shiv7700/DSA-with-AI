# Q20 — Cheapest Flights Within K Stops

**Difficulty:** Medium
**Pattern:** Modified BFS / Bellman-Ford with stop constraint
**Expected:** O(K × E) time · O(V) space

## Problem

There are `n` cities connected by some flights. You are given an array `flights` where `flights[i] = [fromi, toi, pricei]` indicates there's a direct flight from city `fromi` to city `toi` with cost `pricei`.

Given three integers `src`, `dst`, and `k`, return the **cheapest price** from `src` to `dst` with **at most `k` stops**. If there is no such route, return `-1`.

Note: a stop is an intermediate city. A direct flight (no stops) means k = 0.

## Examples

### Example 1

```
n = 4
flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
src = 0, dst = 3, k = 1

Graph:
  0 —(100)→ 1 —(100)→ 2 —(100)→ 0 (cycle)
            1 —(600)→ 3
            2 —(200)→ 3

With at most 1 stop:
  Path 0→1→3: cost 100+600=700, stops=1 (city 1 is the stop) ✓
  Path 0→1→2→3: cost 100+100+200=400, stops=2 ✗ (exceeds k=1)

Output: 700
```

### Example 2

```
n = 3
flights = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 1

Options:
  0→2 direct: cost 500, 0 stops ✓
  0→1→2: cost 200, 1 stop ✓

Output: 200
```

### Example 3

```
n = 3
flights = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 0

Options:
  0→2 direct: cost 500, 0 stops ✓
  0→1→2: 1 stop — exceeds k=0 ✗

Output: 500
```

## Constraints

- `1 <= n <= 100`
- `0 <= flights.length <= (n * (n-1) / 2)`
- `0 <= fromi, toi < n`, `fromi != toi`
- `1 <= pricei <= 10^4`
- `0 <= src, dst, k < n`
- `src != dst`

## Hints

<details>
<summary>Hint 1 — why not plain Dijkstra?</summary>

Dijkstra finds the cheapest path, but doesn't respect a constraint on the number of stops. You might take a more expensive path that has fewer stops.

You need a shortest-path algorithm that also tracks stop count.
</details>

<details>
<summary>Hint 2 — Bellman-Ford with k iterations</summary>

Bellman-Ford relaxes all edges repeatedly. The key insight: after `i` iterations of relaxation (processing all edges), `dist[v]` holds the cheapest path using at most `i` edges (i-1 stops).

Run exactly `k + 1` iterations (k+1 edges = k stops):

```js
let dist = new Array(n).fill(Infinity);
dist[src] = 0;

for (let i = 0; i <= k; i++) {
  const temp = [...dist];   // copy so we don't use this round's updates
  for (const [from, to, price] of flights) {
    if (dist[from] !== Infinity && dist[from] + price < temp[to]) {
      temp[to] = dist[from] + price;
    }
  }
  dist = temp;
}

return dist[dst] === Infinity ? -1 : dist[dst];
```

The `temp` copy is crucial — it prevents using edges added in the same "round."
</details>

<details>
<summary>Hint 3 — BFS level-by-level</summary>

Alternative: BFS where each level = one flight hop. Track `[city, cost]` in the queue. Run BFS for at most `k+1` levels (k stops + 1 for the starting hop to dst).

Prune: if reaching a city costs more than the best known cost for that city at this hop count, skip it.
</details>

## Write your solution
→ [`../solutions/20-cheapest-flights.js`](../solutions/20-cheapest-flights.js)

## Follow-ups
- What is the minimum number of stops (ignoring cost)?
- **Swim in Rising Water** — find a path where the maximum edge weight is minimized. Modified Dijkstra or binary search + BFS.
- What if stops had a time cost too, and you wanted to minimize `price + 10 * stops`?
