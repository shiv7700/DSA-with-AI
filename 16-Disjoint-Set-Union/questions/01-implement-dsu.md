# Q1 — Implement DSU (with Path Compression + Union by Rank)

**Difficulty:** Easy (Foundation)
**Pattern:** DSU implementation
**Expected:** O(α(n)) per operation · O(n) space

## Problem

Implement a **Disjoint Set Union (Union-Find)** data structure that supports the following operations efficiently:

- `new DSU(n)` — initialize the structure for `n` elements labeled `0` to `n-1`. Each element starts in its own group.
- `find(x)` — return the **root** (representative) of the group that contains element `x`. Must use **path compression**.
- `union(x, y)` — merge the group containing `x` with the group containing `y`. Must use **union by rank**. Return `true` if a merge happened, `false` if they were already in the same group.
- `connected(x, y)` — return `true` if `x` and `y` are in the same group, `false` otherwise.

> **Why implement it yourself first:** Every DSU problem in this chapter is "just use DSU and then...". If you can build the structure from scratch, everything else becomes much simpler. Think of this like implementing `Array.prototype.sort` before using it — you understand it at a deeper level.

## Examples

### Example 1 — basic usage

```
dsu = new DSU(5)   // elements: 0, 1, 2, 3, 4  (each in its own group)

dsu.connected(0, 1)  →  false
dsu.union(0, 1)      →  true   (merged groups {0} and {1} → {0,1})
dsu.connected(0, 1)  →  true
dsu.union(1, 2)      →  true   (merged {0,1} and {2} → {0,1,2})
dsu.connected(0, 2)  →  true
dsu.union(3, 4)      →  true   (merged {3} and {4} → {3,4})
dsu.connected(0, 3)  →  false  (still two separate groups)
dsu.union(2, 3)      →  true   (merged everything → {0,1,2,3,4})
dsu.connected(0, 4)  →  true
```

### Example 2 — union on already-connected elements

```
dsu = new DSU(3)
dsu.union(0, 1)      →  true
dsu.union(0, 1)      →  false  (already the same group)
dsu.union(1, 0)      →  false  (order doesn't matter — same group)
```

## Constraints

- `1 <= n <= 10^5`
- `0 <= x, y < n`
- Up to `10^5` operations total.

## Requirements

1. `find(x)` must implement **path compression** — after finding the root, point every visited node directly to the root.
2. `union(x, y)` must implement **union by rank** — attach the lower-rank tree under the higher-rank tree. When ranks are equal, attach either and increment the new root's rank.
3. `union(x, y)` must return `false` (without changing anything) if `x` and `y` are already in the same group.
4. You may store any additional arrays that help (`size`, `components`, etc.).

## Hints

<details>
<summary>Hint 1 — data to store</summary>

You need at minimum:
- `this.parent` — an array where `parent[i]` is the parent of node `i`. Initialize as `parent[i] = i` (each node is its own root).
- `this.rank` — an array of heights, initialized to all 0.

Optionally:
- `this.size` — size of each group (useful for later questions).
- `this.components` — count of separate groups.
</details>

<details>
<summary>Hint 2 — implementing find with path compression</summary>

The recursive version is clean:

```js
find(x) {
  if (this.parent[x] === x) return x;           // x is the root
  this.parent[x] = this.find(this.parent[x]);   // compress the path
  return this.parent[x];
}
```

The trick: on the way back up from the recursive call, you re-point `parent[x]` directly to the root (not just to its old parent). All nodes on the path get flattened.
</details>

<details>
<summary>Hint 3 — implementing union by rank</summary>

```
rootX = find(x)
rootY = find(y)
if rootX === rootY: return false (already connected)

Compare ranks:
  if rank[rootX] < rank[rootY]: parent[rootX] = rootY
  if rank[rootX] > rank[rootY]: parent[rootY] = rootX
  if rank[rootX] === rank[rootY]: parent[rootY] = rootX, rank[rootX]++

return true
```

The rank only increases when you merge two trees of equal rank. This guarantees the tree height stays O(log n).
</details>

<details>
<summary>Hint 4 — why return a boolean from union?</summary>

Returning `true` when a merge actually happened (i.e., the two elements were in different groups) and `false` when they were already connected turns out to be very useful in many problems:

- **Cycle detection**: if you're adding edges one by one and `union(u, v)` returns `false`, you just found a cycle (because u and v were already connected without this edge).
- **Kruskal's MST**: skip the edge if `union` returns false.
- **Counting merges**: the number of `true` returns equals the number of components reduced.
</details>

## Write your solution

→ [`../solutions/01-implement-dsu.js`](../solutions/01-implement-dsu.js)

## Follow-ups

- Implement the same class using **union by size** instead of union by rank. Does your test suite still pass?
- Add a `getSize(x)` method that returns the size of the group containing `x`.
- Add a `components` property that always reflects the current number of separate groups.
- Try implementing `find` iteratively instead of recursively. Does the path compression still work?
