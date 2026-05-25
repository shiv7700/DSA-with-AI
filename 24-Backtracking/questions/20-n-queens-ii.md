# Q20 — N-Queens II (Count Solutions)

**Difficulty:** Hard
**Pattern:** Backtracking — same as N-Queens but count instead of collect
**Expected:** O(n!) time · O(n) space

## Problem

The **n-queens** puzzle asks you to place `n` queens on an `n x n` chessboard such that no two queens attack each other. Given an integer `n`, return the **number** of distinct solutions to the n-queens puzzle.

## Examples

### Example 1
```
Input:  n = 4
Output: 2
```
Two distinct board configurations exist for n = 4.

### Example 2
```
Input:  n = 1
Output: 1
```

## Constraints
- `1 <= n <= 9`

## Hints

<details>
<summary>Hint 1 — reuse N-Queens structure</summary>

This is identical to N-Queens I except instead of building and recording full board strings, you increment a counter when `row === n`. You save memory by not storing any boards.
</details>

<details>
<summary>Hint 2 — bitmask optimization (advanced)</summary>

For a faster solution, represent `cols`, `diag1`, and `diag2` as integer bitmasks instead of Sets. Computing `availableBits = ((1 << n) - 1) & ~(cols | diag1 | diag2)` gives all valid column positions for the current row in O(1). Iterating over bits with `lowBit = bits & -bits` then extracts each valid column.
</details>

<details>
<summary>Hint 3 — known answers for validation</summary>

n=1→1, n=2→0, n=3→0, n=4→2, n=5→10, n=6→4, n=7→40, n=8→92, n=9→352. Use these to verify your solution.
</details>

## Write your solution
→ [`../solutions/20-n-queens-ii.js`](../solutions/20-n-queens-ii.js)

## Follow-ups
- **N-Queens I** — return the actual board configurations.
- Solve using the bitmask trick — compare runtime to the Set-based version.
- For n = 15, does your solution finish in under a second?
