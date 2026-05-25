# Q8 — Case Conversion (camelCase / snake_case / kebab-case)

**Difficulty:** Easy
**Pattern:** String transformation · split/map/join
**Expected:** O(n) time · O(n) space

## Problem

Implement three functions that convert a "normal English phrase" (words separated by spaces) into different casing conventions used in programming:

1. **`toCamelCase(s)`** — first word lowercase, subsequent words capitalized, no separators.
   - `'hello world'` → `'helloWorld'`
2. **`toSnakeCase(s)`** — all lowercase, words separated by underscores.
   - `'hello world'` → `'hello_world'`
3. **`toKebabCase(s)`** — all lowercase, words separated by hyphens.
   - `'hello world'` → `'hello-world'`

> **Why these three?** These are the three most common identifier conventions across programming languages. JavaScript uses camelCase for variables, Python uses snake_case, HTML attributes use kebab-case. Knowing how to convert between them comes up in real codebases.

## Examples

### camelCase
```
Input:  'get user profile'
Output: 'getUserProfile'
```

### snake_case
```
Input:  'get user profile'
Output: 'get_user_profile'
```

### kebab-case
```
Input:  'get user profile'
Output: 'get-user-profile'
```

### Edge cases
```
Input:  'hello'      →  camel: 'hello',   snake: 'hello',   kebab: 'hello'
Input:  ''           →  camel: '',         snake: '',         kebab: ''
Input:  'hello   world'  →  handle multiple spaces
```

## Constraints
- `0 <= s.length <= 1000`
- `s` consists of lowercase English letters and spaces only.
- Words are separated by one or more spaces.

## Hints

<details>
<summary>Hint 1 — split into words, filter empty strings</summary>

`s.split(' ')` can produce empty strings for consecutive spaces. Filter them out:

```js
const words = s.split(' ').filter(w => w.length > 0);
```

Or use `s.split(/\s+/).filter(Boolean)` which splits on any whitespace.
</details>

<details>
<summary>Hint 2 — camelCase logic</summary>

- Keep the first word all lowercase.
- For every subsequent word, uppercase the first letter, keep the rest as-is.
- Join with no separator.

```js
function toCamelCase(s) {
  const words = s.split(/\s+/).filter(Boolean);
  return words.map((word, i) =>
    i === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1).toLowerCase()
  ).join('');
}
```
</details>

<details>
<summary>Hint 3 — snake and kebab are simpler</summary>

Both snake_case and kebab-case follow the same pattern: lowercase all characters, join with a specific separator.

```js
function toSnakeCase(s) {
  return s.split(/\s+/).filter(Boolean).map(w => w.toLowerCase()).join('_');
}

function toKebabCase(s) {
  return s.split(/\s+/).filter(Boolean).map(w => w.toLowerCase()).join('-');
}
```
</details>

## Write your solution
→ [`../solutions/08-case-conversion.js`](../solutions/08-case-conversion.js)

## Follow-ups
- Add a **PascalCase** converter: `'hello world'` → `'HelloWorld'` (like camelCase but the first word is also capitalized).
- Add a **SCREAMING_SNAKE_CASE** converter: `'hello world'` → `'HELLO_WORLD'`.
- Write a function that **detects** which case convention a string is already in.
- Write a general `convertCase(s, fromConvention, toConvention)` function that can convert between any two of the four conventions.
