/**
 * Q1 — Stable vs. Unstable Sort
 * Difficulty: Easy (Concept Check)
 * Expected:   Understanding, no code required
 * Problem:    ../questions/01-stable-vs-unstable.md
 */

function stableSort(arr, compareFn) {
  // TODO: implement a stable sort and explain in comments why it preserves order
}

// ── quick tests ──────────────────────────────────────────────
const students = [
  { name: 'Carlos', age: 20 }, { name: 'Aisha', age: 22 },
  { name: 'Diana', age: 20 },  { name: 'Ben', age: 22 },
];
console.log(stableSort(students, (a, b) => a.age - b.age));
// Carlos before Diana, Aisha before Ben

module.exports = { stableSort };
