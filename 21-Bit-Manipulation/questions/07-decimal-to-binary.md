# Q7 — Decimal to Binary String (no toString)

**Difficulty:** Easy
**Pattern:** Repeated right-shift and bit extraction
**Expected:** O(log n) time · O(log n) space

## Problem

Given a non-negative integer `n`, return its **binary representation as a string** — **without** using `Number.prototype.toString(2)` or `parseInt(n, 2)`.

Implement the conversion yourself using bitwise operations.

> **Why this matters:** Building the conversion by hand makes the relationship between a number's value and its bit pattern tangible. The bit-extraction loop you write here is exactly the pattern you'll use inside more complex solutions.

## Examples

### Example 1
```
Input:  5
Output: '101'
```
5 = 4 + 1 = 2² + 2⁰.

### Example 2
```
Input:  0
Output: '0'
```

### Example 3
```
Input:  255
Output: '11111111'
```
255 = `1111 1111₂` (eight 1-bits).

### Example 4
```
Input:  1024
Output: '10000000000'
```
1024 = 2¹⁰.

## Constraints
- `0 <= n <= 2^30 - 1`

## Hints

<details>
<summary>Hint 1 — extract the lowest bit repeatedly</summary>

`n & 1` gives you the current lowest bit (0 or 1). Then `n >>>= 1` shifts n right, exposing the next bit. Collect the bits and reverse at the end (since you're reading from least significant to most significant).

```
n = 5  (101)
n & 1 = 1   → bits = ['1'],  n = 2
n & 1 = 0   → bits = ['1','0'],  n = 1
n & 1 = 1   → bits = ['1','0','1'],  n = 0
Reverse: '101'
```
</details>

<details>
<summary>Hint 2 — edge case: n = 0</summary>

The loop `while (n > 0)` won't execute at all when `n = 0`, leaving you with an empty array. Handle this as a special case: return `'0'` directly.
</details>

<details>
<summary>Hint 3 — alternative: work from the top down</summary>

Find the highest set bit position first (you can use `Math.floor(Math.log2(n))`), then iterate from that position down to 0, checking each bit with `(n >> i) & 1`. This avoids the reverse step.
</details>

## Write your solution
→ [`../solutions/07-decimal-to-binary.js`](../solutions/07-decimal-to-binary.js)

## Follow-ups
- Modify the function to always output exactly 8 bits (pad with leading zeros).
- Can you convert to any base `b` between 2 and 16 by changing the divisor and using a digit map?
- Extend to negative integers. How does two's complement change the output?
