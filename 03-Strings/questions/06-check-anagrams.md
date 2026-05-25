# Q6 — Check if Two Strings are Anagrams

**Difficulty:** Easy
**Pattern:** Frequency map · Sort and compare
**Expected:** O(n) time · O(k) space  (or O(n log n) with the sort approach)

## Problem

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

Two strings are **anagrams** if they contain exactly the same characters with exactly the same frequencies, just possibly in a different order.

## Examples

### Example 1
```
Input:  s = 'anagram',  t = 'nagaram'
Output: true
```

### Example 2
```
Input:  s = 'rat',  t = 'car'
Output: false
```
`'r'` appears once in both. `'a'` appears once in `'rat'` but once in `'car'` too. But `'t'` appears in `'rat'` and `'c'` appears in `'car'` — they don't match.

### Example 3
```
Input:  s = 'listen',  t = 'silent'
Output: true
```

### Example 4 (edge cases)
```
Input:  s = 'a',  t = 'a'   →  true
Input:  s = 'a',  t = 'b'   →  false
Input:  s = '',   t = ''    →  true
Input:  s = 'ab', t = 'a'   →  false  (different lengths)
```

## Constraints
- `1 <= s.length, t.length <= 5 * 10^4`
- `s` and `t` consist of lowercase English letters only.

## Hints

<details>
<summary>Hint 1 — length check first</summary>

If `s` and `t` have different lengths, they **cannot** be anagrams. Returning `false` early saves unnecessary work.
</details>

<details>
<summary>Hint 2 — sort-and-compare approach (O(n log n))</summary>

Anagrams have the same characters, just rearranged. If you sort both strings, they must be identical:

```js
const sortStr = str => str.split('').sort().join('');
return sortStr(s) === sortStr(t);
```

Simple and readable. Time: O(n log n). Space: O(n).
</details>

<details>
<summary>Hint 3 — frequency map approach (O(n))</summary>

Build a frequency map from `s`. Then, for each character in `t`:
- If the character isn't in the map (or its count is already 0), return `false`.
- Otherwise, decrement its count.

If you finish `t` without returning `false`, the strings are anagrams.

```js
const freq = {};
for (const c of s) freq[c] = (freq[c] ?? 0) + 1;
for (const c of t) {
  if (!freq[c]) return false;
  freq[c]--;
}
return true;
```

This is O(n) time and O(26) = O(1) space for lowercase English letters.
</details>

## Write your solution
→ [`../solutions/06-check-anagrams.js`](../solutions/06-check-anagrams.js)

## Follow-ups
- **Valid Anagram with Unicode** — what if the strings can contain arbitrary Unicode characters (not just lowercase ASCII)? Does your solution still work?
- **Group Anagrams** (Q12) — given an array of strings, group anagrams together.
- Find all indices in a long string `s` where any permutation of a shorter string `p` starts. (Hint: sliding window + frequency maps.)
- What is the minimum number of character swaps needed to turn `s` into an anagram of `t`?
