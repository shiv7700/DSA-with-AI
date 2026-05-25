# Q4 — Palindrome Check Using a Stack

**Difficulty:** Easy
**Pattern:** Stack basics
**Expected:** O(n) time · O(n) space

## Problem

Given a string `s`, determine whether it is a **palindrome** — a word or phrase that reads the same forwards and backwards. Use a stack as part of your solution.

For this problem, consider only lowercase alphanumeric characters and ignore case and non-alphanumeric characters.

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

### Example 3 (spaces and punctuation ignored)
```
Input:  "A man a plan a canal Panama"
Output: true
```

### Example 4 (edge cases)
```
Input:  ""   → true
Input:  "a"  → true
```

## Constraints
- `0 <= s.length <= 10^5`
- Case-insensitive comparison.
- Ignore characters that are not letters or digits.

## Hints

<details>
<summary>Hint 1 — clean the string first</summary>

Before doing anything with a stack, simplify the string:
- Convert to lowercase.
- Keep only alphanumeric characters (filter out spaces, punctuation, etc.).

In JavaScript: `s.toLowerCase().replace(/[^a-z0-9]/g, '')`
</details>

<details>
<summary>Hint 2 — using a stack for the comparison</summary>

Push all characters of the cleaned string onto a stack. Then compare each character from the front of the cleaned string to what you pop off the stack (which gives characters in reverse order).

If every character matches its mirror, it's a palindrome.

Alternatively: push only the **first half** of the characters, then compare the popped characters against the **second half**. This uses half as much extra space.
</details>

<details>
<summary>Hint 3 — a simpler check (without a stack)</summary>

Once the string is cleaned, you can also just compare the cleaned string to its reverse directly:
```js
cleanedStr === cleanedStr.split('').reverse().join('')
```
This doesn't use a stack, but it reveals why the stack approach works: reversing with a stack and comparing to the original is conceptually the same as comparing to the reversed string.
</details>

## Write your solution
→ [`../solutions/04-palindrome-check.js`](../solutions/04-palindrome-check.js)

## Follow-ups
- Solve this using only two pointers (no extra space beyond a few variables).
- Check if any permutation of a string can form a palindrome. What condition on character frequencies does a palindrome require?
- Implement a palindrome check for a **linked list** using a stack.
