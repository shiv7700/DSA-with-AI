# Q17 — Convert BST to Sorted Doubly Linked List

**Difficulty:** Medium
**Pattern:** Inorder traversal — thread nodes into a list in place
**Expected:** O(n) time · O(h) space (recursion stack)

## Problem

Convert a BST to a **sorted circular doubly linked list** in place. Do not create any new nodes — repurpose the `left` and `right` pointers as `prev` and `next` pointers in the doubly linked list.

The "head" of the list should point to the node with the smallest value. The list should be circular: the last node's `right` points back to the head, and the head's `left` points to the last node.

Return the head of the doubly linked list.

## Examples

### Example 1

```
Input BST:
        4
       / \
      2   5
     / \
    1   3

BST inorder: 1, 2, 3, 4, 5

Output (doubly linked list, visualized as linear):
1 ⇄ 2 ⇄ 3 ⇄ 4 ⇄ 5
↑_______________________↑  (circular)

head = node with value 1
head.left = node with value 5  (previous in circular list)
node(5).right = head           (wraps back)
```

## Constraints

- The number of nodes is in the range `[0, 2000]`.
- All node values are unique.
- In place: no new nodes created.

## Hints

<details>
<summary>Hint 1 — inorder produces sorted order</summary>

Do an inorder traversal. As you visit each node, link it to the previously visited node (`prev`). At the end, link the head and tail to make it circular.
</details>

<details>
<summary>Hint 2 — track head and prev</summary>

Keep two variables:
- `head`: the first node visited (smallest value). Set it once and never change it.
- `prev`: the most recently visited node.

At each visited node `curr`:
```
prev.right = curr;   // prev's "next" pointer
curr.left  = prev;   // curr's "prev" pointer
prev = curr;         // advance prev
```

After the traversal, close the circle: `head.left = prev; prev.right = head`.
</details>

## Write your solution
→ [`../solutions/17-bst-to-dll.js`](../solutions/17-bst-to-dll.js)

## Follow-ups

- How would you convert back from the doubly linked list to a BST?
- What if the list doesn't need to be circular — just a regular doubly linked list?
- This is a LeetCode premium problem (426). The same technique is used in the "Flatten Binary Tree to Linked List" problem.
