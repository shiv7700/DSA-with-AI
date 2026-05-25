# Q5 — Is the Array Sorted?

**Difficulty:** Easy
**Pattern:** Single pass / pairwise comparison
**Expected:** O(n) time · O(1) space

## Problem

Given an array of comparable values, determine whether it is sorted, and in which direction. Return one of three strings:

- `'asc'` — sorted in **ascending** (or non-decreasing) order
- `'desc'` — sorted in **descending** (or non-increasing) order
- `'unsorted'` — neither of the above

For arrays of length 0 or 1, return `'asc'` (a trivially-sorted array).

## Examples

### Example 1
```
Input:  [1, 2, 3, 4, 5]
Output: 'asc'
```

### Example 2
```
Input:  [5, 4, 3, 2, 1]
Output: 'desc'
```

### Example 3
```
Input:  [1, 3, 2, 4]
Output: 'unsorted'
```

### Example 4 (all equal values)
```
Input:  [2, 2, 2, 2]
Output: 'asc'    // also valid as 'desc', but prefer 'asc' for ties
```

### Example 5 (edge cases)
```
Input:  []       →  'asc'
Input:  [9]      →  'asc'
```

## Constraints
- `0 <= arr.length <= 10^5`
- Single pass. O(1) extra space.

## Hints

<details>
<summary>Hint 1 — track two possibilities at once</summary>

Walk through consecutive pairs of elements. Keep two boolean flags: `couldBeAsc` and `couldBeDesc`, both starting as `true`. As soon as a pair contradicts one of them, set it to `false`.
</details>

<details>
<summary>Hint 2 — interpreting the flags</summary>

After the loop:
- If `couldBeAsc` is still true, the array is ascending → return `'asc'`.
- Otherwise, if `couldBeDesc` is still true, the array is descending → return `'desc'`.
- Otherwise, return `'unsorted'`.
</details>

<details>
<summary>Hint 3 — early exit</summary>

If both flags become false before you reach the end, you can break out of the loop early and return `'unsorted'`. Not required, but a nice touch.
</details>

## Write your solution
→ [`../solutions/05-is-sorted.js`](../solutions/05-is-sorted.js)

## Follow-ups
- Return the **index** of the first element that breaks the sort.
- Accept a custom comparator function so you can check sorted-ness by any rule (e.g., sorted by string length).
