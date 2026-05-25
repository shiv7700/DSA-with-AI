# Q28 — Partition to K Equal Sum Subsets

**Difficulty:** Hard
**Pattern:** Backtracking — assign each number to one of k buckets, prune when bucket overflows
**Expected:** O(k · 2^n) time · O(n) space

## Problem

Given an integer array `nums` and an integer `k`, return `true` if it is possible to divide `nums` into `k` non-empty subsets whose sums are all equal.

## Examples

### Example 1
```
Input:  nums = [4, 3, 2, 3, 5, 2, 1], k = 4
Output: true
```
The subsets are `{5}`, `{1,4}`, `{2,3}`, `{2,3}` — each sums to 5.

### Example 2
```
Input:  nums = [1, 2, 3, 4], k = 3
Output: false
```
No valid partition exists.

## Constraints
- `1 <= k <= nums.length <= 16`
- `1 <= nums[i] <= 10^4`
- `1 <= sum(nums) <= 10^4`

## Hints

<details>
<summary>Hint 1 — early feasibility checks</summary>

Compute `target = sum(nums) / k`. If this is not an integer, return `false` immediately. Also, if any single element exceeds `target`, return `false`.
</details>

<details>
<summary>Hint 2 — bucket-filling backtracking</summary>

Maintain `k` buckets each tracking their current sum. Try assigning each unused number to each bucket. If adding the number to a bucket would not exceed `target`, add it and recurse. On backtrack, remove it. When a bucket reaches exactly `target`, it is "complete" — treat it as full and move on.
</details>

<details>
<summary>Hint 3 — key pruning: skip identical bucket states</summary>

If two buckets currently have the same sum and the current number was already tried (and failed) in the first identical bucket, skip the second. Otherwise, you repeat the same failing subtree. Sort `nums` descending to encourage early failure in the most constrained branches.
</details>

## Write your solution
→ [`../solutions/28-partition-k-equal-sum.js`](../solutions/28-partition-k-equal-sum.js)

## Follow-ups
- **Matchsticks to Square** — same problem with `k = 4` (partition into 4 equal parts forming a square).
- **Partition Equal Subset Sum** — the `k = 2` case can be solved with DP on a subset sum check.
- How does sorting `nums` in descending order help prune the backtracking tree?
