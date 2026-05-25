# Q18 — Sort Characters by Frequency

**Difficulty:** Medium
**Pattern:** Frequency map + max-heap
**Expected:** O(n log n) time · O(n) space

## Problem

Given a string `s`, sort it so that characters appear in **descending order of frequency**. If two characters have the same frequency, their relative order in the output does not matter.

Return the sorted string.

## Examples

### Example 1
```
Input:  "tree"
Output: "eert"  (or "eetr")
```
`e` appears twice, `r` and `t` each appear once.

### Example 2
```
Input:  "cccaaa"
Output: "cccaaa"  (or "aaaccc")
```
Both `c` and `a` appear 3 times. Either order is valid.

### Example 3
```
Input:  "Aabb"
Output: "bbAa"  (or "bbaA")
```
`b` appears twice, `A` and `a` appear once each. Note: uppercase and lowercase are treated as different characters.

### Example 4
```
Input:  "zzzzz"
Output: "zzzzz"
```

## Constraints
- `1 <= s.length <= 5 * 10^5`
- `s` consists of uppercase and lowercase English letters and digits.

## Hints

<details>
<summary>Hint 1 — count, then build</summary>

Two phases:
1. Count the frequency of each character.
2. Build the result by repeatedly placing the most frequent character.

A **max-heap** ordered by frequency automates step 2.
</details>

<details>
<summary>Hint 2 — build the output string</summary>

Pop `[freq, char]` from the max-heap. Append `char` repeated `freq` times to the result. Repeat until the heap is empty.

```
heap = maxHeap by frequency
heap contains: [(2,'e'), (1,'r'), (1,'t')]

pop (2,'e') → result = "ee"
pop (1,'r') → result = "eer"
pop (1,'t') → result = "eert"
```
</details>

<details>
<summary>Hint 3 — building the string efficiently</summary>

In JavaScript, string concatenation in a loop can be slow for large inputs. Use an array and join at the end:

```js
const parts = [];
while (!heap.isEmpty()) {
  const [freq, char] = heap.pop();
  parts.push(char.repeat(freq));
}
return parts.join('');
```
</details>

## Write your solution
→ [`../solutions/18-sort-characters-by-frequency.js`](../solutions/18-sort-characters-by-frequency.js)

## Follow-ups
- **Top K Frequent Elements** (Q9) — same frequency-map pattern, but you stop after k elements.
- **Reorganize String** (Q16) — harder constraint: no two adjacent characters can be the same.
- What if you also needed to sort characters of the same frequency alphabetically as a tiebreak?
