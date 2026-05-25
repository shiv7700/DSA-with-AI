# Q13 — 3Sum Closest

**Difficulty:** Medium
**Pattern:** Two Pointers (sort + fix one + opposite ends)
**Expected:** O(n²) time · O(1) extra space

## Problem

Given an integer array `nums` of length `n` and an integer `target`, find three integers in `nums` such that the sum is **closest to `target`**.

Return the sum of the three integers. You may assume each input has exactly one answer.

## Examples

### Example 1
```
Input:  nums = [-1, 2, 1, -4],  target = 1
Output: 2
```
The sum that is closest to 1 is `2` (from `[-1, 2, 1]`).

### Example 2
```
Input:  nums = [0, 0, 0],  target = 1
Output: 0
```

### Example 3
```
Input:  nums = [1, 1, 1, 0],  target = -100
Output: 2
```

## Constraints
- `3 <= nums.length <= 500`
- `-1000 <= nums[i] <= 1000`
- `-10^4 <= target <= 10^4`

## Hints

<details>
<summary>Hint 1 — same skeleton as 3Sum</summary>

Sort the array. For each fixed element at index `i`, use two pointers `left` and `right` to scan the remaining sub-array. Track the closest sum seen so far.
</details>

<details>
<summary>Hint 2 — tracking the best sum</summary>

Keep a variable `closest` initialized to `Infinity` (or to the sum of the first three elements). After computing each sum, if `Math.abs(sum - target) < Math.abs(closest - target)`, update `closest = sum`.
</details>

<details>
<summary>Hint 3 — moving the pointers</summary>

- If `sum < target` → move `left` right (need a bigger sum).
- If `sum > target` → move `right` left (need a smaller sum).
- If `sum === target` → return immediately, you can't do better.
</details>

## Write your solution
→ [`../solutions/13-three-sum-closest.js`](../solutions/13-three-sum-closest.js)

## Follow-ups
- Compare with Q12 (3Sum exact zero). The only difference is what you track and when you stop.
- Could you solve this in O(n) if you were allowed to use a hash map? (No — three elements, not two — you'd still need O(n²) in the worst case.)
