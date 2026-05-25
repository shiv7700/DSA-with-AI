# Q1 — Implement a Trie (insert / search / startsWith)

**Difficulty:** Easy
**Pattern:** Trie — core structure
**Expected:** O(L) per operation · O(N × L) space total

## Problem

Implement a **Trie** (also called a prefix tree) that supports three operations:

- **`insert(word)`** — inserts the string `word` into the trie.
- **`search(word)`** — returns `true` if `word` is in the trie (as a complete word), `false` otherwise.
- **`startsWith(prefix)`** — returns `true` if there is any word in the trie that starts with `prefix`, `false` otherwise.

This is the foundational problem for the entire chapter. Once you build this, every other trie problem is a variation on it.

> **Why this matters:** Tries are what power autocomplete in search engines, spell-checkers in word processors, and dictionary lookups in text games. The structure you build here is the exact pattern used in those real systems.

## Examples

### Example 1
```
const trie = new Trie();
trie.insert("apple");
trie.search("apple");     // true
trie.search("app");       // false  — "app" was never inserted as a complete word
trie.startsWith("app");   // true   — "apple" starts with "app"
trie.insert("app");
trie.search("app");       // true   — now "app" is a complete word too
```

### Example 2
```
const trie = new Trie();
trie.insert("cat");
trie.insert("car");
trie.insert("cart");
trie.insert("dog");

trie.search("car");       // true
trie.search("ca");        // false  — only a prefix
trie.startsWith("ca");    // true
trie.startsWith("do");    // true
trie.startsWith("di");    // false
trie.search("door");      // false  — never inserted
```

### Example 3 (edge cases)
```
const trie = new Trie();
trie.search("anything");        // false — trie is empty
trie.startsWith("a");           // false — trie is empty
trie.insert("");
trie.search("");                // true  — empty string can be a valid word
```

## Constraints
- `0 <= word.length, prefix.length <= 2000`
- `word` and `prefix` consist only of lowercase English letters.
- At most `3 × 10^4` calls will be made to `insert`, `search`, and `startsWith`.

## Hints

<details>
<summary>Hint 1 — what does a single node need?</summary>

Each node in the trie represents a "point reached" after spelling some characters. It needs two things:

1. A way to reach the next character. Since there are 26 possible next letters, use an object `{}` mapping character → next TrieNode. (A `Map` works too.)
2. A flag saying "a valid word ends here." Use a boolean `isEnd`.

```js
class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}
```
</details>

<details>
<summary>Hint 2 — how does insert work?</summary>

Start at the root. For each character `c` in the word:
- If `node.children[c]` doesn't exist, create a new TrieNode there.
- Move `node` to `node.children[c]`.

After the loop, set `node.isEnd = true` — we've spelled the whole word.
</details>

<details>
<summary>Hint 3 — how does search differ from startsWith?</summary>

Both walk the trie the same way — character by character, returning `false` if any child is missing.

The only difference is what they check at the end:
- `search`: return `node.isEnd` (must be a complete word)
- `startsWith`: return `true` (path existing is enough)
</details>

## Write your solution
→ [`../solutions/01-implement-trie.js`](../solutions/01-implement-trie.js)

## Follow-ups
- Extend the trie to count how many words have been inserted in total.
- Extend `insert` to also store a value with each word (like a hash map, but with prefix support).
- What happens if you try to insert the same word twice? Does your implementation handle it correctly?
