# Q16 — Longest Increasing Subsequence

**Difficulty:** Medium
**Pattern:** 1D subsequence DP — O(n²) classic, O(n log n) patience sort
**Expected:** O(n²) time · O(n) space  (O(n log n) for bonus)

## Problem

Given an integer array `nums`, return the length of the **longest strictly increasing subsequence**.

A subsequence is obtained by deleting some (or none) of the elements without disturbing the relative order of the remaining elements.

## Examples

### Example 1
```
Input:  nums = [10, 9, 2, 5, 3, 7, 101, 18]
Output: 4
```
The LIS is `[2, 3, 7, 101]` (or `[2, 5, 7, 101]`), length 4.

### Example 2
```
Input:  nums = [0, 1, 0, 3, 2, 3]
Output: 4
```

### Example 3
```
Input:  nums = [7, 7, 7, 7, 7]
Output: 1
```
All elements are equal, so no strictly increasing subsequence has length > 1.

## Constraints
- `1 <= nums.length <= 2500`
- `-10^4 <= nums[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — define dp[i]</summary>

`dp[i]` = the length of the longest strictly increasing subsequence that **ends at index i**. Every element is itself a subsequence of length 1, so `dp[i]` starts at 1.
</details>

<details>
<summary>Hint 2 — the O(n²) recurrence</summary>

For each `i`, look at all `j < i`. If `nums[j] < nums[i]`, then we can extend the subsequence ending at `j` by appending `nums[i]`:

`dp[i] = max(dp[i], dp[j] + 1)` for all `j < i` where `nums[j] < nums[i]`.

The final answer is `max(dp)`.
</details>

<details>
<summary>Hint 3 — O(n log n) with patience sorting (bonus)</summary>

Maintain an array `tails` where `tails[k]` is the smallest possible tail element of any increasing subsequence of length `k+1`. For each number, binary search in `tails` for the first element ≥ the current number and replace it (or append if the current number is larger than all elements). The length of `tails` at the end is the LIS length.
</details>

## Write your solution
→ [`../solutions/16-longest-increasing-subsequence.js`](../solutions/16-longest-increasing-subsequence.js)

## Follow-ups
- **Number of Longest Increasing Subsequences** — count how many LIS exist.
- **Russian Doll Envelopes** — LIS in 2D (pairs that must fit inside each other).
- Reconstruct the actual subsequence, not just its length.
