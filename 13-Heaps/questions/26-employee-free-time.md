# Q26 — Employee Free Time

**Difficulty:** Hard
**Pattern:** Min-heap merge of sorted interval lists
**Expected:** O(n log k) time · O(k) space (k employees, n total intervals)

## Problem

You are given a list of schedules for `k` employees. Each employee's schedule is a list of non-overlapping intervals sorted by start time, representing the times they are **working**.

Return a list of finite intervals representing the **common free time** for all employees — times when no employee is working.

Note: Even if an employee has no scheduled work at a certain time, that does not count as "free time" if another employee is working. Free time is when ALL employees are simultaneously free.

## Examples

### Example 1
```
Input:  schedule = [[[1,3],[6,7]], [[2,4]], [[2,5],[9,12]]]
Output: [[5,6],[7,9]]
```
Employee 0 works [1,3] and [6,7].
Employee 1 works [2,4].
Employee 2 works [2,5] and [9,12].

Combined busy intervals sorted: [1,3],[2,4],[2,5],[6,7],[9,12]
Merged busy: [1,5],[6,7],[9,12]
Free gaps: [5,6] and [7,9].

### Example 2
```
Input:  schedule = [[[1,3],[9,12]], [[2,4]], [[6,8]]]
Output: [[4,6],[8,9]]
```

### Example 3
```
Input:  schedule = [[[1,2],[3,4]], [[2,3]]]
Output: []
```
No free gaps — intervals cover [1,4] continuously.

## Constraints
- `1 <= schedule.length , schedule[i].length <= 50`
- `0 <= schedule[i][j].start < schedule[i][j].end <= 10^8`
- Each employee's intervals are sorted and non-overlapping.

## Hints

<details>
<summary>Hint 1 — merge all intervals, then find the gaps</summary>

Two-step approach:
1. Merge all k employees' interval lists into one sorted combined list.
2. Scan the merged list, merging overlapping intervals. The gaps between consecutive non-overlapping merged intervals are the free times.
</details>

<details>
<summary>Hint 2 — use a min-heap to merge k sorted lists</summary>

This is the same pattern as Q10 (merge k sorted lists), but with intervals instead of integers.

Seed the heap with the first interval from each employee: `(start, employeeIdx, intervalIdx)`. Pop the earliest-starting interval, then push the next interval from the same employee.

This produces all intervals in globally sorted order by start time in O(n log k).
</details>

<details>
<summary>Hint 3 — finding gaps in the merged stream</summary>

As you stream intervals in sorted order, maintain a `maxEnd` (the furthest right boundary seen so far).

For each new interval `[s, e]`:
- If `s > maxEnd`: free gap found — add `[maxEnd, s]` to results.
- Update `maxEnd = max(maxEnd, e)`.

Start `maxEnd` at the first interval's end.
</details>

## Write your solution
→ [`../solutions/26-employee-free-time.js`](../solutions/26-employee-free-time.js)

## Follow-ups
- What if you needed the free time when at least one employee is free (union complement)?
- **Merge Intervals** — a simpler prerequisite problem where you merge a single list of overlapping intervals.
- How does the time complexity compare to the naive approach of flattening all intervals and sorting?
