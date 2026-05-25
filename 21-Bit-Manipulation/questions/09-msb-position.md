# Q9 — Most Significant Set Bit Position

**Difficulty:** Easy
**Pattern:** Iterative right-shift or `Math.clz32`
**Expected:** O(log n) time · O(1) space

## Problem

Given a positive integer `n`, return the **zero-indexed position** of its most significant (highest) set bit.

The most significant set bit is the leftmost 1 in the binary representation.

> **Why this matters:** Finding the highest bit position is used in integer logarithm calculations, bitmask sizing, and implementing fast division. It also introduces `Math.clz32` (count leading zeros), a useful built-in.

## Examples

### Example 1
```
Input:  1
Output: 0
```
`1 = 001₂` — the only set bit is at position 0.

### Example 2
```
Input:  8
Output: 3
```
`8 = 1000₂` — the highest bit is at position 3.

### Example 3
```
Input:  100
Output: 6
```
`100 = 1100100₂` — highest bit at position 6.

### Example 4
```
Input:  2147483648
Output: 31
```
`2^31` — highest bit at position 31.

## Constraints
- `1 <= n <= 2^31`

## Hints

<details>
<summary>Hint 1 — shift right and count</summary>

Keep right-shifting n by 1 and counting until n becomes 0. The count minus 1 is the answer.

```
100 → 50 → 25 → 12 → 6 → 3 → 1 → 0   (7 shifts)
Position = 7 - 1 = 6
```
</details>

<details>
<summary>Hint 2 — Math.log2</summary>

`Math.floor(Math.log2(n))` gives you the floor of log base 2, which equals the position of the highest set bit.

```js
Math.floor(Math.log2(100))   // 6  ✓
Math.floor(Math.log2(8))     // 3  ✓
```

Watch out: floating-point precision can cause `Math.log2` to return a value slightly below an integer for exact powers of 2. Use `Math.floor` (or `Math.round` for powers of 2 specifically).
</details>

<details>
<summary>Hint 3 — Math.clz32 (count leading zeros)</summary>

`Math.clz32(n)` returns the number of leading zeros in the 32-bit representation of n. Since positions count from 0 to 31:

```js
const msbPosition = 31 - Math.clz32(n);

Math.clz32(1)    // 31  → 31 - 31 = 0  ✓
Math.clz32(8)    // 28  → 31 - 28 = 3  ✓
Math.clz32(100)  // 25  → 31 - 25 = 6  ✓
```

This is the most efficient approach in JavaScript.
</details>

## Write your solution
→ [`../solutions/09-msb-position.js`](../solutions/09-msb-position.js)

## Follow-ups
- What is the **lowest** (least significant) set bit position? Use `x & -x` to isolate it, then find its position.
- What is the total number of bits needed to represent `n`? How does that relate to the MSB position?
- How would you find the second highest set bit position?
