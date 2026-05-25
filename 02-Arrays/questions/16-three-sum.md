# Q16 — 3Sum

**Difficulty:** Medium
**Pattern:** Sort + two pointers · careful duplicate handling
**Expected:** O(n²) time · O(1) extra space (not counting the output)

## Problem

Given an integer array `nums`, return **all unique triplets** `[a, b, c]` from the array such that:

- `a + b + c = 0`
- The three values come from three **different positions** in the array (no reusing the same index).
- The result must not contain **duplicate triplets** — e.g., `[-1, 0, 1]` should appear only once, regardless of how many ways you could form it.

## Examples

### Example 1
```
Input:  nums = [-1, 0, 1, 2, -1, -4]
Output: [[-1, -1, 2], [-1, 0, 1]]
```
These are the two unique triplets that sum to 0. Note that `[-1, -1, 2]` uses **two different** `-1`s — they come from different positions in the original array, which is allowed.

### Example 2
```
Input:  nums = [0, 1, 1]
Output: []
```
No triplet sums to 0.

### Example 3 (all zeros)
```
Input:  nums = [0, 0, 0]
Output: [[0, 0, 0]]
```

### Example 4
```
Input:  nums = [-2, 0, 1, 1, 2]
Output: [[-2, 0, 2], [-2, 1, 1]]
```

## Constraints
- `3 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`
- The result must contain no duplicate triplets.

## Hints

<details>
<summary>Hint 1 — sort first</summary>

Sort the array. Once it's sorted, you can reduce the problem to **2Sum on a sorted array**, which is just two pointers.

The outer loop picks the first element of the triplet (`i`). For each `i`, you look for a pair `(left, right)` in the rest of the array such that `nums[left] + nums[right] == -nums[i]`.
</details>

<details>
<summary>Hint 2 — the framework</summary>

```
sort(nums)
for i = 0 .. n - 3:
  if i > 0 and nums[i] == nums[i - 1]: continue   // skip duplicate first element
  left = i + 1, right = n - 1
  while left < right:
    sum = nums[i] + nums[left] + nums[right]
    if sum < 0: left++
    else if sum > 0: right--
    else:
      record [nums[i], nums[left], nums[right]]
      left++; right--
      // skip duplicates on both sides
      while left < right and nums[left] == nums[left - 1]: left++
      while left < right and nums[right] == nums[right + 1]: right--
```
</details>

<details>
<summary>Hint 3 — handling duplicates is the trickiest part</summary>

Three places to skip duplicates:
1. After picking the first element `nums[i]`, skip if `nums[i]` is the same as the previous `nums[i - 1]`.
2. After recording a valid triplet, advance `left` past any equal neighbors.
3. After recording a valid triplet, retreat `right` past any equal neighbors.

Miss any one of these and you'll have duplicate triplets in your output.
</details>

<details>
<summary>Hint 4 — small optimization</summary>

If `nums[i] > 0`, no triplet starting at `i` can sum to 0 (the remaining values are all ≥ `nums[i]`). You can break out of the loop early.
</details>

## Write your solution
→ [`../solutions/16-three-sum.js`](../solutions/16-three-sum.js)

## Follow-ups
- **3Sum Closest** — return the triplet whose sum is closest to a given target.
- **3Sum Smaller** — count triplets whose sum is strictly less than a target.
- **4Sum** — same idea, generalized to four numbers.
- **k-Sum** — recursive generalization to any k.
