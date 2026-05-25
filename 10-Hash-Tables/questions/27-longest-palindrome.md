# Q27 — Longest Palindrome

**Difficulty:** Medium
**Pattern:** Frequency map → parity analysis
**Expected:** O(n) time · O(k) space

## Problem

Given a string `s` of characters, return the length of the **longest palindrome** that can be built using those characters.

Letters are case sensitive: `'A'` and `'a'` are different.

You do not need to return the actual palindrome — just the maximum length.

## Examples

### Example 1
```
Input:  "abccccdd"
Output: 7
```
One possible longest palindrome: `"dccaccd"` (length 7). We used all four `'c'`s, two `'d'`s, and one `'a'` in the center.

### Example 2
```
Input:  "a"
Output: 1
```

### Example 3
```
Input:  "bb"
Output: 2
```

### Example 4
```
Input:  "Aa"
Output: 1
```
`'A'` and `'a'` are different — no pair to use together.

## Constraints
- `1 <= s.length <= 2000`
- `s` consists of uppercase and/or lowercase English letters.

## Hints

<details>
<summary>Hint 1 — think about even and odd frequencies</summary>

In a palindrome:
- Any character that appears an **even** number of times can be fully used (placed symmetrically on both sides).
- Any character that appears an **odd** number of times can use `count - 1` letters in pairs, plus contribute **one** center character.

At most one character can be in the center (a palindrome has at most one middle).
</details>

<details>
<summary>Hint 2 — the formula</summary>

```
length = (sum of all even counts)
       + (sum of (count - 1) for each odd count)
       + (1 if any character has an odd count, for the center)
```

Or more simply: start with `0`. For each character:
- Add `Math.floor(count / 2) * 2`.
- Track whether any character has an odd count.

After the loop, if any odd-count character exists, add 1 for the center.
</details>

## Write your solution
→ [`../solutions/27-longest-palindrome.js`](../solutions/27-longest-palindrome.js)

## Follow-ups
- **Longest Palindromic Substring** — find the longest palindromic *substring* (not constructed but actually present). That's a harder problem using dynamic programming or Manacher's algorithm.
