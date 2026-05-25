# Q3 — Friend Circles / Number of Provinces

**Difficulty:** Easy
**Pattern:** DSU — count components from adjacency matrix
**Expected:** O(n² · α(n)) time · O(n) space

## Problem

There are `n` cities. Some cities are directly connected to each other; others are not. If city A is directly or indirectly connected to city B, they are in the same **province**.

You are given an `n × n` matrix `isConnected` where `isConnected[i][j] = 1` means city `i` and city `j` are directly connected, and `isConnected[i][j] = 0` means they are not.

Return the **total number of provinces**.

> **Note:** This is identical to "Friend Circles" — just swap "cities" for "students" and "provinces" for "friend circles". The algorithm is the same.

## Examples

### Example 1

```
Input:  isConnected = [[1,1,0],
                        [1,1,0],
                        [0,0,1]]
Output: 2
```

City 0 and city 1 are connected → one province.
City 2 has no connections → its own province.
Total: 2 provinces.

### Example 2

```
Input:  isConnected = [[1,0,0],
                        [0,1,0],
                        [0,0,1]]
Output: 3
```

No connections at all. Each city is its own province.

### Example 3

```
Input:  isConnected = [[1,1,0],
                        [1,1,1],
                        [0,1,1]]
Output: 1
```

0↔1, 1↔2 → transitively, 0 and 2 are in the same province. All one province.

## Constraints

- `1 <= n <= 200`
- `n == isConnected.length == isConnected[i].length`
- `isConnected[i][j]` is `0` or `1`.
- `isConnected[i][i] == 1` (each city is connected to itself).
- `isConnected[i][j] == isConnected[j][i]` (undirected).

## Hints

<details>
<summary>Hint 1 — reading the matrix</summary>

The diagonal is always 1 (each city is connected to itself) — skip it.

For the upper triangle only (where `j > i`): if `isConnected[i][j] === 1`, call `union(i, j)`.

You only need the upper triangle because the graph is undirected (symmetric matrix).
</details>

<details>
<summary>Hint 2 — this is just Q2 with a different input format</summary>

Q2 gives you an edge list: `[[0,1],[1,2],...]`
This problem gives you an adjacency matrix: a grid.

Convert the matrix to unions, then return `dsu.components`. The rest is identical to Q2.
</details>

<details>
<summary>Hint 3 — alternative with DFS</summary>

You can also mark visited nodes with a `visited` boolean array, then DFS from each unvisited node (counting how many DFS calls you make). Each DFS call discovers one full component. But DSU is shorter here.
</details>

## Write your solution

→ [`../solutions/03-friend-circles.js`](../solutions/03-friend-circles.js)

## Follow-ups

- What is the time complexity? (You visit each cell in the n×n matrix once, and each `union` is O(α(n)) — total O(n² · α(n)).)
- If n = 200, how many cells do you examine in the worst case?
- **Q04 — Graph Valid Tree**: now you need to detect whether the resulting graph is a tree (no cycles, all connected).
