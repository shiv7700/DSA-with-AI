# Q24 — Odd Even Linked List

**Difficulty:** Medium
**Pattern:** Two-pointer weaving
**Expected:** O(n) time · O(1) space

## Problem

Given the head of a singly linked list, group all nodes with **odd indices** together, followed by all nodes with **even indices**, and return the reordered list head.

The **first** node is considered index 1 (odd). Indices, not values.

The relative order of nodes within the odd group and within the even group must be preserved.

## Examples

### Example 1
```
Input:  1 -> 2 -> 3 -> 4 -> 5 -> null
Output: 1 -> 3 -> 5 -> 2 -> 4 -> null

Odd-indexed nodes (indices 1,3,5): values 1, 3, 5
Even-indexed nodes (indices 2,4):  values 2, 4
```

### Example 2
```
Input:  2 -> 1 -> 3 -> 5 -> 6 -> 4 -> 7 -> null
Output: 2 -> 3 -> 6 -> 7 -> 1 -> 5 -> 4 -> null
```

### Example 3 — two nodes
```
Input:  1 -> 2 -> null
Output: 1 -> 2 -> null
```

## Constraints
- `0 <= list length <= 10^4`
- `-10^6 <= Node.val <= 10^6`
- Do not create new nodes. Rearrange the existing nodes in place.

## Hints

<details>
<summary>Hint 1 — maintain two sub-lists</summary>

Build two separate chains as you traverse:
- An "odd" chain: contains nodes at positions 1, 3, 5, ...
- An "even" chain: contains nodes at positions 2, 4, 6, ...

After the traversal, connect the tail of the odd chain to the head of the even chain.
</details>

<details>
<summary>Hint 2 — two pointer setup</summary>

```js
let odd = head;           // pointer into the odd sub-list
let even = head.next;     // pointer into the even sub-list
const evenHead = even;    // save the even chain's head for final connection

while (even !== null && even.next !== null) {
  odd.next = even.next;   // link odd to next odd node
  odd = odd.next;         // advance odd pointer
  even.next = odd.next;   // link even to next even node
  even = even.next;       // advance even pointer
}
odd.next = evenHead;      // connect odd tail to even head
return head;
```
</details>

<details>
<summary>Hint 3 — stopping condition</summary>

The loop runs while `even !== null && even.next !== null`.
- `even !== null`: handles even-length lists where even is the last node.
- `even.next !== null`: handles odd-length lists where even's next would be the last node (which is odd-indexed).
</details>

## Write your solution
→ [`../solutions/24-odd-even-list.js`](../solutions/24-odd-even-list.js)

## Follow-ups
- What if you wanted to group nodes by **value** parity (even values together, odd values together)?
- What is the space complexity of this solution, and why?
