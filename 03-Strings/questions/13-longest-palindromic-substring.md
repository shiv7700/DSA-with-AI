# Q13 — Longest Palindromic Substring

**Difficulty:** Medium
**Pattern:** Expand around center
**Expected:** O(n²) time · O(1) space

## Problem

Given a string `s`, return the **longest palindromic substring** — the longest contiguous portion of `s` that reads the same forwards and backwards.

If there are multiple palindromic substrings of the same maximum length, return any one of them.

## Examples

### Example 1
```
Input:  'babad'
Output: 'bab'  (or 'aba' — both are valid)
```

### Example 2
```
Input:  'cbbd'
Output: 'bb'
```

### Example 3
```
Input:  'racecar'
Output: 'racecar'
```

### Example 4 (edge cases)
```
Input:  'a'     →  'a'
Input:  'ac'    →  'a'  (or 'c')
Input:  'abbc'  →  'bb'
```

## Constraints
- `1 <= s.length <= 1000`
- `s` consists of English letters and digits.

## Hints

<details>
<summary>Hint 1 — brute force (understand first)</summary>

Generate every possible substring and check if it's a palindrome. Keep the longest one found.

Time: O(n³) — O(n²) substrings, each checked in O(n). For `s.length = 1000` that's one billion operations — too slow, but good for understanding.
</details>

<details>
<summary>Hint 2 — expand around center</summary>

Every palindrome has a center. There are two kinds:
- **Odd-length**: center is a single character (e.g., `'racecar'` centered at `'e'`).
- **Even-length**: center is a gap between two characters (e.g., `'abba'` centered between the two `'b'`s).

For each possible center (n single characters + n-1 gaps = 2n-1 centers total), expand outward as long as the characters on both sides match:

```js
function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  // when the loop ends, s[left] !== s[right], so the palindrome is s[left+1 .. right-1]
  return s.slice(left + 1, right);
}
```

Call with `(s, i, i)` for odd-length centers and `(s, i, i+1)` for even-length centers.
</details>

<details>
<summary>Hint 3 — putting it together</summary>

```js
let longest = '';

for (let i = 0; i < s.length; i++) {
  const odd  = expandAroundCenter(s, i, i);     // odd-length palindromes
  const even = expandAroundCenter(s, i, i + 1); // even-length palindromes

  if (odd.length  > longest.length) longest = odd;
  if (even.length > longest.length) longest = even;
}

return longest;
```

Time: O(n) centers × O(n) expansion = O(n²). Space: O(1) extra (just a few index variables).
</details>

<details>
<summary>Hint 4 — is there an O(n) solution?</summary>

Yes — **Manacher's algorithm** finds the longest palindromic substring in O(n) time. It's brilliant but complex. For interviews at most companies, O(n²) with expand-around-center is perfectly acceptable. Learn Manacher's only if you're targeting top-tier companies or are genuinely curious.
</details>

## Write your solution
→ [`../solutions/13-longest-palindromic-substring.js`](../solutions/13-longest-palindromic-substring.js)

## Follow-ups
- Count the total number of palindromic substrings in `s` (not just the longest one).
- Find the longest palindromic **subsequence** (characters don't have to be contiguous). This is a dynamic programming problem — quite different from this one.
- What if you need to find all palindromic substrings of length ≥ k?
- Research Manacher's algorithm. What is its core insight?
