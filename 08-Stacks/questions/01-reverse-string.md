# Q1 — Reverse a String Using a Stack

**Difficulty:** Easy
**Pattern:** Stack basics
**Expected:** O(n) time · O(n) space

## Problem

Given a string `s`, return a new string with its characters in reverse order. You must use a stack as part of your solution.

> **Why this matters:** Reversing with a stack demonstrates the LIFO property hands-on. The characters go in left-to-right, and come out right-to-left. It's the simplest possible demonstration of what a stack does.

## Examples

### Example 1
```
Input:  "hello"
Output: "olleh"
```

### Example 2
```
Input:  "racecar"
Output: "racecar"
```

### Example 3
```
Input:  "abcde"
Output: "edcba"
```

### Example 4 (edge cases)
```
Input:  ""    → ""
Input:  "a"   → "a"
```

## Constraints
- `0 <= s.length <= 10^4`
- `s` consists of printable ASCII characters.
- You must use a stack (array with `push`/`pop` is fine).

## Hints

<details>
<summary>Hint 1 — think about LIFO</summary>

What happens if you push every character of the string onto a stack, then pop them all off one by one?

The first character you pushed is the last one you'll pop. The last character you pushed is the first one you'll pop. That's exactly a reversal.
</details>

<details>
<summary>Hint 2 — step-by-step for "hello"</summary>

```
Push phase:
  push 'h'  → stack: ['h']
  push 'e'  → stack: ['h', 'e']
  push 'l'  → stack: ['h', 'e', 'l']
  push 'l'  → stack: ['h', 'e', 'l', 'l']
  push 'o'  → stack: ['h', 'e', 'l', 'l', 'o']

Pop phase (build result):
  pop → 'o'   result: 'o'
  pop → 'l'   result: 'ol'
  pop → 'l'   result: 'oll'
  pop → 'e'   result: 'olle'
  pop → 'h'   result: 'olleh'
```
</details>

<details>
<summary>Hint 3 — building the result string</summary>

Strings in JavaScript are immutable — you can't modify them in place. Build the reversed string by concatenating popped characters, or collect them in an array and call `.join('')` at the end (more efficient than repeated `+=`).

```js
const result = [];
while (stack.length > 0) {
  result.push(stack.pop());
}
return result.join('');
```
</details>

## Write your solution
→ [`../solutions/01-reverse-string.js`](../solutions/01-reverse-string.js)

## Follow-ups
- Can you reverse the string without a stack in O(n) time and O(1) extra space? (Two-pointer approach.)
- How would you reverse only the words in a sentence, not the characters within each word?
- Can you reverse a string using recursion? What's the space complexity of that approach?
