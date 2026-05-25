/**
 * Q19 — Sort Objects by Multiple Keys
 * Difficulty: Easy
 * Expected:   O(n log n) time · O(1) space
 * Problem:    ../questions/19-sort-by-multiple-keys.md
 */

function sortEmployees(employees) {
  // TODO: sort by department asc, then salary desc, then name asc
}

// ── quick tests ──────────────────────────────────────────────
const emps = [
  { name: 'Alice', department: 'Eng', salary: 90000 },
  { name: 'Bob', department: 'HR', salary: 70000 },
  { name: 'Carol', department: 'Eng', salary: 95000 },
];
console.log(sortEmployees(emps).map(e => e.name)); // ['Carol', 'Alice', 'Bob']

module.exports = { sortEmployees };
