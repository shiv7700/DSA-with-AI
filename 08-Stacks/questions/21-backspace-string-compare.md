# Q21 — Backspace String Compare

**Difficulty:** Medium
**Pattern:** Stack — simulate text editing
**Expected:** O(n) time · O(n) space (stack approach) or O(1) space (two-pointer)

## Problem

Given two strings `s` and `t`, return `true` if they are equal when both are typed into empty text editors. `#` means a backspace character.

Note that after backspacing an empty text, the text will still be empty.

## Examples

### Example 1
```
Input:  s = "ab#c",  t = "ad#c"
Output: true
```
`"ab#c"` → type `a`, type `b`, backspace → `"a"`, type `c` → `"ac"`
`"ad#c"` → type `a`, type `d`, backspace → `"a"`, type `c` → `"ac"`
Both become `"ac"` → `true`

### Example 2
```
Input:  s = "ab##",  t = "c#d#"
Output: true
```
Both become `""` → `true`

### Example 3
```
Input:  s = "a#c",  t = "b"
Output: false
```
`"a#c"` → `"c"`. `"b"` → `"b"`. `"c" !== "b"` → `false`

### Example 4
```
Input:  s = "a##c",  t = "#a#c"
Output: true
```

## Constraints
- `1 <= s.length, t.length <= 200`
- `s` and `t` consist of lowercase letters and `#` characters.

## Hints

<details>
<summary>Hint 1 — stack simulation</summary>

Process each string through a stack:
- If the character is a letter: push it.
- If the character is `#`: pop (if the stack is non-empty).

At the end, compare the two stacks.

Write a helper `process(str)` that returns the final stack (or the joined string). Then compare `process(s) === process(t)`.
</details>

<details>
<summary>Hint 2 — follow-up: O(1) space with two pointers</summary>

For the O(1) space solution, process both strings **right to left** simultaneously. Use a "backspace count" variable. Skip characters when there are pending backspaces.

This is more complex but avoids using extra space. Try the stack approach first, then attempt this as a follow-up.
</details>

## Write your solution
→ [`../solutions/21-backspace-string-compare.js`](../solutions/21-backspace-string-compare.js)

## Follow-ups
- Implement the O(1) space two-pointer solution.
- What if the backspace character was `\b` (the actual ASCII backspace) instead of `#`?
- Extend to handle `Ctrl+Z` (undo entire words) not just single characters.
