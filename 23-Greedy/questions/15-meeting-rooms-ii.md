# Q15 — Meeting Rooms II

**Difficulty:** Medium
**Pattern:** Greedy · Sweep Line / Min-Heap
**Expected:** O(n log n) time · O(n) space

## Problem

Given an array of meeting time intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the **minimum number of conference rooms** required to hold all meetings simultaneously.

## Examples

### Example 1
```
Input:  intervals = [[0,30],[5,10],[15,20]]
Output: 2
```
Room 1: [0,30]. Room 2: [5,10] then [15,20] (room 2 is free at time 10).

### Example 2
```
Input:  intervals = [[7,10],[2,4]]
Output: 1
```
One room suffices — [2,4] ends before [7,10] starts.

### Example 3
```
Input:  intervals = [[1,5],[2,6],[3,7],[4,8]]
Output: 4
```
All four meetings overlap at time 4.

### Example 4
```
Input:  intervals = []
Output: 0
```

## Constraints
- `1 <= intervals.length <= 10^4`
- `0 <= start_i < end_i <= 10^6`

## Hints

<details>
<summary>Hint 1 — key insight: count maximum simultaneous meetings</summary>

The answer is the maximum number of meetings that overlap at any single point in time. Think of a "timeline camera" — scan time left to right, +1 when a meeting starts, -1 when a meeting ends. The peak value is the answer.
</details>

<details>
<summary>Hint 2 — what's the greedy rule? (sweep line approach)</summary>

Create two sorted arrays: one of all start times, one of all end times. Use two pointers:
- When the next event is a start (`start[i] < end[j]`): a new room is needed — increment room count and `i`.
- When the next event is an end (`end[j] <= start[i]`): a room is freed — decrement room count and `j`.

Track the maximum room count reached. This is equivalent to the sweep line but faster to implement.
</details>

<details>
<summary>Hint 3 — alternative: min-heap of end times</summary>

Sort meetings by start time. Maintain a min-heap of end times for ongoing meetings.

For each meeting:
1. If the heap is non-empty and the earliest-ending meeting has ended (heap top ≤ current start), reuse that room: pop from heap.
2. Push current meeting's end time onto heap.
3. Heap size = rooms currently in use.

Track maximum heap size.
</details>

## Write your solution
→ [`../solutions/15-meeting-rooms-ii.js`](../solutions/15-meeting-rooms-ii.js)

## Follow-ups
- **Meeting Rooms** (Q14) — the simpler version: can one person attend all meetings?
- What if you wanted to return the actual room assignments (which meetings share a room)?
- **Car Pooling** (Q18) — a similar "capacity tracking" problem with a capacity constraint.
