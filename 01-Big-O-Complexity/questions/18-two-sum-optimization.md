# Q18 — Optimization Drill: Two Sum (O(n²) → O(n))

**Difficulty:** Medium
**Pattern:** Hash map optimization — eliminate inner loop
**Expected:** O(n) time · O(n) space

## Problem

Given an array of integers `nums` and an integer `target`, return the **indices** of the two numbers that add up to `target`.

The naive brute-force solution uses two nested loops and is O(n²). Your task is to:
1. Implement the naive O(n²) solution in a comment, explaining why it's O(n²).
2. Implement a faster O(n) solution using a hash map.
3. Explain the key insight that makes the O(n) solution work.

You may assume exactly one valid answer exists, and you may not use the same element twice.

## Examples

### Example 1
```
Input:  nums = [2, 7, 11, 15],  target = 9
Output: [0, 1]
```
Because `nums[0] + nums[1] = 2 + 7 = 9`.

### Example 2
```
Input:  nums = [3, 2, 4],  target = 6
Output: [1, 2]
```

### Example 3
```
Input:  nums = [3, 3],  target = 6
Output: [0, 1]
```

## Constraints
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i], target <= 10^9`
- Exactly one valid answer exists.

## Hints

<details>
<summary>Hint 1 — why is the naive approach O(n²)?</summary>

The brute-force approach checks every pair (i, j) where j > i:

```js
for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target) return [i, j];
  }
}
```

Outer loop: O(n). Inner loop: O(n) per outer iteration. Total: O(n²). For n = 10,000, that's up to 50 million pair checks.
</details>

<details>
<summary>Hint 2 — the complement insight</summary>

For each element `nums[i]`, the number that would complete the pair is `target - nums[i]`. Call this the **complement**.

If you know the complement you need, and you have a way to check instantly whether it was seen before — you can do the whole job in one pass.

How do you check instantly? A hash map: `Map` from value → index.
</details>

<details>
<summary>Hint 3 — the O(n) algorithm</summary>

```
Initialize: seen = new Map()

For each index i:
  1. Compute complement = target - nums[i]
  2. If complement is in seen:
       return [seen.get(complement), i]   ← found the pair
  3. Otherwise: seen.set(nums[i], i)      ← record for future lookups

(A valid pair is guaranteed to exist)
```

One pass through the array. Each step: O(1) map operations. Total: O(n) time, O(n) space for the map.
</details>

## Write your solution
→ [`../solutions/18-two-sum-optimization.js`](../solutions/18-two-sum-optimization.js)

## Follow-ups
- **Two Sum II** — the input array is already sorted. Can you solve it in O(n) time and O(1) space using two pointers?
- What happens if the problem allowed multiple valid pairs? How would you collect all of them?
- Is it possible to solve Two Sum in O(n) time and O(1) space without the array being sorted? Explain your reasoning.
- **3Sum** — find all unique triplets that sum to zero. What's the best complexity you can achieve?
