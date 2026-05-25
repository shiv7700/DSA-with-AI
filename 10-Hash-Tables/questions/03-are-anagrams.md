# Q3 — Are Two Strings Anagrams?

**Difficulty:** Easy
**Pattern:** Frequency map comparison
**Expected:** O(n) time · O(k) space

## Problem

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An **anagram** is a word or phrase formed by rearranging the letters of another — using all the original letters exactly once. Case matters: `'Listen'` and `'silent'` are **not** anagrams under this definition (different cases). Spaces and punctuation count as characters.

## Examples

### Example 1
```
Input:  s = "anagram", t = "nagaram"
Output: true
```

### Example 2
```
Input:  s = "rat", t = "car"
Output: false
```

### Example 3 (different lengths)
```
Input:  s = "ab", t = "a"
Output: false
```

### Example 4
```
Input:  s = "aab", t = "baa"
Output: true
```

## Constraints
- `1 <= s.length, t.length <= 5 * 10^4`
- `s` and `t` consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — the fast check</summary>

If `s.length !== t.length`, return `false` immediately. Anagrams must use every letter exactly once, so their lengths must match.
</details>

<details>
<summary>Hint 2 — the frequency approach</summary>

Build a frequency map for `s`. Then walk through `t`, decrementing each character's count. If at any point a count goes below 0 (the character appeared more in `t` than in `s`), return `false`. If you finish without issue, return `true`.

Alternatively: build frequency maps for both strings and compare them entry by entry.
</details>

<details>
<summary>Hint 3 — one-map approach (more efficient)</summary>

```js
function areAnagrams(s, t) {
  if (s.length !== t.length) return false;
  const freq = new Map();
  for (const c of s) freq.set(c, (freq.get(c) ?? 0) + 1);
  for (const c of t) {
    if (!freq.has(c) || freq.get(c) === 0) return false;
    freq.set(c, freq.get(c) - 1);
  }
  return true;
}
```
</details>

## Write your solution
→ [`../solutions/03-are-anagrams.js`](../solutions/03-are-anagrams.js)

## Follow-ups
- What if inputs can contain Unicode (emoji, accented letters)? Does your approach still work?
- **Group Anagrams** (Q11) — group a list of strings where each group contains anagrams of each other.
- Write a version that ignores spaces and is case-insensitive.
