# Q5 — Time Complexity vs Space Complexity

**Difficulty:** Easy (Conceptual)
**Pattern:** Foundational concept
**Expected:** Written explanation (no code required)

## Question

Explain the difference between **time complexity** and **space complexity**. Your answer should cover:

1. What does each one measure?
2. What counts as "extra space"? (Hint: the input array itself is usually not counted.)
3. Give a JavaScript example of an algorithm that is O(n) time and O(1) space, and another that is O(n) time and O(n) space.
4. What is the classic **time-space trade-off**, and when would you deliberately use more memory to gain speed?

## Examples

There is no input/output for this question. Write your answer as a comment in the solution file.

### Example to anchor your answer

```js
// Option A
function sumArray(arr) {
  let total = 0;
  for (const x of arr) total += x;
  return total;
}

// Option B
function sumWithCopy(arr) {
  const copy = [...arr];   // makes a full copy
  let total = 0;
  for (const x of copy) total += x;
  return total;
}
```

Both have O(n) time complexity. But their space complexities differ. Identify them and explain why.

## Hints

<details>
<summary>Hint 1 — "extra space" means what you allocate beyond the input</summary>

When we measure space complexity, we count the **auxiliary space** — the memory your algorithm creates in addition to the input it's given. The input itself is assumed to already exist in memory; that space was there before your function ran.

A `let total = 0` creates one number: O(1) extra space. A `const copy = [...arr]` creates an array of size n: O(n) extra space.
</details>

<details>
<summary>Hint 2 — recursion uses implicit stack space</summary>

Even if your function doesn't declare any variables, a recursive function uses space: each function call adds a frame to the call stack. A recursion with depth n uses O(n) stack space even without any explicit data structures.

```js
// O(n) time, O(n) space (stack)
function recursiveSum(arr, i = 0) {
  if (i === arr.length) return 0;
  return arr[i] + recursiveSum(arr, i + 1);
}
```
</details>

<details>
<summary>Hint 3 — the classic trade-off example: Two Sum</summary>

The brute-force Two Sum is O(n²) time and O(1) space (no extra structure needed — just nested loops).

The hash-map Two Sum is O(n) time and O(n) space (the map stores up to n entries).

You're trading memory for speed. This is the classic **time-space trade-off**: pay more in memory to avoid recomputing things — reducing time from O(n²) to O(n).
</details>

## Write your answer
→ [`../solutions/05-time-vs-space.js`](../solutions/05-time-vs-space.js)

## Follow-ups
- For the recursive sum function in Hint 2, rewrite it iteratively to achieve O(1) space. Does the time complexity change?
- A function creates a hash map with up to n entries and then discards it when it returns. Does the discarded space count toward the space complexity?
- Name two situations where you'd choose O(n) space to get O(1) or O(log n) time.
- What is "in-place" processing, and what space complexity does it typically imply?
