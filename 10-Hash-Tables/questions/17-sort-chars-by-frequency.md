# Q17 — Sort Characters by Frequency

**Difficulty:** Medium
**Pattern:** Frequency map + sort
**Expected:** O(n log n) time · O(n) space

## Problem

Given a string `s`, sort it so that characters that appear more frequently come first. If two characters have the same frequency, either can come first.

Return the resulting string.

## Examples

### Example 1
```
Input:  "tree"
Output: "eert"
```
`'e'` appears twice; `'t'` and `'r'` appear once. Output: `"eert"` or `"eetr"`.

### Example 2
```
Input:  "cccaaa"
Output: "cccaaa"
```
Both `'c'` and `'a'` appear 3 times. Either order is valid: `"cccaaa"` or `"aaaccc"`.

### Example 3
```
Input:  "Aabb"
Output: "bbAa"
```
`'b'` appears twice, `'A'` and `'a'` appear once. (`'A'` and `'a'` are different characters.)

## Constraints
- `1 <= s.length <= 5 * 10^5`
- `s` consists of uppercase and lowercase English letters and digits.

## Hints

<details>
<summary>Hint 1 — frequency map first</summary>

Build a frequency map (`char → count`). Then sort the unique characters by their count in descending order. Finally, build the output string by repeating each character its count number of times.
</details>

<details>
<summary>Hint 2 — building the result</summary>

```js
const freq = new Map();
for (const c of s) freq.set(c, (freq.get(c) ?? 0) + 1);

return [...freq.entries()]
  .sort((a, b) => b[1] - a[1])            // sort by frequency desc
  .map(([char, count]) => char.repeat(count))
  .join('');
```
</details>

## Write your solution
→ [`../solutions/17-sort-chars-by-frequency.js`](../solutions/17-sort-chars-by-frequency.js)

## Follow-ups
- Can you do this in O(n) time using bucket sort (same idea as Q16)?
- What if you need the output to be lexicographically smallest among all valid answers?
