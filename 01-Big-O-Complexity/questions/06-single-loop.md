# Q6 — Identify the Complexity: Single Loop

**Difficulty:** Easy
**Pattern:** Complexity analysis — single loop
**Expected:** State time complexity and space complexity with justification

## Problem

Analyze the following function and state its **time complexity** and **space complexity**. Justify each answer in a comment.

```js
function printItems(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
```

## Input / Output

```
Input:  The function itself (n = arr.length)
Output: State O(?) time, O(?) space — and explain why
```

## Constraints
- `arr` is an array of length n.
- Assume `console.log` takes O(1) time (a constant-cost system call for our purposes).

## Hints

<details>
<summary>Hint 1 — count the iterations</summary>

The loop runs from `i = 0` to `i < arr.length`. How many times does it iterate? Express that in terms of n.
</details>

<details>
<summary>Hint 2 — what extra memory is created?</summary>

Inside the loop, the function reads `arr[i]` (no new variable stored between iterations, beyond the loop counter `i`). How many extra variables are live at any point? Does that number grow with n?
</details>

<details>
<summary>Hint 3 — confirm the space</summary>

The loop counter `i` is a single integer. The reference `arr[i]` reads from existing memory — it doesn't copy or store anything. So extra memory = one integer, no matter how big the array is. What's that in Big-O?
</details>

## Write your answer
→ [`../solutions/06-single-loop.js`](../solutions/06-single-loop.js)

## Follow-ups
- What if the function also built a result array `const result = []` and pushed `arr[i]` into it each iteration? How would space complexity change?
- What if the loop incremented by 2 (`i += 2`) instead of 1? Does that change the Big-O?
- What if the loop ran over both `arr` and `arr` again (two sequential loops)? What changes?
- Rewrite the function using `forEach` instead of a `for` loop. Does the complexity change?
