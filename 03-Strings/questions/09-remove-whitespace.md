# Q9 — Remove All Whitespace from a String

**Difficulty:** Easy
**Pattern:** String transformation · filter
**Expected:** O(n) time · O(n) space

## Problem

Given a string `s`, return a new string with **all whitespace characters removed**. Whitespace includes spaces (`' '`), tabs (`'\t'`), and newlines (`'\n'`).

Implement it **two ways**:
1. Using a built-in method.
2. Using a loop (without `replace` or `replaceAll`).

## Examples

### Example 1
```
Input:  'hello world'
Output: 'helloworld'
```

### Example 2
```
Input:  '  hello\tworld\n'
Output: 'helloworld'
```

### Example 3
```
Input:  'no spaces here'
Output: 'nospacehere'
```

Wait — that's wrong. Let's re-check:
```
Input:  'no spaces here'
Output: 'nospaceshere'
```

### Example 4 (edge cases)
```
Input:  '   '    →  ''   (only spaces)
Input:  ''       →  ''
Input:  'abc'    →  'abc'
```

## Constraints
- `0 <= s.length <= 10^5`
- `s` can contain any printable ASCII characters including whitespace.

## Hints

<details>
<summary>Hint 1 — built-in approach using replace</summary>

A single `replace` call with a regex that matches **all** whitespace characters (`\s`) globally (`g` flag):

```js
return s.replace(/\s/g, '');
```

`\s` in a regex matches space, tab, newline, carriage return, form feed, and vertical tab. The `g` flag means "replace all occurrences, not just the first."
</details>

<details>
<summary>Hint 2 — loop approach using split + filter</summary>

Split into characters, filter out whitespace, join back:

```js
return s.split('').filter(c => c !== ' ' && c !== '\t' && c !== '\n').join('');
```

Or using a regex test per character:

```js
return s.split('').filter(c => !/\s/.test(c)).join('');
```
</details>

<details>
<summary>Hint 3 — explicit loop approach</summary>

Collect non-whitespace characters into an array, then join:

```js
const parts = [];
for (const char of s) {
  if (char !== ' ' && char !== '\t' && char !== '\n') {
    parts.push(char);
  }
}
return parts.join('');
```

This is the most explicit — useful as a template when you need more complex filtering logic.
</details>

## Write your solution
→ [`../solutions/09-remove-whitespace.js`](../solutions/09-remove-whitespace.js)

## Follow-ups
- Remove only **leading and trailing** whitespace (JavaScript's built-in `.trim()` does this — try implementing it yourself).
- Remove only **duplicate** spaces: `'hello   world'` → `'hello world'` (collapse multiple spaces into one).
- Remove whitespace but **preserve** single spaces between words: `'hello   world  foo'` → `'hello world foo'`.
- What is the most memory-efficient way to do this if the string is very long (hundreds of megabytes)?
