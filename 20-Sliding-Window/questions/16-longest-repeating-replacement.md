# Q16 — Longest Repeating Character Replacement

**Difficulty:** Medium (LeetCode 424)
**Pattern:** Variable-size sliding window + frequency map
**Expected:** O(n) time · O(1) space

## Problem

You are given a string `s` and an integer `k`. You can replace **at most `k`** characters in `s` with any letter. Return the length of the **longest substring** you can achieve that contains only one repeated character.

In other words: find the longest window where `window length - (count of most frequent char in window) <= k`. If this condition holds, you can turn all the "minority" characters into the majority character using at most `k` replacements.

## Examples

### Example 1
```
Input:  s = "ABAB",  k = 2
Output: 4
```
Replace both 'A's with 'B' (or both 'B's with 'A') → "BBBB" or "AAAA" — length 4.

### Example 2
```
Input:  s = "AABABBA",  k = 1
Output: 4
```
Replace the single 'B' at index 3 → "AABAAABA"? Actually: the window "BABB" (indexes 3–6) has 3 B's and 1 A. With 1 replacement → "BBBB", length 4.

### Example 3
```
Input:  s = "AAAA",  k = 2
Output: 4
```
Already all the same. No replacements needed.

## Constraints
- `1 <= s.length <= 10^5`
- `s` consists of uppercase English letters.
- `0 <= k <= s.length`

## Hints

<details>
<summary>Hint 1 — the key invariant</summary>

A window `[left..right]` is valid if:
```
(right - left + 1) - maxFreq <= k
```
where `maxFreq` is the frequency of the most common character in the window. The "cheapest" way to make the whole window uniform is to change every non-dominant character to the dominant one.
</details>

<details>
<summary>Hint 2 — maintaining maxFreq</summary>

Keep a frequency map `freq` and a variable `maxFreq`. When adding `s[right]`, update `freq[s[right]]` and update `maxFreq = Math.max(maxFreq, freq[s[right]])`.

Shrink the window (advance `left`) when the window is invalid. When shrinking, decrement `freq[s[left]]` — but **don't** recompute `maxFreq` by scanning all frequencies. It's safe to let `maxFreq` be a slight overestimate when shrinking, because we only care about expanding the window (getting a larger `maxFreq` is what increases our answer).
</details>

<details>
<summary>Hint 3 — why not updating maxFreq on shrink is okay</summary>

We only update the answer when `maxFreq` increases (or stays the same). So letting `maxFreq` remain at its peak value during shrinks is harmless — the window might sometimes be valid by a fluke, but it will never produce a longer answer than we've already seen.

This is a subtle correctness argument. If it bothers you, you can always recompute `maxFreq` during shrink (it just adds O(26) per shrink step, which is still O(n) overall).
</details>

## Write your solution
→ [`../solutions/16-longest-repeating-replacement.js`](../solutions/16-longest-repeating-replacement.js)

## Follow-ups
- What if you could replace **any character** (not just letters) and the target was a specific character you get to choose? Does it change the approach?
- **Max Consecutive Ones III** (Q17) is essentially this problem but simpler — the binary alphabet makes `maxFreq` trivially the count of 1s.
