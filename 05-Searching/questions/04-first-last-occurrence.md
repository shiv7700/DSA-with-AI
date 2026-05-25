# Q4 — First and Last Occurrence

**Difficulty:** Easy
**Pattern:** Binary search — lower bound + upper bound
**Expected:** O(log n) time · O(1) space

## Problem

You are given a **sorted** array of integers `nums` (which may contain duplicates) and a `target` integer. Return an array `[first, last]` where:
- `first` is the index of the **first** occurrence of `target`.
- `last` is the index of the **last** occurrence of `target`.

If `target` is not in the array, return `[-1, -1]`.

You must solve it in **O(log n)** time — no linear scan to find the boundaries.

> **Why this matters:** This is the canonical example of why lower bound and upper bound exist. It comes up directly in interviews (LeetCode 34) and shows up as a sub-step in problems like "count occurrences" and "range queries."

## Examples

### Example 1 (multiple occurrences)
```
Input:  nums = [2, 4, 5, 5, 5, 5, 7, 9, 9], target = 5
Output: [2, 5]
```
`5` first appears at index 2, last at index 5.

### Example 2 (single occurrence)
```
Input:  nums = [1, 2, 3, 4, 5], target = 3
Output: [2, 2]
```

### Example 3 (not present)
```
Input:  nums = [1, 2, 3, 4, 5], target = 6
Output: [-1, -1]
```

### Example 4 (all same)
```
Input:  nums = [7, 7, 7, 7, 7], target = 7
Output: [0, 4]
```

### Example 5 (edge — empty array)
```
Input:  nums = [], target = 5
Output: [-1, -1]
```

## Constraints
- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i], target <= 10^9`
- `nums` is sorted in non-decreasing order (may have duplicates).
- O(log n) time required — no O(n) scan.

## Hints

<details>
<summary>Hint 1 — think in terms of lower and upper bound</summary>

Run **two** binary searches:
1. One to find the **leftmost** index of `target` — this is the lower bound.
2. One to find the **rightmost** index — this is `upperBound(target) - 1`.

For the lower bound, when you find `arr[mid] === target`, don't stop — keep going left (`right = mid`).
For the upper bound, when you find `arr[mid] === target`, keep going right (`left = mid + 1`).
</details>

<details>
<summary>Hint 2 — implementing findFirst</summary>

```js
function findFirst(nums, target) {
  let left = 0, right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      result = mid;       // record this, but keep looking left
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
```
</details>

<details>
<summary>Hint 3 — implementing findLast</summary>

Mirror of `findFirst`. When you see `nums[mid] === target`, record it and search RIGHT (`left = mid + 1`) instead of left.
</details>

## Write your solution
→ [`../solutions/04-first-last-occurrence.js`](../solutions/04-first-last-occurrence.js)

## Follow-ups
- Count the total number of occurrences of `target` using the result of this function.
- What if you only need the first occurrence — how do you simplify?
- **LeetCode 34** — "Find First and Last Position of Element in Sorted Array" is exactly this problem.
