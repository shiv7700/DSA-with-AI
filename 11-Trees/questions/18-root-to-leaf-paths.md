# Q18 — Print All Root-to-Leaf Paths

**Difficulty:** Easy
**Pattern:** DFS backtracking · path building
**Expected:** O(n) time · O(n) space

## Problem

Given the `root` of a binary tree, return all **root-to-leaf paths** as an array of strings. Each string should show the path in the format `"root->child->...->leaf"`.

A **leaf** is a node with no children.

## Examples

### Example 1

```
Tree:        1
           /   \
          2     3
           \
            5

Serialized: [1, 2, 3, null, 5]
```

```
Input:  root = [1, 2, 3, null, 5]
Output: ["1->2->5", "1->3"]
```

### Example 2

```
Tree:    1
```

```
Input:  root = [1]
Output: ["1"]
```

### Example 3

```
Tree:    1
        / \
       2   3
      /   / \
     4   5   6
```

```
Input:  root = [1, 2, 3, 4, null, 5, 6]
Output: ["1->2->4", "1->3->5", "1->3->6"]
```

## Constraints

- The number of nodes is in the range `[1, 100]`.
- `-100 <= Node.val <= 100`

## Hints

<details>
<summary>Hint 1 — carry the path as you go down</summary>

As you recurse deeper, accumulate the values along the path. When you reach a leaf, convert the accumulated path to a string and save it.

The key: use **backtracking** — after returning from a recursive call, remove the last value you added (undo the choice) before trying the other child.
</details>

<details>
<summary>Hint 2 — the structure with backtracking</summary>

```js
function binaryTreePaths(root) {
  const result = [];

  function dfs(node, path) {
    if (!node) return;
    path.push(node.val);

    if (!node.left && !node.right) {
      result.push(path.join('->'));    // leaf: save this path
    } else {
      dfs(node.left,  path);
      dfs(node.right, path);
    }

    path.pop();   // ← backtrack: remove this node before returning
  }

  dfs(root, []);
  return result;
}
```

The `path.pop()` at the end is the backtracking step. Without it, the path array would accumulate all visited nodes, not just the current path.
</details>

<details>
<summary>Hint 3 — alternative: pass the string, not the array</summary>

Instead of an array you push/pop, you can pass the path as a string and concatenate:

```js
function dfs(node, pathStr) {
  if (!node) return;
  const newPath = pathStr ? pathStr + '->' + node.val : '' + node.val;
  if (!node.left && !node.right) result.push(newPath);
  dfs(node.left,  newPath);
  dfs(node.right, newPath);
}
```

This creates a new string at each step (no mutation, no backtracking needed) — simpler but uses more memory.
</details>

## Write your solution

→ [`../solutions/18-root-to-leaf-paths.js`](../solutions/18-root-to-leaf-paths.js)

## Follow-ups

- How would you return paths as arrays of numbers instead of strings?
- How would you return only paths where the sum equals a given target? (See Q21.)
