/**
 * Q27 — Meeting Rooms II
 * Difficulty: Medium
 * Expected:   O(n log n) time · O(n) space
 * Problem:    ../questions/27-meeting-rooms-ii.md
 */

function minMeetingRooms(intervals) {
  // TODO: sort intervals by start time
  // Use a min-heap to track end times of currently active meetings
  // For each meeting [s, e]:
  //   If heap.peek() <= s, reuse that room (pop old end, push new end e)
  //   Else allocate a new room (push e)
  // Return heap.size() — number of rooms in use
}

// ── quick tests ──────────────────────────────────────────────
console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2
console.log(minMeetingRooms([[7,10],[2,4]]));           // 1
console.log(minMeetingRooms([[1,5],[2,6],[3,7],[10,15]])); // 3

module.exports = { minMeetingRooms };
