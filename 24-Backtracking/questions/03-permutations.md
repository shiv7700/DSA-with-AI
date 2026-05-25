# Q3 — Permutations

**Difficulty:** Medium
**Pattern:** Backtracking — mark used elements, build full-length arrangements
**Expected:** O(n · n!) time · O(n) space (excluding output)

## Problem

Given an array `nums` of **distinct** integers, return all possible permutations. A permutation is an arrangement of all elements in every possible order. You may return the answer in any order.

## Examples

### Example 1
```
Input:  nums = [1, 2, 3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```
All 3! = 6 orderings of the three elements.

### Example 2
```
Input:  nums = [0, 1]
Output: [[0,1],[1,0]]
```

### Example 3
```
Input:  nums = [1]
Output: [[1]]
```

## Constraints
- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- All integers in `nums` are **distinct**.

## Hints

<details>
<summary>Hint 1 — what makes permutations different from subsets</summary>

In subsets, you only look forward (using a `start` index) because order doesn't matter. In permutations, `[1, 2]` and `[2, 1]` are different outcomes, so at each position you must be able to pick **any unused element**. You can no longer restrict to a forward range.
</details>

<details>
<summary>Hint 2 — tracking which elements are already used</summary>

Maintain a boolean array `used` of the same length as `nums`. Before picking `nums[i]`, check `used[i]`. After picking it, set `used[i] = true`, recurse, then set `used[i] = false` (the unchoose step).
</details>

<details>
<summary>Hint 3 — base case</summary>

The base case is when `current.length === nums.length`. At that point, every element has been placed — record a clone of `current` and return.
</details>

<details>
<summary>Hint 4 — swap-based alternative</summary>

An alternative approach: at depth `d`, swap `nums[d]` with `nums[i]` for each `i >= d`, recurse with depth `d + 1`, then swap back. This avoids the `used` array but mutates the input. Both approaches are valid.
</details>

## Write your solution
→ [`../solutions/03-permutations.js`](../solutions/03-permutations.js)

## Follow-ups
- **Permutations II** — same problem with possible duplicate elements.
- **Next Permutation** — find only the next lexicographic permutation in O(n) time.
- **Permutation Sequence** — return the k-th permutation directly without generating all of them.
