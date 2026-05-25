# Q23 — Path Sum III (Count Any Paths)

**Difficulty:** Medium
**Pattern:** DFS · prefix sum · hash map
**Expected:** O(n) time · O(n) space

## Problem

Given the `root` of a binary tree and an integer `targetSum`, return the number of **paths** where the sum of the values along the path equals `targetSum`.

The path does **not** need to start at the root or end at a leaf. It must go downward (from parent to child) but can start and end at any node.

## Examples

### Example 1

```
Tree:          10
             /    \
            5      -3
           / \       \
          3   2      11
         / \   \
        3  -2   1

targetSum = 8
```

```
Input:  root = [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1],  targetSum = 8
Output: 3
```

The three paths summing to 8:
- 5 → 3 (sum = 8)
- 5 → 2 → 1 (sum = 8)
- -3 → 11 (sum = 8)

### Example 2

```
Input:  root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1],  targetSum = 22
Output: 3
```

## Constraints

- The number of nodes is in the range `[0, 1000]`.
- `-10^9 <= Node.val <= 10^9`
- `-1000 <= targetSum <= 1000`

## Hints

<details>
<summary>Hint 1 — brute force first (then we'll optimize)</summary>

For every node, run a DFS downward counting paths that sum to `targetSum`. Outer DFS visits every node O(n); inner DFS from each node is O(n). Total: O(n²). Works but can be improved.
</details>

<details>
<summary>Hint 2 — prefix sum approach (the O(n) solution)</summary>

This is the same trick as "Subarray Sum Equals K" for arrays, but on a tree.

As you traverse root-to-current, maintain a running `prefixSum`. A path ending at the current node with sum = `targetSum` exists if there was a previous node on the current path-to-root with `prefixSum - targetSum`.

Use a hash map `prefixCount` that maps `prefixSum → count` of times you've seen this prefix sum on the current root-to-node path.

Initialize with `prefixCount.set(0, 1)` (the empty prefix sum of 0 occurs once, before any nodes).
</details>

<details>
<summary>Hint 3 — the backtracking step</summary>

Since the hash map represents the current root-to-node path, you must undo your changes when backtracking up the tree:

```js
function dfs(node, currentSum, prefixCount) {
  if (!node) return 0;
  currentSum += node.val;
  let count = prefixCount.get(currentSum - targetSum) || 0;
  prefixCount.set(currentSum, (prefixCount.get(currentSum) || 0) + 1);

  count += dfs(node.left,  currentSum, prefixCount);
  count += dfs(node.right, currentSum, prefixCount);

  // Backtrack: remove current node's prefix from the map
  prefixCount.set(currentSum, prefixCount.get(currentSum) - 1);
  return count;
}
```
</details>

## Write your solution

→ [`../solutions/23-path-sum-iii.js`](../solutions/23-path-sum-iii.js)

## Follow-ups

- Why do you need to **decrement** the count in `prefixCount` on backtrack? What would happen if you didn't?
- Compare this prefix-sum technique to the array version in Q19 (Subarray Sum Equals K). They are the same algorithm.
