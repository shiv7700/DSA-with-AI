# Q22 — Meeting Rooms II

**Difficulty:** Medium
**Pattern:** Sort + two arrays (or min-heap), sweep line
**Expected:** O(n log n) time · O(n) space

## Problem

You are given an array of meeting time intervals `intervals[i] = [start, end]`. Find the **minimum number of conference rooms** required to hold all meetings simultaneously.

Two meetings conflict (and need separate rooms) if they overlap. Meetings that touch at an endpoint (e.g., one ends at 10 and another starts at 10) are considered non-conflicting — the room can be reused.

## Examples

### Example 1
```
Input:  [[0,30],[5,10],[15,20]]
Output: 2
```
Meeting [0,30] occupies a room from 0–30.
Meeting [5,10] starts at 5 while [0,30] is ongoing → needs a second room.
Meeting [15,20] starts at 15 while [0,30] is ongoing but [5,10] is done → reuse second room.
Maximum simultaneous meetings at any point: 2.

### Example 2
```
Input:  [[7,10],[2,4]]
Output: 1
```
The meetings don't overlap → one room suffices.

### Example 3
```
Input:  [[1,5],[2,6],[3,7]]
Output: 3
```
At time 3, all three meetings are ongoing.

### Example 4
```
Input:  [[1,10]]
Output: 1
```

## Constraints
- `1 <= intervals.length <= 10^4`
- `0 <= start < end <= 10^6`

## Hints

<details>
<summary>Hint 1 — the key insight</summary>

The minimum number of rooms equals the maximum number of meetings happening **simultaneously** at any point in time.

Think of it as a sweep line: scan through time and count how many meetings are "active" (started but not ended). The peak count is the answer.
</details>

<details>
<summary>Hint 2 — separate start and end arrays</summary>

One clean approach: separate the start times and end times into two sorted arrays. Then use two pointers to simulate the sweep:

```
starts = sorted start times
ends   = sorted end times
rooms  = 0
maxRooms = 0
endPtr = 0

for each start in starts:
  if start >= ends[endPtr]:
    // a room is freed before this meeting starts
    endPtr++
  else:
    // no free room available
    rooms++
  maxRooms = Math.max(maxRooms, rooms)
```

Wait, this needs adjustment. Think carefully: at each new meeting start, a room is either reused (if a meeting has ended) or a new room is needed.
</details>

<details>
<summary>Hint 3 — two sorted arrays approach</summary>

```js
function minMeetingRooms(intervals) {
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends   = intervals.map(i => i[1]).sort((a, b) => a - b);

  let rooms = 0, endPtr = 0;

  for (let i = 0; i < starts.length; i++) {
    if (starts[i] < ends[endPtr]) {
      rooms++;   // need a new room
    } else {
      endPtr++;  // reuse a room that just freed up
    }
  }

  return rooms;
}
```

Why does this work? The number of "rooms in use" at any point equals (meetings started) - (meetings ended). We track the peak by counting how many new rooms we have to open.
</details>

## Write your solution
→ [`../solutions/22-meeting-rooms-ii.js`](../solutions/22-meeting-rooms-ii.js)

## Follow-ups
- **Meeting Rooms I**: given intervals, can all meetings be attended by one person? (Return true if no two intervals overlap.)
- Implement the same solution using a **min-heap** (priority queue) where the heap stores end times of ongoing meetings.
- If each room has a capacity and each meeting has an attendee count, how would you assign meetings to rooms to minimize the number of rooms used?
