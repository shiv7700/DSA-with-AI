# Q25 — Word Ladder

**Difficulty:** Hard
**Pattern:** BFS on implicit word graph — minimum transformation sequence
**Expected:** O(M² × N) time · O(M² × N) space  (M = word length, N = wordList size)

## Problem

You are given:
- `beginWord`: a starting word.
- `endWord`: a target word.
- `wordList`: a list of valid words.

A **transformation sequence** from `beginWord` to `endWord` via `wordList` is a sequence where:
- Every consecutive pair of words differs by exactly **one letter**.
- Every word in the sequence (except `beginWord`) must be in `wordList`.

Return the **length of the shortest transformation sequence** (number of words, including `beginWord` and `endWord`). Return `0` if no such sequence exists.

**Signature:**
```js
function ladderLength(beginWord, endWord, wordList) { ... }
```

## Examples

### Example 1
```
Input:
  beginWord = "hit",
  endWord   = "cog",
  wordList  = ["hot","dot","dog","lot","log","cog"]

Output: 5

Sequence: "hit" → "hot" → "dot" → "dog" → "cog"
```

### Example 2
```
Input:
  beginWord = "hit",
  endWord   = "cog",
  wordList  = ["hot","dot","dog","lot","log"]

Output: 0
("cog" is not in wordList — impossible.)
```

## Constraints
- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 5000`
- All words have the same length.
- All words consist of lowercase English letters.
- `beginWord != endWord`

## Hints

<details>
<summary>Hint 1 — model it as BFS on a graph</summary>

Each word is a node. Two words are connected if they differ by exactly one letter. You want the shortest path from `beginWord` to `endWord`.

BFS on this implicit graph gives the shortest path. But you don't pre-build the full edge list — you generate neighbors on the fly.
</details>

<details>
<summary>Hint 2 — generating neighbors efficiently</summary>

Naively: for each word in the queue, compare with every word in `wordList` — O(N × M) per step. This works but is slow for large inputs.

Faster: for each position `i` in the word, try replacing the character with each of `a`–`z`. If the result is in the `wordList` set, it's a neighbor. O(M × 26) per word instead of O(N × M).

```js
for (let i = 0; i < word.length; i++) {
  for (let c = 97; c <= 122; c++) {         // 'a' to 'z'
    const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i+1);
    if (wordSet.has(next) && !visited.has(next)) {
      // enqueue next
    }
  }
}
```
</details>

<details>
<summary>Hint 3 — remove from wordSet to mark visited</summary>

Instead of a separate `visited` set, delete words from `wordList` as you visit them. This is safe because you never need to visit a word twice.
</details>

## Write your solution
→ [`../solutions/25-word-ladder.js`](../solutions/25-word-ladder.js)

## Follow-ups
- **Word Ladder II** (LeetCode 126): return all shortest transformation sequences (not just the length). This is significantly harder — requires BFS + backtracking.
- **Bidirectional BFS**: simultaneously BFS from `beginWord` and `endWord` and meet in the middle. This is often 2–10× faster in practice.
- How is this problem related to **Open the Lock** (Q18)?
