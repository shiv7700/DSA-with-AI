# Q1 — Reverse a String / Array In Place

**Difficulty:** Easy
**Pattern:** Two Pointers (opposite ends)
**Expected:** O(n) time · O(1) space

## Problem

You are given a string as an array of characters. Reverse the array in place — the first character should end up last, the last should end up first — and return the same array.

Rules:
- You must do this **in place** — modify the input array directly, no new array.
- Do not use the built-in `.reverse()` method.

> **Why in place?** In interviews this constraint tests whether you know the two-pointer swap trick. In real systems, in-place operations avoid doubling your memory usage for large inputs.

## Examples

### Example 1
```
Input:  ['h', 'e', 'l', 'l', 'o']
Output: ['o', 'l', 'l', 'e', 'h']
```

### Example 2
```
Input:  ['H', 'a', 'n', 'n', 'a', 'h']
Output: ['h', 'a', 'n', 'n', 'a', 'H']
```

### Example 3 (single character)
```
Input:  ['a']
Output: ['a']
```

### Example 4 (empty)
```
Input:  []
Output: []
```

## Constraints
- `0 <= s.length <= 10^5`
- `s[i]` is a printable ASCII character.
- Modify the array in place and return it (same reference).
- O(1) extra space only.

## Hints

<details>
<summary>Hint 1 — visualize it</summary>

Put one finger on the first character and another on the last. Swap them. Move both fingers one step toward the middle. Repeat.
</details>

<details>
<summary>Hint 2 — the two-pointer template</summary>

```
left = 0, right = s.length - 1

while left < right:
    swap s[left] and s[right]
    left++
    right--
```

In JavaScript you can swap in one line:
```js
[s[left], s[right]] = [s[right], s[left]];
```
</details>

<details>
<summary>Hint 3 — when does the loop stop?</summary>

When `left >= right`. For an odd-length array the pointers meet at the middle element — no swap needed (a character swapped with itself is unchanged). For even length they cross. Both cases are handled automatically by the `left < right` condition.
</details>

## Write your solution
→ [`../solutions/01-reverse-string.js`](../solutions/01-reverse-string.js)

## Follow-ups
- Reverse only the substring between indexes `i` and `j` (used in the "reverse words" trick).
- Do the same for a regular JavaScript string. What extra step is needed? (Hint: JS strings are immutable — split to array first, join after.)
- Cross-reference: [02 — Arrays Q1 — Reverse an Array](../../02-Arrays/questions/01-reverse-array.md)
