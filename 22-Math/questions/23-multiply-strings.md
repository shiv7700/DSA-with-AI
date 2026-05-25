# Q23 — Multiply Strings

**Difficulty:** Medium
**Pattern:** Simulate grade-school long multiplication
**Expected:** O(m × n) time · O(m + n) space

## Problem

Given two non-negative integers represented as strings `num1` and `num2`, return their product as a string.

**Rules:**
- You may not convert the inputs to integers or use BigInt.
- You may not use built-in big integer multiplication.

## Examples

### Example 1
```
Input:  num1 = "2", num2 = "3"
Output: "6"
```

### Example 2
```
Input:  num1 = "123", num2 = "456"
Output: "56088"
```

### Example 3
```
Input:  num1 = "0", num2 = "999"
Output: "0"
```

## Constraints
- `1 <= num1.length, num2.length <= 200`
- Both strings consist of digits only.
- Neither has leading zeros except "0" itself.

## Hints

<details>
<summary>Hint 1 — the position trick</summary>

When you multiply the digit at index `i` in `num1` by the digit at index `j` in `num2`, the result contributes to positions `i + j` and `i + j + 1` in the output (counting from the left).

Create a result array of size `m + n`, fill it with 0s, and accumulate partial products.
</details>

<details>
<summary>Hint 2 — algorithm sketch</summary>

```
for i from num1.length-1 down to 0:
  for j from num2.length-1 down to 0:
    product = digit(i) * digit(j)
    p1 = i + j, p2 = i + j + 1
    sum = product + result[p2]
    result[p2] = sum % 10
    result[p1] += sum / 10    (integer division)
```
</details>

<details>
<summary>Hint 3 — remove leading zeros</summary>

After building the result array, convert to a string and strip leading zeros, but keep at least one digit.
</details>

## Write your solution
→ [`../solutions/23-multiply-strings.js`](../solutions/23-multiply-strings.js)

## Follow-ups
- What's the time complexity of your solution? Is Karatsuba's O(n^1.585) worth implementing for this problem?
- Implement string division (given `num1` and `num2`, return `Math.floor(num1 / num2)` as a string).
