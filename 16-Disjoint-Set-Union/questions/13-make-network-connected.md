# Q13 — Number of Operations to Make Network Connected

**Difficulty:** Medium
**Pattern:** DSU — count components, count redundant edges
**Expected:** O(e · α(n)) time · O(n) space

## Problem

You have `n` computers numbered `0` to `n - 1`, connected by cables (edges). Each cable connects exactly two computers.

You can **remove** any cable and **reconnect** it between any two unconnected computers.

Return the **minimum number of cable reconnections** needed to make all computers connected. If it's impossible, return `-1`.

## Examples

### Example 1

```
Input:  n = 4,  connections = [[0,1],[0,2],[1,2]]
Output: 1
```

There are 3 cables and 2 components: {0,1,2} and {3}. One redundant cable (0-1, 0-2, and 1-2 form a cycle — any one is redundant). Move one redundant cable to connect 3.

### Example 2

```
Input:  n = 6,  connections = [[0,1],[0,2],[0,3],[1,2]]
Output: 2
```

Components: {0,1,2,3}, {4}, {5}. Redundant cable: the one creating a cycle in the first group. We can only move 1 cable per operation. We need 2 reconnections to connect {4} and {5}.

Wait — we have 1 redundant cable but need 2 operations. Not enough cables → return -1?

Let's recount: 4 cables, 6 nodes. To connect 6 nodes we need at least 5 cables. 4 < 5. Return -1.

### Example 3

```
Input:  n = 6,  connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
Output: 2
```

5 cables (enough for 6 nodes). Components after adding all: {0,1,2,3}, {4}, {5}. Redundant cables: [1,2] and [1,3] (or [0,2] and [0,3]) since there's a multi-cycle. 2 redundant cables, 2 components to connect. Answer: 2.

## Constraints

- `1 <= n <= 10^5`
- `1 <= connections.length <= min(n*(n-1)/2, 10^5)`
- `connections[i].length == 2`
- `0 <= a, b < n`
- `a != b`
- No duplicate connections.

## Hints

<details>
<summary>Hint 1 — impossibility check</summary>

To connect `n` nodes, you need at least `n - 1` cables. If `connections.length < n - 1`, return `-1` immediately.
</details>

<details>
<summary>Hint 2 — counting redundant cables</summary>

Process each connection with DSU. When `union(a, b)` returns `false` (they were already in the same component), that cable is **redundant** — it creates a cycle and could be reused.

Count all redundant cables.
</details>

<details>
<summary>Hint 3 — the answer</summary>

After processing all connections:
- Let `components = dsu.components` (number of separate groups, including isolated nodes).
- Let `redundant` = number of cables where `union` returned false.
- You need `components - 1` reconnections to join all components into one.
- If `redundant >= components - 1`: return `components - 1`.
- Otherwise: return `-1` (not enough cables to redistribute).

With the impossibility check from Hint 1, if `connections.length >= n - 1` you always have enough redundant cables. So with that check, you can just return `components - 1`.
</details>

## Write your solution

→ [`../solutions/13-make-network-connected.js`](../solutions/13-make-network-connected.js)

## Follow-ups

- Why is `connections.length >= n - 1` a sufficient condition (not just necessary)?
- **Q06 — Earliest Friends**: another "when does everything connect?" problem.
