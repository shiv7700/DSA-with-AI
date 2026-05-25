# Q11 — Sum of Digits

**Difficulty:** Easy
**Pattern:** Digit extraction with modulo
**Expected:** O(log n) time · O(1) space

## Problem

Given a non-negative integer `n`, return the sum of all its digits.

## Examples

### Example 1
```
Input:  n = 123
Output: 6
```
1 + 2 + 3 = 6.

### Example 2
```
Input:  n = 9999
Output: 36
```

### Example 3
```
Input:  n = 0
Output: 0
```

### Example 4
```
Input:  n = 1000001
Output: 2
```

## Constraints
- `0 <= n <= 10^12`

## Hints

<details>
<summary>Hint 1 — extracting digits one at a time</summary>

Use `n % 10` to get the last digit. Add it to your sum. Then `n = Math.floor(n / 10)` to remove that digit. Repeat until `n === 0`.
</details>

<details>
<summary>Hint 2 — loop template</summary>

```js
let sum = 0;
while (n > 0) {
  sum += n % 10;
  n = Math.floor(n / 10);
}
return sum;
```
</details>

## Write your solution
→ [`../solutions/11-sum-of-digits.js`](../solutions/11-sum-of-digits.js)

## Follow-ups
- **Digital root:** repeatedly sum the digits until you get a single digit. What pattern do you notice? (Hint: `(n - 1) % 9 + 1` for n > 0.)
- Count how many times the digit 7 appears in all numbers from 1 to n.
