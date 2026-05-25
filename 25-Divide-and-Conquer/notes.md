# Divide and Conquer — Lessons from Zero

> 👋 Hey. This file is for someone who's seen recursion once or twice but never formally studied how to turn it into a technique. We're going to go slow. Each lesson teaches **one small idea**. Don't skip. Don't rush. When you finish a lesson, you should feel a small win. That's the whole goal.
>
> Total reading time at a relaxed pace: about 90–120 minutes. **You absolutely do not have to read it all in one sitting.**

---

## Table of Lessons

1. [The big idea: Divide, Conquer, Combine](#lesson-1)
2. [A real-world example: grading papers with a friend](#lesson-2)
3. [Recursion trees — seeing the work visually](#lesson-3)
4. [Merge Sort — walked through step by step](#lesson-4)
5. [Why merge sort is O(n log n) — and what the log means](#lesson-5)
6. [Quicksort — the faster sibling](#lesson-6)
7. [Quicksort's worst case — and why random pivots help](#lesson-7)
8. [Binary Search — the simplest D&C you already know](#lesson-8)
9. [Fast Exponentiation — pow(x, n) in O(log n)](#lesson-9)
10. [Master Theorem intuition — the 3 cases, gently](#lesson-10)
11. [Karatsuba multiplication — beating O(n²) long multiplication](#lesson-11)
12. [Closest Pair of Points — a D&C preview](#lesson-12)
13. [D&C vs Dynamic Programming — the crucial distinction](#lesson-13)
14. [When is D&C the right tool?](#lesson-14)
15. [Quick reference — complexity summary and templates](#lesson-15)
16. [You did it — what to do next](#lesson-16)

---

<a id="lesson-1"></a>
## Lesson 1 — The big idea: Divide, Conquer, Combine

Here's the entire pattern in three words:

1. **Divide** — break the problem into smaller, independent pieces.
2. **Conquer** — solve each piece recursively (or directly if it's tiny enough).
3. **Combine** — glue the piece-solutions back into an answer for the whole.

That's it. Write it on a sticky note. Stick it somewhere.

Every single algorithm in this chapter is just a specific flavor of this three-step recipe.

Here's a concrete, everyday example: you have 1000 exam papers to grade. Your friend offers to help.

```
              1000 papers
             /            \
       500 papers       500 papers
       (you grade)     (friend grades)
             \            /
          merge your two grade lists
```

You didn't grade 1000. You each graded 500. Then you combined. Divide. Conquer. Combine.

And if each of you had another friend, you'd each divide your 500 into two 250s. The work keeps halving.

> 🎯 **Key takeaway**
> Divide and Conquer = break a problem into independent halves, solve each recursively, merge the results.

---

<a id="lesson-2"></a>
## Lesson 2 — A real-world example: grading papers with a friend

Let's make the grading example even more concrete.

Imagine you're organizing a bracket tournament — like March Madness or Wimbledon. You have 8 players.

```
Round 1:          A vs B    C vs D    E vs F    G vs H
                  ↓         ↓         ↓         ↓
Round 2:       winner1  vs  winner2   winner3  vs  winner4
                       ↓                      ↓
Round 3:           semifinal 1          semifinal 2
                              ↓
Round 4:                   CHAMPION
```

8 players. 3 rounds. How many rounds for 16 players? **4 rounds.** For 32? **5 rounds.**

Every time you double the players, you add **exactly one more round**.

This is the heart of O(log n). When something doubles the input but only adds one step, you've got a logarithm. Keep that example in your head — we'll come back to it constantly.

> 💡 **Tip**
> "How many rounds until one player is left?" is the same question as "how many times can I halve n before reaching 1?" That count is log₂(n).

---

<a id="lesson-3"></a>
## Lesson 3 — Recursion trees — seeing the work visually

When you analyze a D&C algorithm, the tool you'll reach for most is the **recursion tree**. It shows every level of the recursion and how much work is done at each level.

Let's trace merge sort on `[5, 3, 8, 1, 9, 2, 7, 4]` (8 elements).

```
Level 0  (n=8): [5, 3, 8, 1, 9, 2, 7, 4]
                      /              \
Level 1  (n=4): [5, 3, 8, 1]   [9, 2, 7, 4]
                  /      \       /      \
Level 2  (n=2): [5,3] [8,1]  [9,2] [7,4]
                 / \   / \   / \   / \
Level 3  (n=1): [5][3][8][1][9][2][7][4]   ← base case, already sorted
```

Now **merge** back up:

```
Level 3 → Level 2: [3,5] [1,8] [2,9] [4,7]     (merge 4 pairs, 2 work each = 8 total)
Level 2 → Level 1: [1,3,5,8] [2,4,7,9]          (merge 2 pairs, 4 work each = 8 total)
Level 1 → Level 0: [1,2,3,4,5,7,8,9]            (merge 1 pair, 8 work = 8 total)
```

Notice something beautiful: **each level does exactly n = 8 units of merge work**. And there are **log₂(8) = 3 levels**. Total work: 8 × 3 = 24 = n log n.

This is the recursion tree proof of O(n log n) for merge sort, and it's the most important diagram in this entire chapter.

> 🎯 **Key takeaway**
> Draw the recursion tree. Count the work at each level. Multiply levels × work-per-level to get total complexity.

---

<a id="lesson-4"></a>
## Lesson 4 — Merge Sort — walked through step by step

Time to see the actual algorithm. Merge sort has two parts:
- `mergeSort(arr)` — the divide step (calls itself recursively).
- `merge(left, right)` — the combine step (merges two sorted halves).

### Step 1: Split until you can't

```
[5, 3, 8, 1]
  ↙         ↘
[5, 3]     [8, 1]
↙    ↘     ↙    ↘
[5]  [3]  [8]  [1]   ← single elements are trivially "sorted"
```

A single element array is always sorted. That's our **base case**.

### Step 2: Merge sorted halves

Now merge `[5]` and `[3]`:
```
[5]   [3]
  ↑     ↑
  i     j
Compare: 3 < 5, take 3 → result: [3]
Now j is exhausted, take rest of i → result: [3, 5]
```

Merge `[8]` and `[1]`:
```
[8]   [1]
  ↑     ↑
Compare: 1 < 8, take 1 → result: [1]
Take rest → result: [1, 8]
```

Merge `[3, 5]` and `[1, 8]`:
```
[3, 5]   [1, 8]
  ↑         ↑
  i         j

Step 1: 1 < 3, take 1 → [1]
Step 2: 3 < 8, take 3 → [1, 3]
Step 3: 5 < 8, take 5 → [1, 3, 5]
Step 4: take remaining 8 → [1, 3, 5, 8]
```

### The merge function in code

```js
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  // While both halves have elements, take the smaller one
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Drain whichever half still has elements
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}
```

### The full merge sort

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;   // base case

  const mid = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}
```

Read it line by line:
1. If there's 0 or 1 element, it's already sorted — return it.
2. Find the middle.
3. Recursively sort the left half.
4. Recursively sort the right half.
5. Merge the two sorted halves.

> ✋ **Pause and trace**
> Trace `mergeSort([4, 2, 1, 3])` on paper. Draw the split tree going down and the merge steps going back up. What's the final sequence of comparisons?
>
> <details>
> <summary>Show trace</summary>
>
> Split: `[4,2,1,3]` → `[4,2]` and `[1,3]` → `[4],[2]` and `[1],[3]`
>
> Merge pairs: `[2,4]` and `[1,3]`
>
> Merge halves:
> ```
> [2,4]  [1,3]
>   ↑      ↑
> 1 < 2 → [1]
> 2 < 3 → [1,2]
> 3 < 4 → [1,2,3]
> take 4 → [1,2,3,4]
> ```
> </details>

> 🎯 **Key takeaway**
> Merge sort: split to single elements, then merge upward. The merge step is O(n). There are O(log n) levels. Total: O(n log n).

---

<a id="lesson-5"></a>
## Lesson 5 — Why merge sort is O(n log n) — and what the log means

Let's nail this down with a picture. For n = 8:

```
Level 0:  ████████████████████████████████   8 merge ops at this level
Level 1:  ████████████████  ████████████████  8 merge ops total (2 × 4)
Level 2:  ████████  ████████  ████████  ████████  8 merge ops total (4 × 2)
Level 3:  (base case, no merge needed)
```

Every level has exactly **n = 8** total merge operations. And there are **log₂(8) = 3** merge levels.

Total = n × log₂(n) = **8 × 3 = 24 operations**.

For n = 1,024 (roughly 10³): log₂(1024) = 10. So about 10,240 operations.
For n = 1,048,576 (roughly 10⁶): log₂ ≈ 20. So about 20 million operations — about twice as many for 1000× more data.

Compare that to O(n²): for n = 1,024, that's over a million operations.

> 💡 **Tip**
> The "log" in O(n log n) comes from **how many times you can cut the array in half before you hit size 1**. That's log₂(n). Every doubling of n adds exactly one more level.

---

<a id="lesson-6"></a>
## Lesson 6 — Quicksort — the faster sibling

Quicksort uses the same D&C idea but with a twist: instead of **always splitting in the middle** (like merge sort), it picks one element — the **pivot** — and **partitions** the array around it.

After partitioning, every element smaller than the pivot is on its left, every element larger is on its right. The pivot itself is in its **final, sorted position**.

```
Before:  [3, 6, 8, 10, 1, 2, 1]     pivot = 3 (last element, say)

After partitioning around 3:

  [1, 2, 1] | 3 | [6, 8, 10]
   < pivot   pivot   > pivot
              ↑
         pivot is DONE — it'll never move again
```

Now you recursively quicksort the left part `[1, 2, 1]` and the right part `[6, 8, 10]`.

### The Lomuto partition scheme

```js
function partition(arr, low, high) {
  const pivot = arr[high];      // pick last element as pivot
  let i = low - 1;              // i tracks the "boundary" of smaller elements

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];  // swap
    }
  }

  // Place pivot in its correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;   // pivot's final index
}

function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);   // sort left of pivot
    quickSort(arr, pivotIndex + 1, high);  // sort right of pivot
  }
}
```

### Key difference from merge sort

| | Merge Sort | Quicksort |
|---|---|---|
| Split | Always at midpoint | Around pivot (variable) |
| Work | In the **merge** (combine) step | In the **partition** (divide) step |
| Extra space | O(n) for merge | O(log n) average for call stack |
| Stable | Yes | No (Lomuto) |
| Practice | Often preferred for linked lists | Often preferred for arrays |

> 🎯 **Key takeaway**
> Quicksort does the heavy work **during the split** (partition). Merge sort does it **during the combine** (merge). Both end up O(n log n) on average.

---

<a id="lesson-7"></a>
## Lesson 7 — Quicksort's worst case — and why random pivots help

Here's the dark side of quicksort.

If you always pick the last element as pivot and the array is **already sorted**, watch what happens:

```
[1, 2, 3, 4, 5]   pivot = 5

Partition: [] | 5 | [1,2,3,4]   ← left side empty, all on right!

[1, 2, 3, 4]  pivot = 4

Partition: [] | 4 | [1,2,3]   ← same problem again

...and so on, n times.
```

Each time the pivot lands at one extreme and the partition is completely unbalanced. You do O(n) work at each of n levels instead of log n levels.

Total: O(n²) — as slow as bubble sort.

### How to fix it

**Randomize the pivot.**

Before partitioning, swap the last element with a **randomly chosen element**:

```js
function randomPivotPartition(arr, low, high) {
  const randIndex = low + Math.floor(Math.random() * (high - low + 1));
  [arr[randIndex], arr[high]] = [arr[high], arr[randIndex]];  // move pivot to end
  return partition(arr, low, high);   // then run normal Lomuto
}
```

With a random pivot, the probability of getting a really unbalanced split every time is astronomically small. The expected (average) time complexity is O(n log n).

### Hoare partition scheme (the original)

There's also the older Hoare scheme, which scans from both ends toward the middle:

```js
function hoarePartition(arr, low, high) {
  const pivot = arr[Math.floor((low + high) / 2)];
  let i = low - 1;
  let j = high + 1;

  while (true) {
    do { i++; } while (arr[i] < pivot);
    do { j--; } while (arr[j] > pivot);
    if (i >= j) return j;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
```

Hoare typically does fewer swaps than Lomuto and handles duplicates better. Both appear in interviews.

```
Quicksort recursion tree — BEST case (pivot always lands in middle):

                      n
                   /     \
                n/2       n/2       ← level 1: n total work
               / \        / \
            n/4  n/4   n/4  n/4    ← level 2: n total work
            ...
                (log n levels total)
```

> ⚠️ **Watch out**
> Never use a sorted input to test quicksort with a fixed last-element pivot. You'll be there all day waiting for it to finish.

---

<a id="lesson-8"></a>
## Lesson 8 — Binary Search — the simplest D&C you already know

Binary search is the D&C algorithm you've probably used informally without knowing it.

Imagine a dictionary. You're looking for "Mango". You open the middle — it says "Lotus". "Mango" comes after "Lotus" alphabetically, so you **throw away the first half entirely** and search only the second half. Then open the middle of that half. Repeat.

```
Array (sorted): [1, 3, 5, 7, 9, 11, 13]
Looking for: 7

Step 1: mid = index 3 = 7 → FOUND! ✅

Harder case — looking for 11:

[1, 3, 5, 7, 9, 11, 13]
           ↑ mid (=7) → 11 > 7, so search right half

[9, 11, 13]
    ↑ mid (=11) → FOUND! ✅

Still harder — looking for 10:

[1, 3, 5, 7, 9, 11, 13]
           ↑ mid = 7 → 10 > 7, search right

[9, 11, 13]
    ↑ mid = 11 → 10 < 11, search left

[9]
  ↑ mid = 9 → 10 > 9, search right → empty → NOT FOUND
```

Each step **halves** the search space. Starting with n = 1,000,000 elements, after 20 steps you're down to 1. Because 2²⁰ = 1,048,576.

That's O(log n).

### Recursive implementation

```js
function binarySearch(arr, target, low = 0, high = arr.length - 1) {
  if (low > high) return -1;          // base case: not found

  const mid = Math.floor((low + high) / 2);

  if (arr[mid] === target) return mid;    // found
  if (arr[mid] < target)  return binarySearch(arr, target, mid + 1, high);  // search right
  else                    return binarySearch(arr, target, low, mid - 1);   // search left
}
```

Notice the three-step structure:
1. **Divide**: compute `mid`, pick one half.
2. **Conquer**: recurse on the chosen half.
3. **Combine**: nothing to combine — the answer from the subproblem IS the answer.

> 💡 **Tip**
> When the "combine" step is free (trivial), you often see that the recursion tree has only O(log n) levels, and work per level is constant, giving O(log n) total.

> 🎯 **Key takeaway**
> Binary search = D&C where the combine step costs nothing. It's also why you should always keep arrays sorted if you're going to search them repeatedly.

---

<a id="lesson-9"></a>
## Lesson 9 — Fast Exponentiation — pow(x, n) in O(log n)

Let's say you want to compute x^64. The brute-force way multiplies x by itself 64 times.

But wait. x^64 = (x^32)². So if you compute x^32, you get x^64 for free with one more multiplication. And x^32 = (x^16)². And x^16 = (x^8)²...

```
x^64 = (x^32)²              1 multiplication
x^32 = (x^16)²              1 multiplication
x^16 = (x^8)²               1 multiplication
x^8  = (x^4)²               1 multiplication
x^4  = (x^2)²               1 multiplication
x^2  = (x^1)²               1 multiplication
                             ──────────────
                             6 multiplications total (log₂(64) = 6)
```

64 multiplications became 6. That's the power of halving.

For odd exponents, like x^13:
```
x^13 = x · (x^6)²    (since 13 is odd: 13 = 2×6 + 1)
x^6  = (x^3)²
x^3  = x · (x^1)²    (3 is odd: 3 = 2×1 + 1)
x^1  = x
```

```js
function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);

  if (n % 2 === 0) {
    const half = myPow(x, n / 2);
    return half * half;
  } else {
    return x * myPow(x, n - 1);
  }
}
```

This is O(log n) — each call halves n (or reduces it by 1 for odd, which immediately halves next call).

> 🎯 **Key takeaway**
> Any time you can replace "do X n times" with "do X n/2 times, then square the result", you've turned O(n) into O(log n).

---

<a id="lesson-10"></a>
## Lesson 10 — Master Theorem intuition — the 3 cases, gently

The **Master Theorem** is a shortcut for figuring out the complexity of a D&C recurrence without drawing the full recursion tree every time.

A D&C recurrence looks like:

```
T(n) = a · T(n/b) + f(n)
```

Where:
- **a** = how many subproblems you create (e.g., 2 for merge sort).
- **b** = how much smaller each subproblem is (e.g., 2 for merge sort — each is half size).
- **f(n)** = the work done **outside** the recursive calls (the divide + combine cost).

The key comparison is between **f(n)** and **n^(log_b a)**. Think of n^(log_b a) as "the total work at the bottom level" — or roughly, the cost of the leaf nodes in the recursion tree.

### Case 1 — The leaves dominate

If `f(n)` grows **slower** than `n^(log_b a)` (the leaves are doing most of the work):

```
T(n) = Θ(n^(log_b a))
```

Example: `T(n) = 4T(n/2) + n`
- a=4, b=2 → n^(log₂ 4) = n²
- f(n) = n, which grows slower than n²
- Result: **T(n) = Θ(n²)**

### Case 2 — Work is evenly spread across all levels

If `f(n)` grows at **the same rate** as `n^(log_b a)`:

```
T(n) = Θ(n^(log_b a) · log n)
```

Example: `T(n) = 2T(n/2) + n` (merge sort)
- a=2, b=2 → n^(log₂ 2) = n^1 = n
- f(n) = n, same rate
- Result: **T(n) = Θ(n log n)** ✅ confirms our earlier analysis

### Case 3 — The root dominates

If `f(n)` grows **faster** than `n^(log_b a)` (the top level does most of the work):

```
T(n) = Θ(f(n))
```

Example: `T(n) = 2T(n/2) + n²`
- a=2, b=2 → n^(log₂ 2) = n
- f(n) = n², which grows faster than n
- Result: **T(n) = Θ(n²)**

### A simple mnemonic

Think of it like a tug-of-war:

```
   Leaves (n^log_b_a)    vs    Root/combine (f(n))
         ↓                          ↓
   Case 1: leaves win       Case 3: root wins
         Case 2: it's a tie → add a log factor
```

> ⚠️ **Heads up**
> The Master Theorem only applies when the subproblems are equal size (each is n/b). It doesn't directly cover `T(n) = T(n-1) + ...` style recurrences (like selection sort or Tower of Hanoi). For those, you expand the recurrence manually.

Let's work through each of the 7 recurrences from the questions:

```
T(n) = 2T(n/2) + n    → a=2, b=2, n^(log₂2)=n, f(n)=n → CASE 2 → Θ(n log n)
T(n) = 2T(n/2) + 1    → a=2, b=2, n^(log₂2)=n, f(n)=1 → CASE 1 → Θ(n)
T(n) = 4T(n/2) + n    → a=4, b=2, n^(log₂4)=n², f(n)=n → CASE 1 → Θ(n²)
T(n) = 7T(n/2) + n²   → a=7, b=2, n^(log₂7)≈n^2.807, f(n)=n² → CASE 1 → Θ(n^2.807)
T(n) = T(n/2) + 1     → a=1, b=2, n^(log₂1)=n⁰=1, f(n)=1 → CASE 2 → Θ(log n)
T(n) = T(n-1) + n     → not Master Theorem form; expand: n+(n-1)+…+1 = Θ(n²)
T(n) = 2T(n-1) + 1   → not Master Theorem form; expand: 2^n - 1 = Θ(2^n)
```

> 🎯 **Key takeaway**
> Master Theorem: compare f(n) to n^(log_b_a). If leaves dominate → Θ(n^(log_b_a)). If tied → Θ(n^(log_b_a) · log n). If root dominates → Θ(f(n)).

---

<a id="lesson-11"></a>
## Lesson 11 — Karatsuba multiplication — beating O(n²) long multiplication

You were taught long multiplication in school. For two n-digit numbers, it takes O(n²) single-digit multiplications. For a long time, people thought that was the theoretical minimum for multiplication.

Then in 1960, Anatoly Karatsuba found a D&C trick that does it in **O(n^1.585)**.

### The idea

Want to multiply two numbers x and y, each with 2n digits?

Split each number into two halves:
```
x = a · 10^n + b     (a is the left half, b is the right half)
y = c · 10^n + d

x · y = a·c · 10^(2n) + (a·d + b·c) · 10^n + b·d
```

That's **4 multiplications** of n-digit numbers. Karatsuba's insight: compute the middle term `a·d + b·c` using only **3 multiplications** instead of 4:

```
Let:
  p = a · c
  q = b · d
  r = (a + b) · (c + d)   ← one multiplication

Then: a·d + b·c = r - p - q   ← just additions and subtractions!
```

So `x · y = p · 10^(2n) + (r - p - q) · 10^n + q`

3 half-sized multiplications instead of 4. The recurrence:

```
T(n) = 3 · T(n/2) + O(n)
```

By Master Theorem: a=3, b=2, n^(log₂3) ≈ n^1.585. f(n) = n is slower → CASE 1 → **T(n) = Θ(n^1.585)**.

```
Recursion tree for Karatsuba (4-digit × 4-digit):

              4×4
           /   |   \
         2×2  2×2  2×2
        / | \ / | \ / | \
       1  1  1  1  1  1  1  1  1    ← leaf multiplications
```

9 leaf multiplications instead of 16 (which is what naive 4×4 would need). For large numbers (thousands of digits, used in cryptography), this matters enormously.

> 💡 **Tip**
> Karatsuba shows that O(n²) is NOT always a floor for a problem. Sometimes a clever D&C strategy can improve an algorithm that's been taught in schools for centuries.

---

<a id="lesson-12"></a>
## Lesson 12 — Closest Pair of Points — a D&C preview

Here's a trickier D&C problem: given n points in a 2D plane, find the two points closest to each other.

**Brute force**: compare every pair. O(n²).

**D&C in O(n log n)**:

```
Step 1 — Divide:
   Sort points by x-coordinate.
   Split into left half and right half.

              ·   ·
         ·  |  ·   ·
        ·   | ·      ·
         ·  |  ·
       LEFT | RIGHT
            ↑
         dividing line

Step 2 — Conquer:
   Recursively find the closest pair in the left half → distance d_left.
   Recursively find the closest pair in the right half → distance d_right.
   Let d = min(d_left, d_right).

Step 3 — Combine (the clever part):
   The overall closest pair might cross the dividing line.
   But the crossing-pair points must both be within distance d of the line.
   So we only need to check points in a "strip" of width 2d around the line.

            ←d→|←d→
               |
         ·   · | ·   ·
          ·    |  ·
               |    ·
               |
```

The key insight: within the strip, it turns out **each point needs to be compared to at most 7 others**. This is a geometric fact (proven by packing argument). So the strip check is O(n), not O(n²).

Total recurrence: `T(n) = 2T(n/2) + O(n log n)` (the log n comes from sorting the strip).

The Master Theorem gives O(n log² n). With a smarter sort, O(n log n).

> 🔬 **Going deeper**
> The proof that each strip point has at most 7 neighbors within distance d uses the fact that you can pack at most 8 circles of diameter d/2 in a d×2d rectangle. This is one of those beautiful geometry+algorithm proofs.

---

<a id="lesson-13"></a>
## Lesson 13 — D&C vs Dynamic Programming — the crucial distinction

You're about to enter a topic (Dynamic Programming) where students often ask: "Wait, isn't this just Divide and Conquer with recursion?"

Great question. Here's the difference:

### Divide and Conquer: subproblems are INDEPENDENT

In merge sort, after you split into left and right halves, those two halves **have nothing to do with each other**. Solving the left half doesn't affect or inform the right half's solution. They're completely separate. The only interaction is at the combine step.

```
merge sort:
  left half [5,3,8,1] ← completely separate ← right half [9,2,7,4]
  solving left doesn't help solving right
```

### Dynamic Programming: subproblems OVERLAP

In Fibonacci:
```
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)
fib(3) = fib(2) + fib(1)
```

`fib(3)` is needed by both `fib(5)` and `fib(4)`. `fib(2)` is needed by both `fib(4)` and `fib(3)`. If you naively use D&C here, you recompute the same subproblem **exponentially many times**.

```
fib(5)
├── fib(4)
│   ├── fib(3)          ← computed here
│   │   ├── fib(2)      ← computed here
│   │   └── fib(1)
│   └── fib(2)          ← recomputed!
└── fib(3)              ← recomputed!
    ├── fib(2)          ← recomputed again!
    └── fib(1)
```

DP's answer: **memoize** (cache) the results so each subproblem is solved exactly once.

### The test

> When you see a recursive problem: "Are the subproblems independent of each other?"
> - **Yes, they don't overlap** → pure D&C (merge sort, quicksort, binary search, Karatsuba).
> - **No, they share sub-subproblems** → Dynamic Programming (Fibonacci, longest common subsequence, 0/1 knapsack).

> 🎯 **Key takeaway**
> D&C works best when subproblems are **non-overlapping**. When the same sub-subproblems get reused, DP (with memoization) is the right tool.

---

<a id="lesson-14"></a>
## Lesson 14 — When is D&C the right tool?

Here's a checklist. If most of these are true, reach for D&C:

**1. The problem has a natural "half-and-half" structure.**
   - "Sort this array" → split in half, sort each half, merge.
   - "Search in sorted array" → which half can it be in?
   - "Find closest pair" → split by x-coordinate.

**2. Subproblems are the same type as the original problem.**
   - Sorting half an array is the same problem as sorting the whole array.
   - Searching half an array is the same problem as searching the whole.
   - This is the recursion structure — each recursive call solves a *smaller* version of the same problem.

**3. Combining sub-answers is cheap (O(n) or less).**
   - Merge sort: O(n) combine.
   - Binary search: O(1) combine (the answer from the subproblem is the final answer).
   - If combining is O(n²), you might not gain anything.

**4. Subproblems don't overlap.**
   - (As discussed in Lesson 13.)

**Common applications:**
```
Algorithm         Problem Type             Complexity
──────────────────────────────────────────────────────
Merge sort        Sorting                  O(n log n)
Quicksort         Sorting                  O(n log n) avg
Quickselect       Order statistics         O(n) avg
Binary search     Searching in sorted      O(log n)
Fast exponent     Pow(x, n)                O(log n)
Karatsuba         Large integer multiply   O(n^1.585)
Closest pair      Geometry                 O(n log n)
Strassen          Matrix multiply          O(n^2.807)
FFT               Polynomial multiply      O(n log n)
```

> ⚠️ **Watch out**
> D&C is not always the best tool. For Dynamic Programming problems (overlapping subproblems), D&C without memoization leads to exponential blowup. And for simple linear scans (like Kadane's algorithm for max subarray), O(n) beats O(n log n) D&C.

---

<a id="lesson-15"></a>
## Lesson 15 — Quick reference

### Complexity cheat sheet

| Algorithm | Recurrence | Result | Case |
|---|---|---|---|
| Merge sort | T(n) = 2T(n/2) + n | Θ(n log n) | MT Case 2 |
| Quicksort (avg) | T(n) = 2T(n/2) + n | Θ(n log n) | MT Case 2 |
| Quicksort (worst) | T(n) = T(n-1) + n | Θ(n²) | expand |
| Binary search | T(n) = T(n/2) + 1 | Θ(log n) | MT Case 2 |
| Fast exponent | T(n) = T(n/2) + 1 | Θ(log n) | MT Case 2 |
| Karatsuba | T(n) = 3T(n/2) + n | Θ(n^1.585) | MT Case 1 |
| Strassen | T(n) = 7T(n/2) + n² | Θ(n^2.807) | MT Case 1 |
| Naive matrix | T(n) = 4T(n/2) + n | Θ(n²) | MT Case 1 |
| Selection sort | T(n) = T(n-1) + n | Θ(n²) | expand |
| Tower of Hanoi | T(n) = 2T(n-1) + 1 | Θ(2^n) | expand |

### Master Theorem quick-apply

```
T(n) = a·T(n/b) + f(n)

Compute critical exponent: c = log_b(a)

f(n) = O(n^(c-ε)) for some ε > 0  →  Case 1: T(n) = Θ(n^c)
f(n) = Θ(n^c)                     →  Case 2: T(n) = Θ(n^c · log n)
f(n) = Ω(n^(c+ε)) for some ε > 0  →  Case 3: T(n) = Θ(f(n))
```

### D&C code template

```js
function divideAndConquer(problem) {
  // Base case: problem is small enough to solve directly
  if (problem.size <= BASE_CASE_THRESHOLD) {
    return solveDirectly(problem);
  }

  // Divide
  const [subproblem1, subproblem2] = divide(problem);

  // Conquer (recursively)
  const result1 = divideAndConquer(subproblem1);
  const result2 = divideAndConquer(subproblem2);

  // Combine
  return combine(result1, result2);
}
```

### Merge sort template

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length)
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

### Binary search template

```js
function binarySearch(arr, target, lo = 0, hi = arr.length - 1) {
  if (lo > hi) return -1;
  const mid = (lo + hi) >> 1;
  if (arr[mid] === target) return mid;
  if (arr[mid] < target)  return binarySearch(arr, target, mid + 1, hi);
  return binarySearch(arr, target, lo, mid - 1);
}
```

---

<a id="lesson-16"></a>
## Lesson 16 — You did it. Now what?

Take a breath. Here's what you should carry away from these notes:

1. **The pattern is always the same**: Divide → Conquer → Combine.
2. **Recursion trees are your analysis tool**: draw the tree, count work per level, multiply by levels.
3. **Why n log n**: n work per level × log n levels. Draw it until it's automatic.
4. **Master Theorem is a shortcut**: compare f(n) to n^(log_b_a). Three cases.
5. **D&C vs DP**: independent subproblems → D&C. Overlapping subproblems → DP.
6. **Pivot choice matters**: random pivot saves quicksort from its O(n²) worst case.

### What to do next

1. Open [`questions/01-recurrence-merge-sort.md`](./questions/01-recurrence-merge-sort.md).
2. For the recurrence analysis questions (01–07), work through the Master Theorem steps on paper first.
3. For coding questions, write out the recursion tree before you write code.
4. If you get stuck: come back here and reread the relevant lesson. Then peek at the hints.
5. After solving each question, tick the box in [`README.md`](./README.md).

### Pacing suggestion

- Start with the 7 recurrence drills (01–07). They're theory — fast to do.
- Do 08 (binary search) and 09 (merge sort) next. Fundamental implementations.
- 10 (quicksort) and 11 (quickselect) together.
- Skip to 13 (pow) — it's short and satisfying.
- Work through the Mediums.
- The Hards (21–29) require combining D&C with other techniques (heaps, geometry). Come back after you've done a couple of those other topics.

You've got this. See you in [Q1](./questions/01-recurrence-merge-sort.md). 💪
