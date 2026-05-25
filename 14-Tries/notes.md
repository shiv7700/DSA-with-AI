# Tries (Prefix Trees) — Lessons from Zero

> 👋 Hey. This file is for someone who has never seen a trie before. We're going to go slow. Each lesson builds exactly one idea on top of the previous one. When you finish, you'll have genuine intuition for why tries exist, how they work, and when to reach for one.
>
> Total reading time at a relaxed pace: about 60–75 minutes. **You do not have to read it all at once.**

---

## Table of Lessons

1. [The problem tries solve — storing many strings efficiently](#lesson-1)
2. [One small step: grouping by first letter](#lesson-2)
3. [The big idea — a tree where edges are characters](#lesson-3)
4. [Drawing your first trie: "cat", "car", "cart", "dog"](#lesson-4)
5. [The TrieNode — what a single node holds](#lesson-5)
6. [Insert — walking and building the path](#lesson-6)
7. [Search — walking without building](#lesson-7)
8. [startsWith — the operation that makes tries famous](#lesson-8)
9. [Why O(L) — and why that's amazing](#lesson-9)
10. [Trie vs. hash map — when to use which](#lesson-10)
11. [Deleting a word — the tricky part](#lesson-11)
12. [Common trie patterns in problems](#lesson-12)
13. [Compressed tries — radix trees (preview)](#lesson-13)
14. [Bit tries — maximum XOR (preview)](#lesson-14)
15. [Suffix structures — suffix array, suffix automaton (preview)](#lesson-15)
16. [Quick reference — complexity, templates, gotchas](#lesson-16)
17. [You did it — what to do next](#lesson-17)

---

<a id="lesson-1"></a>
## Lesson 1 — The problem tries solve

Imagine you're building Google's search bar. As the user types each character, you want to show the top matching suggestions instantly. You have a dictionary of 100,000 words. How do you find all the words that start with, say, `"ca"` — fast?

**Option 1: Linear scan.** Loop through all 100,000 words, check if each starts with `"ca"`. This is O(100,000) every single keystroke. Slow.

**Option 2: Hash map.** Store every word as a key. Instant lookup for exact words — but `map.has("ca")` tells you nothing about which words *begin* with "ca". Prefix queries don't work naturally.

**Option 3: A trie.** A data structure purpose-built for this problem. It can answer "give me all words starting with `"ca"`" in time proportional to the length of the prefix — completely independent of how many words you have stored.

That's the promise of a trie. Let's see how it delivers.

> 🎯 **Key takeaway**
> Tries are built for **prefix queries**. They let you ask "does any word start with this?" or "what are all words starting with this?" in O(L) time, where L is the length of your prefix. No other common data structure does this as naturally.

---

<a id="lesson-2"></a>
## Lesson 2 — One small step: grouping by first letter

Before we jump to the full structure, let's think about a simpler version.

Suppose you have a word list: `["cat", "car", "cart", "dog", "door"]`.

A librarian sorting books by first letter would naturally create piles:

```
c → cat, car, cart
d → dog, door
```

Already useful: to find all words starting with `"c"`, look in the `"c"` pile only.

But inside the `"c"` pile, you still have to scan all three words. Let's go further — now sort within the pile by the **second** letter:

```
c
  a → cat, car, cart
d
  o → dog, door
```

And within the `"ca"` sub-pile, by the **third** letter:

```
c
  a
    r → car, cart
    t → cat
d
  o
    g → dog
    o → door
```

Notice what's happening. We're building a **tree** — and each level of the tree corresponds to one character position. That's a trie.

> 💡 **Tip**
> A trie is nothing more than a very organized way of sharing **common prefixes**. Words that share a prefix share a path.

---

<a id="lesson-3"></a>
## Lesson 3 — The big idea — a tree where edges are characters

Here is the exact definition:

> A **trie** is a tree where:
> - Each **node** represents a point in the word-building process.
> - Each **edge** is labeled with a character.
> - The **path** from the root to any node spells out a prefix.
> - Nodes that mark the **end of a complete word** are flagged specially.

The root node is empty — it represents "we haven't typed anything yet."

From the root, each child edge represents a possible first character. From each of those, each grandchild edge represents a possible second character. And so on.

```
root
 ├── 'c' ──> node
 │             └── 'a' ──> node
 │                           ├── 't' ──> node [END]   ← "cat"
 │                           └── 'r' ──> node [END]   ← "car"
 │                                         └── 't' ──> node [END]  ← "cart"
 └── 'd' ──> node
               └── 'o' ──> node
                             ├── 'g' ──> node [END]   ← "dog"
                             └── 'o' ──> node
                                           └── 'r' ──> node [END]  ← "door"
```

The `[END]` markers are what let us distinguish `"car"` (a complete word) from `"ca"` (just a prefix that happens to exist). Without those markers, we couldn't tell the difference.

> 🎯 **Key takeaway**
> Each edge is a character. Each path from root to an `[END]` node is a word. Nodes without `[END]` represent prefixes that exist but are not complete words by themselves.

---

<a id="lesson-4"></a>
## Lesson 4 — Drawing your first trie: "cat", "car", "cart", "dog"

Let's draw the trie step by step, inserting one word at a time. This is the most important exercise in this whole file — slow down here.

**Start: empty trie.**

```
root
```

**Insert "cat":** walk from root, create 'c' → 'a' → 't', mark 't' as END.

```
root
 └─c─> [c]
         └─a─> [ca]
                 └─t─> [cat] ★
```

**Insert "car":** 'c' and 'a' already exist — reuse them. Create 'r', mark it as END.

```
root
 └─c─> [c]
         └─a─> [ca]
                 ├─t─> [cat] ★
                 └─r─> [car] ★
```

Two words now share the first two characters. That's the trie doing its job.

**Insert "cart":** 'c', 'a', 'r' all exist — reuse them. Create 't' as a child of 'r', mark it as END.

```
root
 └─c─> [c]
         └─a─> [ca]
                 ├─t─> [cat] ★
                 └─r─> [car] ★
                         └─t─> [cart] ★
```

Notice: "car" is still marked END. "cart" is a *longer* word, not a replacement.

**Insert "dog":** 'd' doesn't exist — create the whole path.

```
root
 ├─c─> [c]
 │       └─a─> [ca]
 │               ├─t─> [cat] ★
 │               └─r─> [car] ★
 │                       └─t─> [cart] ★
 └─d─> [d]
         └─o─> [do]
                 └─g─> [dog] ★
```

This is your trie. Every word shares its prefix with other words that share the same prefix. No redundant storage of `"ca"` three times — it's stored once.

> ✋ **Pause and try**
> On paper, extend the trie above by inserting the word `"door"`. Where does it attach? What nodes get created and which are shared?
>
> <details>
> <summary>Show answer</summary>
>
> `"do"` already exists (from inserting "dog"). So we reuse that path. We only need to create a new 'o' child under [do], and then an 'r' child under that, and mark the 'r' node as END.
>
> ```
> root
>  ├─c─> [c]
>  │       └─a─> [ca]
>  │               ├─t─> [cat] ★
>  │               └─r─> [car] ★
>  │                       └─t─> [cart] ★
>  └─d─> [d]
>          └─o─> [do]
>                  ├─g─> [dog] ★
>                  └─o─> [doo]
>                          └─r─> [door] ★
> ```
> </details>

---

<a id="lesson-5"></a>
## Lesson 5 — The TrieNode — what a single node holds

Now let's translate the picture into code. Each node in the trie needs two things:

1. **`children`** — a way to look up which child corresponds to a given character. We'll use a plain JavaScript object `{}` as a map from character → child TrieNode.
2. **`isEnd`** — a boolean flag. `true` if this node is the endpoint of a complete word, `false` otherwise.

```js
class TrieNode {
  constructor() {
    this.children = {};   // e.g. { 'c': TrieNode, 'a': TrieNode, ... }
    this.isEnd = false;   // true only at the end of a valid word
  }
}
```

That's it. Two fields.

> 💡 **`children` as an object vs. a Map vs. a 26-length array**
>
> You'll see three common implementations in the wild:
>
> | Style | Code | Best for |
> |---|---|---|
> | Plain object | `this.children = {}` | Simplest. Works for any characters. |
> | `Map` | `this.children = new Map()` | Slightly cleaner API, same complexity. |
> | Array of 26 | `this.children = new Array(26).fill(null)` | Slightly faster for lowercase a-z only. |
>
> In interviews and problem sets, a plain object `{}` is perfectly fine. We'll use that throughout.

The `Trie` class itself just holds a reference to the root node:

```js
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
}
```

Everything else — insert, search, startsWith — is a method on this class that starts at `this.root` and walks the tree.

> 🎯 **Key takeaway**
> A TrieNode has exactly two pieces of state: a `children` map and an `isEnd` flag. The trie is the `root` TrieNode plus all the nodes reachable from it.

---

<a id="lesson-6"></a>
## Lesson 6 — Insert — walking and building the path

Inserting a word into a trie means: for each character in the word, walk to the matching child (creating it if it doesn't exist), then at the very last character, set `isEnd = true`.

Here it is in pseudocode:

```
insert(word):
  node = root
  for each character c in word:
    if c is not in node.children:
      create a new TrieNode and store it at node.children[c]
    node = node.children[c]
  node.isEnd = true
```

And in JavaScript:

```js
insert(word) {
  let node = this.root;
  for (const c of word) {
    if (!node.children[c]) {
      node.children[c] = new TrieNode();
    }
    node = node.children[c];
  }
  node.isEnd = true;
}
```

Let's trace it for `insert("car")` on a trie that already has `"cat"`:

```
Start: node = root

c = 'c':  root.children['c'] exists → step into it.  node = [c]
c = 'a':  [c].children['a']  exists → step into it.  node = [ca]
c = 'r':  [ca].children['r'] does NOT exist → create new TrieNode. node = [car]

End of word: node.isEnd = true  → [car] is now marked ★
```

The shared `'c'` and `'a'` nodes from "cat" are reused — no duplication.

> ⚠️ **Common mistake**
> After the loop, don't forget `node.isEnd = true`. If you forget this, you can walk the whole path but the word will never be found by `search`.

> 🎯 **Key takeaway**
> Insert is a walk through the trie, one character at a time. Create nodes where they're missing. Set `isEnd = true` only after the **last** character.

---

<a id="lesson-7"></a>
## Lesson 7 — Search — walking without building

Searching for a word is the same walk as inserting, except we never create nodes. If at any point we can't find the next character, the word doesn't exist. If we reach the end of the word but `isEnd` is false, the word isn't there either (it's only a prefix of a longer word).

```js
search(word) {
  let node = this.root;
  for (const c of word) {
    if (!node.children[c]) return false;  // path ends here — word not in trie
    node = node.children[c];
  }
  return node.isEnd;   // did we land on a complete word?
}
```

Let's trace it:

**`search("car")` on `["cat", "car", "cart", "dog"]`:**

```
node = root
c = 'c' → root.children['c'] exists → node = [c]
c = 'a' → [c].children['a']  exists → node = [ca]
c = 'r' → [ca].children['r'] exists → node = [car]

End of word: node.isEnd is true → return true ✅
```

**`search("ca")` on the same trie:**

```
node = root
c = 'c' → node = [c]
c = 'a' → node = [ca]

End of word: node.isEnd is false → return false
```

`"ca"` is only a prefix, not a complete word — we never inserted it.

**`search("cab")` on the same trie:**

```
node = root
c = 'c' → node = [c]
c = 'a' → node = [ca]
c = 'b' → [ca].children['b'] does NOT exist → return false
```

> 🎯 **Key takeaway**
> Search walks the same path as insert but creates nothing. Two failure conditions: the path dies early (a child is missing), or the path exists but `isEnd` is false at the end (it's a prefix only).

---

<a id="lesson-8"></a>
## Lesson 8 — startsWith — the operation that makes tries famous

`startsWith(prefix)` asks: "does any word in the trie begin with this prefix?"

It's almost identical to `search`, with one key difference: we don't check `isEnd` at the end. We just need to confirm the path exists.

```js
startsWith(prefix) {
  let node = this.root;
  for (const c of prefix) {
    if (!node.children[c]) return false;
    node = node.children[c];
  }
  return true;   // path exists → at least one word starts with this prefix
}
```

**`startsWith("ca")` on `["cat", "car", "cart"]`:**

```
node = root
c = 'c' → node = [c]
c = 'a' → node = [ca]

End of prefix: the path exists → return true ✅
```

Even though `"ca"` is not a complete word, it IS a valid prefix of "cat", "car", and "cart".

**`startsWith("cab")`:**

```
node = root
c = 'c' → node = [c]
c = 'a' → node = [ca]
c = 'b' → [ca].children['b'] does NOT exist → return false
```

No word starts with `"cab"`.

> 🎯 **Key takeaway**
> `startsWith` is `search` minus the `isEnd` check. This is the operation that powers autocomplete — give it a prefix, walk the trie, and every word reachable from the landing node is a valid suggestion.

---

<a id="lesson-9"></a>
## Lesson 9 — Why O(L) — and why that's amazing

Every operation we've seen — `insert`, `search`, `startsWith` — does exactly **one step per character** in the word or prefix. If the word has L characters, you do L steps. Period.

It doesn't matter if you have 10 words or 10 million words in the trie. The number of steps is determined entirely by L, the length of the key.

```
insert("cat")   → 3 steps   (one per character)
search("cart")  → 4 steps   (one per character)
startsWith("c") → 1 step
```

We write this as **O(L)** — linear in the length of the key.

Compare that to other approaches:

| Approach | Exact search | Prefix search | Space |
|---|---|---|---|
| Trie | O(L) | O(L) | O(N × L) worst case |
| Hash map | O(L) average | O(N × L) — scan all | O(N × L) |
| Sorted array | O(L log N) | O(L log N + k) | O(N × L) |
| Brute force | O(N × L) | O(N × L) | O(N × L) |

For exact search, a hash map is similarly fast. But for **prefix queries**, the trie wins clearly — it just walks the prefix path, and all suggestions are at its subtree.

> 🔬 **Where does N × L come from for space?**
>
> In the worst case (all words share no prefixes, e.g. a random set of strings), you have N words, each of length L, and each character gets its own node. That's N × L nodes.
>
> In the best case (all words share a long prefix), many characters share nodes and the space is much smaller. Autocomplete dictionaries tend to be best-case-ish, because real words in a language share lots of prefixes.

> 🎯 **Key takeaway**
> Trie operations are O(L) — they depend on the **length of the key**, not the **size of the dataset**. For large datasets of strings with shared prefixes, this is a significant win.

---

<a id="lesson-10"></a>
## Lesson 10 — Trie vs. hash map — when to use which

Both structures store strings. Both support O(L) lookup for exact matches. So when should you choose one over the other?

### Choose a hash map when:

- You only need exact-match lookups (`has`, `get`, `set`).
- You need fast key deletion.
- Memory is tight (hash maps generally use less memory for sparse string sets).
- Keys aren't strings, or you don't care about prefix relationships.

### Choose a trie when:

- You need **prefix queries**: "does any stored key start with this prefix?"
- You need **autocomplete**: enumerate all words with a given prefix.
- You need **sorted order**: DFS on a trie visits words in lexicographic order.
- You want to answer "how many words share this prefix?" efficiently.
- You have strings with lots of common prefixes (better memory usage than storing each word separately).

### A real-world example

Google's suggestion box uses something trie-like. When you type `"best re"`, the system doesn't scan every URL ever searched — it navigates the prefix tree directly to the subtree for `"best re"` and pulls the top results. A hash map couldn't do that without scanning everything.

> ⚠️ **Memory warning**
>
> Tries can use more memory than hash maps when strings have few shared prefixes. Imagine storing 10,000 completely random strings — each gets its own unique path from root, so you're storing every character in every string as a node. A hash map would just store the 10,000 strings directly.
>
> For real word dictionaries (English words have lots of shared prefixes), tries tend to be memory-efficient. For arbitrary UUID-like strings, they're wasteful.

> 🎯 **Key takeaway**
> Hash map: best for exact lookup, simple, compact. Trie: best when prefix matters — autocomplete, spell-check, sorted word enumeration. Know both, pick the right one.

---

<a id="lesson-11"></a>
## Lesson 11 — Deleting a word — the tricky part

Deleting a word from a trie is more involved than inserting or searching. The danger is **accidentally breaking shared prefixes**.

Imagine we have `["car", "cart"]` in the trie:

```
root
 └─c─> [c]
         └─a─> [ca]
                 └─r─> [car] ★
                         └─t─> [cart] ★
```

If we delete `"car"`, we can't remove the `'c'`, `'a'`, or `'r'` nodes — `"cart"` still needs them. All we should do is set `[car].isEnd = false`.

If we then delete `"cart"`, now the `'t'` node has no children and is the end of no word. We **can** safely remove it. And after removing 't', the `'r'` node also has no children and is no longer a word end — so we can remove that too. And so on up the chain.

**The rule:** after clearing `isEnd`, walk back up the tree and remove any node that:
1. Has no children, AND
2. `isEnd` is false (is not itself a complete word).

The cleanest way to implement this is **recursion**: go down to the end of the word, clear `isEnd`, then return upward and prune nodes that are now unused.

```js
delete(word) {
  this._deleteHelper(this.root, word, 0);
}

_deleteHelper(node, word, depth) {
  if (!node) return false;

  if (depth === word.length) {
    if (!node.isEnd) return false;   // word not in trie
    node.isEnd = false;
    // node can be deleted if it has no children
    return Object.keys(node.children).length === 0;
  }

  const c = word[depth];
  const shouldDelete = this._deleteHelper(node.children[c], word, depth + 1);

  if (shouldDelete) {
    delete node.children[c];
    // this node can also be deleted if it now has no children and is not a word end
    return Object.keys(node.children).length === 0 && !node.isEnd;
  }
  return false;
}
```

> ✋ **Pause and think**
> What happens if you try to delete a word that was never inserted? Trace through the code above with `delete("cap")` on a trie that only contains `"cat"`. Where does it fail gracefully?
>
> <details>
> <summary>Show answer</summary>
>
> When `depth = 2` (character `'p'`), `node.children['p']` is `undefined`. The recursive call returns `false`. Nothing gets deleted. The trie is unchanged.
> </details>

> 🎯 **Key takeaway**
> Deletion is: clear `isEnd`, then prune any now-unnecessary nodes from the bottom up. Never remove a node that still has children or is still the end of another word.

---

<a id="lesson-12"></a>
## Lesson 12 — Common trie patterns in problems

Once you can build a trie and do the basic operations, you'll see a handful of patterns in interview problems.

### Pattern A: Prefix filtering

"Replace each word in a sentence with its shortest matching root."

Strategy: build a trie of the roots. For each word in the sentence, walk the trie until you hit an `isEnd` (earliest root match) or exhaust the word. This is LeetCode 648 — Replace Words.

### Pattern B: Wildcard / regex matching

"Search for a word where `.` can match any single character."

Strategy: when you encounter a `.` in the search pattern, recurse into **all** children of the current node (not just one specific child). This is a DFS with branching at wildcards. LeetCode 211 — Add and Search Word.

### Pattern C: Trie + DFS on a grid

"Find all words from a dictionary on a 2D board."

Strategy: build a trie of the dictionary. Run DFS on every cell of the board. As you extend the DFS path, walk the trie simultaneously. If the current path goes off the trie, prune early. LeetCode 212 — Word Search II.

This is the signature hard trie problem and comes up often.

### Pattern D: Trie + backtracking on word construction

"Are there ways to split this string into words from the dictionary?"

Strategy: build a trie, then walk the string, using the trie to efficiently check whether each prefix is a valid word boundary. Often combined with dynamic programming.

### Pattern E: Autocomplete with ranking

"For each character typed, return the top 3 suggestions."

Strategy: build a trie. At each node, store or lazily compute the top-3 words in its subtree (often by DFS + sort or DFS + min-heap). LeetCode 1268 — Search Suggestions System.

> 💡 **Tip — the "simultaneous walk" trick**
>
> One of the most powerful trie techniques is **walking the trie in lockstep with something else**: the characters you're building in a DFS, the characters you're reading from input, the bits of a number. When the lockstep walk terminates, you've found your answer. This shows up in Q12, Q15, and all the bit-trie problems.

---

<a id="lesson-13"></a>
## Lesson 13 — Compressed tries — radix trees (preview)

Standard tries can be memory-inefficient when long chains of nodes each have exactly one child. For example, if the only word starting with `"z"` is `"zebra"`, you'd have five nodes (z → e → b → r → a) just for one word.

A **compressed trie** (also called a **radix tree** or **Patricia trie**) collapses these single-child chains into a single edge labeled with the entire substring:

```
Standard trie — one node per character:

root
 └─z─> [z]
         └─e─> [ze]
                 └─b─> [zeb]
                         └─r─> [zebr]
                                 └─a─> [zebra] ★

Compressed trie — chain collapsed into one edge:

root
 └─"zebra"─> [zebra] ★
```

This reduces the number of nodes from 5 to 1, making compressed tries much more memory-efficient for sparse or long-word datasets.

**Where you'll see this:**
- DNS routing tables
- IP routing (longest-prefix matching)
- Git's pack-file index
- Linux kernel's VFS path lookup

In coding interviews, the term "radix tree" occasionally comes up in system design rounds. You don't usually need to implement one from scratch — but knowing it exists and why (memory efficiency for sparse strings) is enough.

> 🎯 **Key takeaway**
> A compressed trie collapses single-child chains into single multi-character edges. Same O(L) behavior, less memory. Commonly used in production systems where memory matters.

---

<a id="lesson-14"></a>
## Lesson 14 — Bit tries — maximum XOR (preview)

Here's a surprising application: using a trie to find the **maximum XOR** of two numbers in an array.

The key insight: represent each number as its 32 binary digits (bits). Insert each number into a trie bit-by-bit, most significant bit first. Each edge is `'0'` or `'1'`.

```
25 in binary:  0 0 0 ... 0 1 1 0 0 1
                              ↑ bit 4  (MSB on the left)
```

To maximize XOR of `x` with any number in the trie, walk from the root:
- At each bit of `x`, try to go down the **opposite** branch (because `1 XOR 0 = 1`, `0 XOR 1 = 1`).
- If the opposite branch doesn't exist, take the same branch (contributes 0 to XOR at this bit position).
- Keep going for all 32 bits.

The result is the maximum XOR achievable with any number in the trie.

```
Time: O(n × 32) = O(n) since 32 is a constant
Space: O(n × 32)
```

This is a beautiful example of a trie specialized for a domain that has nothing to do with words. You'll build this in Q18 and the Bit Trie Drill (Q21–Q23).

> 💡 **Why is XOR-maximization naturally a bit-trie problem?**
>
> Because XOR is a **bitwise** operation, and a bit-trie lets you make greedy bit-level decisions from the most significant bit down. At each bit, you know which choice maximizes the contribution to the total XOR. It's greedy, it's local, and it's O(1) per bit — a perfect match.

---

<a id="lesson-15"></a>
## Lesson 15 — Suffix structures (advanced preview)

A **trie** stores a set of strings starting from their beginnings. A **suffix trie / suffix tree** takes a single long string and stores all its suffixes, enabling powerful substring queries.

For example, for the string `"banana"`, the suffixes are:

```
"banana"
"anana"
"nana"
"ana"
"na"
"a"
""
```

Insert all of them into a trie and you get a structure that can answer questions like:

- "Does `"ana"` appear as a substring of `"banana"`?" → search for `"ana"` — O(L)
- "How many times does `"na"` appear?" → count nodes in the subtree for `"na"` — O(L)
- "What is the longest repeated substring?" → find the deepest internal node with more than one child

The naive suffix trie has O(n²) nodes (for an n-character string), which is too big for production. The **suffix array** and **suffix automaton** are compressed equivalents:

- **Suffix array**: a sorted array of all suffixes (represented by start indexes). O(n log n) to build, supports powerful queries with the LCP (longest common prefix) array.
- **Suffix automaton**: the minimal DFA that accepts all substrings of a string. O(n) to build, O(1) amortized per state. Counts distinct substrings, longest repeated substrings, and more.

These appear in the last three questions of this chapter (Q24–Q26). They're genuinely advanced — most interview candidates have never seen them. Don't worry about them until you've built a solid foundation with the basic trie operations.

> 🎯 **Key takeaway**
> Suffix structures extend the trie idea to substrings instead of words. They're powerful for text-processing algorithms. The suffix array is the most interview-relevant; the suffix automaton is the most theoretically elegant.

---

<a id="lesson-16"></a>
## Lesson 16 — Quick reference

Here's everything you need to remember at a glance.

### Core TrieNode structure

```js
class TrieNode {
  constructor() {
    this.children = {};   // char → TrieNode
    this.isEnd = false;
  }
}
```

### Trie class skeleton

```js
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children[c]) node.children[c] = new TrieNode();
      node = node.children[c];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children[c]) return false;
      node = node.children[c];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const c of prefix) {
      if (!node.children[c]) return false;
      node = node.children[c];
    }
    return true;
  }
}
```

### Complexity table

| Operation | Time | Space (additional) |
|---|---|---|
| `insert(word)` | O(L) | O(L) worst case |
| `search(word)` | O(L) | O(1) |
| `startsWith(prefix)` | O(L) | O(1) |
| `delete(word)` | O(L) | O(L) call stack |
| DFS to collect all words | O(N × L) | O(N × L) |

L = length of the word/prefix. N = number of words stored.

### When to reach for a trie

```
Ask yourself: "Do I need prefix queries or prefix grouping?"
  YES → trie is probably the right tool
  NO  → hash map / set is probably simpler
```

### Common mistakes

| Mistake | What happens | Fix |
|---|---|---|
| Forgetting `node.isEnd = true` in `insert` | Words inserted but `search` always returns false | Set `isEnd = true` after the loop, not inside it |
| Checking `node.isEnd` in `startsWith` | Returns false for valid prefixes that aren't complete words | Remove the `isEnd` check from `startsWith` |
| Removing a node shared by other words in `delete` | Corrupts other words silently | Only remove a node if it has 0 children AND `isEnd` is false |
| Using `==` instead of `===` when comparing characters | Subtle bugs with `0` vs `'0'` | Always use strict equality or a proper Map |

---

<a id="lesson-17"></a>
## Lesson 17 — You did it. Now what?

You've covered:

1. **Why tries exist** — efficient prefix queries over large string sets.
2. **The core structure** — tree where edges are characters, `isEnd` flags complete words.
3. **The three main operations** — insert, search, startsWith, all O(L).
4. **Deletion** — the careful bottom-up pruning approach.
5. **Trie vs. hash map** — know when to pick each.
6. **Advanced variants** — compressed tries, bit tries, suffix structures.

### What to do next

1. Open [`questions/01-implement-trie.md`](./questions/01-implement-trie.md).
2. Try to implement the full Trie class from scratch **without looking at the skeleton above**.
3. Once you have it working, read the solution stub in [`solutions/01-implement-trie.js`](./solutions/01-implement-trie.js) and compare.
4. Work through the easy questions first (Q01–Q06). They're all variations on the same basic structure.
5. Only then move to medium. Medium problems introduce wildcards, external data (values, frequencies), and integration with other patterns.
6. Hard problems combine tries with DFS, backtracking, and heaps. Don't rush there.

### Pacing

- 2–3 problems a day for a week will take you through the whole chapter.
- The easy problems are not trivial — Q04 (deletion) is subtle, Q06 (longest word) requires careful `isEnd` tracking.
- If you struggle on the medium problems, come back and re-read Lesson 12 (patterns).

You're building one of the cleanest data structures in all of computer science. Stick with it.

See you in [Q01](./questions/01-implement-trie.md). 💪
