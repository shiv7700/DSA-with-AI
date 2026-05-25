# Q2 — Count Total Words in a Trie

**Difficulty:** Easy
**Pattern:** Trie — DFS traversal
**Expected:** O(N × L) time · O(N × L) space

## Problem

Given a trie that has already had some words inserted into it, write a method `countWords()` that returns the **total number of distinct words** stored.

> **Why "distinct"?** If you insert `"cat"` twice, a correctly implemented trie only stores one copy (inserting the same word twice just sets `isEnd = true` twice — no change). So `countWords` just needs to count nodes where `isEnd === true`.

## Examples

### Example 1
```
const trie = new Trie();
trie.insert("cat");
trie.insert("car");
trie.insert("cart");
trie.insert("dog");
trie.countWords();   // 4
```

### Example 2
```
const trie = new Trie();
trie.insert("cat");
trie.insert("cat");   // duplicate — doesn't count again
trie.insert("ca");    // "ca" is a word too, if inserted
trie.countWords();    // 2
```

### Example 3 (empty trie)
```
const trie = new Trie();
trie.countWords();   // 0
```

## Constraints
- The trie may have been built by multiple `insert` calls.
- `0 <= number of words <= 10^4`
- Each word consists of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — what does countWords need to find?</summary>

You need to count every node in the trie where `isEnd === true`. That means visiting every node. Which traversal does that — BFS or DFS? Either works, but DFS is usually simpler to write recursively on tree structures.
</details>

<details>
<summary>Hint 2 — recursive DFS structure</summary>

Write a helper `_count(node)` that:
1. Returns 0 if `node` is null/undefined.
2. Starts a count of `node.isEnd ? 1 : 0`.
3. For each child in `node.children`, adds `_count(child)` to the running count.
4. Returns the total.

Call `_count(this.root)` from `countWords()`.
</details>

<details>
<summary>Hint 3 — iterative alternative</summary>

You can also use a stack (or queue) to do an iterative DFS/BFS:

```js
countWords() {
  let count = 0;
  const stack = [this.root];
  while (stack.length) {
    const node = stack.pop();
    if (node.isEnd) count++;
    for (const child of Object.values(node.children)) {
      stack.push(child);
    }
  }
  return count;
}
```
</details>

## Write your solution
→ [`../solutions/02-count-words.js`](../solutions/02-count-words.js)

## Follow-ups
- Count words whose length is exactly `k`.
- Count words that contain a specific character.
- Write `isEmpty()` — return `true` if no words have been inserted.
