# Q10 — Union of Two Sorted Arrays

**Difficulty:** Easy
**Pattern:** Two Pointers (two arrays)
**Expected:** O(m + n) time · O(m + n) space

## Problem

Given two sorted integer arrays `A` and `B`, return a sorted array containing all **unique** elements from both arrays — their union.

Each value should appear in the result exactly once, regardless of how many times it appears in the inputs.

## Examples

### Example 1
```
Input:  A = [1, 2, 3],  B = [2, 3, 4]
Output: [1, 2, 3, 4]
```

### Example 2
```
Input:  A = [1, 1, 2],  B = [2, 3, 3]
Output: [1, 2, 3]
```

### Example 3 (no overlap)
```
Input:  A = [1, 3, 5],  B = [2, 4, 6]
Output: [1, 2, 3, 4, 5, 6]
```

### Example 4 (one empty)
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
<summary>Hint 1 — merge and deduplicate</summary>

This is similar to the sorted merge (Q4), but you skip duplicates. At each step, pick the smaller of `A[iA]` and `B[iB]`. Before adding it to the result, check whether the result is empty or its last element is different from this new value — if it's the same, skip.
</details>

<details>
<summary>Hint 2 — handling equal values across arrays</summary>

When `A[iA] === B[iB]`, add the value once and advance **both** pointers.
</details>

<details>
<summary>Hint 3 — drain the remainder</summary>

After one array is exhausted, drain the other — but still skip consecutive duplicates.
</details>

## Write your solution
→ [`../solutions/10-union-sorted-arrays.js`](../solutions/10-union-sorted-arrays.js)

## Follow-ups
- Compare with Q9 (intersection) — same two-array skeleton, different logic for what you keep.
- What if the result should include duplicates up to the **maximum** count across both arrays (multiset union)? E.g., A = [1, 1, 2], B = [1, 2, 2] → [1, 1, 2, 2].
