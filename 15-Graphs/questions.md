# Graphs

> Networks, dependencies, maps, social connections — graphs model them all. Get comfortable with the 4 representations and the 5 core algorithms.

## Concept Check

1. Directed vs Undirected; Weighted vs Unweighted; Cyclic vs Acyclic.
2. Dense vs Sparse — affects representation choice.
3. Representations and their trade-offs:
   - Adjacency Matrix — O(V²) space
   - Adjacency List — O(V + E) space
   - Edge List
   - Implicit graph (grid, state space)
4. Why is BFS used for shortest path in **unweighted** graphs but **not** weighted?
5. When does DFS find shortest paths? (Never in general — only special cases.)
6. What is a DAG? Why is topological sort only defined for DAGs?

## Implement First

```js
class Graph {
  constructor(directed = false) {
    this.adj = new Map();
    this.directed = directed;
  }
  addVertex(v)            { /* */ }
  addEdge(u, v, w = 1)    { /* */ }
  removeEdge(u, v)        { /* */ }
  neighbors(v)            { /* */ }
}
```

## Traversal

1. BFS — iterative with a queue.
2. DFS — recursive AND iterative with a stack.
3. BFS / DFS on a 2D grid (rows × cols).
4. Print connected components in an undirected graph.
5. Count connected components.

## Easy / Medium

6. **Number of Islands** — DFS or BFS on grid.
7. **Max Area of Island**.
8. **Flood Fill**.
9. **Surrounded Regions** — capture all 'O' regions not on the border.
10. **Pacific Atlantic Water Flow**.
11. **Rotting Oranges** — multi-source BFS.
12. **01 Matrix** — distance to nearest 0.
13. **Walls and Gates**.
14. **Shortest Path in Binary Matrix** — BFS, 8 directions.
15. **Clone Graph** — DFS or BFS.
16. **Course Schedule** — cycle detection in directed graph.
17. **Course Schedule II** — topological order.
18. **Alien Dictionary** — derive order from sorted alien words.
19. **Minimum Height Trees**.
20. **Keys and Rooms** — can you visit all rooms?
21. **Find if Path Exists in Graph** — Union-Find or BFS.
22. **All Paths From Source to Target** in a DAG.
23. **Evaluate Division** — graph + DFS.
24. **Reconstruct Itinerary** — Hierholzer's algorithm (Eulerian path).
25. **Word Ladder** — BFS shortest transformation length.
26. **Word Ladder II** — return all shortest ladders.
27. **Is Graph Bipartite?** — BFS coloring.
28. **Possible Bipartition**.

## Shortest Path Algorithms

29. **Dijkstra's Algorithm** — implement with a binary heap.
30. **Bellman-Ford** — handles negative weights, detects negative cycles.
31. **Floyd-Warshall** — all-pairs shortest path, O(V³).
32. **A\*** — heuristic-guided Dijkstra (8-puzzle, grid pathing).
33. **0-1 BFS** — using a deque for 0/1 weighted graphs.
34. **Network Delay Time** — single-source shortest path.
35. **Cheapest Flights Within K Stops**.
36. **Path with Minimum Effort**.
37. **Swim in Rising Water**.

## Minimum Spanning Tree

38. **Prim's Algorithm** — with binary heap.
39. **Kruskal's Algorithm** — with Union-Find.
40. **Min Cost to Connect All Points**.

## Topological Sort

41. **Topological Sort** — Kahn's algorithm (BFS).
42. **Topological Sort** — DFS post-order reverse.
43. **Detect Cycle in Directed Graph** — 3-color / WHITE-GRAY-BLACK.
44. **Detect Cycle in Undirected Graph** — DFS or Union-Find.

## Strongly Connected Components

45. **Tarjan's Algorithm** for SCC.
46. **Kosaraju's Algorithm** for SCC.
47. **Critical Connections / Bridges** in a graph (Tarjan).
48. **Articulation Points / Cut Vertices**.

## Hard

49. **Word Ladder II**.
50. **Reconstruct Itinerary** with Hierholzer.
51. **Couples Holding Hands** — Union-Find.
52. **Number of Distinct Islands**.
53. **Maximum Flow** — Ford-Fulkerson / Edmonds-Karp.
54. **Bipartite Matching** — Hopcroft-Karp.
55. **Travelling Salesman** — bitmask DP.

## Grid Pattern Drill

56. Direction vectors trick: `const dirs = [[-1,0],[1,0],[0,-1],[0,1]];`
57. Multi-source BFS — start with all sources in the queue.
58. When should you backtrack (undo `visited`) vs not?
