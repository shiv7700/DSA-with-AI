# Recursion — Lessons from Zero

> 👋 Hey. This file is for someone who has never formally thought about recursion before. A lot of people find it deeply confusing at first. That's normal. We're going to go slow. One idea per lesson. Real examples. ASCII diagrams. And we'll trace through code by hand until the "aha" moment arrives.
>
> Total reading time at a relaxed pace: about 2 hours, with breaks. **You do not have to read this all at once.** Come back when you solve a problem and things feel fuzzy.

---

## Table of Lessons

1. [What is recursion? (the Russian dolls)](#lesson-1)
2. [The two required parts: base case + recursive case](#lesson-2)
3. [Tracing a recursive call by hand — factorial, step by step](#lesson-3)
4. [What is the call stack?](#lesson-4)
5. [Stack overflow — when recursion goes wrong](#lesson-5)
6. [Recursion vs iteration — when to use each](#lesson-6)
7. [Direct, indirect, and mutual recursion](#lesson-7)
8. [Building trust: the "recursive leap of faith"](#lesson-8)
9. [Visualizing the tree of recursive calls](#lesson-9)
10. [Memoization — "I already computed this"](#lesson-10)
11. [Why Fibonacci goes from 2^n to O(n) with memoization](#lesson-11)
12. [Tail recursion (and why JS engines mostly don't help you)](#lesson-12)
13. [Backtracking — a preview](#lesson-13)
14. [Quick reference](#lesson-14)
15. [You did it — what to do next](#lesson-15)

---

<a id="lesson-1"></a>
## Lesson 1 — What is recursion? (the Russian dolls)

You've probably seen Russian nesting dolls — *Matryoshka* dolls. You open one, and inside it there's a slightly smaller version of the same doll. Open that one — another smaller doll. And another, and another, until finally you reach the tiniest doll that can't be opened.

That's recursion.

**A function is recursive if it calls itself to solve a smaller version of the same problem.**

Here's the simplest possible example. Suppose you want to count down from `n` to `1` and print each number:

```js
function countDown(n) {
  if (n === 0) return;         // the tiniest doll — stop here
  console.log(n);
  countDown(n - 1);            // same function, smaller doll
}

countDown(3);
// 3
// 2
// 1
```

Picture it as dolls:

```
countDown(3)
  └─ prints 3
  └─ opens countDown(2)
       └─ prints 2
       └─ opens countDown(1)
            └─ prints 1
            └─ opens countDown(0)
                 └─ this is the tiny doll — just returns, nothing inside
```

Notice:
- Each call is doing the **same job** as the outer call — but on a **smaller** input.
- There's one special case that **stops the chain** — `n === 0`. Without it, you'd open dolls forever.

> 🎯 **Key takeaway**
> Recursion = a function that calls itself on a smaller input, until it reaches a stopping point.

---

<a id="lesson-2"></a>
## Lesson 2 — The two required parts: base case + recursive case

Every recursive function has exactly two pieces. Miss either one and things go wrong.

### Part 1: The base case

The **base case** is the version of the problem so small that you can answer it directly — no recursion needed. It's the floor. The bottom rung. The tiny doll that can't be opened.

If you don't have a base case, the function calls itself forever (or until your computer runs out of memory — we'll see that in Lesson 5).

### Part 2: The recursive case

The **recursive case** is what the function does for all other inputs: it **reduces the problem**, then calls itself on the smaller version.

"Reduces the problem" means: whatever argument you pass the recursive call must be **closer to the base case** than the current one. Usually that means a smaller number, a shorter string, a smaller array, etc.

Let's label both parts in `countDown`:

```js
function countDown(n) {
  // BASE CASE ──────────────────────────
  if (n === 0) return;
  // ─────────────────────────────────────

  console.log(n);

  // RECURSIVE CASE ─────────────────────
  countDown(n - 1);   // n-1 is closer to 0 than n
  // ─────────────────────────────────────
}
```

> ✋ **Pause and think**
> What would go wrong if we wrote `countDown(n + 1)` in the recursive case instead of `countDown(n - 1)`?
>
> <details>
> <summary>Show answer</summary>
>
> The argument would grow larger on every call — farther from the base case — instead of smaller. The function would never stop. It would keep calling itself until the call stack explodes (a stack overflow).
> </details>

Here's a second example — computing the sum from 1 to `n`:

```js
function sumTo(n) {
  if (n === 1) return 1;          // base case: sum from 1 to 1 is just 1
  return n + sumTo(n - 1);        // recursive case: n + (sum from 1 to n-1)
}
```

Read that last line like this: "the sum from 1 to `n` equals `n` plus whatever `sumTo(n-1)` gives me."

You're trusting that `sumTo(n-1)` will eventually work out. We'll talk about why that trust is justified in Lesson 8.

> 🎯 **Key takeaway**
> Every recursion = one base case (stop here) + one recursive case (reduce and recurse). Both are required.

---

<a id="lesson-3"></a>
## Lesson 3 — Tracing a recursive call by hand: factorial, step by step

The best way to *really* get recursion is to trace through a specific example, step by step, on paper or mentally.

Let's use factorial. `factorial(n)` = n × (n-1) × (n-2) × … × 1.

- `factorial(5)` = 5 × 4 × 3 × 2 × 1 = 120
- `factorial(0)` = 1 (by definition — the "empty product")

The recursive formula: `factorial(n) = n × factorial(n-1)`.

Here's the code:

```js
function factorial(n) {
  if (n === 0) return 1;          // base case
  return n * factorial(n - 1);   // recursive case
}
```

Now let's trace `factorial(4)` by hand. We'll draw each function call as it happens:

#### Phase 1: Going down (each call spawns another)

```
factorial(4)
  → needs 4 * factorial(3)
         factorial(3)
           → needs 3 * factorial(2)
                  factorial(2)
                    → needs 2 * factorial(1)
                           factorial(1)
                             → needs 1 * factorial(0)
                                    factorial(0)
                                      → returns 1   ← BASE CASE!
```

#### Phase 2: Coming back up (each call gets its answer and computes)

```
factorial(0) returns 1
factorial(1) = 1 * 1  = 1     → returns 1
factorial(2) = 2 * 1  = 2     → returns 2
factorial(3) = 3 * 2  = 6     → returns 6
factorial(4) = 4 * 6  = 24    → returns 24
```

**Two phases.** Going down: functions pile up, each waiting for the answer below. Coming back up: answers flow upward, each function completes once it has the piece it was missing.

This is the essential shape of all recursion. Once you see it, you can't unsee it.

> 💡 **Tip**
> When you're confused by a recursive function, trace it by hand on a small input (like `n = 3` or `n = 4`). Draw each call level, write what it returns. The pattern always emerges.

> ✋ **Pause and try**
> What does `factorial(3)` return? Trace it yourself before checking.
>
> <details>
> <summary>Show answer</summary>
>
> ```
> factorial(3)
>   = 3 * factorial(2)
>   = 3 * (2 * factorial(1))
>   = 3 * (2 * (1 * factorial(0)))
>   = 3 * (2 * (1 * 1))
>   = 3 * (2 * 1)
>   = 3 * 2
>   = 6
> ```
> </details>

---

<a id="lesson-4"></a>
## Lesson 4 — What is the call stack?

In Lesson 3, we saw function calls "piling up" while waiting for the answer from below. But where exactly do they pile up?

They go on the **call stack**.

Think of the call stack as a physical stack of trays in a cafeteria. Each tray represents one function call in progress. When a function calls another function, a new tray gets placed **on top**. When a function finishes and returns, its tray gets **removed from the top**. The function under it (which was waiting) picks up where it left off.

Here's what the call stack looks like while running `factorial(4)`:

```
Step 1: factorial(4) is called
┌─────────────────┐
│  factorial(4)   │  ← currently running
└─────────────────┘

Step 2: factorial(4) calls factorial(3)
┌─────────────────┐
│  factorial(3)   │  ← currently running
├─────────────────┤
│  factorial(4)   │  ← waiting for factorial(3) to return
└─────────────────┘

Step 3: factorial(3) calls factorial(2)
┌─────────────────┐
│  factorial(2)   │  ← currently running
├─────────────────┤
│  factorial(3)   │  ← waiting
├─────────────────┤
│  factorial(4)   │  ← waiting
└─────────────────┘

Step 4: factorial(2) calls factorial(1), factorial(1) calls factorial(0)
┌─────────────────┐
│  factorial(0)   │  ← hits base case, returns 1
├─────────────────┤
│  factorial(1)   │  ← waiting
├─────────────────┤
│  factorial(2)   │  ← waiting
├─────────────────┤
│  factorial(3)   │  ← waiting
├─────────────────┤
│  factorial(4)   │  ← waiting
└─────────────────┘

Step 5: factorial(0) returns → stack shrinks step by step
┌─────────────────┐
│  factorial(1)   │  ← now has 1, computes 1*1=1, returns 1
├─────────────────┤
│  factorial(2)   │  ← waiting
├─────────────────┤
...eventually...

└─────────────────┘  ← stack is empty, whole thing is done
```

Each "frame" on the stack stores:
- Which function is running
- The value of its local variables (like `n`)
- Where to return to when it's done

> 🎯 **Key takeaway**
> The call stack is where function calls live while they're waiting. Each call adds a frame; each return removes one. Recursion uses the call stack to remember all the "waiting" layers.

---

<a id="lesson-5"></a>
## Lesson 5 — Stack overflow: when recursion goes wrong

The call stack has a size limit. It can only hold so many frames at once.

If your recursion never hits its base case — or takes too many steps to get there — the stack keeps growing until it runs out of room. That's a **stack overflow**.

JavaScript throws a `RangeError` when this happens:

```js
function oops(n) {
  return oops(n + 1);   // never gets smaller, never hits a base case
}

oops(0);
// RangeError: Maximum call stack size exceeded
```

Two common causes:

**1. Missing or wrong base case:**
```js
function countdown(n) {
  console.log(n);
  countdown(n - 1);   // forgot to stop when n reaches 0!
}
```

**2. Input so large the stack can't hold it all:**
```js
function sum(n) {
  if (n === 0) return 0;
  return n + sum(n - 1);
}

sum(100000);   // might overflow — 100,000 frames on the stack
```

For very large inputs, recursion can hit the stack limit even if the base case is correct. In those cases, you need either:
- An **iterative** version (use a regular loop), or
- A technique called **tail recursion** (Lesson 12), though JS engines mostly don't help with that.

> ⚠️ **Warning**
> Stack overflow is one of the most common beginner recursion bugs. If your program crashes with "Maximum call stack size exceeded", ask: "Did I write my base case correctly? Is the input shrinking toward the base case on every call?"

> 🎯 **Key takeaway**
> The call stack has a limit. Infinite recursion = instant stack overflow. Too-deep recursion = eventual stack overflow. Always ensure your base case is reachable.

---

<a id="lesson-6"></a>
## Lesson 6 — Recursion vs Iteration: when to use each

Anything you can do with recursion, you can also do with a loop — and vice versa. So when should you choose recursion?

### When recursion shines

**Problem has a naturally recursive structure.** If the definition of the problem literally says "do something with the first piece, then do the same thing with the rest", recursion translates directly.

- Tree traversal: "visit this node, then visit its children (which are trees)"
- Directory scanning: "list files here, then list files in each subdirectory (which is a directory)"
- Parsing nested syntax: "parse this expression, which can contain sub-expressions"

**Divide-and-conquer algorithms.** When you split a problem into two halves and solve each half independently (like merge sort), recursion is the natural fit.

**Backtracking.** When you try a choice, recurse into it, and then "undo" it if it doesn't work out — recursion manages the "undo" for you automatically (by returning up the stack).

### When iteration wins

**Simple linear pass.** If you're just counting, summing, or processing a flat array one item at a time, a loop is cleaner and doesn't risk stack overflow.

**Very large inputs.** If `n` can be 100,000, a recursive solution may stack overflow (each call needs a frame). A loop has no such limit.

**Performance-critical, tight loops.** Function calls have overhead. In a hot loop, iteration can be measurably faster.

### A quick comparison table

```
┌────────────────────────┬──────────────────────────┬──────────────────────────┐
│                        │     RECURSION            │     ITERATION            │
├────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Code clarity           │ Often elegant for         │ Often cleaner for        │
│                        │ tree/divide-conquer       │ flat, linear tasks       │
├────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Stack usage            │ O(depth) extra space      │ O(1) extra space         │
│                        │ on the call stack         │ (usually)                │
├────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Stack overflow risk    │ Yes, for large inputs     │ No                       │
├────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Debugging              │ Harder (need to trace     │ Easier (step through     │
│                        │ many frames)              │ one loop at a time)      │
├────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Best for               │ Trees, graphs, backtrack  │ Arrays, counters,        │
│                        │ divide & conquer          │ accumulations            │
└────────────────────────┴──────────────────────────┴──────────────────────────┘
```

> 🎯 **Key takeaway**
> Recursion is not "better" or "worse" than iteration. It's a tool. Use it when the problem structure naturally maps to it. Use loops when you're processing flat data or when `n` could be huge.

---

<a id="lesson-7"></a>
## Lesson 7 — Direct, indirect, and mutual recursion

Most recursion you'll see is **direct** — a function calls itself directly. But there are two other flavors worth knowing.

### Direct recursion

The function calls itself by name:

```js
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);   // calls itself directly
}
```

That's what we've been doing. 99% of interview problems use this.

### Indirect recursion

Function A calls Function B, which calls Function A back:

```js
function isEven(n) {
  if (n === 0) return true;
  return isOdd(n - 1);           // calls isOdd
}

function isOdd(n) {
  if (n === 0) return false;
  return isEven(n - 1);          // calls isEven back
}
```

They call each other, creating a chain that eventually bottoms out.

### Mutual recursion

Mutual recursion is the same idea as indirect but with a clear purpose — two (or more) functions that are defined in terms of each other. The `isEven/isOdd` example above is a classic case.

In the wild, mutual recursion shows up in:
- Parsers (expression ↔ term ↔ factor rules calling each other)
- Certain game-tree evaluations
- State machine transitions

> 💡 **Tip**
> For this chapter's problems, every question uses **direct recursion** — a function calling itself. You won't need indirect/mutual recursion to solve them. But recognizing these terms is useful when you read about recursion elsewhere.

---

<a id="lesson-8"></a>
## Lesson 8 — Building trust: the "recursive leap of faith"

New programmers get stuck on recursion because they try to mentally trace every single level of every recursive call — "okay, so `sumTo(5)` calls `sumTo(4)` which calls `sumTo(3)` which calls…" and then their brain explodes.

There's a better way to think about it.

**The recursive leap of faith:** assume your function already works correctly for inputs smaller than the current one. Then figure out how to use that to solve the current one.

Let's apply it to `sumTo(n)`:
- Assume `sumTo(n-1)` correctly gives the sum from 1 to n-1. (Believe it — don't trace it.)
- Then the sum from 1 to n is simply: `n + sumTo(n-1)`.

Done. We didn't trace `sumTo(4)` or `sumTo(3)` or any other level. We just trusted that the smaller version works, and described the current version in terms of it.

Let's apply it to `factorial(n)`:
- Assume `factorial(n-1)` = (n-1)!. (Take it on faith.)
- Then `factorial(n)` = n × (n-1)! = `n * factorial(n-1)`.

This might feel like cheating. It isn't. **Mathematical induction** gives us the formal proof that this works — if it works for the base case, and each step correctly reduces to the previous, then it works for all `n`. But you don't need to know induction to write recursive code. Just adopt the leap of faith.

> ✋ **Try it now**
> Using the recursive leap of faith, describe a recursive function `power(base, exp)` that computes `base^exp`.
>
> Assume `power(base, exp-1)` already gives `base^(exp-1)`. How do you get `base^exp` from that?
>
> <details>
> <summary>Show answer</summary>
>
> `base^exp = base × base^(exp-1)`, so:
>
> ```js
> function power(base, exp) {
>   if (exp === 0) return 1;          // base case: anything^0 = 1
>   return base * power(base, exp - 1);
> }
> ```
> </details>

> 🎯 **Key takeaway**
> Don't trace every level of recursion in your head. Instead: (1) identify the base case, (2) assume the recursive call works for a smaller input, (3) use that result to build your answer. That's the leap of faith.

---

<a id="lesson-9"></a>
## Lesson 9 — Visualizing the tree of recursive calls

Some recursive functions branch — they call themselves **more than once** in the same call. The result is a tree of calls, not just a chain.

The classic example is naive Fibonacci:

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);   // two recursive calls!
}
```

Let's draw the call tree for `fib(5)`:

```
                          fib(5)
                        /        \
                   fib(4)         fib(3)
                 /       \       /      \
             fib(3)    fib(2)  fib(2)  fib(1)
            /     \    /   \   /   \
         fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)
         /    \
      fib(1) fib(0)
```

Count the nodes. For `fib(5)`, there are 15 function calls. For `fib(6)`, there would be 25. For `fib(n)`, there are roughly `2^n` calls.

Notice `fib(3)` appears twice. `fib(2)` appears three times. We're recomputing the same values over and over. This is the inefficiency that memoization fixes (coming in Lesson 10).

### How to "read" a call tree

- Each node is one function call.
- The children of a node are the recursive calls it makes.
- Leaf nodes are base cases (no children — they return directly).
- The total number of nodes tells you how many times any work is done.
- Duplicate subtrees tell you where recomputation is happening.

> 🔬 **Going deeper (optional)**
> For trees that branch exactly twice at each level and have depth `n`, the total number of nodes is 2^(n+1) - 1. That's exponential. Memoization collapses repeated subtrees, turning exponential into linear.

> 🎯 **Key takeaway**
> When a function calls itself twice (or more) per call, the total work grows exponentially with depth. Drawing the call tree reveals which subproblems are repeated — and that's where memoization helps most.

---

<a id="lesson-10"></a>
## Lesson 10 — Memoization: "I already computed this"

Here's the dictionary definition trap. You look up the word *recursion* in the dictionary, and the definition says "See: recursion." So you flip back to *recursion*, and it still says "See: recursion." You're going in circles.

Memoization solves a similar problem in code: if you've already solved a subproblem before, **just look up the answer instead of recomputing it**.

The word "memo" literally means "a note to yourself." That's exactly what memoization is: writing down answers as you compute them, so you can look them up later.

### How it works

1. Create a cache (usually an object or a `Map`).
2. Before computing something, check: "Is the answer for this input already in the cache?"
   - **Yes?** Return it immediately.
   - **No?** Compute it, store it in the cache, then return it.

```js
const cache = {};

function fibMemo(n) {
  if (n <= 1) return n;                  // base case
  if (cache[n] !== undefined) return cache[n];   // 📝 already computed!

  const result = fibMemo(n - 1) + fibMemo(n - 2);
  cache[n] = result;                     // 📝 store it for later
  return result;
}
```

That's it. Three extra lines. But the effect is dramatic.

### A cleaner pattern: closure-based memo

```js
function makeFib() {
  const memo = {};

  return function fib(n) {
    if (n <= 1) return n;
    if (memo[n] !== undefined) return memo[n];
    return (memo[n] = fib(n - 1) + fib(n - 2));
  };
}

const fib = makeFib();
```

This keeps the cache private inside the function.

> 💡 **Tip**
> Memoization only works for **pure functions** — functions where the same input always gives the same output. If your function depends on global state, the time of day, or random numbers, the cached answer might be wrong next time.

> 🎯 **Key takeaway**
> Memoization = cache the result of each unique input. Subsequent calls with the same input return instantly. It turns repeated work into a single lookup.

---

<a id="lesson-11"></a>
## Lesson 11 — Why Fibonacci goes from 2^n to O(n) with memoization

In Lesson 9, we saw that naive `fib(n)` calls itself about `2^n` times. Let's understand exactly why, and exactly how memoization fixes it.

### The naive Fibonacci call tree (revisited)

Without memoization, `fib(5)` looks like this:

```
Calls made: fib(5), fib(4), fib(3), fib(3), fib(2), fib(2), fib(2), fib(1), fib(1), fib(1), fib(1), fib(0), fib(0), fib(0), fib(1)
Total: 15 calls for fib(5)
For fib(40): roughly 2^40 = 1,099,511,627,776 calls. That's one TRILLION calls.
```

Now, let's count unique inputs. From 0 to `n`, there are only `n + 1` unique values. Every other call is a **repeat**.

### With memoization

The first time we compute `fib(3)`, we cache the answer. The second time `fib(3)` is asked for, we return immediately without going deeper.

The new call tree:

```
fib(5)
├─ fib(4)
│   ├─ fib(3)
│   │   ├─ fib(2)
│   │   │   ├─ fib(1) → 1  (cached immediately after)
│   │   │   └─ fib(0) → 0  (cached immediately after)
│   │   │   result: 1, cached
│   │   └─ fib(1) → 1  (cache hit! instant)
│   │   result: 2, cached
│   └─ fib(2) → 1  (cache hit! instant)
│   result: 3, cached
└─ fib(3) → 2  (cache hit! instant)
result: 5
```

Total unique computations: n + 1. That's **O(n)**.

### The numbers side by side

```
n = 40

naive fib(40):  roughly 2^40 operations ≈ 1 trillion
memoized fib(40): exactly 41 operations
```

Try it yourself:

```js
// naive — comment this out after running, it'll hang for large n
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

// memoized
const memo = {};
function fibMemo(n) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  return (memo[n] = fibMemo(n - 1) + fibMemo(n - 2));
}

console.time('naive');
fib(35);        // takes a second or two
console.timeEnd('naive');

console.time('memo');
fibMemo(35);    // instant
console.timeEnd('memo');
```

> 🎯 **Key takeaway**
> Memoization eliminates repeated work in the call tree. For Fibonacci, it converts 2^n calls into n calls — an astronomically large improvement. This is the core idea behind **dynamic programming**.

---

<a id="lesson-12"></a>
## Lesson 12 — Tail recursion (and why JS engines mostly don't help you)

You may have read that "tail recursion is efficient" or "tail-recursive functions can be converted to loops automatically." Let's understand what that means — and why it barely matters in JavaScript today.

### What is tail recursion?

A recursive call is in **tail position** if it's the very **last thing** the function does before returning. There's nothing left to compute after the call returns.

Compare these two versions of factorial:

**Not tail-recursive:**
```js
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);   // after factorial returns, we still have to multiply by n
}
```

The `n *` part happens **after** the recursive call returns. The current frame must stay on the stack to do that multiplication.

**Tail-recursive (with accumulator):**
```js
function factorialTail(n, acc = 1) {
  if (n === 0) return acc;
  return factorialTail(n - 1, n * acc);   // nothing left to do — this IS the return value
}
```

Now the recursive call is the last thing that happens. We pass the accumulating result as a parameter instead of doing work on the way back up.

### What could the engine do with this?

If a function call is in tail position, a smart compiler can **reuse the current stack frame** for the next call, instead of adding a new one on top. This means the stack never grows — tail recursion runs in O(1) stack space.

This optimization is called **Proper Tail Calls (PTC)** or **Tail Call Optimization (TCO)**.

### The JavaScript situation

The ES6 specification says JavaScript engines **must** support PTC for tail calls in strict mode. But in practice:

- **Chrome/V8:** Implemented it, then **removed** it due to developer tooling concerns (tail calls make stack traces hard to read).
- **Firefox/SpiderMonkey:** Never fully shipped it.
- **Node.js:** Available only in very old versions with a flag.
- **Safari/JavaScriptCore:** Actually **does** implement it (the lone holdout).

**Practical conclusion:** In 2024, you cannot rely on tail call optimization in JavaScript across environments. If your recursion depth could be large, convert to iteration or use an explicit stack.

```js
// How to convert deep recursion to iteration
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

> ⚠️ **Warning**
> Writing tail-recursive JavaScript is still good practice for clarity and shows you understand the concept. Just don't rely on the engine to magically avoid stack overflows for you.

> 🎯 **Key takeaway**
> Tail recursion puts the recursive call last, enabling potential O(1) stack space. The ECMAScript spec requires it, but almost no JS engines implement it. In JS, if stack depth is a concern, convert to iteration yourself.

---

<a id="lesson-13"></a>
## Lesson 13 — Backtracking: a preview

A large portion of the medium/hard problems in this chapter use **backtracking** — a technique that's built entirely on top of recursion.

You'll get a full chapter on it later (Chapter 24), but here's the core idea so you're not lost when you hit questions like N-Queens or Sudoku Solver.

### The idea

Backtracking is "try something, recurse, and if it doesn't lead to a solution, **undo** it and try something else."

It's like navigating a maze:
1. Stand at a fork.
2. Pick a direction (make a choice).
3. Walk that path (recurse).
4. Did you reach the exit? Great, done.
5. Dead end? Walk back to the fork (**backtrack**), pick a different direction.

### The template

```js
function solve(state, ...) {
  // BASE CASE: did we reach a solution?
  if (isSolution(state)) {
    recordSolution(state);
    return;
  }

  // RECURSIVE CASE: try each possible next step
  for (const choice of getPossibleChoices(state)) {
    makeChoice(state, choice);     // modify state: add the choice
    solve(state, ...);             // recurse
    undoChoice(state, choice);     // ← THIS IS THE BACKTRACK: undo the change
  }
}
```

The magic is in "undo the choice." Because recursion returns to the caller after it finishes, your `undoChoice` call runs exactly when you need it to — right after the recursive exploration of that branch is done, before you try the next branch.

### A tiny example: print all binary strings of length 2

```
Choices at each position: 0 or 1

Start: ""
├── choose 0 → "0"
│   ├── choose 0 → "00"  ← print, backtrack
│   └── choose 1 → "01"  ← print, backtrack
└── choose 1 → "1"
    ├── choose 0 → "10"  ← print, backtrack
    └── choose 1 → "11"  ← print, backtrack
```

Each time we reach a leaf (length 2), we print and return. Returning is the backtrack — we come back to the previous level and try the other branch.

> 💡 **Tip**
> In many backtracking problems, the "undo" step is just the reverse of the "make choice" step. If you added something to a list, pop it. If you placed a queen on a board, remove it. If you set a cell, clear it.

> 🎯 **Key takeaway**
> Backtracking = recursion + undo. It systematically explores all possibilities by making choices, recursing into them, and undoing them when they don't pan out. We'll go deep on it in Chapter 24.

---

<a id="lesson-14"></a>
## Lesson 14 — Quick reference

Here's your recursion cheat sheet to come back to.

### The universal recursion skeleton

```js
function solve(input) {
  // 1. BASE CASE — return directly
  if (isSmallEnough(input)) {
    return baseAnswer;
  }

  // 2. RECURSIVE CASE — reduce, recurse, combine
  const smallerAnswer = solve(smallerInput);
  return combine(smallerAnswer, currentPiece);
}
```

### Backtracking skeleton

```js
function backtrack(state) {
  if (isComplete(state)) {
    results.push(copyOf(state));
    return;
  }
  for (const choice of choices(state)) {
    apply(state, choice);
    backtrack(state);
    undo(state, choice);     // ← the backtrack
  }
}
```

### Memoization wrapper

```js
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage:
const fib = memoize(function(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});
```

### Complexity rules of thumb

| Recursion pattern | Time complexity | Space (stack) |
|---|---|---|
| One call, reduces by 1 | O(n) | O(n) |
| One call, reduces by half | O(log n) | O(log n) |
| Two calls, reduces by 1 (no memo) | O(2^n) | O(n) |
| Two calls, reduces by 1 (with memo) | O(n) | O(n) |
| Two calls, reduces by half | O(n) | O(log n) |
| Backtracking: trying k choices at each of n levels | O(k^n) worst case | O(n) |

### Common recursion mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| Missing base case | Stack overflow | Add a return for the smallest input |
| Wrong base case | Wrong answer or overflow | Trace by hand on tiny input |
| Forgetting to return the recursive call | Returns `undefined` | `return recursive(...)` not just `recursive(...)` |
| Not reducing the input | Infinite loop / overflow | Ensure recursive arg is smaller |
| Mutating shared state without undo | Wrong results in backtracking | Add the undo step after each recursive call |
| Using recursion when loop is simpler | Unnecessary complexity | Ask: "would a for-loop be clearer here?" |

---

<a id="lesson-15"></a>
## Lesson 15 — You did it. Now what?

Recursion is the hardest mental model shift in early DSA learning. If Lessons 1–13 felt hard, that's completely normal. Most people need to write 5–10 recursive functions before it clicks. The click happens — but you have to do the reps.

### What you should walk away with

1. **You know the two parts** — base case and recursive case. Every recursive function has both.
2. **You can trace a recursive call by hand** — going down, piling up frames, coming back up.
3. **You know what the call stack is** — and what stack overflow means.
4. **You've met memoization** — and understand why it transforms exponential Fibonacci into linear.
5. **You've seen the backtracking shape** — try, recurse, undo.
6. **You know tail recursion exists** — but that JS engines mostly don't optimize it.

### What to do next

1. Start with Q1 (Sum of First N Natural Numbers) — it's a two-liner. Just to feel the shape.
2. Q2 (Factorial) — you've already traced this by hand. Just write it.
3. Q6 (Fibonacci) — write the naive version first, feel the slowness, then add memoization.
4. Q16 (Tower of Hanoi) — this one will blow your mind. Go slow. Trace it.
5. Q21 (N-Queens) — once you feel comfortable with backtracking, this is the classic.

### Pacing

- Easy problems: aim for 2–3 per session. They build reflexes.
- Medium problems: take your time. Draw the recursion tree before coding.
- Hard problems: sketch the state/choice/undo structure on paper first, then code.

### If you're stuck

- Trace by hand on the smallest possible input (`n = 1`, `n = 2`).
- Ask: "What's the base case?" before writing any other line.
- Apply the leap of faith: assume the recursive call works. Describe *your* level in terms of it.
- Come back and re-read the relevant lesson. Lessons 3, 8, and 13 cover the three most common sticking points.

You're learning to think recursively. It's a new mode of thought. Be patient with yourself. **Every pro once sat exactly where you're sitting.**

See you in [Q1](./questions/01-sum-n.md). 💪
