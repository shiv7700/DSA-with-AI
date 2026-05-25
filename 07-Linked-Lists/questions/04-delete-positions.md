# Q4 — Delete at Head, Tail, and Index

**Difficulty:** Easy
**Pattern:** Pointer manipulation
**Expected:** O(1) head · O(n) tail/index · O(1) space

## Problem

Given the head of a singly linked list, implement three deletion functions:

1. `deleteAtHead(head)` — Remove the first node. Return the new head (or `null` if the list is now empty).
2. `deleteAtTail(head)` — Remove the last node. Return the head.
3. `deleteAtIndex(head, index)` — Remove the node at position `index` (0-based). Return the (possibly new) head. If `index` is out of bounds, return `head` unchanged.

## Examples

### Example 1 — deleteAtHead
```
Input:  1 -> 2 -> 3 -> null
Output: 2 -> 3 -> null
```

### Example 2 — deleteAtTail
```
Input:  1 -> 2 -> 3 -> null
Output: 1 -> 2 -> null
```

### Example 3 — deleteAtIndex
```
Input:  1 -> 2 -> 3 -> 4 -> null,  index = 2
Output: 1 -> 2 -> 4 -> null
        (node with value 3 was removed)
```

### Example 4 — edge cases
```
deleteAtHead(null)                 →  null
deleteAtHead(5 -> null)            →  null
deleteAtTail(5 -> null)            →  null
deleteAtIndex(1->2->null, 99)      →  1 -> 2 -> null  (out of bounds — unchanged)
```

## Constraints
- The list may be empty (`head === null`) — handle gracefully.
- `deleteAtIndex` with an out-of-bounds index should return `head` unchanged (no crash).

## Hints

<details>
<summary>Hint 1 — deleteAtHead</summary>

One line: `return head.next;`

Don't forget: if `head === null`, return `null`.
</details>

<details>
<summary>Hint 2 — deleteAtTail</summary>

Walk until `current.next.next === null` (you want the second-to-last node), then `current.next = null`.

Special case: if the list has only one node, return `null`.
</details>

<details>
<summary>Hint 3 — deleteAtIndex</summary>

Walk to the node at `index - 1` (the predecessor). Then:
```
predecessor.next = predecessor.next.next;
```
If `index === 0`, it's the same as `deleteAtHead`. If the predecessor doesn't exist (out of bounds), return unchanged.
</details>

## Write your solution
→ [`../solutions/04-delete-positions.js`](../solutions/04-delete-positions.js)

## Follow-ups
- Why does `delete head.val; delete head.next;` NOT properly delete the head? (Hint: what does `delete` actually do in JavaScript?)
- Implement a function that removes **all** nodes with a given value from the list.
