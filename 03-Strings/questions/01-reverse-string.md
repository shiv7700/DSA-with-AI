# Q1 — Reverse a String

**Difficulty:** Easy
**Pattern:** Two Pointers (opposite ends) · split/reverse/join
**Expected:** O(n) time · O(n) space

## Problem

You are given a string `s`. Return a new string that is the reverse of `s` — the first character becomes the last, the second becomes the second-to-last, and so on.

Implement the same problem **three ways**:

1. **Built-in**: use JavaScript's built-in array methods (`split`, `reverse`, `join`).
2. **Loop**: use a `for` loop and build the result character by character.
3. **Recursion**: define a function that calls itself with a smaller version of the input.

> **Why three ways?** Each approach teaches a different idea: the built-in version shows you the `split → work → join` idiom. The loop version builds your indexing intuition. The recursive version is slower but makes you think about problem decomposition — a skill you'll need for harder problems.

## Examples

### Example 1
```
Input:  'hello'
Output: 'olleh'
```

### Example 2
```
Input:  'racecar'
Output: 'racecar'
```
(A palindrome reversed is itself.)

### Example 3
```
Input:  'Hello, World!'
Output: '!dlroW ,olleH'
```

### Example 4 (edge cases)
```
Input:  ''   →  ''
Input:  'a'  →  'a'
```

## Constraints
- `0 <= s.length <= 10^5`
- `s` consists of printable ASCII characters.
- Each of the three implementations should return a **new** string — do not modify the input.

## Hints

<details>
<summary>Hint 1 — built-in version</summary>

You can't call `.reverse()` directly on a string — strings are immutable and have no `.reverse()` method. But arrays do. So the trick is:

1. Turn the string into an array of characters: `s.split('')`
2. Reverse the array: `.reverse()`
3. Join it back: `.join('')`

All three steps chain together in one expression.
</details>

<details>
<summary>Hint 2 — loop version</summary>

Walk through the original string from the **end to the start** and collect each character:

```js
let result = '';
for (let i = s.length - 1; i >= 0; i--) {
  result += s[i];
}
```

Or build an array and join:

```js
const parts = [];
for (let i = s.length - 1; i >= 0; i--) {
  parts.push(s[i]);
}
return parts.join('');
```

Both are O(n). The second avoids repeated string concatenation (though modern JS engines may optimize the first for small strings).
</details>

<details>
<summary>Hint 3 — recursive version</summary>

The recursive idea: the reverse of a string is the **last character** plus the reverse of everything except the last character.

```
reverse('hello') = 'o' + reverse('hell')
reverse('hell')  = 'l' + reverse('hel')
...
reverse('h')     = 'h'   ← base case
```

Base case: if the string has 0 or 1 characters, return it as-is.
Recursive case: `return s[s.length - 1] + reverse(s.slice(0, s.length - 1))`.

Note: this uses O(n) space on the call stack (n recursive calls deep).
</details>

<details>
<summary>Hint 4 — Unicode note</summary>

`s.split('')` breaks emoji into two half-characters (surrogate pairs). For ASCII input this is fine. If you want a Unicode-safe version, use `[...s].reverse().join('')` — the spread operator respects emoji as single units.
</details>

## Write your solution
→ [`../solutions/01-reverse-string.js`](../solutions/01-reverse-string.js)

## Follow-ups
- Reverse only the words in a sentence, keeping the word order: `'the sky is blue'` → `'eht yks si eulb'`.
- Reverse the **order of words** in a sentence, not the characters: `'hello world'` → `'world hello'`.
- Reverse a string in place (hint: strings are immutable, so you'll need to convert to an array first — Q1 in the Arrays chapter does this for arrays).
- Handle the Unicode case: reverse `'hi 👋'` correctly.
