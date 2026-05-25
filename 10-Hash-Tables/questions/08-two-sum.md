# Q8 — Two Sum (hash-map edition)

**Difficulty:** Easy (in this chapter — you already know the pattern)
**Pattern:** Complement lookup with Map
**Expected:** O(n) time · O(n) space

## Problem

Given an array of integers `nums` and an integer `target`, return the **indexes** of the two numbers that add up to `target`.

- Each input has exactly one valid answer.
- You may not use the same element twice.
- Return the two indexes in any order.

> **Note:** You may have solved this in the Arrays chapter using brute force O(n²). Here, the goal is specifically the O(n) hash-map solution. If you haven't seen the complement trick yet, work through it carefully — it is the foundational pattern of this entire chapter.

## Examples

### Example 1
```
Input:  nums = [2, 7, 11, 15],  target = 9
Output: [0, 1]
```
`nums[0] + nums[1] = 2 + 7 = 9`.

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
<summary>Hint 1 — the complement insight</summary>

For each number `x`, if a pair exists, its partner must be `target - x`. Instead of scanning the whole array for that partner (O(n) per number → O(n²) total), store everything you've seen so far in a `Map`.

When you encounter `x`, check: "is `target - x` already in my map?"
- If yes: you've found the pair. Return their indexes.
- If no: add `x` (and its index) to the map. Move on.
</details>

<details>
<summary>Hint 2 — why Map and not an array or Object?</summary>

`Map` handles all key types cleanly, including negative numbers and `0`. A plain array requires allocating size equal to the value range (which could be billions). An Object works but has prototype-pollution risk and is slower than Map for large numbers of entries. `Map` is the right tool here.
</details>

<details>
<summary>Hint 3 — step-by-step trace for [2, 7, 11, 15], target 9</summary>

```
i=0: x=2, complement=7. Map is empty — 7 not found. Add {2 → 0}.
i=1: x=7, complement=2. Map has 2 at index 0. Return [0, 1]. ✓
```
</details>

## Write your solution
→ [`../solutions/08-two-sum.js`](../solutions/08-two-sum.js)

## Follow-ups
- **Two Sum II** — the input is sorted. Solve in O(1) extra space using two pointers.
- **3Sum** — find all unique triplets that sum to zero.
- What if multiple valid pairs exist and you need to return all of them?
