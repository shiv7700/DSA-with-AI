# Q12 — Find Peak Element

**Difficulty:** Medium
**Pattern:** Binary search — local condition sufficient
**Expected:** O(log n) time · O(1) space

## Problem

A **peak element** is an element that is strictly greater than its neighbors. Given an integer array `nums` where `nums[i] ≠ nums[i + 1]` for all valid `i`, find **any** peak element's index and return it.

You may imagine `nums[-1] = -∞` and `nums[nums.length] = -∞` (the array is bounded by negative infinity on both sides). This guarantees that a peak always exists.

You must solve it in **O(log n)** time.

> **Surprising fact:** You don't need the whole array to be sorted to use binary search here. You only need a *local* sorted condition. If the element at `mid + 1` is larger than the element at `mid`, there must be a peak somewhere to the right — you can safely eliminate the left half. That's enough to halve the search space.

## Examples

### Example 1
```
Input:  nums = [1, 2, 3, 1]
Output: 2
```
`nums[2] = 3` is greater than `nums[1] = 2` and `nums[3] = 1`.

### Example 2
```
Input:  nums = [1, 2, 1, 3, 5, 6, 4]
Output: 1 or 5
```
Both indices 1 and 5 are valid peaks. Return either.

### Example 3 (single element)
```
Input:  nums = [1]
Output: 0
```

### Example 4 (monotone increasing)
```
Input:  nums = [1, 2, 3, 4, 5]
Output: 4
```
The last element is a peak (bounded by -∞ on the right).

## Constraints
- `1 <= nums.length <= 1000`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `nums[i] ≠ nums[i + 1]` for all valid `i`.

## Hints

<details>
<summary>Hint 1 — why does binary search work here?</summary>

At any position `mid`, look at `nums[mid]` and `nums[mid + 1]`:
- If `nums[mid] < nums[mid + 1]`: the slope is rising to the right. A peak must exist in `[mid + 1, right]`. Move `left = mid + 1`.
- If `nums[mid] > nums[mid + 1]`: the slope is falling to the right. A peak must exist in `[left, mid]`. Move `right = mid`.

Why? Because the array is bounded by -∞ on both sides. If the slope is rising, the array must eventually come back down — meaning a peak exists in the rising direction.
</details>

<details>
<summary>Hint 2 — loop termination</summary>

Use `while (left < right)`. When `left === right`, both pointers have converged on a peak. Return `left` (or `right` — they're the same).

Note: here you use `right = mid` (not `mid - 1`) because `mid` itself might be the peak.
</details>

## Write your solution
→ [`../solutions/12-find-peak-element.js`](../solutions/12-find-peak-element.js)

## Follow-ups
- Find **all** peak elements. (Linear scan required — O(n).)
- **Peak in a 2D grid** — find a cell whose value is greater than all 4 neighbors. This is LeetCode 1901 and uses a more complex O(m log n) approach.
- What guarantees exactly one peak in the array? (Nothing — multiple peaks can exist, which is why "return any" is fine here.)
