# Q28 — Longest Consecutive Sequence

**Difficulty:** Hard (often disguised as Medium because the trick is subtle)
**Pattern:** Hash set + "only start a walk at sequence-starters"
**Expected:** O(n) time · O(n) space

## Problem

Given an unsorted array of integers, return the **length of the longest run of consecutive integers**. Two integers are "consecutive" if they differ by exactly 1.

You must solve it in **O(n)** time. A sorting-based approach (O(n log n)) is not acceptable for full credit.

## Examples

### Example 1
```
Input:  [100, 4, 200, 1, 3, 2]
Output: 4
```
The longest consecutive run is `[1, 2, 3, 4]` — length 4.

### Example 2
```
Input:  [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9
```
The run is `[0, 1, 2, 3, 4, 5, 6, 7, 8]`.

### Example 3 (empty)
```
Input:  []
Output: 0
```

### Example 4 (with duplicates)
```
Input:  [1, 2, 0, 1]
Output: 3
```
The run is `[0, 1, 2]`. Duplicates don't extend the run.

## Constraints
- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- Must run in O(n) time.

## Hints

<details>
<summary>Hint 1 — the wrong-asymptotic approach (warm-up)</summary>

Sort the array and scan for consecutive runs: O(n log n). Easy to write, but not O(n).
</details>

<details>
<summary>Hint 2 — set + careful starting condition</summary>

Put every number into a `Set` for instant lookup.

Now, for each number `x` in the array, we want to count how long the run **starting at `x`** is. But here's the catch: only do this if `x - 1` is **not** in the set. Otherwise, `x` is in the middle of a run we'll count later starting from a smaller number — counting from here would double-count.

For each true "starter" `x`, count how long the run is by checking `x + 1`, `x + 2`, ... in the set until you miss.
</details>

<details>
<summary>Hint 3 — why this is O(n)</summary>

Each number is touched at most twice: once in the outer loop, and at most once during an inner walk (and only from a real starter). The "only start at starters" check is what makes it O(n) instead of O(n²).
</details>

## Write your solution
→ [`../solutions/28-longest-consecutive-sequence.js`](../solutions/28-longest-consecutive-sequence.js)

## Follow-ups
- Return the actual sequence, not just its length.
- **Binary Tree Longest Consecutive Sequence** — the same idea applied to a tree.
- **Longest Harmonious Subsequence** — a variant where the max minus the min in the subsequence equals exactly 1.
