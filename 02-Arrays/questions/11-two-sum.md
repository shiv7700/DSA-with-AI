# Q11 — Two Sum

**Difficulty:** Medium (the classic interview opener)
**Pattern:** Hash map for O(1) complement lookup
**Expected:** O(n) time · O(n) space

## Problem

You are given an array of integers `nums` and a target integer `target`. Return the indexes of the two numbers in the array that add up to `target`.

Rules:
- Each input has **exactly one valid pair** of indexes.
- You may not use the same element twice.
- The two indexes can be returned in any order.

> **Why this problem matters:** "Find the pair (or triplet, or quadruplet) that meets a sum condition" is one of the most common patterns in coding interviews. The technique you learn here (using a hash map to remember what you've seen) shows up everywhere.

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

### Example 3 (duplicates)
```
Input:  nums = [3, 3],  target = 6
Output: [0, 1]
```

### Example 4 (negatives)
```
Input:  nums = [-3, 4, 3, 90],  target = 0
Output: [0, 2]
```

## Constraints
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i], target <= 10^9`
- Exactly one valid answer exists.

## Hints

<details>
<summary>Hint 1 — brute force first (then we'll improve)</summary>

The straightforward approach is two nested loops: for each `i`, try every `j > i`, and check if `nums[i] + nums[j] == target`. This is O(n²) — it works on small inputs but is too slow at the upper limit.
</details>

<details>
<summary>Hint 2 — the "complement" insight</summary>

For each number `x` in the array, the partner we need is `target - x`. Question: have we seen that partner already as we walked through the array?

If we keep a record of every value we've seen so far (and its index), we can answer that question instantly.
</details>

<details>
<summary>Hint 3 — implementing with a Map</summary>

Walk through the array with a `for` loop. Use a `Map` from value → index:

1. For each index `i`, compute `complement = target - nums[i]`.
2. If `complement` is already in the map, return `[map.get(complement), i]` — done!
3. Otherwise, add `nums[i] → i` to the map and continue.

Why a `Map` and not a plain object? `Map` handles all key types cleanly (including the integer `0`), and its `has`/`get`/`set` are guaranteed O(1).
</details>

## Write your solution
→ [`../solutions/11-two-sum.js`](../solutions/11-two-sum.js)

## Follow-ups
- **Two Sum II** — the input is already sorted. Can you do it with O(1) extra space using two pointers?
- **3Sum** (Q16) — find all unique triplets that sum to zero.
- What if multiple valid pairs exist and you want to return all of them?
