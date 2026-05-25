# Q19 — Word Squares

**Difficulty:** Hard
**Pattern:** Trie + backtracking
**Expected:** O(N × L × 26^L) worst case · O(N × L) space

## Problem

Given a list of **unique** words of the same length, return all the **word squares** you can build from them.

A word square is a sequence of `k` words `[w1, w2, ..., wk]` such that the `i`-th row and the `i`-th column are the same word. In other words, the square reads the same horizontally and vertically.

```
Example of a valid word square from ["ball","area","lead","lady"]:
  b a l l
  a r e a
  l e a d
  l a d y
```
- Row 0 = "ball" = Column 0 (b, a, l, l)
- Row 1 = "area" = Column 1 (a, r, e, a)
- Row 2 = "lead" = Column 2 (l, e, a, d)
- Row 3 = "lady" = Column 3 (l, a, d, y)

## Examples

### Example 1
```
Input:  words = ["area","lead","wall","lady","ball"]
Output:
[
  ["ball","area","lead","lady"],
  ["wall","area","lead","lady"]
]
```

### Example 2
```
Input:  words = ["abat","baba","atan","atal"]
Output:
[
  ["baba","abat","baba","atan"],
  ["baba","abat","baba","atal"]
]
```

## Constraints
- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 5`
- All words are the same length.
- All words consist of lowercase English letters.
- All words are unique.

## Hints

<details>
<summary>Hint 1 — the backtracking structure</summary>

Build word squares row by row. When choosing the `k`-th word (0-indexed):
- The first `k` characters of the `k`-th word must match the `k`-th characters of each previously chosen word.

**Why?** Because the word square constraint says column `k` must equal row `k`. The first `k` characters of column `k` are already determined by the words in rows 0 through `k-1` (specifically, `words[0][k], words[1][k], ..., words[k-1][k]`).

So the `k`-th word must start with: `words[0][k] + words[1][k] + ... + words[k-1][k]`.
</details>

<details>
<summary>Hint 2 — using a trie for prefix lookup</summary>

Build a trie from all words, where each node also stores the list of words in its subtree (or just their indexes). When you need the next word, compute the required prefix and query the trie: get all words starting with that prefix. Try each one in the backtracking recursion.

This avoids scanning all words at each step.
</details>

<details>
<summary>Hint 3 — at each trie node, store a list of word indexes</summary>

```js
// During trie construction:
insert(word, index) {
  let node = this.root;
  node.words.push(index);  // every word is in the root's subtree
  for (const c of word) {
    if (!node.children[c]) {
      node.children[c] = new TrieNode();
    }
    node = node.children[c];
    node.words.push(index);
  }
  node.isEnd = true;
}

// Getting all words with a prefix:
getWordsWithPrefix(prefix) {
  let node = this.root;
  for (const c of prefix) {
    if (!node.children[c]) return [];
    node = node.children[c];
  }
  return node.words;  // indexes of all words in this subtree
}
```
</details>

## Write your solution
→ [`../solutions/19-word-squares.js`](../solutions/19-word-squares.js)

## Follow-ups
- LeetCode 425 — this exact problem.
- What if words could have different lengths?
- How would you check if a given N×N grid (not built by you) IS a word square?
