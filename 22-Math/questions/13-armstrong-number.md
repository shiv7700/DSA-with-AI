# Q13 — Armstrong Number

**Difficulty:** Easy
**Pattern:** Digit extraction
**Expected:** O(log n) time · O(1) space

## Problem

An **Armstrong number** (also called a narcissistic number) is a number that equals the sum of its own digits each raised to the power of the number of digits.

For a d-digit number n:
```
n is Armstrong  ↔  sum of (each digit ^ d) === n
```

Given a positive integer `n`, return `true` if it's an Armstrong number.

## Examples

### Example 1
```
Input:  n = 153
Output: true
```
3 digits. 1³ + 5³ + 3³ = 1 + 125 + 27 = 153. ✅

### Example 2
```
Input:  n = 370
Output: true
```
3³ + 7³ + 0³ = 27 + 343 + 0 = 370. ✅

### Example 3
```
Input:  n = 9474
Output: true
```
4 digits. 9⁴ + 4⁴ + 7⁴ + 4⁴ = 6561 + 256 + 2401 + 256 = 9474. ✅

### Example 4
```
Input:  n = 123
Output: false
```
1³ + 2³ + 3³ = 1 + 8 + 27 = 36 ≠ 123.

## Constraints
- `1 <= n <= 10^8`

## Hints

<details>
<summary>Hint 1 — count digits first</summary>

Before anything else, count how many digits `n` has. Call this `d`. Then extract each digit and raise it to the power `d`.
</details>

<details>
<summary>Hint 2 — digit extraction loop</summary>

```js
let temp = n;
let sum = 0;
while (temp > 0) {
  const digit = temp % 10;
  sum += Math.pow(digit, d);
  temp = Math.floor(temp / 10);
}
return sum === n;
```
</details>

## Write your solution
→ [`../solutions/13-armstrong-number.js`](../solutions/13-armstrong-number.js)

## Follow-ups
- Find all Armstrong numbers up to 10^6.
- How many 4-digit Armstrong numbers exist?
