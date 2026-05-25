# Q20 — Short Encoding of Words

**Difficulty:** Hard
**Pattern:** Trie — detecting words that are suffixes of other words
**Expected:** O(N × L) time · O(N × L) space

## Problem

A string `s` and index array `indices` are used to encode a list of words as follows:

- `s = words[0] + '#' + words[1] + '#' + ... + words[k-1] + '#'`
- `indices[i]` is the starting index of `words[i]` in `s`.

For example, words `["time", "me", "bell"]` can be encoded as `"time#bell#"` with indices `[0, 2, 5]` because:
- "time" starts at index 0
- "me" starts at index 2 (it's a suffix of "time" at `s[2]` — wait, that's "me" within "time#")
- "bell" starts at index 5

Given an array of words, return the **minimum length** of any string `s` that can encode all the words.

> **Key insight:** if word A is a suffix of word B, we don't need a separate entry for A — it's already encoded inside B (just at a different index). So the goal is to eliminate all words that are suffixes of some other word in the list.

## Examples

### Example 1
```
Input:  words = ["time", "me", "bell"]
Output: 10
```
The encoding is `"time#bell#"` (length 10). "me" is a suffix of "time", so we skip it.

### Example 2
```
Input:  words = ["t"]
Output: 2
```
Encoding: `"t#"` — length 2.

### Example 3
```
Input:  words = ["feather","he","eat","tea","her"]
Output: 16
```
- "he" is a suffix of "feather" → skip
- "her" is a suffix of "feather" → skip
- "eat" and "tea" are not suffixes of each other or "feather"
- Encoding: `"feather#eat#tea#"` → length 16

## Constraints
- `1 <= words.length <= 2000`
- `1 <= words[i].length <= 7`
- `words[i]` consists of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — what words can we eliminate?</summary>

We can eliminate any word that is a **suffix of another word** in the list. Equivalently, if we reverse all words, we can eliminate any word whose reverse is a **prefix of another reversed word** — which is exactly what a trie lets us detect.
</details>

<details>
<summary>Hint 2 — the trie approach (reversed words)</summary>

1. Reverse all words.
2. Insert all reversed words into a trie.
3. A word needs its own `#`-terminated slot in the encoding only if its reversed version is NOT a prefix of any other reversed word — in trie terms, only if the node at its reversed word's end has NO children.
4. For each leaf node in the trie (node with no children), the word associated with the root-to-leaf path contributes `length + 1` to the answer (the word plus `#`).
</details>

<details>
<summary>Hint 3 — simpler set-based approach</summary>

Without a trie:
1. Put all words in a set.
2. For each word, remove all its proper suffixes from the set.
3. The answer is the sum of `(word.length + 1)` for all remaining words in the set.

This is O(N × L²) but simple and within constraints.
</details>

## Write your solution
→ [`../solutions/20-short-encoding.js`](../solutions/20-short-encoding.js)

## Follow-ups
- LeetCode 820 — this exact problem.
- What if you also had to reconstruct the encoding string (not just find its length)?
- Can you do it in O(N × L) with the set approach? (Hint: hashing each suffix is O(L), and there are O(L) suffixes per word — total O(N × L²). Better to use the trie.)
