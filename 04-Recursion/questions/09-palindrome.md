# Q9 — Palindrome Check (Recursively)

**Difficulty:** Easy
**Pattern:** Linear recursion — check outer pair, recurse on inner substring
**Expected:** O(n) time · O(n) space (due to string slicing)

## Problem

Write a recursive function `isPalindrome(s)` that returns `true` if the string `s` is a palindrome, and `false` otherwise.

A string is a palindrome if it reads the same forwards and backwards.

Rules:
- Use recursion — no loops, no built-in reverse.
- You may compare characters directly with `===`.
- Treat the input as-is (don't convert case or strip punctuation, unless you do a follow-up).

> **Why this problem?** It's the same "shrink from both ends" idea as the two-pointer array reversal, expressed recursively. It also shows that recursion naturally shrinks problems by stripping layers from both ends.

## Examples

### Example 1
```
Input:  "racecar"
Output: true
```

### Example 2
```
Input:  "hello"
Output: false
```

### Example 3 (edge cases)
```
Input:  ""     → true   (empty string is a palindrome)
Input:  "a"    → true   (single char is a palindrome)
```

### Example 4
```
Input:  "abcba"   → true
Input:  "abcb"    → false
```

## Constraints
- `0 <= s.length <= 1000`
- `s` contains only lowercase letters (for the basic version).
- Use recursion.

## Hints

<details>
<summary>Hint 1 — identify the base case(s)</summary>

There are two natural stopping points:

1. If the string has **0 or 1 characters**, it's always a palindrome. Return `true`.

That covers both the empty string and the single-character case.
</details>

<details>
<summary>Hint 2 — the recursive case: check the outer pair</summary>

A string is a palindrome if:
1. The first and last characters match, **AND**
2. The inner substring (everything except the first and last) is also a palindrome.

```js
if (s[0] !== s[s.length - 1]) return false;    // outer pair mismatch → not a palindrome
return isPalindrome(s.slice(1, -1));            // check the inner part
```

`s.slice(1, -1)` removes both the first and last character, giving you the inner substring.
</details>

<details>
<summary>Hint 3 — trace it for "racecar"</summary>

```
isPalindrome("racecar")
  'r' === 'r' ✅ → check "aceca"
  isPalindrome("aceca")
    'a' === 'a' ✅ → check "cec"
    isPalindrome("cec")
      'c' === 'c' ✅ → check "e"
      isPalindrome("e")
        length is 1 → return true  ← base case
      returns true
    returns true
  returns true
returns true
```

Trace "hello":
```
isPalindrome("hello")
  'h' !== 'o' ❌ → return false immediately
```
</details>

## Write your solution
→ [`../solutions/09-palindrome.js`](../solutions/09-palindrome.js)

## Follow-ups
- Write a version that ignores case and non-alphanumeric characters (the LeetCode "Valid Palindrome" version).
- Write the iterative two-pointer version. Is it faster? (Yes — O(n) time and O(1) space, no string slicing.)
- Is a number a palindrome? Write `isNumPalindrome(n)` that checks without converting to a string.
