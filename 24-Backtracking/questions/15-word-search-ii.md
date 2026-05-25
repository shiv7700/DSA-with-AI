# Q15 — Word Search II (Trie + Backtracking)

**Difficulty:** Hard
**Pattern:** Trie + grid backtracking — prune DFS branches against a prefix trie
**Expected:** O(m · n · 4 · 3^(L-1)) time · O(sum of word lengths) space

## Problem

Given an `m x n` board of characters and a list of strings `words`, return all words in `words` that exist in the board. A word can be constructed from letters of sequentially adjacent cells (horizontally or vertically neighboring). The same cell may not be used more than once per word.

## Examples

### Example 1
```
Input:  board = [["o","a","a","n"],
                 ["e","t","a","e"],
                 ["i","h","k","r"],
                 ["i","f","l","v"]],
        words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
```

### Example 2
```
Input:  board = [["a","b"],["c","d"]],
        words = ["abcb"]
Output: []
```

## Constraints
- `m == board.length`, `n == board[i].length`
- `1 <= m, n <= 12`
- `board[i][j]` is a lowercase English letter.
- `1 <= words.length <= 3 * 10^4`
- `1 <= words[i].length <= 10`
- `words[i]` consists of lowercase English letters.
- All strings in `words` are unique.

## Hints

<details>
<summary>Hint 1 — why not run Word Search for each word?</summary>

Running Word Search I for each word independently is O(words.length · m · n · 4^L). With up to 30,000 words, that is too slow. The key insight: share prefix checking across all words using a **Trie**.
</details>

<details>
<summary>Hint 2 — build a Trie from the word list</summary>

Insert all `words` into a Trie. During grid DFS, follow the Trie node corresponding to each character visited. If there is no Trie node for the current character, the DFS branch cannot lead to any word — prune immediately.
</details>

<details>
<summary>Hint 3 — collect words during DFS</summary>

When a Trie node has `isEnd = true`, you have found a word. Add it to results and clear the `isEnd` flag to prevent duplicates. Continue the DFS — longer words may still be buildable from this node.
</details>

<details>
<summary>Hint 4 — remove Trie nodes after finding a word (optimization)</summary>

After finding a word, walk back up the Trie and remove leaf nodes that are no longer needed. This aggressively prunes future DFS branches and prevents re-visiting paths that lead to already-found words.
</details>

## Write your solution
→ [`../solutions/15-word-search-ii.js`](../solutions/15-word-search-ii.js)

## Follow-ups
- **Word Search I** — single word, no Trie needed.
- **Boggle Game** — same problem but with diagonal movement and scoring.
- How does the Trie pruning change the practical runtime versus the worst-case bound?
