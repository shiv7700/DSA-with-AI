# Q25 — KMP Pattern Matching

**Difficulty:** Hard
**Pattern:** KMP (Knuth-Morris-Pratt) — prefix function
**Expected:** O(n + m) time · O(m) space  (n = |text|, m = |pattern|)

## Problem

Implement the **Knuth-Morris-Pratt (KMP)** substring search algorithm.

Given a text string `text` and a pattern string `pattern`, return the **starting index** of the first occurrence of `pattern` in `text`, or `-1` if it is not found.

Your solution must run in **O(n + m)** time — not O(n · m). That means you may not use a naive nested loop or JavaScript's `indexOf`.

> **Why KMP?** The naive substring search (Q16) is O(n · m) in the worst case. KMP is O(n + m) by precomputing a "failure function" for the pattern that lets you skip redundant comparisons when a mismatch occurs. It's a beautiful piece of algorithmic thinking, and it directly connects to string fundamentals you've already learned.

## Examples

### Example 1
```
Input:  text = 'ababcabcababd',  pattern = 'ababd'
Output: 7
```
`'ababd'` starts at index 7.

### Example 2
```
Input:  text = 'hello world',  pattern = 'world'
Output: 6
```

### Example 3
```
Input:  text = 'aaaaab',  pattern = 'aaab'
Output: 2
```

### Example 4
```
Input:  text = 'hello',  pattern = 'xyz'
Output: -1
```

## Constraints
- `1 <= text.length <= 10^6`
- `1 <= pattern.length <= 10^4`
- Both strings consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — what is the prefix function?</summary>

For a pattern `p`, the **prefix function** (also called the "failure function" or "lps array" — longest proper prefix that is also a suffix) is an array `lps` of length `m`:

`lps[i]` = the length of the longest proper prefix of `p[0..i]` that is also a suffix of `p[0..i]`.

Example: for pattern `'ababd'`:
```
i = 0: 'a'     → lps[0] = 0  (no proper prefix)
i = 1: 'ab'    → lps[1] = 0  ('a' is not a suffix of 'ab')
i = 2: 'aba'   → lps[2] = 1  ('a' is both a prefix and a suffix)
i = 3: 'abab'  → lps[3] = 2  ('ab' is both a prefix and a suffix)
i = 4: 'ababd' → lps[4] = 0  (no match)
```

`lps = [0, 0, 1, 2, 0]`
</details>

<details>
<summary>Hint 2 — building the prefix function</summary>

```js
function buildLPS(pattern) {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let len = 0;   // length of the previous longest prefix-suffix

  let i = 1;
  while (i < m) {
    if (pattern[i] === pattern[len]) {
      lps[i] = ++len;
      i++;
    } else if (len > 0) {
      len = lps[len - 1];   // don't increment i — try shorter prefix
    } else {
      lps[i] = 0;
      i++;
    }
  }
  return lps;
}
```
</details>

<details>
<summary>Hint 3 — the KMP search</summary>

```js
function kmpSearch(text, pattern) {
  const n = text.length, m = pattern.length;
  if (m === 0) return 0;
  const lps = buildLPS(pattern);

  let i = 0;   // index into text
  let j = 0;   // index into pattern

  while (i < n) {
    if (text[i] === pattern[j]) {
      i++; j++;
    }
    if (j === m) return i - j;   // found!
    else if (i < n && text[i] !== pattern[j]) {
      if (j > 0) j = lps[j - 1];   // don't move i; use prefix function
      else i++;
    }
  }
  return -1;
}
```

The key insight: when a mismatch occurs at position `j` in the pattern, `lps[j-1]` tells you the longest prefix of the pattern that matches the text ending just before the mismatch. Jump `j` back to that prefix length, not all the way to 0.
</details>

## Write your solution
→ [`../solutions/25-kmp-pattern-matching.js`](../solutions/25-kmp-pattern-matching.js)

## Follow-ups
- Modify the solution to return **all** starting indexes where `pattern` occurs in `text`.
- Use the KMP failure function to check if a string is a rotation of another (hint: check if `s2` occurs in `s1 + s1`).
- How does the Z-algorithm compare to KMP? What does the Z-array represent?
- For what kinds of patterns does the naive O(n · m) algorithm perform as badly as possible? Construct such an example.
