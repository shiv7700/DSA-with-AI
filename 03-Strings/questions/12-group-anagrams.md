# Q12 — Group Anagrams

**Difficulty:** Medium
**Pattern:** Hash map with sorted-string key
**Expected:** O(n · k log k) time · O(n · k) space  (n = number of words, k = average word length)

## Problem

Given an array of strings `words`, group the strings that are **anagrams of each other**. Return an array of groups — the order of groups and the order of strings within each group does not matter.

> **Reminder:** two strings are anagrams if they contain the exact same characters with the same frequencies, just in a different order.

## Examples

### Example 1
```
Input:  ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
Output: [['eat','tea','ate'], ['tan','nat'], ['bat']]
```

### Example 2
```
Input:  ['']
Output: [['']]
```

### Example 3
```
Input:  ['a']
Output: [['a']]
```

### Example 4
```
Input:  ['abc', 'bca', 'cab', 'xyz', 'zyx']
Output: [['abc','bca','cab'], ['xyz','zyx']]
```

## Constraints
- `1 <= words.length <= 10^4`
- `0 <= words[i].length <= 100`
- `words[i]` consists of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — the key insight</summary>

All anagrams of a word produce **the same string when sorted**. For example: `'eat'`, `'tea'`, `'ate'` all sort to `'aet'`.

Use the sorted version as a hash-map key. Group all original words that have the same sorted form.
</details>

<details>
<summary>Hint 2 — using a Map</summary>

```js
const map = new Map();   // sorted_word → [original words]

for (const word of words) {
  const key = word.split('').sort().join('');
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(word);
}

return Array.from(map.values());
```

`map.values()` returns all the arrays (one per group). Wrap in `Array.from` to get a plain array.
</details>

<details>
<summary>Hint 3 — alternative key: frequency signature</summary>

Instead of sorting (O(k log k) per word), you could use a character count array as the key:

For `'eat'`, count array for 26 letters is `[1,0,0,0,1,0,...,1,0,0,0]` (one `a`, one `e`, one `t`).

Convert the count array to a string: `'1,0,0,0,1,0,...,1,0,0,0'` and use that as the key.

This reduces the per-word hashing to O(k) instead of O(k log k). For this problem the difference is small, but it's a good technique to know.
</details>

## Write your solution
→ [`../solutions/12-group-anagrams.js`](../solutions/12-group-anagrams.js)

## Follow-ups
- Return the groups **sorted** by their size (largest group first).
- Given a long string, find all **substrings** that are anagrams of a given pattern. (Hint: sliding window + frequency map.)
- What is the time and space complexity of each approach (sorted key vs frequency-count key)?
- What if words can contain uppercase letters, digits, and spaces — not just lowercase?
