# Q23 — Add Two Numbers II

**Difficulty:** Medium
**Pattern:** Stack-based reversal / or reverse then add
**Expected:** O(n + m) time · O(n + m) space

## Problem

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in **forward order** (the head is the most significant digit). Each node contains a single digit. Add the two numbers and return the sum as a linked list in forward order.

You are not allowed to reverse the input lists.

## Examples

### Example 1
```
Input:
  l1 = 7 -> 2 -> 4 -> 3 -> null   (represents 7243)
  l2 = 5 -> 6 -> 4 -> null         (represents 564)

Output: 7 -> 8 -> 0 -> 7 -> null   (represents 7807)

7243 + 564 = 7807
```

### Example 2
```
Input:
  l1 = 2 -> null
  l2 = 9 -> 9 -> 9 -> null
Output: 1 -> 0 -> 0 -> 1 -> null   (2 + 999 = 1001)
```

## Constraints
- `1 <= each list's length <= 100`
- `0 <= Node.val <= 9`
- No leading zeros except the number 0 itself.
- Do not reverse the input lists.

## Hints

<details>
<summary>Hint 1 — the challenge vs Q22</summary>

In Q22, digits were in reverse order (least significant first), making it easy to process from head to tail. Here, they're in forward order. To add with carries, you need to process from the least significant digit (tail) to the most significant (head) — but linked lists can only be traversed forward.
</details>

<details>
<summary>Hint 2 — use a stack</summary>

Push all values of `l1` into one stack, all values of `l2` into another. Then pop from both stacks simultaneously — you'll be processing digits from right to left (least significant first), just like in Q22.

Build the result list by prepending each new digit at the head (or use a stack for the result too).
</details>

<details>
<summary>Hint 3 — building the result in forward order</summary>

Since you're computing least-significant digits first but need most-significant first in the output, use `insertAtHead` (or keep a result stack and pop it at the end) to construct the output list in the correct order.
</details>

## Write your solution
→ [`../solutions/23-add-two-numbers-ii.js`](../solutions/23-add-two-numbers-ii.js)

## Follow-ups
- What if you were allowed to reverse the input lists? Would the solution simplify to Q22?
- Compare the stack-based approach with: reverse both lists → use Q22 logic → reverse the result. Both are O(n + m) but the code complexity differs.
