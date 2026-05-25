# Q33 — Closest Equal Subset Sum

**Difficulty:** Medium
**Pattern:** Backtracking — split into two subsets, minimize absolute difference of sums
**Expected:** O(2^n) time · O(n) space

## Problem

Given an integer array `nums`, split the array into **two non-empty subsets** `S1` and `S2` such that every element belongs to exactly one subset. Return the **minimum possible absolute difference** `|sum(S1) - sum(S2)|`.

## Examples

### Example 1
```
Input:  nums = [1, 6, 11, 5]
Output: 1
```
Split as `{1, 5, 6}` and `{11}` — sums are 12 and 11, difference is 1.

### Example 2
```
Input:  nums = [1, 2, 3, 4, 5]
Output: 1
```
Split as `{1, 4, 5}` and `{2, 3}` — sums are 10 and 5, or `{2, 3, 5}` and `{1, 4}` — difference 5. Best: `{3, 4}` and `{1, 2, 5}` → 7 and 8 → diff 1.

## Constraints
- `1 <= nums.length <= 16`
- `1 <= nums[i] <= 10^5`

## Hints

<details>
<summary>Hint 1 — build all subset sums up to half</summary>

Every element goes to S1 or S2. The sum of S1 determines S2 (since `sum(S2) = total - sum(S1)`). You want `sum(S1)` as close to `total / 2` as possible. Enumerate all possible values of `sum(S1)` via backtracking or bit enumeration.
</details>

<details>
<summary>Hint 2 — generate all subset sums with backtracking</summary>

Use the subset backtracking template (include/exclude each element). At each leaf, compute `sum(S1)` and track the minimum `|sum(S1) - (total - sum(S1))|`.
</details>

<details>
<summary>Hint 3 — pruning</summary>

Track the current partial sum. If it already exceeds `total / 2`, further additions will move it away from the optimal — though you still need to check the current value. Alternatively, use a sorted subset sum approach or meet-in-the-middle for larger n.
</details>

## Write your solution
→ [`../solutions/33-closest-equal-subset-sum.js`](../solutions/33-closest-equal-subset-sum.js)

## Follow-ups
- **Partition Equal Subset Sum** — the special case where the answer must be 0 (exact halving).
- **Partition to K Equal Sum Subsets** — generalize to k groups.
- For `n` up to 40, use meet-in-the-middle: split into two halves and combine.
