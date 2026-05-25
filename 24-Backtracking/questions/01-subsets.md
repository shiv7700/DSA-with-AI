# Q1 — Subsets

**Difficulty:** Easy
**Pattern:** Backtracking — include/exclude each element
**Expected:** O(n · 2^n) time · O(n) space (excluding output)

## Problem

Given an integer array `nums` of **unique** elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. The order of the subsets and the order of elements within each subset do not matter.

## Examples

### Example 1
```
Input:  nums = [1, 2, 3]
Output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
```
Every combination of including or excluding each of the three elements, including the empty subset.

### Example 2
```
Input:  nums = [0]
Output: [[], [0]]
```
A single element produces exactly two subsets: the empty set and the set containing that element.

## Constraints
- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
- All the numbers of `nums` are **unique**.

## Hints

<details>
<summary>Hint 1 — decision tree shape</summary>

For each element, you have exactly two choices: include it in the current subset, or exclude it. Draw a binary decision tree for `[1, 2, 3]` — every path from root to leaf is one subset.
</details>

<details>
<summary>Hint 2 — the start index</summary>

Use a `start` index to avoid reconsidering elements you've already decided on. At each call, record the current partial subset as a valid result, then loop from `start` to the end of the array — each iteration "includes" `nums[i]` and recurses with `i + 1`.
</details>

<details>
<summary>Hint 3 — cloning rule</summary>

When you push the current state to your results array, push a **copy** (`[...current]`), not a reference. A reference will reflect the final mutated state of `current` (likely empty), not the snapshot you want.
</details>

<details>
<summary>Hint 4 — full template</summary>

```
function backtrack(start, current):
  results.push([...current])          // every state is a valid subset
  for i from start to nums.length-1:
    current.push(nums[i])             // choose
    backtrack(i + 1, current)         // explore
    current.pop()                     // unchoose
```
</details>

## Write your solution
→ [`../solutions/01-subsets.js`](../solutions/01-subsets.js)

## Follow-ups
- **Subsets II** — what if the array may contain duplicates?
- Return only subsets of size exactly `k`.
- Count the number of subsets whose sum equals a given target.
