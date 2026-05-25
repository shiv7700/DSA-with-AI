# Q30 — Longest Valid Parentheses

**Difficulty:** Hard
**Pattern:** Stack — tracking valid substring boundaries
**Expected:** O(n) time · O(n) space (stack approach)

## Problem

Given a string containing only `(` and `)`, return the length of the **longest valid (well-formed) parentheses substring**.

## Examples

### Example 1
```
Input:  "(()"
Output: 2
```
The longest valid parentheses substring is `"()"`.

### Example 2
```
Input:  ")()())"
Output: 4
```
The longest valid parentheses substring is `"()()"`.

### Example 3
```
Input:  ""
Output: 0
```

### Example 4
```
Input:  "(()((("
Output: 2
```

### Example 5
```
Input:  "()(())"
Output: 6
```
The entire string is valid.

## Constraints
- `0 <= s.length <= 3 × 10^4`
- `s[i]` is `(` or `)`.

## Hints

<details>
<summary>Hint 1 — brute force</summary>

Try every possible substring (O(n²) of them), check each for validity (O(n)), return the longest valid one. O(n³) total — too slow.
</details>

<details>
<summary>Hint 2 — stack approach (track boundary indexes)</summary>

The key insight: use a stack to store **indexes**, not characters.

Initialize the stack with `[-1]` (a sentinel — represents the "left boundary" before the string starts).

Walk through the string:
- If `(`: push the current index.
- If `)`:
  - Pop the top.
  - If stack is **empty**: push current index (new left boundary — the current `)` can't be part of any valid sequence).
  - If stack is **not empty**: current valid length = `currentIndex - stack.top()`. Update max.
</details>

<details>
<summary>Hint 3 — trace ")()())"</summary>

```
Stack: [-1]   (sentinel)

i=0, ')': pop -1 → stack empty → push 0.  Stack: [0]
i=1, '(': push 1.  Stack: [0, 1]
i=2, ')': pop 1 → stack not empty, len = 2-0 = 2.  max=2. Stack: [0]
i=3, '(': push 3.  Stack: [0, 3]
i=4, ')': pop 3 → stack not empty, len = 4-0 = 4.  max=4. Stack: [0]
i=5, ')': pop 0 → stack empty → push 5.  Stack: [5]

Result: max = 4 ✅
```
</details>

## Write your solution
→ [`../solutions/30-longest-valid-parentheses.js`](../solutions/30-longest-valid-parentheses.js)

## Follow-ups
- Can you solve this in O(1) space (no stack, no dp array)? (Hint: two-pass left-to-right and right-to-left with two counters.)
- Extend: return the **starting index** of the longest valid substring, not just its length.
- What's the longest valid subsequence (not necessarily contiguous)? (Hint: much simpler — count opens and closes.)
