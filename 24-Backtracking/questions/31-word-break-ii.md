# Q31 — Word Break II

**Difficulty:** Hard
**Pattern:** Backtracking with memoization — enumerate all valid sentence segmentations
**Expected:** O(n · 2^n) time worst case · O(n · 2^n) space (with memoization: O(n²))

## Problem

Given a string `s` and a dictionary of strings `wordDict`, add spaces in `s` to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

**Note:** The same word in the dictionary may be reused multiple times in the segmentation.

## Examples

### Example 1
```
Input:  s = "catsanddog",
        wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]
```

### Example 2
```
Input:  s = "pineapplepenapple",
        wordDict = ["apple","pen","applepen","pine","pineapple"]
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
```

### Example 3
```
Input:  s = "catsandog",
        wordDict = ["cats","dog","sand","and","cat"]
Output: []
```

## Constraints
- `1 <= s.length <= 20`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 10`
- `s` and `wordDict[i]` consist of only lowercase English letters.
- All the strings of `wordDict` are **unique**.

## Hints

<details>
<summary>Hint 1 — backtracking from a start index</summary>

Try every word in the dictionary. If `s.startsWith(word, start)`, add the word to the current sentence and recurse from `start + word.length`. When `start === s.length`, record the current sentence.
</details>

<details>
<summary>Hint 2 — memoize by start index</summary>

`backtrack(start)` returns all valid sentence endings from index `start`. If `memo.has(start)`, return the cached list. Otherwise, compute and store it. This prevents re-computing the same suffix multiple times.
</details>

<details>
<summary>Hint 3 — building sentences from suffix lists</summary>

`backtrack(start)` returns an array of sentence suffixes (strings). To build complete sentences, for each word match at `start`, prepend the word to each suffix returned by `backtrack(start + word.length)`.
</details>

## Write your solution
→ [`../solutions/31-word-break-ii.js`](../solutions/31-word-break-ii.js)

## Follow-ups
- **Word Break I** — just check whether any valid segmentation exists (DP, O(n²)).
- Memoize the backtracking by `start` index and draw the memo table for Example 1.
- **Palindrome Partitioning** — the same "try all prefixes" structure but for palindromes.
