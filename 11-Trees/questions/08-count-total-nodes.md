# Q8 — Count Total Nodes

**Difficulty:** Easy
**Pattern:** DFS recursion · universal tree template
**Expected:** O(n) time · O(h) space

## Problem

Given the `root` of a binary tree, return the **total number of nodes** in the tree.

> This is a warm-up for the universal tree template: null check → recurse left → recurse right → combine.

## Examples

### Example 1

```
Tree:        1
           /   \
          2     3
         / \   /
        4   5 6

Serialized: [1, 2, 3, 4, 5, 6]
```

```
Input:  root = [1, 2, 3, 4, 5, 6]
Output: 6
```

### Example 2

```
Input:  root = []
Output: 0
```

### Example 3

```
Input:  root = [1]
Output: 1
```

## Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `-10^4 <= Node.val <= 10^4`

## Hints

<details>
<summary>Hint 1 — apply the universal template</summary>

```
count(root) = ?
  base case: count(null) = 0
  recursive case: 1 (for root itself) + count(root.left) + count(root.right)
```

Write that directly in code.
</details>

<details>
<summary>Hint 2 — the one-liner</summary>

```js
function countNodes(root) {
  if (root === null) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}
```

That's the whole solution. Trace it on Example 1 to confirm.
</details>

## Write your solution

→ [`../solutions/08-count-total-nodes.js`](../solutions/08-count-total-nodes.js)

## Follow-ups

- For a **complete** binary tree specifically, can you count nodes faster than O(n)? (Hint: use the property that the last level is partially filled from the left — binary search on the last level gives O(log²n).)
- How would you count only nodes with **exactly two children**?
