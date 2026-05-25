# Q13 — Generate All Binary Strings of Length N

**Difficulty:** Medium
**Pattern:** Include/exclude recursion — two choices per position (0 or 1)
**Expected:** O(2^n × n) time · O(n) space (call stack)

## Problem

Write a recursive function `generateBinaryStrings(n)` that returns all binary strings of length `n` — strings made only of `'0'` and `'1'`.

For `n = 2`, the result is: `["00", "01", "10", "11"]`.

> **Why this problem?** It's the simplest form of the "make a choice at each position" backtracking pattern. Exactly two options per slot, and you fill in all `n` slots. This is the mental model behind many harder backtracking problems where the choices are more complex.

## Examples

### Example 1
```
Input:  n = 1
Output: ["0", "1"]   (any order)
```

### Example 2
```
Input:  n = 2
Output: ["00", "01", "10", "11"]   (any order)
```

### Example 3
```
Input:  n = 3
Output: ["000","001","010","011","100","101","110","111"]   (any order)
```
(8 strings = 2^3)

### Example 4 (edge case)
```
Input:  n = 0
Output: [""]   (one empty string)
```

## Constraints
- `0 <= n <= 20`
- Return an array of strings.

## Hints

<details>
<summary>Hint 1 — one position at a time</summary>

Build the string one character at a time. At each position, you have exactly two choices: add `'0'` or add `'1'`. Recurse for the next position.

When you've placed all `n` characters, you have a complete binary string — add it to the results.
</details>

<details>
<summary>Hint 2 — function signature and base case</summary>

```js
function helper(current, n, result) {
  // base case: string is full
  if (current.length === n) {
    result.push(current);
    return;
  }
  // recursive case: try both '0' and '1'
  helper(current + '0', n, result);
  helper(current + '1', n, result);
}

function generateBinaryStrings(n) {
  const result = [];
  helper('', n, result);
  return result;
}
```
</details>

<details>
<summary>Hint 3 — visualize the recursion tree for n=2</summary>

```
helper('', 2)
├── helper('0', 2)
│   ├── helper('00', 2) → push "00", return
│   └── helper('01', 2) → push "01", return
└── helper('1', 2)
    ├── helper('10', 2) → push "10", return
    └── helper('11', 2) → push "11", return
```

A perfect binary tree of depth `n`. Exactly `2^n` leaves, one per binary string.
</details>

## Write your solution
→ [`../solutions/13-binary-strings.js`](../solutions/13-binary-strings.js)

## Follow-ups
- Modify the function to generate all strings of length `n` over the alphabet `{0, 1, 2}` (ternary strings). What changes? (Hint: three choices instead of two.)
- Generate only binary strings with no two consecutive `'1'`s. (Add a condition before each recursive call.)
- This structure — n levels, k choices per level — directly models the generate-parentheses problem (Q14), where the constraints are more complex.
