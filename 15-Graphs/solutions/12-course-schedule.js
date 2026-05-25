/**
 * Q12 — Course Schedule
 * Difficulty: Medium
 * Expected:   O(V + E) time · O(V + E) space
 * Problem:    ../questions/12-course-schedule.md
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites - [course, prerequisite]
 * @returns {boolean} true if all courses can be finished
 */
function canFinish(numCourses, prerequisites) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(canFinish(2, [[1, 0]]));        // true
console.log(canFinish(2, [[1,0],[0,1]]));   // false (cycle)
console.log(canFinish(4, [[1,0],[2,0],[3,1],[3,2]])); // true

module.exports = { canFinish };
