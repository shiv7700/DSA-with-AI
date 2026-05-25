# Q9 — Merge Sort

**Difficulty:** Easy/Medium
**Pattern:** Divide and Conquer — split, sort halves, merge
**Expected:** O(n log n) time · O(n) space

## Problem

Implement merge sort. Given an array of integers `nums`, return a new sorted array containing the same elements in ascending order.

Rules:
- Return a new array (do not sort in place).
- You must implement merge sort yourself — no `Array.prototype.sort()`.
- Your implementation should have O(n log n) time complexity.

## Examples

### Example 1
```
Input:  [38, 27, 43, 3, 9, 82, 10]
Output: [3, 9, 10, 27, 38, 43, 82]
```

### Example 2
```
Input:  [5, 1, 4, 2, 8]
Output: [1, 2, 4, 5, 8]
```

### Example 3 (already sorted)
```
Input:  [1, 2, 3, 4, 5]
Output: [1, 2, 3, 4, 5]
```

### Example 4 (edge cases)
```
Input:  []    → []
Input:  [1]   → [1]
```

## Constraints

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- Time: O(n log n). Space: O(n).

## Hints

<details>
<summary>Hint 1 — the two-function structure</summary>

Merge sort is cleanest when split into two functions:

1. `mergeSort(arr)` — the recursive splitter.
2. `merge(left, right)` — takes two sorted arrays, returns one sorted merged array.

`mergeSort` calls itself to sort each half, then calls `merge` to combine them.
</details>

<details>
<summary>Hint 2 — the base case</summary>

An array of 0 or 1 elements is already sorted. Return it immediately — that's your base case:

```js
if (arr.length <= 1) return arr;
```
</details>

<details>
<summary>Hint 3 — the merge step</summary>

Given two sorted arrays `left` and `right`, merge them:

```
left  = [1, 3, 5]
right = [2, 4, 6]

Use two pointers i and j, starting at 0.
While both arrays have elements:
  Take the smaller of left[i] and right[j]. Advance that pointer.
After one runs out, append the rest of the other.

Result: [1, 2, 3, 4, 5, 6]
```
</details>

<details>
<summary>Hint 4 — putting it together</summary>

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}
```

You write the `merge` helper.
</details>

## Write your solution

→ [`../solutions/09-merge-sort.js`](../solutions/09-merge-sort.js)

## Follow-ups

- Draw the full recursion tree for `[4, 2, 1, 3]`. Label each merge step with its input and output.
- Why is merge sort **stable** (preserves relative order of equal elements) while quicksort (with Lomuto partition) is not?
- Implement an **in-place** merge sort. It's trickier — the merge step needs to work without allocating a new array.
- How would you merge sort a **linked list**? (Hint: splitting a linked list at the midpoint is O(n), but merging is still O(n) — and no extra space is needed for the merge.)
