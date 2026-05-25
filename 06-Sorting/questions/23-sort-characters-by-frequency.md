# Q23 — Sort Characters by Frequency

**Difficulty:** Medium
**Pattern:** Frequency map + sort
**Expected:** O(n log n) time · O(n) space

## Problem

Given a string `s`, sort its characters in **decreasing order of frequency** (most frequent characters first). If two characters have the same frequency, their relative order can be arbitrary.

Return the sorted string.

## Examples

### Example 1
```
Input:  "tree"
Output: "eert"  (or "eetr")
```
'e' appears 2 times, 't' and 'r' appear once each.
'e' must come first.

### Example 2
```
Input:  "cccaaa"
Output: "cccaaa"  (or "aaaccc")
```
'c' appears 3 times, 'a' appears 3 times. Either order is valid.

### Example 3
```
Input:  "Aabb"
Output: "bbAa"  (or "bbaA")
```
'b' appears 2 times, 'A' and 'a' each appear once. 'A' and 'a' are different characters.

### Example 4
```
Input:  "z"
Output: "z"
```

## Constraints
- `1 <= s.length <= 5 × 10^5`
- `s` consists of uppercase and lowercase English letters and digits.

## Hints

<details>
<summary>Hint 1 — count frequencies</summary>

Use a `Map` (or plain object) to count how many times each character appears:

```js
const freq = new Map();
for (const c of s) {
  freq.set(c, (freq.get(c) || 0) + 1);
}
```
</details>

<details>
<summary>Hint 2 — sort unique characters by frequency</summary>

Get the unique characters, then sort them by their frequency (descending):

```js
const chars = [...freq.keys()].sort((a, b) => freq.get(b) - freq.get(a));
```
</details>

<details>
<summary>Hint 3 — build the result string</summary>

For each character in the sorted order, append it `freq.get(char)` times:

```js
return chars.map(c => c.repeat(freq.get(c))).join('');
```

`'e'.repeat(3)` → `'eee'`.
</details>

## Write your solution
→ [`../solutions/23-sort-characters-by-frequency.js`](../solutions/23-sort-characters-by-frequency.js)

## Follow-ups
- Solve in O(n) using bucket sort: create n+1 buckets indexed by frequency, place characters in their frequency bucket, then read from highest to lowest.
- **Top K Frequent Elements** (a related problem): given an array of integers, return the `k` most frequent elements.
- What if you must sort **stably** by frequency (characters with the same frequency keep their first-occurrence order)?
