# Q7 — Identify the Complexity: Nested Loops

**Difficulty:** Easy
**Pattern:** Complexity analysis — nested loops
**Expected:** State time complexity and space complexity with justification

## Problem

Analyze the following function and state its **time complexity** and **space complexity**. Justify each answer in a comment.

```js
function printPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
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
- Both loops iterate over the same array.

## Hints

<details>
<summary>Hint 1 — count the iterations for both loops</summary>

The outer loop runs `n` times. For each outer iteration, the inner loop also runs `n` times. How many total iterations does this produce?
</details>

<details>
<summary>Hint 2 — nested loops multiply</summary>

When loops are nested (one inside the other), you multiply their iteration counts — not add. If the outer runs `n` times and the inner runs `n` times for each outer step: total = n × n.
</details>

<details>
<summary>Hint 3 — space is still small</summary>

The only variables created are `i`, `j`, and `arr` (already given). No extra data structures are allocated inside either loop. What does that imply for space complexity?
</details>

## Write your answer
→ [`../solutions/07-nested-loops.js`](../solutions/07-nested-loops.js)

## Follow-ups
- What if the inner loop ran over a *different* array `arr2` of length m? How would you write the time complexity?
- What if there were three nested loops, each over the same array of length n? What would the time complexity be?
- Can you rewrite `printPairs` so it only prints each unique pair (where `i < j`) instead of every ordered pair? What's the time complexity of your rewritten version?
- If n = 1,000, how many `console.log` calls does the original `printPairs` make?
