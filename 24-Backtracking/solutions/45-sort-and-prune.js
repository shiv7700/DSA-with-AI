/**
 * Q45 — When Does Sorting Prune the Tree? (Pruning Drill)
 * Difficulty: Easy (conceptual)
 * Expected:   O(n log n) sorting overhead; savings vary by problem
 * Problem:    ../questions/45-sort-and-prune.md
 */

// ── Part A: Combination Sum — count nodes with and without sorting ──
function combinationSumCountNodes(candidates, target, sorted) {
  // TODO: implement combination sum that counts recursive calls.
  // Run once with candidates unsorted, once sorted, and compare counts.
}

// ── Part B: Combination Sum II — demonstrate break vs continue ──
function combinationSum2WithBreak(candidates, target) {
  // TODO: implement with sorting and break on overshoot.
  // Add a comment explaining why break is valid here.
}

// ── Part C: Subsets II — count duplicate subsets without sorting ──
function subsetsIIUnsorted(nums) {
  // TODO: implement without sorting (produces duplicates).
  // Compare output length to the sorted+dedup version.
}

function subsetsIISorted(nums) {
  // TODO: implement with sorting and duplicate skip.
}

// ── quick tests ──────────────────────────────────────────────
console.log("--- Part A ---");
combinationSumCountNodes([7, 3, 2], 6, false); // print unsorted node count
combinationSumCountNodes([7, 3, 2], 6, true);  // print sorted node count

console.log("--- Part B ---");
console.log(combinationSum2WithBreak([1, 1, 2, 5, 6, 7, 10], 8));
// [[1,1,6],[1,2,5],[1,7],[2,6]]

console.log("--- Part C ---");
const unsorted = subsetsIIUnsorted([4, 4, 4, 1, 4]);
const sorted   = subsetsIISorted([4, 4, 4, 1, 4]);
console.log("Unsorted count:", unsorted.length, "Sorted+dedup count:", sorted.length);

module.exports = {
  combinationSumCountNodes,
  combinationSum2WithBreak,
  subsetsIIUnsorted,
  subsetsIISorted
};
