# Q17 — Remove Nth Node From End

**Difficulty:** Medium
**Pattern:** Slow / Fast Pointers + Dummy node
**Expected:** O(n) time · O(1) space

## Problem

Given the head of a linked list, remove the **nth node from the end** of the list and return the head.

Do this in a **single pass**.

## Examples

### Example 1
```
Input:  1 -> 2 -> 3 -> 4 -> 5 -> null,  n = 2
Output: 1 -> 2 -> 3 -> 5 -> null

The 2nd node from the end (node 4) is removed.
```

### Example 2 — remove the head
```
Input:  1 -> 2 -> null,  n = 2
Output: 2 -> null
```

### Example 3 — remove the tail
```
Input:  1 -> 2 -> null,  n = 1
Output: 1 -> null
```

### Example 4 — single node
```
Input:  1 -> null,  n = 1
Output: null
```

## Constraints
- `1 <= list length <= 30`
- `1 <= n <= list length` (always valid)

## Hints

<details>
<summary>Hint 1 — extend the Nth-from-end finding technique</summary>

From Q10, you know how to find the nth node from the end using two pointers with a gap of n. To **delete** it, you need the node just **before** it (the predecessor). So you actually want to position your slow pointer at the `(n+1)th` from the end.
</details>

<details>
<summary>Hint 2 — use a dummy node to handle head deletion</summary>

If `n === list length`, you're removing the head. A dummy node before the real head makes this case identical to all other deletions — you just delete the "nth" node (which is `dummy.next`).

```js
const dummy = new ListNode(0);
dummy.next = head;
let slow = dummy;
let fast = dummy;
```
</details>

<details>
<summary>Hint 3 — step-by-step</summary>

1. Create a dummy node: `dummy.next = head`.
2. Set `fast = dummy` and `slow = dummy`.
3. Advance `fast` exactly `n + 1` steps.
4. Advance both `fast` and `slow` one step at a time until `fast === null`.
5. `slow` is now the predecessor of the node to delete.
6. `slow.next = slow.next.next`.
7. Return `dummy.next`.
</details>

## Write your solution
→ [`../solutions/17-remove-nth-from-end.js`](../solutions/17-remove-nth-from-end.js)

## Follow-ups
- Implement the two-pass version (count length, then walk to position) and compare the code complexity.
- What if `n` could be greater than the list length? How would you handle it gracefully?
