# Q11 — Maximum Number of Vowels in a Substring of Given Length

**Difficulty:** Easy (LeetCode 1456)
**Pattern:** Fixed-size sliding window
**Expected:** O(n) time · O(1) space

## Problem

Given a string `s` and an integer `k`, return the **maximum number of vowels** in any substring of `s` with length `k`.

Vowels in English are: `a`, `e`, `i`, `o`, `u`.

## Examples

### Example 1
```
Input:  s = "abciiidef",  k = 3
Output: 3
```
The substring "iii" has 3 vowels.

### Example 2
```
Input:  s = "aeiou",  k = 2
Output: 2
```
Every substring of length 2 contains 2 vowels.

### Example 3
```
Input:  s = "leetcode",  k = 3
Output: 2
```
- "lee" → 2 vowels (e, e)
- "eet" → 2 vowels
- "etc" → 1 vowel
- ...
Maximum is 2.

### Example 4
```
Input:  s = "rhythms",  k = 4
Output: 0
```
No vowels in the string.

## Constraints
- `1 <= k <= s.length <= 10^5`
- `s` consists of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — what state to track</summary>

The window state is just a **count of vowels** currently in the window. Add 1 when the new right character is a vowel. Subtract 1 when the leaving left character is a vowel.
</details>

<details>
<summary>Hint 2 — how to check for vowels quickly</summary>

Use a Set: `const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])`. Then `VOWELS.has(c)` is O(1).

Or use a string includes: `'aeiou'.includes(c)`.
</details>

## Write your solution
→ [`../solutions/11-max-vowels-substring.js`](../solutions/11-max-vowels-substring.js)

## Follow-ups
- What if you also needed to know the **starting index** of the best window?
- How would you handle uppercase letters too?
