# Q6 — Toggle a Specific Bit

**Difficulty:** Easy
**Pattern:** XOR with a bitmask
**Expected:** O(1) time · O(1) space

## Problem

Given an integer `x` and a bit position `i` (zero-indexed from the right), return the integer you get by **flipping bit `i`** of `x`.

- If bit `i` is currently 0, it becomes 1.
- If bit `i` is currently 1, it becomes 0.
- All other bits stay unchanged.

> **Why this matters:** Toggling individual bits is one of the four fundamental bit operations (check / set / clear / toggle). It's used in state machines, permission systems, LED control, and many coding problems.

## Examples

### Example 1
```
Input:  x = 11, i = 2
Output: 15
```
11 = `1011`. Bit 2 is 0. After toggle: `1111` = 15.

### Example 2
```
Input:  x = 15, i = 2
Output: 11
```
15 = `1111`. Bit 2 is 1. After toggle: `1011` = 11.

### Example 3
```
Input:  x = 0, i = 0
Output: 1
```
`0000` → bit 0 toggled → `0001`.

### Example 4
```
Input:  x = 255, i = 7
Output: 127
```
255 = `11111111`. Bit 7 toggled to 0: `01111111` = 127.

## Constraints
- `0 <= x <= 2^30 - 1`
- `0 <= i <= 29`

## Hints

<details>
<summary>Hint 1 — what does XOR do to a single bit?</summary>

Recall the XOR truth table for one bit:

```
0 ^ 1 = 1   ← 0 flipped to 1
1 ^ 1 = 0   ← 1 flipped to 0
0 ^ 0 = 0   ← 0 unchanged
1 ^ 0 = 1   ← 1 unchanged
```

XOR with 1 **flips**. XOR with 0 **preserves**. This is exactly what toggle needs.
</details>

<details>
<summary>Hint 2 — build the mask</summary>

You want to XOR x with a mask that has exactly bit i set. That mask is `1 << i`:

```js
x ^ (1 << i)
```

For i = 2: mask = `0100`.

```
x    = 1011
mask = 0100
─────────────
x^m  = 1111
```
</details>

<details>
<summary>Hint 3 — verify with a round trip</summary>

Toggling twice should give back the original:

```js
const original = 11;
const toggled  = original ^ (1 << 2);   // 15
const restored = toggled  ^ (1 << 2);   // 11 again  ✓
```
</details>

## Write your solution
→ [`../solutions/06-toggle-bit.js`](../solutions/06-toggle-bit.js)

## Follow-ups
- Write functions `setBit(x, i)` and `clearBit(x, i)` alongside `toggleBit`. Can you unify them into a single `modifyBit(x, i, value)` function?
- How would you toggle a **range** of bits from position `lo` to position `hi` (inclusive) in a single expression?
- What happens when `i = 31` in a 32-bit JS context? (Reminder: `1 << 31` is negative — see notes Lesson 18.)
