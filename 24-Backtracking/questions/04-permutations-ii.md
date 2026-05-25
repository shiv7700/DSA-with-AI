# Q4 — Permutations II (with Duplicates)

**Difficulty:** Medium
**Pattern:** Backtracking — sort + skip duplicate at same depth level
**Expected:** O(n · n!) time · O(n) space (excluding output)

## Problem

Given a collection of numbers, `nums`, that **may contain duplicates**, return all possible unique permutations in any order.

## Examples

### Example 1
```
Input:  nums = [1, 1, 2]
Output: [[1,1,2],[1,2,1],[2,1,1]]
```
The two `1`s are indistinguishable, so `[1, 1, 2]` should appear only once.

### Example 2
```
Input:  nums = [1, 2, 3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```
No duplicates in input, so same as the basic permutations problem.

## Constraints
- `1 <= nums.length <= 8`
- `-10 <= nums[i] <= 10`

## Hints

<details>
<summary>Hint 1 — sort the array first</summary>

Sorting groups equal elements together and enables the adjacent-comparison trick for deduplication.
</details>

<details>
<summary>Hint 2 — the skip condition</summary>

When iterating over candidates for the next position, skip `nums[i]` if:
1. `i > 0 && nums[i] === nums[i - 1]` — it is a duplicate of the previous element, AND
2. `!used[i - 1]` — the previous copy is **not** currently in the path (meaning it was already placed and removed at this same level).

This condition ensures that among duplicate elements, you always place the leftmost one first, preventing the same permutation from being assembled in multiple ways.
</details>

<details>
<summary>Hint 3 — mental model for the skip condition</summary>

Think of it this way: two copies of `1` produce identical branches if you can pick "the second `1`" before "the first `1`" is placed. The condition `!used[i-1]` enforces a left-to-right ordering among equal elements, collapsing those redundant branches into one.
</details>

## Write your solution
→ [`../solutions/04-permutations-ii.js`](../solutions/04-permutations-ii.js)

## Follow-ups
- **Subsets II** — the same duplicate-skipping pattern applied to subset generation.
- How would you modify this to return permutations in sorted (lexicographic) order?
