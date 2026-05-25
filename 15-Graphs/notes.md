# Graphs — Lessons from Zero

> 👋 Hey. This file is for someone who has never touched graphs before. We're going to go slow. Each lesson teaches **one small idea**. Don't skip. Don't rush. When you finish a lesson, you should feel a small win. That's the whole goal.
>
> Total reading time at a relaxed pace: about 120 minutes with breaks. **You do not have to read it all in one sitting.** Graphs is a dense topic — but every piece is approachable if you take it one at a time.

---

## Table of Lessons

1. [What is a graph? (the friend network idea)](#lesson-1)
2. [Graph vocabulary you absolutely need](#lesson-2)
3. [Directed vs undirected](#lesson-3)
4. [Weighted vs unweighted](#lesson-4)
5. [Cyclic vs acyclic — and what a DAG is](#lesson-5)
6. [Dense vs sparse — and why it matters](#lesson-6)
7. [Representation 1: Adjacency Matrix](#lesson-7)
8. [Representation 2: Adjacency List](#lesson-8)
9. [Representation 3: Edge List](#lesson-9)
10. [Representation 4: Implicit graph (the grid)](#lesson-10)
11. [Which representation should you use?](#lesson-11)
12. [BFS — the level-by-level explorer](#lesson-12)
13. [BFS walked through step by step](#lesson-13)
14. [DFS — the deep diver (recursive)](#lesson-14)
15. [DFS — iterative with a stack](#lesson-15)
16. [BFS gives shortest paths in unweighted graphs](#lesson-16)
17. [Why DFS does NOT give shortest paths](#lesson-17)
18. [Traversal on a 2D grid](#lesson-18)
19. [Multi-source BFS](#lesson-19)
20. [Cycle detection in undirected graphs](#lesson-20)
21. [Cycle detection in directed graphs (3-color)](#lesson-21)
22. [Topological sort — Kahn's algorithm](#lesson-22)
23. [Topological sort — DFS post-order](#lesson-23)
24. [Dijkstra's algorithm preview](#lesson-24)
25. [MST preview (Kruskal & Prim)](#lesson-25)
26. [SCC preview (Kosaraju)](#lesson-26)
27. [Bipartite check](#lesson-27)
28. [Quick reference](#lesson-28)
29. [You did it — what to do next](#lesson-29)

---

<a id="lesson-1"></a>
## Lesson 1 — What is a graph? (the friend network idea)

Imagine Instagram or Facebook. You have an account. You follow (or are friends with) some people. Each person is a **dot** (we call it a **node** or **vertex**). Each connection between two people is a **line** (we call it an **edge**).

```
         Alice
        /     \
      Bob     Carol
     /   \
  Dave   Eve
```

That shape is a graph. Five people (nodes), four connections (edges).

A graph is the most general way to represent *connections between things*. Here are more real-world examples:

| Real-world thing | Nodes are | Edges are |
|---|---|---|
| Social network | People | Friendships |
| Road map | Cities | Roads |
| Flight network | Airports | Direct flight routes |
| Web | Web pages | Hyperlinks |
| Job scheduling | Tasks | "must come before" constraints |
| Electrical circuit | Components | Wires |
| Internet | Computers | Network cables |

Every one of those systems uses graphs under the hood.

> 🎯 **Key takeaway**
> A graph is a set of **nodes (vertices)** and a set of **edges (connections)** between them. If you can draw dots and lines between them, you're dealing with a graph.

---

<a id="lesson-2"></a>
## Lesson 2 — Graph vocabulary you absolutely need

Before we go any further, let's lock down the words people use. You'll see these *constantly* in problems and interviews.

**Vertex (plural: vertices)** — a node. The dots. Each vertex usually has a label or number.

**Edge** — a connection between two vertices. The lines.

**Adjacent** — two vertices are adjacent (or "neighbors") if there's a direct edge between them.

**Degree** — the number of edges touching a vertex. If Alice has 3 friends, Alice's degree is 3.

**Path** — a sequence of vertices where each consecutive pair is connected by an edge.
```
A → B → C → D   is a path from A to D
```

**Cycle** — a path that starts and ends at the same vertex.
```
A → B → C → A   is a cycle
```

**Connected graph** — every vertex can reach every other vertex by some path.

**Disconnected graph** — at least one vertex (or group) is isolated from the rest.
```
 A—B—C     D—E
```
That graph has two **connected components**: {A,B,C} and {D,E}.

**Subgraph** — a portion of a graph (a subset of vertices and edges).

**Self-loop** — an edge from a vertex to itself. Rare in most problems.

**Multi-edge** — two edges between the same pair of vertices. Also rare.

> 💡 **Tip**
> When you read a graph problem, immediately identify: what are the nodes? What do the edges represent? Often just answering those two questions tells you what algorithm to use.

---

<a id="lesson-3"></a>
## Lesson 3 — Directed vs Undirected

This is one of the first things you should check when you read a graph problem.

### Undirected graph

Edges have **no direction**. If Alice is friends with Bob, then Bob is friends with Alice. The relationship is mutual.

```
   Alice ——— Bob ——— Carol
     |
   Dave
```

Use undirected graphs for: friendships, roads (usually), networks where connections go both ways.

### Directed graph (digraph)

Edges have a **direction**. If Alice follows Bob on Twitter, Bob does not automatically follow Alice.

We draw directed edges with an arrow:

```
   Alice ——→ Bob ——→ Carol
     ↑         ↓
   Dave ←—— Eve
```

An edge `A → B` means you can travel from A to B, but **not** necessarily from B to A.

**In-degree** of a vertex: number of edges *arriving* at it.
**Out-degree** of a vertex: number of edges *leaving* it.

```
   Alice → Bob
   Alice → Carol
   Dave  → Bob
```
Bob's in-degree = 2 (Alice and Dave both point to Bob).
Bob's out-degree = 0 (no edges leave Bob in this example).

> ⚠️ **Watch out:** a lot of problems say "undirected" but secretly require you to think about direction anyway (e.g., cycle detection in an undirected graph needs different logic than in a directed one — we'll cover this in Lessons 20 and 21).

> 🎯 **Key takeaway**
> Directed: edges are one-way arrows. Undirected: edges are two-way roads. Always clarify which you have before coding.

---

<a id="lesson-4"></a>
## Lesson 4 — Weighted vs Unweighted

### Unweighted graph

All edges are "the same". There's no distance or cost associated with an edge. You're only tracking whether two nodes are connected.

```
   A ——— B ——— C
         |
         D
```

### Weighted graph

Each edge has a **weight** (a number). The weight could represent distance, cost, time, capacity, priority, etc.

```
   A —(4)— B —(1)— C
           |
          (7)
           |
           D
```

Travelling A → B costs 4. B → C costs 1. B → D costs 7.

In code, you usually store the weight alongside the neighbor:

```js
// adjacency list for a weighted graph
adj.set('A', [{ node: 'B', weight: 4 }]);
adj.set('B', [{ node: 'A', weight: 4 }, { node: 'C', weight: 1 }, { node: 'D', weight: 7 }]);
```

> 💡 **Tip**
> BFS finds shortest paths in **unweighted** graphs (fewest edges). For weighted graphs, you need **Dijkstra's** or **Bellman-Ford**. This distinction comes up in almost every shortest-path problem.

---

<a id="lesson-5"></a>
## Lesson 5 — Cyclic vs Acyclic — and what a DAG is

### Cyclic graph

Contains at least one **cycle** — a path that loops back to where it started.

```
   A → B
   ↑   ↓
   D ← C
```
A → B → C → D → A is a cycle. This is a cyclic directed graph.

### Acyclic graph

Has **no cycles**. No matter what path you take, you can never return to your starting node.

```
   A → B → D
   ↓
   C → E
```
No matter where you start, you can't loop back. This is acyclic.

### DAG — Directed Acyclic Graph

The most important special case: **Directed** (edges have direction) **AND Acyclic** (no cycles).

DAGs are everywhere:
- **Build systems** — task A must run before task B (a DAG of job dependencies)
- **Course prerequisites** — you must take Calculus before Differential Equations
- **Git commit history** — each commit points to its parent(s); you can't be your own ancestor
- **Spreadsheet formulas** — cell A depends on B and C, etc.

DAGs are special because you can always find a **topological order** — an ordering of all vertices such that every edge `u → v` has `u` appearing before `v`. We'll use this in Lessons 22 and 23.

> 🎯 **Key takeaway**
> Cyclic = has a loop. Acyclic = no loops. DAG = directed + no loops. Topological sort only works on DAGs.

---

<a id="lesson-6"></a>
## Lesson 6 — Dense vs Sparse — and why it matters

This is about how many edges a graph has relative to its vertices.

Let **V** = number of vertices, **E** = number of edges.

- **Sparse graph** — relatively few edges. E is much smaller than V². Think of a road map: most cities are not directly connected to every other city.
- **Dense graph** — lots of edges. E is close to V². Think of a complete graph where everyone is friends with everyone.

For a graph with V vertices, the maximum possible number of edges is:
- Undirected: V × (V−1) / 2
- Directed: V × (V−1)

### Why does this matter?

It affects which **representation** (Lesson 7-10) and which **algorithm** to use:

| Graph type | Best representation | Why |
|---|---|---|
| Sparse | Adjacency list | Don't waste memory on empty cells |
| Dense | Adjacency matrix | O(1) edge lookups matter more |

In competitive programming and interviews, most graphs are **sparse** — so adjacency lists dominate.

> 🎯 **Key takeaway**
> Sparse graph: few edges, use adjacency list. Dense graph: many edges, matrix might be fine. When in doubt, use an adjacency list.

---

<a id="lesson-7"></a>
## Lesson 7 — Representation 1: Adjacency Matrix

An adjacency matrix is a **2D grid** (V × V) where `matrix[i][j] = 1` (or the weight) if there's an edge from vertex `i` to vertex `j`, and `0` otherwise.

### Example

Graph with 4 vertices: 0, 1, 2, 3.
Edges: 0→1, 0→2, 1→3, 2→3.

```
     0  1  2  3
  0 [0, 1, 1, 0]
  1 [0, 0, 0, 1]
  2 [0, 0, 0, 1]
  3 [0, 0, 0, 0]
```

Read row 0: vertex 0 is connected to vertices 1 and 2 (columns with value 1).

```js
// Build it in JavaScript
const V = 4;
const matrix = Array.from({ length: V }, () => new Array(V).fill(0));

matrix[0][1] = 1;
matrix[0][2] = 1;
matrix[1][3] = 1;
matrix[2][3] = 1;
```

### Pros and cons

| Operation | Time |
|---|---|
| Check if edge (u, v) exists | O(1) — just look up matrix[u][v] |
| Get all neighbors of vertex v | O(V) — scan the whole row |
| Add/remove edge | O(1) |
| Space | O(V²) |

**Pros:** instant edge lookup.
**Cons:** uses O(V²) memory even if the graph is sparse. If you have 10,000 vertices and only 15,000 edges, you're wasting 99.985% of your 100,000,000-cell matrix.

> ⚠️ **When NOT to use:** sparse graphs. Never allocate a 10,000×10,000 matrix for a road-map problem.

---

<a id="lesson-8"></a>
## Lesson 8 — Representation 2: Adjacency List

An adjacency list stores, for each vertex, a **list of its neighbors**.

### Example

Same graph: edges 0→1, 0→2, 1→3, 2→3.

```
0: [1, 2]
1: [3]
2: [3]
3: []
```

Each row says "vertex X is connected to: …".

```js
// Build it in JavaScript using a Map
const adj = new Map();

// initialize
for (let v = 0; v < 4; v++) adj.set(v, []);

// add edges
adj.get(0).push(1);
adj.get(0).push(2);
adj.get(1).push(3);
adj.get(2).push(3);
```

For an undirected graph, add each edge in both directions:

```js
function addEdge(adj, u, v) {
  adj.get(u).push(v);
  adj.get(v).push(u);   // ← also add reverse
}
```

For a weighted graph:

```js
adj.get(u).push({ node: v, weight: w });
```

### Pros and cons

| Operation | Time |
|---|---|
| Get all neighbors of vertex v | O(degree(v)) — just iterate the list |
| Check if edge (u, v) exists | O(degree(u)) — scan u's list |
| Space | O(V + E) |

**Pros:** memory-efficient for sparse graphs. Easy to iterate neighbors.
**Cons:** checking "does edge (u,v) exist?" requires a scan (but this is rarely needed in BFS/DFS).

> 🎯 **Key takeaway**
> Adjacency list is the default for almost every graph problem. Use it unless you have a specific reason to use something else.

---

<a id="lesson-9"></a>
## Lesson 9 — Representation 3: Edge List

An edge list is just a flat array of all edges. Each entry is a pair (or triple for weighted): `[u, v]` or `[u, v, weight]`.

```js
const edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
];
```

### When do you use an edge list?

- **Kruskal's algorithm** for minimum spanning trees — you sort all edges by weight, and process them one by one.
- When the problem *gives* you edges and you want to sort or filter them before building a real adjacency structure.
- When space is critical and you just need to enumerate edges.

| Operation | Time |
|---|---|
| Get all neighbors of a vertex | O(E) — scan the whole list |
| Check if edge (u, v) exists | O(E) |
| Space | O(E) |

It's rarely the right choice for traversal — but it's perfect for Kruskal's and similar algorithms.

---

<a id="lesson-10"></a>
## Lesson 10 — Representation 4: Implicit Graph (the Grid)

Many problems don't give you an explicit list of nodes and edges. Instead, they give you a **2D grid** and the graph is implied.

```
  [ 1, 1, 0, 0 ]
  [ 1, 0, 0, 1 ]
  [ 0, 0, 1, 1 ]
  [ 0, 1, 1, 1 ]
```

Each cell `(row, col)` is a vertex. Two cells are neighbors (connected by an edge) if they are adjacent — usually the **4 cardinal directions** (up, down, left, right), sometimes all **8 directions** (including diagonals).

You don't need to build an explicit adjacency list. Instead, you define a **direction vector** and compute neighbors on the fly:

```js
const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right

function neighbors(row, col, grid) {
  const result = [];
  for (const [dr, dc] of dirs) {
    const r = row + dr;
    const c = col + dc;
    if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
      result.push([r, c]);
    }
  }
  return result;
}
```

This is the "implicit graph" pattern. The grid IS the adjacency structure — you just navigate it with direction vectors and bounds checks.

> 💡 **Tip**
> Almost every 2D grid BFS/DFS problem uses exactly this direction-vector pattern. Memorize `const dirs = [[-1,0],[1,0],[0,-1],[0,1]]` — you'll type it dozens of times.

---

<a id="lesson-11"></a>
## Lesson 11 — Which Representation Should You Use?

Here's a simple decision guide:

```
Is the graph given as a 2D grid?
  YES → implicit graph (direction vectors, no adjacency list needed)
  NO  →
        Is it sparse? (most interview problems are)
          YES → Adjacency list (Map or array of arrays)
          NO  →
                Do you need O(1) edge lookups?
                  YES → Adjacency matrix
                  NO  → Adjacency list
                Do you need to sort edges by weight? (Kruskal's)
                  YES → Edge list (then build adjacency list if needed)
```

For interview problems: **default to adjacency list. It handles 95% of cases.**

> ✋ **Pause and try**
> Given this problem: "You have N cities and M direct flight routes between them. Find the minimum cost path from city A to city B."
>
> - What are the nodes? The edges?
> - Is it directed or undirected?
> - Is it weighted?
> - Which representation?
>
> <details>
> <summary>Show answer</summary>
>
> - Nodes = cities. Edges = direct flights.
> - Directed (a flight from NYC to London doesn't mean London to NYC for the same price, typically — though sometimes flights are bidirectional).
> - Weighted (each flight has a cost).
> - Adjacency list is ideal. Edge list could work if you need Dijkstra's with a sort step, but usually you just build an adjacency list directly.
> </details>

---

<a id="lesson-12"></a>
## Lesson 12 — BFS — The Level-by-Level Explorer

BFS stands for **Breadth-First Search**. It's the algorithm that explores a graph **level by level**, like ripples in a pond.

The analogy: imagine you drop a stone in a pond. The first ripple is all nodes directly connected to you (distance 1). The second ripple is everything reachable in exactly 2 steps. And so on.

```
Start from A:

Step 0 (start): A
Step 1 (neighbors of A): B, C
Step 2 (neighbors of B and C not yet visited): D, E, F

   A
  / \
 B   C
/ \   \
D  E   F
```

BFS visits A first. Then B and C (both distance 1 from A). Then D, E, F (distance 2).

### The key ingredient: a Queue

BFS uses a **queue** (FIFO — first in, first out). You enqueue neighbors as you discover them, and always process the earliest-discovered node next. This is what guarantees the level-by-level behavior.

```js
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();          // dequeue from front
    console.log(node);                   // process

    for (const neighbor of graph.get(node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);            // enqueue at back
      }
    }
  }
}
```

> ⚠️ **Performance note:** `queue.shift()` on a plain JavaScript array is O(n) because everything slides left. For large graphs, use a proper queue (e.g., a deque from a library, or use an index pointer). In most interview problems, arrays are fine because the constraints are small.

> 🎯 **Key takeaway**
> BFS = queue + visited set + process level by level. The visited set prevents infinite loops in cyclic graphs.

---

<a id="lesson-13"></a>
## Lesson 13 — BFS Walked Through Step by Step

Let's trace BFS on a concrete graph.

**Graph (undirected):**
```
  1 — 2 — 5
  |   |
  3 — 4
      |
      6
```
Adjacency list:
```
1: [2, 3]
2: [1, 4, 5]
3: [1, 4]
4: [2, 3, 6]
5: [2]
6: [4]
```

**BFS from node 1:**

```
Initial:  queue = [1],  visited = {1}

Step 1: Dequeue 1. Process 1.
        Neighbors: 2, 3. Neither visited.
        Enqueue 2, 3. Mark both visited.
        queue = [2, 3],  visited = {1, 2, 3}

Step 2: Dequeue 2. Process 2.
        Neighbors: 1, 4, 5. 1 already visited.
        Enqueue 4, 5. Mark both visited.
        queue = [3, 4, 5],  visited = {1, 2, 3, 4, 5}

Step 3: Dequeue 3. Process 3.
        Neighbors: 1, 4. Both already visited.
        queue = [4, 5],  visited = {1, 2, 3, 4, 5}

Step 4: Dequeue 4. Process 4.
        Neighbors: 2, 3, 6. 2 and 3 visited. Enqueue 6.
        queue = [5, 6],  visited = {1, 2, 3, 4, 5, 6}

Step 5: Dequeue 5. Process 5.
        Neighbors: 2. Already visited.
        queue = [6]

Step 6: Dequeue 6. Process 6.
        Neighbors: 4. Already visited.
        queue = []  ← done!
```

**Visit order:** 1, 2, 3, 4, 5, 6

Notice that 2 and 3 were visited before 4, 5, 6. That's the "level by level" property:
- Level 0: 1
- Level 1: 2, 3
- Level 2: 4, 5
- Level 3: 6

> 💡 **Tip**
> When you need to track the **distance** from the start node, record the level. A common pattern: instead of just storing the node in the queue, store `[node, distance]`.
> ```js
> const queue = [[start, 0]];
> // ...
> const [node, dist] = queue.shift();
> // ...
> queue.push([neighbor, dist + 1]);
> ```

---

<a id="lesson-14"></a>
## Lesson 14 — DFS — The Deep Diver (Recursive)

DFS stands for **Depth-First Search**. Instead of exploring level by level, DFS goes as **deep as possible** before backtracking.

The analogy: imagine exploring a maze. You keep walking forward until you hit a dead end, then you backtrack to the last junction and try a different path.

```
   A
  / \
 B   C
/ \
D   E

DFS from A might visit: A → B → D → (backtrack) → E → (backtrack) → C
```

### Recursive DFS

The call stack itself acts as DFS's "memory" of where to backtrack to. This is the simplest implementation:

```js
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);

  console.log(node);   // process

  for (const neighbor of graph.get(node)) {
    dfs(graph, neighbor, visited);   // recurse deeper
  }
}
```

When `dfs(A)` calls `dfs(B)`, which calls `dfs(D)`, which has no unvisited neighbors, the call returns — and we're back at `dfs(B)`, which then calls `dfs(E)`. That's the backtracking.

### Tracing it

```
Call dfs(A):
  Mark A visited. Process A.
  Neighbor B: call dfs(B)
    Mark B visited. Process B.
    Neighbor D: call dfs(D)
      Mark D visited. Process D.
      No unvisited neighbors. Return.
    Neighbor E: call dfs(E)
      Mark E visited. Process E.
      No unvisited neighbors. Return.
  Neighbor C: call dfs(C)
    Mark C visited. Process C.
    No unvisited neighbors. Return.

Visit order: A, B, D, E, C
```

> ⚠️ **Recursion depth:** For very deep graphs (e.g., a chain of 100,000 nodes), recursive DFS can overflow the call stack. JavaScript's default stack depth is around 10,000–15,000 calls. For competitive programming with large inputs, prefer iterative DFS (Lesson 15).

---

<a id="lesson-15"></a>
## Lesson 15 — DFS — Iterative with a Stack

You can replace the call stack with an explicit **stack data structure** (LIFO — last in, first out). This avoids stack overflow and is sometimes easier to reason about.

```js
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();            // pop from top (LIFO)

    if (visited.has(node)) continue;     // skip if already visited
    visited.add(node);
    console.log(node);                   // process

    for (const neighbor of graph.get(node)) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
}
```

> ⚠️ **Note:** iterative DFS with a stack visits nodes in a **different order** than recursive DFS (because the stack reverses the neighbor order). For most problems, the exact order doesn't matter — you care about *which* nodes are visited, not in what order.

### BFS vs DFS side by side

```
BFS (queue, FIFO):           DFS (stack/recursion, LIFO):

queue = [A]                  stack = [A]
→ process A, enqueue B, C    → pop A, push C, B (reversed)
queue = [B, C]               stack = [C, B]
→ process B, enqueue D, E    → pop B, push E, D
queue = [C, D, E]            stack = [C, E, D]
→ process C                  → pop D (no children)
→ process D                  stack = [C, E]
→ process E                  → pop E (no children)
                             stack = [C]
BFS order: A B C D E         → pop C
                             DFS order: A B D E C
```

Both visit all nodes. Different order. Different use cases.

---

<a id="lesson-16"></a>
## Lesson 16 — BFS Gives Shortest Paths in Unweighted Graphs

This is one of the most important facts in all of graph algorithms:

> **BFS guarantees the shortest path (fewest edges) in an unweighted graph.**

Why? Because BFS explores nodes in order of their distance from the source. When BFS first reaches a node, it has taken the fewest possible steps to get there. Any other path to that node would be longer or equal.

```
Source: A

   A
  / \
 B   C
 |    \
 D     E
  \
   F

BFS distances from A:
  A = 0
  B = 1,  C = 1
  D = 2,  E = 2
  F = 3
```

The **first time** BFS visits a node, that's the shortest distance. We never need to revisit.

### Shortest path code

```js
function shortestPath(graph, start, end) {
  const visited = new Set();
  const queue = [[start, 0]];   // [node, distance]
  visited.add(start);

  while (queue.length > 0) {
    const [node, dist] = queue.shift();

    if (node === end) return dist;   // found it!

    for (const neighbor of graph.get(node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }

  return -1;   // no path exists
}
```

> 🎯 **Key takeaway**
> Unweighted shortest path? Always BFS. Never DFS. BFS guarantees optimality; DFS does not.

---

<a id="lesson-17"></a>
## Lesson 17 — Why DFS Does NOT Give Shortest Paths

Let's settle this once and for all with an example.

```
    A
   / \
  B   C
  |
  D
   \
    E ← we want the shortest path A → E
```

If edges are: A-B, A-C, B-D, D-E.

BFS would find A → B → D → E in 3 steps.

DFS might visit A → C first (dead end), then A → B → D → E. It still finds the path, but **only by luck** because the graph is simple. In general:

```
    A
   / \
  B   C
 / \   \
D   E   F
|
G
|
H (the actual shortest path to H via right side is A→C→F→H if that edge existed)
```

DFS might dive deep into the left branch before ever exploring the right. If the shortest path was via the right branch, DFS might find a longer path first and report it.

**The rule:** DFS tells you if a path *exists*. BFS tells you the *shortest* path. For weighted shortest paths, use Dijkstra's (Lesson 24).

> 🎯 **Key takeaway**
> DFS: existence (yes/no). BFS: shortest path (unweighted). Dijkstra: shortest path (weighted, non-negative weights).

---

<a id="lesson-18"></a>
## Lesson 18 — Traversal on a 2D Grid

The 2D grid is the most common implicit graph in interview problems. Let's walk through the classic "number of islands" setup.

**Grid:**
```
  1 1 0 0 0
  1 1 0 0 0
  0 0 1 0 0
  0 0 0 1 1
```
(`1` = land, `0` = water)

Each cell `(r, c)` is a node. Two cells are connected if they're adjacent horizontally or vertically AND both are `1`. Connected groups of `1`s are "islands".

### BFS on a grid

```js
function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
  let islands = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islands++;
        // BFS to mark the whole island visited
        const queue = [[r, c]];
        grid[r][c] = '0';   // mark visited by overwriting

        while (queue.length > 0) {
          const [row, col] = queue.shift();
          for (const [dr, dc] of dirs) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
              grid[nr][nc] = '0';   // mark visited
              queue.push([nr, nc]);
            }
          }
        }
      }
    }
  }

  return islands;
}
```

### Key ideas

1. **Outer loop** scans every cell.
2. When we find an unvisited `1`, we've found a new island — increment count.
3. BFS (or DFS) from that cell to mark **all** connected `1`s as visited, so we don't count them again.
4. **Marking visited:** either use a separate `visited` 2D boolean array, or (common shortcut) overwrite the cell to `'0'` so you don't revisit. Only do this if the problem allows mutation.

### The direction vector pattern

```js
const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
// up,   down,   left,  right

// For 8-directional (diagonals included):
const dirs8 = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
```

> 💡 **Tip**
> `nr = r + dr, nc = c + dc` followed by bounds check `0 <= nr < rows && 0 <= nc < cols` is the universal grid-neighbor pattern. Burn it into your muscle memory.

---

<a id="lesson-19"></a>
## Lesson 19 — Multi-Source BFS

Sometimes you don't start BFS from a single node. You start from **all source nodes at once**. This is **multi-source BFS**.

The classic example: **Rotting Oranges**.

```
  2 1 1
  1 1 0
  0 1 1
```
(`2` = rotten orange, `1` = fresh orange, `0` = empty)

Every minute, a rotten orange infects all adjacent fresh oranges. How many minutes until all oranges are rotten (or return -1 if impossible)?

This is BFS where ALL rotten oranges (`2`s) are the starting sources — they "infect" simultaneously. If you ran BFS from each rotten orange separately and took the max, you'd overcount. Multi-source BFS handles this correctly.

### Multi-source BFS setup

```js
// 1. Find ALL sources and enqueue them at the start
const queue = [];
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (grid[r][c] === 2) {
      queue.push([r, c, 0]);   // [row, col, minutes]
    }
  }
}

// 2. Normal BFS from all sources at once
while (queue.length > 0) {
  const [r, c, mins] = queue.shift();
  // ... process neighbors
}
```

The key insight: **initializing the queue with multiple starting nodes gives each the same distance of 0.** BFS then naturally propagates outward from all of them simultaneously.

Other multi-source BFS problems: "01 Matrix" (distance to nearest 0), "Walls and Gates" (distance to nearest gate).

> 🎯 **Key takeaway**
> Multi-source BFS = start with ALL sources in the queue at distance 0. BFS naturally handles simultaneous spreading. Perfect for "time to infect all nodes" or "distance to nearest X" problems.

---

<a id="lesson-20"></a>
## Lesson 20 — Cycle Detection in Undirected Graphs

A cycle in an **undirected** graph means there's a path from some node back to itself without repeating the edge you came from.

```
  1 — 2 — 3
      |   |
      4 — 5
```
Nodes 2, 3, 4, 5 form a cycle: 2 → 3 → 5 → 4 → 2.

### The "parent" trick for undirected DFS

In an undirected graph, when you're doing DFS and you look at a neighbor, you'll always see the node you *came from* — that's not a cycle, that's just the edge you traversed. We track the **parent** to ignore it.

```js
function hasCycleUndirected(graph, start) {
  const visited = new Set();

  function dfs(node, parent) {
    visited.add(node);
    for (const neighbor of graph.get(node)) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        // Already visited AND not our parent → cycle!
        return true;
      }
    }
    return false;
  }

  return dfs(start, -1);
}
```

### Walking through an example

```
Graph: 1-2, 2-3, 3-1 (a triangle — has a cycle)

dfs(1, parent=-1):
  visit 1. neighbors: 2, 3.
  dfs(2, parent=1):
    visit 2. neighbors: 1, 3.
    1 is visited AND 1 === parent (1). Skip.
    dfs(3, parent=2):
      visit 3. neighbors: 2, 1.
      2 is visited AND 2 === parent (2). Skip.
      1 is visited AND 1 !== parent (2). ← CYCLE DETECTED!
```

> 🎯 **Key takeaway**
> Undirected cycle detection: DFS + track parent. If you reach an already-visited node that's not the parent, you found a cycle.

---

<a id="lesson-21"></a>
## Lesson 21 — Cycle Detection in Directed Graphs (3-Color)

In **directed** graphs, the parent trick doesn't work. Consider:

```
1 → 2 → 3
↓       ↑
4 ──────┘
```

Is there a cycle? 1 → 2 → 3, and 1 → 4 → 3. No cycle actually — they both reach 3 but there's no back-edge.

But what about:

```
1 → 2 → 3 → 1
```

Yes, that's a cycle. 1 → 2 → 3 → 1.

### The 3-color approach (WHITE / GRAY / BLACK)

We assign each node a color:
- **WHITE (0)** — not yet visited
- **GRAY (1)** — currently being explored (on the DFS call stack)
- **BLACK (2)** — fully explored

A **back edge** (an edge to a GRAY node) indicates a cycle, because GRAY means "we're currently on a path that includes this node."

```js
function hasCycleDirected(graph, V) {
  const color = new Array(V).fill(0);   // 0=WHITE

  function dfs(node) {
    color[node] = 1;   // GRAY: mark as in-progress

    for (const neighbor of (graph.get(node) || [])) {
      if (color[neighbor] === 1) return true;    // back edge → cycle!
      if (color[neighbor] === 0) {               // WHITE → unvisited
        if (dfs(neighbor)) return true;
      }
      // BLACK → already fully processed, no cycle through this path
    }

    color[node] = 2;   // BLACK: fully done
    return false;
  }

  for (let v = 0; v < V; v++) {
    if (color[v] === 0 && dfs(v)) return true;
  }
  return false;
}
```

### Why does GRAY detect cycles?

GRAY means "currently being processed in this DFS path." If we encounter a GRAY node, we've found an edge that goes **back** to an ancestor in our current path — a back edge means a cycle.

BLACK means "fully processed and we know it leads to no cycle from here." We can safely skip BLACK nodes.

> 🎯 **Key takeaway**
> Directed cycle detection: 3-color DFS. WHITE=unseen, GRAY=in progress, BLACK=done. Edge to a GRAY node = cycle.

---

<a id="lesson-22"></a>
## Lesson 22 — Topological Sort — Kahn's Algorithm (BFS)

**Topological sort** takes a DAG and produces a linear ordering of vertices such that for every directed edge `u → v`, vertex `u` appears before `v`.

Real-world use: you need to figure out the order to take college courses where some courses are prerequisites for others.

```
Math → Calc → Linear Algebra
             ↗
Stats ──────
```

A valid topological order: Math, Stats, Calc, Linear Algebra. (Math must come before Calc; both Stats and Calc must come before Linear Algebra.)

### Kahn's Algorithm (BFS-based)

The idea: repeatedly remove nodes with **in-degree 0** (no prerequisites). After removing them, some other nodes might now have in-degree 0, so add them to the queue.

```
In-degree: how many edges point INTO each node.
```

```js
function topologicalSortKahn(graph, V) {
  // 1. Compute in-degrees
  const inDegree = new Array(V).fill(0);
  for (let u = 0; u < V; u++) {
    for (const v of (graph.get(u) || [])) {
      inDegree[v]++;
    }
  }

  // 2. Enqueue all nodes with in-degree 0
  const queue = [];
  for (let v = 0; v < V; v++) {
    if (inDegree[v] === 0) queue.push(v);
  }

  // 3. BFS
  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of (graph.get(node) || [])) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  // 4. If order doesn't contain all V nodes, there's a cycle (not a DAG)
  return order.length === V ? order : [];
}
```

### Step-by-step trace

```
DAG: 0→1, 0→2, 1→3, 2→3, 3→4

In-degrees: {0:0, 1:1, 2:1, 3:2, 4:1}

Queue starts with in-degree-0 nodes: [0]

Process 0: order=[0]. Decrement 1 (→0) and 2 (→0). Queue=[1, 2].
Process 1: order=[0,1]. Decrement 3 (2→1). Queue=[2].
Process 2: order=[0,1,2]. Decrement 3 (1→0). Queue=[3].
Process 3: order=[0,1,2,3]. Decrement 4 (1→0). Queue=[4].
Process 4: order=[0,1,2,3,4]. Queue=[].

Result: [0, 1, 2, 3, 4]  ← valid topological order
```

**Bonus:** Kahn's also detects cycles! If the output order has fewer than V nodes, there's a cycle (cyclic nodes never reach in-degree 0).

---

<a id="lesson-23"></a>
## Lesson 23 — Topological Sort — DFS Post-Order

There's a second, elegant way to compute topological sort using DFS.

The idea: when you finish exploring all descendants of a node (i.e., when you *return* from it in DFS), push it onto a stack. At the end, reverse the stack (or read it right-to-left). That's your topological order.

**Why?** A node is pushed only *after* all nodes reachable from it are pushed. So it ends up after them in the stack, and before them after reversing.

```js
function topologicalSortDFS(graph, V) {
  const visited = new Set();
  const result = [];

  function dfs(node) {
    visited.add(node);
    for (const neighbor of (graph.get(node) || [])) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
    result.push(node);   // ← push AFTER visiting all children
  }

  for (let v = 0; v < V; v++) {
    if (!visited.has(v)) dfs(v);
  }

  return result.reverse();   // ← reverse to get topological order
}
```

### Trace on our example

```
DAG: 0→1, 0→2, 1→3, 2→3, 3→4

dfs(0): → dfs(1): → dfs(3): → dfs(4): push 4
                              push 3
               push 1
        → dfs(2): 3 already visited. push 2
        push 0

Stack (result before reverse): [4, 3, 1, 2, 0]
After reverse: [0, 2, 1, 3, 4]  ← also a valid topological order
```

Both orderings are valid — topological sort is not unique (multiple valid orderings can exist).

> 💡 **Tip**
> Kahn's (BFS-based) is generally preferred in interviews because it naturally detects cycles and is easier to reason about. But DFS post-order is cleaner code for simple cases.

---

<a id="lesson-24"></a>
## Lesson 24 — Dijkstra's Algorithm Preview

So far: BFS for shortest paths in **unweighted** graphs.

What about **weighted** graphs where all weights are non-negative?

That's **Dijkstra's algorithm**. It works like BFS but instead of a queue, it uses a **min-heap (priority queue)** to always process the node with the current smallest known distance.

### The core idea

```
dist[v] = current shortest known distance from source to v.

Start: dist[source] = 0, dist[all others] = Infinity

Priority queue: process nodes in order of their current dist[v].

When we process node u:
  For each neighbor v with edge weight w:
    if dist[u] + w < dist[v]:
      dist[v] = dist[u] + w   ← RELAX the edge
      enqueue (dist[v], v)
```

### Small example

```
    A
   /|\
  1 | 4
 /  |  \
B   |   D
 \  5  /
  3   2
   \ /
    C
```
Edges: A-B(1), A-C(4), A-D(4 — not shown), B-C(3), C-D(2)

Shortest paths from A: A→B=1, A→B→C=4, A→B→C→D=6

> ⚠️ **JavaScript doesn't have a built-in min-heap.** In interviews, you usually implement a simple one or use a sorted array as an approximation (fine for small inputs). Real implementations use a proper binary heap.

### Complexity

O((V + E) log V) with a binary heap.

> 🎯 **Key takeaway**
> Dijkstra = BFS + priority queue + edge relaxation. Only works for non-negative weights. For negative weights, use Bellman-Ford.

---

<a id="lesson-25"></a>
## Lesson 25 — MST Preview (Kruskal & Prim)

A **Minimum Spanning Tree (MST)** of a weighted undirected graph is a subgraph that:
1. Connects all vertices (it's a spanning tree — no isolated nodes)
2. Has no cycles
3. Minimizes the total edge weight

Real-world analogy: you're laying internet cables to connect N cities. What's the minimum total cable length needed to connect all cities?

```
    A
   /|\
  1 | 5
 /  |  \
B   |   D
 \  4  /
  2   3
   \ /
    C

MST: A-B(1), B-C(2), C-D(3). Total = 6. (Skip A-D(5) and B-D(4) — too expensive.)
```

### Kruskal's Algorithm

1. Sort all edges by weight.
2. Add the cheapest edge that doesn't create a cycle (use Union-Find to check).
3. Repeat until V-1 edges are added.

### Prim's Algorithm

1. Start with any vertex. Mark it in the MST.
2. Repeatedly add the cheapest edge that connects a non-MST vertex to the current MST.
3. Use a min-heap for efficiency.

### Complexity

Both: O(E log E) or O(E log V).

> 💡 **Tip**
> Kruskal's is usually easier to code when you have a Union-Find ready. Prim's is more like Dijkstra in structure. Both give the same MST weight (though the actual tree might differ if there are ties).

---

<a id="lesson-26"></a>
## Lesson 26 — SCC Preview (Kosaraju)

A **Strongly Connected Component (SCC)** in a directed graph is a maximal set of vertices where you can reach any vertex from any other vertex.

```
  1 → 2 → 3
  ↑   ↓
  4 ← 5   6 → 7 → 6 (self-loop makes 6-7 an SCC... wait:)

More clearly:

  1 → 2      4 ← 5
  ↑   ↓      ↓   ↑
  4   3      6 → 7

SCC 1: {1, 2, 3, 4} (all reachable from each other via the cycle 1→2→3→4→1... wait check the edges)
```

Let's use a cleaner example:

```
1 → 2 → 3
↑       ↓
6 ← 5 ← 4

SCC: {1, 2, 3, 4, 5, 6} — all in one giant SCC because you can reach any from any.

Add: 7 → 1 (but no edge from anywhere back to 7)
Now 7 is its own SCC: {7}
```

### Kosaraju's Algorithm

1. Run DFS on the original graph. Record finish times (like topological sort DFS).
2. Transpose the graph (reverse all edges).
3. Run DFS on the transposed graph in reverse finish order. Each DFS tree is an SCC.

This runs in O(V + E) and is one of the most elegant algorithms in graph theory.

> 💡 **Tip**
> SCCs come up in problems like "how many groups of people can communicate with each other?" or "which parts of the internet are fully interconnected?" In interviews, they're rare — but good to know for Hard problems.

---

<a id="lesson-27"></a>
## Lesson 27 — Bipartite Check

A graph is **bipartite** if you can color its vertices with **2 colors** such that no two adjacent vertices share the same color.

Equivalently: a graph is bipartite if and only if it contains **no odd-length cycles**.

Real-world analogy: imagine a dating app. Users are people. Edges connect compatible people. If the graph is bipartite, you can split everyone into two groups where matches only happen across groups (e.g., team A vs team B in a competition).

```
Bipartite:             Not bipartite:
                       (odd cycle: 1-2-3-1)
1 — 2 — 5              1 — 2
|   |                  |   |
4   3                   \ /
|                        3
6

Color 1,3,5 → RED
Color 2,4,6 → BLUE
No red-red or blue-blue edges? ✓ Bipartite!
```

### BFS coloring check

```js
function isBipartite(graph, V) {
  const color = new Array(V).fill(-1);   // -1 = uncolored

  for (let start = 0; start < V; start++) {
    if (color[start] !== -1) continue;   // already colored

    color[start] = 0;
    const queue = [start];

    while (queue.length > 0) {
      const node = queue.shift();
      for (const neighbor of (graph.get(node) || [])) {
        if (color[neighbor] === -1) {
          color[neighbor] = 1 - color[node];   // flip color
          queue.push(neighbor);
        } else if (color[neighbor] === color[node]) {
          return false;   // same color → not bipartite
        }
      }
    }
  }

  return true;
}
```

The key line: `color[neighbor] = 1 - color[node]` — if the current node is color 0, the neighbor gets color 1, and vice versa.

If we ever find a neighbor with the same color as us, the graph is not bipartite (we found an odd cycle).

> 🎯 **Key takeaway**
> Bipartite check = BFS/DFS with 2-coloring. If you ever try to give a node a color that conflicts with its neighbor's color, the graph is not bipartite.

---

<a id="lesson-28"></a>
## Lesson 28 — Quick Reference

Here's everything consolidated for fast review.

### Graph vocabulary

| Term | Meaning |
|---|---|
| Vertex / Node | A dot. A thing. |
| Edge | A connection between two nodes. |
| Directed | Edges have a direction (one-way). |
| Undirected | Edges are two-way. |
| Weighted | Edges have a numeric cost/distance. |
| Unweighted | Edges are just connections (weight = 1). |
| Cyclic | Has at least one cycle. |
| Acyclic | No cycles. |
| DAG | Directed Acyclic Graph. |
| Degree | Number of edges on a node. |
| In-degree | Edges arriving at a node (directed). |
| Out-degree | Edges leaving a node (directed). |
| Path | Sequence of nodes connected by edges. |
| Connected component | A maximal group of mutually reachable nodes. |
| Sparse | Few edges (E << V²). |
| Dense | Many edges (E ≈ V²). |

### Representation comparison

| Representation | Space | Edge check | Get neighbors | When to use |
|---|---|---|---|---|
| Adjacency List | O(V+E) | O(degree) | O(degree) | Default — most problems |
| Adjacency Matrix | O(V²) | O(1) | O(V) | Dense graphs, quick edge lookup |
| Edge List | O(E) | O(E) | O(E) | Kruskal's, sorting edges |
| Implicit (grid) | O(1) extra | O(1) | O(1) | Grid problems |

### Algorithm cheat sheet

| Problem | Algorithm | Data structure | Complexity |
|---|---|---|---|
| Traversal (any order) | DFS | Stack / recursion | O(V+E) |
| Traversal (level order) | BFS | Queue | O(V+E) |
| Shortest path (unweighted) | BFS | Queue | O(V+E) |
| Shortest path (weighted, ≥0) | Dijkstra | Min-heap | O((V+E) log V) |
| Shortest path (negative weights) | Bellman-Ford | Array | O(VE) |
| Cycle detection (undirected) | DFS + parent | — | O(V+E) |
| Cycle detection (directed) | DFS 3-color | — | O(V+E) |
| Topological sort | Kahn's (BFS) or DFS post-order | Queue / stack | O(V+E) |
| Connected components | BFS/DFS or Union-Find | — | O(V+E) |
| MST | Kruskal or Prim | Union-Find / heap | O(E log E) |
| SCC | Kosaraju or Tarjan | — | O(V+E) |
| Bipartite check | BFS 2-color | Queue | O(V+E) |

### Grid traversal template

```js
const dirs = [[-1,0],[1,0],[0,-1],[0,1]];  // 4-directional
// const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]; // 8-dir

function bfsGrid(grid, startR, startC) {
  const rows = grid.length, cols = grid[0].length;
  const visited = Array.from({length: rows}, () => new Array(cols).fill(false));
  const queue = [[startR, startC]];
  visited[startR][startC] = true;

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    // process (r, c)
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }
  }
}
```

### BFS shortest path template

```js
function bfsShortestPath(graph, start, end) {
  const visited = new Set([start]);
  const queue = [[start, 0]];  // [node, distance]

  while (queue.length > 0) {
    const [node, dist] = queue.shift();
    if (node === end) return dist;
    for (const neighbor of graph.get(node) || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1;  // no path
}
```

### Kahn's topological sort template

```js
function topoSort(graph, V) {
  const inDeg = new Array(V).fill(0);
  for (const [u, neighbors] of graph) {
    for (const v of neighbors) inDeg[v]++;
  }
  const queue = [];
  for (let i = 0; i < V; i++) if (inDeg[i] === 0) queue.push(i);
  const order = [];
  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    for (const v of graph.get(u) || []) {
      if (--inDeg[v] === 0) queue.push(v);
    }
  }
  return order.length === V ? order : [];  // [] means cycle exists
}
```

---

<a id="lesson-29"></a>
## Lesson 29 — You Did It. Now What?

Take a breath. Graphs is genuinely one of the hardest topics — not because the ideas are complicated, but because there are **many** of them and they combine in unexpected ways.

What you should walk away knowing:

1. **A graph is dots and lines** — nodes and edges.
2. **Check: directed or undirected? Weighted or unweighted?** Always.
3. **Use an adjacency list** by default (Map of arrays in JavaScript).
4. **BFS = queue, DFS = stack/recursion.** BFS gives shortest paths in unweighted graphs. DFS gives order/existence.
5. **Grid problems are implicit graphs** — direction vectors + bounds check.
6. **Multi-source BFS** = start all sources at distance 0.
7. **Cycle in undirected** = DFS + parent check. **Cycle in directed** = 3-color DFS.
8. **Topological sort** only on DAGs. Kahn's is BFS-based and also detects cycles.
9. **Dijkstra** for weighted shortest paths (non-negative weights only).
10. **Bipartite check** = 2-color BFS.

### What to do next

1. Open [`questions/01-build-graph.md`](./questions/01-build-graph.md). Start there.
2. **Don't skip the easy questions.** Building a graph correctly is the foundation for everything else.
3. After each question, identify which pattern it used (BFS? DFS? topological sort?).
4. Tick the checkbox in [`README.md`](./README.md). Celebrate. Move on.

### Pacing

- **Two or three problems per day** is plenty.
- **Grid problems (06-10)** are the most common in real interviews — make sure you feel comfortable with them.
- **Dijkstra (Q18) and MST (Q19)** are harder — come back to them after the grid and medium problems feel natural.
- **If a problem stumps you:** re-read the relevant lesson, then peek at Hint 1 only. Still stuck? Hint 2. The goal is to struggle productively, not to suffer.

You now understand the most powerful problem-solving tool in computer science. Graphs model almost everything — and you can navigate them.

See you in [Q1](./questions/01-build-graph.md). 💪
