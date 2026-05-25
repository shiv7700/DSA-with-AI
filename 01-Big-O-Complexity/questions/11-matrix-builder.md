# Q11 — Identify the Complexity: Matrix Builder

**Difficulty:** Easy–Medium
**Pattern:** Complexity analysis — nested loop + space allocation
**Expected:** State time complexity and space complexity with justification

## Problem

Analyze the following function and state its **time complexity** and **space complexity**. Justify each answer in a comment. Pay close attention to the space — this is where the interesting part is.

```js
function buildMatrix(n) {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push(new Array(n).fill(0));
  }
  return matrix;
}
```

## Input / Output

```
Input:  n (a positive integer)
Output: State O(?) time, O(?) space — and explain why
```

### Example

```
buildMatrix(3) returns:
[
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
```

## Constraints
- `n` is a positive integer.
- `new Array(n).fill(0)` creates an array of n zeros. Both `new Array(n)` and `.fill(0)` are O(n) operations.

## Hints

<details>
<summary>Hint 1 — time: what happens each iteration?</summary>

The outer loop runs `n` times. Inside each iteration, `new Array(n).fill(0)` is called. That creates and fills an array of n elements — which is O(n) work. So: n iterations × O(n) work per iteration = ?
</details>

<details>
<summary>Hint 2 — space: how many total cells are created?</summary>

The matrix has n rows. Each row has n columns. Total cells: n × n = n². All of these cells are stored in memory. What is that in Big-O?
</details>

<details>
<summary>Hint 3 — time and space often match for allocation</summary>

When you allocate and initialize memory, the time to do so is proportional to the amount of memory allocated. Creating n² cells takes O(n²) time (you must write a 0 into each cell) and O(n²) space (each cell occupies memory).

Both time and space complexity are O(n²) here.
</details>

## Write your answer
→ [`../solutions/11-matrix-builder.js`](../solutions/11-matrix-builder.js)

## Follow-ups
- What is the complexity of accessing a single cell in the returned matrix, e.g., `matrix[i][j]`?
- What if the matrix were rectangular — n rows and m columns? How would you express the complexity?
- Rewrite `buildMatrix(n)` using `Array.from` instead of a `for` loop. Does the complexity change?
- What is the space complexity of `buildMatrix` if n = 1000? About how many megabytes is that (assume each number is 8 bytes)?
