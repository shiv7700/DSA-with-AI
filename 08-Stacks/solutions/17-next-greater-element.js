/**
 * Q17 — Next Greater Element I & II
 * Difficulty: Medium
 * Expected:   O(n) time · O(n) space
 * Problem:    ../questions/17-next-greater-element.md
 */

/** Part I */
function nextGreaterElement(nums1, nums2) {
  // TODO: your solution here
}

/** Part II — circular array */
function nextGreaterElements(nums) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2]));  // [-1, 3, -1]
console.log(nextGreaterElement([2, 4], [1, 2, 3, 4]));      // [3, -1]

console.log(nextGreaterElements([1, 2, 1]));     // [2, -1, 2]
console.log(nextGreaterElements([1, 2, 3, 4, 3])); // [2, 3, 4, -1, 4]

module.exports = { nextGreaterElement, nextGreaterElements };
