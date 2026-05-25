# Q7 — Title Case

**Difficulty:** Easy
**Pattern:** String transformation · split/map/join
**Expected:** O(n) time · O(n) space

## Problem

Given a string `s` representing a sentence, return the **title-case** version: capitalize the first letter of every word and make the rest of the letters lowercase.

A "word" is a sequence of characters separated by one or more spaces.

## Examples

### Example 1
```
Input:  'the quick brown fox'
Output: 'The Quick Brown Fox'
```

### Example 2
```
Input:  'hello WORLD'
Output: 'Hello World'
```

### Example 3
```
Input:  'i love javascript'
Output: 'I Love Javascript'
```

### Example 4 (edge cases)
```
Input:  ''           →  ''
Input:  'already'    →  'Already'
Input:  '  hello  '  →  '  Hello  '  (preserve leading/trailing spaces)
```

## Constraints
- `0 <= s.length <= 10^4`
- `s` consists of printable ASCII characters.
- Multiple consecutive spaces between words are possible.

## Hints

<details>
<summary>Hint 1 — split into words, transform each, rejoin</summary>

The `split → map → join` pattern is perfect here:

1. Split the sentence into words: `s.split(' ')`
2. Capitalize each word.
3. Rejoin with spaces: `.join(' ')`

Note: using `split(' ')` (single space) preserves multiple spaces and empty strings between them. If you want to collapse multiple spaces, use `split(/\s+/)` and `filter(Boolean)` to remove empty strings.
</details>

<details>
<summary>Hint 2 — capitalizing a single word</summary>

To capitalize the first letter and lowercase the rest of a word `w`:

```js
function capitalizeWord(w) {
  if (w.length === 0) return w;
  return w[0].toUpperCase() + w.slice(1).toLowerCase();
}
```

`w[0].toUpperCase()` gets the first character uppercased.
`w.slice(1)` gets everything from index 1 onwards.
`.toLowerCase()` lowercases the rest (so `'HELLO'` → `'Hello'`).
</details>

<details>
<summary>Hint 3 — one-liner with map</summary>

```js
return s.split(' ').map(word =>
  word.length === 0 ? word : word[0].toUpperCase() + word.slice(1).toLowerCase()
).join(' ');
```

The `word.length === 0 ? word : ...` guard handles the empty-string entries that appear when there are consecutive spaces.
</details>

## Write your solution
→ [`../solutions/07-title-case.js`](../solutions/07-title-case.js)

## Follow-ups
- Implement a version that **does not** capitalize common "little words" like `'a'`, `'an'`, `'the'`, `'and'`, `'but'`, `'or'` unless they are the first word.
- What does JavaScript's built-in `Intl.Collator` or `toLocaleUpperCase()` give you that `toUpperCase()` doesn't? (Hint: locale-aware capitalization — useful for languages like Turkish where `'i'.toUpperCase()` should be `'İ'`.)
- Reverse the title-case: given `'The Quick Brown Fox'`, return `'tHE qUICK bROWN fOX'` (swap each character's case).
- Implement the transformation without using `split` — walk through the string with a flag that tracks whether the next character should be capitalized.
