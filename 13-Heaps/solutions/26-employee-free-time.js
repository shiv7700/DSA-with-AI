/**
 * Q26 — Employee Free Time
 * Difficulty: Hard
 * Expected:   O(n log k) time · O(k) space
 * Problem:    ../questions/26-employee-free-time.md
 */

function employeeFreeTime(schedule) {
  // TODO: use a min-heap to merge k sorted interval lists
  // Seed heap with (start, employeeIdx, intervalIdx) for each employee's first interval
  // Stream intervals in sorted order; track maxEnd to find gaps
  // A gap [maxEnd, nextStart] is found when nextStart > maxEnd
}

// ── quick tests ──────────────────────────────────────────────
console.log(employeeFreeTime([[[1,3],[6,7]], [[2,4]], [[2,5],[9,12]]]));
// [[5,6],[7,9]]
console.log(employeeFreeTime([[[1,3],[9,12]], [[2,4]], [[6,8]]]));
// [[4,6],[8,9]]
console.log(employeeFreeTime([[[1,2],[3,4]], [[2,3]]]));
// []

module.exports = { employeeFreeTime };
