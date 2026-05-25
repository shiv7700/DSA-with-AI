/**
 * Q16 — Daily Temperatures
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/16-daily-temperatures.md
 */

function dailyTemperatures(temperatures) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // [1,1,4,2,1,1,0,0]
console.log(dailyTemperatures([30, 40, 50, 60]));                   // [1,1,1,0]
console.log(dailyTemperatures([30, 60, 90]));                        // [1,1,0]

module.exports = { dailyTemperatures };
