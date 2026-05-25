# Q15 — Word Ladder

**Difficulty:** Medium
**Pattern:** BFS shortest path · Implicit graph on words
**Expected:** O(m² × n) time · O(m² × n) space  (m = word length, n = wordList size)

## Problem

Given a `beginWord`, an `endWord`, and a `wordList`, find the **length of the shortest transformation sequence** from `beginWord` to `endWord`, where:

- Each step changes exactly **one letter**.
- Each intermediate word must exist in `wordList`.

Return the number of words in the shortest sequence (including begin and end words). Return `0` if no such sequence exists.

## Examples

### Example 1

```
beginWord = "hit"
endWord   = "cog"
wordList  = ["hot","dot","dog","lot","log","cog"]

Output: 5

Shortest path:
  hit → hot → dot → dog → cog
  (5 words)

Step-by-step:
  hit → hot  (h→h, i→o, t→t: changed index 1)
  hot → dot  (h→d, o→o, t→t: changed index 0)
  dot → dog  (d→d, o→o, t→g: changed index 2)
  dog → cog  (d→c, o→o, g→g: changed index 0)
```

### Example 2

```
beginWord = "hit"
endWord   = "cog"
wordList  = ["hot","dot","dog","lot","log"]

Output: 0   (endWord "cog" is not in wordList)
```

### Example 3

```
beginWord = "a"
endWord   = "c"
wordList  = ["a","b","c"]

Output: 2   (a → c — wait, is 'a' → 'c' one change? yes, one letter different)
```

## Constraints

- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 5000`
- All words have the same length and consist of lowercase English letters.
- `beginWord != endWord`

## Hints

<details>
<summary>Hint 1 — this is an implicit graph</summary>

The nodes of the graph are words. Two words are connected by an edge if they differ by exactly one letter. You never need to build the graph explicitly — just check neighbors on the fly.

The answer is the shortest path from `beginWord` to `endWord` in this implicit graph — which means BFS.
</details>

<details>
<summary>Hint 2 — generating neighbors efficiently</summary>

For each word, try replacing each character position with every letter 'a'-'z'. If the resulting word exists in `wordList` (use a `Set` for O(1) lookup) and hasn't been visited, it's a neighbor.

```js
const wordSet = new Set(wordList);

function getNeighbors(word) {
  const neighbors = [];
  for (let i = 0; i < word.length; i++) {
    for (let c = 97; c <= 122; c++) {   // 'a' to 'z'
      const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
      if (wordSet.has(next)) neighbors.push(next);
    }
  }
  return neighbors;
}
```
</details>

<details>
<summary>Hint 3 — BFS with distance tracking</summary>

```js
const queue = [[beginWord, 1]];   // [word, steps so far]
const visited = new Set([beginWord]);

while (queue.length > 0) {
  const [word, steps] = queue.shift();
  if (word === endWord) return steps;
  for (const neighbor of getNeighbors(word)) {
    if (!visited.has(neighbor)) {
      visited.add(neighbor);
      queue.push([neighbor, steps + 1]);
    }
  }
}
return 0;
```
</details>

## Write your solution
→ [`../solutions/15-word-ladder.js`](../solutions/15-word-ladder.js)

## Follow-ups
- **Word Ladder II** (Hard): return ALL shortest transformation sequences, not just the length.
- Bidirectional BFS — run BFS from both `beginWord` and `endWord` simultaneously. When the two frontiers meet, you have the shortest path. This can reduce the search space dramatically.
- What if you could change two letters at once? How would the implicit graph change?
