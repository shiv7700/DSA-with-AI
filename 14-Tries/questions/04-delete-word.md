# Q4 — Delete a Word From a Trie

**Difficulty:** Easy (but subtle)
**Pattern:** Trie — recursive delete with bottom-up pruning
**Expected:** O(L) time · O(L) space (call stack)

## Problem

Add a `delete(word)` method to the Trie that removes the word from the trie, if it exists.

The tricky part: deleting a word must not break other words that share a prefix with it.

**Rules:**
1. If the word is not in the trie, do nothing.
2. After deleting, `search(word)` must return `false`.
3. Any other word that shared a prefix with `word` must still be searchable and findable via `startsWith`.

## Examples

### Example 1 — basic delete
```
const trie = new Trie();
trie.insert("cat");
trie.insert("car");
trie.insert("cart");

trie.delete("cat");

trie.search("cat");        // false — deleted
trie.search("car");        // true  — unaffected
trie.search("cart");       // true  — unaffected
trie.startsWith("ca");     // true  — "car" and "cart" still exist
```

### Example 2 — deleting a prefix of another word
```
trie.insert("car");
trie.insert("cart");

trie.delete("car");

trie.search("car");    // false — deleted
trie.search("cart");   // true  — must still be searchable
trie.startsWith("ca"); // true  — "cart" still starts with "ca"
```

### Example 3 — word that is not in trie
```
trie.insert("apple");
trie.delete("app");      // "app" was never inserted — do nothing
trie.search("apple");    // true — unaffected
```

### Example 4 — deleting the only word
```
trie.insert("hello");
trie.delete("hello");
trie.search("hello");       // false
trie.startsWith("hell");    // false  — no words remain starting with "hell"
```

## Constraints
- `1 <= word.length <= 2000`
- `word` consists only of lowercase English letters.
- If the word is not in the trie, the operation is a no-op.

## Hints

<details>
<summary>Hint 1 — what "deleting" actually means</summary>

You cannot simply remove the node for the last character of the word — other words might need that path. For example, deleting `"car"` when `"cart"` exists: the `'r'` node is shared.

What you CAN always safely do: set `isEnd = false` on the word's last node. That makes `search("car")` return false. But we should go further and clean up any now-useless nodes.
</details>

<details>
<summary>Hint 2 — when is a node safe to delete?</summary>

A node is safe to remove only if both:
1. It has **no children** (nothing depends on it further down).
2. Its `isEnd` is `false` (it is not itself the end of another word).

So after clearing `isEnd` at the target node, walk back up and remove any node that satisfies both conditions.
</details>

<details>
<summary>Hint 3 — recursion makes this clean</summary>

Use a recursive helper `_deleteHelper(node, word, depth)`:

1. If `depth === word.length`: we're at the target node. If `isEnd` is false, the word isn't here — return `false`. Otherwise, set `isEnd = false`. Return `true` if the node now has no children (safe to delete), `false` otherwise.
2. Otherwise: recurse on `node.children[word[depth]]`. If the recursive call returns `true`, delete that child from `node.children`. Then return `true` if THIS node also has no children and `isEnd` is false.
</details>

## Write your solution
→ [`../solutions/04-delete-word.js`](../solutions/04-delete-word.js)

## Follow-ups
- Add a `deleteAll()` method that removes every word from the trie.
- What if you wanted to delete all words that start with a given prefix? (Hint: find the prefix node, then detach its entire subtree.)
- After a series of inserts and deletes, what determines whether the trie is empty?
