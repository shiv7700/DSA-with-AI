# Q9 — Map Sum Pairs

**Difficulty:** Medium
**Pattern:** Trie — storing values at nodes, prefix sum
**Expected:** O(L) per operation · O(N × L) space

## Problem

Design a data structure that supports two operations:

- **`insert(key, val)`** — inserts the string `key` with integer value `val`. If `key` already exists, overwrite its value.
- **`sum(prefix)`** — returns the sum of all values whose key starts with `prefix`.

> **Analogy:** think of this as a hash map (`key → value`) where you can also ask "what is the total value of all keys starting with this prefix?" instantly.

## Examples

### Example 1
```
const ms = new MapSum();
ms.insert("apple", 3);
ms.sum("ap");           // 3  — only "apple" starts with "ap"
ms.insert("app", 2);
ms.sum("ap");           // 5  — "apple" (3) + "app" (2) = 5
```

### Example 2
```
const ms = new MapSum();
ms.insert("bat", 5);
ms.insert("ball", 3);
ms.insert("band", 1);
ms.insert("xyz", 10);

ms.sum("ba");           // 9  — bat(5) + ball(3) + band(1)
ms.sum("bal");          // 3  — ball(3)
ms.sum("b");            // 9  — all "b*" words
ms.sum("z");            // 0  — no words start with "z"
ms.sum("");             // 19 — all words (empty prefix = everything)
```

### Example 3 (overwrite)
```
const ms = new MapSum();
ms.insert("apple", 3);
ms.sum("ap");           // 3
ms.insert("apple", 10);  // overwrite
ms.sum("ap");           // 10  — updated value
```

## Constraints
- `1 <= key.length, prefix.length <= 50`
- `key` consists of lowercase English letters.
- `1 <= val <= 1000`
- At most `50` calls total to `insert` and `sum`.

## Hints

<details>
<summary>Hint 1 — where to store the value</summary>

Extend `TrieNode` to also hold a `val` field (defaulting to 0). When inserting, set `node.val = val` at the last node (just like setting `isEnd = true`).

For `sum(prefix)`, navigate to the node at the end of the prefix, then DFS through the entire subtree, accumulating all `node.val` values.
</details>

<details>
<summary>Hint 2 — handling overwrites</summary>

If you insert the same key twice, the second insert will walk the same path and just overwrite `node.val` at the final node. Nodes along the path are shared and unchanged.
</details>

<details>
<summary>Hint 3 — a smarter approach (propagate sums up)</summary>

Instead of doing a DFS on every `sum` call, store at each node the **total value of all words in its subtree**. When inserting:
- Walk the path. At each node, add `val` (or `val - oldVal` if overwriting).
- This makes `sum(prefix)` an O(L) operation that just looks up the prefix node and returns its precomputed sum.

The trade-off: more bookkeeping on insert. For the given constraints, the simple DFS approach works fine.
</details>

## Write your solution
→ [`../solutions/09-map-sum-pairs.js`](../solutions/09-map-sum-pairs.js)

## Follow-ups
- LeetCode 677 — this exact problem.
- What if you wanted `max(prefix)` instead of `sum(prefix)`?
- What if values could be negative?
