# Q21 — Minimum Window Substring

**Difficulty:** Hard
**Pattern:** Sliding window · two frequency maps
**Expected:** O(n + m) time · O(k) space  (n = |s|, m = |t|, k = distinct chars in t)

## Problem

Given two strings `s` and `t`, return the **minimum length substring of `s`** that contains every character in `t` (with repetition — if `t` has two `'a'`s, the window must contain at least two `'a'`s).

If no such substring exists, return `''`.

> **This is the canonical hard sliding window problem.** You've seen the easy version (longest substring without repeating chars, Q11). This is the "minimum window" cousin — harder because you're looking for the shortest valid window instead of the longest.

## Examples

### Example 1
```
Input:  s = 'ADOBECODEBANC',  t = 'ABC'
Output: 'BANC'
```
`'BANC'` (length 4) is the shortest substring of `s` that contains all three characters A, B, C.

### Example 2
```
Input:  s = 'a',  t = 'a'
Output: 'a'
```

### Example 3
```
Input:  s = 'a',  t = 'aa'
Output: ''
```
`t` has two `'a'`s but `s` only has one — no valid window.

### Example 4
```
Input:  s = 'ADOBECODEBANC',  t = 'AABC'
Output: 'ADOBEC'  (length 6)
```

## Constraints
- `1 <= s.length <= 10^5`
- `1 <= t.length <= 10^4`
- `s` and `t` consist of uppercase and lowercase English letters.

## Hints

<details>
<summary>Hint 1 — the two-map setup</summary>

You need to track:
1. `need` — frequency map of characters required (built from `t`).
2. `have` — frequency map of characters in the current window.
3. `formed` — how many distinct characters from `need` are currently "satisfied" (their count in `have` equals their count in `need`).

When `formed === need.size`, the window is valid. Then try to shrink it from the left.
</details>

<details>
<summary>Hint 2 — the sliding window logic</summary>

```
left = 0, formed = 0
minLen = Infinity, result = ''

for right from 0 to s.length - 1:
  add s[right] to have

  if s[right] is in need AND have[s[right]] === need[s[right]]:
    formed++

  while formed === need.size:           ← window is valid → try shrinking
    if (right - left + 1) < minLen:
      update minLen and result

    remove s[left] from have
    if s[left] is in need AND have[s[left]] < need[s[left]]:
      formed--
    left++
```
</details>

<details>
<summary>Hint 3 — optimized version for sparse t</summary>

If `t` is small but `s` is large, you can filter `s` to only keep characters that appear in `t`. Then run the sliding window on this filtered list (storing original indexes). This reduces the number of window moves when most of `s` is irrelevant.

For the standard interview: the plain O(n) solution above is sufficient.
</details>

## Write your solution
→ [`../solutions/21-minimum-window-substring.js`](../solutions/21-minimum-window-substring.js)

## Follow-ups
- What if you need to find **all** minimum-length windows, not just one?
- **Minimum Window Subsequence** — find the smallest substring of `s` in which `t` appears as a subsequence (characters don't have to be contiguous). This requires a different approach.
- Prove that the two-pointer sliding window never misses the answer. (Hint: argue that the optimal left pointer for a given right pointer can only move right as `right` moves right.)
- Extend to handle the case where `t` can have characters not in `s` — does your solution already handle this?
