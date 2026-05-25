# Q6 — Union of Two Arrays

**Difficulty:** Easy
**Pattern:** Set (automatic deduplication)
**Expected:** O(n + m) time · O(n + m) space

## Problem

Given two arrays `nums1` and `nums2`, return an array of their **union** — all values that appear in **either** array. Each value must appear only once in the result (deduplicated).

The result can be in any order.

## Examples

### Example 1
```
Input:  nums1 = [1, 2, 3],  nums2 = [3, 4, 5]
Output: [1, 2, 3, 4, 5]
```

### Example 2
```
Input:  nums1 = [1, 1, 2],  nums2 = [2, 2, 3]
Output: [1, 2, 3]
```

### Example 3 (identical arrays)
```
Input:  nums1 = [7, 8, 9],  nums2 = [7, 8, 9]
Output: [7, 8, 9]
```

### Example 4 (one empty)
```
Input:  nums1 = [],  nums2 = [1, 2]
Output: [1, 2]
```

## Constraints
- `0 <= nums1.length, nums2.length <= 10^3`
- `0 <= nums1[i], nums2[i] <= 10^3`

## Hints

<details>
<summary>Hint 1 — one line with Set</summary>

A `Set` never stores duplicate values. If you spread both arrays into a single `Set`, you get all unique values from both.

```js
[...new Set([...nums1, ...nums2])]
```

That's the entire solution. But make sure you understand *why* it works: `Set` uses SameValueZero equality to filter duplicates.
</details>

## Write your solution
→ [`../solutions/06-array-union.js`](../solutions/06-array-union.js)

## Follow-ups
- What if you need the union of three or more arrays?
- Compare your Set-based solution with an approach using a `for` loop and a frequency map. Are the time complexities the same?
- What does the union look like if elements can be objects? Why does `new Set([{a:1}, {a:1}]).size` return `2` instead of `1`?
