# Q9 — Search BST (return subtree)

**Difficulty:** Easy
**Pattern:** BST search — return the matched node (and thus its subtree)
**Expected:** O(log n) time average · O(log n) space (recursion stack)

## Problem

You are given the root of a Binary Search Tree and an integer `val`. Find the node in the BST where `node.val == val` and return the **subtree rooted at that node**. If no such node exists, return `null`.

The key difference from Q2 (boolean search): here you return the **node itself**, giving the caller access to the entire subtree below it.

## Examples

### Example 1

```
Input:  root = [4, 2, 7, 1, 3],  val = 2

Tree:
        4
       / \
      2   7
     / \
    1   3

Output:
    2
   / \
  1   3
```

You return the node with value 2. Its children (1 and 3) come along for free — you just return that node reference.

### Example 2

```
Input:  root = [4, 2, 7, 1, 3],  val = 5

Tree:
        4
       / \
      2   7
     / \
    1   3

Output: null   (5 not found)
```

### Example 3

```
Input:  val = 4  (root itself)

        4
       / \
      2   7

Output: the entire tree (returning the root node)
```

## Constraints

- The number of nodes in the tree is in the range `[1, 5000]`.
- `1 <= Node.val <= 10^7`
- All values are unique.
- `1 <= val <= 10^7`

## Hints

<details>
<summary>Hint 1 — same as search, different return type</summary>

You already know how to search a BST (Q2). The only change: instead of returning `true`/`false`, return the node itself (or `null` if not found). The navigation logic is identical.
</details>

<details>
<summary>Hint 2 — why return the subtree?</summary>

Returning the node instead of a boolean lets the caller:
- Read the found node's value
- Traverse the subtree below it
- Use it as a root for further operations

Many BST problems reduce to "find node X, then do something with the subtree rooted there."
</details>

## Write your solution
→ [`../solutions/09-search-subtree-bst.js`](../solutions/09-search-subtree-bst.js)

## Follow-ups

- Write an iterative version.
- What would you return if multiple nodes could match (e.g., if duplicates were allowed)? Return a list? Return the first?
- How would you use `searchBST` as a subroutine inside your `delete` function?
