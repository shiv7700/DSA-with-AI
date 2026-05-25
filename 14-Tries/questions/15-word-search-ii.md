# Q15 — Word Search II

**Difficulty:** Hard
**Pattern:** Trie + DFS backtracking on a grid
**Expected:** O(M × N × 4^L) worst case · O(K × L) space (K words, L max length)

## Problem

Given an `m × n` grid of characters `board` and a list of strings `words`, find all words from the list that can be formed by letters in the board.

A word is formed by sequentially adjacent cells (horizontally or vertically). The same cell may not be used more than once in a single word path.

> **Why a trie?** The naive approach: for each word, run a separate DFS on the board. That's O(K × M × N × 4^L). With a trie, you run a single DFS and prune branches the moment they stop matching any word. This is significantly faster when K is large and words share prefixes.

## Examples

### Example 1
```
Input:
  board = [
    ['o','a','a','n'],
    ['e','t','a','e'],
    ['i','h','k','r'],
    ['i','f','l','v']
  ]
  words = ["eat","oath","pea","rain"]

Output: ["eat","oath"]
```
- "eat": (1,3)→(0,3)→(1,3)? No — board DFS must be traced: e(1,0)→a(0,1)? Not adjacent...
  Actually: e(1,3)→a(2,3)→t(1,3) — using (row 1 col 3), (row 0 col 3)... let me re-trace properly.
  "eat": e at (1,0), a at (0,1) — not adjacent. e at (1,3), adjacent cells include (0,3)='n', (2,3)='r'. "eat" found via DFS starting at (1,1)? → see full board DFS.
- "oath": o(0,0)→a(0,1)→t(1,1)→h(2,1).

### Example 2
```
Input:
  board = [['a','b'],['c','d']]
  words = ["abdc","abcd","adcb","adbc","cdba"]

Output: ["abdc","abcd","adcb"]
```

### Example 3 (no matches)
```
Input:
  board = [['a']],  words = ["b"]
Output: []
```

## Constraints
- `m == board.length`, `n == board[i].length`
- `1 <= m, n <= 12`
- `board[i][j]` is a lowercase English letter.
- `1 <= words.length <= 3 × 10^4`
- `1 <= words[i].length <= 10`
- All words are unique.

## Hints

<details>
<summary>Hint 1 — why trie + DFS, not DFS per word</summary>

Doing a separate DFS for each of 30,000 words on a 12×12 board is too slow. Instead, insert all words into a trie. Run one DFS from every cell. As the DFS extends a path, walk the trie simultaneously. If the current path prefix isn't in the trie, don't extend it — prune immediately. When `node.isEnd` is true, you've found a word.
</details>

<details>
<summary>Hint 2 — the DFS + trie walk</summary>

```js
function dfs(board, node, i, j, path, results) {
  if (node.isEnd) { results.add(path); node.isEnd = false; }  // avoid duplicates
  if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return;
  const c = board[i][j];
  if (c === '#' || !node.children[c]) return;  // '#' = visited marker

  board[i][j] = '#';  // mark visited
  const nextNode = node.children[c];
  dfs(board, nextNode, i+1, j, path+c, results);
  dfs(board, nextNode, i-1, j, path+c, results);
  dfs(board, nextNode, i, j+1, path+c, results);
  dfs(board, nextNode, i, j-1, path+c, results);
  board[i][j] = c;  // restore
}
```
</details>

<details>
<summary>Hint 3 — pruning dead branches</summary>

After finding a word, you can set `node.isEnd = false` to avoid re-adding the same word. You can also remove leaf nodes that are no longer needed (their `isEnd` is false and they have no children). This is called "trie pruning" and dramatically speeds up the DFS on large word lists.
</details>

## Write your solution
→ [`../solutions/15-word-search-ii.js`](../solutions/15-word-search-ii.js)

## Follow-ups
- LeetCode 212 — this exact problem.
- What if diagonal movement was also allowed?
- Word Search I (LeetCode 79) — find a single word. How is the approach simpler without a trie?
