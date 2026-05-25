# Q25 — Longest Palindromic Subsequence

**Difficulty:** Medium
**Pattern:** Interval DP — fill by increasing length
**Expected:** O(n²) time · O(n²) space  (or O(n) with space opt)

## Problem

Given a string `s`, find the length of the **longest palindromic subsequence**. A subsequence is obtained by deleting some characters (possibly none) without disturbing the relative order.

## Examples

### Example 1
```
Input:  s = "bbbab"
Output: 4
```
The LPS is "bbbb".

### Example 2
```
Input:  s = "cbbd"
Output: 2
```
The LPS is "bb".

## Constraints
- `1 <= s.length <= 1000`
- `s` consists only of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — the LCS connection</summary>

The longest palindromic subsequence of `s` equals the LCS of `s` and `reverse(s)`. You can reuse your Q17 (LCS) solution directly!
</details>

<details>
<summary>Hint 2 — pure interval DP</summary>

Define `dp[i][j]` = length of the longest palindromic subsequence of `s[i..j]`.

Base cases:
- `dp[i][i] = 1` (every single character is a palindrome)

Recurrence (fill by increasing length `len = j - i + 1`):
- If `s[i] === s[j]`: `dp[i][j] = dp[i+1][j-1] + 2`
- Otherwise: `dp[i][j] = max(dp[i+1][j], dp[i][j-1])`
</details>

<details>
<summary>Hint 3 — fill order is crucial</summary>

You must fill the table by **increasing interval length**, starting at length 1 (diagonal), then length 2, then 3, etc. Row-by-row filling won't work because `dp[i+1][j-1]` would not be filled yet.
</details>

## Write your solution
→ [`../solutions/25-longest-palindromic-subsequence.js`](../solutions/25-longest-palindromic-subsequence.js)

## Follow-ups
- **Minimum Deletions to Make a String Palindrome** — `n - LPS(s)`.
- **Palindrome Partitioning II** — minimum cuts to partition `s` into all palindromes.
- Reconstruct the actual longest palindromic subsequence, not just its length.
