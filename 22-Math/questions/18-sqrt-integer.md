# Q18 — Integer Square Root

**Difficulty:** Medium
**Pattern:** Binary search · Newton's method
**Expected:** O(log n) time · O(1) space

## Problem

Given a non-negative integer `x`, return the **integer part** of its square root (floor of √x).

Do **not** use `Math.sqrt`.

## Examples

### Example 1
```
Input:  x = 4
Output: 2
```

### Example 2
```
Input:  x = 8
Output: 2
```
√8 ≈ 2.828. Floor is 2.

### Example 3
```
Input:  x = 0
Output: 0
```

### Example 4
```
Input:  x = 2147395600
Output: 46340
```

## Constraints
- `0 <= x <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — binary search approach</summary>

Binary search for the largest integer `m` such that `m * m <= x`. Search range: `[0, x]` (or `[0, x/2 + 1]` as a tighter bound).

At each step, check if `mid * mid <= x`. If yes, move left boundary up. If no, move right boundary down.
</details>

<details>
<summary>Hint 2 — Newton's method (converges faster)</summary>

Start with a guess `g = x`. Repeatedly improve it:
```
g = Math.floor((g + x / g) / 2)
```
Stop when `g * g <= x` and `(g+1) * (g+1) > x`. This converges very quickly (quadratically).
</details>

<details>
<summary>Hint 3 — overflow caution</summary>

When computing `mid * mid`, for `mid` near `2^16`, the product can reach `2^32`, which overflows a 32-bit integer (though not a JS number). For safety, check `mid <= Math.floor(x / mid)` instead of `mid * mid <= x` if you're worried.
</details>

## Write your solution
→ [`../solutions/18-sqrt-integer.js`](../solutions/18-sqrt-integer.js)

## Follow-ups
- Integer cube root: find the largest `m` such that `m^3 <= x`.
- Is `x` a perfect square? `isqrt(x) * isqrt(x) === x`.
