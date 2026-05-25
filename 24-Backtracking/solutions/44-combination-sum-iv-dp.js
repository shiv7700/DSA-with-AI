/**
 * Q44 — Combination Sum IV → DP (Optimization Drill)
 * Difficulty: Medium
 * Expected:   O(target · n) time · O(target) space
 * Problem:    ../questions/44-combination-sum-iv-dp.md
 */

// ── Stage 1: Backtracking (observe overlapping subproblems) ──
function combinationSum4Backtrack(nums, target) {
  // TODO: implement naive backtracking
}

// ── Stage 2: Memoized recursion ──
function combinationSum4Memo(nums, target) {
  // TODO: memoize by remaining amount
}

// ── Stage 3: Bottom-up DP ──
function combinationSum4DP(nums, target) {
  // TODO: dp[i] = number of ordered ways to sum to i
}

// ── quick tests ──────────────────────────────────────────────
console.log(combinationSum4Backtrack([1, 2, 3], 4)); // 7
console.log(combinationSum4Memo([1, 2, 3], 4));      // 7
console.log(combinationSum4DP([1, 2, 3], 4));         // 7
console.log(combinationSum4DP([9], 3));               // 0

module.exports = { combinationSum4Backtrack, combinationSum4Memo, combinationSum4DP };
