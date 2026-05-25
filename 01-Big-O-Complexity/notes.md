# Big-O & Complexity Analysis — Lessons from Zero

> 👋 Hey. This file is about one of the most useful thinking tools in all of computer science: **Big-O notation**. It answers the question: "If my data grows, how much slower does my program get?"
>
> You do not need maths beyond multiplication. You do not need to have written a single algorithm yet. If you can count repetitions in a loop, you can do this.
>
> Total reading time at a relaxed pace: about 90 minutes, with breaks. **You don't have to read it all in one sitting.** But read the lessons in order — each one builds on the last.

---

## Table of Lessons

1. [What does "scale" mean?](#lesson-1)
2. [The road-trip model — visualizing growth](#lesson-2)
3. [O(1) — constant time](#lesson-3)
4. [O(n) — linear time](#lesson-4)
5. [O(log n) — logarithmic time (the magic one)](#lesson-5)
6. [O(n log n) — the best you can usually do for sorting](#lesson-6)
7. [O(n²) — quadratic time](#lesson-7)
8. [O(2ⁿ) and beyond — when things explode](#lesson-8)
9. [Dropping constants and lower-order terms](#lesson-9)
10. [Analyzing JS code snippets — a step-by-step method](#lesson-10)
11. [Two loops, two inputs, nested conditionals — common confusions](#lesson-11)
12. [Space complexity — memory counts too](#lesson-12)
13. [Amortized complexity — the "averaged cost" idea](#lesson-13)
14. [Worst case, best case, average case](#lesson-14)
15. [Common JS pitfalls: hidden O(n) operations you don't see](#lesson-15)
16. [Quick reference — the cheat sheet](#lesson-16)
17. [🔬 Going deeper: Big-Theta (Θ) and Big-Omega (Ω) (optional)](#lesson-17)
18. [You did it — what to do next](#lesson-18)

---

<a id="lesson-1"></a>
## Lesson 1 — What does "scale" mean?

Imagine you own a small coffee shop. You have one employee, and she can make 10 coffees an hour. Life is fine.

Now your shop becomes famous and 10,000 people want coffee. Does hiring ten employees solve it? Yes — it roughly scales: 10 employees × 10 coffees/hour = 100 coffees/hour, 100 employees = 1,000/hour, and so on.

Now imagine instead your shop had a rule: **before every coffee, the employee must check whether anyone else in the city has ordered the same drink today**. That doesn't scale at all. The more orders there are, the more checking is required per order, and checking itself grows with the total number of orders. A 10× increase in customers causes a 100× increase in work.

**That's what "scale" means in algorithms.** When your data grows — more users, more records, more items — how much more work does your program have to do?

Big-O notation is the standardized way engineers answer that question, regardless of programming language, hardware, or implementation details.

> 🎯 **Key takeaway**
> Big-O measures how **work grows** relative to the **size of the input**. We write the input size as `n`.

---

<a id="lesson-2"></a>
## Lesson 2 — The road-trip model: visualizing growth

Picture five different road-trip rules. Before you can leave town, you have to follow the rule. As you carry more luggage (more data), how much longer does each rule take?

| Rule | With 10 bags | With 100 bags | With 1,000 bags |
|------|-------------|---------------|-----------------|
| **Check the GPS once** | 1 step | 1 step | 1 step |
| **Unzip and rezip every bag** | 10 steps | 100 steps | 1,000 steps |
| **For every bag, inspect every other bag** | 100 steps | 10,000 steps | 1,000,000 steps |
| **Cut the pile in half each time until one remains** | 4 steps | 7 steps | 10 steps |
| **Pack bags in order (sort), then check each** | ~33 steps | ~664 steps | ~9,966 steps |

Each row is a different **growth curve**. Their formal names:

```
Rule 1 → O(1)        constant
Rule 2 → O(n)        linear
Rule 3 → O(n²)       quadratic
Rule 4 → O(log n)    logarithmic
Rule 5 → O(n log n)  linearithmic
```

That's essentially the whole Big-O vocabulary you need for 95% of interview problems. Let's go through each one with a real analogy and real JS code.

> 💡 **Tip**
> When someone asks "what's the complexity?", they're asking: "which row in this table does your algorithm match?"

---

<a id="lesson-3"></a>
## Lesson 3 — O(1): constant time

**The analogy:** You have a filing cabinet with numbered drawers. Someone says "get me the contents of drawer 42." You walk to drawer 42 and open it. Done. It doesn't matter if the cabinet has 5 drawers or 5,000 — getting drawer 42 takes the same time.

This is **O(1)**: **constant time**. The amount of work doesn't change no matter how big the input is.

### What does O(1) look like in code?

```js
// Reading or writing by index: O(1)
const x = arr[7];
arr[3] = 99;

// Checking length: O(1)
arr.length;

// Push/pop at the end: O(1)
arr.push(42);
arr.pop();

// Map/Set operations: O(1) on average
map.get('key');
map.set('key', value);
set.has(value);

// Arithmetic, comparisons: O(1)
const sum = a + b;
const isEven = n % 2 === 0;
```

Notice what these all have in common: **no loops, no recursion** that scales with input size. The number of operations is fixed — one lookup, one arithmetic step, done.

> ✋ **Pause and try**
> Is `arr[0]` the same speed as `arr[99999]`? What about `arr[arr.length - 1]`?
>
> <details>
> <summary>Show answer</summary>
>
> Yes — all three are O(1). Arrays in JS (and most languages) store elements at fixed positions in memory. Accessing element at index `i` is a simple memory address calculation — no searching, no looping. The size of the array doesn't matter.
> </details>

> 🎯 **Key takeaway**
> O(1) = "the same one step, always." Index access, push/pop at the end, hash map lookups — these are all constant time.

---

<a id="lesson-4"></a>
## Lesson 4 — O(n): linear time

**The analogy:** You have a stack of letters and you need to read each one. 10 letters takes 10 minutes. 1,000 letters takes 1,000 minutes. The work grows in **direct proportion** to the input size. Double the input, double the work.

This is **O(n)**: **linear time**.

### What does O(n) look like in code?

```js
// A single loop over an array: O(n)
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}
```

Every element gets visited once. If `n = 1000`, there are 1000 additions. If `n = 1,000,000`, there are 1,000,000.

```js
// Linear scan search: O(n)
function linearSearch(arr, target) {
  for (const item of arr) {
    if (item === target) return true;
  }
  return false;
}
```

In the worst case, the target isn't there, so you check every element. That's `n` checks.

### Common O(n) operations in JS

```js
arr.indexOf(x)         // scans from left until found
arr.includes(x)        // same scan
arr.find(fn)           // scans until predicate returns true
arr.map(fn)            // visits every element
arr.filter(fn)         // visits every element
arr.forEach(fn)        // visits every element
arr.reverse()          // swaps pairs until middle
arr.shift()            // removes first, shifts all others left
arr.unshift(x)         // shifts all others right, adds at front
```

> ⚠️ **Common mistake**
> Students see `arr.includes(x)` and think "it's one line, it must be O(1)." No. **Short code is not the same as fast code.** What matters is what happens inside. `includes` has to scan the array one element at a time — that's O(n), regardless of how short the call looks.

> ✋ **Pause and try**
> You call `arr.filter(fn).length` to count how many items pass a condition. What's the complexity?
>
> <details>
> <summary>Show answer</summary>
>
> O(n). `filter` visits every element once. The `.length` lookup after is O(1). So the total is O(n) + O(1) = O(n). (We always keep the dominant term — we'll formalize this in Lesson 9.)
> </details>

> 🎯 **Key takeaway**
> O(n) = "visit each element once." One loop, or one built-in that secretly does one loop, gives you O(n). Double the data, double the work.

---

<a id="lesson-5"></a>
## Lesson 5 — O(log n): logarithmic time (the magic one)

This is the growth rate that makes experienced engineers smile. It's almost as good as O(1), and it shows up in one of the most important algorithms: **binary search**.

**The analogy: the phone book game.**

You're playing a guessing game with a phone book containing 1,000,000 names. I'm thinking of a name. Each guess, I tell you "too early" (alphabetically before) or "too late."

If you guessed randomly, you might need up to 1,000,000 guesses. But here's the smart strategy: **open the book to the exact middle**. If the name I'm thinking of comes before the middle, you throw away the entire second half. Now you only have 500,000 pages to search. Middle again — now 250,000. Keep halving.

How many times can you halve 1,000,000 before you reach 1?

```
1,000,000 → 500,000 → 250,000 → 125,000 → ... → 1
```

About **20 times**. You found one name in a million with just 20 guesses.

That's log₂(1,000,000) ≈ 20. The "log" (base 2, when talking about binary search) is the number of times you can cut the problem in half.

### The magic property of O(log n)

| n | log₂(n) |
|---|---------|
| 10 | ~3.3 |
| 100 | ~6.6 |
| 1,000 | ~10 |
| 1,000,000 | ~20 |
| 1,000,000,000 | ~30 |

**Doubling `n` adds just one more step.** A billion-element array needs only 30 comparisons with binary search. That's extraordinary.

### What does O(log n) look like in code?

The hallmark: **the loop variable doesn't increment by 1 — it multiplies or divides**.

```js
// Binary search: O(log n)
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;   // discard left half
    else right = mid - 1;                    // discard right half
  }
  return -1;
}
```

Each iteration, the search space is **cut in half**. A loop that halves its range each time runs O(log n) iterations total.

```js
// Another classic: counting steps to reach 1 by halving
function countHalves(n) {
  let steps = 0;
  while (n > 1) {
    n = Math.floor(n / 2);   // ← the key: dividing, not subtracting
    steps++;
  }
  return steps;   // ≈ log₂(n)
}
```

> 💡 **Tip**
> Any time you see a loop where the index is multiplied or divided (not incremented by 1), suspect O(log n). Binary search on a sorted array → O(log n). Traversing a balanced binary tree's height → O(log n). Finding a number in a sorted matrix by halving rows and columns → O(log n).

> 🎯 **Key takeaway**
> O(log n) = "each step cuts the problem in half." It grows incredibly slowly — a billion items still needs only ~30 steps. The telltale sign: the loop multiplies or divides, never increments by 1.

---

<a id="lesson-6"></a>
## Lesson 6 — O(n log n): the best you can usually do for sorting

**The analogy: the library, sorted.**

Imagine a librarian has to alphabetically sort 1,000 books scattered across the floor. The best possible approach? She can recursively split the pile in half, sort each half, then merge them. "Divide and conquer."

Each of the O(log n) splits requires re-examining all `n` books as she merges the sorted halves back together. That gives O(n) work per split × O(log n) levels = **O(n log n)** total.

This is where the efficiency landscape is interesting: mathematically, it's **impossible to sort an arbitrary list faster than O(n log n)** using comparisons. Every comparison-based sort — merge sort, heapsort, Timsort (which V8 uses) — is O(n log n) in its general case.

```js
// JavaScript's built-in sort is O(n log n)
arr.sort((a, b) => a - b);
```

At `n = 10,000`: O(n log n) ≈ 133,000 operations. O(n²) ≈ 100,000,000 operations. The difference is real and visible.

### O(n log n) in code

Most commonly you encounter O(n log n) by sorting, or in algorithms that combine a traversal with a log-scale operation at each step.

```js
// Sorting then scanning: O(n log n) + O(n) = O(n log n)
function hasDuplicate(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i] === sorted[i + 1]) return true;
  }
  return false;
}
```

The sort dominates here, so the whole function is O(n log n).

> 🎯 **Key takeaway**
> O(n log n) is "linear × logarithmic." It's the baseline for sort-based algorithms and is the theoretical lower bound for comparison sorting. Fast enough for almost any practical input.

---

<a id="lesson-7"></a>
## Lesson 7 — O(n²): quadratic time

**The analogy: comparing every pair of guests.**

You're organizing seating at a wedding. The rule is: every guest must meet every other guest for a handshake. With 10 guests that's 45 handshakes. With 100 guests: 4,950 handshakes. With 1,000: 499,500.

Double the guest list → roughly **quadruple** the work. That's O(n²) — **quadratic time**.

### What does O(n²) look like in code?

The telltale sign: **a loop inside a loop**, where both loops run up to `n`.

```js
// Nested loops: O(n²)
function printAllPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}
```

For `n = 1000`, this prints 1,000,000 pairs. For `n = 10,000`, it prints 100,000,000 pairs. You'll feel the slowdown.

```js
// Bubble sort: O(n²) — classic example
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

### The naive "two sum" approach

```js
// O(n²) brute force
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
}
```

Two nested loops, each up to `n`. This is the solution every beginner writes first — and then learns to replace with the O(n) hash-map version (see Q15 in this topic, and Q11 in Arrays).

> ⚠️ **Common mistake**
> "The inner loop starts at `j = i + 1`, not `j = 0`. Doesn't that make it faster?" Slightly — it's about `n²/2` operations, not `n²`. But in Big-O, we drop constants (Lesson 9). It's still O(n²).

> 🎯 **Key takeaway**
> O(n²) usually comes from nested loops where each loop is proportional to `n`. It's fine for small inputs (n < a few hundred) but becomes prohibitively slow as n grows. Always ask: can I eliminate the inner loop with a hash map or sorting?

---

<a id="lesson-8"></a>
## Lesson 8 — O(2ⁿ) and beyond: when things explode

Some algorithms have growth that isn't just "slower than O(n²)" — it's in a completely different league.

**The analogy: the rice and chessboard problem.**

A legend says a king owed a debt to a chess master. The master asked: "Put 1 grain of rice on the first square, 2 on the second, 4 on the third — double it each time across all 64 squares." The king agreed, thinking it was modest. It wasn't. By the 64th square, the total was more than 18 quintillion grains of rice — more than has ever been grown in all of human history.

That's **exponential growth**, O(2ⁿ). It starts small and then becomes incomprehensibly large.

### What does O(2ⁿ) look like in code?

```js
// Naive Fibonacci: O(2ⁿ)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 1);  // two recursive calls each time
}
```

Each call makes two more calls. Like a tree that doubles at every level. For `n = 40`, that's over a trillion calls. It's usable only for very small `n`.

### O(n!) — factorial time

Even worse: generating all permutations of an array. For an array of 10 items, that's 10! = 3,628,800 arrangements. For 20 items: 2,432,902,008,176,640,000 — more than 2 quintillion. Infeasible beyond about 12-13 elements.

### The full picture

```
   n = 30

   O(1)        → 1 step
   O(log n)    → ~5 steps
   O(n)        → 30 steps
   O(n log n)  → ~150 steps
   O(n²)       → 900 steps
   O(2ⁿ)       → 1,073,741,824 steps   ← over one billion
   O(n!)       → 265,252,859,812,191,058 steps   ← absurd
```

> 💡 **Tip**
> In coding interviews, if your algorithm is O(2ⁿ) or O(n!), the interviewer is waiting for you to say "and here's how we fix it with dynamic programming" or "backtracking with pruning." These complexities are usually a signal that a smarter approach exists.

> 🎯 **Key takeaway**
> O(2ⁿ) and O(n!) are "combinatorially explosive." They're theoretical valid — sometimes unavoidable — but only for tiny `n`. In practice, you look for ways to avoid them.

---

<a id="lesson-9"></a>
## Lesson 9 — Dropping constants and lower-order terms

Here's where some people trip up. Big-O has two specific rules that feel strange at first.

### Rule 1: Drop constants

Suppose your function does:
- one pass through `n` items (n steps)
- then another pass through `n` items (n more steps)

That's `2n` total steps. Should we write O(2n)?

No. We write **O(n)**.

**Why?** Big-O is about the *shape* of growth, not the precise step count. Whether it's `n` or `2n` or `100n`, they all grow linearly — double the input, double the work. The constant factor (2 or 100) depends on the machine, the language, the compiler, the moon phase. Big-O strips that away so we can compare algorithms purely on how they scale.

```js
// This is O(n), not O(2n)
function twoPassSum(arr) {
  let sum = 0;
  for (const x of arr) sum += x;       // first pass: O(n)
  for (const x of arr) sum += x * 2;   // second pass: O(n)
  return sum;
}
```

Two passes, same array: O(n) + O(n) = **O(n)**.

### Rule 2: Drop lower-order terms

Suppose a function does `n²` steps, then `n` more steps, then 5 steps.

Total: `n² + n + 5`. Should we write O(n² + n + 5)?

No. We write **O(n²)**.

**Why?** When `n` is large, the smaller terms become irrelevant. At `n = 1,000`: `n² = 1,000,000`, `n = 1,000`, `5 = 5`. The n² term is the one that's controlling the speed — the others barely matter. Big-O keeps only the **dominant term**.

```
n² + n + 5    →    O(n²)       (n² dominates)
n log n + n   →    O(n log n)  (n log n dominates)
n + 100       →    O(n)        (n dominates the constant)
```

### The test: "what matters when n is astronomically large?"

When in doubt, ask yourself: "if n were 10 billion, which term in my total-steps formula would dwarf all the others?" Keep that term only.

> ✋ **Pause and try**
> Simplify: `O(5n² + 3n log n + 100n + 999)`. What does it reduce to?
>
> <details>
> <summary>Show answer</summary>
>
> `O(n²)`. Among the terms, n² grows the fastest. The constant multiplier 5 is dropped (Rule 1). The `3n log n`, `100n`, and `999` are lower-order terms (Rule 2). Result: **O(n²)**.
> </details>

> 🎯 **Key takeaway**
> Big-O drops constants (O(2n) → O(n)) and drops lower-order terms (O(n² + n) → O(n²)). You only keep the **single dominant growth term**, no coefficient.

---

<a id="lesson-10"></a>
## Lesson 10 — Analyzing JS code snippets: a step-by-step method

Now let's turn the theory into a practical skill. Here's the method I use every time.

### The method: count the loops, identify their ranges

**Step 1:** Find every loop (for, while, forEach, recursion, etc.).
**Step 2:** For each loop, ask: "how many iterations does this run relative to the input size n?"
**Step 3:** If loops are nested, multiply their iteration counts.
**Step 4:** If loops are sequential (one after the other), add.
**Step 5:** Drop constants and lower-order terms.

Let's apply it to five examples.

---

**Example A — one loop**
```js
function printItems(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
```
- One loop, runs `n` times.
- **Time: O(n). Space: O(1)** (no extra memory).

---

**Example B — two sequential loops**
```js
function twoLoops(arr) {
  for (const a of arr) console.log(a);   // n steps
  for (const b of arr) console.log(b);   // n steps
}
```
- Two loops, sequential (not nested): n + n = 2n.
- Drop the constant 2.
- **Time: O(n). Space: O(1).**

---

**Example C — nested loops**
```js
function printPairs(arr) {
  for (let i = 0; i < arr.length; i++) {         // n times
    for (let j = 0; j < arr.length; j++) {        // n times each
      console.log(arr[i], arr[j]);
    }
  }
}
```
- Outer loop: n. Inner loop: n per outer iteration.
- Total: n × n = n².
- **Time: O(n²). Space: O(1).**

---

**Example D — the fixed cap**
```js
function printFirstTen(arr) {
  for (let i = 0; i < 10 && i < arr.length; i++) {
    console.log(arr[i]);
  }
}
```
- At most 10 iterations, regardless of how large `arr` is.
- A fixed cap makes this a constant number of operations.
- **Time: O(1). Space: O(1).**

This trips people up. "But there's a loop!" Yes — but a loop with a constant upper bound (10, 100, 1,000) is O(1). The work doesn't grow with `n`.

---

**Example E — the halving loop**
```js
function logHalf(n) {
  for (let i = n; i > 0; i = Math.floor(i / 2)) {
    console.log(i);
  }
}
```
- `i` starts at `n`. Each iteration, `i` is halved.
- How many times can you halve `n` before reaching 1? log₂(n) times.
- **Time: O(log n). Space: O(1).**

The key: whenever you divide (rather than subtract) in a loop condition, it's logarithmic.

> ✋ **Pause and try**
> Analyze this snippet:
> ```js
> function mystery(arr1, arr2) {
>   for (const a of arr1) {
>     for (const b of arr2) {
>       console.log(a, b);
>     }
>   }
> }
> ```
> Assume arr1.length = n and arr2.length = m. What's the time complexity?
>
> <details>
> <summary>Show answer</summary>
>
> **O(n × m)** — not O(n²). The two inputs have different sizes. The outer loop runs `n` times, the inner `m` times per outer iteration. If `n` and `m` are equal, this simplifies to O(n²), but the accurate general answer is O(n · m). See Lesson 11 for more on this.
> </details>

> 🎯 **Key takeaway**
> Count the loops, multiply when nested, add when sequential, identify whether the loop variable grows or shrinks by 1 vs by multiplication — and you can read off the complexity of almost any snippet.

---

<a id="lesson-11"></a>
## Lesson 11 — Two loops, two inputs, nested conditionals: common confusions

A few specific patterns trip people up consistently. Let's defuse them.

### Confusion 1: two different inputs

```js
function twoInputs(arr1, arr2) {
  for (const a of arr1) console.log(a);   // let's call this 'n'
  for (const b of arr2) console.log(b);   // let's call this 'm'
}
```

**Wrong answer:** O(2n) → O(n).
**Right answer:** O(n + m), because `arr1` and `arr2` might be completely different sizes.

If someone then told you arr1 and arr2 always have the same length, then yes, O(n + n) = O(n). But in the general case, you must write **O(n + m)**.

### Confusion 2: nested loops, different inputs

```js
function nested(arr1, arr2) {
  for (const a of arr1) {         // n iterations
    for (const b of arr2) {       // m iterations each
      console.log(a, b);
    }
  }
}
```

**Wrong answer:** O(n²).
**Right answer:** O(n · m). If arr2 has 1,000,000 elements and arr1 has 5, this is 5,000,000 operations — O(n · m), not O(n²).

### Confusion 3: loop that ends early

```js
function findFirst(arr, target) {
  for (const item of arr) {
    if (item === target) return item;
  }
}
```

Big-O is about the **worst case** by default (Lesson 14). If `target` is never found, we scan all `n` elements. So: **O(n)**. Even though in the best case we return on the first element.

### Confusion 4: inner loop depends on outer

```js
function triangleLoop(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {   // ← starts at i, not 0
      console.log(arr[i], arr[j]);
    }
  }
}
```

The inner loop doesn't always run `n` times. When `i = 0`, it runs `n` times. When `i = 1`, `n - 1` times. When `i = n-1`, once.

Total iterations: n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 ≈ n²/2.

Drop the constant 1/2: **O(n²)**. Still quadratic, even though the inner loop starts at `i`.

### Confusion 5: work done inside a loop

```js
function copyAndLoop(arr) {
  const copy = [...arr];              // O(n) to create the copy
  for (const item of copy) {         // O(n) loop
    console.log(item);
  }
}
```

The spread `[...arr]` is not free — it iterates `arr` to make a copy. That's O(n). Plus the loop: O(n). Total: O(n) + O(n) = **O(n)**. (Drop constant, keep the single dominant linear term.)

> 🎯 **Key takeaway**
> Use separate variable names for separate inputs: `n` for arr1's length, `m` for arr2's length. Nested loops over different arrays are O(n · m), not O(n²). A half-triangle loop is still O(n²). Always reason about the worst case unless told otherwise.

---

<a id="lesson-12"></a>
## Lesson 12 — Space complexity: memory counts too

So far we've only talked about *time*. But algorithms also use *memory*, and that matters — especially in environments with strict memory limits.

**Space complexity** measures how much extra memory an algorithm uses, expressed as a function of input size `n`.

The key word is **"extra"** — we usually don't count the space taken by the input itself (since that's given). We count additional data structures the algorithm creates.

### O(1) space — constant memory

```js
// Only uses a few variables, regardless of input size
function sum(arr) {
  let total = 0;                       // one variable
  for (const x of arr) total += x;
  return total;
}
```

No arrays, no hash maps created. Just a few scalar variables. **Space: O(1)**.

### O(n) space — linear memory

```js
// Creates a new array the same size as input
function doubled(arr) {
  return arr.map(x => x * 2);          // new array of length n
}
```

The returned array is the same length as `arr`. **Space: O(n)**.

```js
// Building a hash map from input
function countFrequencies(arr) {
  const freq = new Map();              // up to n entries
  for (const x of arr) {
    freq.set(x, (freq.get(x) ?? 0) + 1);
  }
  return freq;
}
```

Up to `n` unique entries in the Map. **Space: O(n)**.

### O(n) space from recursion

```js
// Recursive sum: O(n) space due to call stack
function recursiveSum(arr, i = 0) {
  if (i === arr.length) return 0;
  return arr[i] + recursiveSum(arr, i + 1);
}
```

Even though no explicit data structures are created, every recursive call adds a frame to the **call stack**. With depth `n`, that's O(n) stack space.

### O(n²) space

```js
// Building an n×n matrix: O(n²) space
function buildMatrix(n) {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push(new Array(n).fill(0));
  }
  return matrix;
}
```

n rows, each with n columns: n² cells total. **Space: O(n²)**.

> 💡 **Tip**
> When you see "in-place" in a problem description, it's asking you to use O(1) or O(log n) extra space — don't create a new array of the same size as input.

> ✋ **Pause and try**
> You write a binary search function. How much space does it use?
>
> <details>
> <summary>Show answer</summary>
>
> The iterative version uses O(1) space — just a few pointer variables (`left`, `right`, `mid`). The recursive version uses O(log n) space for the call stack (the recursion depth is log₂n before hitting the base case).
> </details>

> 🎯 **Key takeaway**
> Space complexity counts extra memory created by the algorithm — new arrays, maps, sets, and call stack depth. O(1) = constant; O(n) = linear; O(n²) = one entry per pair. Recursive algorithms often have hidden O(n) or O(log n) space from the call stack.

---

<a id="lesson-13"></a>
## Lesson 13 — Amortized complexity: the "averaged cost" idea

Here's a situation that breaks the simple model: **most operations are cheap, but occasionally one is expensive.**

**The analogy: a stretchy bag.**

You buy a bag that holds exactly 4 items. Every time you add an item, it costs $1. But when the bag is full and you add one more item, the bag magically doubles in size — but that doubling costs $4 (copying all existing items to the bigger bag).

So the sequence of costs is: $1, $1, $1, $1, $4, $1, $1, $1, $1, $8, $1, ...

The average cost per item? Spread the expensive doublings across all the items that caused them, and you get roughly $2 per item. **O(1) amortized.**

This is exactly how JavaScript arrays work. `Array.push()` is usually O(1) — just drop the item in the next slot. But occasionally, the engine has to grow the internal buffer (copy everything to a larger buffer). That one push is O(n). But averaged across all pushes, each push is O(1).

### Formal definition

**Amortized complexity** is the average cost per operation over a sequence of operations, taking into account occasional expensive operations.

- Push to a dynamic array: O(1) amortized (even though an occasional push is O(n)).
- Any individual operation can be expensive, but *spread across all operations*, it averages out.

### How to think about it in practice

When you see "O(1) amortized" in documentation or discussion, it means:
- "Usually instant. Occasionally expensive. But the expensive ones are rare enough that the average is still constant."

Don't panic if you see a single slow operation. Ask: "how often does this happen across the whole use case?"

> 🔬 **Going deeper (optional)**
> The formal proof uses a "potential function" — a measure of how much "work credit" has been built up. When the array doubles, it uses stored-up credit from all the cheap pushes since the last doubling. This is the "accounting method" or "banker's method" in algorithm analysis. If you want to see the math, look up "amortized analysis dynamic array."

> 🎯 **Key takeaway**
> Amortized complexity averages cost across a sequence of operations. `Array.push` is the canonical example: usually O(1), occasionally O(n) for a resize, but O(1) amortized. When you see "amortized O(1)", it means "fast on average, even though individual operations might spike."

---

<a id="lesson-14"></a>
## Lesson 14 — Worst case, best case, average case

This lesson clarifies something that confuses many beginners: "when you say O(n), do you mean always? Or just sometimes?"

There are three distinct notions:

### Worst case — the ceiling

"What is the maximum possible work for any input of size n?"

This is what Big-O notation typically describes by default. When people say "`indexOf` is O(n)", they mean: in the worst case (the element is at the very end or not present), you scan all n elements.

```js
arr.indexOf(target);
// Best case: O(1) — target is at index 0
// Worst case: O(n) — target is at the last index, or absent
// Average case: O(n/2) = O(n) — on average, scan half the array
```

### Best case — the floor

"What is the minimum possible work for any input of size n?"

Best case is often O(1) for search algorithms (target found immediately). But this isn't very useful for analysis, because you can't always assume the best.

### Average case — the expectation

"What is the expected work for a random/typical input of size n?"

This is the most realistic measure, but it requires knowing the distribution of inputs — which is often hard to reason about. For linear search on a randomly distributed target, the average case is n/2 checks, which is still O(n).

### Why worst case dominates in practice

- You rarely know what inputs will arrive.
- For critical systems, you want guarantees on the ceiling.
- Average case can hide pathological inputs (e.g., quicksort's O(n²) worst case on already-sorted data with poor pivot selection).

In interviews, when someone asks "what's the complexity?" they almost always mean **worst case** unless they explicitly say "average case."

> ⚠️ **Common mistake**
> Students say "but usually it finds the element early, so it's fast." Big-O worst case analysis doesn't care about "usually." It cares about the guarantee you can make to any possible input.

> 🎯 **Key takeaway**
> Big-O = worst case by default. Best case is the minimum (often O(1) for search). Average case is the expected value. For algorithm analysis and interviews, always analyze worst case unless instructed otherwise.

---

<a id="lesson-15"></a>
## Lesson 15 — Common JS pitfalls: hidden O(n) operations

JavaScript has many convenient built-ins. Some of them hide O(n) or worse operations that beginners don't expect. Here's the "gotcha list."

### Pitfall 1: `arr.includes(x)` is O(n)

```js
if (arr.includes(target)) { ... }   // O(n) scan
```

If you call this inside a loop, you get O(n²). Use a `Set` instead if you need repeated membership checks:

```js
const set = new Set(arr);           // O(n) to build, once
if (set.has(target)) { ... }        // O(1) per check
```

### Pitfall 2: `arr.unshift(x)` and `arr.shift()` are O(n)

```js
arr.unshift(newItem);   // shifts every element right — O(n)
arr.shift();            // shifts every element left — O(n)
```

If you need to frequently add/remove from the front, use a different data structure (Linked List, Deque). Or flip your problem so you work with the back of the array.

### Pitfall 3: `arr.sort()` without a comparator is O(n log n) and gives wrong results

```js
[10, 2, 1, 25].sort()          // ["1", "10", "2", "25"] — alphabetical!
[10, 2, 1, 25].sort((a,b) => a - b)   // [1, 2, 10, 25] — correct
```

Not a complexity pitfall per se, but a correctness pitfall: the default sort converts to strings. Always pass a comparator for numeric sorting. (V8 uses Timsort, which is O(n log n) in all cases.)

### Pitfall 4: spread operator `[...arr]` is O(n)

```js
const copy = [...arr];              // O(n) — iterates and copies every element
const merged = [...arr1, ...arr2];  // O(n + m)
```

Spread looks like syntax but it's actually a loop in disguise. Spreading inside another loop makes it O(n²).

```js
// ❌ This is O(n²) — spread inside a loop
for (const item of items) {
  result = [...result, transform(item)];  // spreads growing result each time
}

// ✅ This is O(n)
for (const item of items) {
  result.push(transform(item));           // O(1) per push
}
```

### Pitfall 5: `Object.keys(obj)` and `Object.values(obj)` are O(n)

Where `n` is the number of keys. They iterate all properties to build an array. Fine if you just need them once; problematic inside a loop.

### Pitfall 6: `arr.splice(i, 1)` in the middle is O(n)

```js
arr.splice(5, 1);   // removes index 5, shifts everything from index 6 onward — O(n)
```

If you're removing many elements, consider `filter` instead (one O(n) pass vs. many O(n) splices).

### Pitfall 7: `str.split('')`, `str.slice()`, string concatenation in a loop

Strings in JS are immutable. Every `+` concatenation creates a new string — O(n). Concatenating in a loop: O(n²). Use `.join()` with an array of parts instead.

```js
// ❌ O(n²)
let result = '';
for (const char of chars) result += char;

// ✅ O(n)
const result = chars.join('');
```

> 🎯 **Key takeaway**
> Many "one-liner" JS built-ins hide an O(n) loop. The patterns to watch for: `includes`, `indexOf`, `unshift`, `shift`, spread inside a loop, `splice` in the middle, string concatenation in a loop. When in doubt, check the specification.

---

<a id="lesson-16"></a>
## Lesson 16 — Quick reference: the Big-O cheat sheet

Here's everything distilled. Come back here whenever you need a fast lookup.

### Growth hierarchy (slowest to fastest growth)

```
O(1)          constant       — same time regardless of n
O(log n)      logarithmic    — halves the problem each step
O(n)          linear         — proportional to input size
O(n log n)    linearithmic   — linear × logarithmic (sort barrier)
O(n²)         quadratic      — nested loops
O(n³)         cubic          — triple nested loops
O(2ⁿ)         exponential    — doubles with each increment of n
O(n!)         factorial      — all permutations
```

### Common JS operation complexities

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| `arr[i]` | O(1) | O(1) | Direct address |
| `arr.push(x)` | O(1)* | O(1) | *amortized |
| `arr.pop()` | O(1) | O(1) | |
| `arr.shift()` | O(n) | O(1) | Slides all elements left |
| `arr.unshift(x)` | O(n) | O(1) | Slides all elements right |
| `arr.indexOf(x)` | O(n) | O(1) | Linear scan |
| `arr.includes(x)` | O(n) | O(1) | Linear scan |
| `arr.find(fn)` | O(n) | O(1) | Linear scan |
| `arr.splice(i,c)` | O(n) | O(1) | Shifts elements |
| `arr.slice(a,b)` | O(b-a) | O(b-a) | Copies range |
| `arr.sort(cmp)` | O(n log n) | O(log n) | Timsort in V8 |
| `arr.reverse()` | O(n) | O(1) | |
| `arr.map/filter/forEach` | O(n) | O(n) or O(1) | |
| `arr.reduce` | O(n) | O(1) | |
| `[...arr]` | O(n) | O(n) | Spread copies |
| `[...arr1, ...arr2]` | O(n+m) | O(n+m) | |
| `new Set(arr)` | O(n) | O(n) | Build set |
| `set.has(x)` | O(1) | O(1) | Hash lookup |
| `map.get/set/has` | O(1) | O(1) | Hash lookup |

### The analysis method (condensed)

1. Find all loops.
2. If nested: multiply iteration counts.
3. If sequential: add.
4. A loop with a constant cap (e.g., `i < 10`) is O(1).
5. A loop that divides its index is O(log n).
6. Drop constants (O(2n) → O(n)).
7. Drop lower-order terms (O(n² + n) → O(n²)).
8. Default to worst case.

### Rules of thumb

- **No loops** → likely O(1)
- **One loop over input** → O(n)
- **Loop that halves** → O(log n)
- **Sort** → O(n log n)
- **Nested loops over same input** → O(n²)
- **Recursive calls that branch** → suspect O(2ⁿ) until proven otherwise

---

<a id="lesson-17"></a>
## Lesson 17 — 🔬 Going deeper: Big-Theta (Θ) and Big-Omega (Ω) (optional)

> This section is for the curious. **You can skip it entirely** and still answer every question in this topic and most interview questions.

In formal algorithm analysis, there are three symbols, not just one.

### Big-O (O) — upper bound

"The algorithm takes **at most** this much time in the worst case."

O(n) means: there exist constants `c` and `n₀` such that for all `n ≥ n₀`, the running time T(n) ≤ c·n.

This is what we've been using throughout. It describes a ceiling.

### Big-Omega (Ω) — lower bound

"The algorithm takes **at least** this much time in the best case."

Ω(n) means: there exist constants `c` and `n₀` such that T(n) ≥ c·n for all large enough `n`.

Used to say: "you cannot possibly do better than this." For example, searching an unsorted array has Ω(n) — you must examine every element in the worst case and there's no shortcut.

### Big-Theta (Θ) — tight bound

"The algorithm takes **exactly** this growth rate — upper and lower bounds match."

Θ(n) means both O(n) and Ω(n). The algorithm grows exactly linearly — not just "at most linearly" but also "at least linearly."

For example, summing an array (one pass, no shortcuts, no way to exit early): Θ(n). It's precisely linear.

### Why the distinction matters

In common speech — including most coding interviews — people say "O(n)" when they actually mean "Θ(n)" (an exact bound). When someone says "merge sort is O(n log n)", they mean it's also Θ(n log n) — it's not just bounded above by n log n, it actually hits n log n.

Technically, it's correct to say "bubble sort is O(n!)" — n! is an upper bound. But it's not tight. The tight bound is Θ(n²).

For interview purposes: say "O(n)" and "Θ(n)" — interviewers will understand. If you want to be precise about a lower bound, say "at least Ω(n)" and explain why no faster algorithm exists for that problem.

> 🎯 **Key takeaway**
> O = upper bound (ceiling), Ω = lower bound (floor), Θ = exact bound (tight). In everyday use, "O" is often used to mean "the tight bound." Only the formal distinction matters when proving theoretical limits.

---

<a id="lesson-18"></a>
## Lesson 18 — You did it. Now what?

Big-O is not a topic you master in one reading. You internalize it by doing: looking at code, reasoning out the loops, checking your answers against real measurements.

What you should walk away from this file with:

1. **You understand what Big-O measures** — how work grows relative to input size.
2. **You can identify O(1), O(log n), O(n), O(n log n), O(n²) from code** — by counting and characterizing loops.
3. **You know the rules**: drop constants, drop lower-order terms.
4. **You understand space complexity** — the memory cost alongside the time cost.
5. **You know the key JS pitfalls** — includes, spread, unshift, sort-without-comparator.
6. **You understand amortized complexity** — why `push` is called O(1) even though it occasionally costs O(n).

### What to do next

1. Open [`questions/01-what-is-big-o.md`](./questions/01-what-is-big-o.md).
2. Try to write the answer yourself — no peeking.
3. Move through the questions in order. The snippet-analysis questions (06–13) are the most practical — get comfortable with those.
4. After this topic, go to [`02-Arrays/`](../02-Arrays/) and revisit the complexity table there with fresh eyes. It'll make more sense now.

### Pacing

- **Don't try to memorize every Big-O.** Understand the *reasoning*, and the results will follow.
- **The snippet questions are more important than the conceptual ones** at this stage. You'll internalize the concepts by applying them.
- **When you encounter a new algorithm anywhere**, make a habit of asking: "what's the loop structure? What's the growth?"

You're building a mental habit, not a lookup table. Stick with it.

See you in [Q1](./questions/01-what-is-big-o.md). 💪
