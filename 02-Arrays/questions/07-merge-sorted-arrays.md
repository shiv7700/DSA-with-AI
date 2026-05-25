# Q7 — Merge Two Sorted Arrays

**Difficulty:** Easy
**Pattern:** Two pointers (across two arrays)
**Expected:** O(n + m) time · O(n + m) space — or O(1) extra space if merging in place into the first array

## Problem

You are given two arrays, `a` and `b`, both sorted in ascending order. Return a single new array containing all the elements of both, also sorted in ascending order.

Then, solve a second version: `a` has been pre-allocated with enough extra room at the end to fit all of `b`. Merge `b` into `a` **in place** — without allocating any new array.

## Examples

### Example 1 — returning a new array
```
Input:  a = [1, 3, 5],  b = [2, 4, 6]
Output: [1, 2, 3, 4, 5, 6]
```

### Example 2 — different sizes
```
Input:  a = [1, 5, 9, 10, 15, 20],  b = [2, 3, 8, 13]
Output: [1, 2, 3, 5, 8, 9, 10, 13, 15, 20]
```

### Example 3 — in-place version (LeetCode 88 style)
```
Input:  a = [1, 2, 3, 0, 0, 0],  m = 3
        b = [2, 5, 6],            n = 3
After:  a = [1, 2, 2, 3, 5, 6]
```
The first `m` slots of `a` hold its real values. The remaining slots are reserved for `b`. Your job: merge `b` into `a` so that `a` ends up fully sorted.

### Example 4 (edge cases)
```
a = [], b = [1, 2, 3]    →    [1, 2, 3]
a = [1, 2], b = []       →    [1, 2]
```

## Constraints
- `0 <= a.length, b.length <= 10^4`
- Both inputs are sorted in ascending order.

## Hints

<details>
<summary>Hint 1 — merging into a new array</summary>

Use two pointers — one for `a`, one for `b`. At each step, compare `a[i]` and `b[j]`, and push the smaller one to the result. Advance that pointer. When one array runs out, append the rest of the other.
</details>

<details>
<summary>Hint 2 — in place, the trick is to merge from the BACK</summary>

If you merge front-to-back into `a`, you'd overwrite values in `a` you haven't read yet.

Instead, merge from the back. Use three pointers:
- `i = m - 1`  (last real value in `a`)
- `j = n - 1`  (last value in `b`)
- `k = m + n - 1`  (the very last slot in `a`, where the next biggest value goes)

At each step, compare `a[i]` and `b[j]`, place the **larger** at `a[k--]`, and decrement whichever pointer it came from. This way, you only write to slots that are already past the data you still need to read.
</details>

## Write your solution
→ [`../solutions/07-merge-sorted-arrays.js`](../solutions/07-merge-sorted-arrays.js)

## Follow-ups
- Merge **k** sorted arrays — see Q27 (uses a min-heap).
- Merge two sorted linked lists (covered in the Linked Lists topic).
