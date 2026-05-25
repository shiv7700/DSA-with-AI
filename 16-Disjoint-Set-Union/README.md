# 16 — Disjoint Set Union (Union-Find)

> DSU answers one question with near-magical speed: **"Are these two things in the same group?"** A `parent` array, two small optimizations, and you have a data structure that handles millions of queries in almost constant time. It's the backbone of Kruskal's MST algorithm and the go-to tool for any problem that streams edges and needs online connectivity answers.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — the problem, naive DSU, path compression, union by rank/size, complexity analysis, MST preview, and gotchas.
2. Implement the class yourself before looking at any question. The whole data structure is about 30 lines.
3. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
4. Write your solution in the matching `solutions/<NN>-<slug>.js`.
5. Tick off the checklist below as you finish.

## Progress

### Foundation
- [ ] [01 — Implement DSU (with Path Compression + Union by Rank)](./questions/01-implement-dsu.md)

### Easy (warm-up)
- [ ] [02 — Number of Connected Components](./questions/02-number-of-components.md)
- [ ] [03 — Friend Circles / Provinces](./questions/03-friend-circles.md)
- [ ] [04 — Graph Valid Tree](./questions/04-graph-valid-tree.md)
- [ ] [05 — Find if Path Exists](./questions/05-path-exists.md)
- [ ] [06 — Earliest Moment Everyone Becomes Friends](./questions/06-earliest-friends.md)

### Medium
- [ ] [07 — Redundant Connection](./questions/07-redundant-connection.md)
- [ ] [08 — Redundant Connection II (directed)](./questions/08-redundant-connection-ii.md)
- [ ] [09 — Accounts Merge](./questions/09-accounts-merge.md)
- [ ] [10 — Most Stones Removed with Same Row or Column](./questions/10-most-stones-removed.md)
- [ ] [11 — Satisfiability of Equality Equations](./questions/11-equality-equations.md)
- [ ] [12 — Regions Cut by Slashes](./questions/12-regions-cut-by-slashes.md)
- [ ] [13 — Number of Operations to Make Network Connected](./questions/13-make-network-connected.md)
- [ ] [14 — Smallest String With Swaps](./questions/14-smallest-string-swaps.md)
- [ ] [15 — Lexicographically Smallest Equivalent String](./questions/15-lex-smallest-equivalent.md)
- [ ] [16 — Find Latest Group of Size M](./questions/16-latest-group-of-size-m.md)
- [ ] [17 — Surrounded Regions](./questions/17-surrounded-regions.md)
- [ ] [18 — Couples Holding Hands](./questions/18-couples-holding-hands.md)
- [ ] [19 — Kruskal's MST](./questions/19-kruskals-mst.md)
- [ ] [20 — Minimum Cost to Connect All Points](./questions/20-min-cost-connect-points.md)

### Hard
- [ ] [21 — Number of Islands II](./questions/21-number-of-islands-ii.md)
- [ ] [22 — Bricks Falling When Hit](./questions/22-bricks-falling.md)
- [ ] [23 — Swim in Rising Water](./questions/23-swim-in-rising-water.md)
- [ ] [24 — Largest Component Size by Common Factor](./questions/24-largest-component-common-factor.md)
- [ ] [25 — Process Restricted Friend Requests](./questions/25-restricted-friend-requests.md)
- [ ] [26 — Optimize Water Distribution in a Village](./questions/26-water-distribution.md)
- [ ] [27 — Min Cost to Make at Least One Valid Path in a Grid](./questions/27-min-cost-valid-path-grid.md)

### Weighted / Variant Union-Find
- [ ] [28 — Evaluate Division](./questions/28-evaluate-division.md)
- [ ] [29 — Sentence Similarity II](./questions/29-sentence-similarity-ii.md)
- [ ] [30 — Check if There is a Valid Path in a Grid](./questions/30-valid-path-in-grid.md)

### Conceptual Drills
- [ ] [31 — DSU Without Path Compression — Benchmark](./questions/31-dsu-no-path-compression.md)
- [ ] [32 — Union by Size vs Union by Rank](./questions/32-size-vs-rank.md)
- [ ] [33 — Can DSU Support Edge Deletion?](./questions/33-dsu-deletion.md)

## Related Topics

- [12 — Graphs](../12-Graphs/) — BFS / DFS are the alternatives to DSU for connectivity.
- [13 — Minimum Spanning Tree](../13-MST/) — Kruskal's algorithm is DSU in action.
- [19 — Two Pointers](../19-Two-Pointers/) — used alongside DSU in some problems.
