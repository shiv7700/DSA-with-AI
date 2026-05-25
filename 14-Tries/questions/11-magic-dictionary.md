# Q11 — Implement Magic Dictionary

**Difficulty:** Medium
**Pattern:** Trie — DFS with one allowed mismatch
**Expected:** O(N × L) build · O(26 × L) search · O(N × L) space

## Problem

Design a data structure that is initialized with a list of **different** words. Given a `query` word, a search returns `true` if you can change **exactly one** character in `query` to match any word in the dictionary.

- `buildDict(words)` — builds the dictionary.
- `search(query)` — returns `true` if changing exactly one character in `query` produces a word in the dictionary.

> **Key constraint:** you must change **exactly** one character — not zero, not two. If `query` itself is in the dictionary, it does NOT count unless you can also change one character and still get a valid word.

## Examples

### Example 1
```
const md = new MagicDictionary();
md.buildDict(["hello", "leetcode"]);

md.search("hello");    // false — "hello" is in the dict, but changing 0 chars is not allowed
md.search("hhllo");    // true  — change 'h' at index 1 to 'e' → "hello"
md.search("hell");     // false — wrong length
md.search("leetcoded");// false — wrong length
```

### Example 2
```
const md = new MagicDictionary();
md.buildDict(["cat", "bat", "rat"]);

md.search("pat");   // true  — "pat" → "cat" (c↔p), "bat" (b↔p), or "rat" (r↔p) by changing first char
md.search("cat");   // false — "cat" is in dict but we must change exactly one char
md.search("cas");   // true  — "cas" → "cat" (s↔t)
md.search("catz");  // false — wrong length
```

## Constraints
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` consists only of lowercase English letters.
- `words` are **all distinct**.
- `1 <= query.length <= 100`
- `query` consists only of lowercase English letters.
- At most `100` calls to `search`.

## Hints

<details>
<summary>Hint 1 — brute force without a trie</summary>

For each `query`, compare it against every word in the dictionary. For each pair, count the number of differing characters. If exactly one differs, return true.

With ≤100 words and ≤100 length, this is O(N × L) per search — perfectly fine for the given constraints. But using a trie is better practice.
</details>

<details>
<summary>Hint 2 — the trie approach</summary>

Insert all words into a trie. Search with a twist: walk through the query, keeping track of how many characters have **mismatched** so far.

- If mismatches = 0: at each step, try both the matching child (mismatch count stays 0) AND try all 25 other children (mismatch count becomes 1).
- If mismatches = 1: from now on, must exactly follow the query. Any further mismatch → fail.
- At the end of the query: if `mismatches === 1` and `node.isEnd === true` → success.
</details>

<details>
<summary>Hint 3 — recursive DFS signature</summary>

```js
_search(node, query, i, mismatches) {
  if (i === query.length) {
    return mismatches === 1 && node.isEnd;
  }
  if (mismatches > 1) return false;

  const c = query[i];
  for (const [ch, child] of Object.entries(node.children)) {
    const newMismatches = mismatches + (ch !== c ? 1 : 0);
    if (this._search(child, query, i + 1, newMismatches)) return true;
  }
  return false;
}
```
</details>

## Write your solution
→ [`../solutions/11-magic-dictionary.js`](../solutions/11-magic-dictionary.js)

## Follow-ups
- LeetCode 676 — this exact problem.
- What if you could change **at most** K characters instead of exactly one?
- What if you could add or remove one character in addition to changing one?
