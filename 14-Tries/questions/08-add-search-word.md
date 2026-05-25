# Q8 — Add and Search Word (Wildcard `.`)

**Difficulty:** Medium
**Pattern:** Trie — DFS with wildcard branching
**Expected:** O(L) per `addWord` · O(26^M) worst case per `search` (M = wildcards) · O(N × L) space

## Problem

Design a data structure that supports two operations:

- **`addWord(word)`** — adds a word to the structure.
- **`search(word)`** — returns `true` if any string in the structure matches `word`. The search word may contain the wildcard character `.`, which can match **any single letter**.

> **The wildcard makes this harder.** A normal trie search always goes to exactly one child. When you encounter `.`, you must try all children — branching the search.

## Examples

### Example 1
```
const wd = new WordDictionary();
wd.addWord("bad");
wd.addWord("dad");
wd.addWord("mad");

wd.search("pad");   // false — no word matches
wd.search("bad");   // true
wd.search(".ad");   // true  — "bad", "dad", or "mad" all match
wd.search("b..");   // true  — "bad" matches
```

### Example 2
```
const wd = new WordDictionary();
wd.addWord("a");
wd.addWord("a");

wd.search(".");     // true
wd.search("a");     // true
wd.search("aa");    // false
```

### Example 3 (multiple wildcards)
```
const wd = new WordDictionary();
wd.addWord("at");
wd.addWord("and");
wd.addWord("an");
wd.addWord("add");

wd.search("a");     // false — no 1-letter word "a"
wd.search(".at");   // false — no 3-letter word ending in "at" starting with any char
wd.search("an.");   // true  — "and" matches
wd.search("a.d");   // true  — "and" and "add" both match
```

## Constraints
- `1 <= word.length <= 25`
- `word` in `addWord` consists only of lowercase English letters.
- `word` in `search` consists of lowercase English letters and `.`
- At most `10^4` calls to `addWord` and `search`.

## Hints

<details>
<summary>Hint 1 — `addWord` is just a normal trie insert</summary>

`addWord` is exactly the same as `insert` from Q1. No changes needed — we're just storing words the same way as before.
</details>

<details>
<summary>Hint 2 — `search` needs DFS</summary>

When you encounter a regular character, walk to that specific child (same as normal search). When you encounter `.`, you must try **every child** of the current node.

This naturally suggests recursion (or an explicit stack). Write a helper:

```js
_searchFrom(node, word, i) {
  if (i === word.length) return node.isEnd;
  const c = word[i];
  if (c !== '.') {
    if (!node.children[c]) return false;
    return this._searchFrom(node.children[c], word, i + 1);
  }
  // wildcard: try all children
  for (const child of Object.values(node.children)) {
    if (this._searchFrom(child, word, i + 1)) return true;
  }
  return false;
}
```
</details>

<details>
<summary>Hint 3 — worst case performance</summary>

If every character is `.`, you explore all paths of the given length. With a 26-way branching factor and M wildcards, that's up to 26^M paths. This is why the constraint limits word length to 25 and total calls to 10^4 — the test cases are designed so this doesn't time out in practice.

For the given constraints, the recursive DFS is perfectly fine.
</details>

## Write your solution
→ [`../solutions/08-add-search-word.js`](../solutions/08-add-search-word.js)

## Follow-ups
- What if `.` could match **zero or more** characters (like regex `.*`)?
- LeetCode 211 — this exact problem.
- How would you support both `.` and `?` as wildcards with different meanings?
