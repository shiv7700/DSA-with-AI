# Q17 — Integer to Roman / Roman to Integer

**Difficulty:** Medium
**Pattern:** Greedy (integer → Roman) · linear scan with lookahead (Roman → integer)
**Expected:** O(1) time · O(1) space (bounded by the fixed set of Roman numeral symbols)

## Problem

Implement two functions:

**Part A — `intToRoman(num)`:** Convert an integer `num` to its Roman numeral representation.

**Part B — `romanToInt(s)`:** Convert a Roman numeral string `s` to an integer.

### Roman numeral rules
| Symbol | Value |
|---|---|
| I | 1 |
| V | 5 |
| X | 10 |
| L | 50 |
| C | 100 |
| D | 500 |
| M | 1000 |

**Subtractive notation** (the six special cases):
- `IV` = 4, `IX` = 9
- `XL` = 40, `XC` = 90
- `CD` = 400, `CM` = 900

## Examples

### intToRoman
```
Input:  3    →  Output: 'III'
Input:  4    →  Output: 'IV'
Input:  9    →  Output: 'IX'
Input:  58   →  Output: 'LVIII'   (L=50, V=5, III=3)
Input:  1994 →  Output: 'MCMXCIV' (M=1000, CM=900, XC=90, IV=4)
```

### romanToInt
```
Input:  'III'     →  Output: 3
Input:  'LVIII'   →  Output: 58
Input:  'MCMXCIV' →  Output: 1994
```

## Constraints
- `1 <= num <= 3999`
- `s` is a valid Roman numeral in the range `[1, 3999]`.

## Hints

<details>
<summary>Hint 1 — intToRoman: greedy approach</summary>

Create a list of (value, symbol) pairs in **decreasing order**, including the subtractive combinations:

```js
const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
```

For each (value, symbol) pair, repeatedly subtract the value from `num` and append the symbol to the result, as long as `num >= value`.

This greedy approach works because we process from largest to smallest.
</details>

<details>
<summary>Hint 2 — romanToInt: scan and handle subtractive cases</summary>

Build a map of single symbol values. Walk left to right. For each character:
- If the **next** character has a **larger** value than the current one, it's a subtractive pair — **subtract** the current value.
- Otherwise, **add** the current value.

```js
const val = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
let total = 0;
for (let i = 0; i < s.length; i++) {
  const curr = val[s[i]];
  const next = val[s[i + 1]];
  if (next && next > curr) total -= curr;
  else total += curr;
}
return total;
```
</details>

<details>
<summary>Hint 3 — why this works for romanToInt</summary>

In a valid Roman numeral, the only time a smaller symbol appears before a larger one is in one of the six subtractive cases (`IV`, `IX`, etc.). So checking "is the next symbol larger?" is sufficient to detect all subtractive cases. No other lookahead is needed.
</details>

## Write your solution
→ [`../solutions/17-roman-numerals.js`](../solutions/17-roman-numerals.js)

## Follow-ups
- What is the time complexity? (Hint: the number is bounded by 3999, so both functions do at most a fixed number of operations — technically O(1).)
- Extend the range to handle numbers up to 1,000,000 by adding symbols like `V̄` (5,000), `X̄` (10,000), etc.
- Write a validator: given a string, determine if it is a valid Roman numeral (in the range 1–3999, following all Roman numeral rules).
- How would you handle the number 0? (Romans didn't have a symbol for zero.)
