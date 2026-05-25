# Q8 — Find All Anagrams in a String

**Difficulty:** Medium (LeetCode 438)
**Pattern:** Fixed-size sliding window + frequency map
**Expected:** O(n) time · O(1) space (alphabet is fixed size)

## Problem

Given two strings `s` and `p`, return a list of all **starting indexes** in `s` where an anagram of `p` begins. Return the indices in any order.

An anagram is a rearrangement using exactly the same characters and frequencies.

## Examples

### Example 1
```
Input:  s = "cbaebabacd",  p = "abc"
Output: [0, 6]
```
- s[0..2] = "cba" — anagram of "abc" ✓
- s[6..8] = "bac" — anagram of "abc" ✓

### Example 2
```
Input:  s = "abab",  p = "ab"
Output: [0, 1, 2]
```
- s[0..1] = "ab" ✓
- s[1..2] = "ba" ✓
- s[2..3] = "ab" ✓

### Example 3
```
Input:  s = "aaaaaaaaaa",  p = "a"
Output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Constraints
- `1 <= p.length <= s.length <= 3 * 10^4`
- `s` and `p` consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — identical approach to Q7</summary>

The only difference from Q7 (Count Occurrences of Anagrams) is that you collect **starting indexes** instead of incrementing a counter. When `matched === distinct chars in p`, push `right - p.length + 1` to the result.
</details>

<details>
<summary>Hint 2 — two-array approach (simpler)</summary>

Build a `need` array of size 26 (one entry per lowercase letter) from `p`. Build a `window` array of size 26 from the current window in `s`. When both arrays are equal, the window is an anagram.

This avoids `matched` bookkeeping, at the cost of an O(26) comparison per step — still O(n) overall since 26 is constant.
</details>

<details>
<summary>Hint 3 — starting index formula</summary>

When your window covers indexes `[left..right]` and `right = left + p.length - 1`, then `left = right - p.length + 1`. Record `left` (or equivalently `right - p.length + 1`) as the starting index.
</details>

## Write your solution
→ [`../solutions/08-find-all-anagrams.js`](../solutions/08-find-all-anagrams.js)

## Follow-ups
- **Permutation in String** (Q9) — just return `true`/`false` instead of a list.
- What if the alphabet could be Unicode characters (not just lowercase letters)? How does that change the space complexity?
