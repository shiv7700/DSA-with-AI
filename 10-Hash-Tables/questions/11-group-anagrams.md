# Q11 — Group Anagrams

**Difficulty:** Medium
**Pattern:** Map with sorted-string key
**Expected:** O(n · k log k) time · O(n · k) space (k = average string length)

## Problem

Given an array of strings `strs`, group the strings that are anagrams of each other. Return a list of groups in any order. Within each group, strings can be in any order.

Two strings are anagrams if they contain the same characters with the same frequencies (regardless of order).

## Examples

### Example 1
```
Input:  ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
```
(Any order of groups, and any order within groups, is acceptable.)

### Example 2
```
Input:  [""]
Output: [[""]]
```

### Example 3
```
Input:  ["a"]
Output: [["a"]]
```

### Example 4
```
Input:  ["abc", "bca", "cab", "xyz", "zyx"]
Output: [["abc", "bca", "cab"], ["xyz", "zyx"]]
```

## Constraints
- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — what do anagrams have in common?</summary>

If you sort the letters in any anagram, you always get the same string. `'eat'` → `'aet'`, `'tea'` → `'aet'`, `'ate'` → `'aet'`. That sorted string is a perfect **key** for grouping.

Use a `Map` where the key is the sorted string, and the value is an array of original strings that sort to that key.
</details>

<details>
<summary>Hint 2 — algorithm outline</summary>

```
For each string in strs:
  key = [...s].sort().join('')
  If map doesn't have key, create an empty array there
  Push s onto map.get(key)

Return [...map.values()]
```
</details>

<details>
<summary>Hint 3 — a faster key (optional)</summary>

Sorting each string is O(k log k). You can use a **frequency count key** in O(k) instead:

Build a 26-element frequency array for the string, then stringify it (e.g., `'2,0,0,...,1,...'`). This is O(k) per string — a win for very long strings.
</details>

## Write your solution
→ [`../solutions/11-group-anagrams.js`](../solutions/11-group-anagrams.js)

## Follow-ups
- Can you group without sorting, in O(n · k) total? (Use the frequency key approach.)
- What if strings can contain uppercase letters and spaces?
