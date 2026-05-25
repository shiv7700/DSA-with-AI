# Q15 — Longest Consecutive Sequence

**Difficulty:** Medium
**Pattern:** Set for O(1) membership · sequence building
**Expected:** O(n) time · O(n) space

## Problem

Given an unsorted array of integers `nums`, return the length of the **longest consecutive sequence** (elements that form a run like `1, 2, 3, 4, 5`).

You must write an algorithm that runs in O(n) time.

## Examples

### Example 1
```
Input:  [100, 4, 200, 1, 3, 2]
Output: 4
```
The longest consecutive sequence is `[1, 2, 3, 4]`, length 4.

### Example 2
```
Input:  [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9
```
The sequence `[0, 1, 2, 3, 4, 5, 6, 7, 8]`, length 9.

### Example 3
```
Input:  []
Output: 0
```

### Example 4
```
Input:  [1, 2, 0, 1]
Output: 3
```
Duplicates are fine — treat them as one.

## Constraints
- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Hints

<details>
<summary>Hint 1 — the naive approach is O(n log n)</summary>

Sort the array, then scan for the longest run of consecutive integers. That's O(n log n). Can you beat it?
</details>

<details>
<summary>Hint 2 — Set for O(1) lookup, key insight</summary>

Put all numbers in a `Set`. Then, for each number `n`:
- If `n - 1` is also in the set, this `n` is **not** the start of a sequence — skip it.
- If `n - 1` is **not** in the set, this `n` is the start of a sequence. Count upward: does `n + 1` exist? `n + 2`? Keep counting until you fall off.

By only starting sequences from their true beginning, each number is "visited" at most twice — O(n) total.
</details>

<details>
<summary>Hint 3 — trace for [100, 4, 200, 1, 3, 2]</summary>

```
Set = {100, 4, 200, 1, 3, 2}

n=100: 99 not in set → start sequence. 101? No. Length 1.
n=4:   3 is in set → skip.
n=200: 199 not in set → start. 201? No. Length 1.
n=1:   0 not in set → start. 2? Yes. 3? Yes. 4? Yes. 5? No. Length 4.
n=3:   2 in set → skip.
n=2:   1 in set → skip.

Max length: 4 ✓
```
</details>

## Write your solution
→ [`../solutions/15-longest-consecutive.js`](../solutions/15-longest-consecutive.js)

## Follow-ups
- Can you reconstruct the actual sequence (not just its length)?
- What if the input is a stream of numbers you can't store all at once?
