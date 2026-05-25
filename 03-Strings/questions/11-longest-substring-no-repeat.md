# Q11 — Longest Substring Without Repeating Characters

**Difficulty:** Medium
**Pattern:** Sliding window · Set or Map
**Expected:** O(n) time · O(k) space (k = character set size)

## Problem

Given a string `s`, find the length of the **longest substring** (a contiguous part of the string) in which no character appears more than once.

> **Why this problem matters:** this is the "Hello, World" of sliding window problems. Once you understand how the window expands and contracts here, you'll recognize the same mechanic in dozens of other problems.

## Examples

### Example 1
```
Input:  'abcabcbb'
Output: 3
```
The longest substring without repeating characters is `'abc'` (length 3). After that, every new character causes a repeat.

### Example 2
```
Input:  'bbbbb'
Output: 1
```
Every character is the same. Best you can do is `'b'` (length 1).

### Example 3
```
Input:  'pwwkew'
Output: 3
```
`'wke'` is the longest at length 3. Note: `'pwke'` is a subsequence but not a contiguous substring.

### Example 4 (edge cases)
```
Input:  ''       →  0
Input:  'a'      →  1
Input:  'au'     →  2
```

## Constraints
- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols, and spaces.

## Hints

<details>
<summary>Hint 1 — brute force (understand the problem first)</summary>

For every possible starting index `i`, walk forward to find the longest substring with no repeats starting at `i`. Track the maximum length seen.

This is O(n²) or O(n³) but ensures you understand what "no repeating characters in a substring" means before optimizing.
</details>

<details>
<summary>Hint 2 — sliding window idea</summary>

Instead of re-computing from scratch for every starting position, maintain a **window** `[left, right]`:
- Expand `right` one step at a time.
- When the new character at `right` is already in the window, **shrink the window from the left** until the duplicate is removed.

Use a `Set` to track which characters are currently in the window.

```
window = {}    left = 0    maxLen = 0

right = 0: add 'a'. window = {a}           len = 1
right = 1: add 'b'. window = {a,b}         len = 2
right = 2: add 'c'. window = {a,b,c}       len = 3
right = 3: 'a' in window! remove until gone:
           remove s[0]='a', left → 1. window = {b,c}
           add 'a'. window = {b,c,a}        len = 3
```
</details>

<details>
<summary>Hint 3 — optimized version with a Map</summary>

Instead of shrinking one step at a time, store each character's **last-seen index** in a `Map`. When you encounter a duplicate at `right`, jump `left` directly to `lastSeen.get(s[right]) + 1` (but never jump backwards):

```js
const lastSeen = new Map();
let left = 0, maxLen = 0;

for (let right = 0; right < s.length; right++) {
  if (lastSeen.has(s[right])) {
    left = Math.max(left, lastSeen.get(s[right]) + 1);
  }
  lastSeen.set(s[right], right);
  maxLen = Math.max(maxLen, right - left + 1);
}

return maxLen;
```

This is strictly O(n) — no inner loop at all.
</details>

## Write your solution
→ [`../solutions/11-longest-substring-no-repeat.js`](../solutions/11-longest-substring-no-repeat.js)

## Follow-ups
- Return the **actual substring** (not just its length).
- **Longest Substring with At Most K Distinct Characters** — same sliding window, but allow up to `k` distinct characters.
- **Minimum Window Substring** (Q21) — find the shortest window that contains all characters of another string.
- What changes if you need the **shortest** substring with all unique characters?
