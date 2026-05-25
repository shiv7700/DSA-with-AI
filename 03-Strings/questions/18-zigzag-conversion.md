# Q18 — ZigZag Conversion

**Difficulty:** Medium
**Pattern:** Simulate row assignment · array of row buckets
**Expected:** O(n) time · O(n) space

## Problem

Given a string `s` and a number of rows `numRows`, arrange the characters of `s` in a zigzag pattern on `numRows` rows. Then read the characters off row by row to produce the output.

The zigzag pattern works like this: you write characters going **down** the rows, and when you reach the bottom row, you **reverse direction** and go diagonally back **up**, and repeat.

### Visual example

`'PAYPALISHIRING'` with `numRows = 3`:

```
P   A   H   N
A P L S I I G
Y   I   R
```

Reading row by row: `'PAHNAPLSIIGYIR'`

`'PAYPALISHIRING'` with `numRows = 4`:

```
P     I    N
A   L S  I G
Y A   H R
P     I
```

Reading row by row: `'PINALSIGYAHRPI'`

## Examples

### Example 1
```
Input:  s = 'PAYPALISHIRING',  numRows = 3
Output: 'PAHNAPLSIIGYIR'
```

### Example 2
```
Input:  s = 'PAYPALISHIRING',  numRows = 4
Output: 'PINALSIGYAHRPI'
```

### Example 3 (edge cases)
```
Input:  s = 'A',  numRows = 1   →  'A'
Input:  s = 'AB', numRows = 1   →  'AB'
Input:  s = 'AB', numRows = 3   →  'AB'  (more rows than chars)
```

## Constraints
- `1 <= s.length <= 1000`
- `s` consists of English letters (both uppercase and lowercase), `','`, and `'.'`.
- `1 <= numRows <= 1000`

## Hints

<details>
<summary>Hint 1 — simulate with row buckets</summary>

Create an array of `numRows` empty strings (one per row). Walk through the characters, assigning each character to the correct row. Track:
- Current row: `curRow` (starts at 0)
- Direction: `goingDown` (starts as `false`)

When `curRow === 0`, switch to going down. When `curRow === numRows - 1`, switch to going up.
</details>

<details>
<summary>Hint 2 — direction switch logic</summary>

```js
const rows = Array.from({ length: Math.min(numRows, s.length) }, () => '');
let curRow = 0;
let goingDown = false;

for (const char of s) {
  rows[curRow] += char;
  if (curRow === 0 || curRow === numRows - 1) goingDown = !goingDown;
  curRow += goingDown ? 1 : -1;
}

return rows.join('');
```

Note: `Math.min(numRows, s.length)` handles the edge case where `numRows > s.length`.
</details>

<details>
<summary>Hint 3 — edge case: numRows === 1</summary>

When `numRows === 1`, there is no zigzag — the string is already the answer. The direction-switch logic above handles this correctly (it never switches direction), but you can also add an explicit early return:

```js
if (numRows === 1 || numRows >= s.length) return s;
```
</details>

## Write your solution
→ [`../solutions/18-zigzag-conversion.js`](../solutions/18-zigzag-conversion.js)

## Follow-ups
- Write the **inverse**: given a zigzag-encoded string and `numRows`, reconstruct the original string.
- What is the pattern of column widths? Can you compute which original index maps to which (row, col) without simulating?
- How would your solution change if the string was so large that it couldn't fit in memory all at once? (Hint: streaming zigzag.)
- Visualize the zigzag pattern for `numRows = 5` on a string of 20 characters.
