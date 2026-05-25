# Q8 — Square Root (Integer) via Binary Search

**Difficulty:** Easy
**Pattern:** Binary search on the answer space
**Expected:** O(log n) time · O(1) space

## Problem

Given a non-negative integer `n`, return the **integer square root** of `n` — that is, the largest integer `k` such that `k * k <= n`.

You may not use `Math.sqrt()` or any other built-in square root function.

> **Why binary search?** This is your first "binary search on the answer space" problem. You're not searching for a value in a sorted array — you're searching for the right *answer* in a range of possible answers. This pattern reappears in Koko Eating Bananas, Capacity to Ship, Aggressive Cows, and many more.

## Examples

### Example 1
```
Input:  n = 4
Output: 2    (because 2*2 = 4 ≤ 4, and 3*3 = 9 > 4)
```

### Example 2
```
Input:  n = 8
Output: 2    (because 2*2 = 4 ≤ 8, and 3*3 = 9 > 8)
```
(The true square root of 8 is ~2.83; the integer floor is 2.)

### Example 3
```
Input:  n = 0
Output: 0
```

### Example 4
```
Input:  n = 1
Output: 1
```

### Example 5
```
Input:  n = 100
Output: 10
```

## Constraints
- `0 <= n <= 2^31 - 1`
- Return only the integer part — do not round up.

## Hints

<details>
<summary>Hint 1 — the search space</summary>

The answer is somewhere between `0` and `n`. But you can tighten it: the square root of `n` is at most `n/2` for `n >= 4`, and at most `n` for `n < 4`. A simple bound: `left = 0`, `right = n` works fine.
</details>

<details>
<summary>Hint 2 — binary search on the answer</summary>

Think of it as: "find the largest `mid` such that `mid * mid <= n`."

For each candidate `mid`:
- If `mid * mid <= n`: `mid` is a valid candidate. But there might be a larger one. Record `mid` as `result`, and try the right half.
- If `mid * mid > n`: `mid` is too big. Search the left half.

At the end, `result` holds the answer.
</details>

<details>
<summary>Hint 3 — overflow watch</summary>

`mid * mid` can overflow if `mid` is large and you're using 32-bit integers (in other languages). In JavaScript this isn't a problem because numbers are 64-bit floats, but get in the habit of using `BigInt` or `mid <= n / mid` as an overflow-safe check.
</details>

## Write your solution
→ [`../solutions/08-sqrt-binary-search.js`](../solutions/08-sqrt-binary-search.js)

## Follow-ups
- Return the square root as a **float** accurate to `p` decimal places. (Binary search still applies — just widen the answer space to include decimals.)
- Extend to `nthRoot(n, k)` — the k-th root of n.
- How is this related to **Newton's method** for square roots? (A non-binary-search approach that converges faster in practice.)
