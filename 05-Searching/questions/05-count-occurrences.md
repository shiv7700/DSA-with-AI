# Q5 — Count Occurrences in a Sorted Array

**Difficulty:** Easy
**Pattern:** Binary search — upper bound minus lower bound
**Expected:** O(log n) time · O(1) space

## Problem

You are given a **sorted** array of integers `nums` and a `target` integer. Return the **count** of how many times `target` appears in `nums`.

You must run in **O(log n)** time — not O(n).

> **Why O(log n)?** A linear scan to count occurrences is obvious. The interesting challenge is doing it with binary search — which forces you to internalize lower bound and upper bound as building blocks, not just as concepts.

## Examples

### Example 1
```
Input:  nums = [1, 2, 4, 4, 4, 7, 9], target = 4
Output: 3
```

### Example 2
```
Input:  nums = [1, 2, 3, 4, 5], target = 6
Output: 0
```

### Example 3 (all elements match)
```
Input:  nums = [5, 5, 5, 5, 5], target = 5
Output: 5
```

### Example 4 (single element, matches)
```
Input:  nums = [7], target = 7
Output: 1
```

### Example 5 (empty array)
```
Input:  nums = [], target = 3
Output: 0
```

## Constraints
- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i], target <= 10^9`
- `nums` is sorted in non-decreasing order.

## Hints

<details>
<summary>Hint 1 — build on Q4</summary>

If you solved Q4 (First and Last Occurrence), this is one line:

```
count = last - first + 1   (when first !== -1)
count = 0                  (when target is not found)
```

You can reuse your `findFirst` and `findLast` helpers directly.
</details>

<details>
<summary>Hint 2 — alternative with lowerBound and upperBound</summary>

Using the two bound functions:

```js
function countOccurrences(nums, target) {
  const lo = lowerBound(nums, target);           // first index >= target
  const hi = upperBound(nums, target);           // first index > target
  if (lo === hi) return 0;                       // target not present
  return hi - lo;
}
```

`hi - lo` gives the number of elements equal to `target`.
</details>

## Write your solution
→ [`../solutions/05-count-occurrences.js`](../solutions/05-count-occurrences.js)

## Follow-ups
- What if you also want to return the starting and ending indexes, not just the count?
- Extend to count occurrences in a range: "how many elements are in `[lo, hi]`?"
- What if the array is **unsorted**? What's the minimum extra work to make this work? (Sort first — O(n log n) — then binary search.)
