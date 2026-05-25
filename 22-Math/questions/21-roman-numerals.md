# Q21 — Roman to Integer / Integer to Roman

**Difficulty:** Medium
**Pattern:** Lookup table; greedy subtraction
**Expected:** O(1) time · O(1) space (input bounded)

## Problem

Implement both directions:

1. **romanToInt(s):** Convert a Roman numeral string to its integer value.
2. **intToRoman(num):** Convert an integer to a Roman numeral string.

### Roman numeral rules

| Symbol | Value |
|--------|-------|
| I | 1 |
| V | 5 |
| X | 10 |
| L | 50 |
| C | 100 |
| D | 500 |
| M | 1000 |

Subtractive notation (special cases):
- `IV = 4`, `IX = 9`
- `XL = 40`, `XC = 90`
- `CD = 400`, `CM = 900`

## Examples

### Example 1
```
Input:  "III"     → 3
Input:  "IV"      → 4
Input:  "IX"      → 9
Input:  "LVIII"   → 58    (L=50, V=5, III=3)
Input:  "MCMXCIV" → 1994  (M=1000, CM=900, XC=90, IV=4)
```

### Example 2
```
Input:  3     → "III"
Input:  4     → "IV"
Input:  1994  → "MCMXCIV"
Input:  3749  → "MMMDCCXLIX"
```

## Constraints
- `1 <= num <= 3999`
- Input is a valid Roman numeral.

## Hints

<details>
<summary>Hint 1 — romanToInt: scan left to right</summary>

For each character, look up its value. If the current symbol is **less** than the next one (subtractive case), subtract it. Otherwise add it.

```js
if (values[s[i]] < values[s[i + 1]]) result -= values[s[i]];
else result += values[s[i]];
```
</details>

<details>
<summary>Hint 2 — intToRoman: greedy subtraction</summary>

Build a lookup table of value-symbol pairs in descending order, including the subtractive pairs:
```
[1000,'M'], [900,'CM'], [500,'D'], [400,'CD'], [100,'C'],
[90,'XC'],  [50,'L'],  [40,'XL'], [10,'X'],
[9,'IX'],   [5,'V'],   [4,'IV'],  [1,'I']
```

Greedily subtract the largest value that fits, appending the corresponding symbol each time.
</details>

## Write your solution
→ [`../solutions/21-roman-numerals.js`](../solutions/21-roman-numerals.js)

## Follow-ups
- What's the longest Roman numeral string for a number under 4000?
- Extend the system to handle numbers over 3999 (using the overline notation where a bar over a numeral multiplies by 1000).
