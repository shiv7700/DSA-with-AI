# Q12 — Search Suggestions System

**Difficulty:** Medium
**Pattern:** Trie — prefix navigation + lexicographic top-3
**Expected:** O(N × L) build · O(L²) query (L = length of searchWord) · O(N × L) space

## Problem

You are given a list of `products` and a `searchWord`. Design a system that, after each character is typed, returns the **3 lexicographically smallest** products that have a prefix matching the characters typed so far.

Return a list of lists: the outer list has one entry per character typed (so `searchWord.length` entries). Each inner list has at most 3 product names.

## Examples

### Example 1
```
Input:  products = ["mobile","mouse","moneypot","monitor","mousepad"],
        searchWord = "mouse"
Output:
[
  ["mobile","moneypot","monitor"],      // after typing "m"
  ["mobile","moneypot","monitor"],      // after typing "mo"
  ["mouse","mousepad"],                 // after typing "mou"
  ["mouse","mousepad"],                 // after typing "mous"
  ["mouse","mousepad"]                  // after typing "mouse"
]
```

### Example 2
```
Input:  products = ["havana"],
        searchWord = "havana"
Output:
[
  ["havana"],   // "h"
  ["havana"],   // "ha"
  ["havana"],   // "hav"
  ["havana"],   // "hava"
  ["havana"],   // "havan"
  ["havana"]    // "havana"
]
```

### Example 3 (no match partway through)
```
Input:  products = ["bags","baggage","banner","box","cloths"],
        searchWord = "bags"
Output:
[
  ["baggage","bags","banner"],   // "b"
  ["baggage","bags","banner"],   // "ba"
  ["baggage","bags"],            // "bag"
  ["bags"]                       // "bags"
]
```

## Constraints
- `1 <= products.length <= 1000`
- `1 <= products[i].length <= 3000`
- Sum of all `products[i].length` <= `2 × 10^4`
- All products are **unique**.
- `products[i]` and `searchWord` consist only of lowercase English letters.
- `1 <= searchWord.length <= 1000`

## Hints

<details>
<summary>Hint 1 — two approaches: sort + binary search, or trie</summary>

**Approach A (simpler):** Sort `products` lexicographically once. For each prefix of `searchWord`, use binary search to find the insertion point, then collect at most 3 consecutive matching products starting there.

**Approach B (trie):** Insert all products into a trie. For each prefix, navigate to the trie node, then DFS to collect the 3 lexicographically smallest words in that subtree (stop DFS after finding 3).

Both are valid. The trie approach is better practice for this chapter.
</details>

<details>
<summary>Hint 2 — the trie approach in detail</summary>

Insert all products into the trie. Then for each prefix (after typing characters 1, 2, 3, … of `searchWord`):

1. Navigate to the node representing that prefix. If the path dies, all subsequent results are empty lists.
2. From that node, do a DFS (visiting children in alphabetical order) and collect words until you have 3 or have exhausted the subtree.

Because children are visited in sorted order, the first 3 words found are the 3 lexicographically smallest.
</details>

<details>
<summary>Hint 3 — early termination in DFS</summary>

You only need 3 results. Once you've found 3, stop the DFS immediately. This avoids scanning the entire subtree.

Tip: use a result array and check `results.length < 3` before each recursive call.
</details>

## Write your solution
→ [`../solutions/12-search-suggestions.js`](../solutions/12-search-suggestions.js)

## Follow-ups
- LeetCode 1268 — this exact problem.
- What if you wanted the top 3 by frequency (most searched), not lexicographic order?
- How would you handle real-time character-by-character input efficiently when `searchWord` can be very long?
