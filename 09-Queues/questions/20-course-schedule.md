# Q20 — Course Schedule (Kahn's Algorithm)

**Difficulty:** Medium
**Pattern:** Topological sort using a queue (Kahn's BFS-based algorithm)
**Expected:** O(V + E) time · O(V + E) space

## Problem

There are `numCourses` courses labeled `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` means you must take course `bi` before course `ai`.

Return `true` if you can finish all courses. Return `false` if it is impossible (i.e., there is a cycle in the course dependency graph).

**Signature:**
```js
function canFinish(numCourses, prerequisites) { ... }
```

## Examples

### Example 1
```
Input:  numCourses = 2, prerequisites = [[1, 0]]
Output: true
(Take course 0 first, then course 1.)
```

### Example 2
```
Input:  numCourses = 2, prerequisites = [[1, 0], [0, 1]]
Output: false
(Course 0 requires 1, and course 1 requires 0. Circular dependency!)
```

### Example 3
```
Input:  numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: true
(Order: 0 → 1 → 2 → 3, or 0 → 2 → 1 → 3)
```

## Constraints
- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- No duplicate prerequisites.

## Hints

<details>
<summary>Hint 1 — model it as a directed graph</summary>

Create a directed graph: `bi → ai` (bi must come before ai). The question becomes: **does this graph have a cycle?** If no cycle → all courses can be finished. If a cycle exists → impossible.
</details>

<details>
<summary>Hint 2 — Kahn's algorithm (BFS-based topological sort)</summary>

1. Build the graph and compute each node's **in-degree** (number of prerequisites).
2. Enqueue all courses with `in-degree = 0` (no prerequisites — can be taken right away).
3. BFS: dequeue a course, "take" it (increment a `taken` counter). For each course that depended on this one, decrement its in-degree. If its in-degree reaches 0, enqueue it.
4. After BFS: if `taken === numCourses`, all courses were reachable → no cycle → return `true`. Otherwise → cycle detected → `false`.
</details>

<details>
<summary>Hint 3 — why does Kahn's algorithm detect cycles?</summary>

Nodes in a cycle will never reach in-degree 0 (each node in the cycle always has at least one unprocessed predecessor). So they'll never be enqueued. The `taken` count will fall short of `numCourses`, revealing the cycle.
</details>

<details>
<summary>Hint 4 — code skeleton</summary>

```js
const indegree = new Array(numCourses).fill(0);
const adj = Array.from({length: numCourses}, () => []);

for (const [a, b] of prerequisites) {
  adj[b].push(a);
  indegree[a]++;
}

const queue = [];
for (let i = 0; i < numCourses; i++) {
  if (indegree[i] === 0) queue.push(i);
}

let taken = 0;
while (queue.length) {
  const course = queue.shift();
  taken++;
  for (const next of adj[course]) {
    if (--indegree[next] === 0) queue.push(next);
  }
}

return taken === numCourses;
```
</details>

## Write your solution
→ [`../solutions/20-course-schedule.js`](../solutions/20-course-schedule.js)

## Follow-ups
- **Course Schedule II** (LeetCode 210): return the actual ordering of courses, or `[]` if impossible.
- Can you solve this with DFS + coloring (white/gray/black) instead of Kahn's? Which do you prefer?
- Topological sort applies to any system with dependencies: build systems, spreadsheet cells, task schedulers. Can you think of a real project where you'd apply this?
