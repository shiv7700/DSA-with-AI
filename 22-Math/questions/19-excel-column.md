# Q19 — Excel Sheet Column Number / Title

**Difficulty:** Medium
**Pattern:** Base-26 number system (1-indexed)
**Expected:** O(n) time · O(n) space (for title)

## Problem

Excel columns are labelled A, B, …, Z, AA, AB, …, AZ, BA, … — like a base-26 number system, but **1-indexed** (there is no "zero" column).

Implement both directions:
1. **columnToNumber(s):** given a column title like `"AB"`, return its 1-based column number.
2. **numberToColumn(n):** given a 1-based column number, return its title.

## Examples

### Example 1 (title → number)
```
Input:  "A"
Output: 1

Input:  "Z"
Output: 26

Input:  "AA"
Output: 27

Input:  "AB"
Output: 28

Input:  "ZY"
Output: 701
```

### Example 2 (number → title)
```
Input:  1   → "A"
Input:  26  → "Z"
Input:  27  → "AA"
Input:  701 → "ZY"
```

## Constraints
- `1 <= column number <= 2^31 - 1`
- Column titles use only uppercase English letters.

## Hints

<details>
<summary>Hint 1 — title → number (like reading a base-26 number)</summary>

Process characters left to right. For each character, multiply the running total by 26 and add the value of the current letter (A=1, B=2, …, Z=26).

```js
let result = 0;
for (const ch of s) {
  result = result * 26 + (ch.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
}
```
</details>

<details>
<summary>Hint 2 — number → title (like converting from base 10 to base 26, but 1-indexed)</summary>

The tricky part: the system is 1-indexed (no zero digit). Handle by subtracting 1 before taking mod 26, which shifts it to 0-indexed.

```js
const result = [];
while (n > 0) {
  n--;                          // shift to 0-indexed
  result.push(String.fromCharCode('A'.charCodeAt(0) + n % 26));
  n = Math.floor(n / 26);
}
return result.reverse().join('');
```
</details>

## Write your solution
→ [`../solutions/19-excel-column.js`](../solutions/19-excel-column.js)

## Follow-ups
- How many 3-letter Excel column titles exist? (26³ = 17576.)
- What is the column title for column 18278?
