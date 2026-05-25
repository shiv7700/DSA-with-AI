# Q4 — First Non-Repeating Character

**Difficulty:** Easy
**Pattern:** Frequency map · Two-pass linear scan
**Expected:** O(n) time · O(k) space (k = alphabet size, at most 26 or 128)

## Problem

Given a string `s` of lowercase English letters, find the **first character that appears exactly once** in the string. Return the character itself. If no such character exists, return `null`.

> **Why this matters:** this is one of the most common frequency-map problems. Once you solve it, you have the pattern for dozens of variations: first unique word, first non-repeating element in a stream, etc.

## Examples

### Example 1
```
Input:  'loveleetcode'
Output: 'v'
```
Frequencies: l=2, o=3, v=1, e=4, t=1, c=1, d=1. The first character whose frequency is 1 is `'v'` (at index 2).

### Example 2
```
Input:  'aabb'
Output: null
```
Every character repeats.

### Example 3
```
Input:  'ddbbc'
Output: 'c'
```

### Example 4 (edge cases)
```
Input:  'a'   →  'a'
Input:  ''    →  null
```

## Constraints
- `0 <= s.length <= 10^5`
- `s` consists of lowercase English letters only.

## Hints

<details>
<summary>Hint 1 — build a frequency map first</summary>

A frequency map counts how many times each character appears:

```js
const freq = {};
for (const char of s) {
  freq[char] = (freq[char] ?? 0) + 1;
}
```

After this, `freq['a']` tells you how many times `'a'` appears.
</details>

<details>
<summary>Hint 2 — two passes</summary>

Now make a **second pass** through the string. The first time you encounter a character with `freq[char] === 1`, return it. The order of this second pass matches the order they appear in the original string, so the first one you find is the first non-repeating character.

Why two passes? You need to see the whole string before you know any character's final count.
</details>

<details>
<summary>Hint 3 — a one-pass approach using insertion-order Maps</summary>

You can also use a `Map` which preserves insertion order:

1. First pass: build `freq` Map.
2. Then iterate over the Map entries — since Map preserves insertion order, the first entry with value 1 is your answer.

But wait: the Map is keyed by character, not by position. The first entry with value 1 is the first **character to appear** (not necessarily the first occurrence position) that has count 1. For this problem that's equivalent, but think about whether that's always true.
</details>

## Write your solution
→ [`../solutions/04-first-non-repeating-char.js`](../solutions/04-first-non-repeating-char.js)

## Follow-ups
- Return the **index** of the first non-repeating character rather than the character itself.
- Find the **last** non-repeating character.
- What if the string could also contain uppercase letters, digits, and spaces? Adjust your solution.
- **Streaming version**: characters arrive one at a time. After each character is added, return the current first non-repeating character. (Hint: a queue + frequency map works well.)
