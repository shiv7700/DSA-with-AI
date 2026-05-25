/**
 * Q15 — Why is arr.includes(x) O(n) but set.has(x) O(1)?
 * Difficulty: Easy–Medium (Conceptual + Practical)
 * Expected:   Written explanation + code comparison
 * Problem:    ../questions/15-array-includes-vs-set.md
 */

// ── explanation (write as a comment) ─────────────────────────
//
// arr.includes(x) is O(n) because...
//
// set.has(x) is O(1) because...
//   (explain hashing in plain terms)
//
// (write here)

// ── practical demonstration ───────────────────────────────────

function checkWithArray(bigList, otherList) {
  // TODO: implement the O(n²) version using includes
  // (for each item in bigList, check if it's in otherList using .includes)
}

function checkWithSet(bigList, otherList) {
  // TODO: implement the O(n) version — convert otherList to a Set first,
  // then use .has() for each item in bigList
}

// ── quick tests ──────────────────────────────────────────────
// const bigList  = [1, 2, 3, 4, 5];
// const lookupList = [3, 5, 7];
// checkWithArray(bigList, lookupList);  // should find 3 and 5
// checkWithSet(bigList, lookupList);    // same result, O(n) total

module.exports = { checkWithArray, checkWithSet };
