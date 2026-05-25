# Q9 — Palindrome Number

**Difficulty:** Easy
**Pattern:** Digit extraction / reverse half
**Expected:** O(log n) time · O(1) space

## Problem

Given an integer `x`, return `true` if `x` reads the same forwards and backwards (it is a **palindrome**), and `false` otherwise.

**Solve it without converting the number to a string.**

## Examples

### Example 1
```
Input:  x = 121
Output: true
```
121 reads the same from left to right as right to left.

### Example 2
```
Input:  x = -121
Output: false
```
Left to right: -121. Right to left: 121-. Not the same.

### Example 3
```
Input:  x = 10
Output: false
```
Reads 01 from right to left — not the same.

### Example 4
```
Input:  x = 1221
Output: true
```

## Constraints
- `-2^31 <= x <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — quick eliminations</summary>

- Any negative number cannot be a palindrome (because of the `-` sign).
- Any number ending in 0 (other than 0 itself) cannot be a palindrome — the reversed version would start with 0, which is invalid.
</details>

<details>
<summary>Hint 2 — reverse the whole number</summary>

Use your `reverseNumber` from Q8. If the reversed number equals the original (and didn't overflow), it's a palindrome.
</details>

<details>
<summary>Hint 3 — smarter: only reverse half the digits</summary>

You only need to reverse the second half of the number and compare it to the first half. This avoids overflow concerns.

Keep extracting the last digit of `x` (via `x % 10`) and building `reversedHalf = reversedHalf * 10 + lastDigit`. Stop when `reversedHalf >= x` (you've reversed half the digits). Then check `x === reversedHalf` (even digits) or `x === Math.trunc(reversedHalf / 10)` (odd digits, drop the middle digit).
</details>

## Write your solution
→ [`../solutions/09-palindrome-number.js`](../solutions/09-palindrome-number.js)

## Follow-ups
- Find the smallest 6-digit palindrome number.
- Is there any even number > 10 that is a palindrome? What would it look like?
