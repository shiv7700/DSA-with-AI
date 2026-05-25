# Q4 — Merge Two Sorted Arrays

**Difficulty:** Easy
**Pattern:** Two Pointers (two arrays)
**Expected:** O(m + n) time · O(m + n) space

## Problem

Given two sorted arrays `A` and `B`, return a new sorted array containing all elements from both.

Do not use `Array.prototype.sort()` — take advantage of the fact that both inputs are already sorted.

## Examples

### Example 1
```
Input:  A = [1, 3, 5],  B = [2, 4, 6]
Output: [1, 2, 3, 4, 5, 6]
```

### Example 2
```
Input:  A = [1, 2, 3],  B = [4, 5, 6]
Output: [1, 2, 3, 4, 5, 6]
```

### Example 3 (with duplicates)
```
Input:  A = [1, 3, 3],  B = [2, 3, 5]
Output: [1, 2, 3, 3, 3, 5]
```

### Example 4 (empty input)
```
Input:  A = [],  B = [1, 2, 3]
Output: [1, 2, 3]
```

## Constraints
- `0 <= A.length, B.length <= 10^4`
- Both arrays are sorted in non-decreasing order.
- Values can be any integer.

## Hints

<details>
<summary>Hint 1 — the two-array pointer template</summary>

Use one pointer `iA` into `A` and another `iB` into `B`. At each step, compare `A[iA]` and `B[iB]`. Push the smaller one to your result and advance that pointer.
</details>

<details>
<summary>Hint 2 — draining the remainder</summary>

When one pointer reaches the end of its array, the other array still has elements. They're already sorted, so just append them all to the result.
</details>

<details>
<summary>Hint 3 — handling ties</summary>

If `A[iA] === B[iB]`, it doesn't matter which you pick first — just be consistent. Push `A[iA]` and advance `iA` (or either).
</details>

## Write your solution
→ [`../solutions/04-merge-sorted-arrays.js`](../solutions/04-merge-sorted-arrays.js)

## Follow-ups
- Q30 asks you to merge two sorted arrays **in place** into the first (a harder variant).
- How would you merge **K** sorted arrays efficiently? (Hint: use a min-heap — see Arrays topic Q27.)
- Cross-reference: [02 — Arrays Q7 — Merge Two Sorted Arrays](../../02-Arrays/questions/07-merge-sorted-arrays.md)
