# Q10 — Replace All Occurrences Without `.replaceAll`

**Difficulty:** Easy
**Pattern:** String traversal · indexOf loop
**Expected:** O(n · m) time · O(n) space

## Problem

Given three strings `s`, `target`, and `replacement`, replace **every occurrence** of `target` in `s` with `replacement`. Return the resulting string.

**Constraint:** you may not use `.replaceAll()` or a regex with the `g` flag. You may not use `.replace()` at all.

> **Why this constraint?** This is a common interview question that tests whether you understand the underlying mechanics. `.replaceAll` is the right tool in real code — but implementing it from scratch teaches you index arithmetic and the substring-building pattern.

## Examples

### Example 1
```
Input:  s = 'I love cats. Cats are great.',  target = 'cats',  replacement = 'dogs'
Output: 'I love dogs. Cats are great.'
```
Note: `'Cats'` (capital C) is NOT replaced — the match is case-sensitive.

### Example 2
```
Input:  s = 'aaa',  target = 'aa',  replacement = 'b'
Output: 'ba'
```
The first `'aa'` is found at index 0 and replaced. The remaining `'a'` at index 2 does not match `'aa'`.

### Example 3
```
Input:  s = 'hello',  target = 'xyz',  replacement = 'abc'
Output: 'hello'
```
No occurrences — return `s` unchanged.

### Example 4 (edge cases)
```
Input:  s = '',       target = 'a', replacement = 'b'  →  ''
Input:  s = 'hello',  target = '',  replacement = 'x'   →  'hello'  (empty target — skip)
```

## Constraints
- `0 <= s.length <= 10^5`
- `1 <= target.length <= 100`
- `0 <= replacement.length <= 100`

## Hints

<details>
<summary>Hint 1 — use indexOf to find occurrences</summary>

`s.indexOf(target, startIndex)` finds the first occurrence of `target` starting from `startIndex`. If not found, it returns `-1`.

Use this in a loop: find an occurrence, collect the text before it, then move past the match and look again.
</details>

<details>
<summary>Hint 2 — the loop structure</summary>

```
result = []
pos = 0

while (true):
  idx = s.indexOf(target, pos)
  if idx === -1: break
  push s.slice(pos, idx) into result      ← text before this match
  push replacement into result             ← the replacement
  pos = idx + target.length               ← skip past the match

push s.slice(pos) into result             ← any text after the last match
return result.join('')
```
</details>

<details>
<summary>Hint 3 — handle the edge case: empty target</summary>

If `target` is an empty string, `indexOf('', 0)` always returns 0, which would cause an infinite loop. Guard against it:

```js
if (target === '') return s;
```
</details>

## Write your solution
→ [`../solutions/10-replace-all.js`](../solutions/10-replace-all.js)

## Follow-ups
- What if the replacement itself contains the target string? For example, `s = 'aa'`, `target = 'a'`, `replacement = 'aa'`. Should the result be `'aaaa'` or something else? (Hint: it should be `'aaaa'` — don't re-scan the replacement.)
- What is the time complexity of your solution? Can you express it in terms of the number of occurrences found, the lengths of `s`, `target`, and `replacement`?
- Implement a **case-insensitive** version that replaces `'cats'` and `'Cats'` and `'CATS'` all at once.
- How does your implementation compare to running `.replace()` inside a `while` loop? Why is that approach problematic?
