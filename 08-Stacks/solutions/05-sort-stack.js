/**
 * Q5 — Sort a Stack
 * Difficulty: Easy
 * Expected:   O(n²) time · O(n) space
 * Problem:    ../questions/05-sort-stack.md
 */

/**
 * Sort the stack in place so the smallest item is on top.
 * You may use one additional temporary stack.
 * @param {number[]} stack - array used as a stack (last element = top)
 * @returns {number[]} the same stack, now sorted (smallest on top)
 */
function sortStack(stack) {
  // TODO: your solution here
}

// ── quick tests ──────────────────────────────────────────────

const s1 = [2, 3, 1, 4];  // top is 4
sortStack(s1);
console.log(s1);  // [4, 3, 2, 1]  (1 is on top — s1[s1.length-1])

const s2 = [5];
sortStack(s2);
console.log(s2);  // [5]

module.exports = { sortStack };
