# Q45 — When Does Sorting Prune the Tree? (Pruning Drill)

**Difficulty:** Easy (conceptual)
**Pattern:** Analysis — understanding when and why sorting enables early loop termination
**Expected:** O(n log n) sorting overhead, O(reduction) pruning benefit

## Problem

This is a conceptual exercise. You will analyze three backtracking problems and answer when sorting the input dramatically reduces the search tree.

**Part A — Combination Sum (unlimited reuse)**

Given `candidates = [7, 3, 2]` and `target = 6`, trace the backtracking tree **without** sorting and again **with** sorting (`[2, 3, 7]`). Count the number of nodes explored each time.

**Part B — Combination Sum II (no reuse, with duplicates)**

Given `candidates = [1, 1, 2, 5, 6, 7, 10]` and `target = 8`, explain why sorting enables a `break` (not just `continue`) inside the candidate loop.

**Part C — Subsets II**

Given `nums = [4, 4, 4, 1, 4]`, trace how many duplicate subsets are generated **without** sorting vs. **with** sorting plus the duplicate-skip condition.

## Examples

### Example A (unsorted)
```
candidates = [7, 3, 2], target = 6
Tree includes paths: [7,...] → prune; [3,3] ✅; [3,2,...] → ...
Nodes explored: (trace yourself)
```

### Example A (sorted)
```
candidates = [2, 3, 7], target = 6
With break when candidates[i] > remaining:
Nodes explored: (trace — fewer!)
```

## Constraints
- This is a written/trace exercise. Implement all three parts in your solution file with annotations.

## Hints

<details>
<summary>Hint 1 — when can you break vs continue?</summary>

`continue` skips the current iteration and tries the next. `break` stops the entire loop. You can only use `break` when you know all remaining candidates are also invalid — which requires the candidates to be sorted in non-decreasing order. If `candidates[i] > remaining` and the array is sorted, every `candidates[j]` for `j > i` is also `> remaining`. So `break` is valid.
</details>

<details>
<summary>Hint 2 — the deduplication condition requires adjacency</summary>

The condition `nums[i] === nums[i - 1]` works only if equal elements sit next to each other. Without sorting, two equal elements at positions 0 and 3 would not trigger the skip condition, generating duplicate results.
</details>

<details>
<summary>Hint 3 — measure the difference</summary>

Implement a counter that increments each time you enter the backtracking function. Run both sorted and unsorted versions and print the counters. On larger inputs, the difference is dramatic.
</details>

## Write your solution
→ [`../solutions/45-sort-and-prune.js`](../solutions/45-sort-and-prune.js)

## Follow-ups
- Does sorting ever **hurt** performance in backtracking? Construct a case where it adds constant overhead without pruning benefit.
- In N-Queens, there are no numeric comparisons — sorting has no effect. Why?
- **When does pruning matter most?** Compare the search tree sizes for Combination Sum with `target = 40, candidates = [1,2,3,4]` sorted vs. unsorted.
