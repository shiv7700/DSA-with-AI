# Q19 — Isomorphic Strings

**Difficulty:** Medium
**Pattern:** Bidirectional map (two Maps for consistent character mapping)
**Expected:** O(n) time · O(1) space (bounded by character set size)

## Problem

Given two strings `s` and `t`, determine if they are **isomorphic**.

Two strings are isomorphic if the characters in `s` can be replaced to get `t`. All occurrences of a character must be replaced with the same character, no two different characters of `s` may map to the same character in `t`, but a character may map to itself.

## Examples

### Example 1
```
Input:  s = "egg",  t = "add"
Output: true
```
`'e' → 'a'`, `'g' → 'd'`. The mapping is consistent.

### Example 2
```
Input:  s = "foo",  t = "bar"
Output: false
```
`'f' → 'b'`, `'o' → 'a'`, but then the second `'o'` would need to map to both `'a'` and `'r'` — contradiction.

### Example 3
```
Input:  s = "paper",  t = "title"
Output: true
```
`'p' → 't'`, `'a' → 'i'`, `'e' → 'l'`, `'r' → 'e'`.

### Example 4
```
Input:  s = "badc",  t = "baba"
Output: false
```
`'b' → 'b'`, `'a' → 'a'`, `'d' → 'b'` — but `'b'` already maps to `'b'` from `s`. Two different source characters (`'b'` and `'d'`) would map to the same target character (`'b'`).

## Constraints
- `1 <= s.length <= 5 * 10^4`
- `t.length == s.length`
- `s` and `t` consist of any valid ASCII character.

## Hints

<details>
<summary>Hint 1 — the two-direction requirement</summary>

You need **two maps**:
- `sToT`: maps each character in `s` to a character in `t`.
- `tToS`: maps each character in `t` back to `s`.

Why both? Without `tToS`, you'd miss the case in Example 4 — two different `s` characters mapping to the same `t` character.
</details>

<details>
<summary>Hint 2 — algorithm</summary>

Walk `s` and `t` in parallel (same index `i`):
1. If `sToT` has `s[i]` but `sToT.get(s[i]) !== t[i]` → contradiction → return `false`.
2. If `tToS` has `t[i]` but `tToS.get(t[i]) !== s[i]` → contradiction → return `false`.
3. Otherwise, set both mappings and continue.
</details>

## Write your solution
→ [`../solutions/19-isomorphic-strings.js`](../solutions/19-isomorphic-strings.js)

## Follow-ups
- **Word Pattern** (Q20) — same logic but at the word level instead of character level.
- Can you solve this by mapping both strings to a common "canonical form" (replace each character with its first-appearance index)?
