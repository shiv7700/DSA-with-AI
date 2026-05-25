# Q17 — Number of 1 Bits

**Difficulty:** Medium
**Pattern:** Brian Kernighan (`x & (x-1)`)
**Expected:** O(k) time (k = number of set bits) · O(1) space

## Problem

Write a function that takes an unsigned 32-bit integer and returns the number of `1` bits it has (also known as the **Hamming weight**).

> **Note:** This is a LeetCode-style version of Q3 with a larger input range. The approach is the same — the focus here is applying it cleanly under constraints.

## Examples

### Example 1
```
Input:  11
Output: 3
```
11 = `00000000000000000000000000001011` — three 1-bits.

### Example 2
```
Input:  128
Output: 1
```
128 = `00000000000000000000000010000000`.

### Example 3
```
Input:  4294967293
Output: 31
```
4294967293 = `11111111111111111111111111111101` — 31 ones.

## Constraints
- The input must be treated as an unsigned 32-bit integer.

## Hints

<details>
<summary>Hint 1 — Brian Kernighan's loop</summary>

`n & (n - 1)` clears the lowest set bit. Loop until n is 0, counting each iteration.

```js
let count = 0;
while (n !== 0) {
  n &= n - 1;
  count++;
}
return count;
```

Why `!== 0` rather than `> 0`? Because if the input represents a large unsigned number (e.g. 4294967293), JavaScript might store it as a negative 32-bit signed integer. `> 0` would fail for negative n. `!== 0` works regardless.
</details>

<details>
<summary>Hint 2 — unsigned shift approach</summary>

Loop 32 times, check `n & 1`, shift right unsigned:

```js
let count = 0;
for (let i = 0; i < 32; i++) {
  count += n & 1;
  n >>>= 1;
}
return count;
```

Use `>>>` not `>>` so you don't loop with sign extension.
</details>

<details>
<summary>Hint 3 — when n can be negative in JS</summary>

If the input is `4294967293`, JavaScript stores this as a 32-bit value that looks like `-3` in signed representation. The Brian Kernighan loop with `n !== 0` still works because `-3 & (-3 - 1) = -3 & -4 = ...` — the math is consistent in two's complement, and eventually n reaches 0.
</details>

## Write your solution
→ [`../solutions/17-number-of-1-bits.js`](../solutions/17-number-of-1-bits.js)

## Follow-ups
- How would you count the set bits of every number from 0 to n without a loop for each? See Q18 (Counting Bits).
- What is the Hamming distance between two numbers? (Count the set bits in their XOR.) See Q20.
- Some CPU architectures provide a single `POPCNT` instruction for this. Is there a built-in equivalent in JavaScript?
