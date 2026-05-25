# Q5 — Reverse Level-Order Traversal

**Difficulty:** Easy
**Pattern:** BFS · Queue
**Expected:** O(n) time · O(n) space

## Problem

Given the `root` of a binary tree, return the **reverse level-order traversal** — the nodes grouped by level, with the **bottom level first** and the **root's level last**.

> Think of it as reading the tree from bottom to top, left to right at each level.

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
Output: [[15, 7], [9, 20], [3]]
```

Bottom level first: `[15, 7]`, then `[9, 20]`, then `[3]`.

### Example 2

```
Tree:    1
        / \
       2   3
      / \
     4   5
```

```
Input:  root = [1, 2, 3, 4, 5]
Output: [[4, 5], [2, 3], [1]]
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
<summary>Hint 1 — build on Q4</summary>

This is almost identical to Q4 (level-order traversal). The only difference: instead of appending each level's array to the result, you **prepend** it (add it to the front).

How do you prepend in JavaScript? `result.unshift(level)` — or just do normal level-order and call `result.reverse()` at the end.
</details>

<details>
<summary>Hint 2 — the two approaches</summary>

**Approach A:** Do normal level-order, collect all levels, then reverse the result array.

**Approach B:** During BFS, use `result.unshift(levelArray)` instead of `result.push(levelArray)`. The BFS itself still runs top-down; you just prepend each new level so the last one added ends up at index 0.

Both are O(n). Approach A is slightly cleaner.
</details>

## Write your solution

→ [`../solutions/05-reverse-level-order-traversal.js`](../solutions/05-reverse-level-order-traversal.js)

## Follow-ups

- What if you want to read each level right-to-left instead of left-to-right in the reversed output? (Reverse each individual level array too.)
- Compare this problem to Q6 (zigzag traversal) — how would you extend this idea to alternate left-to-right and right-to-left per level?
