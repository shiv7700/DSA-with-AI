# Q4 — Reverse a String Recursively

**Difficulty:** Easy
**Pattern:** Linear recursion on a shrinking string
**Expected:** O(n) time · O(n) space (call stack + string copies)

## Problem

Write a recursive function `reverseString(s)` that returns the reverse of the input string `s`.

Rules:
- Use recursion — no loops, no built-in `.split('').reverse().join('')`.
- The function should return the reversed string (don't just print it).

> **Why this problem?** It forces you to think recursively about strings, and it introduces the idea of combining the recursive result with the current element in a different order than you received it. The same idea appears in reversing linked lists and reversing trees.

## Examples

### Example 1
```
Input:  "hello"
Output: "olleh"
```

### Example 2
```
Input:  "abcde"
Output: "edcba"
```

### Example 3 (edge cases)
```
Input:  "a"     → "a"
Input:  ""      → ""
```

### Example 4 (single word)
```
Input:  "recursion"
Output: "noisrucer"
```

## Constraints
- `0 <= s.length <= 1000`
- `s` contains only printable ASCII characters.
- Return the result — don't modify in place (strings in JavaScript are immutable anyway).

## Hints

<details>
<summary>Hint 1 — identify the base case</summary>

What's a string so small you can reverse it without thinking? An empty string `""` or a single character `"a"` — reversing either gives the same thing back.

Base case: if `s.length <= 1`, return `s`.
</details>

<details>
<summary>Hint 2 — identify the recursive case</summary>

Think about `"hello"`. Apply the leap of faith: assume `reverseString("ello")` correctly gives you `"olle"`.

Where does `"h"` (the first character) go in the reversed string? At the **end**.

So: `reverseString("hello") = reverseString("ello") + "h"`.

In general: `reverseString(s) = reverseString(s.slice(1)) + s[0]`.
</details>

<details>
<summary>Hint 3 — trace it for "abc"</summary>

```
reverseString("abc")
  = reverseString("bc") + "a"
  = (reverseString("c") + "b") + "a"
  = (("c") + "b") + "a"    ← base case: reverseString("c") = "c"
  = ("cb") + "a"
  = "cba"
```
</details>

<details>
<summary>Hint 4 — alternative approach: use two indexes</summary>

Another way to think about it: the reversed string = last character + reversed(everything except the last).

```js
return s[s.length - 1] + reverseString(s.slice(0, -1));
```

Both approaches work. Pick the one that makes more sense to you.
</details>

## Write your solution
→ [`../solutions/04-reverse-string.js`](../solutions/04-reverse-string.js)

## Follow-ups
- What is the time complexity? Each call creates a new string slice (`O(n)` per slice), so the total is `O(n²)`. Can you do better with an iterative two-pointer approach?
- Reverse an array recursively — same idea, different data type. What changes?
- Later, in the Linked Lists chapter, you'll reverse a linked list recursively. The logic is strikingly similar.
