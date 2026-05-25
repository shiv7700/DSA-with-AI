# Q25 — Ransom Note

**Difficulty:** Medium (easy once you see the pattern)
**Pattern:** Frequency map subtraction
**Expected:** O(n + m) time · O(1) space (bounded by 26 letters)

## Problem

Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed by using the letters from `magazine`, and `false` otherwise.

Each letter in `magazine` can only be used **once**.

## Examples

### Example 1
```
Input:  ransomNote = "a",  magazine = "b"
Output: false
```

### Example 2
```
Input:  ransomNote = "aa",  magazine = "ab"
Output: false
```
Two `'a'`s needed but only one available.

### Example 3
```
Input:  ransomNote = "aa",  magazine = "aab"
Output: true
```

### Example 4
```
Input:  ransomNote = "hello",  magazine = "helloo world"
Output: true
```

## Constraints
- `1 <= ransomNote.length, magazine.length <= 10^5`
- `ransomNote` and `magazine` consist of lowercase English letters.

## Hints

<details>
<summary>Hint 1 — the approach</summary>

Build a frequency map of letters available in `magazine`. Then walk through `ransomNote`: for each required letter, decrement its count. If the count ever goes negative (you need more of that letter than you have), return `false`. If you finish the ransom note, return `true`.
</details>

## Write your solution
→ [`../solutions/25-ransom-note.js`](../solutions/25-ransom-note.js)

## Follow-ups
- What if the ransom note must use the characters in their original order from the magazine (a harder constraint)?
- Generalize: you have multiple copies of the magazine. How many copies do you need at minimum?
