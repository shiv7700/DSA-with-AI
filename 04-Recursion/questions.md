# Recursion

> If you understand recursion, you understand half of DSA. The other half is knowing when *not* to use it.

## Concept Check

1. What are the two required parts of any recursion?
2. What is the call stack? What happens on a stack overflow?
3. Does JS support tail-call optimization? (Hint: spec yes, engines mostly no.)
4. Difference between direct, indirect, and mutual recursion.
5. Recursion vs Iteration — pros & cons of each.
6. What is memoization? Why does it transform exponential recursion into polynomial?

## Easy

1. Sum of first `n` natural numbers.
2. Factorial of `n`.
3. Print numbers from `n` to `1` and `1` to `n` (recursively).
4. Reverse a string recursively.
5. Power of a number — `pow(x, n)` in O(log n).
6. Fibonacci — naive O(2^n), then with memoization O(n).
7. Sum of digits of a number.
8. Count digits of a number.
9. Check if a string is a palindrome (recursively).
10. GCD using Euclid's algorithm.

## Medium

11. **Print all subsequences** of a string.
12. **Print all permutations** of a string.
13. **Generate all binary strings** of length `n`.
14. **Generate parentheses** — all valid combinations for `n` pairs.
15. **Subset sum** — does a subset add to `k`?
16. **Tower of Hanoi** — print moves and count them.
17. **Climb stairs** — count ways to climb `n` stairs (1 or 2 steps).
18. **Letter Combinations of a Phone Number**.
19. **Flatten a nested array** of arbitrary depth.
20. **Recursively traverse a nested object** and collect all leaf values.

## Hard

21. **N-Queens** — place N queens on an N×N board.
22. **Sudoku Solver** — backtracking.
23. **Word Break** — can `s` be segmented using dict words?
24. **Combination Sum** — all unique combinations that sum to target.
25. **Restore IP Addresses**.
26. **Regular Expression Matching** (recursive version).

## Memoization Drill

27. Add memoization to your Fibonacci. Compare runtime for `fib(35)` vs `fib(40)`.
28. Memoize a recursive grid-traversal "unique paths" problem.
29. When does memoization fail? (Hint: non-pure recursive functions.)
