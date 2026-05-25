/**
 * Q43 — Word Break → Memoized DP (Optimization Drill)
 * Difficulty: Medium
 * Expected:   O(n² · m) time · O(n) space
 * Problem:    ../questions/43-word-break-to-dp.md
 */

// ── Stage 1: Pure backtracking (observe exponential behavior) ──
function wordBreakBacktrack(s, wordDict) {
  // TODO: implement naive backtracking (no memoization)
}

// ── Stage 2: Backtracking with memoization ──
function wordBreakMemo(s, wordDict) {
  // TODO: add memoization by start index to Stage 1
}

// ── Stage 3: Bottom-up DP ──
function wordBreakDP(s, wordDict) {
  // TODO: iterative DP solution
}

// ── quick tests ──────────────────────────────────────────────
console.log(wordBreakBacktrack("leetcode", ["leet","code"]));        // true
console.log(wordBreakMemo("applepenapple", ["apple","pen"]));        // true
console.log(wordBreakDP("catsandog", ["cats","dog","sand","and","cat"])); // false

module.exports = { wordBreakBacktrack, wordBreakMemo, wordBreakDP };
