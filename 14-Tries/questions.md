# Tries (Prefix Trees)

> A tree where each edge is a character. Great for autocomplete, spell-check, IP routing, and any prefix-heavy problem.

## Concept Check

1. What is the structure of a Trie node? (children map + `isEnd` flag)
2. Why is Trie `insert` and `search` O(L) where L = key length, regardless of dataset size?
3. Compare Trie vs Hash Map for storing strings — memory and prefix-query trade-offs.
4. What is a compressed trie (radix tree / Patricia trie)?
5. What is a suffix trie / suffix tree? When is it used?

## Implement First

```js
class TrieNode {
  constructor() {
    this.children = {};        // or new Map()
    this.isEnd = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word)             { /* O(L) */ }
  search(word)             { /* exact match */ }
  startsWith(prefix)       { /* prefix exists? */ }
  delete(word)             { /* careful: don't break shared prefixes */ }
}
```

## Easy

1. Implement Trie — insert / search / startsWith.
2. Insert and search words in a Trie.
3. Count total words in the Trie.
4. Count words with a given prefix.
5. Delete a word from the Trie.
6. Print all words stored in the Trie (DFS).
7. Longest word in the dictionary that can be built one character at a time.

## Medium

8. **Replace Words** — given a dictionary of roots, replace each word in a sentence with its shortest root.
9. **Add and Search Word** — supports `.` wildcard.
10. **Map Sum Pairs** — sum of values with a given prefix.
11. **Autocomplete System** — return top 3 suggestions for each typed char.
12. **Implement Magic Dictionary** — search where exactly one char differs.
13. **Top K Frequent Words** — Trie + heap.
14. **Search Suggestions System** — at most 3 lexicographically smallest products per prefix.
15. **Longest Common Prefix** of an array of strings — using a Trie.
16. **Stream of Characters** — query if any dict word is suffix of stream so far.

## Hard

17. **Word Search II** — find all words on a 2D board (Trie + DFS).
18. **Concatenated Words** — words made entirely of other words.
19. **Palindrome Pairs** — find all `(i, j)` where `words[i] + words[j]` is a palindrome.
20. **Maximum XOR of Two Numbers in an Array** — bit-trie.
21. **Word Squares** — fill an N×N grid where every row and column is a word.
22. **Short Encoding of Words**.
23. **Index Pairs of a String** — find all `[i, j]` such that `text[i..j]` is in the word list.

## Bit Trie Drill

24. Build a bit-trie storing 32-bit integers.
25. Find the maximum XOR pair in an array — O(n · 32).
26. Find the number of pairs with XOR less than `k`.

## Suffix Structures (advanced)

27. Build a suffix array. Use it to find the longest repeated substring.
28. Build a suffix automaton — count distinct substrings.
29. What is the LCP (Longest Common Prefix) array? How to build it in O(n)?
