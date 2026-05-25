# Q20 — Reverse Words in a String In Place

**Difficulty:** Medium
**Pattern:** Two Pointers (reverse whole, then reverse each word)
**Expected:** O(n) time · O(1) extra space

## Problem

Given a string `s`, reverse the order of the **words** in it. A word is a sequence of non-space characters. Words are separated by at least one space.

Return the result with a **single space** between words — no leading or trailing spaces.

> **In-place spirit:** In many interview settings you'd work with a character array (since JS strings are immutable). Convert to an array, do the work, join at the end.

## Examples

### Example 1
```
Input:  "the sky is blue"
Output: "blue is sky the"
```

### Example 2
```
Input:  "  hello world  "
Output: "world hello"
```
Leading/trailing spaces are removed; extra spaces between words collapse to one.

### Example 3
```
Input:  "a good   example"
Output: "example good a"
```

## Constraints
- `1 <= s.length <= 10^4`
- `s` contains English letters, digits, and spaces `' '`.
- At least one word exists.

## Hints

<details>
<summary>Hint 1 — the classic trick</summary>

Two-step reversal:
1. Reverse the entire character array: `"the sky is blue"` → `"eulb si yks eht"`.
2. Reverse each individual word in place: `"blue is sky the"`.

This is O(n) and uses no extra allocation beyond the character array itself.
</details>

<details>
<summary>Hint 2 — handling extra spaces</summary>

Before or after the two-step reversal, compact the string to remove leading, trailing, and duplicate spaces. You can do this with the slow/fast pointer compaction pattern (Q6/Q8): copy characters to the front, insert a single space between words.
</details>

<details>
<summary>Hint 3 — reversing a sub-array</summary>

Write a helper `reverse(arr, i, j)` that reverses `arr[i..j]` in place using the opposite-ends pattern from Q1. Call it on the full array, then call it on each word's range.
</details>

## Write your solution
→ [`../solutions/20-reverse-words-in-string.js`](../solutions/20-reverse-words-in-string.js)

## Follow-ups
- What if you only want to reverse words within individual sentences (separated by `.`)?
- Cross-reference: [Q1 — Reverse String](./01-reverse-string.md) — the helper you need. [03 — Strings](../../03-Strings/) for string manipulation patterns.
