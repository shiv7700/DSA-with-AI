/**
 * Q32 — Previous Smaller Element
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/32-previous-smaller-element.md
 */

function previousSmallerElement(arr) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────
console.log(previousSmallerElement([1, 6, 4, 10, 2, 5])); // [-1, 1, 1, 4, 1, 2]
console.log(previousSmallerElement([4, 3, 2, 1]));         // [-1, -1, -1, -1]
console.log(previousSmallerElement([1, 2, 3, 4]));         // [-1, 1, 2, 3]

module.exports = { previousSmallerElement };
