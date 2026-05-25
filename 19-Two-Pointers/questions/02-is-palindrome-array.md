# Q2 — Is Array a Palindrome?

**Difficulty:** Easy
**Pattern:** Two Pointers (opposite ends)
**Expected:** O(n) time · O(1) space

## Problem

Given an array of values, return `true` if the array is a palindrome — meaning it reads the same forwards and backwards — and `false` otherwise.

## Examples

### Example 1
```
Input:  [1, 2, 3, 2, 1]
Output: true
```
Reading left to right: 1 2 3 2 1. Reading right to left: 1 2 3 2 1. Same.

### Example 2
```
Input:  [1, 2, 3, 4, 5]
Output: false
```
The first element is 1, the last is 5 — they don't match.

### Example 3 (even length)
```
Input:  [1, 2, 2, 1]
Output: true
```

### Example 4 (edge cases)
```
Input:  [7]      →  true   (single element is always a palindrome)
Input:  []       →  true   (empty is considered a palindrome)
```

## Constraints
- `0 <= arr.length <= 10^5`
- Elements can be numbers or strings.

## Hints

<details>
<summary>Hint 1 — don't reverse and compare</summary>

You could reverse a copy and compare with the original — but that's O(n) extra space and wasteful. You can do this with O(1) space.
</details>

<details>
<summary>Hint 2 — compare from both ends</summary>

Start with one pointer at the left end and another at the right. Compare the two elements they point to. If they match, move both pointers inward. If they ever mismatch, return `false` immediately.
</details>

<details>
<summary>Hint 3 — the loop condition</summary>

`while (left < right)` — stop when the pointers meet or cross. A single middle element (odd length) doesn't need to be compared with anything.
</details>

## Write your solution
→ [`../solutions/02-is-palindrome-array.js`](../solutions/02-is-palindrome-array.js)

## Follow-ups
- Q3 extends this idea to strings with non-alphanumeric characters to skip.
- Can you solve it recursively? What is the space complexity of the recursive version compared to the iterative one?
- Cross-reference: [03 — Valid Palindrome String](./03-valid-palindrome-string.md)
