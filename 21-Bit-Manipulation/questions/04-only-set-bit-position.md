# Q4 — Position of the Only Set Bit

**Difficulty:** Easy
**Pattern:** Logarithm or iterative right-shift
**Expected:** O(log n) time · O(1) space

## Problem

Given a positive integer `n` that has **exactly one bit set** (i.e. it is a power of 2), return the **zero-indexed position** of that set bit.

In other words: find `k` such that `n == 2^k`.

> **Why this matters:** Knowing which bit position is set is a core operation when decoding bitmasks — for example, "which option flag is this?" You could use `Math.log2`, but understanding the shift-based approach deepens your intuition.

## Examples

### Example 1
```
Input:  1
Output: 0
```
`1 = 2⁰` — bit 0 is set.

### Example 2
```
Input:  8
Output: 3
```
`8 = 2³ = 1000₂` — bit 3 is set.

### Example 3
```
Input:  1024
Output: 10
```
`1024 = 2¹⁰`.

### Example 4
```
Input:  2147483648
Output: 31
```
`2^31` — the highest bit in a 32-bit unsigned number.

## Constraints
- `n` is guaranteed to be a power of 2.
- `1 <= n <= 2^31`

## Hints

<details>
<summary>Hint 1 — shift until you reach 1</summary>

Keep right-shifting n by 1 until n equals 1. Count how many times you shifted.

```
8 >> 1 = 4   (count = 1)
4 >> 1 = 2   (count = 2)
2 >> 1 = 1   (count = 3)
→ answer is 3
```
</details>

<details>
<summary>Hint 2 — Math.log2</summary>

Since `n = 2^k`, taking `log₂(n)` gives you `k` directly:

```js
Math.log2(8)    // 3
Math.log2(1024) // 10
```

For exact powers of 2, `Math.log2` returns an exact integer. But be careful with very large n — floating-point precision can be tricky. `Math.round(Math.log2(n))` is safer.
</details>

<details>
<summary>Hint 3 — using Brian Kernighan's lowest-set-bit trick differently</summary>

`x & -x` isolates the lowest set bit. But if n has only one bit, `n & -x` just gives back n. Not directly helpful here — but it's worth knowing for Q14 and Q22.
</details>

## Write your solution
→ [`../solutions/04-only-set-bit-position.js`](../solutions/04-only-set-bit-position.js)

## Follow-ups
- What if `n` might have multiple bits set? Modify the function to return the position of the **lowest** set bit.
- What about the position of the **highest** (most significant) set bit? How does `Math.clz32` help?
- Why is `Math.log2(2**31)` safe in JS but `Math.log2(2**53)` might not give exactly 53?
