/**
 * Q24 — Pitfall: Integer Overflow and the `mid` calculation
 * Difficulty: Pitfall Drill
 * Expected:   N/A — implement and document
 * Problem:    ../questions/24-mid-overflow-pitfall.md
 */

// Version A: Standard mid formula (safe in JavaScript)
function binarySearchStandardMid(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // In JavaScript: safe because numbers are 64-bit floats (up to 2^53).
    // In C++/Java with 32-bit ints: (left + right) can overflow if both > ~1B.
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target)   left  = mid + 1;
    else                     right = mid - 1;
  }

  return -1;
}

// Version B: Overflow-safe mid formula (portable to C++/Java)
function binarySearchSafeMid(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // TODO: use the overflow-safe formula: left + Math.floor((right - left) / 2)
    const mid = 0; // ← replace this

    if (arr[mid] === target) return mid;
    if (arr[mid] < target)   left  = mid + 1;
    else                     right = mid - 1;
  }

  return -1;
}

// ── quick tests ──────────────────────────────────────────────
const arr = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearchStandardMid(arr, 7));   // 3
console.log(binarySearchSafeMid(arr, 7));       // 3  (should match)
console.log(binarySearchSafeMid(arr, 1));       // 0
console.log(binarySearchSafeMid(arr, 15));      // 7
console.log(binarySearchSafeMid(arr, 4));       // -1

module.exports = { binarySearchStandardMid, binarySearchSafeMid };
