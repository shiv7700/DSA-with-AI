# Q9 — Find the Middle Node

**Difficulty:** Easy
**Pattern:** Slow / Fast Pointers
**Expected:** O(n) time · O(1) space

## Problem

Given the head of a singly linked list, return the **middle node** of the list.

If the list has an even number of nodes, return the **second of the two middle nodes**.

You must solve this in a **single pass** — no counting the length first, then walking halfway.

## Examples

### Example 1 — odd length
```
Input:  1 -> 2 -> 3 -> 4 -> 5 -> null
Output: node with val = 3

List with indices:  0  1  2  3  4
                    1  2  3  4  5
                          ↑ middle
```

### Example 2 — even length
```
Input:  1 -> 2 -> 3 -> 4 -> null
Output: node with val = 3   (the second middle)

List with indices:  0  1  2  3
                    1  2  3  4
                          ↑ second middle
```

### Example 3 — single node
```
Input:  42 -> null
Output: node with val = 42
```

### Example 4 — two nodes
```
Input:  1 -> 2 -> null
Output: node with val = 2   (the second middle)
```

## Constraints
- `1 <= list length <= 100`
- Node values are integers.
- Return the **node**, not just the value.

## Hints

<details>
<summary>Hint 1 — why single pass?</summary>

The naive approach is: count the length (one pass), then walk to `length / 2` (another pass). That's O(n) time but uses two passes. The slow/fast pointer trick does it in one pass because the fast pointer finishes when the slow pointer is halfway.
</details>

<details>
<summary>Hint 2 — the slow / fast pointer setup</summary>

Both pointers start at `head`. In each iteration:
- `slow` moves one step.
- `fast` moves two steps.

When `fast` reaches the end (`fast === null` or `fast.next === null`), `slow` is at the middle.

```js
let slow = head;
let fast = head;
while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;
}
return slow;
```
</details>

<details>
<summary>Hint 3 — tracing the even-length case</summary>

For `1 -> 2 -> 3 -> 4 -> null`:

- Start: slow=1, fast=1
- Step 1: slow=2, fast=3
- Step 2: slow=3, fast=null  ← fast.next was 4, fast.next.next was null → loop ends

`slow = 3` (the second middle node). ✅
</details>

## Write your solution
→ [`../solutions/09-find-middle.js`](../solutions/09-find-middle.js)

## Follow-ups
- Modify the function to return the **first** middle node for even-length lists (i.e., for `1 -> 2 -> 3 -> 4 -> null`, return `2` instead of `3`). What changes?
- Use the middle-finding logic to split the list into two halves. (This is a core step in merge sort on linked lists — see Q34.)
