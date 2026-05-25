# Q12 — House Robber III (Binary Tree)

**Difficulty:** Medium
**Pattern:** Tree DP — postorder traversal, return pair of states
**Expected:** O(n) time · O(h) space  (h = tree height)

## Problem

Houses are arranged in a **binary tree**. A robber cannot rob a node and its direct parent at the same time (adjacent in the tree). Return the maximum amount of money the robber can steal.

The tree is given as a root node where each node has `val`, `left`, and `right`.

## Examples

### Example 1
```
Input:
    3
   / \
  2   3
   \   \
    3   1

Output: 7
```
Rob the root (3), left grandchild (3), and right grandchild (1): 3 + 3 + 1 = 7.

### Example 2
```
Input:
    3
   / \
  4   5
 / \   \
1   3   1

Output: 9
```
Rob nodes 4 and 5 and grandchild 1: 4 + 5 = 9 (or 1 + 3 + 5 + ... wait). Optimal: rob 4 (level 2 left) and 5 (level 2 right) = 4 + 5 = 9? Or 1 + 3 + 1 + 3 = 8. Or 4 + 5 = 9. Yes, 9.

## Constraints
- The number of nodes is in `[1, 10^4]`.
- `0 <= Node.val <= 10^4`

## Hints

<details>
<summary>Hint 1 — why tree DP works here</summary>

For each node, you have two choices: rob it or skip it.
- **Rob it:** you cannot rob its children, but you can rob its grandchildren.
- **Skip it:** you can rob its children (or not — you take the best from each child).

This "choice at each node" propagates up the tree in a postorder traversal.
</details>

<details>
<summary>Hint 2 — return a pair from each node</summary>

Define a recursive function `dp(node)` that returns two values:
- `dp(node)[0]` = max money if you **skip** this node
- `dp(node)[1]` = max money if you **rob** this node

For a leaf node: `[0, node.val]`.
</details>

<details>
<summary>Hint 3 — the transitions</summary>

Let `[leftSkip, leftRob] = dp(node.left)` and `[rightSkip, rightRob] = dp(node.right)`.

- `robThis  = node.val + leftSkip + rightSkip` (rob this node → must skip children)
- `skipThis = max(leftSkip, leftRob) + max(rightSkip, rightRob)` (skip this node → take best from each child independently)

Return `[skipThis, robThis]`.
</details>

<details>
<summary>Hint 4 — the final answer</summary>

Call `dp(root)` and return `max(dp(root)[0], dp(root)[1])`.
</details>

## Write your solution
→ [`../solutions/12-house-robber-iii.js`](../solutions/12-house-robber-iii.js)

## Follow-ups
- What if each node had an arbitrary number of children (not just a binary tree)?
- **Binary Tree Maximum Path Sum** — similar tree DP, maximizing paths.
