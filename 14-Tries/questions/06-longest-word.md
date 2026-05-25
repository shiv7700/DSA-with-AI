# Q6 — Longest Word Built One Character at a Time

**Difficulty:** Easy
**Pattern:** Trie — BFS/DFS with isEnd tracking
**Expected:** O(N × L) time · O(N × L) space

## Problem

Given a list of strings `words`, find the **longest word** that can be built **one character at a time** by other words in the list.

A word can be "built" if every prefix of it (of length 1, 2, 3, … up to one less than the full length) is also present in `words` as a complete word.

If there is more than one valid longest word, return the **lexicographically smallest** one.

> **Example:** `["a", "ab", "abc"]` — "abc" qualifies because "a" and "ab" are both in the list. `["ab", "abc"]` — "abc" does **not** qualify because "a" is missing.

## Examples

### Example 1
```
Input:  words = ["w", "wo", "wor", "worl", "world"]
Output: "world"
```
Every prefix of "world" appears in the list: "w", "wo", "wor", "worl".

### Example 2
```
Input:  words = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
Output: "apple"
```
Both "apple" and "apply" can be built from shorter words in the list, but "apple" < "apply" lexicographically.

### Example 3
```
Input:  words = ["yo", "ew", "fc", "zrc", "yodn", "fcm", "qm", "qmo", "fcmz", "z", "ewq", "yod", "ewqz", "y"]
Output: "yodn"
```

### Example 4 (edge cases)
```
Input:  words = ["a"]
Output: "a"

Input:  words = []
Output: ""
```

## Constraints
- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 30`
- `words[i]` consists only of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — brute force approach</summary>

Sort words by length (shorter first). For each word, check if every proper prefix is in the word list. You could store all words in a `Set` for O(1) prefix lookups.

```
Set all = new Set(words)
For each word (sorted by length, then lexicographically):
  valid = true
  for each prefix of length 1..word.length-1:
    if prefix not in all: valid = false; break
  if valid and word.length > best.length: best = word
```
This is O(N × L²) overall. Fine for the given constraints, but a trie can do better.
</details>

<details>
<summary>Hint 2 — the trie approach</summary>

Insert all words into a trie. Then do a BFS (level by level) or DFS, but only follow an edge if the node you just landed on has `isEnd = true`.

This ensures you only walk paths where every prefix so far is a complete word. The deepest node you reach represents the longest buildable word.

Keep track of the current path string. When you can't go deeper (no child with `isEnd = true`), record the current word if it's longer than the best so far.
</details>

<details>
<summary>Hint 3 — tie-breaking</summary>

When two words have the same length, return the lexicographically smaller one. If you process the children in alphabetical order during DFS, the first valid word you find at the maximum depth will automatically be the lexicographically smallest.
</details>

## Write your solution
→ [`../solutions/06-longest-word.js`](../solutions/06-longest-word.js)

## Follow-ups
- What if you want all words that can be built, not just the longest?
- What if the "build" rule required each step to add a character at the **front** instead of the end?
- LeetCode 720 — this exact problem.
