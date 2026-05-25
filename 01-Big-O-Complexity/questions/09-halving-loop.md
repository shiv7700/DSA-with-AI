# Q9 — Identify the Complexity: Halving Loop

**Difficulty:** Easy–Medium
**Pattern:** Complexity analysis — logarithmic loop
**Expected:** State time complexity and space complexity with justification

## Problem

Analyze the following function and state its **time complexity** and **space complexity**. Justify each answer in a comment.

```js
function logHalf(n) {
  for (let i = n; i > 0; i = Math.floor(i / 2)) {
    console.log(i);
  }
}
```

## Input / Output

```
Input:  n (a positive integer)
Output: State O(?) time, O(?) space — and explain why
```

### Example trace

```
logHalf(16) prints:  16, 8, 4, 2, 1       → 5 iterations
logHalf(32) prints:  32, 16, 8, 4, 2, 1   → 6 iterations
logHalf(64) prints:  64, 32, 16, 8, 4, 2, 1 → 7 iterations
```

Notice: doubling `n` adds exactly **one** more iteration.

## Constraints
- `n` is a positive integer.
- The loop variable `i` is divided by 2 each iteration (not decremented by 1).

## Hints

<details>
<summary>Hint 1 — how many times can you halve n?</summary>

Start at n. Divide by 2. Divide by 2 again. Keep going until you reach (roughly) 1.

That process is precisely the definition of log₂(n): "how many times can you cut n in half before reaching 1?"

If n = 1024, that's 10 steps. If n = 1,048,576 (about a million), that's 20 steps.
</details>

<details>
<summary>Hint 2 — the key signal: division in the loop update</summary>

Any time you see a loop where the counter is **multiplied or divided** (not incremented by a constant amount), that loop is likely O(log n):

- `i = Math.floor(i / 2)` → halving → O(log n)
- `i = i * 2` and continuing while `i < n` → doubling → also O(log n)
- `i++` → incrementing by 1 → O(n)
</details>

<details>
<summary>Hint 3 — space</summary>

Inside the loop, only the loop variable `i` is used. No data structures. No new arrays or maps. The memory usage is constant regardless of n. What does that mean for space complexity?
</details>

## Write your answer
→ [`../solutions/09-halving-loop.js`](../solutions/09-halving-loop.js)

## Follow-ups
- What if the loop body did O(n) work on each iteration instead of O(1)? What would the total complexity be?
- Write a similar loop that starts at 1 and doubles until it reaches n. What's its complexity?
- Binary search is O(log n). Does it use the same "halving" principle? Explain the parallel.
- How many iterations does `logHalf(1_000_000_000)` (one billion) execute?
