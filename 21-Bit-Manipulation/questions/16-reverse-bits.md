# Q16 — Reverse Bits

**Difficulty:** Medium
**Pattern:** Bit extraction and reconstruction
**Expected:** O(1) time · O(1) space (32 iterations — fixed)

## Problem

Reverse the bits of a given 32-bit unsigned integer.

> **Note:** In JavaScript, all numbers are 64-bit floats. For this problem, treat the input as an unsigned 32-bit integer, and return an unsigned 32-bit integer (i.e. your result may be very large — return it as a regular JS number using `>>> 0` to stay unsigned).

## Examples

### Example 1
```
Input:  n = 43261596       (binary: 00000010100101000001111010011100)
Output: 964176192          (binary: 00111001011110000010100101000000)
```

### Example 2
```
Input:  n = 4294967293     (binary: 11111111111111111111111111111101)
Output: 3221225471         (binary: 10111111111111111111111111111111)
```

## Constraints
- The input must be treated as a 32-bit unsigned integer.

## Hints

<details>
<summary>Hint 1 — the building block</summary>

Build the result bit by bit. At each of the 32 steps:
1. Extract the lowest bit of `n`: `n & 1`.
2. Shift `result` left by 1 to make room: `result <<= 1`.
3. OR the extracted bit into `result`: `result |= bit`.
4. Shift `n` right by 1 (unsigned): `n >>>= 1`.
</details>

<details>
<summary>Hint 2 — unsigned output</summary>

After the 32 iterations, `result` may be a negative number in JavaScript's signed 32-bit world (if bit 31 is set). Convert to an unsigned representation with `result >>> 0`.

```js
(-1073741824) >>> 0   // 3221225472  (unsigned)
```
</details>

<details>
<summary>Hint 3 — visualizing the reversal</summary>

```
n      = 00000010100101000001111010011100
          ↓ reverse bit order
result = 00111001011110000010100101000000
```

Position 0 of n goes to position 31 of result.
Position 1 of n goes to position 30 of result.
...and so on.
</details>

## Write your solution
→ [`../solutions/16-reverse-bits.js`](../solutions/16-reverse-bits.js)

## Follow-ups
- If this function is called many times with different inputs, you could precompute a 256-entry lookup table (one byte at a time) to speed it up. How would you split a 32-bit number into four 8-bit chunks?
- How does `Math.clz32` relate to finding the highest set bit after reversal?
- What is the reversed representation of `0` and of `4294967295` (all 1s)?
