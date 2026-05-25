# Q14 — Longest Substring with At Most K Distinct Characters

**Difficulty:** Medium (LeetCode 340)
**Pattern:** Variable-size sliding window + frequency map
**Expected:** O(n) time · O(k) space

## Problem

Given a string `s` and an integer `k`, find the length of the **longest substring** that contains **at most `k` distinct characters**.

## Examples

### Example 1
```
Input:  s = "eceba",  k = 2
Output: 3
```
The longest substring with at most 2 distinct chars is "ece" (length 3).

### Example 2
```
Input:  s = "aa",  k = 1
Output: 2
```
The entire string "aa" has only 1 distinct character.

### Example 3
```
Input:  s = "aabbcc",  k = 2
Output: 4
```
"aabb" or "bbcc" — both have length 4 with 2 distinct characters.

### Example 4
```
Input:  s = "abcdef",  k = 3
Output: 3
```

## Constraints
- `1 <= s.length <= 5 * 10^4`
- `0 <= k <= s.length`
- `s` consists of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — the window's "distinct count"</summary>

The window is **invalid** when it contains more than `k` distinct characters. Use a frequency map to track the characters in the window. The number of distinct characters is `Object.keys(freq).length` (or the size of a Map).

- When `freq[c]` goes from 0 to 1: new distinct character entered → `distinct++`.
- When `freq[c]` drops to 0: a character left entirely → `distinct--`.
</details>

<details>
<summary>Hint 2 — variable window outline</summary>

```
left = 0, freq = {}, distinct = 0, maxLen = 0

for right = 0 to s.length-1:
  add s[right] to freq
  if freq[s[right]] === 1: distinct++

  while distinct > k:
    freq[s[left]]--
    if freq[s[left]] === 0: distinct--
    left++

  maxLen = max(maxLen, right - left + 1)
```
</details>

## Write your solution
→ [`../solutions/14-longest-at-most-k-distinct.js`](../solutions/14-longest-at-most-k-distinct.js)

## Follow-ups
- **Q13** is the `k = 0` … no, actually Q13 is the "all distinct" case, which is equivalent to `k = all unique chars`. How does Q14 reduce to Q13 conceptually?
- **Q15** (At Most Two Distinct) is Q14 with `k = 2` hardcoded. Solve it separately to get comfortable.
- What happens if `k = 0`? What should the function return?
