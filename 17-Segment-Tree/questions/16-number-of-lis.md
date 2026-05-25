# Q16 — Number of Longest Increasing Subsequences

**Difficulty:** Medium
**Pattern:** Segment Tree on values (or DP)
**Expected:** O(n log n) time · O(n) space

## Problem

Given an integer array `nums`, return the **number** of longest increasing subsequences.

(If there are multiple LIS of the same maximum length, count all of them.)

## Examples

### Example 1

```
Input:  [1, 3, 5, 4, 7]
Output: 2
```
The two LIS are `[1, 3, 5, 7]` and `[1, 3, 4, 7]`.

### Example 2

```
Input:  [2, 2, 2, 2, 2]
Output: 5
```
Each single element is an LIS of length 1.

### Example 3

```
Input:  [1, 2, 4, 3, 5, 4, 7, 2]
Output: 3
```

## Constraints

- `1 <= nums.length <= 2000`
- `-10^6 <= nums[i] <= 10^6`

## Hints

<details>
<summary>Hint 1 — DP approach O(n²)</summary>

Let `dp[i]` = (length of LIS ending at i, count of such LIS).

For each `i`, look at all `j < i` where `nums[j] < nums[i]`. If `dp[j].length + 1 > dp[i].length`, update dp[i]. If equal, add to count. O(n²) — fine for n ≤ 2000.
</details>

<details>
<summary>Hint 2 — segment tree on values (O(n log n))</summary>

Coordinate-compress the values. Build a segment tree where each node stores `(maxLen, count)` — the maximum LIS length achievable ending with a value in this range, and the count of ways.

For each `nums[i]`:
1. Query `[minVal, nums[i]-1]` → get `(maxLen, count)`.
2. The LIS ending at `nums[i]` has length `maxLen + 1` with `count` ways.
3. Update position `nums[i]` with `(maxLen + 1, count)`.

The merge operation: given left `(l1, c1)` and right `(l2, c2)`:
- If `l1 > l2`: take left.
- If `l2 > l1`: take right.
- If `l1 === l2`: `(l1, c1 + c2)`.
</details>

<details>
<summary>Hint 3 — final answer</summary>

After processing all elements, the answer is the count from querying the full value range (i.e., `tree[root].count`).
</details>

## Write your solution

→ [`../solutions/16-number-of-lis.js`](../solutions/16-number-of-lis.js)

## Follow-ups

- Try the O(n²) DP approach first to validate correctness, then implement the O(n log n) segment tree version.
- How would you reconstruct one of the actual LIS sequences, not just the count?
