# Q16 — Implement strStr()

**Difficulty:** Medium
**Pattern:** Substring search · naive or KMP
**Expected:** O(n · m) naive · O(n + m) with KMP

## Problem

Given two strings `haystack` and `needle`, return the **index of the first occurrence** of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

**Constraint:** do not use JavaScript's built-in `indexOf`, `includes`, or `search` methods.

> This is the classic `strStr` function from C — the foundation of all substring search. It looks simple, but implementing it correctly and efficiently is a rite of passage.

## Examples

### Example 1
```
Input:  haystack = 'sadbutsad',  needle = 'sad'
Output: 0
```
First occurrence is at index 0.

### Example 2
```
Input:  haystack = 'leetcode',  needle = 'leeto'
Output: -1
```

### Example 3
```
Input:  haystack = 'hello',  needle = 'll'
Output: 2
```

### Example 4 (edge cases)
```
Input:  haystack = 'a',   needle = 'a'   →  0
Input:  haystack = 'a',   needle = 'b'   →  -1
Input:  haystack = 'abc', needle = ''    →  0   (empty needle found at position 0)
```

## Constraints
- `1 <= haystack.length, needle.length <= 10^4`
- `haystack` and `needle` consist of lowercase English letters only.

## Hints

<details>
<summary>Hint 1 — naive approach (good enough for this problem)</summary>

For each starting position `i` in `haystack` (from 0 to `haystack.length - needle.length`), check if the substring starting at `i` matches `needle`:

```js
for (let i = 0; i <= haystack.length - needle.length; i++) {
  let match = true;
  for (let j = 0; j < needle.length; j++) {
    if (haystack[i + j] !== needle[j]) { match = false; break; }
  }
  if (match) return i;
}
return -1;
```

Time: O(n · m) where n = haystack length, m = needle length. For the given constraints (both ≤ 10^4), this is at most 10^8 operations — borderline, but usually fine.
</details>

<details>
<summary>Hint 2 — using slice for cleaner code</summary>

```js
for (let i = 0; i <= haystack.length - needle.length; i++) {
  if (haystack.slice(i, i + needle.length) === needle) return i;
}
return -1;
```

`slice` creates a substring copy each time — O(m) per check, same overall complexity, but the code is cleaner. The constant factor is slightly higher due to allocations.
</details>

<details>
<summary>Hint 3 — KMP (optional, for the curious)</summary>

The **Knuth-Morris-Pratt** algorithm avoids redundant comparisons by precomputing a "failure function" (also called the prefix table) for the needle. When a mismatch occurs, instead of backing up all the way to the next starting position, you jump to the furthest point in the needle that can still produce a match.

KMP runs in O(n + m) time. See Q25 for a full KMP implementation with explanation.
</details>

## Write your solution
→ [`../solutions/16-implement-strstr.js`](../solutions/16-implement-strstr.js)

## Follow-ups
- Find the **last** occurrence of `needle` in `haystack` (reverse `lastIndexOf`).
- Find **all** occurrences of `needle` in `haystack` and return their indexes.
- Implement the Rabin-Karp rolling hash algorithm for substring search (Q26).
- Implement KMP with a full prefix-function explanation (Q25).
