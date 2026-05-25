# Q24 — Build a Suffix Array — Longest Repeated Substring

**Difficulty:** Hard (Suffix Structures)
**Pattern:** Suffix array + LCP array
**Expected:** O(n log² n) build · O(n) LRS query · O(n) space

## Problem

Given a string `s`, find the **longest repeated substring** — the longest substring that appears at least twice in `s` (non-overlapping occurrences are allowed).

Return the substring itself. If no character repeats, return `""`.

> **What is a suffix array?** An array of all starting indexes of `s`'s suffixes, sorted in lexicographic order. Combined with the LCP (Longest Common Prefix) array, it efficiently answers substring queries.

## Examples

### Example 1
```
Input:  s = "banana"
Output: "ana"
```
"ana" appears twice: at index 1 and index 3. (Overlap is allowed: "ana" at 1–3 and "ana" at 3–5 overlap, but the problem allows it unless otherwise stated.)

Actually: "an" also appears twice (index 1 and 3), and "ana" appears twice (index 1 and 3 — overlapping is ok here). The longest is "ana".

### Example 2
```
Input:  s = "abcabc"
Output: "abc"
```
"abc" appears at index 0 and index 3.

### Example 3
```
Input:  s = "aaa"
Output: "aa"
```
"aa" appears at index 0 and index 1 (overlapping).

### Example 4
```
Input:  s = "abcd"
Output: ""
```
No repeated substring.

## Constraints
- `1 <= s.length <= 10^4`
- `s` consists of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — brute force (binary search on length)</summary>

Binary search on the length L of the repeated substring. For each candidate length L, use a set to check if any substring of length L appears twice. O(n² log n) total. Fine for small inputs.

```
lo = 0, hi = n // 2
while lo < hi:
  mid = (lo + hi + 1) / 2
  if hasDuplicate(s, mid): lo = mid
  else: hi = mid - 1
return s.substring(startIndex, startIndex + lo)
```
</details>

<details>
<summary>Hint 2 — what a suffix array is</summary>

A **suffix array** `SA` is an array of indices [0, n-1] sorted so that `s[SA[0]..] < s[SA[1]..] < ... < s[SA[n-1]..]` lexicographically.

For `s = "banana"`:
- Suffixes: "banana"(0), "anana"(1), "nana"(2), "ana"(3), "na"(4), "a"(5)
- Sorted:   "a"(5), "ana"(3), "anana"(1), "banana"(0), "na"(4), "nana"(2)
- SA = [5, 3, 1, 0, 4, 2]

The **LCP array** `LCP[i]` = length of the longest common prefix of `s[SA[i]..]` and `s[SA[i-1]..]`.
For "banana": LCP = [-, 1, 3, 0, 0, 2] (at positions 1-5; position 0 is undefined).

**The longest repeated substring is the maximum value in the LCP array.**
</details>

<details>
<summary>Hint 3 — simple O(n log² n) construction</summary>

1. Generate all suffixes as (start index, suffix string) pairs.
2. Sort them. This is O(n² log n) naively (each comparison is O(n)) or O(n log² n) with smarter suffix comparison.
3. Compute LCP between adjacent sorted suffixes.
4. Return the suffix starting at `SA[argmax(LCP)]` with length `max(LCP)`.

For n ≤ 10^4, even the naive O(n² log n) works.
</details>

## Write your solution
→ [`../solutions/24-suffix-array.js`](../solutions/24-suffix-array.js)

## Follow-ups
- LeetCode 1044 — Longest Duplicate Substring (this exact problem, with n up to 3×10^4).
- Build the LCP array using Kasai's algorithm in O(n) once you have the suffix array.
- Use the suffix array to count the number of distinct substrings.
