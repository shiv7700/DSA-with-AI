# Q1 — Sum of First N Natural Numbers

**Difficulty:** Easy
**Pattern:** Linear recursion (one call, reduces by 1)
**Expected:** O(n) time · O(n) space (call stack)

## Problem

Write a recursive function `sumN(n)` that returns the sum of the first `n` natural numbers.

In other words, return `1 + 2 + 3 + … + n`.

You must use recursion — no loops, and no arithmetic formula shortcuts like `n*(n+1)/2`.

> **Why this problem?** It's the simplest possible recursion: one base case, one recursive call, one combination step. If you can explain this one out loud, you understand the core shape of recursion.

## Examples

### Example 1
```
Input:  n = 5
Output: 15
```
Because `1 + 2 + 3 + 4 + 5 = 15`.

### Example 2
```
Input:  n = 1
Output: 1
```

### Example 3
```
Input:  n = 10
Output: 55
```

## Constraints
- `1 <= n <= 1000`
- Use recursion (no loops, no formula).

## Hints

<details>
<summary>Hint 1 — identify the base case</summary>

What is the sum of the first **1** natural number? It's just `1`. No recursion needed there — you can return it directly.

So your base case is: if `n === 1`, return `1`.
</details>

<details>
<summary>Hint 2 — identify the recursive case</summary>

Apply the leap of faith: assume `sumN(n-1)` correctly gives you `1 + 2 + … + (n-1)`.

How do you get `1 + 2 + … + n` from that? Just add `n` to it.

So the recursive case is: return `n + sumN(n - 1)`.
</details>

<details>
<summary>Hint 3 — trace it by hand for n = 4</summary>

```
sumN(4)
  = 4 + sumN(3)
  = 4 + (3 + sumN(2))
  = 4 + (3 + (2 + sumN(1)))
  = 4 + (3 + (2 + 1))      ← base case hit
  = 4 + (3 + 3)
  = 4 + 6
  = 10
```
</details>

## Write your solution
→ [`../solutions/01-sum-n.js`](../solutions/01-sum-n.js)

## Follow-ups
- What is the iterative version of this? (A simple `for` loop — compare them.)
- Can you write a version that uses the formula `n*(n+1)/2` — no recursion, no loop? Which has the best time complexity?
- What happens if `n = 0`? Should you add a base case for it?
