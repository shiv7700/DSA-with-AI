/**
 * Q21 — Connect Ropes with Minimum Cost
 * Difficulty: Medium
 * Expected:   O(n log n) time · O(n) space
 * Problem:    ../questions/21-connect-ropes-minimum-cost.md
 */

function connectRopes(lengths) {
  // TODO: build a min-heap from lengths
  // While heap.size() > 1: pop the two smallest ropes, merge them,
  // add the merge cost to totalCost, push the merged rope back
  // Return totalCost
}

// ── quick tests ──────────────────────────────────────────────
console.log(connectRopes([4, 3, 2, 6]));    // 29
console.log(connectRopes([1, 2, 3, 4, 5])); // 33
console.log(connectRopes([5]));              // 0
console.log(connectRopes([1, 1]));           // 2

module.exports = { connectRopes };
