# Q2 — Reverse an Array Using a Stack

**Difficulty:** Easy
**Pattern:** Stack basics
**Expected:** O(n) time · O(n) space

## Problem

Given an array `arr`, return a new array with its elements in reverse order. You must use a stack as part of your solution.

> **Why this exercise?** Arrays have `reverse()` built in. But this exercise forces you to think about what LIFO means in terms of element ordering. You'll use the same mental model in dozens of harder problems.

## Examples

### Example 1
```
Input:  [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]
```

### Example 2
```
Input:  ['a', 'b', 'c']
Output: ['c', 'b', 'a']
```

### Example 3 (edge cases)
```
Input:  []     → []
Input:  [42]   → [42]
```

## Constraints
- `0 <= arr.length <= 10^5`
- Elements can be any JavaScript value.
- You must use a stack (do not call `arr.reverse()`).
- The original array should not be modified.

## Hints

<details>
<summary>Hint 1 — same idea as reversing a string</summary>

Push every element onto a stack, then pop them all off into a new array. The last element pushed (rightmost) will be the first popped — ending up at index 0 of the result.
</details>

<details>
<summary>Hint 2 — code structure</summary>

```
Phase 1: push everything onto the stack
Phase 2: pop everything into a result array
return the result array
```

Both phases are a single loop each — the whole thing is O(n).
</details>

## Write your solution
→ [`../solutions/02-reverse-array.js`](../solutions/02-reverse-array.js)

## Follow-ups
- Reverse the array in place (modify `arr` directly) using a stack. Is this more or less space-efficient than your current solution?
- Reverse the array in place using the **two-pointer** technique and no extra data structure. What's the space complexity?
- What's the difference between this problem and Q1 (reverse a string)?
