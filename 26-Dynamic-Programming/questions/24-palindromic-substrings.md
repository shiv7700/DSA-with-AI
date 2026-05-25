# Q24 — Palindromic Substrings

**Difficulty:** Medium
**Pattern:** Expand-around-center / 2D interval DP — count palindromes
**Expected:** O(n²) time · O(1) space

## Problem

Given a string `s`, return the **number of substrings** of `s` that are palindromes. A substring is a contiguous sequence of characters. Single characters count as palindromes.

## Examples

### Example 1
```
Input:  s = "abc"
Output: 3
```
Three palindromes: "a", "b", "c".

### Example 2
```
Input:  s = "aaa"
Output: 6
```
Six palindromes: "a", "a", "a", "aa", "aa", "aaa".

## Constraints
- `1 <= s.length <= 1000`
- `s` consists of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — expand around center</summary>

For each possible center (there are `2n - 1` centers: one per character for odd-length, one per gap for even-length palindromes), expand outward as long as the characters match and count palindromes found.
</details>

<details>
<summary>Hint 2 — the expansion loop</summary>

Write a helper `countFromCenter(left, right)`:
```js
let count = 0;
while (left >= 0 && right < s.length && s[left] === s[right]) {
  count++;
  left--;
  right++;
}
return count;
```

Call it for each `i` with `(i, i)` (odd-length) and `(i, i+1)` (even-length).
</details>

<details>
<summary>Hint 3 — 2D DP alternative</summary>

`dp[i][j]` = `true` if `s[i..j]` is a palindrome. Base cases: `dp[i][i] = true`. Fill by increasing length: a substring is a palindrome if its two endpoints match AND the inside is a palindrome. This is O(n²) time and space, compared to O(1) space for the expand approach.
</details>

## Write your solution
→ [`../solutions/24-palindromic-substrings.js`](../solutions/24-palindromic-substrings.js)

## Follow-ups
- **Longest Palindromic Substring** — find the actual longest palindromic substring.
- **Longest Palindromic Subsequence** (Q25) — a stricter version that relaxes contiguity.
