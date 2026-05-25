# Q14 — Word Search

**Difficulty:** Medium
**Pattern:** Grid backtracking — DFS with visited marking and unmark on retreat
**Expected:** O(m · n · 4^L) time · O(L) space — where L is the word length

## Problem

Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same cell may not be used more than once.

## Examples

### Example 1
```
Input:  board = [["A","B","C","E"],
                 ["S","F","C","S"],
                 ["A","D","E","E"]],
        word = "ABCCED"
Output: true
```

### Example 2
```
Input:  board = [["A","B","C","E"],
                 ["S","F","C","S"],
                 ["A","D","E","E"]],
        word = "SEE"
Output: true
```

### Example 3
```
Input:  board = [["A","B","C","E"],
                 ["S","F","C","S"],
                 ["A","D","E","E"]],
        word = "ABCB"
Output: false
```
`B` at position (0,1) cannot be reused.

## Constraints
- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 6`
- `1 <= word.length <= 15`
- `board` and `word` consist of only uppercase and lowercase English letters.

## Hints

<details>
<summary>Hint 1 — find all possible starting cells</summary>

Scan the entire board for cells that match `word[0]`. For each such cell, launch a DFS to try building the rest of the word.
</details>

<details>
<summary>Hint 2 — DFS with in-place visited marking</summary>

To mark a cell as visited without an extra matrix, temporarily overwrite `board[row][col]` with a sentinel character (e.g., `'#'`). After recursion, restore the original character. This is the choose/unchoose pattern applied to a grid.
</details>

<details>
<summary>Hint 3 — DFS structure</summary>

`dfs(row, col, index)` returns `true` if `word[index:]` can be spelled starting at `(row, col)`. Base case: `index === word.length` → found it. Pruning: out-of-bounds, already visited, or character mismatch → return false.
</details>

## Write your solution
→ [`../solutions/14-word-search.js`](../solutions/14-word-search.js)

## Follow-ups
- **Word Search II** — find all words from a dictionary in one pass (Trie + backtracking).
- Can you find the longest word that exists in the board?
- What changes if diagonal movement is also allowed?
