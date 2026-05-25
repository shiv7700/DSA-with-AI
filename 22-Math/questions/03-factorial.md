# Q3 — Factorial

**Difficulty:** Easy
**Pattern:** Iteration / recursion; BigInt for large values
**Expected:** O(n) time · O(1) space (iterative)

## Problem

Given a non-negative integer `n`, return `n!` (n factorial).

```
n! = n × (n-1) × (n-2) × … × 2 × 1
0! = 1   (by definition)
```

Implement **both** the iterative and recursive versions. For the iterative version, use `BigInt` so the result is exact for any n.

## Examples

### Example 1
```
Input:  n = 0
Output: 1
```

### Example 2
```
Input:  n = 5
Output: 120
```
Because 5 × 4 × 3 × 2 × 1 = 120.

### Example 3
```
Input:  n = 10
Output: 3628800
```

### Example 4 (large — needs BigInt)
```
Input:  n = 20
Output: 2432902008176640000
```

## Constraints
- `0 <= n <= 50`
- Return a `BigInt` (the result will exceed `Number.MAX_SAFE_INTEGER` for n > 18).

## Hints

<details>
<summary>Hint 1 — iterative structure</summary>

Start with `result = 1n` (BigInt literal). Loop from `i = 2` to `n`, multiplying `result` by `BigInt(i)` each time.
</details>

<details>
<summary>Hint 2 — recursive structure</summary>

Base case: `factorial(0) = 1` and `factorial(1) = 1`.
Recursive step: `factorial(n) = n * factorial(n - 1)`.

This works, but be careful — it makes n nested calls. For large n (like 10,000), you'd hit a stack overflow. Iterative is safer.
</details>

<details>
<summary>Hint 3 — BigInt syntax reminder</summary>

```js
let result = 1n;              // BigInt literal
for (let i = 2n; i <= BigInt(n); i++) {
  result *= i;
}
```
You can't mix `BigInt` and `Number` — convert with `BigInt(someNumber)`.
</details>

## Write your solution
→ [`../solutions/03-factorial.js`](../solutions/03-factorial.js)

## Follow-ups
- Can you compute `n! mod (10^9 + 7)` using regular `Number`?
- What's the highest power of 2 that divides `10!`? (Hint: count trailing zeros... in binary.)
- How many trailing zeros does `n!` have in base 10? (Hint: count factors of 5.)
