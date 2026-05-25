# Q3 — Insert at Head, Tail, and Index

**Difficulty:** Easy
**Pattern:** Pointer manipulation
**Expected:** O(1) head · O(n) tail/index · O(1) space

## Problem

Given the head of a singly linked list, implement three insertion functions:

1. `insertAtHead(head, val)` — Insert `val` as the new first node. Return the new head.
2. `insertAtTail(head, val)` — Insert `val` as the new last node. Return the head (unchanged).
3. `insertAtIndex(head, index, val)` — Insert `val` at position `index` (0-based). Index 0 is the same as `insertAtHead`. Return the (possibly new) head. If `index > length`, insert at the tail.

## Examples

### Example 1 — insertAtHead
```
Input:  head = 2 -> 3 -> null,  val = 1
Output: 1 -> 2 -> 3 -> null
```

### Example 2 — insertAtTail
```
Input:  head = 1 -> 2 -> null,  val = 3
Output: 1 -> 2 -> 3 -> null
```

### Example 3 — insertAtIndex
```
Input:  head = 1 -> 2 -> 4 -> null,  index = 2,  val = 3
Output: 1 -> 2 -> 3 -> 4 -> null
```

### Example 4 — edge cases
```
insertAtHead(null, 5)          →  5 -> null
insertAtTail(null, 5)          →  5 -> null
insertAtIndex(null, 0, 5)      →  5 -> null
insertAtIndex(1->2->null, 99, 3)  →  1 -> 2 -> 3 -> null  (index beyond end → append)
```

## Constraints
- `0 <= index`
- The list may be empty (`head === null`).
- For `insertAtIndex`, if `index >= length`, insert at the tail.

## Hints

<details>
<summary>Hint 1 — insertAtHead</summary>

Only two steps:
1. Create the new node.
2. Set `newNode.next = head`.
3. Return `newNode` as the new head.

Order is important: set `newNode.next` **before** you lose the reference to the old head.
</details>

<details>
<summary>Hint 2 — insertAtTail</summary>

Handle the empty list first (the new node is both head and tail). For a non-empty list, walk until `current.next === null`, then set `current.next = newNode`.
</details>

<details>
<summary>Hint 3 — insertAtIndex</summary>

Walk to the node at `index - 1`. Then:
```
newNode.next = prev.next;  // point new node forward (do this first!)
prev.next    = newNode;    // point predecessor to new node
```
If you run out of nodes before reaching `index - 1`, just append at the tail.
</details>

## Write your solution
→ [`../solutions/03-insert-positions.js`](../solutions/03-insert-positions.js)

## Follow-ups
- What if you also want to maintain a `size` counter? Walk through which functions need to increment it.
- `insertAtTail` on a list of one million nodes is O(n). How would you make it O(1)? (Hint: maintain a `tail` pointer — see Q2.)
