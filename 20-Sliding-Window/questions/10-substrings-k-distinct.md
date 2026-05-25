# Q10 — Substrings of Size K with Exactly K Distinct Characters

**Difficulty:** Easy
**Pattern:** Fixed-size sliding window + Set
**Expected:** O(n) time · O(k) space

## Problem

Given a string `s` and an integer `k`, count the number of substrings of length `k` that contain **exactly `k` distinct characters** (i.e., all characters in the window are unique — no repetition).

## Examples

### Example 1
```
Input:  s = "aabcdbbde",  k = 3
Output: 6
```
Substrings of length 3:
- "aab" → 2 distinct → ✗
- "abc" → 3 distinct → ✓
- "bcd" → 3 distinct → ✓
- "cdb" → 3 distinct → ✓
- "dbb" → 2 distinct → ✗
- "bbd" → 2 distinct → ✗
- "bde" → 3 distinct → ✓

Wait, that's 4. Let me recheck "aabcdbbde":
Substrings: aab, abc, bcd, cdb, dbb, bbd, bde → 4 with k=3 distinct.

```
Input:  s = "aabcdbbde",  k = 3
Output: 4
```

### Example 2
```
Input:  s = "abcdef",  k = 3
Output: 4
```
All consecutive 3-char substrings have exactly 3 distinct chars.

### Example 3
```
Input:  s = "aaaa",  k = 2
Output: 0
```
Every window of size 2 contains only 1 distinct character.

## Constraints
- `1 <= k <= s.length <= 10^4`
- `s` consists of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — fixed-size window + Set</summary>

Slide a window of size `k`. Add characters on the right, remove on the left. Track distinct characters with a frequency map. When the window size equals `k` and the number of distinct characters also equals `k`, increment the count.
</details>

<details>
<summary>Hint 2 — frequency map approach</summary>

A character is "still in the window" even after being counted multiple times. Use a frequency map (not just a Set) so you know when to truly remove a character from the distinct count:

- Add `s[right]` to `freq`. If `freq[s[right]]` just became 1, increment `distinct`.
- Remove `s[left]` from `freq` when sliding. If `freq[s[left]]` drops to 0, decrement `distinct`.
- If `distinct === k`, increment count.
</details>

## Write your solution
→ [`../solutions/10-substrings-k-distinct.js`](../solutions/10-substrings-k-distinct.js)

## Follow-ups
- How would you count substrings with **at most** K distinct characters? (That becomes a variable-size window — see Q14.)
- What if you want substrings with **at least** K distinct characters?
