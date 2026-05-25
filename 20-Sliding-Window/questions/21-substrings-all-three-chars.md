# Q21 — Number of Substrings Containing All Three Characters

**Difficulty:** Medium (LeetCode 1358)
**Pattern:** Variable-size sliding window + frequency map
**Expected:** O(n) time · O(1) space

## Problem

Given a string `s` consisting only of characters `'a'`, `'b'`, and `'c'`, return the **number of substrings** that contain **at least one occurrence** of each of `'a'`, `'b'`, and `'c'`.

## Examples

### Example 1
```
Input:  s = "abcabc"
Output: 10
```
Substrings containing all three characters:
- Length 3: "abc" [0..2], "bca" [1..3], "cab" [2..4], "abc" [3..5] → 4
- Length 4: "abca" [0..3], "bcab" [1..4], "cabc" [2..5] → 3
- Length 5: "abcab" [0..4], "bcabc" [1..5] → 2
- Length 6: "abcabc" [0..5] → 1
Total = 10.

### Example 2
```
Input:  s = "aaacb"
Output: 3
```
- "aaacb" [0..4], "aacb" [1..4], "acb" [2..4] → 3.

### Example 3
```
Input:  s = "abc"
Output: 1
```

## Constraints
- `3 <= s.length <= 5 * 10^4`
- `s` consists only of `'a'`, `'b'`, `'c'`.

## Hints

<details>
<summary>Hint 1 — invert the counting</summary>

For each position `right`, find the **smallest** `left` such that `s[left..right]` contains all three characters. Then every substring `s[i..right]` for `i <= left` also contains all three characters.

So the count contribution from `right` is `left + 1` (the number of valid starting positions: 0, 1, …, left).

Wait — let me restate: if the smallest valid left for this right is `left`, then starting positions `0, 1, ..., left` all produce valid substrings ending at `right`. That's `left + 1` substrings.
</details>

<details>
<summary>Hint 2 — shortest valid window at each right</summary>

Use a sliding window where you **contract from the left as long as the window is still valid** (still contains all three characters). This gives the smallest valid `left` for each `right`.

```
for right = 0 to n-1:
  add s[right] to freq

  while freq['a'] > 0 && freq['b'] > 0 && freq['c'] > 0:
    count += n - right   // all extensions of this window to the right are also valid... hmm
```

Actually, the cleaner approach: count `left + 1` for each right once the window first becomes valid.
</details>

<details>
<summary>Hint 3 — clean approach</summary>

For each `right`, move `left` forward as far as possible while `[left..right]` still contains all 3 characters. Then add `left + 1` to the answer (all starting positions 0..left yield valid substrings ending at `right`).

```
left = 0, freq = {a:0, b:0, c:0}, count = 0

for right = 0 to n-1:
  freq[s[right]]++

  while freq['a'] > 0 && freq['b'] > 0 && freq['c'] > 0:
    freq[s[left]]--
    left++

  count += left   // positions 0..left-1 are valid starts (after the over-shrink)
```
</details>

## Write your solution
→ [`../solutions/21-substrings-all-three-chars.js`](../solutions/21-substrings-all-three-chars.js)

## Follow-ups
- How does this generalize to all characters from a set of size `m` (not just 3)?
- **Minimum Window Substring** (Q29) asks for the single smallest window containing all chars of a given string. This problem prepares you for that.
