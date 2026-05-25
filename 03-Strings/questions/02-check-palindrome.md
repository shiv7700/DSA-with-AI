# Q2 — Check if a String is a Palindrome

**Difficulty:** Easy
**Pattern:** Two Pointers (opposite ends)
**Expected:** O(n) time · O(1) space (O(n) if you clean the string first)

## Problem

Given a string `s`, return `true` if it is a palindrome, and `false` otherwise.

A **palindrome** reads the same forwards and backwards. For this problem:
- Convert all uppercase letters to lowercase.
- Ignore every character that is **not** alphanumeric (not a letter or digit). Spaces, punctuation, and special characters are skipped.

> **Why the cleaning step?** Real-world palindrome problems almost always include this requirement. "A man, a plan, a canal: Panama" is a classic English palindrome, but only if you strip the spaces and punctuation and ignore case.

## Examples

### Example 1
```
Input:  'racecar'
Output: true
```

### Example 2
```
Input:  'A man, a plan, a canal: Panama'
Output: true
```
After cleaning: `'amanaplanacanalpanama'` — reads the same forwards and backwards.

### Example 3
```
Input:  'hello'
Output: false
```

### Example 4 (edge cases)
```
Input:  ''        →  true   (empty string is considered a palindrome)
Input:  ' '       →  true   (only spaces → after cleaning, empty)
Input:  'a'       →  true
Input:  'Aa'      →  true   (case-insensitive: 'a' === 'a')
```

## Constraints
- `1 <= s.length <= 2 * 10^5`
- `s` consists of printable ASCII characters.

## Hints

<details>
<summary>Hint 1 — clean first, then check</summary>

The simplest approach: clean the string first, then apply two pointers.

```js
const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
```

The regex `/[^a-z0-9]/g` means: "replace any character that is NOT a lowercase letter or digit, globally (all occurrences)."

Then apply the standard palindrome check on `cleaned`.
</details>

<details>
<summary>Hint 2 — two-pointer palindrome check</summary>

Start with `left = 0` and `right = cleaned.length - 1`. While `left < right`:
- If `cleaned[left] !== cleaned[right]` → return `false`.
- Otherwise, move both pointers inward: `left++`, `right--`.

If the loop finishes without finding a mismatch, return `true`.

This is O(n) time and O(1) space (after the initial cleaning step, which takes O(n) space).
</details>

<details>
<summary>Hint 3 — skipping while you check (O(1) extra space)</summary>

To avoid the cleaning step entirely (no new string), keep two pointers on the original string and skip non-alphanumeric characters as you go:

```js
function isAlphanumeric(c) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9');
}

let left = 0, right = s.length - 1;
while (left < right) {
  while (left < right && !isAlphanumeric(s[left])) left++;
  while (left < right && !isAlphanumeric(s[right])) right--;
  if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
  left++; right--;
}
return true;
```

This uses O(1) extra space — it never creates a new string.
</details>

## Write your solution
→ [`../solutions/02-check-palindrome.js`](../solutions/02-check-palindrome.js)

## Follow-ups
- **Valid Palindrome II** — you're allowed to delete at most one character. Is the result still a palindrome?
- Check if a number (passed as an integer) is a palindrome without converting it to a string.
- Find **all palindromic substrings** of a given string (see Q13).
- What if the string can contain Unicode characters and emoji? Does your solution still work?
