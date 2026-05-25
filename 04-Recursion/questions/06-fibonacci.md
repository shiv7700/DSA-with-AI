# Q6 — Fibonacci: Naive O(2^n) then Memoized O(n)

**Difficulty:** Easy → Medium (two versions)
**Pattern:** Branching recursion → memoization
**Expected:** Naive: O(2^n) time · O(n) space | Memoized: O(n) time · O(n) space

## Problem

The Fibonacci sequence is: `0, 1, 1, 2, 3, 5, 8, 13, 21, 34, …`

Each number is the sum of the two numbers before it.

Formally:
- `fib(0) = 0`
- `fib(1) = 1`
- `fib(n) = fib(n-1) + fib(n-2)` for n >= 2

Write **two** functions:
1. `fibNaive(n)` — the direct recursive version (even though it's slow).
2. `fibMemo(n)` — the same thing but with memoization added.

Then compare their runtime on `n = 35` and `n = 40`.

> **Why this problem?** Fibonacci is the canonical example for why naive branching recursion can be catastrophically slow, and how one insight (memoization) transforms it. This pattern — recognize overlapping subproblems, cache results — is the foundation of **dynamic programming**, one of the most important DSA topics.

## Examples

### Example 1
```
Input:  n = 6
Output: 8
```
Sequence: 0, 1, 1, 2, 3, 5, **8**

### Example 2
```
Input:  n = 10
Output: 55
```

### Example 3
```
fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
```

## Constraints
- `0 <= n <= 50` (naive version will struggle above 35–40)
- Both functions must produce the correct answer.

## Hints

<details>
<summary>Hint 1 — the naive version: two base cases, two recursive calls</summary>

The Fibonacci formula has two base cases:
- `fib(0) = 0`
- `fib(1) = 1`

And one recursive rule: `fib(n) = fib(n-1) + fib(n-2)`.

```js
function fibNaive(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibNaive(n - 1) + fibNaive(n - 2);
}
```

Done. But try calling `fibNaive(40)` and watch it chug...
</details>

<details>
<summary>Hint 2 — why is the naive version so slow?</summary>

Each call spawns TWO more calls. For `fib(5)`, here's the call tree:

```
              fib(5)
           /          \
        fib(4)        fib(3)
       /      \       /     \
    fib(3)  fib(2) fib(2) fib(1)
    / \      / \    / \
 fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)
 / \
fib(1) fib(0)
```

Notice `fib(3)` is computed twice, `fib(2)` is computed three times. For `fib(40)`, `fib(20)` would be computed over a million times. The total is roughly `2^n` calls.
</details>

<details>
<summary>Hint 3 — memoization: add a cache</summary>

The insight: if `fib(3)` was computed once and the answer is 2, every future request for `fib(3)` can just return 2 immediately — no tree to traverse.

Add a cache (a plain object works fine):

```js
const memo = {};

function fibMemo(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (memo[n] !== undefined) return memo[n];   // ← cache hit!
  memo[n] = fibMemo(n - 1) + fibMemo(n - 2);  // ← compute and cache
  return memo[n];
}
```

Now each value from 0 to n is computed exactly once. Total work: O(n).
</details>

<details>
<summary>Hint 4 — compare runtimes</summary>

Try this in your solution file:

```js
console.time('naive');
fibNaive(35);
console.timeEnd('naive');

console.time('memo');
fibMemo(35);
console.timeEnd('memo');
```

The memo version should be so fast it barely registers. The naive version will take a noticeable second or two. At n=45, the naive version may take minutes; the memo version is still instant.
</details>

## Write your solution
→ [`../solutions/06-fibonacci.js`](../solutions/06-fibonacci.js)

## Follow-ups
- Write an **iterative** bottom-up Fibonacci that uses only two variables (O(1) space). This is even better than the memoized version.
- What is the closed-form formula for Fibonacci (Binet's formula)? Why is it not used in code?
- **Q27** in this chapter is a dedicated memoization drill — it picks up exactly where this problem leaves off.
- In Chapter 26 (Dynamic Programming), Fibonacci is revisited as the archetype of DP problems.
