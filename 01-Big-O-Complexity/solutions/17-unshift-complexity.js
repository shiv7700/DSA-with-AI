/**
 * Q17 — Why is arr.unshift(x) O(n)?
 * Difficulty: Easy (Conceptual)
 * Expected:   Written explanation with a diagram or trace
 * Problem:    ../questions/17-unshift-complexity.md
 */

function explainUnshiftComplexity() {
  // TODO: your solution here
  // Explain:
  //   1. Why arr.unshift(x) is O(n) — internal mechanics
  //   2. Why arr.push(x) is O(1)
  //   3. What [...arr1, ...arr2] does and its complexity
}

// ── quick tests ──────────────────────────────────────────────
const arr = ['A', 'B', 'C', 'D'];
arr.unshift('Z');
console.log(arr); // ['Z', 'A', 'B', 'C', 'D']

module.exports = { explainUnshiftComplexity };
