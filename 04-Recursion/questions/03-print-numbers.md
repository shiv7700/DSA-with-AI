# Q3 — Print Numbers Recursively (N→1 and 1→N)

**Difficulty:** Easy
**Pattern:** Linear recursion — order of operations before vs after the recursive call
**Expected:** O(n) time · O(n) space (call stack)

## Problem

Write two recursive functions:

1. `printDesc(n)` — prints `n, n-1, n-2, …, 2, 1` (descending, one per line)
2. `printAsc(n)` — prints `1, 2, 3, …, n-1, n` (ascending, one per line)

**Twist:** Both functions must look nearly identical — the only difference is where the `console.log` goes relative to the recursive call.

> **Why this problem?** It builds the crucial intuition that **before** the recursive call is "going down" and **after** the recursive call is "coming back up". Once you see this, you understand how to control output order in any recursive function — and it's the first step toward understanding tree traversals.

## Examples

### Example 1 — printDesc(5)
```
Output:
5
4
3
2
1
```

### Example 2 — printAsc(5)
```
Output:
1
2
3
4
5
```

### Example 3 — edge case
```
printDesc(1) → prints just: 1
printAsc(1)  → prints just: 1
```

## Constraints
- `1 <= n <= 100`
- No loops — only recursion.
- Each number on its own line (`console.log(n)`).

## Hints

<details>
<summary>Hint 1 — descending: print BEFORE you recurse</summary>

For descending order (`n` first, then smaller numbers):

Think about what should happen at each level. When you're at `n`, you want to print `n` first, then let the rest handle the smaller numbers.

```
printDesc(n):
  print n
  call printDesc(n-1)    ← smaller numbers handled after
```

The base case: when `n < 1`, just stop (return).
</details>

<details>
<summary>Hint 2 — ascending: print AFTER you recurse</summary>

For ascending order (`1` first, then bigger numbers):

You want the smallest number printed first. So let the recursion go all the way down to 1 before printing anything.

```
printAsc(n):
  call printAsc(n-1)    ← go down to the smallest first
  print n               ← print on the way BACK UP
```

Same base case: when `n < 1`, return.
</details>

<details>
<summary>Hint 3 — trace printAsc(3) by hand</summary>

```
printAsc(3) — waits, first calls printAsc(2)
  printAsc(2) — waits, first calls printAsc(1)
    printAsc(1) — waits, first calls printAsc(0)
      printAsc(0) → base case, returns immediately
    printAsc(1) resumes: prints 1
  printAsc(2) resumes: prints 2
printAsc(3) resumes: prints 3
```

Output: 1, 2, 3. Ascending! Even though we called from `n = 3` downward, the printing happened on the way back up.
</details>

## Write your solution
→ [`../solutions/03-print-numbers.js`](../solutions/03-print-numbers.js)

## Follow-ups
- What happens if you put `console.log(n)` both before AND after the recursive call? What does it print for `printBoth(3)`?
- This "print before vs after" pattern is directly related to **pre-order** vs **post-order** tree traversal. Keep it in mind when you hit Chapter 11 (Trees).
- Can you print the numbers in descending order without doing any recursion — just using a loop? How many lines is that vs recursion?
