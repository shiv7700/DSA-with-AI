# Q20 — Hamming Distance

**Difficulty:** Medium
**Pattern:** XOR + popcount
**Expected:** O(1) time · O(1) space

## Problem

The **Hamming distance** between two integers is the number of bit positions at which their binary representations differ.

Given two integers `x` and `y`, return the Hamming distance between them.

## Examples

### Example 1
```
Input:  x = 1, y = 4
Output: 2
```
```
1  = 0001
4  = 0100
      ↑↑  two positions differ
```

### Example 2
```
Input:  x = 3, y = 1
Output: 1
```
```
3  = 011
1  = 001
      ↑  one position differs (bit 1)
```

## Constraints
- `0 <= x, y <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — what does XOR give you?</summary>

`x ^ y` produces a number with a 1 at every bit position where x and y differ, and a 0 where they are the same.

```
1  = 0001
4  = 0100
─────────
XOR= 0101   ← two 1-bits → Hamming distance = 2
```

So: **count the set bits in `x ^ y`**.
</details>

<details>
<summary>Hint 2 — count set bits with Brian Kernighan</summary>

```js
let diff = x ^ y;
let count = 0;
while (diff !== 0) {
  diff &= diff - 1;
  count++;
}
return count;
```
</details>

<details>
<summary>Hint 3 — one-liner</summary>

You can chain Q17 (number of 1 bits) with XOR:

```js
return countSetBits(x ^ y);
```
</details>

## Write your solution
→ [`../solutions/20-hamming-distance.js`](../solutions/20-hamming-distance.js)

## Follow-ups
- **Total Hamming Distance** (Q21): sum of Hamming distances for all pairs in an array. Can you do it in O(32 × n) instead of O(n²)?
- The Hamming distance is used in error-detection codes (Hamming codes). If you have a message of k bits and want to detect single-bit errors, how many check bits do you need?
- What is the maximum possible Hamming distance between two 32-bit integers? What pair achieves it?
