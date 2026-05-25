# Q4 — Level-Order Traversal (BFS)

**Difficulty:** Easy
**Pattern:** BFS · Queue
**Expected:** O(n) time · O(n) space

## Problem

Given the `root` of a binary tree, return the **level-order traversal** of its nodes' values, where each level's values are grouped into their own sub-array.

```
Output format: [[level 0 values], [level 1 values], [level 2 values], ...]
```

> **Why level-order?** It's the foundation for a whole family of problems: right side view, zigzag traversal, finding the width of a tree, shortest path questions. It's also the only one of the four traversals that uses a queue instead of a stack.

## Examples

### Example 1

```
Tree:        3
           /   \
          9    20
              /  \
             15   7

Serialized: [3, 9, 20, null, null, 15, 7]
```

```
Input:  root = [3, 9, 20, null, null, 15, 7]
Output: [[3], [9, 20], [15, 7]]
```

Level 0: just the root `[3]`.
Level 1: `[9, 20]`.
Level 2: `[15, 7]` (only 20 had children; 9 was a leaf).

### Example 2

```
Tree:    1
        / \
       2   3
      / \   \
     4   5   6

Serialized: [1, 2, 3, 4, 5, null, 6]
```

```
Input:  root = [1, 2, 3, 4, 5, null, 6]
Output: [[1], [2, 3], [4, 5, 6]]
```

### Example 3

```
Input:  root = []
Output: []
```

## Constraints

- The number of nodes is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`

## Hints

<details>
<summary>Hint 1 — why a queue and not a stack?</summary>

Stack = last in, first out = depth-first (goes deep before going wide).
Queue = first in, first out = breadth-first (goes wide before going deep).

When you enqueue node 9 and node 20 (children of 3), you process 9 before 20 because it was added first. That gives you left-to-right order within each level.

Start: enqueue the root.
Loop: dequeue a node, process it, enqueue its children.
</details>

<details>
<summary>Hint 2 — grouping by level</summary>

The tricky part is knowing when one level ends and the next begins.

The key insight: at the START of each outer loop iteration, everything in the queue belongs to the current level. Capture `queue.length` at that moment, process exactly that many nodes, and all their children (added to the queue) will form the next level.

```
queue = [root]
while queue not empty:
  levelSize = queue.length   ← freeze current level count
  for i in range(levelSize):
    node = dequeue
    add node.val to current level's array
    enqueue node.left (if exists)
    enqueue node.right (if exists)
  push current level's array to result
```
</details>

<details>
<summary>Hint 3 — JavaScript queue note</summary>

In JavaScript there's no built-in Queue class. Using `array.shift()` works but is O(n) per operation. For interview problems with small inputs, it's fine. For large inputs, use a pointer-based approach:

```js
let front = 0;
// Instead of queue.shift(), use queue[front++]
```

This makes dequeue O(1).
</details>

## Write your solution

→ [`../solutions/04-level-order-traversal.js`](../solutions/04-level-order-traversal.js)

## Follow-ups

- **Return a flat array** instead of grouped by level. (Simpler — just don't group.)
- How would you use this solution to find the **average value at each level**?
- How would you use this solution to get the **right side view** (last node at each level)? (See Q24.)
