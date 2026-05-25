/**
 * Q20 — Course Schedule (Kahn's Algorithm)
 * Difficulty: Medium
 * Expected:   O(V + E) time · O(V + E) space
 * Problem:    ../questions/20-course-schedule.md
 */

function canFinish(numCourses, prerequisites) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(canFinish(2, [[1,0]]));        // true
console.log(canFinish(2, [[1,0],[0,1]]));  // false

module.exports = { canFinish };
