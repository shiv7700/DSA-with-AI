# Q2 — Power of Two

**Difficulty:** Easy
**Pattern:** `x & (x - 1)` trick
**Expected:** O(1) time · O(1) space

## Problem

Given an integer `n`, return `true` if it is a **power of two** (i.e. there exists some integer `k >= 0` such that `n == 2^k`), otherwise return `false`.

> **Why this matters:** Powers of 2 are everywhere in computing: memory sizes, bitmask widths, array doubling strategies. The one-liner `n > 0 && (n & (n-1)) === 0` is a canonical bit trick every developer should know by heart.

## Examples

### Example 1
```
Input:  1
Output: true
```
1 = 2⁰.

### Example 2
```
Input:  16
Output: true
```
16 = 2⁴ = `10000` in binary — exactly one bit set.

### Example 3
```
Input:  6
Output: false
```
6 = `110` — two bits set.

### Example 4
```
Input:  0
Output: false
```
0 is not a power of any positive number.

## Constraints
- `-2^31 <= n <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — what does a power of 2 look like in binary?</summary>

```
1  = 00001
2  = 00010
4  = 00100
8  = 01000
16 = 10000
```

Every power of 2 has **exactly one bit set**. All others are 0.
</details>

<details>
<summary>Hint 2 — the `x - 1` pattern</summary>

Subtracting 1 from a power of 2 flips that single bit and sets all lower bits:

```
8   = 1000
7   = 0111

8 & 7 = 0000  ← zero!
```

For a non-power like 6:
```
6   = 110
5   = 101

6 & 5 = 100  ← non-zero
```

So if `n & (n - 1) === 0`, then n has at most one bit set.
</details>

<details>
<summary>Hint 3 — don't forget the edge case</summary>

`0 & (0 - 1) = 0 & (-1)`. In 32-bit: `0 & 0xFFFFFFFF = 0`. That would incorrectly return true! You must add the guard `n > 0`.

Full check: `n > 0 && (n & (n - 1)) === 0`
</details>

## Write your solution
→ [`../solutions/02-power-of-two.js`](../solutions/02-power-of-two.js)

## Follow-ups
- Extend the check: is `n` a power of **4**? (Powers of 4 are also powers of 2, but their single set bit must be at an even position.)
- Is `n` a power of **3**? Can you solve that with bits? (Hint: powers of 3 cannot be detected with a single AND trick because 3 is not 2.)
- What is the largest power of 2 that fits in a 32-bit signed integer?
