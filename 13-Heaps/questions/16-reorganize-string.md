# Q16 — Reorganize String

**Difficulty:** Medium
**Pattern:** Max-heap by character frequency + greedy interleaving
**Expected:** O(n log 26) = O(n) time · O(1) space (26-character alphabet)

## Problem

Given a string `s`, rearrange its characters so that no two adjacent characters are the same. Return any valid rearrangement, or an empty string `""` if it is impossible.

## Examples

### Example 1
```
Input:  s = "aab"
Output: "aba"
```
`"aab"` has `a` twice and `b` once. Rearranging gives `"aba"` where no two adjacent characters are the same.

### Example 2
```
Input:  s = "aaab"
Output: ""
```
`a` appears 3 times, `b` once. Any arrangement must place two `a`s adjacent — impossible.

### Example 3
```
Input:  s = "vvvlo"
Output: "vlvov"  (or any valid answer)
```

### Example 4
```
Input:  s = "zzzz"
Output: ""
```

## Constraints
- `1 <= s.length <= 500`
- `s` consists of lowercase English letters only.

## Hints

<details>
<summary>Hint 1 — when is it impossible?</summary>

If any character appears more than `Math.ceil(n / 2)` times, it is impossible — you cannot interleave it with enough other characters. Return `""`.

For example, `n = 4`: max allowed frequency is 2. `n = 5`: max is 3.
</details>

<details>
<summary>Hint 2 — greedy: always place the most frequent available character</summary>

Use a max-heap ordered by frequency. At each position in the result:

1. Pop the character with the highest frequency.
2. Place it at the current position.
3. Push the previously placed character back (if it still has remaining count > 0).

This ensures you never place the same character consecutively — the previously placed character is held back for one step before being eligible again.
</details>

<details>
<summary>Hint 3 — two-variable approach (no explicit queue needed)</summary>

Keep track of the character placed in the previous step (`prevChar`, `prevCount`). After placing the current character, put `prevChar` back in the heap.

```
prev = null, prevCount = 0
while heap is not empty:
  [freq, char] = heap.pop()
  result += char
  if prev and prevCount > 0:
    heap.push([prevCount, prev])
  prev = char
  prevCount = freq - 1
```
</details>

## Write your solution
→ [`../solutions/16-reorganize-string.js`](../solutions/16-reorganize-string.js)

## Follow-ups
- **Task Scheduler** (Q15) — reorganizing tasks with a cooldown period `n >= 1` instead of just `n = 1`.
- **Rearrange String k Distance Apart** — a harder variant where identical characters must be at least `k` positions apart.
- What is the maximum frequency a character can have in a valid rearrangement of a string of length `n`?
