# Q9 — Permutation in String

**Difficulty:** Medium (LeetCode 567)
**Pattern:** Fixed-size sliding window + frequency map
**Expected:** O(n) time · O(1) space

## Problem

Given two strings `s1` and `s2`, return `true` if any **permutation of `s1`** is a substring of `s2`. Otherwise return `false`.

A permutation (anagram) of `s1` uses the exact same characters and frequencies, in any order.

## Examples

### Example 1
```
Input:  s1 = "ab",  s2 = "eidbaooo"
Output: true
```
"ba" is a permutation of "ab" and it appears at index 3 in s2.

### Example 2
```
Input:  s1 = "ab",  s2 = "eidboaoo"
Output: false
```
No permutation of "ab" appears as a contiguous substring in s2.

### Example 3
```
Input:  s1 = "adc",  s2 = "dcda"
Output: true
```
"cda" is a permutation of "adc" and appears at index 1.

## Constraints
- `1 <= s1.length, s2.length <= 10^4`
- `s1` and `s2` consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — this is Q8 with a simpler output</summary>

Instead of collecting all starting indexes (Q8), you just need to know if **at least one** exists. Return `true` as soon as you find a match. Return `false` if you finish without finding any.
</details>

<details>
<summary>Hint 2 — early exit optimization</summary>

If `s1.length > s2.length`, return `false` immediately — a permutation of `s1` can't fit inside `s2`.
</details>

## Write your solution
→ [`../solutions/09-permutation-in-string.js`](../solutions/09-permutation-in-string.js)

## Follow-ups
- Can you solve this with O(1) space using two 26-length arrays instead of Maps?
- What if `s1` could be longer than `s2`?
