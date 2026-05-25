# Q24 — Longest Happy String

**Difficulty:** Medium
**Pattern:** Max-heap by count + greedy character placement
**Expected:** O(n log 3) = O(n) time · O(1) space

## Problem

A string is **happy** if it satisfies all of the following rules:

- It only contains the letters `'a'`, `'b'`, and `'c'`.
- It does not contain the subsequence `"aaa"`, `"bbb"`, or `"ccc"` (no character appears three or more times in a row).
- It contains at most `a` occurrences of the letter `'a'`, at most `b` occurrences of `'b'`, and at most `c` occurrences of `'c'`.

Given three integers `a`, `b`, and `c`, return the **longest possible happy string**. If there are multiple answers, return any of them. If there is no such string, return `""`.

## Examples

### Example 1
```
Input:  a = 1, b = 1, c = 7
Output: "ccaccbcc"  (or any valid string of length 9)
```
Maximum length is 9. `c` dominates but must be broken up by `a` and `b`.

### Example 2
```
Input:  a = 2, b = 2, c = 1
Output: "aabbc"  (or "aabbcc" or any valid 5-character arrangement)
```

### Example 3
```
Input:  a = 7, b = 1, c = 0
Output: "aabaa"
```
`c = 0` so only `a` and `b` are available. Can only place at most `aa` consecutively.

## Constraints
- `0 <= a, b, c <= 100`

## Hints

<details>
<summary>Hint 1 — always try the most frequent character</summary>

Greedily place the character with the highest remaining count. If the last two characters are both the same as the current best, place the second-best character instead (to avoid three in a row).

A max-heap with at most 3 entries makes "find the most frequent" O(1).
</details>

<details>
<summary>Hint 2 — tracking the last two characters placed</summary>

You need to know whether placing the current best character would create three consecutive identical characters. Track the last character added and its current "run length" (1 or 2).

If `runLength == 2` and `bestChar == lastChar`: skip to the second-best character. If the second-best doesn't exist or has count 0, stop — no valid character can be added without violating the rule.
</details>

<details>
<summary>Hint 3 — heap with (count, char) pairs</summary>

```
heap = max-heap by count: [(a,'a'), (b,'b'), (c,'c')] with zeros removed
result = []
lastChar = null, runLen = 0

while heap is not empty:
  [cnt1, ch1] = heap.peek() (don't pop yet)
  if ch1 == lastChar and runLen == 2:
    if heap.size() < 2: break
    [cnt2, ch2] = second element
    place ch2, decrement cnt2, update runLen tracking
    push back [cnt1, ch1] and updated [cnt2, ch2]
  else:
    pop [cnt1, ch1], place ch1, update run tracking
    push back [cnt1-1, ch1] if cnt1-1 > 0
```
</details>

## Write your solution
→ [`../solutions/24-longest-happy-string.js`](../solutions/24-longest-happy-string.js)

## Follow-ups
- **Reorganize String** (Q16) — a simpler variant where you only need to avoid adjacent duplicates.
- **Task Scheduler** (Q15) — similar greedy-with-cooldown structure.
- What is the theoretical maximum length of a happy string given `a`, `b`, `c`?
