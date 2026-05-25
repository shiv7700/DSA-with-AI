# Q26 — Rabin-Karp Rolling Hash

**Difficulty:** Hard
**Pattern:** Rolling hash · modular arithmetic
**Expected:** O(n + m) average · O(n · m) worst case (hash collisions) · O(m) space

## Problem

Implement the **Rabin-Karp** substring search algorithm.

Given a text string `text` and a pattern string `pattern`, return the **starting index** of the first occurrence of `pattern` in `text`, or `-1` if not found.

Use a **rolling hash**: hash the pattern once, then slide a window of the same length over `text`, maintaining a running hash that updates in O(1) per step (instead of O(m) per step).

> **Why Rabin-Karp?** It's elegant in a different way than KMP. KMP avoids redundant character comparisons. Rabin-Karp avoids them by using arithmetic. It's also the foundation of algorithms for finding **multiple patterns** at once, and it's used in plagiarism detection (comparing documents for common substrings).

## Examples

### Example 1
```
Input:  text = 'AABAACAADAABAABA',  pattern = 'AABA'
Output: 0
```
First occurrence at index 0.

### Example 2
```
Input:  text = 'hello world',  pattern = 'world'
Output: 6
```

### Example 3
```
Input:  text = 'abcdef',  pattern = 'gh'
Output: -1
```

## Constraints
- `1 <= text.length <= 10^6`
- `1 <= pattern.length <= 10^4`
- Both strings consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — the hash function</summary>

A polynomial rolling hash maps a string `s[0..m-1]` to a number:

```
hash = s[0]*BASE^(m-1) + s[1]*BASE^(m-2) + ... + s[m-1]*BASE^0
```

A common choice: `BASE = 31` (or `BASE = 26`), computed modulo a large prime `MOD` (like `10^9 + 7`) to prevent integer overflow.

For characters `'a'..'z'`, map each character to `charCode - 96` (so `'a'` → 1, `'b'` → 2, etc.).
</details>

<details>
<summary>Hint 2 — the rolling update (the key trick)</summary>

When you slide the window one step to the right (drop the leftmost character, add the rightmost):

```
new_hash = (old_hash - s[left] * BASE^(m-1)) * BASE + s[left + m]
```

All modulo `MOD`. This is O(1) — no loop over the window.

Precompute `BASE^(m-1) mod MOD` once before the main loop.
</details>

<details>
<summary>Hint 3 — hash collision handling</summary>

Two different strings can have the same hash (a **collision**). When hashes match, do a full character-by-character comparison to confirm the match. This makes the worst case O(n · m) but the average case O(n + m) if collisions are rare.

To reduce collisions, use a large prime modulus (like `1_000_000_007`) or use double hashing (two different hash functions simultaneously).
</details>

<details>
<summary>Hint 4 — skeleton</summary>

```js
function rabinKarp(text, pattern) {
  const n = text.length, m = pattern.length;
  if (m > n) return -1;

  const BASE = 31, MOD = 1_000_000_007;
  const charVal = c => c.charCodeAt(0) - 96;

  // precompute BASE^(m-1) mod MOD
  let highPow = 1;
  for (let i = 0; i < m - 1; i++) highPow = (highPow * BASE) % MOD;

  // hash of pattern and first window
  let patHash = 0, winHash = 0;
  for (let i = 0; i < m; i++) {
    patHash = (patHash * BASE + charVal(pattern[i])) % MOD;
    winHash = (winHash * BASE + charVal(text[i])) % MOD;
  }

  for (let i = 0; i <= n - m; i++) {
    if (winHash === patHash) {
      // confirm with character comparison (handle collisions)
      if (text.slice(i, i + m) === pattern) return i;
    }
    if (i < n - m) {
      winHash = ((winHash - charVal(text[i]) * highPow % MOD + MOD) * BASE
                 + charVal(text[i + m])) % MOD;
    }
  }
  return -1;
}
```
</details>

## Write your solution
→ [`../solutions/26-rabin-karp.js`](../solutions/26-rabin-karp.js)

## Follow-ups
- Extend to find **all** occurrences of `pattern` in `text`.
- **Multiple pattern search**: given `k` patterns, find all occurrences of any of them in `text`. With Rabin-Karp, you can hash all patterns into a `Set` and check in O(1) per window — O(n + k·m) total. How does this compare to running KMP k times?
- **Longest Common Substring** of two strings: use binary search on the length + rolling hash to find the longest substring that appears in both. What is the overall time complexity?
- What is "double hashing" and why does it virtually eliminate false positives?
