# Q26 — Roman to Integer

**Difficulty:** Medium (easy once you have the lookup table)
**Pattern:** Hash map as a lookup table
**Expected:** O(n) time · O(1) space

## Problem

Roman numerals are represented by seven symbols:

| Symbol | Value |
|--------|-------|
| I | 1 |
| V | 5 |
| X | 10 |
| L | 50 |
| C | 100 |
| D | 500 |
| M | 1000 |

There are six subtractive cases:
- `IV` = 4 (not `IIII`)
- `IX` = 9
- `XL` = 40
- `XC` = 90
- `CD` = 400
- `CM` = 900

Given a roman numeral string `s`, convert it to an integer.

## Examples

### Example 1
```
Input:  "III"
Output: 3
```

### Example 2
```
Input:  "LVIII"
Output: 58
```
`L = 50, V = 5, III = 3`.

### Example 3
```
Input:  "MCMXCIV"
Output: 1994
```
`M = 1000, CM = 900, XC = 90, IV = 4`.

## Constraints
- `1 <= s.length <= 15`
- `s` contains only the characters `'I', 'V', 'X', 'L', 'C', 'D', 'M'`.
- It is guaranteed that `s` is a valid roman numeral in the range `[1, 3999]`.

## Hints

<details>
<summary>Hint 1 — the subtraction rule</summary>

Walk the string left to right. If the current symbol's value is **less than** the next symbol's value, it's a subtractive case — subtract the current value. Otherwise, add it.

Example: `"IX"` → `I` (1) is less than `X` (10) → subtract → result += -1 + 10 = 9.
</details>

<details>
<summary>Hint 2 — code skeleton</summary>

```js
const val = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
let result = 0;
for (let i = 0; i < s.length; i++) {
  if (i + 1 < s.length && val[s[i]] < val[s[i + 1]]) {
    result -= val[s[i]];
  } else {
    result += val[s[i]];
  }
}
return result;
```

The lookup table here is a plain object (7 known keys — a perfect case for `Object`, not `Map`).
</details>

## Write your solution
→ [`../solutions/26-roman-to-integer.js`](../solutions/26-roman-to-integer.js)

## Follow-ups
- **Integer to Roman** — the reverse conversion.
- At what point would you prefer a `Map` over a plain object for a lookup table like this?
