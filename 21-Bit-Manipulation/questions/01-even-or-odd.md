# Q1 — Even or Odd via Bits

**Difficulty:** Easy
**Pattern:** Bit masking (AND with 1)
**Expected:** O(1) time · O(1) space

## Problem

Write a function `isEven(n)` that returns `true` if `n` is even, `false` if it is odd — **without using the `%` or `/` operators**.

Use a bitwise operation instead.

> **Why this matters:** The lowest bit of any integer tells you its parity. Odd numbers have bit 0 set; even numbers have it clear. Checking a single bit with AND is constant time and slightly cheaper than modulo on some hardware. More importantly, this micro-trick appears constantly inside larger solutions.

## Examples

### Example 1
```
Input:  4
Output: true
```
4 in binary is `100`. Bit 0 is 0 → even.

### Example 2
```
Input:  7
Output: false
```
7 in binary is `111`. Bit 0 is 1 → odd.

### Example 3
```
Input:  0
Output: true
```
0 is even.

### Example 4 (negatives)
```
Input:  -3
Output: false
Input:  -8
Output: true
```

## Constraints
- `-2^31 <= n <= 2^31 - 1` (fits in a 32-bit signed integer)
- Do **not** use `%` or `/`.

## Hints

<details>
<summary>Hint 1 — think about the lowest bit</summary>

Write out a few numbers in binary:
```
0 = 000   even
1 = 001   odd
2 = 010   even
3 = 011   odd
4 = 100   even
5 = 101   odd
```

What pattern do you see in bit 0?
</details>

<details>
<summary>Hint 2 — AND with 1</summary>

The mask `1` in binary is `...0001`. ANDing anything with it keeps only bit 0 and zeroes everything else:

```
n & 1  →  0 if even, 1 if odd
```
</details>

<details>
<summary>Hint 3 — what about negative numbers?</summary>

JavaScript bitwise ops use 32-bit two's-complement. Odd negative numbers still have bit 0 set, even negative numbers still have it clear. So `n & 1` works correctly for all integers.

```js
(-3) & 1   // 1  (odd)
(-8) & 1   // 0  (even)
```
</details>

## Write your solution
→ [`../solutions/01-even-or-odd.js`](../solutions/01-even-or-odd.js)

## Follow-ups
- Write `isOdd(n)` in one expression.
- Can you also determine divisibility by 4 or 8 with a single bitwise operation? What mask would you need?
- Why does `n % 2 === 0` work for negatives in JavaScript but not in all languages?
