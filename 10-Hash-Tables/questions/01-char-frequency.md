# Q1 — Character Frequency Count

**Difficulty:** Easy
**Pattern:** Frequency map
**Expected:** O(n) time · O(k) space (where k = number of distinct characters)

## Problem

Given a string `s`, return a `Map` (or plain object) that maps each character to the number of times it appears in `s`.

The result should include every character — letters, digits, spaces, punctuation — exactly as they appear. Case matters: `'A'` and `'a'` are different characters.

## Examples

### Example 1
```
Input:  "hello"
Output: Map { 'h' → 1, 'e' → 1, 'l' → 2, 'o' → 1 }
```

### Example 2
```
Input:  "aabbcc"
Output: Map { 'a' → 2, 'b' → 2, 'c' → 2 }
```

### Example 3 (spaces and mixed case)
```
Input:  "Go go Go"
Output: Map { 'G' → 2, 'o' → 2, ' ' → 2, 'g' → 1 }
```

### Example 4 (empty string)
```
Input:  ""
Output: Map {}
```

## Constraints
- `0 <= s.length <= 10^5`
- `s` consists of printable ASCII characters.

## Hints

<details>
<summary>Hint 1 — start small</summary>

Walk through the string character by character with a `for...of` loop. For each character, you want to either create a new entry or add 1 to an existing one.
</details>

<details>
<summary>Hint 2 — the pattern</summary>

The standard frequency-counting snippet with `Map`:

```js
const freq = new Map();
for (const char of s) {
  freq.set(char, (freq.get(char) ?? 0) + 1);
}
```

`freq.get(char) ?? 0` returns the current count, or `0` if the char hasn't been seen yet. Then we store that count + 1.
</details>

## Write your solution
→ [`../solutions/01-char-frequency.js`](../solutions/01-char-frequency.js)

## Follow-ups
- Find the most frequent character in the string.
- Return only characters that appear more than once.
- How would you count word frequency instead of character frequency?
