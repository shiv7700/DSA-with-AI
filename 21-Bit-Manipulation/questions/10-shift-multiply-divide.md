# Q10 — Multiply and Divide by 2 Using Shifts

**Difficulty:** Easy
**Pattern:** Left shift (`<<`) and right shift (`>>`)
**Expected:** O(1) time · O(1) space

## Problem

Implement two functions:

1. `multiplyBy2(n)` — returns `n * 2` using a left shift.
2. `divideBy2(n)` — returns `Math.floor(n / 2)` for positive `n` using a right shift.

Do not use `*` or `/`.

> **Why this matters:** Bit shifts are literally the fastest arithmetic operations on any CPU. Left shift by 1 = ×2. Right shift by 1 = ÷2 (integer). Left shift by k = ×2^k. These patterns appear in binary search midpoint calculations, power-of-2 bitmask generation, and many divide-and-conquer algorithms.

## Examples

### multiplyBy2
```
Input:  3   → Output: 6
Input:  0   → Output: 0
Input:  16  → Output: 32
Input:  -5  → Output: -10
```

### divideBy2
```
Input:  10  → Output: 5
Input:  7   → Output: 3   (floor(7/2) = 3)
Input:  1   → Output: 0
Input:  100 → Output: 50
```

## Constraints
- `-2^30 <= n <= 2^30` for multiply (to stay within 32-bit safe range)
- `0 <= n <= 2^31 - 1` for divide

## Hints

<details>
<summary>Hint 1 — left shift is multiplication</summary>

Shifting all bits one place to the left is the same as multiplying by 2:

```
3   = 0011
3<<1= 0110 = 6
```

In general: `n << k` = `n * 2^k`.
</details>

<details>
<summary>Hint 2 — right shift is division</summary>

Shifting all bits one place to the right is the same as floor-dividing by 2:

```
10  = 1010
10>>1= 0101 = 5

7   = 0111
7>>1 = 0011 = 3   (floor(7/2) = 3, the rightmost bit is dropped)
```

In general: `n >> k` = `Math.floor(n / 2^k)`.
</details>

<details>
<summary>Hint 3 — beware of the 32-bit limit for multiply</summary>

`1 << 31` produces a negative number in JavaScript (the sign bit flips). If n is large enough that `n << 1` overflows 32 bits, the result is wrong.

For this exercise the constraints keep you safe. But in general, verify that `n < 2^30` before doing `n << 1`.
</details>

## Write your solution
→ [`../solutions/10-shift-multiply-divide.js`](../solutions/10-shift-multiply-divide.js)

## Follow-ups
- Implement `multiplyByK(n, k)` where k is any power of 2. How do you find the exponent from k?
- Why is `mid = (left + right) >>> 1` preferred over `mid = (left + right) >> 1` in binary search implementations when left and right can be large?
- Can you implement multiplication by 10 using only shifts and addition? (`n*10 = n*8 + n*2 = (n<<3) + (n<<1)`)
