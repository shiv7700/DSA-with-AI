# 14 — Tries (Prefix Trees)

> A trie is a tree where each **edge** is a character and each **path** from root to a marked node spells a word. If you've ever used Google's autocomplete, a T9 phone keyboard, or a spell-checker, you've used a trie. Master inserts, lookups, deletions, and the advanced patterns: wildcard search, bit-tries, and suffix structures.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — concepts, diagrams, TrieNode structure, insert/search/startsWith, complexity analysis, vs. hash map, compressed tries, bit tries, suffix previews.
2. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
3. Write your solution in the matching `solutions/<NN>-<slug>.js`.
4. Tick off the checklist below as you finish.

## Progress

### Easy (warm-up — build the core structure)
- [ ] [01 — Implement a Trie (insert / search / startsWith)](./questions/01-implement-trie.md)
- [ ] [02 — Count Total Words in a Trie](./questions/02-count-words.md)
- [ ] [03 — Count Words With a Given Prefix](./questions/03-count-prefix-words.md)
- [ ] [04 — Delete a Word From a Trie](./questions/04-delete-word.md)
- [ ] [05 — Print All Words Stored in a Trie](./questions/05-print-all-words.md)
- [ ] [06 — Longest Word Built One Character at a Time](./questions/06-longest-word.md)

### Medium
- [ ] [07 — Replace Words](./questions/07-replace-words.md)
- [ ] [08 — Add and Search Word (Wildcard `.`)](./questions/08-add-search-word.md)
- [ ] [09 — Map Sum Pairs](./questions/09-map-sum-pairs.md)
- [ ] [10 — Autocomplete System](./questions/10-autocomplete-system.md)
- [ ] [11 — Implement Magic Dictionary](./questions/11-magic-dictionary.md)
- [ ] [12 — Search Suggestions System](./questions/12-search-suggestions.md)
- [ ] [13 — Longest Common Prefix (Trie)](./questions/13-longest-common-prefix.md)
- [ ] [14 — Stream of Characters](./questions/14-stream-of-characters.md)

### Hard
- [ ] [15 — Word Search II](./questions/15-word-search-ii.md)
- [ ] [16 — Concatenated Words](./questions/16-concatenated-words.md)
- [ ] [17 — Palindrome Pairs](./questions/17-palindrome-pairs.md)
- [ ] [18 — Maximum XOR of Two Numbers (Bit Trie)](./questions/18-maximum-xor.md)
- [ ] [19 — Word Squares](./questions/19-word-squares.md)
- [ ] [20 — Short Encoding of Words](./questions/20-short-encoding.md)

### Bit Trie Drill
- [ ] [21 — Build a Bit Trie for 32-bit Integers](./questions/21-bit-trie-build.md)
- [ ] [22 — Maximum XOR Pair in an Array — O(n·32)](./questions/22-max-xor-pair.md)
- [ ] [23 — Count Pairs With XOR Less Than K](./questions/23-xor-pairs-less-than-k.md)

### Suffix Structures (advanced)
- [ ] [24 — Build a Suffix Array — Longest Repeated Substring](./questions/24-suffix-array.md)
- [ ] [25 — Build a Suffix Automaton — Count Distinct Substrings](./questions/25-suffix-automaton.md)
- [ ] [26 — LCP Array — Build in O(n)](./questions/26-lcp-array.md)

## Related Topics

- [03 — Strings](../03-Strings/) — tries operate on characters, so string fundamentals matter.
- [10 — Hash Tables](../10-Hash-Tables/) — the main alternative to tries for exact-match lookups.
- [13 — Trees](../13-Trees/) — tries are trees; DFS/BFS traversal applies directly.
- [15 — Heaps](../15-Heaps/) — used in combination with tries for top-K and autocomplete problems.
- [21 — Bit Manipulation](../21-Bit-Manipulation/) — prerequisite for understanding bit tries.
