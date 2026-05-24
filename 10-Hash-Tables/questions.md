# Hash Tables (Map, Set, Object)

> The single most-used data structure in interviews. If you can convert O(n²) → O(n), it's probably with a hash.

## Concept Check

1. What is a hash function? What makes a "good" one?
2. What is a collision? Two strategies to handle it:
   - Separate chaining
   - Open addressing (linear probing, quadratic probing, double hashing)
3. Average vs worst case complexity of hash ops — when does worst case happen?
4. Difference between `Object`, `Map`, and `Set` in JS:
   - Key types allowed?
   - Iteration order?
   - Size lookup?
   - Performance?
5. When is `WeakMap` / `WeakSet` useful? What problem do they solve?
6. Why do `Map` and `Set` use `SameValueZero` equality? What's the gotcha with `NaN`?
7. Load factor — what is it and why do hash tables resize?

## Implement First

Build your own hash map from scratch:
```js
class HashMap {
  constructor(size = 53) { this.keyMap = new Array(size); }
  _hash(key) { /* polynomial rolling hash */ }
  set(key, value)    { /* separate chaining */ }
  get(key)           { /* ... */ }
  delete(key)        { /* ... */ }
  has(key)           { /* ... */ }
  keys()             { /* ... */ }
  values()           { /* ... */ }
}
```
Then add automatic resizing when load factor > 0.75.

## Easy

1. Count the frequency of each character in a string.
2. Find the first non-repeating character.
3. Check if two strings are anagrams (using a frequency map).
4. Find duplicates in an array.
5. Find the intersection of two arrays.
6. Find the union of two arrays.
7. Check if an array contains any duplicates.
8. Two Sum — O(n) with a hash map.
9. Find missing number in `[0..n]`.
10. Find the difference between two strings — extra char in one of them.

## Medium

11. **Group Anagrams** — group strings whose chars are permutations.
12. **Longest Substring Without Repeating Characters** — sliding window + set.
13. **Subarray Sum Equals K** — prefix sum + hash map.
14. **Continuous Subarray Sum** — multiple of K.
15. **Longest Consecutive Sequence** — O(n).
16. **Top K Frequent Elements**.
17. **Sort Characters by Frequency**.
18. **4Sum II** — count tuples (a, b, c, d) summing to 0 across 4 arrays.
19. **Isomorphic Strings**.
20. **Word Pattern** — does pattern match string?
21. **Happy Number** — using a set to detect cycle.
22. **Bulls and Cows**.
23. **Find All Anagrams in a String** — sliding window.
24. **Permutation in String** — does s2 contain a permutation of s1?
25. **Ransom Note** — can ransom note be built from magazine letters?
26. **Roman to Integer** — lookup table.
27. **Longest Palindrome** — using char frequency.
28. **Encode and Decode TinyURL** — using a hash map.
29. **Insert Delete GetRandom O(1)** — hash map + array.
30. **LRU Cache** — hash map + doubly linked list.

## Hard

31. **First Missing Positive** — without hash map, O(1) space (compare approaches).
32. **Substring with Concatenation of All Words**.
33. **Minimum Window Substring** — sliding window + frequency map.
34. **Longest Substring with At Most K Distinct Characters**.
35. **Palindrome Pairs** — find all pairs (i, j) where `words[i] + words[j]` is palindrome.
36. **LFU Cache** — least frequently used cache, O(1).
37. **Design In-Memory File System**.
38. **Maximum Frequency Stack** — pop the most frequent element.

## Map vs Set Drill

39. When do you use a `Map` vs a `Set`?
40. Convert array → Set → array — what does this accomplish?
41. Why might a `Map` outperform a plain `Object` in a hot loop?

## Hash Function Drill

42. Write a polynomial rolling hash for strings (use a prime base and mod).
43. What does a bad hash function look like? Show a collision-heavy example.
44. When is a cryptographic hash (SHA-256) overkill for a hash table?
