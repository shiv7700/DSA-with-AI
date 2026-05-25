# Q22 — Get Equal Substrings Within Budget

**Difficulty:** Medium (LeetCode 1208)
**Pattern:** Variable-size sliding window
**Expected:** O(n) time · O(1) space

## Problem

You are given two strings `s` and `t` of the same length, and an integer `maxCost`. You want to change `s` to `t`. Changing the `i`-th character of `s` to the `i`-th character of `t` costs `|s[i] - t[i]|` (absolute difference of ASCII values).

Return the **maximum length of a substring of `s`** that can be changed to the corresponding substring of `t` with a cost **at most `maxCost`**.

## Examples

### Example 1
```
Input:  s = "abcd",  t = "bcdf",  maxCost = 3
Output: 3
```
- Costs: |a-b|=1, |b-c|=1, |c-d|=1, |d-f|=2
- Window [0..2]: cost = 1+1+1 = 3 ≤ 3 → length 3
- Window [1..3]: cost = 1+1+2 = 4 > 3 → invalid

### Example 2
```
Input:  s = "abcd",  t = "cdef",  maxCost = 3
Output: 1
```
- Costs: 2, 2, 2, 2 — any single character change costs 2 ≤ 3 → length 1.
- Any window of size 2 would cost 4 > 3.

### Example 3
```
Input:  s = "abcd",  t = "acde",  maxCost = 0
Output: 1
```
- Costs: 0, 1, 1, 1. Only the first character has cost 0.

## Constraints
- `1 <= s.length <= 10^5`
- `t.length === s.length`
- `0 <= maxCost <= 10^6`
- `s` and `t` consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — precompute costs</summary>

First build a `costs` array where `costs[i] = Math.abs(s.charCodeAt(i) - t.charCodeAt(i))`. Then the problem becomes: find the longest contiguous subarray of `costs` with sum ≤ `maxCost`. That's a standard variable-size window.
</details>

<details>
<summary>Hint 2 — variable window on costs</summary>

```
left = 0, windowCost = 0, maxLen = 0

for right = 0 to n-1:
  windowCost += costs[right]

  while windowCost > maxCost:
    windowCost -= costs[left]
    left++

  maxLen = max(maxLen, right - left + 1)
```
</details>

## Write your solution
→ [`../solutions/22-equal-substrings-budget.js`](../solutions/22-equal-substrings-budget.js)

## Follow-ups
- What if you could also reorder the characters (not just change them in place)?
- What if `maxCost` could be negative? (Hint: an empty subarray costs 0.)
