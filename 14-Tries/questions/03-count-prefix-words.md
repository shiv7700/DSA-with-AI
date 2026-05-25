# Q3 — Count Words With a Given Prefix

**Difficulty:** Easy
**Pattern:** Trie — prefix navigation + DFS count
**Expected:** O(L + K) time · O(L + K) space (L = prefix length, K = words with prefix)

## Problem

Add a method `countWordsWithPrefix(prefix)` to the Trie that returns how many words in the trie **start with** the given prefix.

## Examples

### Example 1
```
const trie = new Trie();
trie.insert("cat");
trie.insert("car");
trie.insert("cart");
trie.insert("carpet");
trie.insert("dog");

trie.countWordsWithPrefix("ca");    // 4  — cat, car, cart, carpet
trie.countWordsWithPrefix("car");   // 3  — car, cart, carpet
trie.countWordsWithPrefix("cart");  // 1  — cart
trie.countWordsWithPrefix("dog");   // 1  — dog
trie.countWordsWithPrefix("do");    // 1  — dog
trie.countWordsWithPrefix("z");     // 0  — no words start with z
```

### Example 2
```
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.insert("application");

trie.countWordsWithPrefix("app");   // 3  — all three words
trie.countWordsWithPrefix("appl");  // 2  — apple, application
trie.countWordsWithPrefix("appli"); // 1  — application
trie.countWordsWithPrefix("");      // 3  — empty prefix = all words
```

### Example 3 (edge cases)
```
const trie = new Trie();
trie.countWordsWithPrefix("a");   // 0  — empty trie
```

## Constraints
- `0 <= prefix.length <= 2000`
- `prefix` consists only of lowercase English letters.
- Empty string `""` as prefix should return the total word count.

## Hints

<details>
<summary>Hint 1 — split the problem in two</summary>

This is a two-step problem:
1. **Navigate to the prefix node:** walk the trie character by character for the prefix, just like `startsWith`. If the path doesn't exist, return 0 immediately.
2. **Count words in the subtree:** from the node you landed on, count all `isEnd` nodes below (just like `countWords` from Q2).
</details>

<details>
<summary>Hint 2 — what to do at step 1</summary>

```js
countWordsWithPrefix(prefix) {
  let node = this.root;
  for (const c of prefix) {
    if (!node.children[c]) return 0;  // prefix not in trie
    node = node.children[c];
  }
  // now node is the root of the subtree matching prefix
  return this._countFromNode(node);
}
```
</details>

<details>
<summary>Hint 3 — reusing the count helper</summary>

Your `_countFromNode(node)` is essentially the same DFS count from Q2 — it traverses the subtree and sums up `isEnd` flags. You can reuse the same logic.

Remember: if the prefix itself is a complete word (e.g., `"car"` when `"car"` is in the trie), `node.isEnd` is `true` and should be counted.
</details>

## Write your solution
→ [`../solutions/03-count-prefix-words.js`](../solutions/03-count-prefix-words.js)

## Follow-ups
- Instead of counting, return an array of all words that share the given prefix (this is the core of autocomplete).
- What if you wanted to count prefixes, not complete words — count how many distinct prefixes exist?
- Add a `count` field to each TrieNode that gets incremented on `insert`, so `countWordsWithPrefix` becomes O(L) without needing DFS. What's the trade-off?
