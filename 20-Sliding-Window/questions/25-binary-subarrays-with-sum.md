# Q25 — Binary Subarrays With Sum

**Difficulty:** Medium (LeetCode 930)
**Pattern:** Variable-size sliding window — atMost(K) − atMost(K−1) trick
**Expected:** O(n) time · O(1) space

## Problem

Given a binary array `nums` (containing only `0`s and `1`s) and an integer `goal`, return the **number of non-empty subarrays** with a sum equal to `goal`.

## Examples

### Example 1
```
Input:  nums = [1, 0, 1, 0, 1],  goal = 2
Output: 4
```
Subarrays with sum = 2:
- [1,0,1] (indexes 0–2)
- [1,0,1] (indexes 2–4)  ← same values, different indexes
- [0,1,0,1] (indexes 1–4)
- [1,0,1,0] (indexes 0–3)

### Example 2
```
Input:  nums = [0, 0, 0, 0, 0],  goal = 0
Output: 15
```
Every subarray has sum 0. Total subarrays of length n: n*(n+1)/2 = 15.

### Example 3
```
Input:  nums = [1, 1, 1],  goal = 1
Output: 3
```
[1] (×3) + [1,1]? Wait, [1,1] has sum 2 ≠ 1. So only the 3 single-element subarrays.

Actually [1] at index 0, [1] at index 1, [1] at index 2 = 3. ✓

## Constraints
- `1 <= nums.length <= 3 * 10^4`
- `nums[i]` is either `0` or `1`.
- `0 <= goal <= nums.length`

## Hints

<details>
<summary>Hint 1 — use the atMost trick from Q24</summary>

```
count(sum = goal) = atMost(goal) − atMost(goal − 1)
```

`atMost(k)` counts subarrays with sum ≤ k. For a binary array, sum = number of 1s in the window.
</details>

<details>
<summary>Hint 2 — edge case: goal = 0</summary>

`atMost(0)` counts windows with no 1s. `atMost(-1)` should return 0. Make sure your `atMost` handles `k < 0` by returning 0 immediately.
</details>

<details>
<summary>Hint 3 — prefix sum alternative</summary>

Build a prefix sum array. For each `right`, you want to find how many `left` positions satisfy `prefix[right] - prefix[left] = goal`, i.e., `prefix[left] = prefix[right] - goal`. Use a frequency map of prefix sums. This is the same trick as "Subarray Sum Equals K" from the Arrays chapter.
</details>

## Write your solution
→ [`../solutions/25-binary-subarrays-with-sum.js`](../solutions/25-binary-subarrays-with-sum.js)

## Follow-ups
- Solve it using the prefix sum + hash map approach (Hint 3). Which approach do you find cleaner?
- How does the answer change if `goal` can equal `nums.length`? (The entire array is a valid subarray if all elements are 1.)
