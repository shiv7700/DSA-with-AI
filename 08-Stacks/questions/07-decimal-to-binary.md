# Q7 — Decimal to Binary

**Difficulty:** Easy
**Pattern:** Stack basics
**Expected:** O(log n) time · O(log n) space

## Problem

Given a non-negative integer `n`, return its binary representation as a string. Use a stack as part of your solution.

> **Why a stack?** When you convert decimal to binary by repeatedly dividing by 2 and recording remainders, the remainders come out in **reverse order** — the last remainder is the most significant bit (leftmost). A stack naturally reverses them back.

## Examples

### Example 1
```
Input:  10
Output: "1010"
```

### Example 2
```
Input:  0
Output: "0"
```

### Example 3
```
Input:  255
Output: "11111111"
```

### Example 4
```
Input:  1
Output: "1"
```

## Constraints
- `0 <= n <= 2^31 - 1`
- Return the result as a string (no leading zeros, except for the input `0`).

## Hints

<details>
<summary>Hint 1 — the division algorithm</summary>

To convert decimal to binary:
1. Divide `n` by 2. The **remainder** (0 or 1) is the next bit.
2. Repeat with the quotient until the quotient is 0.

Example for `10`:
```
10 ÷ 2 = 5, remainder 0   ← rightmost bit
 5 ÷ 2 = 2, remainder 1
 2 ÷ 2 = 1, remainder 0
 1 ÷ 2 = 0, remainder 1   ← leftmost bit
```
Remainders (bottom to top): 0, 1, 0, 1
Reading top to bottom: `1010` ✅
</details>

<details>
<summary>Hint 2 — where the stack helps</summary>

Push each remainder onto a stack as you divide. Then pop them all to read from most-significant to least-significant bit.

```js
const stack = [];
while (n > 0) {
  stack.push(n % 2);
  n = Math.floor(n / 2);
}
// now pop to build the string
```
</details>

<details>
<summary>Hint 3 — edge case</summary>

If `n === 0`, the while loop never runs and the stack is empty. Handle this separately: return `"0"`.
</details>

## Write your solution
→ [`../solutions/07-decimal-to-binary.js`](../solutions/07-decimal-to-binary.js)

## Follow-ups
- Convert to octal (base 8) and hexadecimal (base 16) using the same approach.
- Can you do it without a stack using JavaScript's built-in `toString(2)`? (Yes — but don't for this exercise.)
- Convert in the other direction: given a binary string, return its decimal value.
