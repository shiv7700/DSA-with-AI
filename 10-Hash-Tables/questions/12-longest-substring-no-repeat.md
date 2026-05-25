# Q12 — Longest Substring Without Repeating Characters

**Difficulty:** Medium
**Pattern:** Sliding window + Set
**Expected:** O(n) time · O(k) space (k = size of character set)

## Problem

Given a string `s`, find the length of the **longest substring** that contains no repeating characters.

A **substring** is a contiguous sequence of characters within a string (unlike a subsequence, which can skip characters).

## Examples

### Example 1
```
Input:  "abcabcbb"
Output: 3
```
The longest substring without repeating characters is `"abc"`, length 3.

### Example 2
```
Input:  "bbbbb"
Output: 1
```
All characters are the same; the longest is `"b"`, length 1.

### Example 3
```
Input:  "pwwkew"
Output: 3
```
`"wke"` has length 3. Note that `"pwke"` is a subsequence, not a substring.

### Example 4
```
Input:  ""
Output: 0
```

## Constraints
- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols, and spaces.

## Hints

<details>
<summary>Hint 1 — brute force</summary>

Check every possible substring — start at each index and extend as long as you see no repeat. O(n²) or O(n³) depending on implementation. Too slow.
</details>

<details>
<summary>Hint 2 — sliding window with a Set</summary>

Maintain a window `[left, right]` and a `Set` of characters currently in the window.

Expand the window by moving `right` one step at a time. If `s[right]` is already in the set (a repeat), shrink from the left — remove `s[left]` from the set, advance `left` — until the repeat is gone. Then add `s[right]` and update the max length.

```
Window state while processing "abcabcbb":

  "a b c a b c b b"
   ↑ ↑         right expands → set = {a,b,c}
   ↑   ↑       right = 'a' (in set!) → shrink left
     ↑   ↑     right expands again → set = {b,c,a}
```
</details>

<details>
<summary>Hint 3 — optimized version with Map (skip ahead)</summary>

Instead of a `Set` and advancing `left` one step at a time, use a `Map` from character → last seen index. When you see a character that's already in the map, jump `left` directly to `map.get(char) + 1`. This avoids the inner while loop.
</details>

## Write your solution
→ [`../solutions/12-longest-substring-no-repeat.js`](../solutions/12-longest-substring-no-repeat.js)

## Follow-ups
- **Longest Substring with At Most K Distinct Characters** (Q34) — a harder generalization.
- **Longest Substring with At Most Two Distinct Characters** — the same idea, k = 2.
