# Q3 — Count Set Bits (Popcount)

**Difficulty:** Easy
**Pattern:** Brian Kernighan's algorithm — `x & (x - 1)`
**Expected:** O(k) time (k = number of set bits) · O(1) space

## Problem

Given a non-negative integer `n`, return the **number of 1-bits** in its binary representation. This is also called the **Hamming weight** or **popcount**.

> **Why this matters:** Counting set bits is a primitive operation used in compression, cryptography, error detection, and many bit-manipulation interview problems. Understanding Brian Kernighan's trick is also the gateway to understanding `x & (x-1)` more generally.

## Examples

### Example 1
```
Input:  11
Output: 3
```
11 in binary = `1011` — three 1-bits.

### Example 2
```
Input:  128
Output: 1
```
128 = `10000000` — exactly one 1-bit.

### Example 3
```
Input:  4294967293
Output: 31
```
4294967293 in 32-bit binary = `11111111111111111111111111111101` — 31 ones.

### Example 4
```
Input:  0
Output: 0
```

## Constraints
- `0 <= n <= 2^32 - 1` (treat as an unsigned 32-bit integer)

## Hints

<details>
<summary>Hint 1 — naive approach: check each bit</summary>

Loop 32 times. At each step, check whether the lowest bit is 1 (using `n & 1`), increment a counter if so, then shift right (`n >>>= 1` — use unsigned shift to handle large inputs).

This works in O(32) = O(1) but makes 32 iterations even for small numbers.
</details>

<details>
<summary>Hint 2 — Brian Kernighan's insight</summary>

The expression `n & (n - 1)` **removes the lowest set bit** of `n`.

```
n   = 1011 1000  (184)
n-1 = 1011 0111  (183)
────────────────
n & (n-1) = 1011 0000  (176)  ← bit 3 (the lowest set bit) is now 0
```

If you loop `n = n & (n - 1)` until `n` is 0, the loop runs exactly **k times**, where k is the number of set bits. For `n = 128` (only one bit set), this takes just **one iteration** instead of 32.
</details>

<details>
<summary>Hint 3 — step-by-step trace</summary>

Count set bits of 11 (`1011`):

```
Step 1: n = 1011  →  n & (n-1) = 1011 & 1010 = 1010  count = 1
Step 2: n = 1010  →  n & (n-1) = 1010 & 1001 = 1000  count = 2
Step 3: n = 1000  →  n & (n-1) = 1000 & 0111 = 0000  count = 3
Step 4: n = 0 → stop

Result: 3 ✓
```
</details>

## Write your solution
→ [`../solutions/03-count-set-bits.js`](../solutions/03-count-set-bits.js)

## Follow-ups
- JavaScript has a built-in: how would you use `Math.clz32` to help count bits? (It counts leading zeros, not set bits — can you combine it with something else?)
- For very large n: if you had to count set bits for a **billion** different numbers, a precomputed lookup table (256 entries, one per byte) would be faster. How would you split a 32-bit number into four 8-bit lookups?
- See Q17 (Number of 1 Bits) and Q18 (Counting Bits) for the LeetCode variants.
