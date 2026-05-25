/**
 * Q2 — Reverse an Array Using a Stack
 * Difficulty: Easy
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/02-reverse-array.md
 */

function reverseArray(arr) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(reverseArray([1, 2, 3, 4, 5]));   // [5, 4, 3, 2, 1]
console.log(reverseArray(['a', 'b', 'c']));    // ['c', 'b', 'a']
console.log(reverseArray([]));                  // []
console.log(reverseArray([42]));                // [42]

module.exports = { reverseArray };
