# Q3 — Count Vowels and Consonants

**Difficulty:** Easy
**Pattern:** Linear scan · Set lookup
**Expected:** O(n) time · O(1) space

## Problem

Given a string `s`, count the number of **vowels** and the number of **consonants** in it.

Rules:
- Vowels are: `a, e, i, o, u` (and their uppercase versions).
- Consonants are all other letters: `b, c, d, f, g, h, j, k, l, m, n, p, q, r, s, t, v, w, x, y, z` (and uppercase).
- Ignore any character that is not a letter (spaces, digits, punctuation, etc.).
- Return an object `{ vowels, consonants }` with the two counts.

## Examples

### Example 1
```
Input:  'Hello, World!'
Output: { vowels: 3, consonants: 7 }
```
Vowels: `e`, `o`, `o`. Consonants: `H`, `l`, `l`, `W`, `r`, `l`, `d`.

### Example 2
```
Input:  'aeiou'
Output: { vowels: 5, consonants: 0 }
```

### Example 3
```
Input:  'rhythm'
Output: { vowels: 0, consonants: 6 }
```

### Example 4 (edge cases)
```
Input:  '123 !@#'   →  { vowels: 0, consonants: 0 }
Input:  ''          →  { vowels: 0, consonants: 0 }
```

## Constraints
- `0 <= s.length <= 10^5`
- `s` can contain any printable ASCII characters.

## Hints

<details>
<summary>Hint 1 — use a Set for O(1) vowel lookup</summary>

Instead of checking `c === 'a' || c === 'e' || ...`, create a `Set` of vowels once and use `.has()`:

```js
const vowelSet = new Set('aeiouAEIOU');
```

`vowelSet.has(char)` is O(1) — much cleaner than a chain of `===` comparisons.
</details>

<details>
<summary>Hint 2 — check if a character is a letter</summary>

To check if `c` is an alphabetic character (ignoring case):

```js
function isLetter(c) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}
```

Or using a regex: `/[a-zA-Z]/.test(c)`.

Only count a character if it passes this check.
</details>

<details>
<summary>Hint 3 — putting it together</summary>

```
vowels = 0, consonants = 0
for each character c in s:
  if c is not a letter → skip
  else if c (lowercase) is in the vowel set → vowels++
  else → consonants++
return { vowels, consonants }
```
</details>

## Write your solution
→ [`../solutions/03-count-vowels-consonants.js`](../solutions/03-count-vowels-consonants.js)

## Follow-ups
- Count vowels only. What is the one-liner using `.split('')`, `.filter()`, and a Set?
- Given a paragraph (multiple sentences), return the sentence with the most vowels.
- Extend the function to return the count of **each** vowel individually: `{ a: 2, e: 1, i: 0, o: 3, u: 0 }`.
- Handle accented vowels like `é`, `ü`, `ñ` — are they vowels or consonants in your solution?
