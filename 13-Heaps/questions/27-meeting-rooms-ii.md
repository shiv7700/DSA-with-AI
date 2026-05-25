# Q27 — Meeting Rooms II

**Difficulty:** Medium
**Pattern:** Min-heap tracking end times of active meetings
**Expected:** O(n log n) time · O(n) space

## Problem

You are given an array of meeting time intervals `intervals` where `intervals[i] = [start_i, end_i]`. Return the **minimum number of conference rooms** required to hold all meetings without any conflicts.

Two meetings conflict if one starts before the other ends (intervals overlap).

## Examples

### Example 1
```
Input:  intervals = [[0,30],[5,10],[15,20]]
Output: 2
```
```
Room 1: [0,30]
Room 2: [5,10], [15,20]
```
Meetings [5,10] and [0,30] overlap — need two rooms. [15,20] can reuse room 2 after [5,10] ends.

### Example 2
```
Input:  intervals = [[7,10],[2,4]]
Output: 1
```
Meetings don't overlap — one room suffices.

### Example 3
```
Input:  intervals = [[1,5],[2,6],[3,7],[10,15]]
Output: 3
```
At time 3, meetings [1,5], [2,6], [3,7] are all running simultaneously.

## Constraints
- `1 <= intervals.length <= 10^4`
- `0 <= start_i < end_i <= 10^6`

## Hints

<details>
<summary>Hint 1 — sort by start time first</summary>

Process meetings in chronological order. Sort `intervals` by `start_i`.

When processing a new meeting, check if any previously started meeting has already ended (i.e., its end time ≤ current meeting's start time). If so, that room is free to reuse.
</details>

<details>
<summary>Hint 2 — track room availability with a min-heap of end times</summary>

Maintain a **min-heap of end times** of currently occupied rooms. Its root is the room that becomes free soonest.

For each new meeting `[s, e]`:
1. If `heap.peek() <= s`: the earliest-finishing room is free — reuse it (pop old end, push new end `e`).
2. Otherwise: all rooms are busy — allocate a new room (push `e`).

After processing all meetings, `heap.size()` is the number of rooms needed.
</details>

<details>
<summary>Hint 3 — why pop-and-push rather than just push?</summary>

When you reuse a room, you need to update its end time to the new meeting's end. So pop the old end time and push the new one. This keeps the heap accurate and at the correct size.

The heap size at any point = number of rooms currently in use.
</details>

## Write your solution
→ [`../solutions/27-meeting-rooms-ii.js`](../solutions/27-meeting-rooms-ii.js)

## Follow-ups
- **Meeting Rooms I** — a simpler version: given intervals, determine if a single person can attend all meetings (no overlaps).
- What if some meetings have higher priority and must not be cancelled?
- This is the **interval scheduling** / **minimum number of platforms** problem. Can you identify real-world applications?
