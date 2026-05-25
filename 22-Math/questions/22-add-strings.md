# Q22 — Add Two Numbers as Strings

**Difficulty:** Medium
**Pattern:** Simulate grade-school addition digit by digit
**Expected:** O(max(m, n)) time · O(max(m, n)) space

## Problem

Given two non-negative integers represented as **strings** `num1` and `num2`, return their sum as a string.

**Rules:**
- You may not convert the inputs to integers or use BigInt.
- You may not use any built-in library for big integer addition.

## Examples

### Example 1
```
Input:  num1 = "11", num2 = "123"
Output: "134"
```

### Example 2
```
Input:  num1 = "456", num2 = "77"
Output: "533"
```

### Example 3
```
Input:  num1 = "9999", num2 = "1"
Output: "10000"
```

## Constraints
- `1 <= num1.length, num2.length <= 10^4`
- Both strings consist of digits only.
- Neither string has leading zeros (except "0" itself).

## Hints

<details>
<summary>Hint 1 — start from the rightmost digits</summary>

Just like grade-school addition: start from the ones place (the right end), add digits plus any carry, record the result digit, propagate the carry left.

Use two pointers starting at the end of each string.
</details>

<details>
<summary>Hint 2 — convert characters to digits</summary>

```js
const d1 = i >= 0 ? num1.charCodeAt(i) - 48 : 0;
const d2 = j >= 0 ? num2.charCodeAt(j) - 48 : 0;
```

`'0'.charCodeAt(0) = 48`, so subtracting 48 converts a digit character to its numeric value.
</details>

<details>
<summary>Hint 3 — don't forget the final carry</summary>

After the loop, if `carry === 1`, prepend '1' to your result.
</details>

## Write your solution
→ [`../solutions/22-add-strings.js`](../solutions/22-add-strings.js)

## Follow-ups
- Implement string subtraction (`num1 - num2`, assuming `num1 >= num2`).
- What changes if the numbers can be negative?
