# Q19 — Power of Two or Four

**Difficulty:** Medium
**Pattern:** Bit tricks + bitmask for position check
**Expected:** O(1) time · O(1) space

## Problem

Write two functions:

1. `isPowerOfTwo(n)` — return `true` if n is a power of 2.
2. `isPowerOfFour(n)` — return `true` if n is a power of 4.

Both must run in **O(1)** time — no loops.

> **Note:** Q2 already covered power of two. This question adds the power-of-four check and asks you to think about *why* the bitmask approach works.

## Examples

### isPowerOfTwo
```
1   → true    (2⁰)
16  → true    (2⁴)
18  → false
0   → false
```

### isPowerOfFour
```
1   → true    (4⁰)
16  → true    (4²)
64  → true    (4³)
8   → false   (2³, not a power of 4)
0   → false
```

## Constraints
- `-2^31 <= n <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — power of two (recap)</summary>

`n > 0 && (n & (n - 1)) === 0`

This checks that exactly one bit is set.
</details>

<details>
<summary>Hint 2 — powers of 4 are powers of 2 at even positions</summary>

Powers of 4: 1, 4, 16, 64, 256, …

```
1   = 000001   bit 0  (even position ✓)
4   = 000100   bit 2  (even position ✓)
16  = 010000   bit 4  (even position ✓)
64  = 1000000  bit 6  (even position ✓)
```

Powers of 2 that are NOT powers of 4: 2, 8, 32, 128, …

```
2   = 000010   bit 1  (odd position ✗)
8   = 001000   bit 3  (odd position ✗)
```

So: `isPowerOfFour(n)` = `isPowerOfTwo(n)` AND the single set bit is at an even position.
</details>

<details>
<summary>Hint 3 — the even-position mask</summary>

The mask `0x55555555` (hex) = `01010101010101010101010101010101` in binary — bits set at every **even** position (0, 2, 4, …).

If n is a power of 4, `n & 0x55555555 === n` (the set bit is at an even position, so the AND doesn't clear it).

```js
function isPowerOfFour(n) {
  return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;
}
```

Or more precisely: `(n & 0x55555555) === n` — same thing when there's exactly one bit.
</details>

## Write your solution
→ [`../solutions/19-power-of-two-or-four.js`](../solutions/19-power-of-two-or-four.js)

## Follow-ups
- Powers of 8 have their single bit at positions divisible by 3. What mask would you use?
- Can you check power of 3, power of 5, or power of 7 with a single bit trick? (Spoiler: no — only powers of 2 have this property because the binary system is base 2.)
- Verify: `0x55555555 === 1431655765`. What is `0xAAAAAAAA`? What positions does it cover?
