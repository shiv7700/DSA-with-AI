# Q23 — Find All Anagrams in a String

**Difficulty:** Medium
**Pattern:** Sliding window + frequency map comparison
**Expected:** O(n) time · O(k) space (k = size of character set)

## Problem

Given two strings `s` and `p`, return an array of all the **start indices** of `p`'s anagrams in `s`. You may return the answer in any order.

An anagram is any permutation of the characters.

## Examples

### Example 1
```
Input:  s = "cbaebabacd",  p = "abc"
Output: [0, 6]
```
- Index 0: `"cba"` — anagram of `"abc"` ✓
- Index 6: `"bac"` — anagram of `"abc"` ✓

### Example 2
```
Input:  s = "abab",  p = "ab"
Output: [0, 1, 2]
```
- `"ab"` at 0, `"ba"` at 1, `"ab"` at 2.

### Example 3
```
Input:  s = "aa",  p = "bb"
Output: []
```

## Constraints
- `1 <= s.length, p.length <= 3 * 10^4`
- `s` and `p` consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — brute force</summary>

For each window of length `p.length` in `s`, check if it's an anagram of `p`. Each check is O(k), total O(n · k). Acceptable for small k, but there's a cleaner O(n) approach.
</details>

<details>
<summary>Hint 2 — sliding window with frequency maps</summary>

Build a frequency map for `p`. Keep a second frequency map for the current window in `s`. Slide the window right one character at a time: add the new character, remove the character that fell out. When the two maps are equal, record the start index.

Comparing two maps of size ≤ 26 is O(1) (bounded by alphabet size), so the total time is O(n).
</details>

<details>
<summary>Hint 3 — tracking "matches" count instead of full comparison</summary>

Instead of comparing maps directly, maintain a `matches` counter — the number of characters where both maps agree. When `matches === p.length` unique characters, it's an anagram window. Update `matches` on each slide.
</details>

## Write your solution
→ [`../solutions/23-find-all-anagrams.js`](../solutions/23-find-all-anagrams.js)

## Follow-ups
- **Permutation in String** (Q24) — same problem, but just return `true`/`false` rather than all indices.
- **Minimum Window Substring** (Q33) — harder: find the smallest window in `s` that contains all characters of `p` (not necessarily a permutation).
