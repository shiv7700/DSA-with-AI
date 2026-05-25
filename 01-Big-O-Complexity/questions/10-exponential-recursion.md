# Q10 — Identify the Complexity: Exponential Recursion

**Difficulty:** Medium
**Pattern:** Complexity analysis — recursive branching tree
**Expected:** State time complexity and space complexity with justification

## Problem

Analyze the following function and state its **time complexity** and **space complexity**. Justify each answer in a comment. This one is tricky — most beginners initially underestimate it.

```js
function mystery(n) {
  if (n <= 1) return 1;
  return mystery(n - 1) + mystery(n - 1);
}
```

## Input / Output

```
Input:  n (a non-negative integer)
Output: State O(?) time, O(?) space — and explain why
```

### Call tree for mystery(4)

```
mystery(4)
├── mystery(3)
│   ├── mystery(2)
│   │   ├── mystery(1) → 1
│   │   └── mystery(1) → 1
│   └── mystery(2)
│       ├── mystery(1) → 1
│       └── mystery(1) → 1
└── mystery(3)
    ├── mystery(2)
    │   ├── mystery(1) → 1
    │   └── mystery(1) → 1
    └── mystery(2)
        ├── mystery(1) → 1
        └── mystery(1) → 1
```

Count the total number of calls. Then ask: what happens when n increases by 1?

## Constraints
- `n` is a non-negative integer.
- Each recursive call makes exactly **two** recursive calls, not one.

## Hints

<details>
<summary>Hint 1 — count the calls level by level</summary>

At each level of the recursion tree:
- Level 0 (n=4): 1 call
- Level 1 (n=3): 2 calls
- Level 2 (n=2): 4 calls
- Level 3 (n=1): 8 calls

Each level doubles the number of calls. With n levels, the total is 1 + 2 + 4 + ... + 2^(n-1) = 2ⁿ - 1 calls.

So the time complexity is O(2ⁿ).
</details>

<details>
<summary>Hint 2 — the key indicator: two recursive calls</summary>

Every time a recursive function calls itself **twice** (with the same n-decrement), the number of calls doubles each level. Two calls → 2ⁿ total work. Three calls would be 3ⁿ. One call → n total work (O(n)).

The branching factor of the recursion tree determines the base of the exponent.
</details>

<details>
<summary>Hint 3 — space is the depth of the call stack</summary>

Even though there are 2ⁿ total calls, they don't all exist simultaneously. The call stack at any given moment only holds one path from root to current leaf. The deepest that path goes is n levels (from mystery(n) down to mystery(1)).

So space complexity = call stack depth = O(n).

(This is a key insight: time can be O(2ⁿ) while space is O(n).)
</details>

## Write your answer
→ [`../solutions/10-exponential-recursion.js`](../solutions/10-exponential-recursion.js)

## Follow-ups
- Rewrite `mystery(n)` iteratively to achieve O(n) time. (Hint: it's equivalent to `return 2^(n-1)` for n ≥ 1.)
- The naive recursive Fibonacci `fib(n) = fib(n-1) + fib(n-2)` looks similar. Is it also O(2ⁿ)? What are the differences?
- How does memoization (caching results) change the time complexity of this function?
- At what value of n does `mystery(n)` become practically unusable (takes more than a second on a modern computer)?
