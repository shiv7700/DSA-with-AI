# Q14 — Smallest String With Swaps

**Difficulty:** Medium
**Pattern:** DSU — union swappable indices, sort each component's characters
**Expected:** O(n log n · α(n)) time · O(n) space

## Problem

You are given a string `s` and a list of index pairs `pairs` where `pairs[i] = [a, b]` means you can swap characters at positions `a` and `b` any number of times.

Return the **lexicographically smallest** string you can produce by performing zero or more swaps.

> **Key insight:** if you can swap positions (0,1) and (1,2), then by combining those swaps you can also put position 0's character at position 2. All positions in a connected group can be freely rearranged.

## Examples

### Example 1

```
Input:  s = "dcab",  pairs = [[0,3],[1,2]]
Output: "bacd"
```

Pair (0,3): can swap positions 0 and 3.
Pair (1,2): can swap positions 1 and 2.

Components: {0,3} and {1,2}.
- Characters at {0,3}: 'd' and 'b' → sorted: 'b','d'. Assign smallest first: s[0]='b', s[3]='d'.
- Characters at {1,2}: 'c' and 'a' → sorted: 'a','c'. Assign: s[1]='a', s[2]='c'.

Result: "bacd".

### Example 2

```
Input:  s = "dcab",  pairs = [[0,3],[1,2],[0,2]]
Output: "abcd"
```

Now all 4 positions are in one component (0↔3, 1↔2, 0↔2 connects them all). Sort all characters: "abcd".

### Example 3

```
Input:  s = "cba",  pairs = [[0,1],[1,2]]
Output: "abc"
```

One component → sort everything.

## Constraints

- `1 <= s.length <= 10^5`
- `0 <= pairs.length <= 10^5`
- `0 <= pairs[i][0], pairs[i][1] < s.length`
- `s` contains only lowercase English letters.

## Hints

<details>
<summary>Hint 1 — which positions can be freely rearranged?</summary>

All positions that are in the same DSU component can be freely permuted among themselves. Within a component, you can achieve any ordering — so pick the lexicographically smallest (sort the characters in the component and assign them in order back to the sorted positions).
</details>

<details>
<summary>Hint 2 — algorithm outline</summary>

```
1. Initialize DSU(s.length).
2. For each [a, b] in pairs: union(a, b).
3. Group indices by their root:
     Map<root, indices[]>
4. For each group of indices:
     a. Collect characters at those indices.
     b. Sort the characters.
     c. Sort the indices.
     d. Assign sorted characters to sorted indices in order.
5. Return the modified string.
```
</details>

<details>
<summary>Hint 3 — why sort indices AND characters?</summary>

Sorting both ensures that the smallest character goes to the smallest index within the group — which produces the lexicographically smallest result. If you only sorted the characters but assigned them to unsorted indices, you might put 'a' at index 5 instead of index 2 (which would produce a larger string).
</details>

## Write your solution

→ [`../solutions/14-smallest-string-swaps.js`](../solutions/14-smallest-string-swaps.js)

## Follow-ups

- **Q09 — Accounts Merge**: the same "group indices, reconstruct groups" pattern.
- **Q15 — Lexicographically Smallest Equivalent String**: a related problem using equivalence classes.
