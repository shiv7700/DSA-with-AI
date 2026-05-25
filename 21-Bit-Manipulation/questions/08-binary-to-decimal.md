# Q8 — Binary String to Decimal

**Difficulty:** Easy
**Pattern:** Left shift accumulation (or Horner's method)
**Expected:** O(n) time · O(1) space (n = length of the string)

## Problem

Given a string `s` that represents a binary number (only `'0'` and `'1'` characters, no leading zeros except for the number `"0"` itself), return its **decimal integer value** — **without** using `parseInt(s, 2)` or `Number('0b' + s)`.

> **Why this matters:** Reading a binary string bit by bit reinforces the place-value system. The accumulator pattern you use here — "shift left and OR in the next bit" — is the exact same pattern used when parsing and reassembling binary data in networking and compression code.

## Examples

### Example 1
```
Input:  '101'
Output: 5
```
1×4 + 0×2 + 1×1 = 5.

### Example 2
```
Input:  '0'
Output: 0
```

### Example 3
```
Input:  '11111111'
Output: 255
```

### Example 4
```
Input:  '10000000000'
Output: 1024
```

## Constraints
- `1 <= s.length <= 30`
- `s` consists only of `'0'` and `'1'`.
- `s` has no leading zeros (except the single string `'0'`).

## Hints

<details>
<summary>Hint 1 — process left to right with an accumulator</summary>

Walk through the string from left to right. Maintain an accumulator `result`. For each character:

1. Shift `result` left by 1 (multiply by 2 — makes room for the next bit).
2. OR in the current bit (0 or 1).

```
s = '101'

result = 0
bit '1': result = (0 << 1) | 1 = 1
bit '0': result = (1 << 1) | 0 = 2
bit '1': result = (2 << 1) | 1 = 5

Final: 5 ✓
```
</details>

<details>
<summary>Hint 2 — extracting the numeric bit value</summary>

`s[i]` is a character, not a number. Convert it with `Number(s[i])` or `s.charCodeAt(i) - 48` (ASCII '0' = 48).
</details>

<details>
<summary>Hint 3 — is this safe for 30-bit strings?</summary>

2^30 = 1,073,741,824 — well within JavaScript's safe integer range (2^53 - 1). So regular numbers work fine. You only need BigInt for strings longer than 53 bits.
</details>

## Write your solution
→ [`../solutions/08-binary-to-decimal.js`](../solutions/08-binary-to-decimal.js)

## Follow-ups
- Generalize to any base `b` (not just binary): `parseInt` does this, but implement it yourself.
- What happens if the input string is 64 characters long? When would you need BigInt?
- Write the inverse function (decimal → binary string) from Q7 and verify the round-trip.
