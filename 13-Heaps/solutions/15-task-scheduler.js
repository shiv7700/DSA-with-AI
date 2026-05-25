/**
 * Q15 — Task Scheduler
 * Difficulty: Medium
 * Expected:   O(n) time · O(1) space
 * Problem:    ../questions/15-task-scheduler.md
 */

function leastInterval(tasks, n) {
  // TODO: count frequencies, then apply the formula:
  // result = max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount)
  // where maxFreq = highest frequency, maxCount = number of tasks with that frequency
  //
  // Alternative: simulate with a max-heap + cooldown queue
}

// ── quick tests ──────────────────────────────────────────────
console.log(leastInterval(["A","A","A","B","B","B"], 2)); // 8
console.log(leastInterval(["A","A","A","B","B","B"], 0)); // 6
console.log(leastInterval(["A","A","A","A","A","A","B","C","D","E","F","G"], 2)); // 16

module.exports = { leastInterval };
