# Q18 — Letter Combinations of a Phone Number

**Difficulty:** Medium
**Pattern:** Backtracking — multi-choice at each level
**Expected:** O(4^n × n) time · O(n) space (call stack)

## Problem

Given a string `digits` containing digits from `2–9`, return all possible letter combinations that the digits could represent on an old telephone keypad.

The mapping is:
```
2 → "abc"    3 → "def"    4 → "ghi"    5 → "jkl"
6 → "mno"    7 → "pqrs"   8 → "tuv"    9 → "wxyz"
```

Return the answer in any order.

> **Why this problem?** It's the first "multiple choices per level" backtracking problem. Each digit doesn't give you two options (like binary strings) — it gives you 3 or 4. The structure generalizes directly to harder backtracking problems where the branching factor varies.

## Examples

### Example 1
```
Input:  digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

### Example 2
```
Input:  digits = "9"
Output: ["w","x","y","z"]
```

### Example 3 (edge case)
```
Input:  digits = ""
Output: []
```

### Example 4
```
Input:  digits = "79"
Output: ["pw","px","py","pz","qw","qx","qy","qz","rw","rx","ry","rz","sw","sx","sy","sz"]
```

## Constraints
- `0 <= digits.length <= 4`
- `digits[i]` is a digit in the range `['2', '9']`.

## Hints

<details>
<summary>Hint 1 — set up the keypad map</summary>

First, create a lookup from digit to its letters:

```js
const phoneMap = {
  '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
  '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
};
```

Handle the edge case: if `digits === ""`, return `[]`.
</details>

<details>
<summary>Hint 2 — one digit at a time</summary>

Use a helper that tracks the current index in `digits` and a `current` string built so far.

- Base case: `index === digits.length` → `current` is a complete combination, push it to results.
- Recursive case: for each letter that maps to `digits[index]`, append it to `current` and recurse to `index + 1`.

```js
function helper(index, current) {
  if (index === digits.length) {
    result.push(current);
    return;
  }
  for (const letter of phoneMap[digits[index]]) {
    helper(index + 1, current + letter);
  }
}
```
</details>

<details>
<summary>Hint 3 — visualize the recursion tree for "23"</summary>

```
helper(0, "")
├── 'a' → helper(1, "a")
│   ├── 'd' → helper(2, "ad") → push "ad"
│   ├── 'e' → helper(2, "ae") → push "ae"
│   └── 'f' → helper(2, "af") → push "af"
├── 'b' → helper(1, "b")
│   ├── 'd' → push "bd"
│   ├── 'e' → push "be"
│   └── 'f' → push "bf"
└── 'c' → helper(1, "c")
    ├── 'd' → push "cd"
    ├── 'e' → push "ce"
    └── 'f' → push "cf"
```

9 combinations for "23" (3 × 3).
</details>

## Write your solution
→ [`../solutions/18-letter-combinations.js`](../solutions/18-letter-combinations.js)

## Follow-ups
- LeetCode 17: **Letter Combinations of a Phone Number** — exact same problem.
- Count the total number of combinations without generating them. For digits with 3 letters, multiply by 3; for digit `7` and `9` (4 letters), multiply by 4.
- What's the maximum number of combinations? `4^4 = 256` (four digits, each mapping to 4 letters like `7` or `9`).
