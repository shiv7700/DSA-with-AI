# Q13 — Course Schedule II

**Difficulty:** Medium
**Pattern:** Topological sort (Kahn's BFS or DFS post-order)
**Expected:** O(V + E) time · O(V + E) space

## Problem

There are `numCourses` courses labeled `0` to `numCourses - 1`. Given an array `prerequisites` where `prerequisites[i] = [ai, bi]` means you must take `bi` before `ai`, return the **order in which you should take all courses**.

If it is impossible to finish all courses (there's a cycle), return an empty array `[]`.

## Examples

### Example 1

```
numCourses = 2
prerequisites = [[1, 0]]

Output: [0, 1]   (take 0 first, then 1)
```

### Example 2

```
numCourses = 4
prerequisites = [[1,0],[2,0],[3,1],[3,2]]

Dependency graph:
  0 → 1 → 3
  ↓       ↑
  2 ──────┘

Output: [0, 1, 2, 3]  or  [0, 2, 1, 3]   (both valid)
```

### Example 3 — cycle

```
numCourses = 2
prerequisites = [[1,0],[0,1]]

Output: []   (cycle exists, impossible)
```

### Example 4 — no prerequisites

```
numCourses = 3
prerequisites = []

Output: [0, 1, 2]   (or any permutation — all are valid)
```

## Constraints

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
- All prerequisite pairs are unique.

## Hints

<details>
<summary>Hint 1 — this is topological sort</summary>

A valid course order is a **topological ordering** of the dependency DAG. If no cycle exists, Kahn's algorithm gives you the order directly. If the output has fewer than `numCourses` elements, a cycle exists — return `[]`.
</details>

<details>
<summary>Hint 2 — Kahn's reminder</summary>

1. Build adjacency list and compute in-degrees.
2. Start queue with all nodes of in-degree 0 (no prerequisites).
3. Dequeue a node, add to order, decrement neighbors' in-degrees.
4. Any neighbor that reaches in-degree 0 enters the queue.
5. If `order.length === numCourses`, return order; else return `[]`.
</details>

<details>
<summary>Hint 3 — building the graph</summary>

Edges go from prerequisite to course: `[a, b]` means edge `b → a`.

```js
const adj = new Map();
const inDegree = new Array(numCourses).fill(0);

for (const [a, b] of prerequisites) {
  if (!adj.has(b)) adj.set(b, []);
  adj.get(b).push(a);
  inDegree[a]++;
}
```
</details>

## Write your solution
→ [`../solutions/13-course-schedule-ii.js`](../solutions/13-course-schedule-ii.js)

## Follow-ups
- Solve it with DFS post-order instead of Kahn's. How does the result differ?
- What if you have multiple valid orderings and want the **lexicographically smallest**? (Use a min-heap instead of a queue.)
- **Alien Dictionary** (harder): reconstruct a language's character ordering from a sorted word list — same topological sort, different graph construction.
