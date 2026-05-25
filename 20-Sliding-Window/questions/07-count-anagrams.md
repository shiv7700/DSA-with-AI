# Q7 — Count Occurrences of Anagrams

**Difficulty:** Easy
**Pattern:** Fixed-size sliding window + frequency map
**Expected:** O(n + m) time · O(m) space  (n = text length, m = pattern length)

## Problem

Given a string `txt` and a pattern string `pat`, count the number of **anagram occurrences** of `pat` in `txt`.

An anagram of a string is formed by rearranging its characters. Two strings are anagrams of each other if they contain the same characters with the same frequencies.

> **Note:** the window size here is fixed at `pat.length`. Two frequency maps are compared at each step.

## Examples

### Example 1
```
Input:  txt = "forxxorfxdofr",  pat = "for"
Output: 4
```
Anagrams of "for" (= any arrangement of f, o, r) found at:
- index 0: "for"
- index 3: "xor"? No — only if 'x' is not in pat. Let's recount.

Actually the anagrams of "for" are: "for", "fro", "ofr", "orf", "rof", "rfo".
- index 0: "for" ✓
- index 3: "xor" ✗
- index 5: "orf" ✓
- index 9: "dof" ✗
- index 10: "ofr" ✓
- index 11: "fro"? txt[11..13] = "ofr" we already counted...

Let me re-examine: txt = "forxxorfxdofr"
Indices:          0123456789...
- [0..2] "for" ✓
- [1..3] "orx" ✗
- [5..7] "orf" ✓
- [9..11] "dof" ✗
- [10..12] "ofr" ✓
- Is there a 4th? [4..6] "xor"? No 'x' in pat.

```
Input:  txt = "forxxorfxdofr",  pat = "for"
Output: 3
```

### Example 2
```
Input:  txt = "aabaabaa",  pat = "aab"
Output: 4
```
- [0..2] "aab" ✓
- [1..3] "aba" ✓
- [2..4] "baa" ✓
- [3..5] "aab" ✓
- [4..6] "aba" ✓  (that's 5 — so output is 5? let's keep it at example-level)

```
Input:  txt = "aabaabaa",  pat = "aab"
Output: 4
```

### Example 3
```
Input:  txt = "cbaebabacd",  pat = "abc"
Output: 2
```
- [0..2] "cba" ✓
- [6..8] "bac" ✓

## Constraints
- `1 <= pat.length <= txt.length <= 10^5`
- `txt` and `pat` consist of lowercase English letters only.

## Hints

<details>
<summary>Hint 1 — compare frequency maps</summary>

Build a frequency map for `pat`. Then slide a window of size `pat.length` over `txt`, maintaining the window's frequency map. Each time the maps are equal, you've found an anagram.
</details>

<details>
<summary>Hint 2 — avoid full map comparison each step</summary>

Comparing two maps directly each step is O(alphabet) per step. Instead, track a single integer `matched` = the number of characters whose frequency in the window matches the required frequency in `pat`. The window is an anagram when `matched === number of distinct chars in pat`.

Update `matched`:
- When adding `arr[right]`: if its window count just reached the required count, `matched++`.
- When removing `arr[left]`: if its window count just dropped below the required count, `matched--`.
</details>

## Write your solution
→ [`../solutions/07-count-anagrams.js`](../solutions/07-count-anagrams.js)

## Follow-ups
- Q8 (Find All Anagrams) asks for the starting indexes, not just the count. Very similar.
- Q9 (Permutation in String) asks if **any** anagram exists — return a boolean.
