# Q22 — Path Sum II (All Paths)

**Difficulty:** Medium
**Pattern:** DFS backtracking · path collection
**Expected:** O(n²) time · O(n) space

## Problem

Given the `root` of a binary tree and an integer `targetSum`, return all **root-to-leaf paths** where the sum of the node values equals `targetSum`. Each path should be returned as an array of node values.

## Examples

### Example 1

```
Tree:          5
             /   \
            4     8
           /     / \
          11    13   4
         /  \       / \
        7    2     5   1

targetSum = 22
```

```
Input:  root = [5,4,8,11,null,13,4,7,2,5,1],  targetSum = 22
Output: [[5, 4, 11, 2], [5, 8, 4, 5]]
```

Path 1: 5+4+11+2 = 22. ✓
Path 2: 5+8+4+5 = 22. ✓

### Example 2

```
Input:  root = [1, 2, 3],  targetSum = 5
Output: []
```

No valid paths.

### Example 3

```
Input:  root = [1, 2],  targetSum = 0
Output: []
```

## Constraints

- The number of nodes is in the range `[0, 5000]`.
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

## Hints

<details>
<summary>Hint 1 — extend Path Sum I with path tracking</summary>

Same logic as Q21, but now carry a `currentPath` array. When you find a valid leaf, save a **copy** of `currentPath` to the result.

Remember to **backtrack** (pop from `currentPath`) after exploring each branch, so the array reflects only the current path.
</details>

<details>
<summary>Hint 2 — the structure</summary>

```js
function pathSum(root, targetSum) {
  const result = [];

  function dfs(node, remaining, path) {
    if (!node) return;
    path.push(node.val);

    if (!node.left && !node.right && remaining === node.val) {
      result.push([...path]);    // ← copy the array!
    }
    dfs(node.left,  remaining - node.val, path);
    dfs(node.right, remaining - node.val, path);

    path.pop();   // ← backtrack
  }

  dfs(root, targetSum, []);
  return result;
}
```

Why `[...path]`? Because `path` is a reference — if you push `path` directly, all saved paths will point to the same array and show the same final state.
</details>

## Write your solution

→ [`../solutions/22-path-sum-ii.js`](../solutions/22-path-sum-ii.js)

## Follow-ups

- How would you find the path with the **maximum sum** among all root-to-leaf paths?
- **Path Sum III** (Q23) extends this to paths that can start at any node.
