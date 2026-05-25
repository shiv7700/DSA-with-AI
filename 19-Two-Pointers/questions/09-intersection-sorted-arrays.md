# Q9 — Intersection of Two Sorted Arrays

**Difficulty:** Easy
**Pattern:** Two Pointers (two arrays)
**Expected:** O(m + n) time · O(min(m, n)) space

## Problem

Given two sorted integer arrays `A` and `B`, return an array of their intersection — values that appear in **both** arrays. Each value in the result must appear as many times as it appears in **both** arrays.

The result can be in any order.

## Examples

### Example 1
```
Input:  A = [1, 2, 2, 3],  B = [2, 2, 4]
Output: [2, 2]
```
`2` appears twice in both arrays, so it appears twice in the output.

### Example 2
```
Input:  A = [4, 9, 5],  B = [9, 4, 9, 8, 4]
Output: [4, 9]   (or [9, 4] — order doesn't matter)
```

### Example 3 (no intersection)
```
Input:  A = [1, 2, 3],  B = [4, 5, 6]
Output: []
```

### Example 4
```
Input:  A = [1, 2, 3],  B = [1, 2, 3]
Output: [1, 2, 3]
```

## Constraints
- `1 <= A.length, B.length <= 10^3`
- `0 <= A[i], B[i] <= 10^3`
- Both arrays are sorted in non-decreasing order.

## Hints

<details>
<summary>Hint 1 — take advantage of sorted order</summary>

Use one pointer into each array. Compare `A[iA]` and `B[iB]`:
- If equal → it's in the intersection. Record it, advance both pointers.
- If `A[iA] < B[iB]` → advance `iA` (A's current value is too small to ever match B's current or future values).
- If `A[iA] > B[iB]` → advance `iB`.
</details>

<details>
<summary>Hint 2 — the loop ends when?</summary>

When either pointer goes past the end of its array. Whatever remains in the other array cannot be in the intersection (no match is possible).
</details>

<details>
<summary>Hint 3 — alternative without sorted guarantee</summary>

If the arrays weren't sorted, you'd use a hash map: count all values in A, then walk B and collect matches. But that costs O(m + n) space and can't exploit sorted order.
</details>

## Write your solution
→ [`../solutions/09-intersection-sorted-arrays.js`](../solutions/09-intersection-sorted-arrays.js)

## Follow-ups
- Q10 asks for the **union** — similar structure, different output logic.
- What if duplicates should appear only once in the result? (Return **unique** intersection.)
- What if the arrays weren't sorted? Can you still solve in O(m + n) time? (Yes — hash map.)
