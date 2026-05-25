# Q9 — Partition Labels

**Difficulty:** Medium
**Pattern:** Greedy · Last-Occurrence Tracking
**Expected:** O(n) time · O(1) space (26-char alphabet)

## Problem

You are given a string `s`. Partition it into as many parts as possible such that **each letter appears in at most one part**. Return a list of integers representing the size of each part, in the order they appear.

> **In other words:** each character's every occurrence must be in the same partition. Cut the string into the maximum number of such pieces.

## Examples

### Example 1
```
Input:  s = "ababcbacadefegdehijhklij"
Output: [9, 7, 8]
```
Partition: "ababcbaca" | "defegde" | "hijhklij"
- All occurrences of 'a', 'b', 'c' are in part 1.
- All occurrences of 'd', 'e', 'f', 'g' are in part 2.
- All occurrences of 'h', 'i', 'j', 'k', 'l' are in part 3.

### Example 2
```
Input:  s = "eccbbbbdec"
Output: [10]
```
All characters share the string — only one partition possible.

### Example 3
```
Input:  s = "abcd"
Output: [1, 1, 1, 1]
```
Each character appears exactly once — maximum partition.

## Constraints
- `1 <= s.length <= 500`
- `s` consists of lowercase English letters only.

## Hints

<details>
<summary>Hint 1 — what's the greedy rule?</summary>

A partition must extend until the last occurrence of every character it has seen so far. Start at index 0. As you scan right, keep track of the **furthest last-occurrence** of any character seen so far. When your current index equals that furthest last-occurrence, you've found the end of a partition.

Think of it like the activity-selection problem but backwards: you're expanding a partition's right boundary greedily until you can safely cut.
</details>

<details>
<summary>Hint 2 — implementation sketch</summary>

Step 1: precompute `lastIndex[c]` = the last position where character `c` appears.

Step 2: walk through `s`. Maintain `partitionEnd` (the furthest last-occurrence seen). When `i == partitionEnd`, record the partition size and reset.

```js
const last = {};
for (let i = 0; i < s.length; i++) last[s[i]] = i;

let start = 0, end = 0;
const result = [];
for (let i = 0; i < s.length; i++) {
  end = Math.max(end, last[s[i]]);
  if (i === end) {
    result.push(end - start + 1);
    start = i + 1;
  }
}
return result;
```
</details>

<details>
<summary>Hint 3 — why does it work?</summary>

When `i === end`, every character we've encountered in `[start..i]` has its last occurrence at or before `i`. So we can cut here. We cut as early as possible (greedy), maximizing the total number of partitions.
</details>

## Write your solution
→ [`../solutions/09-partition-labels.js`](../solutions/09-partition-labels.js)

## Follow-ups
- What if you needed to return the actual substrings rather than their lengths?
- What if a character was allowed to appear in at most **two** parts?
