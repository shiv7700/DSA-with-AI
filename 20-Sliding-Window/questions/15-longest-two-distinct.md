# Q15 — Longest Substring with At Most Two Distinct Characters

**Difficulty:** Medium (LeetCode 159)
**Pattern:** Variable-size sliding window + frequency map
**Expected:** O(n) time · O(1) space

## Problem

Given a string `s`, find the length of the **longest substring** that contains **at most 2 distinct characters**.

This is Q14 with `k = 2` fixed. Solving it separately helps cement the pattern before you generalize.

## Examples

### Example 1
```
Input:  s = "eceba"
Output: 3
```
"ece" uses 2 distinct characters and has length 3.

### Example 2
```
Input:  s = "ccaabbb"
Output: 5
```
"aabbb" uses 2 distinct characters and has length 5.

### Example 3
```
Input:  s = "abcabcabc"
Output: 2
```
Any window with more than 2 characters will have 3 distinct — so the answer is 2.

### Example 4 (edge cases)
```
Input:  s = "a"    → 1
Input:  s = "ab"   → 2
Input:  s = ""     → 0
```

## Constraints
- `0 <= s.length <= 5 * 10^4`
- `s` consists of printable ASCII characters.

## Hints

<details>
<summary>Hint 1 — Q14 with k = 2</summary>

Your solution to Q14 already solves this. Just call it with `k = 2`. But try writing it fresh — it's good repetition.
</details>

<details>
<summary>Hint 2 — when to shrink</summary>

The window becomes invalid when the frequency map has **3 or more keys**. While that's true, remove the left character from the map (decrement its count, delete the key if count reaches 0) and advance `left`.
</details>

## Write your solution
→ [`../solutions/15-longest-two-distinct.js`](../solutions/15-longest-two-distinct.js)

## Follow-ups
- Can you solve this in O(1) space by using a fixed-size 2-entry structure instead of a map?
- What if the input were an integer array (not a string of chars)? Does anything change?
