# Q14 — Meeting Rooms

**Difficulty:** Easy
**Pattern:** Greedy · Sort by Start, Check Adjacent Overlap
**Expected:** O(n log n) time · O(1) space

## Problem

Given an array of meeting time intervals `intervals` where `intervals[i] = [start_i, end_i]`, determine if a person could **attend all meetings** (i.e., no two meetings overlap).

Two meetings overlap if one starts before the other ends.

## Examples

### Example 1
```
Input:  intervals = [[0,30],[5,10],[15,20]]
Output: false
```
Meeting [0,30] overlaps with [5,10] and [15,20].

### Example 2
```
Input:  intervals = [[7,10],[2,4]]
Output: true
```
[2,4] ends before [7,10] starts — no overlap.

### Example 3
```
Input:  intervals = []
Output: true
```
No meetings — trivially attendable.

### Example 4
```
Input:  intervals = [[1,5],[5,10]]
Output: false
```
These touch at time 5 — depending on convention this counts as overlap (the problem treats `end == start_next` as overlap since the first meeting hasn't ended by the time the second starts).

## Constraints
- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i < end_i <= 10^6`

## Hints

<details>
<summary>Hint 1 — what's the greedy rule?</summary>

Sort intervals by start time. Then check every adjacent pair. If any meeting starts before the previous one ends, you have a conflict. Because we sorted, the only pair that could conflict is adjacent pairs — a meeting can only conflict with the ones immediately before or after it in sorted order.
</details>

<details>
<summary>Hint 2 — why sorting by start time is sufficient</summary>

If meetings `A` and `B` are non-adjacent in the sorted list, there's at least one meeting `C` between them (in time). For `A` and `B` to overlap while not overlapping with `C`, you'd have to skip over `C` — but since we sorted by start, `C` starts between `A` and `B`. If `A` and `B` overlap, they pass through `C`'s start time, meaning `A` also overlaps with `C`. So checking adjacent pairs catches all conflicts.
</details>

<details>
<summary>Hint 3 — implementation</summary>

```js
intervals.sort((a, b) => a[0] - b[0]);
for (let i = 1; i < intervals.length; i++) {
  if (intervals[i][0] < intervals[i-1][1]) return false;
}
return true;
```
</details>

## Write your solution
→ [`../solutions/14-meeting-rooms.js`](../solutions/14-meeting-rooms.js)

## Follow-ups
- **Meeting Rooms II** (Q15) — what is the minimum number of rooms needed?
- What if each meeting had a priority level, and you could skip low-priority meetings to attend all high-priority ones?
