# Q6 — Zigzag Level-Order Traversal

**Difficulty:** Easy–Medium
**Pattern:** BFS · Queue · Direction flag
**Expected:** O(n) time · O(n) space

## Problem

Given the `root` of a binary tree, return its **zigzag level-order traversal**: the values at level 0 go left to right, values at level 1 go right to left, level 2 left to right again, and so on, alternating at each depth.

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
Output: [[3], [20, 9], [15, 7]]
```

Level 0 (left→right): `[3]`
Level 1 (right→left): `[20, 9]`
Level 2 (left→right): `[15, 7]`

### Example 2

```
Tree:        1
           / | \
          2  3  4
         /\     \
        5  6     7
```

```
Input:  root = [1, 2, 3, 4, 5, 6, null, 7]
Output: [[1], [4, 3, 2], [5, 6, 7]]
```

### Example 3

```
Input:  root = []
Output: []
```

## Constraints

- The number of nodes is in the range `[0, 2000]`.
- `-100 <= Node.val <= 100`

## Hints

<details>
<summary>Hint 1 — start with normal level-order, then add direction</summary>

Do exactly what you did in Q4. Collect each level as an array. Then, for odd levels (1, 3, 5...), reverse that array before adding it to the result.

You need a variable to track whether the current level should be reversed: `let leftToRight = true;` then toggle it after each level.
</details>

<details>
<summary>Hint 2 — reversing vs inserting in reverse direction</summary>

**Approach A:** Collect each level left-to-right (always), then reverse the odd-numbered levels. Simple to understand.

**Approach B:** Use a deque (double-ended queue). For even levels, append to the back. For odd levels, prepend to the front. No reversal needed.

For an interview, Approach A is cleaner and less error-prone. Approach B is O(n) without the extra reversal step.
</details>

## Write your solution

→ [`../solutions/06-zigzag-level-order-traversal.js`](../solutions/06-zigzag-level-order-traversal.md)

## Follow-ups

- How would you implement this using a deque (double-ended queue) to avoid any reversals?
- What's the relationship between zigzag traversal and the "spiral matrix" problem (02-Arrays Q20)?
