# Q15 — String Compression

**Difficulty:** Medium
**Pattern:** Two pointers · array + join build
**Expected:** O(n) time · O(n) space

## Problem

Given a string `s`, compress it using **run-length encoding**: replace consecutive sequences of the same character with the character followed by its count.

Rules:
- If a character appears only once consecutively, include the count `1` (e.g., `'b'` → `'b1'`).
- The compressed string must represent the same information as the original.
- Return the compressed string. If the compressed string is **not shorter** than the original, return the original.

## Examples

### Example 1
```
Input:  'aabcccccaaa'
Output: 'a2b1c5a3'
```
`aa` → `a2`, `b` → `b1`, `ccccc` → `c5`, `aaa` → `a3`. Length 8 < 11, so return compressed.

### Example 2
```
Input:  'abcdef'
Output: 'abcdef'
```
Compressed would be `'a1b1c1d1e1f1'` (length 12 > 6), so return original.

### Example 3
```
Input:  'aaabbbccc'
Output: 'a3b3c3'
```
Length 6 < 9.

### Example 4 (edge cases)
```
Input:  ''    →  ''
Input:  'a'   →  'a'   (compressed 'a1' is longer, return 'a')
Input:  'aa'  →  'aa'  (compressed 'a2' same length — return original per the "not shorter" rule)
```

## Constraints
- `0 <= s.length <= 10^5`
- `s` consists of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — scan with a count</summary>

Walk through the string. Keep a counter for the current run. When the character changes (or you reach the end), record the character and the count:

```
i = 0, count = 1
while i < s.length:
  if s[i] === s[i-1]: count++
  else: record(s[i-1], count); count = 1
```

Handle the last run after the loop ends.
</details>

<details>
<summary>Hint 2 — use array + join to build the result</summary>

Avoid `+=` concatenation in the loop — use an array and join at the end:

```js
const parts = [];
let count = 1;

for (let i = 1; i <= s.length; i++) {
  if (i < s.length && s[i] === s[i - 1]) {
    count++;
  } else {
    parts.push(s[i - 1] + count);
    count = 1;
  }
}

const compressed = parts.join('');
```

The loop condition `i <= s.length` (not `i < s.length`) ensures the last run is processed when `i === s.length`.
</details>

<details>
<summary>Hint 3 — compare lengths and return</summary>

```js
return compressed.length < s.length ? compressed : s;
```

The problem says "if the compressed string is not shorter, return the original." This single line handles that.
</details>

## Write your solution
→ [`../solutions/15-string-compression.js`](../solutions/15-string-compression.js)

## Follow-ups
- **Decompress** a run-length-encoded string: `'a2b1c5a3'` → `'aabcccccaaa'`.
- What if the count could be multi-digit? For example, `'aaaaaaaaaaaa'` (12 `a`s) → `'a12'`. Does your decompression handle parsing `'12'` correctly?
- **Lossless data compression**: explain how run-length encoding differs from Huffman coding. When is RLE better?
- Implement an in-place version that compresses the array of characters (the LeetCode version of this problem — it uses an integer division trick to write results back to the front of the array).
