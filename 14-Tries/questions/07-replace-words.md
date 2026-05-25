# Q7 — Replace Words

**Difficulty:** Medium
**Pattern:** Trie — prefix filtering
**Expected:** O(N × L + S) time · O(N × L) space

## Problem

In English, we have a concept called **roots**. A root can be followed by a suffix to form a longer word (a **derivative**). For example, the root `"an"` followed by `"other"` gives the derivative `"another"`.

Given a `dictionary` of roots and a `sentence` string, replace each word in the sentence with its **shortest matching root** from the dictionary. If a word has more than one root, use the **shortest** one. If no root matches, leave the word unchanged.

> **Why use a trie here?** For each word in the sentence, you want the shortest prefix that appears in the dictionary. A trie lets you find that in one pass through the word — you walk the trie character by character and stop as soon as you hit an `isEnd`.

## Examples

### Example 1
```
Input:  dictionary = ["cat", "bat", "rat"],
        sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"
```
- "cattle" → starts with "cat" → replace with "cat"
- "rattled" → starts with "rat" → replace with "rat"
- "battery" → starts with "bat" → replace with "bat"
- "the" → no root match → stays as "the"
- "was" / "by" → no root match → stay unchanged

### Example 2
```
Input:  dictionary = ["a", "b", "c"],
        sentence = "aadsfasf absbs bbab cadsfafs"
Output: "a a b c"
```
Single-character roots match the first character.

### Example 3 (multiple roots, use shortest)
```
Input:  dictionary = ["ca", "c"],
        sentence = "car cat card"
Output: "c c c"
```
"c" is a shorter root than "ca" — use "c".

### Example 4 (no matches)
```
Input:  dictionary = ["xyz"],
        sentence = "the cattle sat"
Output: "the cattle sat"
```

## Constraints
- `1 <= dictionary.length <= 1000`
- `1 <= dictionary[i].length <= 100`
- `1 <= sentence.length <= 10^6`
- `sentence` contains only lowercase English letters and spaces.
- Each word in the sentence is separated by exactly one space.

## Hints

<details>
<summary>Hint 1 — the brute force approach and why it's slow</summary>

For each word in the sentence, check whether any root in the dictionary is a prefix of it. With a simple loop, that's O(|dictionary| × |word|) per word, and O(S × D × L) overall — potentially very slow when the sentence is large.
</details>

<details>
<summary>Hint 2 — how a trie speeds this up</summary>

Insert all roots into a trie. For each word in the sentence, walk the trie character by character. At each step, if `node.isEnd` is true, you've found the shortest matching root — stop and use it. If the walk falls off the trie (a character is not in `children`), no root matches — keep the original word.

One pass through the word (O(L) per word). That's it.
</details>

<details>
<summary>Hint 3 — putting it together</summary>

1. Build a trie from `dictionary`.
2. Split `sentence` into words.
3. For each word, call a `findShortestRoot(word)` helper:
   - Walk the trie character by character.
   - If at any point `node.isEnd === true`, return the path built so far (the root).
   - If a character is missing from `children`, return the original word.
4. Join the (possibly replaced) words back with spaces.
</details>

## Write your solution
→ [`../solutions/07-replace-words.js`](../solutions/07-replace-words.js)

## Follow-ups
- What if you wanted the **longest** matching root instead of the shortest?
- LeetCode 648 — this exact problem.
- What if you needed to find all matching roots for each word, not just the shortest?
