# Q15 — Decode String

**Difficulty:** Medium
**Pattern:** Stack — parsing nested structures
**Expected:** O(n) time · O(n) space

## Problem

Given an encoded string, return its decoded string.

The encoding rule is: `k[encoded_string]` where the `encoded_string` inside the square brackets is repeated exactly `k` times. `k` is a positive integer.

You may assume the input is always valid. Input does not contain extra white spaces. Brackets are always well-formed. Integers are always positive.

## Examples

### Example 1
```
Input:  "3[a]"
Output: "aaa"
```

### Example 2
```
Input:  "3[a2[c]]"
Output: "accaccacc"
```

### Example 3
```
Input:  "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
```

### Example 4
```
Input:  "100[ab]"
Output: "ab" repeated 100 times
```

## Constraints
- `1 <= s.length <= 30`
- `s` consists of lowercase English letters, digits, and square brackets `[]`.
- It is guaranteed that there are no extra white spaces, no square brackets are empty, and the input is valid.
- All integers will fit in a 32-bit integer.

## Hints

<details>
<summary>Hint 1 — why a stack?</summary>

Brackets nest: `3[a2[c]]` means the `2[c]` is inside the `3[...]`. When you hit the closing `]` of the inner expression, you need to know what's "outside" it — i.e., what was being built before you entered the bracket. A stack lets you save that context and restore it when you exit the inner bracket.
</details>

<details>
<summary>Hint 2 — what to push onto the stack</summary>

When you encounter `[`:
- Push the **current string being built** onto the stack.
- Push the **current repeat count** (k) onto the stack.
- Reset: current string = `""`, current k = `0`.

When you encounter `]`:
- Pop the count `k` and the previous string `prev`.
- New current string = `prev + currentStr.repeat(k)`.

When you encounter a **digit**: build up `k` (for multi-digit numbers: `k = k * 10 + digit`).

When you encounter a **letter**: append to current string.
</details>

<details>
<summary>Hint 3 — trace through "3[a2[c]]"</summary>

```
'3' → k = 3
'[' → push ("", 3) onto stack; reset: str="", k=0
'a' → str = "a"
'2' → k = 2
'[' → push ("a", 2); reset: str="", k=0
'c' → str = "c"
']' → pop: k=2, prev="a"  → str = "a" + "c".repeat(2) = "acc"
']' → pop: k=3, prev=""   → str = "" + "acc".repeat(3) = "accaccacc"
Done: "accaccacc" ✅
```
</details>

## Write your solution
→ [`../solutions/15-decode-string.js`](../solutions/15-decode-string.js)

## Follow-ups
- Implement this recursively instead of iteratively. Which do you find clearer?
- What if you also had a "decode length only" query — return how long the decoded string would be without actually building it? (Useful when the decoded string would be enormous.)
- Encode a string with run-length encoding (but produce the `k[str]` format).
