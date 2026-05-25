/**
 * Q25 — Pitfall: Off-by-one in Lower Bound (`right = mid` vs `right = mid - 1`)
 * Difficulty: Pitfall Drill
 * Expected:   N/A — implement both, observe the difference
 * Problem:    ../questions/25-lower-bound-offbyone.md
 */

// CORRECT lower bound: right = mid (do NOT exclude mid — it may be the answer)
function lowerBoundCorrect(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    // TODO: implement with right = mid on the else branch
  }

  return left;
}

// BUGGY lower bound: right = mid - 1 (accidentally excludes valid candidates)
function lowerBoundBuggy(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;  // ← BUG: excludes mid even though arr[mid] >= target
    }
  }

  return left;
}

// ── quick tests — observe where buggy gives the wrong answer ──
const arr = [1, 3, 5, 5, 5, 7];

console.log('=== Correct lower bound ===');
console.log(lowerBoundCorrect(arr, 5));   // 2  (first 5 is at index 2)
console.log(lowerBoundCorrect(arr, 6));   // 5  (first element >= 6 is arr[5]=7)
console.log(lowerBoundCorrect(arr, 1));   // 0
console.log(lowerBoundCorrect(arr, 8));   // 6  (arr.length — insert at end)

console.log('=== Buggy lower bound ===');
console.log(lowerBoundBuggy(arr, 5));     // WRONG — should be 2
console.log(lowerBoundBuggy(arr, 6));     // may be wrong

module.exports = { lowerBoundCorrect, lowerBoundBuggy };
