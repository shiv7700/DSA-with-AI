/**
 * Q23 — Pitfall: `<=` vs `<` in the while condition
 * Difficulty: Pitfall Drill
 * Expected:   N/A — implement and test both versions
 * Problem:    ../questions/23-while-condition-pitfall.md
 */

// Version A: Standard binary search — CORRECT with `<=`
function binarySearchCorrect(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  // TODO: implement using `while (left <= right)`
}

// Version B: Standard binary search — BUGGY with `<`
// Implement this version too, so you can see the failing test case.
function binarySearchBuggy(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  // TODO: implement using `while (left < right)` — observe the bug
}

// ── quick tests — the single-element case reveals the bug ─────
console.log('=== Correct version ===');
console.log(binarySearchCorrect([7], 7));    // 0 (should find it)
console.log(binarySearchCorrect([7], 3));    // -1

console.log('=== Buggy version ===');
console.log(binarySearchBuggy([7], 7));      // -1 (bug: skips the only element)
console.log(binarySearchBuggy([1, 2, 3, 4, 5], 5)); // -1 (bug: misses last element)

module.exports = { binarySearchCorrect, binarySearchBuggy };
