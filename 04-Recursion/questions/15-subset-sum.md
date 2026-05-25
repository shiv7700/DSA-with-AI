# Q15 — Subset Sum: Does Any Subset Add to K?

**Difficulty:** Medium
**Pattern:** Include/exclude recursion — decision tree over array elements
**Expected:** O(2^n) time · O(n) space (call stack)

## Problem

You are given an array `nums` of positive integers and a target `k`. Write a recursive function `hasSubsetSum(nums, k)` that returns `true` if there exists any subset of `nums` that adds up to exactly `k`, and `false` otherwise.

A **subset** can include any number of elements from the array (including zero elements, or all elements). Elements don't have to be contiguous.

> **Why this problem?** This is the include/exclude recursion from Q11 (subsequences), but now we're not just generating all subsets — we stop as soon as we find one that works. It's your first taste of decision trees with early termination, and a direct predecessor to the Combination Sum problem (Q24).

## Examples

### Example 1
```
Input:  nums = [3, 1, 4, 2, 5],  k = 9
Output: true
```
Subset `[4, 5]` sums to 9. Or `[3, 1, 5]`. Multiple valid subsets.

### Example 2
```
Input:  nums = [3, 1, 4, 2, 5],  k = 11
Output: false
```
No subset sums to 11. (Total sum is 15, but you can't hit 11 exactly.)

### Example 3 (edge cases)
```
Input:  nums = [],     k = 0   → true   (empty subset sums to 0)
Input:  nums = [5],    k = 0   → true   (empty subset sums to 0)
Input:  nums = [5],    k = 5   → true   (subset {5} sums to 5)
Input:  nums = [5],    k = 3   → false
```

### Example 4
```
Input:  nums = [1, 2, 3],  k = 6
Output: true      (include all three: 1+2+3 = 6)
```

## Constraints
- `0 <= nums.length <= 20`
- `1 <= nums[i] <= 100`
- `0 <= k <= 1000`

## Hints

<details>
<summary>Hint 1 — the base cases</summary>

Two base cases to handle:

1. If `k === 0`, you've found a valid subset — return `true`. (You don't need any more numbers.)
2. If you've gone through all numbers (index === nums.length), you didn't reach `k` — return `false`.

Order matters: check `k === 0` first, so that reaching exactly zero at any point returns true immediately.
</details>

<details>
<summary>Hint 2 — the recursive case: include or exclude</summary>

For each number `nums[index]`, you have two choices:
1. **Include it**: reduce `k` by `nums[index]` and recurse on the rest.
2. **Exclude it**: leave `k` unchanged and recurse on the rest.

If either choice leads to `true`, return `true`.

```js
function hasSubsetSum(nums, k, index = 0) {
  if (k === 0) return true;
  if (index === nums.length) return false;

  const include = hasSubsetSum(nums, k - nums[index], index + 1);
  const exclude = hasSubsetSum(nums, k, index + 1);

  return include || exclude;
}
```
</details>

<details>
<summary>Hint 3 — early exit optimization</summary>

Notice `include || exclude` — JavaScript's `||` short-circuits. If `include` is already `true`, JavaScript won't even evaluate `exclude`. This gives you automatic early termination as soon as any valid subset is found.

You could also write it explicitly:

```js
if (hasSubsetSum(nums, k - nums[index], index + 1)) return true;
return hasSubsetSum(nums, k, index + 1);
```
</details>

<details>
<summary>Hint 4 — trace for nums=[1,2,3], k=3</summary>

```
hasSubsetSum([1,2,3], 3, 0)
├── include 1 → hasSubsetSum([1,2,3], 2, 1)
│   ├── include 2 → hasSubsetSum([1,2,3], 0, 2) → k===0 → true ✅
(short-circuits here — found a solution!)
```
</details>

## Write your solution
→ [`../solutions/15-subset-sum.js`](../solutions/15-subset-sum.js)

## Follow-ups
- Find **all** subsets that sum to `k` (not just yes/no).
- **Count** the number of subsets that sum to `k`.
- Memoize the solution: the state is `(index, k)`, so there are at most `n × k` unique states. This turns it into a classic DP problem.
- LeetCode 416: **Partition Equal Subset Sum** — a variant where you check if the array can be split into two equal-sum halves.
