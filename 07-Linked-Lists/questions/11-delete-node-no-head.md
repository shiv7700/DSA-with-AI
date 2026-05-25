# Q11 — Delete a Node (No Head Access)

**Difficulty:** Easy
**Pattern:** Node value copying
**Expected:** O(1) time · O(1) space

## Problem

You are given a reference to a node in a singly linked list. You are **not** given the head of the list. Delete that node from the list.

You are guaranteed:
- The node to delete is **not** the tail.
- The list has at least two nodes.

## Examples

### Example 1
```
List before:  1 -> 2 -> 3 -> 4 -> null
Node to delete: the node with value 3
List after:   1 -> 2 -> 4 -> null
```

### Example 2
```
List before:  5 -> 10 -> 20 -> null
Node to delete: the node with value 10
List after:   5 -> 20 -> null
```

## Constraints
- The node to delete is always an interior node (never the tail).
- You only have a reference to the node itself — not to the head or to any predecessor.

## Hints

<details>
<summary>Hint 1 — the trick: you can't find the predecessor</summary>

Normally, to delete a node you'd find its predecessor and set `predecessor.next = node.next`. But you don't have the head, so you can't find the predecessor.

What *can* you do with just a reference to the node?
</details>

<details>
<summary>Hint 2 — copy the next node's value</summary>

Here's the insight: instead of deleting *this* node, **pretend** the next node is this node.

1. Copy `node.next.val` into `node.val`.
2. Set `node.next = node.next.next`.

This makes the current node look exactly like the next node, and the next node disappears.

```
Before:  ... -> [3] -> [4] -> ...
                 ↑ you have this reference

Step 1:  copy 4 into node:  ... -> [4] -> [4] -> ...
Step 2:  skip next:         ... -> [4] -> ...
```

Net effect: `[3]` is gone, `[4]` is still there — the caller's reference now points to what looks like `[4]`.
</details>

<details>
<summary>Hint 3 — why this fails on the tail</summary>

If the node to delete is the tail, `node.next === null`. You can't copy `null.val`. This is why the problem guarantees the node is never the tail.

A proper solution for deleting a tail without the head reference doesn't exist in a singly linked list — you'd need either the head (to find the predecessor) or a doubly linked list (where you have `prev`).
</details>

## Write your solution
→ [`../solutions/11-delete-node-no-head.js`](../solutions/11-delete-node-no-head.js)

## Follow-ups
- Why is this approach considered a "hack"? What invariant does it break? (Hint: any external reference pointing to `node.next` now points to what appears to be a different node.)
- How would a **doubly linked list** solve this problem cleanly, without the copy trick?
