# Q20 — Palindrome Linked List

**Difficulty:** Medium
**Pattern:** Slow/Fast pointers + Reversal
**Expected:** O(n) time · O(1) space

## Problem

Given the head of a singly linked list, return `true` if the list is a **palindrome**, and `false` otherwise.

A palindrome reads the same forwards and backwards: `1 -> 2 -> 2 -> 1` is a palindrome, `1 -> 2 -> 3` is not.

## Examples

### Example 1
```
Input:  1 -> 2 -> 2 -> 1 -> null
Output: true
```

### Example 2
```
Input:  1 -> 2 -> null
Output: false
```

### Example 3 — single node (always palindrome)
```
Input:  5 -> null
Output: true
```

### Example 4
```
Input:  1 -> 2 -> 3 -> 2 -> 1 -> null
Output: true
```

## Constraints
- `1 <= list length <= 10^5`
- `0 <= Node.val <= 9`
- Must solve in O(n) time and **O(1) space** — no copying to an array.

## Hints

<details>
<summary>Hint 1 — the O(n) space approach (good starting point)</summary>

Copy all values into an array, then check if the array is a palindrome with two pointers. This is O(n) time and O(n) space. Can you do it without the array?
</details>

<details>
<summary>Hint 2 — the O(1) space plan (three steps)</summary>

1. **Find the middle** of the list using slow/fast pointers (from Q9).
2. **Reverse the second half** of the list in place (from Q13).
3. **Compare** the first half and the reversed second half node by node.
4. (Optional) Restore the original list structure by reversing the second half again.
</details>

<details>
<summary>Hint 3 — handling odd vs even length</summary>

For `1 -> 2 -> 3 -> 2 -> 1 -> null`:
- Slow/fast gives slow = node(3) (the exact middle).
- Reverse from node(3) onward: `3 -> 2 -> 1 -> null` becomes `1 -> 2 -> 3 -> null`.
- Compare first half `[1, 2]` with reversed second half `[1, 2, 3]`. Compare only `min(len1, len2)` nodes.

For `1 -> 2 -> 2 -> 1 -> null`:
- Slow = node(2) — the second middle.
- Reverse from there: `2 -> 1 -> null` becomes `1 -> 2 -> null`.
- Compare `[1, 2]` with `[1, 2]`. Equal → palindrome.
</details>

## Write your solution
→ [`../solutions/20-palindrome-list.js`](../solutions/20-palindrome-list.js)

## Follow-ups
- Restore the original list structure after the palindrome check. (Some interviewers ask this explicitly.)
- Implement the O(n) space version first, get it working, then optimize to O(1) space.
