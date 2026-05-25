# Q26 — Rotate Linked List

**Difficulty:** Medium
**Pattern:** Cycle + pointer repositioning
**Expected:** O(n) time · O(1) space

## Problem

Given the head of a singly linked list and an integer `k`, rotate the list to the **right** by `k` places. Return the new head.

Rotating right by 1 means the last node moves to the front.

## Examples

### Example 1
```
Input:  1 -> 2 -> 3 -> 4 -> 5 -> null,  k = 2
Output: 4 -> 5 -> 1 -> 2 -> 3 -> null

Rotate right 1: 5 -> 1 -> 2 -> 3 -> 4
Rotate right 2: 4 -> 5 -> 1 -> 2 -> 3
```

### Example 2
```
Input:  0 -> 1 -> 2 -> null,  k = 4
Output: 2 -> 0 -> 1 -> null

4 mod 3 = 1, so effective rotation is 1.
Rotate right 1: 2 -> 0 -> 1
```

### Example 3 — no rotation
```
Input:  1 -> 2 -> null,  k = 0
Output: 1 -> 2 -> null
```

## Constraints
- `0 <= list length <= 500`
- `-100 <= Node.val <= 100`
- `0 <= k <= 2 * 10^9`

## Hints

<details>
<summary>Hint 1 — reduce k first</summary>

If `k >= list length`, rotating by `k` is the same as rotating by `k mod length`. Find the length and take `k = k % length`. If `k === 0`, return `head` immediately.
</details>

<details>
<summary>Hint 2 — form a cycle, then break it</summary>

A neat approach:
1. Find the tail and the length.
2. Connect tail to head (forming a cycle).
3. The new tail is at position `length - k - 1` (0-indexed from head).
4. The new head is at position `length - k`.
5. Break the cycle at the new tail: `newTail.next = null`.
</details>

<details>
<summary>Hint 3 — finding the new tail</summary>

The new tail is `(length - k)` nodes from the original head. Walk that many steps from the original head, then the next node is the new head.

```js
let newTail = head;
for (let i = 0; i < length - k - 1; i++) {
  newTail = newTail.next;
}
const newHead = newTail.next;
newTail.next = null;
return newHead;
```
</details>

## Write your solution
→ [`../solutions/26-rotate-list.js`](../solutions/26-rotate-list.js)

## Follow-ups
- Implement rotation to the **left** instead.
- How does the approach change (or simplify) if k is guaranteed to be less than the list length?
