# 10 — Hash Tables

> Hash tables are the single most-used data structure in coding interviews. Anytime you see "find a pair", "group these", "count occurrences", or "O(1) lookup", a hash table is almost certainly the answer. Master this chapter and you'll have a superpower: **trading memory for speed**.

## Learn Path

1. **Read [`notes.md`](./notes.md) first** — hash functions, collisions, chaining, open addressing, JS `Map`/`Set`/`Object` differences, load factor, WeakMap, the O(n²) → O(n) trade-off.
2. Solve questions in order. Each lives in `questions/<NN>-<slug>.md`.
3. Write your solution in the matching `solutions/<NN>-<slug>.js`.
4. Tick off the checklist below as you finish.

## Progress

### Implement First
- [ ] [00 — Build Your Own HashMap (from scratch)](./questions/00-implement-hashmap.md)

### Easy (warm-up)
- [ ] [01 — Character Frequency Count](./questions/01-char-frequency.md)
- [ ] [02 — First Non-Repeating Character](./questions/02-first-non-repeating.md)
- [ ] [03 — Are Two Strings Anagrams?](./questions/03-are-anagrams.md)
- [ ] [04 — Find Duplicates in an Array](./questions/04-find-duplicates.md)
- [ ] [05 — Intersection of Two Arrays](./questions/05-array-intersection.md)
- [ ] [06 — Union of Two Arrays](./questions/06-array-union.md)
- [ ] [07 — Contains Duplicate](./questions/07-contains-duplicate.md)
- [ ] [08 — Two Sum (hash-map edition)](./questions/08-two-sum.md)
- [ ] [09 — Find the Missing Number](./questions/09-missing-number.md)
- [ ] [10 — Extra Character Between Two Strings](./questions/10-extra-char.md)

### Medium
- [ ] [11 — Group Anagrams](./questions/11-group-anagrams.md)
- [ ] [12 — Longest Substring Without Repeating Characters](./questions/12-longest-substring-no-repeat.md)
- [ ] [13 — Subarray Sum Equals K](./questions/13-subarray-sum-k.md)
- [ ] [14 — Continuous Subarray Sum (Multiple of K)](./questions/14-continuous-subarray-sum.md)
- [ ] [15 — Longest Consecutive Sequence](./questions/15-longest-consecutive.md)
- [ ] [16 — Top K Frequent Elements](./questions/16-top-k-frequent.md)
- [ ] [17 — Sort Characters by Frequency](./questions/17-sort-chars-by-frequency.md)
- [ ] [18 — 4Sum II](./questions/18-four-sum-ii.md)
- [ ] [19 — Isomorphic Strings](./questions/19-isomorphic-strings.md)
- [ ] [20 — Word Pattern](./questions/20-word-pattern.md)
- [ ] [21 — Happy Number](./questions/21-happy-number.md)
- [ ] [22 — Bulls and Cows](./questions/22-bulls-and-cows.md)
- [ ] [23 — Find All Anagrams in a String](./questions/23-find-all-anagrams.md)
- [ ] [24 — Permutation in String](./questions/24-permutation-in-string.md)
- [ ] [25 — Ransom Note](./questions/25-ransom-note.md)
- [ ] [26 — Roman to Integer](./questions/26-roman-to-integer.md)
- [ ] [27 — Longest Palindrome](./questions/27-longest-palindrome.md)
- [ ] [28 — Encode and Decode TinyURL](./questions/28-encode-decode-tinyurl.md)
- [ ] [29 — Insert Delete GetRandom O(1)](./questions/29-insert-delete-getrandom.md)
- [ ] [30 — LRU Cache](./questions/30-lru-cache.md)

### Hard
- [ ] [31 — First Missing Positive](./questions/31-first-missing-positive.md)
- [ ] [32 — Substring with Concatenation of All Words](./questions/32-substring-concatenation.md)
- [ ] [33 — Minimum Window Substring](./questions/33-minimum-window-substring.md)
- [ ] [34 — Longest Substring with At Most K Distinct Characters](./questions/34-longest-substr-k-distinct.md)
- [ ] [35 — Palindrome Pairs](./questions/35-palindrome-pairs.md)
- [ ] [36 — LFU Cache](./questions/36-lfu-cache.md)
- [ ] [37 — Design In-Memory File System](./questions/37-in-memory-file-system.md)
- [ ] [38 — Maximum Frequency Stack](./questions/38-max-frequency-stack.md)

### Drill Questions
- [ ] [39 — Map vs Set — When to Use Each](./questions/39-map-vs-set.md)
- [ ] [40 — Array Deduplication via Set](./questions/40-array-dedup-set.md)
- [ ] [41 — Map vs Object in a Hot Loop](./questions/41-map-vs-object.md)
- [ ] [42 — Write a Polynomial Rolling Hash](./questions/42-rolling-hash.md)
- [ ] [43 — Collision-Heavy Hash Function](./questions/43-collision-heavy-hash.md)
- [ ] [44 — When Is SHA-256 Overkill?](./questions/44-crypto-hash-overkill.md)

## Related Topics

- [02 — Arrays](../02-Arrays/) — most hash table problems start with an array input.
- [03 — Strings](../03-Strings/) — anagram and substring problems live here too.
- [11 — Sets](../11-Sets/) — `Set`-only problems.
- [19 — Two Pointers](../19-Two-Pointers/) — sometimes the alternative to a hash map.
- [20 — Sliding Window](../20-Sliding-Window/) — pairs naturally with hash maps.
