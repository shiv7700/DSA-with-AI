# Q12 — Course Schedule

**Difficulty:** Medium
**Pattern:** Cycle detection in a directed graph · Topological sort
**Expected:** O(V + E) time · O(V + E) space

## Problem

There are `numCourses` courses labeled `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` means you must take course `bi` **before** course `ai`.

Return `true` if you can finish all courses, `false` if it is impossible (due to a cycle in the dependency graph — you'd need to take A before B and B before A, which is impossible).

## Examples

### Example 1

```
numCourses = 2
prerequisites = [[1, 0]]

Interpretation: to take course 1, you must first take course 0.

  0 → 1   (no cycle)

Output: true   (take course 0 first, then course 1)
```

### Example 2

```
numCourses = 2
prerequisites = [[1, 0], [0, 1]]

  0 → 1 → 0   (cycle!)

Output: false   (course 0 requires 1, and course 1 requires 0 — impossible)
```

### Example 3

```
numCourses = 4
prerequisites = [[1,0],[2,0],[3,1],[3,2]]

  0 → 1 → 3
  ↓       ↑
  2 ──────┘

Output: true   (no cycle; order: 0, 1, 2, 3 or 0, 2, 1, 3)
```

### Example 4

```
numCourses = 3
prerequisites = [[0,1],[1,2],[2,0]]

  0 → 1 → 2 → 0   (cycle)

Output: false
```

## Constraints

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- All pairs are unique.

## Hints

<details>
<summary>Hint 1 — model it</summary>

Build a directed graph: for each `[a, b]` in prerequisites, add a directed edge `b → a` (b must come before a → b points to a).

The question reduces to: **does this directed graph have a cycle?** If yes, return false. If no, return true.
</details>

<details>
<summary>Hint 2 — Kahn's algorithm (BFS)</summary>

Use Kahn's topological sort (Lesson 22). If you can produce a valid topological order containing ALL courses, there's no cycle → return true. If the order is shorter than `numCourses`, there's a cycle → return false.

```js
// Kahn's: if order.length === numCourses → no cycle
```
</details>

<details>
<summary>Hint 3 — DFS 3-color approach</summary>

Use the WHITE/GRAY/BLACK coloring from Lesson 21. If DFS ever encounters a GRAY node (currently being visited in this path), there's a cycle.

```js
const WHITE = 0, GRAY = 1, BLACK = 2;
const color = new Array(numCourses).fill(WHITE);

function hasCycle(node) {
  color[node] = GRAY;
  for (const neighbor of adj.get(node) || []) {
    if (color[neighbor] === GRAY) return true;   // cycle!
    if (color[neighbor] === WHITE && hasCycle(neighbor)) return true;
  }
  color[node] = BLACK;
  return false;
}
```
</details>

## Write your solution
→ [`../solutions/12-course-schedule.js`](../solutions/12-course-schedule.js)

## Follow-ups
- **Course Schedule II** (Q13): instead of true/false, return the actual order to take courses.
- What if there are multiple valid orderings? Can you return all of them?
- What if some courses have no prerequisites — do they affect the cycle check?
