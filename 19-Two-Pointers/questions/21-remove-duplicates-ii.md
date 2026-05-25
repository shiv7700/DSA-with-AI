# Q21 — Remove Duplicates from Sorted Array II (At Most 2)

**Difficulty:** Medium
**Pattern:** Two Pointers (same direction — slow / fast)
**Expected:** O(n) time · O(1) space

## Problem

Given a sorted integer array `nums`, remove duplicates **in place** such that each unique element appears **at most twice**. Return `k` — the number of elements in the modified array. The first `k` elements of `nums` should hold the result.

## Examples

### Example 1
```
Input:  [1, 1, 1, 2, 2, 3]
Output: k = 5,  nums = [1, 1, 2, 2, 3, _]
```

### Example 2
```
Input:  [0, 0, 1, 1, 1, 1, 2, 3, 3]
Output: k = 7,  nums = [0, 0, 1, 1, 2, 3, 3, _, _]
```

### Example 3
```
Input:  [1, 1]
Output: k = 2,  nums = [1, 1]
```

## Constraints
- `1 <= nums.length <= 3 * 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` is sorted in non-decreasing order.

## Hints

<details>
<summary>Hint 1 — generalize from Q7</summary>

Q7 allows at most 1 of each. Here you allow at most 2. The only change: instead of comparing `nums[fast]` with `nums[slow]`, compare it with `nums[slow - 1]` (the element two spots back in the write region). If they're equal, it means we'd be writing a third copy.
</details>

<details>
<summary>Hint 2 — the general rule</summary>

For "at most K copies," the condition to write `nums[fast]` is:
```
slow < K  OR  nums[fast] !== nums[slow - K]
```
For K = 2: keep `nums[fast]` if `slow < 2` or `nums[fast] !== nums[slow - 2]`.
</details>

<details>
<summary>Hint 3 — start slow at 0 or 2?</summary>

Start `slow = 0` and iterate `fast` from 0. Apply the condition above. The first two elements are always kept (since `slow < 2`).
</details>

## Write your solution
→ [`../solutions/21-remove-duplicates-ii.js`](../solutions/21-remove-duplicates-ii.js)

## Follow-ups
- Generalize to "at most K copies" — write a single function `removeDuplicatesK(nums, k)` that handles any K.
- Cross-reference: [Q7 — Remove Duplicates from Sorted Array](./07-remove-duplicates-sorted.md)
