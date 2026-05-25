# Q20 — Optimization Drill: All Unique Characters (O(n²) → O(n))

**Difficulty:** Easy–Medium
**Pattern:** Set-based uniqueness check
**Expected:** O(n) time · O(min(n, c)) space — where c is the character set size

## Problem

Given a string, determine whether all of its characters are unique (no character appears more than once). Return `true` if all characters are unique, `false` otherwise.

The naive brute-force approach is O(n²). Your task:
1. Implement the naive solution and explain why it's O(n²).
2. Implement an O(n) solution using a `Set`.
3. State the time and space complexity of your optimized solution.

## Examples

### Example 1
```
Input:  "abcdef"
Output: true
```
All characters are different.

### Example 2
```
Input:  "hello"
Output: false
```
`'l'` appears twice (at indices 2 and 3).

### Example 3
```
Input:  ""
Output: true
```
An empty string has no characters, so there are no duplicates (vacuously true).

### Example 4
```
Input:  "a"
Output: true
```

## Constraints
- `0 <= s.length <= 10^5`
- The string may contain any Unicode characters.

## Hints

<details>
<summary>Hint 1 — why is naive O(n²)?</summary>

A naive approach: for each character at index i, check if it appears at any later index j.

```js
for (let i = 0; i < s.length; i++) {
  for (let j = i + 1; j < s.length; j++) {
    if (s[i] === s[j]) return false;
  }
}
return true;
```

Or equivalently, use `s.indexOf(s[i])` inside a loop (remember: `indexOf` is itself O(n)):

```js
for (let i = 0; i < s.length; i++) {
  if (s.indexOf(s[i]) !== i) return false;   // O(n) per call → O(n²) total
}
```

Both approaches are O(n²) because you're doing O(n) work for each of the n characters.
</details>

<details>
<summary>Hint 2 — use a Set to track what you've seen</summary>

Walk through the string once. Before processing each character, check if you've seen it already (using a `Set`, which has O(1) lookups). If you have, return false. If not, add it.

```
"hello":
  h → not in set → add h   → set = {h}
  e → not in set → add e   → set = {h, e}
  l → not in set → add l   → set = {h, e, l}
  l → already in set!       → return false
```

One pass. O(1) per character (Set operations). Total: O(n).
</details>

<details>
<summary>Hint 3 — the space complexity is bounded by character set size</summary>

The Set can contain at most as many elements as there are distinct characters. For ASCII strings, that's at most 128 characters — O(1) space. For Unicode strings, at most 1,114,112 code points — but still O(min(n, c)) where c is the size of the character set.

In Big-O terms, this is often written as O(1) for ASCII (bounded by a constant), or O(n) as a conservative upper bound.

There's also an early-termination trick: if the string is longer than the number of possible distinct characters (e.g., > 128 for ASCII), you can immediately return false — no duplicates are impossible.
</details>

## Write your solution
→ [`../solutions/20-all-unique-characters.js`](../solutions/20-all-unique-characters.js)

## Follow-ups
- Solve it without using a `Set` or any other extra data structure. What's the best complexity you can achieve? (Hint: sorting helps.)
- What is the minimum space required to solve this problem for ASCII strings only? Can you use a bitmask?
- Extend the problem: instead of returning a boolean, return the first repeated character (or `null` if none).
- What's the relationship between this problem and the "Longest Substring Without Repeating Characters" problem?
