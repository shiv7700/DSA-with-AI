# Q5 — Print All Words Stored in a Trie

**Difficulty:** Easy
**Pattern:** Trie — DFS with path tracking
**Expected:** O(N × L) time · O(N × L) space

## Problem

Add a `getAllWords()` method to the Trie that returns an **array of all words** stored in it, in **lexicographic (alphabetical) order**.

> **Why lexicographic order?** DFS on a trie naturally visits children in alphabetical order if you iterate over the keys of `children` in sorted order. You'll get the sorted list "for free" — no extra sorting step needed.

## Examples

### Example 1
```
const trie = new Trie();
trie.insert("cat");
trie.insert("car");
trie.insert("cart");
trie.insert("dog");

trie.getAllWords();
// ["car", "cart", "cat", "dog"]   ← alphabetical order
```

### Example 2
```
const trie = new Trie();
trie.insert("banana");
trie.insert("band");
trie.insert("bandana");
trie.insert("apple");

trie.getAllWords();
// ["apple", "band", "bandana", "banana"]
```

### Example 3 (edge cases)
```
const trie = new Trie();
trie.getAllWords();   // []  — empty trie

trie.insert("a");
trie.getAllWords();   // ["a"]
```

## Constraints
- `0 <= total words <= 10^4`
- Each word consists of lowercase English letters.
- Return words in lexicographic order.

## Hints

<details>
<summary>Hint 1 — picture the DFS</summary>

Imagine walking the trie from the root, always choosing children in alphabetical order. You're building up a string one character at a time as you go deeper. Every time you land on a node where `isEnd === true`, you've assembled a complete word — add it to your results.

When you backtrack (the recursive call returns), you need to "undo" the last character you added.
</details>

<details>
<summary>Hint 2 — passing the current path as a parameter</summary>

Write a helper `_dfs(node, path, results)`:
- `path` is the string built so far (e.g., `"ca"` when we're at the [ca] node).
- If `node.isEnd`, push `path` into `results`.
- For each character `c` in `Object.keys(node.children).sort()`, recurse with `path + c`.

Why `sort()`? To ensure alphabetical order.

Starting call: `_dfs(this.root, "", [])`.
</details>

<details>
<summary>Hint 3 — using an array for path (more efficient)</summary>

Concatenating strings in a loop creates many temporary strings. A slight optimization: use an array as the path stack.

```js
_dfs(node, pathArr, results) {
  if (node.isEnd) results.push(pathArr.join(''));
  for (const c of Object.keys(node.children).sort()) {
    pathArr.push(c);
    this._dfs(node.children[c], pathArr, results);
    pathArr.pop();   // backtrack
  }
}
```

The `pop()` is the "undo" step — essential for correct backtracking.
</details>

## Write your solution
→ [`../solutions/05-print-all-words.js`](../solutions/05-print-all-words.js)

## Follow-ups
- Return words in **reverse** lexicographic order.
- Return only words that are **exactly** `k` characters long.
- Return all words starting with a given prefix (combine prefix navigation from Q3 with the DFS from this question — that's the core of autocomplete).
