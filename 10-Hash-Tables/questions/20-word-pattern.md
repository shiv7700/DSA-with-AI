# Q20 — Word Pattern

**Difficulty:** Medium
**Pattern:** Bidirectional map (same as isomorphic strings, but word-level)
**Expected:** O(n) time · O(n) space

## Problem

Given a pattern string `pattern` and a string `s`, return `true` if `s` **follows** the same pattern.

"Follows" means there is a **bijection** (one-to-one, two-way mapping) between each letter in `pattern` and each word in `s`.

## Examples

### Example 1
```
Input:  pattern = "abba",  s = "dog cat cat dog"
Output: true
```
`'a' ↔ "dog"`, `'b' ↔ "cat"`.

### Example 2
```
Input:  pattern = "abba",  s = "dog cat cat fish"
Output: false
```
`'a'` would need to map to both `"dog"` and `"fish"`.

### Example 3
```
Input:  pattern = "aaaa",  s = "dog cat cat dog"
Output: false
```
`'a'` maps to `"dog"`, but index 1 has `"cat"` — contradiction.

### Example 4
```
Input:  pattern = "abba",  s = "dog dog dog dog"
Output: false
```
`'a' → "dog"` and `'b' → "dog"` — two pattern characters mapping to the same word.

## Constraints
- `1 <= pattern.length <= 300`
- `pattern` contains only lowercase English letters.
- `1 <= s.length <= 3000`
- `s` contains only lowercase English letters and spaces, with no leading or trailing spaces, and all words separated by a single space.
- The number of words in `s` equals `pattern.length`.

## Hints

<details>
<summary>Hint 1 — split s into words first</summary>

Split `s` on spaces: `const words = s.split(' ')`. Now you have a `pattern` array of characters and a `words` array — they must have the same length and a bijective mapping.
</details>

<details>
<summary>Hint 2 — same logic as Q19</summary>

This is exactly Q19 (Isomorphic Strings), but now you're mapping between `pattern[i]` (a character) and `words[i]` (a string) instead of two characters. Use the same two-map bidirectional approach.
</details>

## Write your solution
→ [`../solutions/20-word-pattern.js`](../solutions/20-word-pattern.js)

## Follow-ups
- What if a word in `s` can match multiple letters in `pattern` as long as the pattern structure is preserved? (Harder variant.)
- **Word Pattern II** — the words in `s` aren't separated by spaces; you have to decide where the boundaries are.
