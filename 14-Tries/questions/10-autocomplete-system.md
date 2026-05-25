# Q10 — Autocomplete System

**Difficulty:** Medium
**Pattern:** Trie + frequency ranking
**Expected:** O(N × L) build · O(L + K log K) per character input · O(N × L) space

## Problem

Design an autocomplete system. You are given an array `sentences` (previously typed sentences) and a `times` array (how many times each sentence was typed). The index of a sentence in `sentences` corresponds to the index of its frequency in `times`.

Implement a method `input(c)` that:
- Takes a single character `c`.
- Returns the **top 3 most frequent** sentences/words that have a prefix matching the characters typed so far.
- If two sentences have the same frequency, return them in **lexicographic order**.
- The special character `'#'` marks the end of input. When `'#'` is typed:
  - Save the completed sentence with frequency incremented by 1 (or add it if new).
  - Return an empty array.
  - Reset the current input.

> **Real-world version:** This is how Google suggests completions when you type into the search bar.

## Examples

### Example 1
```
const sys = new AutocompleteSystem(
  ["i love you", "island", "iroman", "i love leetcode"],
  [5, 3, 2, 2]
);

sys.input("i");
// ["i love you", "island", "i love leetcode"]
// "i love you" (5), "island" (3), then tie between "iroman" and "i love leetcode" (both 2)
// → pick "i love leetcode" over "iroman" lexicographically

sys.input(" ");
// ["i love you", "i love leetcode"]
// after typing "i ", only sentences starting with "i " match

sys.input("a");
// []  — nothing starts with "i a"

sys.input("#");
// []  — saves "i a" with frequency 1, resets input
```

### Example 2 (after saving a new sentence, it appears in future suggestions)
```
// continuing from Example 1...
sys.input("i");
// ["i love you", "island", "i love leetcode"]
// "i a" has frequency 1 — not in top 3
```

## Constraints
- `1 <= sentences.length == times.length <= 100`
- `1 <= sentences[i].length <= 100`
- `1 <= times[i] <= 50`
- `c` is a lowercase English letter, a space `' '`, or `'#'`.
- Each sentence except the one being typed consists of lowercase letters and spaces.
- At most `5000` calls to `input`.

## Hints

<details>
<summary>Hint 1 — overall design</summary>

Use a trie to store all sentences. But this trie operates on sentences (including spaces), not just words.

At each node, keep a list of all sentences in the subtree, or be ready to collect them on demand.

Also maintain a frequency map (sentence → count) separate from the trie.

Track the "current typed prefix" as a string that grows with each `input` call and resets on `'#'`.
</details>

<details>
<summary>Hint 2 — handling `input(c)` step by step</summary>

1. If `c === '#'`: increment the frequency of `currentInput` by 1, insert it into the trie if not already there, reset `currentInput = ""`, return `[]`.
2. Otherwise: append `c` to `currentInput`. Navigate to the node matching `currentInput` in the trie (same as `startsWith` navigation). If the path doesn't exist, return `[]`.
3. From the current trie node, collect all sentences in the subtree (DFS).
4. Sort by: frequency descending, then lexicographic ascending.
5. Return the top 3.
</details>

<details>
<summary>Hint 3 — efficiency tip</summary>

For the given constraints (≤5000 calls, ≤100 initial sentences), even collecting all suffixes via DFS on each `input` call is fine. In a real system, you'd precompute and cache the top-K at each node.

A clean approach: store the frequency map separately, and when collecting results, sort them using the map:
```js
results.sort((a, b) => freqMap[b] - freqMap[a] || a.localeCompare(b));
```
</details>

## Write your solution
→ [`../solutions/10-autocomplete-system.js`](../solutions/10-autocomplete-system.js)

## Follow-ups
- LeetCode 642 — this exact problem.
- What if the ranking was based on recency (most recently typed, not most frequently typed)?
- How would you handle the trie growing very large over millions of typed sentences?
