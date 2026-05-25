# Q13 — Longest Substring Without Repeating Characters

**Difficulty:** Medium (LeetCode 3)
**Pattern:** Variable-size sliding window + Set/Map
**Expected:** O(n) time · O(min(n, alphabet)) space

## Problem

Given a string `s`, find the length of the **longest substring** that contains no repeated characters.

A **substring** is a contiguous sequence of characters within the string.

> **Why this matters:** this is the entry-level variable-size window problem. It appears in virtually every collection of interview prep questions. The technique — expand until invalid, contract until valid again — is the foundation for all problems in Q14–Q28.

## Examples

### Example 1
```
Input:  s = "abcabcbb"
Output: 3
```
The longest substring without repeating characters is "abc" (length 3).

### Example 2
```
Input:  s = "bbbbb"
Output: 1
```
The longest such substring is "b" (length 1).

### Example 3
```
Input:  s = "pwwkew"
Output: 3
```
"wke" has length 3. Note that "pwke" is not a substring — it's a subsequence.

### Example 4 (edge cases)
```
Input:  s = ""       → 0
Input:  s = "a"      → 1
Input:  s = "au"     → 2
```

## Constraints
- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols, and spaces.

## Hints

<details>
<summary>Hint 1 — brute force</summary>

For every pair `(i, j)`, check if `s[i..j]` has all unique characters. O(n³) — works for tiny inputs only.
</details>

<details>
<summary>Hint 2 — variable window with a Set</summary>

Maintain a sliding window `[left..right]` and a Set of characters currently in the window.

- Move `right` forward and add `s[right]` to the Set.
- If `s[right]` is **already in the Set**, there's a duplicate. Remove `s[left]` from the Set and advance `left`. Repeat until the duplicate is gone.
- Update `maxLen = Math.max(maxLen, right - left + 1)`.

The window at all times contains only unique characters.
</details>

<details>
<summary>Hint 3 — faster with a Map</summary>

Instead of shrinking one step at a time, use a Map from character → last-seen index.

When `s[right]` is already in the Map and `map.get(s[right]) >= left` (i.e., it's inside the current window), jump `left` directly to `map.get(s[right]) + 1`.

This avoids the inner `while` loop entirely. Still O(n) overall, but with fewer steps in practice.
</details>

## Write your solution
→ [`../solutions/13-longest-substring-no-repeat.js`](../solutions/13-longest-substring-no-repeat.js)

## Follow-ups
- **Longest Substring with At Most K Distinct Characters** (Q14) — the natural extension.
- What if the input is an array of integers instead of a string? Does the algorithm change?
- What if you need to return the actual substring, not just its length?
