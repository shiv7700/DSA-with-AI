# Q24 — Permutation in String

**Difficulty:** Medium
**Pattern:** Sliding window + frequency map
**Expected:** O(n) time · O(k) space

## Problem

Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.

In other words, return `true` if one of `s1`'s permutations is a substring of `s2`.

## Examples

### Example 1
```
Input:  s1 = "ab",  s2 = "eidbaooo"
Output: true
```
`s2` contains `"ba"`, which is a permutation of `s1 = "ab"`.

### Example 2
```
Input:  s1 = "ab",  s2 = "eidboaoo"
Output: false
```

### Example 3
```
Input:  s1 = "adc",  s2 = "dcda"
Output: true
```
`"dca"` at index 1 is a permutation of `"adc"`.

## Constraints
- `1 <= s1.length, s2.length <= 10^4`
- `s1` and `s2` consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — this is Q23 with a boolean return</summary>

This is the same problem as Find All Anagrams (Q23), but instead of collecting all start indices, you just need to know if **any** anagram exists. Solve Q23 first, then simplify.
</details>

<details>
<summary>Hint 2 — early exit</summary>

If `s1.length > s2.length`, return `false` immediately — you can't fit a permutation of `s1` inside a shorter `s2`.
</details>

## Write your solution
→ [`../solutions/24-permutation-in-string.js`](../solutions/24-permutation-in-string.js)

## Follow-ups
- What is the minimum number of characters in `s2` that guarantees a permutation of `s1` must exist? (Pigeonhole principle.)
