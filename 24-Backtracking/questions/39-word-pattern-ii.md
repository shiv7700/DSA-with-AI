# Q39 — Word Pattern II

**Difficulty:** Hard
**Pattern:** Backtracking — bijective mapping from pattern characters to word substrings
**Expected:** O(n · m^n) time · O(n + m) space — where n = pattern length, m = string length

## Problem

Given a `pattern` string and a string `s`, return `true` if `s` **matches** the pattern.

A string `s` matches a pattern if there is a **bijection** between each character in `pattern` and a non-empty substring in `s` such that: the pattern maps consistently (the same character always maps to the same substring) and the mapping is injective (two different characters map to different substrings).

This is unlike Word Pattern I, where `s` is pre-tokenized by spaces.

## Examples

### Example 1
```
Input:  pattern = "aab", s = "dogdogcat"
Output: true
```
`'a'` → `"dog"`, `'b'` → `"cat"`.

### Example 2
```
Input:  pattern = "aab", s = "dogcatcat"
Output: true
```
`'a'` → `"dog"`, `'b'` → `"cat"`.

### Example 3
```
Input:  pattern = "aab", s = "dogdogdogdog"
Output: false
```

## Constraints
- `1 <= pattern.length, s.length <= 20`
- `pattern` and `s` consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — backtrack on pattern index and string index</summary>

`backtrack(pi, si)`: at pattern index `pi` and string index `si`, try assigning `s[si..si+len]` to `pattern[pi]` for each possible length `len`. If the character is already mapped, check consistency. If unmapped, check that the target substring is not already used by another character (bijection), then assign and recurse.
</details>

<details>
<summary>Hint 2 — two maps for bijection</summary>

Maintain `charToWord` (character → assigned substring) and `wordToChar` (substring → character). Both must be consistent for a bijection.
</details>

<details>
<summary>Hint 3 — base case and pruning</summary>

When `pi === pattern.length`, check that `si === s.length` — all of `s` must be consumed. Prune if the remaining string is too short to accommodate the remaining pattern characters (each must map to a non-empty substring).
</details>

## Write your solution
→ [`../solutions/39-word-pattern-ii.js`](../solutions/39-word-pattern-ii.js)

## Follow-ups
- **Word Pattern I** — same idea but `s` is space-delimited, reducing it to a map check.
- **Isomorphic Strings** — check if two strings are isomorphic (simpler bijection problem).
- How would you handle multi-character pattern symbols (e.g., `"ab"` as one symbol)?
