# Q10 — Word Break

**Difficulty:** Medium
**Pattern:** 1D DP — unbounded segmenting on a string
**Expected:** O(n² × m) time · O(n) space  (n = string length, m = avg word length)

## Problem

Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

Words in `wordDict` may be used multiple times.

## Examples

### Example 1
```
Input:  s = "leetcode", wordDict = ["leet", "code"]
Output: true
```
"leet" + "code"

### Example 2
```
Input:  s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
```
"apple" + "pen" + "apple"

### Example 3
```
Input:  s = "catsandog", wordDict = ["cats", "dog", "sand", "an", "cat"]
Output: false
```

## Constraints
- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` and `wordDict[i]` consist only of lowercase English letters.
- All strings in `wordDict` are unique.

## Hints

<details>
<summary>Hint 1 — define dp[i]</summary>

`dp[i]` = `true` if the substring `s[0..i-1]` (the first `i` characters) can be segmented using dictionary words. `dp[0] = true` (the empty prefix is trivially segmentable).
</details>

<details>
<summary>Hint 2 — the recurrence</summary>

For each position `i`, try all possible "last words" ending at `i`. That means looking at all `j < i` where:
- `dp[j]` is `true` (prefix up to `j` is segmentable), AND
- `s.slice(j, i)` is a word in the dictionary.

If any such `j` exists, set `dp[i] = true`.
</details>

<details>
<summary>Hint 3 — use a Set for fast dictionary lookup</summary>

Convert `wordDict` to a `Set` first. Then `wordSet.has(s.slice(j, i))` is O(m) instead of O(n * m).
</details>

<details>
<summary>Hint 4 — optimization: bound j by the max word length</summary>

You only need to look back at most `maxWordLen` characters. Checking `j` all the way back to 0 works but is slower than necessary.
</details>

## Write your solution
→ [`../solutions/10-word-break.js`](../solutions/10-word-break.js)

## Follow-ups
- **Word Break II** — return all valid segmentations (not just true/false).
- How would you handle case-insensitive matching?
