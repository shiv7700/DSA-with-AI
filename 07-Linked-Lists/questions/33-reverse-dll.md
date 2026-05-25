# Q33 — Reverse a Doubly Linked List

**Difficulty:** Hard
**Pattern:** Pointer swap
**Expected:** O(n) time · O(1) space

## Problem

Given the head of a **doubly linked list**, reverse it in place and return the new head.

In a doubly linked list, each node has `val`, `next`, and `prev`.

## Examples

### Example 1
```
Input:  null ⟵ 1 ⟷ 2 ⟷ 3 ⟷ 4 ⟶ null
Output: null ⟵ 4 ⟷ 3 ⟷ 2 ⟷ 1 ⟶ null

1 is now the tail, 4 is now the head.
```

### Example 2 — single node
```
Input:  null ⟵ 1 ⟶ null
Output: null ⟵ 1 ⟶ null
```

### Example 3 — empty
```
Input:  null
Output: null
```

## Constraints
- `0 <= list length <= 10^4`
- Each node has `val`, `next`, and `prev`.
- Reverse in place — no new nodes.

## Hints

<details>
<summary>Hint 1 — swap next and prev for every node</summary>

For each node, swap its `next` and `prev` pointers. Walk the list using the **old** `next` (before it's swapped).

```js
let curr = head;
let newHead = null;

while (curr !== null) {
  newHead = curr;          // last node processed will be the new head
  const temp = curr.prev;
  curr.prev = curr.next;   // swap
  curr.next = temp;        // swap
  curr = curr.prev;        // advance using old next (now stored in prev after swap)
}
return newHead;
```
</details>

<details>
<summary>Hint 2 — why advance using curr.prev after the swap?</summary>

After the swap, `curr.prev` holds what was `curr.next` (the next node in the original forward direction). So advancing `curr = curr.prev` walks forward through the original list.
</details>

## Write your solution
→ [`../solutions/33-reverse-dll.js`](../solutions/33-reverse-dll.js)

## Follow-ups
- How does this compare in code complexity to reversing a singly linked list (Q13)? Which requires more pointer updates per node?
- After reversing, verify that all `prev` pointers are correct (every `node.next.prev === node` for all interior nodes).
