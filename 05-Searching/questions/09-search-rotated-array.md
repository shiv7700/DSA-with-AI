# Q9 — Search in Rotated Sorted Array

**Difficulty:** Medium
**Pattern:** Binary search — one half always sorted
**Expected:** O(log n) time · O(1) space

## Problem

Suppose you have a sorted array of distinct integers that has been **rotated** at some unknown pivot. For example, `[4, 5, 6, 7, 0, 1, 2]` is the sorted array `[0, 1, 2, 4, 5, 6, 7]` rotated at index 3.

Given the rotated array `nums` and a `target`, return the index of `target` if it exists, or `-1` if it doesn't.

You must solve it in **O(log n)** time.

> **Why this is tricky:** A naïve binary search breaks on a rotated array because you can't just say "target is to the left" — the array isn't fully sorted. The key insight is that **one half is always sorted**, even in a rotated array. You use that to decide which half to search.

## Examples

### Example 1
```
Input:  nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4
```

### Example 2
```
Input:  nums = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1
```

### Example 3 (no rotation)
```
Input:  nums = [1, 3, 5], target = 3
Output: 1
```

### Example 4 (single element)
```
Input:  nums = [1], target = 1
Output: 0
```

### Example 5
```
Input:  nums = [3, 1], target = 1
Output: 1
```

## Constraints
- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i], target <= 10^4`
- All elements in `nums` are **distinct**.
- `nums` is sorted and then rotated at an unknown pivot.

## Hints

<details>
<summary>Hint 1 — the key observation</summary>

When you pick `mid`, at least one of the two halves — `[left..mid]` or `[mid..right]` — is guaranteed to be in sorted order. Why? Because a rotated sorted array has exactly one "break point." If `mid` is on one side of that break point, the half not containing the break point is sorted.

How do you know which half is sorted? Compare `nums[left]` and `nums[mid]`:
- If `nums[left] <= nums[mid]`: the left half `[left..mid]` is sorted.
- Otherwise: the right half `[mid..right]` is sorted.
</details>

<details>
<summary>Hint 2 — deciding which half to search</summary>

Once you know which half is sorted, check if `target` falls within it:

- **Left half is sorted** (`nums[left] <= nums[mid]`):
  - If `nums[left] <= target < nums[mid]`: target is in the sorted left half → `right = mid - 1`.
  - Otherwise: target must be in the right half → `left = mid + 1`.

- **Right half is sorted** (`nums[mid] < nums[right]`):
  - If `nums[mid] < target <= nums[right]`: target is in the sorted right half → `left = mid + 1`.
  - Otherwise: target must be in the left half → `right = mid - 1`.
</details>

<details>
<summary>Hint 3 — full skeleton</summary>

```js
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  if (nums[mid] === target) return mid;

  if (nums[left] <= nums[mid]) {
    // left half is sorted
    if (nums[left] <= target && target < nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  } else {
    // right half is sorted
    if (nums[mid] < target && target <= nums[right]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
}
return -1;
```
</details>

## Write your solution
→ [`../solutions/09-search-rotated-array.js`](../solutions/09-search-rotated-array.js)

## Follow-ups
- **Q10** — Find the minimum in a rotated sorted array (you need to find the pivot first).
- What if the array can have **duplicates**? (Becomes harder — you can't always determine which half is sorted. Worst case drops to O(n).)
- LeetCode 33 — this is exactly that problem.
