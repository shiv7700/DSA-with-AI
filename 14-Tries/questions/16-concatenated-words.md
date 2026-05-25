# Q16 — Concatenated Words

**Difficulty:** Hard
**Pattern:** Trie + DFS / dynamic programming
**Expected:** O(N × L²) time · O(N × L) space

## Problem

Given an array of strings `words` (all unique, all lowercase), find all words that can be formed by concatenating **two or more** other words in the same array.

A concatenated word is formed by two or more shorter words from the array (a word cannot be concatenated with itself).

## Examples

### Example 1
```
Input:  words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
```
- "catsdogcats" = "cats" + "dog" + "cats"
- "dogcatsdog" = "dog" + "cats" + "dog"
- "ratcatdogcat" = "rat" + "cat" + "dog" + "cat"
- "hippopotamuses" = cannot be formed from other words in the list

### Example 2
```
Input:  words = ["cat","dog","catdog"]
Output: ["catdog"]
```
"catdog" = "cat" + "dog".

### Example 3 (short words)
```
Input:  words = ["a","b","ab","abc"]
Output: ["ab"]
```
- "ab" = "a" + "b"
- "abc" would need "a" + "bc" or "ab" + "c", but "bc" and "c" are not in the list.

## Constraints
- `1 <= words.length <= 10^4`
- `1 <= words[i].length <= 30`
- `words[i]` consists of lowercase English letters.
- All words are unique.

## Hints

<details>
<summary>Hint 1 — for each word, can it be split into valid words?</summary>

This is a "word break" check: can string `w` be fully segmented into words from a dictionary?

Sort `words` by length. Process shorter words first. Build a trie (or set) from shorter words as you go. For each word, check if it can be fully segmented using only the words already processed. If yes, it's a concatenated word.

Why sort by length? A concatenated word must be composed of strictly shorter words, so you never need to worry about circular definitions.
</details>

<details>
<summary>Hint 2 — checking if a word can be split (DFS with memoization)</summary>

Given a word `w` and a trie (or set) of shorter words, write a DFS/DP check:

```
canForm(w, start, wordSet, count, memo):
  if start == w.length: return count >= 2
  if memo[start] is defined: return memo[start]
  for end from start+1 to w.length:
    if wordSet.has(w[start..end]):
      if canForm(w, end, wordSet, count+1, memo): return true
  memo[start] = false
  return false
```

The `count` parameter ensures at least 2 words are used.
</details>

<details>
<summary>Hint 3 — using a trie instead of a set</summary>

A trie is slightly faster for the segment check because you can walk it character by character and stop early when no prefix matches. For each starting index, walk the trie. Whenever `node.isEnd`, you've found a valid split point — recurse from there.
</details>

## Write your solution
→ [`../solutions/16-concatenated-words.js`](../solutions/16-concatenated-words.js)

## Follow-ups
- LeetCode 472 — this exact problem.
- Word Break I (LeetCode 139) — can a single string be segmented? Same core algorithm.
- Word Break II (LeetCode 140) — return all valid segmentations. How does the output change the approach?
