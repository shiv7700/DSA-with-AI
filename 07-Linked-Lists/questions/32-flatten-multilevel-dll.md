# Q32 — Flatten a Multilevel Doubly Linked List

**Difficulty:** Hard
**Pattern:** DFS / stack-based traversal
**Expected:** O(n) time · O(n) space (stack)

## Problem

You are given a doubly linked list where each node has `val`, `next`, `prev`, and optionally a `child` pointer. The `child` pointer may point to another doubly linked list — creating a **multilevel** structure.

Flatten the list so all nodes appear in a single-level doubly linked list. The child list should be inserted after the parent node and before the parent's `next`, recursively.

## Examples

### Example 1
```
Input (showing child pointers with ↓):

1 - 2 - 3 - 4 - 5 - 6 - null
        |
        7 - 8 - 9 - 10 - null
            |
            11 - 12 - null

Output: 1 - 2 - 3 - 7 - 8 - 11 - 12 - 9 - 10 - 4 - 5 - 6 - null
```

### Example 2
```
Input:  1 - 2 - null  (node 1 has child 3)
            ↓
            3
Output: 1 - 3 - 2 - null
```

## Constraints
- `1 <= node count <= 1000`
- `1 <= Node.val <= 10^5`

## Hints

<details>
<summary>Hint 1 — think depth-first</summary>

When you encounter a node with a `child`, you need to fully process the child list before continuing with the current level's `next`. This is a depth-first (DFS) traversal pattern.
</details>

<details>
<summary>Hint 2 — use a stack to simulate DFS</summary>

Walk through the list. When you hit a node with a `child`:
1. Push `curr.next` onto a stack (save it for later).
2. Insert the child list right after `curr` (update `next` and `prev` pointers).
3. Set `curr.child = null`.

When `curr.next === null`, pop from the stack and connect.
</details>

<details>
<summary>Hint 3 — pointer rewiring</summary>

When inserting a child between `curr` and `curr.next`:
```
curr <-> curr.next   →   curr <-> child_head <-> ... <-> child_tail <-> original_next
```

You need to:
1. Save `curr.next` as `next`.
2. `curr.next = curr.child; curr.child.prev = curr`.
3. `curr.child = null`.
4. Walk to the child tail.
5. `childTail.next = next; if (next) next.prev = childTail`.
</details>

## Write your solution
→ [`../solutions/32-flatten-multilevel-dll.js`](../solutions/32-flatten-multilevel-dll.md)

## Follow-ups
- Implement the recursive version: `flatten(curr.child)` recursively flattens the child and returns its tail, then you wire it in.
- How would you **un-flatten** the list back to its original multilevel structure?
