# Q10 — Nth Node From the End

**Difficulty:** Easy
**Pattern:** Slow / Fast Pointers
**Expected:** O(n) time · O(1) space

## Problem

Given the head of a singly linked list and an integer `n`, return the **value** of the nth node from the end of the list (1-indexed: `n = 1` means the last node).

You must do this in a **single pass**.

## Examples

### Example 1
```
Input:  1 -> 2 -> 3 -> 4 -> 5 -> null,  n = 2
Output: 4

Counting from the end:  5 (1st),  4 (2nd)  ✅
```

### Example 2
```
Input:  1 -> 2 -> 3 -> null,  n = 1
Output: 3   (the last node)
```

### Example 3
```
Input:  1 -> 2 -> 3 -> null,  n = 3
Output: 1   (the first node, which is 3rd from the end)
```

### Example 4
```
Input:  42 -> null,  n = 1
Output: 42
```

## Constraints
- `1 <= list length <= 10^4`
- `1 <= n <= list length` (n is always valid)

## Hints

<details>
<summary>Hint 1 — the two-pass approach (then we'll improve it)</summary>

Count the length `L` (one pass), then walk to position `L - n` (second pass). This uses two passes. Can you do it in one?
</details>

<details>
<summary>Hint 2 — the gap trick (single pass)</summary>

Use two pointers with a gap of `n` between them.

1. Advance `fast` exactly `n` steps ahead of `slow`.
2. Now advance both `fast` and `slow` one step at a time until `fast` falls off the end (`fast === null`).
3. `slow` is now at the nth node from the end.

Why? Because maintaining a gap of exactly `n` means when `fast` has finished the list, `slow` is exactly `n` steps behind it.
</details>

<details>
<summary>Hint 3 — tracing the example</summary>

List: `1 -> 2 -> 3 -> 4 -> 5 -> null`, n = 2.

1. Advance fast by 2 steps: fast = node(3), slow = node(1).
2. Advance both until fast = null:
   - fast=4, slow=2
   - fast=5, slow=3
   - fast=null, slow=4  ← loop ends

Return `slow.val = 4`. ✅
</details>

## Write your solution
→ [`../solutions/10-nth-from-end.js`](../solutions/10-nth-from-end.js)

## Follow-ups
- Return the **node** instead of just the value — useful when you need to delete or modify it.
- **Remove** the nth node from the end in a single pass (see Q17 — that's the classic interview version).
