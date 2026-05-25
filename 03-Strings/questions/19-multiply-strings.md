# Q19 — Multiply Strings

**Difficulty:** Medium
**Pattern:** Grade-school multiplication simulation · array of digits
**Expected:** O(m · n) time · O(m + n) space

## Problem

Given two non-negative integers represented as strings `num1` and `num2`, return their product, also represented as a string.

**Constraints:**
- You may not convert the inputs to integers (no `parseInt`, `Number`, `BigInt`).
- You may not use any built-in big integer library.

> **Why this problem?** It tests whether you understand how multiplication works at the digit level — the same algorithm you learned in elementary school, but coded up. It also forces you to work with string-represented numbers, which is a common requirement when dealing with numbers too large for JavaScript's `Number` type (which maxes out at 2^53 - 1).

## Examples

### Example 1
```
Input:  num1 = '2',   num2 = '3'
Output: '6'
```

### Example 2
```
Input:  num1 = '123',  num2 = '456'
Output: '56088'
```

### Example 3
```
Input:  num1 = '999',  num2 = '999'
Output: '998001'
```

### Example 4 (edge cases)
```
Input:  num1 = '0',  num2 = '12345'   →  '0'
Input:  num1 = '1',  num2 = '9'       →  '9'
```

## Constraints
- `1 <= num1.length, num2.length <= 200`
- `num1` and `num2` consist of digits only.
- Both `num1` and `num2` do not have leading zeros, except the number `'0'` itself.

## Hints

<details>
<summary>Hint 1 — grade-school multiplication layout</summary>

When you multiply `123 × 456` by hand:

```
      1 2 3
    × 4 5 6
    -------
      7 3 8   (123 × 6)
    6 1 5     (123 × 5, shifted one position left)
  4 9 2       (123 × 4, shifted two positions left)
  ---------
  5 6 0 8 8
```

A digit from `num1` at position `i` (from the right) and a digit from `num2` at position `j` (from the right) contributes to position `i + j` in the result array (counting from the right).
</details>

<details>
<summary>Hint 2 — result array approach</summary>

Create a result array of length `m + n` (where `m` and `n` are the lengths of `num1` and `num2`). This is the maximum possible length of the product.

For each digit pair `(i, j)` from the right ends of `num1` and `num2`:
- Compute the product: `d = digit1 * digit2`
- Add `d` to position `i + j + 1` in the result array.
- Carry over to position `i + j`.

```js
const m = num1.length, n = num2.length;
const pos = new Array(m + n).fill(0);

for (let i = m - 1; i >= 0; i--) {
  for (let j = n - 1; j >= 0; j--) {
    const mul = (num1[i] - '0') * (num2[j] - '0');
    const p1 = i + j, p2 = i + j + 1;
    const sum = mul + pos[p2];
    pos[p2] = sum % 10;
    pos[p1] += Math.floor(sum / 10);
  }
}
```
</details>

<details>
<summary>Hint 3 — convert result array to string</summary>

After filling the array, convert to a string and strip leading zeros:

```js
const result = pos.join('').replace(/^0+/, '') || '0';
return result;
```

`replace(/^0+/, '')` removes leading zeros. The `|| '0'` handles the case where all digits are zero (product is `'0'`).
</details>

## Write your solution
→ [`../solutions/19-multiply-strings.js`](../solutions/19-multiply-strings.js)

## Follow-ups
- Implement **addition** of two large numbers represented as strings (simpler, good warmup).
- Implement **subtraction** of two large numbers as strings (need to handle borrowing and sign).
- What is the time complexity if you used the grade-school algorithm here? Can you do better? (Hint: Karatsuba's algorithm runs in O(n^1.585).)
- JavaScript now has `BigInt` natively. When would you still want to implement big number arithmetic by hand?
