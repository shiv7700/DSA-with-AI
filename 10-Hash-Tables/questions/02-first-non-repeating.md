# Q2 — First Non-Repeating Character

**Difficulty:** Easy
**Pattern:** Frequency map, then linear scan
**Expected:** O(n) time · O(k) space

## Problem

Given a string `s`, return the **first character** that appears exactly once. If every character repeats (or the string is empty), return `null`.

## Examples

### Example 1
```
Input:  "leetcode"
Output: "l"
```
`'l'` appears once. `'e'` appears twice.

### Example 2
```
Input:  "aabb"
Output: null
```
Every character repeats.

### Example 3
```
Input:  "loveleetcode"
Output: "v"
```
`'l'`, `'o'`, `'e'` all repeat. `'v'` appears exactly once.

### Example 4
```
Input:  "z"
Output: "z"
```
Single character — trivially unique.

## Constraints
- `0 <= s.length <= 10^5`
- `s` consists of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — two passes</summary>

This is a classic two-pass problem:
- **Pass 1:** build a frequency map (character → count).
- **Pass 2:** walk the string again from the left; return the first character whose count is exactly 1.

Why two passes? You need to know the *total* count of each character before you can identify which ones are unique. You can't know `'l'` is unique after only seeing the first character.
</details>

<details>
<summary>Hint 2 — code skeleton</summary>

```js
function firstNonRepeating(s) {
  const freq = new Map();
  for (const c of s) freq.set(c, (freq.get(c) ?? 0) + 1);

  for (const c of s) {
    if (freq.get(c) === 1) return c;
  }
  return null;
}
```
</details>

## Write your solution
→ [`../solutions/02-first-non-repeating.js`](../solutions/02-first-non-repeating.js)

## Follow-ups
- Return the **index** of the first non-repeating character (not the character itself).
- Find the first character that appears exactly **twice**.
- What if the string could contain Unicode characters? Does your solution still work?
