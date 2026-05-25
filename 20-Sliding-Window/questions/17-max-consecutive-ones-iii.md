# Q17 — Max Consecutive Ones III

**Difficulty:** Medium (LeetCode 1004)
**Pattern:** Variable-size sliding window
**Expected:** O(n) time · O(1) space

## Problem

You are given a binary array `nums` (containing only `0`s and `1`s) and an integer `k`. You can flip **at most `k` zeros** to ones. Return the length of the **longest contiguous subarray of ones** you can achieve.

## Examples

### Example 1
```
Input:  nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],  k = 2
Output: 6
```
Flip the two zeros at indexes 9 and 10 (wait, index 10 is out of bounds for length 11 — let me recheck).
nums = [1,1,1,0,0,0,1,1,1,1,0]
Flip positions 9 and 4 (or 3 and 4): window [3..10] has 2 zeros → flip both → [1,1,1,1,1,1,1,1] length 6? Actually window [5..10] = [0,1,1,1,1,0] → flip 2 zeros → length 6. ✓

### Example 2
```
Input:  nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],  k = 3
Output: 10
```

### Example 3
```
Input:  nums = [1, 1, 1],  k = 0
Output: 3
```

### Example 4
```
Input:  nums = [0, 0, 0],  k = 0
Output: 0
```

## Constraints
- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.
- `0 <= k <= nums.length`

## Hints

<details>
<summary>Hint 1 — reframe the problem</summary>

"Flip at most K zeros" = "find the longest window that contains **at most K zeros**."

The window is valid as long as the number of zeros inside it is ≤ k.
</details>

<details>
<summary>Hint 2 — tracking zeros in the window</summary>

Keep a counter `zeros` = number of zeros in the current window.

- Expand right: if `nums[right] === 0`, increment `zeros`.
- Shrink left while `zeros > k`: if `nums[left] === 0`, decrement `zeros`. Advance `left`.
- Update `maxLen = Math.max(maxLen, right - left + 1)`.
</details>

## Write your solution
→ [`../solutions/17-max-consecutive-ones-iii.js`](../solutions/17-max-consecutive-ones-iii.js)

## Follow-ups
- **Max Consecutive Ones I** (no flips): what's the longest run of 1s with `k = 0`? Verify your solution handles this.
- **Max Consecutive Ones II** (`k = 1`): flip exactly one zero. Is there a smarter approach?
- **Longest Subarray of 1s After Deleting One Element** (Q23) — related problem.
