# Q27 — Palindrome Partitioning II (Minimum Cuts)

**Difficulty:** Hard
**Pattern:** Backtracking to understand the problem → DP for minimum cuts
**Expected:** O(n²) time · O(n²) space (DP solution)

## Problem

Given a string `s`, partition `s` such that every substring is a palindrome. Return the **minimum number of cuts** needed for a palindrome partitioning of `s`.

## Examples

### Example 1
```
Input:  s = "aab"
Output: 1
```
One cut: `"aa" | "b"` — both are palindromes.

### Example 2
```
Input:  s = "a"
Output: 0
```
The entire string is already a palindrome; zero cuts needed.

### Example 3
```
Input:  s = "ab"
Output: 1
```
One cut: `"a" | "b"`.

## Constraints
- `1 <= s.length <= 2000`
- `s` consists of only lowercase English letters.

## Hints

<details>
<summary>Hint 1 — naive backtracking (too slow, but good for understanding)</summary>

Try every palindrome prefix, recurse on the suffix, and return the minimum cuts over all choices. This is O(2^n) — correct but too slow for n = 2000.
</details>

<details>
<summary>Hint 2 — precompute palindrome table</summary>

First, compute `isPalin[i][j]` for all pairs using DP: `isPalin[i][j] = (s[i] === s[j]) && isPalin[i+1][j-1]`. This takes O(n²) time and makes palindrome lookup O(1).
</details>

<details>
<summary>Hint 3 — 1D DP for cuts</summary>

Define `cuts[i]` = minimum cuts for the prefix `s[0..i]`. For each `i`, try all `j <= i` where `s[j..i]` is a palindrome: `cuts[i] = min(cuts[i], cuts[j-1] + 1)`. Base case: `cuts[i] = 0` when `s[0..i]` is itself a palindrome.
</details>

## Write your solution
→ [`../solutions/27-palindrome-partitioning-ii.js`](../solutions/27-palindrome-partitioning-ii.js)

## Follow-ups
- **Palindrome Partitioning I** — return all valid partitions rather than the minimum cut count.
- **Longest Palindromic Substring** — the palindrome precomputation table is the same.
- Can you solve this in O(n) time using Manacher's algorithm?
