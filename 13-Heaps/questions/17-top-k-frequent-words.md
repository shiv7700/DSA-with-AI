# Q17 — Top K Frequent Words

**Difficulty:** Medium
**Pattern:** Frequency map + min-heap with custom comparator (frequency, then lexicographic order)
**Expected:** O(n log k) time · O(n) space

## Problem

Given an array of strings `words` and an integer `k`, return the `k` most frequent words. Return the answer sorted by frequency from highest to lowest. Words with the same frequency should be sorted lexicographically (alphabetically).

## Examples

### Example 1
```
Input:  words = ["i","love","leetcode","i","love","coding"],  k = 2
Output: ["i", "love"]
```
`"i"` appears 2 times, `"love"` appears 2 times. Both have frequency 2. Alphabetically, `"i"` < `"love"`.

### Example 2
```
Input:  words = ["the","day","is","sunny","the","the","the","sunny","is","is"],  k = 4
Output: ["the", "is", "sunny", "day"]
```
Frequencies: `the`→4, `is`→3, `sunny`→2, `day`→1.

### Example 3
```
Input:  words = ["a", "aa", "aaa"],  k = 1
Output: ["aaa"]
```
All appear once. Lexicographically: `"a"` < `"aa"` < `"aaa"`, so the largest alphabetically... wait, re-read. Sorted lexicographically ascending means `"a"` first. But the problem says k=1 and all have frequency 1, so return the lexicographically smallest: `["a"]`.
Actually with `k=1` and all frequencies equal: sorted lexicographically means `"a"` is first — return `["a"]`.

## Constraints
- `1 <= words.length <= 500`
- `1 <= words[i].length <= 10`
- `words[i]` consists of lowercase English letters only.
- `k` is in the range `[1, number of unique words]`

## Hints

<details>
<summary>Hint 1 — build a frequency map, then apply the top-K heap pattern</summary>

Count word frequencies with a `Map`. Then use a min-heap of size `k` on `(frequency, word)` pairs. The comparator needs a tiebreak: among equal-frequency words, the one that comes **later** alphabetically should be evicted first (so the lexicographically smaller word survives).
</details>

<details>
<summary>Hint 2 — the comparator for the min-heap</summary>

In a min-heap, the root is the element with the *lowest* priority — the one you'd evict first. So:

- Lower frequency → lower priority → evicted first. ✅
- Same frequency + later alphabetically → lower priority → evicted first. ✅

```js
// Returns negative if a should be EVICTED before b (a has lower priority)
(a, b) => {
  if (a.freq !== b.freq) return a.freq - b.freq;   // lower freq evicted first
  return a.word > b.word ? -1 : 1;                 // later alpha evicted first
}
```
</details>

<details>
<summary>Hint 3 — reverse the result</summary>

The min-heap pops elements in ascending priority order (least frequent / latest alphabetical first). After dumping all k elements from the heap, reverse the array to get the correct descending-frequency, ascending-alphabetical order.
</details>

## Write your solution
→ [`../solutions/17-top-k-frequent-words.js`](../solutions/17-top-k-frequent-words.js)

## Follow-ups
- **Top K frequent elements** (Q9) — same pattern with integers instead of strings (no tiebreak needed).
- What if you needed the result in real time as words streamed in?
- Can you solve this in O(n log n) with a simple sort on the frequency map entries?
