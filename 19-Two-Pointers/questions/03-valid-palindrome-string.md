# Q3 — Valid Palindrome (String, Skip Non-Alphanumeric)

**Difficulty:** Easy
**Pattern:** Two Pointers (opposite ends)
**Expected:** O(n) time · O(1) space

## Problem

A phrase is a valid palindrome if, after converting all uppercase letters to lowercase and **removing all non-alphanumeric characters**, it reads the same forward and backward.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

> Alphanumeric means letters (a–z, A–Z) and digits (0–9). Spaces, punctuation, and symbols are ignored.

## Examples

### Example 1
```
Input:  "A man, a plan, a canal: Panama"
Output: true
```
After cleaning: "amanaplanacanalpanama" — reads the same forwards and backwards.

### Example 2
```
Input:  "race a car"
Output: false
```
After cleaning: "raceacar" — not a palindrome.

### Example 3
```
Input:  " "
Output: true
```
After cleaning: "" (empty string). An empty string is considered a palindrome.

### Example 4
```
Input:  "0P"
Output: false
```
After cleaning: "0p". Not a palindrome.

## Constraints
- `1 <= s.length <= 2 * 10^5`
- `s` consists only of printable ASCII characters.

## Hints

<details>
<summary>Hint 1 — naive approach</summary>

Create a cleaned version of the string (lowercase, alphanumeric only), then check if it equals its reverse. This is O(n) time but also O(n) space (for the cleaned copy).
</details>

<details>
<summary>Hint 2 — O(1) space with two pointers</summary>

Use two pointers, `left` and `right`, on the **original** string. When you're about to compare characters:
- Skip `left` forward while it points to a non-alphanumeric character.
- Skip `right` backward while it points to a non-alphanumeric character.
- Now compare the two characters (case-insensitively).
- If they match, move both inward. If not, return `false`.
</details>

<details>
<summary>Hint 3 — checking alphanumeric in JavaScript</summary>

A quick way is a regex test:
```js
function isAlphaNum(c) {
  return /[a-zA-Z0-9]/.test(c);
}
```
Or use character codes: `c >= 'a' && c <= 'z'`, etc.
</details>

## Write your solution
→ [`../solutions/03-valid-palindrome-string.js`](../solutions/03-valid-palindrome-string.js)

## Follow-ups
- **Valid Palindrome II** — you're allowed to remove at most one character. Does it become a palindrome? (Hint: on mismatch, try skipping `left` or skipping `right` — check if either sub-string is a palindrome.)
- Cross-reference: [Q2 — Is Array a Palindrome](./02-is-palindrome-array.md) · [03 — Strings](../../03-Strings/)
