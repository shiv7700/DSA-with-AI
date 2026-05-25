# Q24 — Divide Two Integers Without / or *

**Difficulty:** Medium
**Pattern:** Bit shifting to simulate division
**Expected:** O(log² n) time · O(1) space

## Problem

Given two integers `dividend` and `divisor`, return the quotient after dividing `dividend` by `divisor`.

**Constraints:**
- Do **not** use multiplication (`*`), division (`/`), or the modulo operator (`%`).
- If the quotient overflows a 32-bit signed integer, return `2^31 - 1`.

## Examples

### Example 1
```
Input:  dividend = 10, divisor = 3
Output: 3
```
10 / 3 = 3.333…, truncate towards zero → 3.

### Example 2
```
Input:  dividend = 7, divisor = -3
Output: -2
```

### Example 3 (overflow case)
```
Input:  dividend = -2147483648, divisor = -1
Output: 2147483647
```
The "true" answer 2147483648 overflows 32-bit signed int.

## Constraints
- `-2^31 <= dividend, divisor <= 2^31 - 1`
- `divisor !== 0`

## Hints

<details>
<summary>Hint 1 — doubling trick</summary>

To find how many times `divisor` goes into `dividend` without using `/`:

For each bit position k (from high to low), check if `(divisor << k) <= dividend`. If yes, subtract `(divisor << k)` from the dividend and add `2^k` to the quotient. This is essentially binary long division.
</details>

<details>
<summary>Hint 2 — handle signs separately</summary>

Work with positive values. Determine the sign of the result (negative if signs differ) and apply it at the end.
</details>

<details>
<summary>Hint 3 — the overflow edge case</summary>

`-2147483648 / -1 = 2147483648`, but that overflows `2^31 - 1 = 2147483647`. Return `2147483647` for this specific case.
</details>

## Write your solution
→ [`../solutions/24-divide-integers.js`](../solutions/24-divide-integers.js)

## Follow-ups
- Can you do it in O(log n) instead of O(log² n)?
- How does CPU hardware actually implement integer division?
