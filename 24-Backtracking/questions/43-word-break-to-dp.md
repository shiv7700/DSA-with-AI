# Q43 — Word Break → Memoized DP (Optimization Drill)

**Difficulty:** Medium
**Pattern:** Converting backtracking to memoized recursion to bottom-up DP
**Expected:** O(n² · m) time · O(n) space — where n = string length, m = wordDict size

## Problem

Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

**The goal of this exercise is to implement the solution in three stages** and understand the transformation:

1. **Stage 1:** Pure backtracking (no memoization). Observe exponential behavior.
2. **Stage 2:** Add memoization to the backtracking. Observe polynomial behavior.
3. **Stage 3:** Rewrite as bottom-up DP. Compare structure with Stage 2.

## Examples

### Example 1
```
Input:  s = "leetcode", wordDict = ["leet","code"]
Output: true
```

### Example 2
```
Input:  s = "applepenapple", wordDict = ["apple","pen"]
Output: true
```
`"apple" + "pen" + "apple"` — words can be reused.

### Example 3
```
Input:  s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
```

## Constraints
- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` and `wordDict[i]` consist of lowercase English letters.
- All strings in `wordDict` are **unique**.

## Hints

<details>
<summary>Hint 1 — Stage 1: naive backtracking</summary>

`backtrack(start)` returns `true` if `s[start:]` can be segmented. Try every word in `wordDict`. If `s.startsWith(word, start)`, recurse with `start + word.length`. Return `true` if any path succeeds. This is O(2^n) in the worst case because the same suffix can be recomputed many times.
</details>

<details>
<summary>Hint 2 — Stage 2: memoize by start index</summary>

The only thing that varies between recursive calls is `start`. Cache `memo[start] = result`. Before recursing, check the cache. This reduces unique states to O(n) and calls per state to O(n · m) → total O(n² · m).
</details>

<details>
<summary>Hint 3 — Stage 3: bottom-up DP</summary>

`dp[i] = true` if `s[0..i-1]` can be segmented. `dp[0] = true` (empty prefix). For each `i` from 1 to n, for each `j < i`: if `dp[j]` is true and `s[j..i-1]` is in `wordDict`, set `dp[i] = true`. Answer is `dp[s.length]`.
</details>

## Write your solution
→ [`../solutions/43-word-break-to-dp.js`](../solutions/43-word-break-to-dp.js)

## Follow-ups
- **Word Break II** — enumerate all valid segmentations (Q31) — memoization is essential there.
- Graph the number of recursive calls for Stage 1 vs Stage 2 for increasing `s.length`.
- Write a single file with all three implementations side by side for easy comparison.
