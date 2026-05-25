# Q23 — Word Break

**Difficulty:** Hard
**Pattern:** Recursion with memoization — try each prefix, recurse on remainder
**Expected:** O(n² × m) time — n = string length, m = dict size · O(n) space

## Problem

Given a string `s` and a dictionary `wordDict` (an array of strings), return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

Note: words in `wordDict` can be reused multiple times.

> **Why this problem?** It introduces a powerful recursion pattern: "try all prefixes at each position." Without memoization, this is exponential. With memoization, it becomes polynomial. This is a textbook example of where recursive thinking plus caching = dynamic programming.

## Examples

### Example 1
```
Input:  s = "leetcode", wordDict = ["leet", "code"]
Output: true
```
Explanation: "leet" + "code" = "leetcode".

### Example 2
```
Input:  s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
```
"apple" + "pen" + "apple".

### Example 3
```
Input:  s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
```
Cannot fully segment "catsandog".

### Example 4
```
Input:  s = "aaaaaaa", wordDict = ["a", "aa", "aaa"]
Output: true
```

## Constraints
- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` and `wordDict[i]` consist of only lowercase letters.

## Hints

<details>
<summary>Hint 1 — the recursive idea: try every prefix</summary>

Start from position 0 in the string. Try every prefix `s.substring(0, i)` for `i = 1, 2, …, s.length`. If that prefix is in the dictionary, check if the **remaining** suffix `s.substring(i)` can also be segmented.

If either a full segmentation is found, return `true`. If nothing works, return `false`.
</details>

<details>
<summary>Hint 2 — base case</summary>

If the current string `s` is empty, you've successfully segmented it — return `true`. Empty string = no more work to do.
</details>

<details>
<summary>Hint 3 — the naive version (with exponential worst case)</summary>

```js
function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);

  function canBreak(start) {
    if (start === s.length) return true;    // whole string consumed
    for (let end = start + 1; end <= s.length; end++) {
      if (wordSet.has(s.substring(start, end)) && canBreak(end)) {
        return true;
      }
    }
    return false;
  }

  return canBreak(0);
}
```

For strings like `"aaaaab"` with dict `["a","aa","aaa","aaaa"]`, this explores an exponential number of paths.
</details>

<details>
<summary>Hint 4 — add memoization (key insight)</summary>

The `canBreak(start)` function only depends on `start`. If you've already determined that `canBreak(5)` is `false`, you shouldn't re-explore it from a different path.

Add a `memo` object:

```js
const memo = {};

function canBreak(start) {
  if (start === s.length) return true;
  if (memo[start] !== undefined) return memo[start];

  for (let end = start + 1; end <= s.length; end++) {
    if (wordSet.has(s.substring(start, end)) && canBreak(end)) {
      return (memo[start] = true);
    }
  }
  return (memo[start] = false);
}
```

Now each starting position is evaluated at most once → O(n²) total.
</details>

## Write your solution
→ [`../solutions/23-word-break.js`](../solutions/23-word-break.js)

## Follow-ups
- LeetCode 139: **Word Break** — exact same problem.
- LeetCode 140: **Word Break II** — return all valid segmentation sentences (much harder).
- Write the bottom-up DP version: `dp[i]` = can `s[0..i-1]` be segmented? Fill from left to right.
