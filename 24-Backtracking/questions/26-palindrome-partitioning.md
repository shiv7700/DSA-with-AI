# Q26 — Palindrome Partitioning

**Difficulty:** Medium
**Pattern:** Backtracking — try every prefix, recurse on suffix if prefix is a palindrome
**Expected:** O(n · 2^n) time · O(n) space (excluding output)

## Problem

Given a string `s`, partition `s` such that every substring in the partition is a **palindrome**. Return all possible palindrome partitioning of `s`.

## Examples

### Example 1
```
Input:  s = "aab"
Output: [["a","a","b"],["aa","b"]]
```
`"a" | "a" | "b"` and `"aa" | "b"` are both valid palindrome partitions.

### Example 2
```
Input:  s = "a"
Output: [["a"]]
```

## Constraints
- `1 <= s.length <= 16`
- `s` consists of only lowercase English letters.

## Hints

<details>
<summary>Hint 1 — try all possible first cuts</summary>

At position `start`, try every endpoint `end` from `start + 1` to `s.length`. Extract the substring `s.slice(start, end)`. If it is a palindrome, add it to the current partition and recurse from `end`.
</details>

<details>
<summary>Hint 2 — palindrome check</summary>

Write a helper `isPalindrome(s, left, right)` that checks in O(L) time using two pointers. Avoid creating substrings just for the check — work directly with indices.
</details>

<details>
<summary>Hint 3 — precompute palindromes (optimization)</summary>

For better constants, precompute a 2D boolean table `dp[i][j] = true if s[i..j] is a palindrome` using DP before the backtracking. Then each palindrome check is O(1) instead of O(n).
</details>

## Write your solution
→ [`../solutions/26-palindrome-partitioning.js`](../solutions/26-palindrome-partitioning.js)

## Follow-ups
- **Palindrome Partitioning II** — return only the minimum number of cuts instead of all partitions.
- **Partition to K Equal Sum Subsets** — partition a number array by value, not a string by structure.
- Extend to return the lexicographically smallest palindrome partition.
