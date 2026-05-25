# Q22 — Add Two Numbers

**Difficulty:** Medium
**Pattern:** Simultaneous traversal + carry propagation
**Expected:** O(max(n, m)) time · O(max(n, m)) space

## Problem

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in **reverse order** (the head is the least significant digit). Each node contains a single digit. Add the two numbers and return the sum as a linked list in the same reversed format.

## Examples

### Example 1
```
Input:
  l1 = 2 -> 4 -> 3 -> null   (represents 342)
  l2 = 5 -> 6 -> 4 -> null   (represents 465)

Output: 7 -> 0 -> 8 -> null   (represents 807)

342 + 465 = 807
```

### Example 2
```
Input:
  l1 = 0 -> null
  l2 = 0 -> null
Output: 0 -> null
```

### Example 3 — different lengths and carry
```
Input:
  l1 = 9 -> 9 -> 9 -> 9 -> 9 -> 9 -> 9 -> null   (9,999,999)
  l2 = 9 -> 9 -> 9 -> null                          (999)

Output: 8 -> 9 -> 9 -> 9 -> 0 -> 0 -> 0 -> 1 -> null  (10,000,998)
```

## Constraints
- `1 <= each list's length <= 100`
- `0 <= Node.val <= 9`
- No leading zeros (except the number 0 itself).

## Hints

<details>
<summary>Hint 1 — simulate grade-school addition</summary>

Think of adding two numbers digit by digit, right to left, carrying as you go. Here, the lists already give you the digits in right-to-left order (least significant first), so you can walk both lists simultaneously.
</details>

<details>
<summary>Hint 2 — the main loop</summary>

Keep a `carry` variable (starts at 0). While `l1` is non-null, `l2` is non-null, or `carry > 0`:
1. Add `l1.val` (or 0 if `l1` is null) + `l2.val` (or 0) + `carry`.
2. `carry = Math.floor(sum / 10)`, digit = `sum % 10`.
3. Create a new node with the digit and append it.
4. Advance `l1` and `l2` if they're non-null.

The "or 0" trick lets you handle lists of different lengths without separate logic.
</details>

<details>
<summary>Hint 3 — don't forget the final carry</summary>

If after both lists are exhausted `carry` is still 1, append one more node with value 1. The condition `carry > 0` in the while-condition handles this automatically.
</details>

## Write your solution
→ [`../solutions/22-add-two-numbers.js`](../solutions/22-add-two-numbers.js)

## Follow-ups
- **Add Two Numbers II** (Q23) — digits in **forward** order. What changes?
- What if the inputs could be negative? How would you handle the sign?
