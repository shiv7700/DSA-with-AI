/**
 * Q13 — Course Schedule II
 * Difficulty: Medium
 * Expected:   O(V + E) time · O(V + E) space
 * Problem:    ../questions/13-course-schedule-ii.md
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @returns {number[]} topological order, or [] if cycle exists
 */
function findOrder(numCourses, prerequisites) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(findOrder(2, [[1,0]]));               // [0, 1]
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]])); // [0,1,2,3] or [0,2,1,3]
console.log(findOrder(2, [[1,0],[0,1]]));          // [] (cycle)

module.exports = { findOrder };
