# Q11 — Print All Subsequences of a String

**Difficulty:** Medium
**Pattern:** Include/exclude recursion (2^n branching)
**Expected:** O(2^n) time · O(n) space (call stack depth)

## Problem

Write a recursive function `printSubsequences(s)` that prints all subsequences of the string `s`.

A **subsequence** is formed by deleting zero or more characters from the string while keeping the remaining characters in their original relative order.

For example, the subsequences of `"abc"` are: `""`, `"a"`, `"b"`, `"c"`, `"ab"`, `"ac"`, `"bc"`, `"abc"` — 8 total (2^3).

> **Why this problem?** It introduces the most powerful recursion pattern you'll use: **include or exclude**. At each step, you make a binary choice — take this character or don't. This pattern is the backbone of subset generation, combination sum, and many backtracking problems.

## Examples

### Example 1
```
Input:  "ab"
Output (any order):
""
"a"
"b"
"ab"
```

### Example 2
```
Input:  "abc"
Output (any order):
""
"a"
"b"
"ab"
"c"
"ac"
"bc"
"abc"
```
(8 subsequences = 2^3)

### Example 3 (edge case)
```
Input:  ""
Output: ""   (just the empty subsequence)
```

## Constraints
- `0 <= s.length <= 20` (2^20 is about a million — fine for printing)
- Print all subsequences (including the empty string `""`).
- Order doesn't matter.

## Hints

<details>
<summary>Hint 1 — the "include or exclude" decision</summary>

At each character in the string, you have a binary choice:
1. **Include** this character in your current subsequence.
2. **Exclude** this character from your current subsequence.

After making the choice, recurse on the rest of the string.

When you've processed all characters (reached the end of the string), print whatever you've accumulated so far.
</details>

<details>
<summary>Hint 2 — function signature and base case</summary>

Use a helper with an index and a running "current" string:

```js
function helper(s, index, current) {
  // base case: processed all characters
  if (index === s.length) {
    console.log(current);    // print whatever we've built so far
    return;
  }

  // recursive case: two choices for s[index]
  helper(s, index + 1, current + s[index]);  // INCLUDE s[index]
  helper(s, index + 1, current);             // EXCLUDE s[index]
}

function printSubsequences(s) {
  helper(s, 0, "");
}
```
</details>

<details>
<summary>Hint 3 — visualize the recursion tree for "ab"</summary>

```
helper("ab", 0, "")
├── include 'a' → helper("ab", 1, "a")
│   ├── include 'b' → helper("ab", 2, "ab") → prints "ab"
│   └── exclude 'b' → helper("ab", 2, "a")  → prints "a"
└── exclude 'a' → helper("ab", 1, "")
    ├── include 'b' → helper("ab", 2, "b")  → prints "b"
    └── exclude 'b' → helper("ab", 2, "")   → prints ""
```

4 leaves = 4 subsequences = 2^2. Each leaf is a printed subsequence.
</details>

<details>
<summary>Hint 4 — returning instead of printing</summary>

If you want to collect all subsequences in an array instead of printing:

```js
function getSubsequences(s) {
  const result = [];
  function helper(index, current) {
    if (index === s.length) { result.push(current); return; }
    helper(index + 1, current + s[index]);
    helper(index + 1, current);
  }
  helper(0, "");
  return result;
}
```
</details>

## Write your solution
→ [`../solutions/11-subsequences.js`](../solutions/11-subsequences.js)

## Follow-ups
- Modify it to print only subsequences of length exactly `k`.
- Print only non-empty subsequences.
- This exact pattern (include/exclude) is used in **Subset Sum** (Q15) and **Combination Sum** (Q24). Recognizing it here will make those problems much easier.
