# Q17 — Non-Overlapping Intervals

**Difficulty:** Medium
**Pattern:** Greedy · Sort by End Time (Activity Selection)
**Expected:** O(n log n) time · O(1) space

## Problem

Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the **minimum number of intervals to remove** so that the remaining intervals are non-overlapping.

> **Equivalently:** find the maximum number of non-overlapping intervals, then subtract from total. This is exactly the activity selection problem.

## Examples

### Example 1
```
Input:  intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
```
Remove [1,3] — the remaining [1,2],[2,3],[3,4] are non-overlapping.

### Example 2
```
Input:  intervals = [[1,2],[1,2],[1,2]]
Output: 2
```
Remove two of the three identical intervals.

### Example 3
```
Input:  intervals = [[1,2],[2,3]]
Output: 0
```
Already non-overlapping ([1,2] and [2,3] share only a boundary point, which is considered non-overlapping here).

## Constraints
- `1 <= intervals.length <= 10^5`
- `intervals[i].length == 2`
- `-5 * 10^4 <= start_i < end_i <= 5 * 10^4`

## Hints

<details>
<summary>Hint 1 — reframe the problem</summary>

Minimum removals = `n - (maximum non-overlapping intervals)`. So find the maximum set of non-overlapping intervals — which is the classic activity selection problem from notes.md Lesson 5.
</details>

<details>
<summary>Hint 2 — what's the greedy rule?</summary>

Sort intervals by end time. Walk through:
- If the current interval starts at or after `lastEnd`, it's compatible: keep it, update `lastEnd`.
- Otherwise, it overlaps: skip it (count it as removed).

The greedy rule: **always keep the interval that ends earliest among compatible choices**.
</details>

<details>
<summary>Hint 3 — why "end earliest" and not "shortest"?</summary>

Recall from notes.md — shortest duration is not equivalent to earliest end time when intervals have different start times. Earliest end time is the provably optimal greedy rule (see the exchange argument in Lesson 6).
</details>

## Write your solution
→ [`../solutions/17-non-overlapping-intervals.js`](../solutions/17-non-overlapping-intervals.js)

## Follow-ups
- Return the actual set of intervals to remove rather than just the count.
- **Minimum Arrows to Burst Balloons** (Q16) — uses the same sort-by-end greedy structure.
- What if you could "shrink" intervals (reduce their end time) at some cost, rather than removing them?
