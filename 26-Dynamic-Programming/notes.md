# Dynamic Programming — Lessons from Zero

> 👋 Hey. This file is for someone who knows JavaScript but has never touched Dynamic Programming. DP has a reputation for being "the hard stuff." That reputation is half earned and half a lie. Once you see the core idea — which takes maybe fifteen minutes — the rest is just practice with patterns. Let's go slow and build that foundation brick by brick.
>
> Reading time at a relaxed pace: about 2–3 hours total, spread across a few days. **Read a few lessons, then try a question. Don't try to read the whole file before coding.**

---

## Table of Lessons

1. [What problem are we even solving?](#lesson-1)
2. [Recursion — the foundation you need first](#lesson-2)
3. [The "repeated work" problem](#lesson-3)
4. [Memoization — write it down the first time](#lesson-4)
5. [How to spot an overlapping-subproblems problem](#lesson-5)
6. [Optimal substructure — the second ingredient](#lesson-6)
7. [Tabulation — filling a table bottom-up](#lesson-7)
8. [Memoization vs Tabulation — which to use?](#lesson-8)
9. [Designing your DP state (the hardest part)](#lesson-9)
10. [Classic 1D DP — Fibonacci done three ways](#lesson-10)
11. [Classic 1D DP — Climbing Stairs](#lesson-11)
12. [Classic 1D DP — House Robber](#lesson-12)
13. [Stock problems — DP with state](#lesson-13)
14. [Coin Change — unbounded choices](#lesson-14)
15. [Longest Increasing Subsequence](#lesson-15)
16. [2D Grid DP — Unique Paths](#lesson-16)
17. [2D Grid DP — Minimum Path Sum](#lesson-17)
18. [Subsequence DP — LCS and Edit Distance](#lesson-18)
19. [Knapsack DP — 0/1 and Unbounded](#lesson-19)
20. [Palindrome DP — patterns on strings](#lesson-20)
21. [Space optimization — when you can throw rows away](#lesson-21)
22. [Common pitfalls (and how to recover)](#lesson-22)
23. [How to approach any DP problem in an interview](#lesson-23)
24. [Quick reference cheatsheet](#lesson-24)
25. [You did it — what to do next](#lesson-25)

---

<a id="lesson-1"></a>
## Lesson 1 — What problem are we even solving?

Imagine you're counting every possible route from your house to a coffee shop. You can go left or right at each intersection, and many routes share the same streets in the middle. You find yourself walking the same stretch of road again and again, counting the same sub-routes from scratch each time.

That's wasteful. The smart move: every time you figure out "there are 7 ways to get from Maple Ave to the shop", write that down. Next time you need that count, just look at your notes.

**Dynamic Programming is exactly that.** It's a technique where you:

1. Break a big problem into smaller subproblems.
2. Solve each subproblem exactly once.
3. Write the answer down (in an array or a map).
4. Look up the saved answer whenever you'd otherwise repeat the work.

That's it. Everything else — memoization, tabulation, recurrences, state design — is just different ways of doing those four steps cleanly.

> 🎯 **Key takeaway**
> DP = "solve each subproblem once, remember the answer." The saving is what gives you speed.

---

<a id="lesson-2"></a>
## Lesson 2 — Recursion — the foundation you need first

Before DP makes sense, you need a solid feel for recursion. If recursion is already comfortable for you, skim this lesson. If it's still a bit fuzzy, read it properly — DP is built on top of it.

### The phone-tree analogy

Imagine your boss wants to know how many employees the company has. She asks her five direct reports. Each of them asks their direct reports. This keeps going until someone at the bottom says "just me, count 1." Everyone passes the number back up. The boss adds them all up.

That's recursion: a function that calls smaller copies of itself, trusting they'll return the right answer, until it hits a case small enough to answer directly (the "base case").

```js
function countDown(n) {
  if (n <= 0) return;        // base case — stop here
  console.log(n);
  countDown(n - 1);          // recursive call: a smaller version of the same problem
}

countDown(3);
// 3
// 2
// 1
```

### The two rules of recursion

1. **You must have a base case** — a version of the problem small enough to answer without recursing. Without it, you get infinite recursion and a stack overflow.
2. **Every recursive call must move toward the base case** — if you're counting down, you pass `n - 1`, not `n + 1`.

### A tiny worked example

How many ways can you choose 1 item from a list of 5? Trivially, 5. But can you express this recursively?

```js
function factorial(n) {
  if (n <= 1) return 1;         // base case
  return n * factorial(n - 1);  // recursive step
}

factorial(5);   // 5 * 4 * 3 * 2 * 1 = 120
```

Picture the call stack like a stack of sticky notes:

```
factorial(5)
  factorial(4)
    factorial(3)
      factorial(2)
        factorial(1)  → returns 1
      returns 2 * 1 = 2
    returns 3 * 2 = 6
  returns 4 * 6 = 24
returns 5 * 24 = 120
```

Each call waits for the one below it. When the bottom returns, values flow back up.

> ✋ **Pause and try**
> Write a recursive `sum(n)` that returns `1 + 2 + 3 + ... + n`.
>
> <details>
> <summary>Show answer</summary>
>
> ```js
> function sum(n) {
>   if (n <= 0) return 0;
>   return n + sum(n - 1);
> }
> ```
> </details>

> 🎯 **Key takeaway**
> Recursion = base case + recursive step that moves toward it. Every DP solution starts as a recursive formula.

---

<a id="lesson-3"></a>
## Lesson 3 — The "repeated work" problem

Here's the core insight that motivates DP. Let's compute the 6th Fibonacci number recursively.

The Fibonacci sequence: **1, 1, 2, 3, 5, 8, 13, 21...**  
Each number is the sum of the two before it.

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

This works. But look at what actually happens when we call `fib(6)`:

```
                         fib(6)
                       /        \
                  fib(5)        fib(4)
                /      \        /    \
           fib(4)    fib(3)  fib(3) fib(2)
           /    \
        fib(3) fib(2)
        ...
```

See how `fib(4)` is computed **twice**? `fib(3)` is computed **three times**? `fib(2)` is computed **five times**?

For `fib(6)` this is mild. But by `fib(50)`, the tree has over a trillion nodes. Even a fast computer takes too long.

This is called **exponential time complexity** — O(2^n) in the naive recursive version.

> ⚠️ **The problem in plain English**
> We're solving the same subproblem over and over, throwing away our answers, then solving it again. It's like recalculating your shopping cart total from scratch every time you add an item, instead of just adding to a running total.

> 🎯 **Key takeaway**
> Naive recursion can hide enormous redundant computation. When subproblems repeat, you need DP.

---

<a id="lesson-4"></a>
## Lesson 4 — Memoization — write it down the first time

The fix is almost embarrassingly simple: **cache the result the first time, and return the cached value every time after.**

```js
const memo = new Map();

function fib(n) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);   // already solved? return instantly

  const result = fib(n - 1) + fib(n - 2);
  memo.set(n, result);                   // write it down
  return result;
}
```

Now `fib(4)` is computed exactly once. When the right side of the tree asks for `fib(4)` again, it finds the answer in `memo` and returns immediately.

The call tree becomes a **straight chain** instead of an exponential explosion:

```
fib(6) → fib(5) → fib(4) → fib(3) → fib(2) → fib(1) → 1
                                              → fib(0) → 0
         then: fib(3) → already in memo ✅
         then: fib(4) → already in memo ✅
               ...
```

**This is memoization.** It's also called "top-down DP" because you start at the top (the question you actually need) and work downward, caching as you go.

### Complexity

- **Time:** O(n) — each subproblem is solved exactly once.
- **Space:** O(n) — the memo table stores n results, plus the call stack.

That's the difference between a program that runs in microseconds versus one that runs until the heat death of the universe for n=100.

> 💡 **Tip — the memoization pattern**
> ```js
> const memo = {};
> function solve(state) {
>   if (isBaseCase(state)) return baseValue;
>   if (state in memo) return memo[state];
>   memo[state] = /* ... compute using recursive calls ... */;
>   return memo[state];
> }
> ```
> Learn this shape by heart. It's the skeleton of every top-down DP solution.

> ✋ **Pause and check**
> After calling `fib(6)` with the memoized version, if you then call `fib(4)`, does it do any computation?
>
> <details>
> <summary>Show answer</summary>
>
> No! `memo` still has `fib(4) = 3` from the first call. It returns 3 instantly.
> </details>

> 🎯 **Key takeaway**
> Memoization = store the answer the first time you compute it, look it up every other time. This is "top-down DP."

---

<a id="lesson-5"></a>
## Lesson 5 — How to spot an overlapping-subproblems problem

Memoization helps when subproblems **overlap** — when solving `f(6)` requires `f(4)`, and solving `f(5)` also requires `f(4)`. If subproblems never repeat, memoization doesn't help.

### Signs a problem has overlapping subproblems

1. **You find yourself writing the same recursive call in two branches of your logic.** If you're calling `solve(i-1)` in multiple places, those branches will share work.

2. **The "draw the recursion tree" trick.** Sketch a few levels of the tree. Do any branches converge to the same node? If yes, those are overlapping subproblems.

3. **The problem asks for a count, max, min, or yes/no over all possibilities.** This is a hint, not a rule — but counting problems almost always have overlapping subproblems.

### Counterexample: merge sort

In merge sort, you split the array in half, sort the left half, sort the right half. The left half and right half never share elements. Those two subproblems are *independent*, not overlapping. Memoization wouldn't help here.

### Concrete example: coin change

"How many ways can you make change for $11 using coins of denominations $1, $5, $10?"

One approach: "try all combinations." But notice — `ways(6)` (ways to make change for $6) will appear in multiple branches: when you pick a $5 coin from $11, you need `ways(6)`. When you've already picked a $1 coin and a $5 coin, you're again computing `ways(5)`. These repeat constantly.

Overlapping. DP applies.

> 🎯 **Key takeaway**
> If you sketch the recursion and see the same subproblem on multiple branches, that's overlapping subproblems. DP will help. If subproblems are always independent, you just need plain recursion (or divide-and-conquer).

---

<a id="lesson-6"></a>
## Lesson 6 — Optimal substructure — the second ingredient

Overlapping subproblems alone isn't enough. DP also requires **optimal substructure**: the optimal answer to the whole problem can be built from the optimal answers to its subproblems.

### An everyday analogy

You're driving from city A to city C via city B. The shortest path from A to C through B is:

```
shortest(A → C) = shortest(A → B) + shortest(B → C)
```

If you're using the globally shortest route, then the A→B portion is also the shortest way to get from A to B. If there were some "detour" in A→B that made the overall trip shorter, then that detour would also have to be in the shortest A→B path — otherwise you could swap it in and make A→B shorter, which contradicts calling it optimal.

This is optimal substructure: the globally optimal solution is composed of locally optimal sub-solutions.

### A counterexample: "most scenic path"

Now suppose you want the path that takes photos at the most scenic spots. But the most scenic A→B path might share a road with the most scenic B→C path, creating a loop. The combination of "optimal" sub-paths might not give the "optimal" combined path. This problem does **not** have optimal substructure in the simple sense.

### Why this matters for DP

When a problem has optimal substructure, you can write a **recurrence relation** like:

```
dp[n] = dp[n - 1] + dp[n - 2]
```

This says: "the answer for n is built directly from the answers for n-1 and n-2." The smaller answers feed the larger one.

> 🎯 **Key takeaway**
> DP needs two things: overlapping subproblems (to make caching worth it) + optimal substructure (to make the subproblem answers composable). Most "count all ways" or "find min/max" problems on sequences or grids have both.

---

<a id="lesson-7"></a>
## Lesson 7 — Tabulation — filling a table bottom-up

Memoization is recursive — you start at the answer you want and recurse downward. There's another approach: **start from the smallest subproblems and build upward, filling in a table.**

This is called **tabulation**, or "bottom-up DP."

### The same Fibonacci, bottom-up

Instead of `fib(6)` calling `fib(5)` calling `fib(4)` ..., we fill a table starting at the beginning:

```js
function fib(n) {
  if (n <= 1) return n;

  const dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

Trace through for n = 6:

```
i:    0  1  2  3  4  5  6
dp:   0  1  1  2  3  5  8
```

Each cell is filled exactly once, using the two cells to its left. No recursion. No call stack.

### What "tabulation" means

You fill a table (an array or 2D array) in a specific order, so that by the time you need `dp[i]`, all the cells it depends on are already filled.

```
dp[i] depends on dp[i-1] and dp[i-2]

Before filling dp[i]:   dp[0..i-1] are already done ✅
```

> 💡 **Tip — the tabulation skeleton**
> ```js
> const dp = new Array(n + 1).fill(initial);
> // set base cases
> dp[0] = base0;
> dp[1] = base1;
>
> for (let i = 2; i <= n; i++) {
>   dp[i] = /* combination of earlier dp values */;
> }
>
> return dp[n];
> ```

> 🎯 **Key takeaway**
> Tabulation fills a table from smallest to largest. No call stack, no recursion. Start from the base cases and build up to the answer. This is "bottom-up DP."

---

<a id="lesson-8"></a>
## Lesson 8 — Memoization vs Tabulation — which to use?

You now know two DP approaches. Here's how to choose.

| | Memoization (Top-down) | Tabulation (Bottom-up) |
|---|---|---|
| **Starting point** | The big problem, recurse down | The base cases, build up |
| **Code structure** | Recursive function + cache | Iterative loops + array |
| **Ease of writing** | Often easier to write first | Sometimes requires more thought about order |
| **Call stack risk** | Yes (stack overflow for very large n) | No call stack used |
| **Only solves needed cells?** | Yes — only visits reachable subproblems | No — fills the whole table, even unused cells |
| **Space optimization** | Harder | Easier (you can discard old rows) |

### Which one should you use?

**In interviews:** Start with memoization. It's easier to translate directly from "think recursively, add a cache." Once it works, you can convert to tabulation if needed.

**For space optimization:** Tabulation makes it easy to realize "I only ever look back 2 rows, so I can throw away the rest." Memoization makes this much harder.

**For very deep recursion:** Tabulation avoids call stack limits. `fib(100000)` would overflow the call stack recursively but works fine iteratively.

> 💡 **Tip**
> A good DP workflow: (1) write the plain recursive solution, (2) add memoization, (3) if needed, convert to tabulation. Three steps. Don't skip to step 3 directly — starting from scratch with a table before you have the recurrence right is how you get stuck.

> 🎯 **Key takeaway**
> Both work. Memoization is usually easier to write first. Tabulation is usually easier to optimize for space. Learn both.

---

<a id="lesson-9"></a>
## Lesson 9 — Designing your DP state (the hardest part)

Here's something nobody tells beginners: writing the DP code is often the easy part. **The hard part is figuring out what your "state" represents.**

### What's a state?

A state is the information you need to uniquely describe "where you are" in the problem at any given moment. Two moments are the same state if and only if everything about the future is identical from both of them.

Think of a video game save point. The save file needs to record everything that affects what happens next: your position, health, items, level. Anything that doesn't affect what happens next doesn't need to be saved.

In DP, the state becomes the arguments to your recursive function (or the indexes into your dp table).

### Example 1: Climbing stairs

"How many ways to reach stair n if you can take 1 or 2 steps at a time?"

State: **the stair number you're currently on**.

- `dp[i]` = the number of ways to reach stair `i`.
- You can reach stair `i` from stair `i-1` (1 step) or stair `i-2` (2 steps).
- Recurrence: `dp[i] = dp[i-1] + dp[i-2]`

The state is just one number: the stair index.

### Example 2: Coin change

"What's the fewest coins needed to make amount `n`?"

State: **the remaining amount to make**.

- `dp[amount]` = min coins needed to make `amount`.
- For each coin value `c`, you could use one coin and need `dp[amount - c]` more.
- Recurrence: `dp[amount] = 1 + min over all coins c of dp[amount - c]`

Again, one number as the state.

### Example 3: 0/1 Knapsack (two-dimensional state)

"Maximize value, given a weight limit, where each item can be used once."

State: **current item index** + **remaining weight capacity**.

- `dp[i][w]` = max value using items `0..i` with weight limit `w`.
- You either include item `i` or you skip it.
- Recurrence:
  ```
  dp[i][w] = max(
    dp[i-1][w],                             // skip item i
    dp[i-1][w - weight[i]] + value[i]       // take item i
  )
  ```

The state needs two numbers because both the item index and the remaining weight affect the future choices.

### How to find the state

Ask yourself: "What information, if I knew it, would let me solve the rest of the problem optimally, without knowing anything about the past?"

In the knapsack: knowing (item index, remaining weight) is enough. You don't need to know *which* items you chose to get here — only the remaining capacity matters.

> ⚠️ **The most common mistake**
> Including too much in the state (making your dp array too large) or too little (so the answers for two different situations get mixed together). Start by thinking about what affects future decisions.

> 🎯 **Key takeaway**
> The state is everything that matters for future decisions. Find the minimum set of variables to describe "where you are." Those become the dimensions of your dp array.

---

<a id="lesson-10"></a>
## Lesson 10 — Classic 1D DP — Fibonacci done three ways

Let's be concrete and see all three versions side by side: pure recursion (broken), memoized, and tabulated.

### Version 1: naive recursion (exponential, don't use)

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
// fib(50) will hang your browser
```

### Version 2: memoization (top-down DP)

```js
function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (n in memo) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
// O(n) time, O(n) space
```

Note the nice pattern: pass `memo` as an argument so the cache persists across all recursive calls from the same top-level call.

### Version 3: tabulation (bottom-up DP)

```js
function fib(n) {
  if (n <= 1) return n;
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
// O(n) time, O(n) space
```

### Version 4: space-optimized tabulation

Notice that `dp[i]` only ever looks at `dp[i-1]` and `dp[i-2]`. You don't need the full array — just the last two values.

```js
function fib(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
// O(n) time, O(1) space
```

This is the same idea you'll apply to almost every 1D DP problem: once you have the table version, look at which previous cells you need. If it's a constant number (like 2), you can use variables instead.

> 🎯 **Key takeaway**
> Four versions of Fibonacci: broken → memoized → tabulated → space-optimized. Master this progression — it applies to every 1D DP problem.

---

<a id="lesson-11"></a>
## Lesson 11 — Classic 1D DP — Climbing Stairs

This is often the first "real" DP problem people solve. The observation that makes it click:

**If you can take 1 or 2 steps, the number of ways to reach stair `n` equals the number of ways to reach stair `n-1` plus the number of ways to reach stair `n-2`.**

Why? Because you must arrive at stair `n` from either `n-1` (one step) or `n-2` (two steps). Every arrangement that reaches `n-1` gives you one arrangement to `n`, and same for `n-2`.

```
ways(n) = ways(n-1) + ways(n-2)

Base cases:
  ways(0) = 1   (one way to be at the bottom: do nothing)
  ways(1) = 1   (only one way: one step)

n:     0  1  2  3  4  5
ways:  1  1  2  3  5  8
```

Wait — that's the Fibonacci sequence! Once you see this, the code is trivial:

```js
function climbStairs(n) {
  if (n <= 1) return 1;
  let prev2 = 1, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    [prev2, prev1] = [prev1, prev1 + prev2];
  }
  return prev1;
}
// O(n) time, O(1) space
```

The key insight is naming `ways(n)` = "how many ways," then figuring out what choices lead to state `n` (coming from `n-1` or `n-2`), then adding them.

> ✋ **Pause and extend**
> What if you could take 1, 2, or 3 steps? How would the recurrence change?
>
> <details>
> <summary>Show answer</summary>
>
> `ways(n) = ways(n-1) + ways(n-2) + ways(n-3)`
>
> Base cases: `ways(0) = 1`, `ways(1) = 1`, `ways(2) = 2`.
> </details>

---

<a id="lesson-12"></a>
## Lesson 12 — Classic 1D DP — House Robber

This problem has a decision element that makes it richer than Fibonacci.

**Problem (informal):** You're robbing houses on a street. Each house has some cash. You cannot rob two houses in a row (the alarm connects them). What's the maximum you can steal?

At each house `i`, you make a choice:
- **Rob it:** take `nums[i]`, but you skipped house `i-1`, so your total is `nums[i] + best(i-2)`.
- **Skip it:** your total is `best(i-1)`.

```
dp[i] = max(
  nums[i] + dp[i-2],    // rob house i
  dp[i-1]               // skip house i
)
```

Base cases:
- `dp[0] = nums[0]` — only one house, take it.
- `dp[1] = max(nums[0], nums[1])` — take whichever of the first two is bigger.

```
nums:  [2, 7, 9, 3, 1]

dp[0] = 2
dp[1] = max(2, 7) = 7
dp[2] = max(9 + 2, 7) = 11
dp[3] = max(3 + 7, 11) = 11
dp[4] = max(1 + 11, 11) = 12

Answer: 12  (rob houses 0, 2, and 4: 2 + 9 + 1)
```

```js
function rob(nums) {
  if (nums.length === 1) return nums[0];
  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    const curr = Math.max(nums[i] + prev2, prev1);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
// O(n) time, O(1) space
```

> 💡 **The "rob or skip" pattern**
> Many DP problems have this shape: at each position, you decide to "take" or "skip," and your choice blocks off the immediately adjacent option. Any time you see "can't use adjacent elements," think House Robber.

---

<a id="lesson-13"></a>
## Lesson 13 — Stock problems — DP with state

The "Buy and Sell Stock" problems introduce the idea of **DP with a finite state machine** — meaning your "state" includes something like "am I currently holding a stock or not?"

### The simplest version (one transaction)

You can buy once and sell once. Find the max profit.

This one doesn't even need DP — just track the minimum price seen so far:

```js
function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}
```

### Adding "hold / not hold" state

For multiple transactions (Stock II — unlimited buys and sells), the state at each day is: do you **hold** a stock or **not hold** one?

```
hold[i]    = max cash if you hold a stock after day i
notHold[i] = max cash if you don't hold a stock after day i

Transitions:
  hold[i]    = max(hold[i-1], notHold[i-1] - prices[i])
              // keep holding          // buy today
  notHold[i] = max(notHold[i-1], hold[i-1] + prices[i])
              // do nothing             // sell today
```

Space-optimized (only keep the last day):

```js
function maxProfit(prices) {
  let hold = -prices[0], notHold = 0;
  for (let i = 1; i < prices.length; i++) {
    hold    = Math.max(hold, notHold - prices[i]);
    notHold = Math.max(notHold, hold + prices[i]);
  }
  return notHold;
}
```

> 💡 **The state machine insight**
> When the problem has "modes" you can be in (holding/not holding, charging/not charging, etc.), each mode becomes a separate DP variable. You track all modes in parallel and transition between them.

> 🎯 **Key takeaway**
> Stock problems teach you to put "current mode" into your DP state. The number of states stays small (usually 2–4), making the approach practical.

---

<a id="lesson-14"></a>
## Lesson 14 — Coin Change — unbounded choices

Coin Change introduces a new pattern: at each step, you make a choice from a **list of options**, and you can reuse options.

**Problem:** Given coin denominations `[1, 5, 10, 25]` and a target amount `n`, what's the minimum number of coins to make exactly `n`?

The recurrence:

```
dp[amount] = min over all coin c where c <= amount of:
               dp[amount - c] + 1

Base case: dp[0] = 0   (need 0 coins to make 0)
```

Think of it this way: to make change for $11, you could:
- Use a $10 coin → need change for $1 → `dp[1] + 1`
- Use a $5 coin → need change for $6 → `dp[6] + 1`
- Use a $1 coin → need change for $10 → `dp[10] + 1`

Take the minimum.

```js
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) {
        dp[a] = Math.min(dp[a], dp[a - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

The table for `coins = [1, 5, 10]` and `amount = 12`:

```
amount:  0  1  2  3  4  5  6  7  8  9 10 11 12
dp:      0  1  2  3  4  1  2  3  4  5  1  2  2
```

`dp[12] = 2`: one $10 + one $1 (wait, that's 2; but also $5 + $5 + ... no, $10 + $1 = 11 not 12. $5+$5+$1+$1 = 4. Hmm, actually $10 + $1 + $1 = 3, but $5+$5+$1+$1 = 4... answer should be 3). The point is, the table fills correctly.

> 💡 **Unbounded knapsack pattern**
> When you can reuse items (coins here), you loop over all items for each target value, and the "same item used multiple times" case is automatically handled because `dp[a - coin]` was already built using that coin again.

---

<a id="lesson-15"></a>
## Lesson 15 — Longest Increasing Subsequence

LIS introduces **DP on subsequences** — where your "choices" at each position are which earlier element to extend from.

**Problem:** Given `[10, 9, 2, 5, 3, 7, 101, 18]`, find the length of the longest subsequence that is strictly increasing.

(A subsequence doesn't have to be contiguous — you can skip elements. `[2, 5, 7, 101]` is valid; `[2, 5, 3]` is not because 3 < 5.)

### The O(n²) DP approach

```
dp[i] = length of the longest increasing subsequence ending at index i

For each i, look at all j < i where nums[j] < nums[i]:
  dp[i] = max(dp[j] + 1) over all valid j
```

```
nums:   10  9  2  5  3  7  101  18
index:   0  1  2  3  4  5   6   7
dp:      1  1  1  2  2  3   4   4
```

For index 5 (`nums[5] = 7`):
- `nums[2] = 2 < 7` → `dp[2] + 1 = 2`
- `nums[3] = 5 < 7` → `dp[3] + 1 = 3`
- `nums[4] = 3 < 7` → `dp[4] + 1 = 3`
Best: `dp[5] = 3`.

Answer: `max(dp) = 4`.

```js
function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1);
  let best = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    best = Math.max(best, dp[i]);
  }
  return best;
}
// O(n²) time, O(n) space
```

> 🔬 **Going deeper (optional)**
> There's an O(n log n) solution using patience sorting. It maintains a "tails" array where `tails[k]` is the smallest tail element of any increasing subsequence of length `k+1`. You binary search into this array. It's elegant but harder to understand — come back to it after the O(n²) version is clear.

> 🎯 **Key takeaway**
> Subsequence DP: `dp[i]` is often "best answer for subsequences ending at index i." Then `dp[i]` builds on all previous `dp[j]` where the constraint is satisfied.

---

<a id="lesson-16"></a>
## Lesson 16 — 2D Grid DP — Unique Paths

Now we move into **2D DP**, where your state is a position on a grid. The intuition is very visual.

**Problem:** A robot starts at the top-left corner of an `m × n` grid. It can only move **right** or **down**. How many distinct paths reach the bottom-right corner?

The key insight: to reach any cell `(r, c)`, the robot must have come from `(r-1, c)` (above) or `(r, c-1)` (left). So:

```
dp[r][c] = dp[r-1][c] + dp[r][c-1]

Base cases:
  First row (r=0): only one way — all rights → dp[0][c] = 1
  First column (c=0): only one way — all downs → dp[r][0] = 1
```

Filling the table for a 3×3 grid:

```
     c=0  c=1  c=2
r=0:  1    1    1
r=1:  1    2    3
r=2:  1    3    6
```

```
dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2
dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3
dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3
dp[2][2] = dp[1][2] + dp[2][1] = 3 + 3 = 6
```

Answer for 3×3: 6 paths.

```js
function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => new Array(n).fill(1));
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = dp[r-1][c] + dp[r][c-1];
    }
  }
  return dp[m-1][n-1];
}
// O(m*n) time, O(m*n) space
```

> 💡 **Reading order matters in 2D DP**
> Fill the grid in an order where each cell's dependencies are already filled. Here: row by row, left to right. `dp[r][c]` only depends on cells above and to the left.

---

<a id="lesson-17"></a>
## Lesson 17 — 2D Grid DP — Minimum Path Sum

The grid path family gets richer when you add costs.

**Problem:** Given a grid of non-negative integers, find a path from the top-left to the bottom-right (moving only right or down) that minimizes the sum of all numbers along the path.

Recurrence:

```
dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1])

Base cases:
  dp[0][0] = grid[0][0]
  First row: dp[0][c] = dp[0][c-1] + grid[0][c]   (only way: go right)
  First col: dp[r][0] = dp[r-1][0] + grid[r][0]   (only way: go down)
```

For grid:
```
1  3  1
1  5  1
4  2  1
```

dp table:
```
1   4   5
2   7   6
6   8   7
```

Min path sum = 7 (path: 1→3→1→1→1).

This generalizes naturally to "maximum path sum" (change `min` to `max`) and to grids with obstacles (forbidden cells get `Infinity`).

> ✋ **Pause and think**
> In the grid above, what path achieves the minimum sum of 7?
>
> <details>
> <summary>Show answer</summary>
>
> 1 → 3 → 1 → 1 → 1 (top row, then down the right column) = 7. Or: 1 → 1 → 5 → 1 → 1... no that's 9. The top path is: right, right, down, down = 1+3+1+1+1 = 7.
> </details>

---

<a id="lesson-18"></a>
## Lesson 18 — Subsequence DP — LCS and Edit Distance

These problems deal with two sequences at once. The state is now **a pair of indexes** (one per sequence), giving a 2D table.

### Longest Common Subsequence (LCS)

**Problem:** Given two strings `s1` and `s2`, find the length of their longest common subsequence (a subsequence that appears in both, in order, but not necessarily contiguous).

`s1 = "ABCBDAB"`, `s2 = "BDCAB"` → LCS is `"BCAB"` or `"BDAB"`, length 4.

State: `dp[i][j]` = length of LCS of `s1[0..i-1]` and `s2[0..j-1]`.

```
If s1[i-1] === s2[j-1]:   dp[i][j] = dp[i-1][j-1] + 1
Otherwise:                 dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```

The intuition: if the current characters match, extend the LCS by 1. If they don't match, take the best of "skip a character from s1" or "skip a character from s2."

```
      ""  B  D  C  A  B
  ""   0  0  0  0  0  0
  A    0  0  0  0  1  1
  B    0  1  1  1  1  2
  C    0  1  1  2  2  2
  B    0  1  1  2  2  3
  D    0  1  2  2  2  3
  A    0  1  2  2  3  3
  B    0  1  2  2  3  4
```

Answer: `dp[7][5] = 4`.

### Edit Distance (Levenshtein Distance)

**Problem:** Given two strings, find the minimum number of operations (insert, delete, replace) to transform one into the other.

State: `dp[i][j]` = min operations to transform `s1[0..i-1]` into `s2[0..j-1]`.

```
If s1[i-1] === s2[j-1]:   dp[i][j] = dp[i-1][j-1]          (no operation needed)
Otherwise:
  dp[i][j] = 1 + min(
    dp[i-1][j],    // delete from s1
    dp[i][j-1],    // insert into s1
    dp[i-1][j-1]   // replace
  )

Base cases:
  dp[i][0] = i   (delete i characters to get empty string)
  dp[0][j] = j   (insert j characters to get s2[0..j-1])
```

> 🎯 **Key takeaway**
> Two-sequence DP uses a 2D table indexed by position in each sequence. The table rows correspond to "prefixes of s1" and columns to "prefixes of s2." The answer is in the last cell.

---

<a id="lesson-19"></a>
## Lesson 19 — Knapsack DP — 0/1 and Unbounded

The knapsack family is one of the most important DP patterns. Once you internalize it, you'll recognize it hiding in dozens of other problems.

### 0/1 Knapsack

**Problem:** You have items, each with a weight and a value. Your bag has a weight limit `W`. Each item can be included at most once. Maximize total value.

State: `dp[i][w]` = max value using items `0..i-1` with weight limit `w`.

```
For each item i and each capacity w:
  if weights[i-1] > w:
    dp[i][w] = dp[i-1][w]              // can't fit — skip
  else:
    dp[i][w] = max(
      dp[i-1][w],                       // skip item i
      dp[i-1][w - weights[i-1]] + values[i-1]  // include item i
    )
```

The "0/1" in the name means each item is either included (1) or excluded (0) — no fractions, no reuse.

### Unbounded Knapsack

Same as 0/1, but each item can be used any number of times. The only change: when you include item `i`, you don't move to `i-1` — you stay at `i` (so you can use it again).

```
dp[w] = max over all items i where weights[i] <= w of:
          dp[w - weights[i]] + values[i]
```

(1D dp, reuse allowed — same as the Coin Change structure.)

### The knapsack family hidden in other problems

Many problems are knapsacks in disguise:
- **Subset sum:** Can we pick items summing exactly to `target`? (knapsack with value = 1, capacity = target)
- **Partition equal subset sum:** Can we split the array into two equal-sum halves? (subset sum with target = totalSum / 2)
- **Coin Change:** Min coins (unbounded knapsack with value = 1)
- **Coin Change II:** Count ways (unbounded, but count combinations not minimum)

> 💡 **The giveaway**
> If the problem says "pick some subset of items" with a capacity/limit constraint, it's almost certainly knapsack. The choice at each item is always "include it or skip it."

---

<a id="lesson-20"></a>
## Lesson 20 — Palindrome DP — patterns on strings

Palindrome problems show how DP can work "inward" — expanding from the center or contracting from the edges.

### Counting Palindromic Substrings

**Problem:** Count all substrings of `s` that are palindromes.

Approach: use **expand-around-center**. For each center position (each character, and each gap between characters), expand outward as long as the characters match.

```
For center at index i:
  expand("aba"):
    s[1] == s[1] ✓  ("a") count++
    s[0] == s[2] ✓  ("bab") count++
    s[-1]  out of bounds — stop
```

This is not classic DP (it's O(n²) expansion), but it builds the intuition.

### Longest Palindromic Subsequence

**Problem:** Find the longest subsequence of `s` that is a palindrome.

This is a subsequence problem, not a substring problem. The LCS trick works perfectly:

```
LPS(s) = LCS(s, reverse(s))
```

Because the longest common subsequence between a string and its reverse is exactly the longest palindromic subsequence.

Alternatively, pure DP:

```
dp[i][j] = length of longest palindromic subsequence of s[i..j]

If s[i] === s[j]:   dp[i][j] = dp[i+1][j-1] + 2
Else:               dp[i][j] = max(dp[i+1][j], dp[i][j-1])

Base cases:
  dp[i][i] = 1   (single character is a palindrome of length 1)
```

Note: this fills the table **diagonally** (by increasing substring length), not row by row.

> ⚠️ **Fill order matters**
> For interval DP like this, fill by **length of the interval** (from shortest to longest), not by row. Otherwise, `dp[i+1][j-1]` might not be filled when you need it.

---

<a id="lesson-21"></a>
## Lesson 21 — Space optimization — when you can throw rows away

Many 2D DP tables only look at the previous row (or the previous row and the current row). When that's true, you can use a 1D array instead of a 2D one.

### Example: Unique Paths from O(m*n) to O(n)

The original `dp[r][c] = dp[r-1][c] + dp[r][c-1]` means: to compute row `r`, you only need row `r-1` (plus the current row as it's being filled).

```js
function uniquePaths(m, n) {
  let row = new Array(n).fill(1);    // represents the current row (also init for row 0)

  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      row[c] = row[c] + row[c-1];
      //       ↑ this is dp[r-1][c]   ↑ this is dp[r][c-1]
      //       (the old value of row[c] before we overwrite it)
    }
  }

  return row[n - 1];
}
```

Think of `row[c]` as storing the "above" value before it's overwritten with the current cell's value.

### When can you optimize space?

- **1D DP that uses only the previous 1-2 values:** replace the array with variables (like Fibonacci).
- **2D DP that only uses the previous row:** replace the 2D array with a single 1D array.
- **2D DP that uses both the previous row and a cell to the left in the current row:** still works with 1D, but be careful about traversal order.

The knapsack 0/1 variant needs you to traverse the capacity dimension **backwards** when collapsing to 1D (to avoid using the same item twice). Unbounded knapsack traverses **forwards** (so you can reuse items).

> 🎯 **Key takeaway**
> Look at which cells `dp[i][j]` depends on. If it's only the previous row (or column), you can collapse the 2D table to 1D. This reduces space from O(m*n) to O(n) without changing time complexity.

---

<a id="lesson-22"></a>
## Lesson 22 — Common pitfalls (and how to recover)

Here are the mistakes beginners make in DP. Read them now so they click when you hit them.

### Pitfall 1: Wrong base cases

The most common bug. If your base cases are wrong, every cell built on them is wrong.

```js
// Wrong for Coin Change:
dp[0] = 1;    // ❌ There are 0 coins needed to make 0, not 1

// Right:
dp[0] = 0;    // ✅ 0 coins needed to make 0
```

**Fix:** Before writing the loop, work out your base cases by hand for tiny inputs. If `n = 0` means "empty input," what's the answer? If `n = 1`, what's the answer?

### Pitfall 2: Off-by-one errors in table size

```js
// You want dp[0..n] but you only allocate n slots:
const dp = new Array(n);      // ❌ indices 0..n-1
const dp = new Array(n + 1);  // ✅ indices 0..n
```

**Rule of thumb:** if your problem is about "amount" or "length" `n` and you have a base case at 0, make your array of size `n + 1`.

### Pitfall 3: Forgetting the "no solution" case

```js
// For Coin Change: if dp[amount] is still Infinity after the loop, there's no solution
return dp[amount] === Infinity ? -1 : dp[amount];
```

### Pitfall 4: Wrong fill order in 2D DP

For palindrome/interval DP, you fill by **interval length**, not by row. For grid DP, you fill row by row. Filling in the wrong order means you read uninitialized cells.

**Fix:** Before coding, draw the table and draw arrows showing which cells each cell depends on. Then fill in any order that respects those arrows.

### Pitfall 5: Mutating during the wrong pass (0/1 knapsack)

In 0/1 knapsack, collapsing to 1D requires traversing capacity from **high to low**:

```js
// ❌ Forwards allows using item multiple times (becomes unbounded knapsack)
for (let w = 0; w <= W; w++) { ... }

// ✅ Backwards ensures each item is used at most once
for (let w = W; w >= weights[i]; w--) { ... }
```

### Pitfall 6: Trying to optimize before it works

Don't jump to the O(1) space version before you have a working O(n) or O(n²) solution. Get it working first, then optimize.

> 🎯 **Key takeaway**
> Most DP bugs are: wrong base cases, wrong array size, wrong fill order, or wrong traversal direction. Solve these by working through tiny examples by hand before coding.

---

<a id="lesson-23"></a>
## Lesson 23 — How to approach any DP problem in an interview

You've now learned the concepts. Here's a repeatable process for new problems.

### Step 1: Recognize the DP hint

Ask: "does this ask for a count, maximum, minimum, or yes/no over all possibilities involving choices on a sequence/grid?" If yes, it's likely DP.

### Step 2: Define the state

Ask: "what information uniquely describes 'where I am' in the problem?"

Write it out literally: "`dp[i]` = the minimum cost to reach step `i`" or "`dp[i][j]` = the number of ways to fill cells up to `(i, j)`."

Don't write code yet. Just write the English description.

### Step 3: Write the recurrence

Ask: "what choices do I have at state `(i, j)`? What happens to the state with each choice?"

Write the recurrence in math or pseudocode:

```
dp[i] = max(dp[i-1] + nums[i], nums[i])    // Kadane's
```

### Step 4: Identify base cases

What's the smallest possible input? What's the answer then? Fill those in first.

### Step 5: Determine fill order

Which cells does `dp[i][j]` depend on? Make sure those are filled first.

### Step 6: Code it up (tabulation)

Now write the loop. Start with a clear 2D or 1D array, set base cases, then fill with the recurrence.

### Step 7: Test with a small example by hand

Pick input of size 3 or 4. Trace through your code on paper. Does the table fill correctly? Does the final answer match what you'd expect?

### Step 8: Optimize space if asked

Look at which cells you actually use. Collapse dimensions if possible.

> 💡 **Interview tip**
> If you're stuck, say: "I know this is DP. Let me define my state clearly." Then define `dp[i]` in words. Once the state is right, the recurrence often follows naturally. Interviewers love candidates who reason out loud through state design.

---

<a id="lesson-24"></a>
## Lesson 24 — Quick reference cheatsheet

Everything below you've already seen — this is just a lookup table.

### DP patterns at a glance

| Pattern | State shape | Classic problems |
|---|---|---|
| Linear 1D | `dp[i]` = best answer ending at or considering `i` | Fibonacci, Climbing Stairs, House Robber, LIS |
| Linear 1D with state | `dp[i][state]` where state is a mode | Stock problems (hold/not-hold), Cooldown |
| Unbounded choices | `dp[amount]` = best way to make `amount` | Coin Change, Word Break |
| Grid | `dp[r][c]` = best at cell (r, c) | Unique Paths, Min Path Sum, Maximal Square |
| Two-sequence | `dp[i][j]` = best for prefixes of length i, j | LCS, Edit Distance, Interleaving String |
| Knapsack 0/1 | `dp[i][w]` = best using items 0..i with capacity w | 0/1 Knapsack, Partition Equal Subset Sum |
| Interval | `dp[i][j]` = best for the interval s[i..j] | Burst Balloons, Longest Palindromic Subseq |
| Tree | postorder traversal, return state per node | House Robber III, Max Path Sum in Tree |

### Common recurrences

```js
// Fibonacci-style (1D, two prior states)
dp[i] = dp[i-1] + dp[i-2]

// Decision at each step
dp[i] = max(dp[i-1], nums[i] + dp[i-2])   // House Robber

// Unbounded choice
dp[a] = 1 + min over coins c of dp[a - c]  // Coin Change

// Two-sequence match/mismatch
dp[i][j] = (s1[i-1] === s2[j-1])
           ? dp[i-1][j-1] + 1
           : max(dp[i-1][j], dp[i][j-1])   // LCS

// Grid paths
dp[r][c] = dp[r-1][c] + dp[r][c-1]        // Unique Paths

// Interval (fill by length)
dp[i][j] = (s[i] === s[j])
           ? dp[i+1][j-1] + 2
           : max(dp[i+1][j], dp[i][j-1])  // Longest Palindromic Subsequence
```

### Space optimization guide

| Original | What you need | Optimized |
|---|---|---|
| `dp[i]` uses `dp[i-1]` and `dp[i-2]` | 2 variables | `prev2`, `prev1` |
| `dp[r][c]` uses row `r-1` only | Previous row | 1D array, overwrite in-place |
| 0/1 Knapsack collapse to 1D | No item reuse | Traverse capacity backwards |
| Unbounded Knapsack collapse to 1D | Reuse OK | Traverse capacity forwards |

### Complexity cheat sheet

| Pattern | Time | Space | Optimized Space |
|---|---|---|---|
| 1D DP | O(n) | O(n) | O(1) |
| 2D Grid DP | O(m×n) | O(m×n) | O(n) |
| Two-sequence DP | O(m×n) | O(m×n) | O(n) |
| LIS O(n²) | O(n²) | O(n) | — |
| LIS O(n log n) | O(n log n) | O(n) | — |
| 0/1 Knapsack | O(n×W) | O(n×W) | O(W) |
| Burst Balloons (interval DP) | O(n³) | O(n²) | — |

---

<a id="lesson-25"></a>
## Lesson 25 — You did it. Now what?

Take a breath. That was a lot. **You don't have to have it all memorized.**

What you should walk away with after reading this:

1. **DP solves problems by avoiding repeated work** — cache subproblem answers, look them up later.
2. **Two prerequisites:** overlapping subproblems + optimal substructure.
3. **Two approaches:** memoization (top-down, recursive + cache) and tabulation (bottom-up, iterative + table).
4. **State design is the core skill** — ask "what information is needed for future decisions?"
5. **Space can often be optimized** — by keeping only the rows or values you actually need.

### How to practice

1. Start with Q1 (Fibonacci) — it's trivial to code but shows you all three DP approaches back-to-back.
2. Do Q2 (Climbing Stairs) and Q3 (Min Cost Climbing Stairs) — they're fast.
3. Do Q4 (House Robber) — it's where the "decision" pattern clicks for most people.
4. Skip forward to Q24 (Coin Change) after House Robber — it's a pattern anchor.
5. Come back and fill in the gaps (stocks, LCS, knapsack) in whatever order feels right.

### Pacing

- DP is genuinely hard at first. **Expect to feel stuck.** That's not a sign you're bad at it — it's a sign you're learning it.
- Try each problem for 20–30 minutes. If stuck, read Hint 1, try again. Then Hint 2.
- After solving a problem, read the solution again the next day. "Oh, of course" is a great learning signal.
- Don't try to do 10 DP problems in a day. Two to three is plenty.

### If you're still fuzzy

- Re-read Lessons 3–8. The Fibonacci → memoization → tabulation arc is the foundation. Everything else builds on it.
- Try to implement Fibonacci all four ways (naive, memoized, tabulated, space-optimized) from memory. That alone is worth 30 minutes of your time.

You're going to get this. DP is a skill, not a talent. Repetition is the whole game.

See you in [Q1 — Fibonacci](./questions/01-fibonacci.md). 💪
