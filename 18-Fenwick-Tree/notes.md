# Fenwick Tree (Binary Indexed Tree) — Lessons from Zero

> 👋 Hey. This file is for someone who's never seen a Fenwick Tree before. We're going to go slow. Every lesson teaches **one small idea** and builds on the last. Don't skip ahead — the magic only clicks once you've seen each piece in order.
>
> Total reading time at a relaxed pace: about 90 minutes with breaks. **You do not have to read it all at once.**

---

## Table of Lessons

1. [The problem we're solving — fast range sums](#lesson-1)
2. [The naïve solutions and their pain points](#lesson-2)
3. [Why we want something between "too simple" and "too complex"](#lesson-3)
4. [Meet the Fenwick Tree — the smart receipt book](#lesson-4)
5. [Binary numbers — a quick refresher you actually need](#lesson-5)
6. [The lowbit trick: `x & -x`](#lesson-6)
7. [Why we use 1-indexed arrays](#lesson-7)
8. [How the tree is laid out in one flat array](#lesson-8)
9. [The `update` operation — step by step](#lesson-9)
10. [The `query` operation — step by step](#lesson-10)
11. [Range query: `query(r) - query(l - 1)`](#lesson-11)
12. [Why BIT is faster and simpler than a Segment Tree in practice](#lesson-12)
13. [What BIT cannot do (and why)](#lesson-13)
14. [Advanced: range-update + point-query with a difference array](#lesson-14)
15. [Advanced: range-update + range-query with two BITs](#lesson-15)
16. [2D BIT — a sneak peek](#lesson-16)
17. [Quick reference](#lesson-17)
18. [You did it — what to do next](#lesson-18)

---

<a id="lesson-1"></a>
## Lesson 1 — The problem we're solving

Imagine you are in a warehouse, and there is a long shelf of bins numbered 1 through `n`. Each bin holds some quantity of a product. Throughout the day two things happen repeatedly:

1. **A shipment arrives** — the count in bin `i` changes by some amount.
2. **A manager asks** — "what is the total count across bins 3 through 17?"

You need to answer each question **instantly** — or at least much faster than counting every bin by hand.

This is the **range-sum query with point updates** problem. It sounds straightforward, but as your data grows from a hundred bins to a million, the naïve approaches start to hurt.

> 🎯 **Key takeaway**
> We need a data structure that handles two operations efficiently:
> 1. `update(i, delta)` — add `delta` to position `i`.
> 2. `rangeQuery(l, r)` — return the sum of all values from index `l` to `r`.

---

<a id="lesson-2"></a>
## Lesson 2 — The naïve solutions and their pain points

### Option A — Plain array

```js
const arr = new Array(n + 1).fill(0);

function update(i, delta) {
  arr[i] += delta;          // O(1) ← fast!
}

function rangeQuery(l, r) {
  let sum = 0;
  for (let i = l; i <= r; i++) sum += arr[i];
  return sum;               // O(n) ← slow for large ranges
}
```

**Problem:** if `n = 1,000,000` and you ask for the sum of the entire range, you touch a million elements every time. If a manager asks 10,000 questions per second, you have a problem.

### Option B — Prefix sum array

Pre-compute `prefix[i] = arr[1] + arr[2] + ... + arr[i]`.

```
Range sum [l, r] = prefix[r] - prefix[l - 1]
```

Now the query is O(1)! But...

```js
function update(i, delta) {
  // have to update EVERY prefix entry from i onwards
  for (let j = i; j <= n; j++) prefix[j] += delta;
  // O(n) ← slow!
}
```

**Problem:** every update has to fix potentially millions of prefix entries.

### The conflict

| Structure    | Update | Query |
|-------------|--------|-------|
| Plain array  | O(1)   | O(n)  |
| Prefix array | O(n)   | O(1)  |

We want **both** to be fast. Can we do O(log n) for each? Yes — that's exactly what a Fenwick Tree gives you.

> 🎯 **Key takeaway**
> A plain array is fast to update but slow to query. A prefix array is fast to query but slow to update. We need something in between.

---

<a id="lesson-3"></a>
## Lesson 3 — Why we want something between "too simple" and "too complex"

Before we get to the Fenwick Tree, you might ask: "why not just use a Segment Tree?"

A Segment Tree absolutely works. It handles range sums, range minimums, range maximums, and many other operations. But it comes with a cost:

- A segment tree for `n` elements needs `4 * n` storage.
- Its implementation is about 30–50 lines of code with careful indexing.
- It's less CPU-cache-friendly because nodes are spread across an array.

For the **specific** case of prefix sums (and a few related operations), there's a smarter structure: the **Fenwick Tree**, also known as the **Binary Indexed Tree** (BIT). It was invented by Peter Fenwick in 1994.

It needs only `n + 1` storage. Its implementation is 5–10 lines. It runs faster in practice because the data is contiguous in memory.

But there's a catch — it only works for operations that have an **inverse** (like addition/subtraction). It can't do range minimum or range maximum directly. More on that in Lesson 13.

> 💡 **Tip**
> When you see "range sum + point update" in a problem, reach for BIT first. When you see range min/max, reach for a Segment Tree.

---

<a id="lesson-4"></a>
## Lesson 4 — Meet the Fenwick Tree — the smart receipt book

Here's a real-world analogy that captures the idea.

You're an accountant at a grocery store. Customers pay for items one by one (point updates), and the manager periodically asks "how much have we taken in so far from customer 1 through customer 12?" (prefix query).

Instead of recalculating from scratch each time, you maintain a **smart receipt book** where each page is responsible for a *range* of customers — and different pages cover different-sized ranges. When a customer pays, you update the one or two pages responsible for that customer. When the manager asks, you add up the few pages that together cover the range — no more.

The cleverness is in choosing *which pages cover which ranges*. The Fenwick Tree uses binary number patterns to make this choice in a way that guarantees you never touch more than `log₂(n)` pages for any update or query.

That's the whole idea. Everything else is just the math that implements it.

> 🎯 **Key takeaway**
> A Fenwick Tree is a smart receipt book. Each cell is responsible for a range of the original array. Updates and queries each touch at most O(log n) cells.

---

<a id="lesson-5"></a>
## Lesson 5 — Binary numbers — a quick refresher you actually need

The Fenwick Tree is driven entirely by a single operation on binary numbers. So let's make sure binary is comfortable before we go further.

Every integer has a representation in **base 2** (binary), using only the digits `0` and `1`.

```
Decimal   Binary
───────   ──────
  1       0001
  2       0010
  3       0011
  4       0100
  5       0101
  6       0110
  7       0111
  8       1000
  9       1001
 10       1010
 11       1011
 12       1100
```

The **rightmost bit that is `1`** is called the **lowest set bit** or **least significant bit (LSB)**. It tells you the position of the smallest power of 2 in that number.

```
  6 in binary: 1 1 0
                │ │ └── bit 0 (value 1) → off
                │ └──── bit 1 (value 2) → ON  ← lowest set bit is bit 1 → LSB value = 2
                └────── bit 2 (value 4) → on

  12 in binary: 1 1 0 0
                │ │ │ └── bit 0 (value 1) → off
                │ │ └──── bit 1 (value 2) → off
                │ └────── bit 2 (value 4) → ON  ← lowest set bit is bit 2 → LSB value = 4
                └──────── bit 3 (value 8) → on
```

| Number | Binary | Lowest set bit position | LSB value |
|--------|--------|------------------------|-----------|
| 1      | 0001   | 0                      | 1         |
| 2      | 0010   | 1                      | 2         |
| 3      | 0011   | 0                      | 1         |
| 4      | 0100   | 2                      | 4         |
| 5      | 0101   | 0                      | 1         |
| 6      | 0110   | 1                      | 2         |
| 7      | 0111   | 0                      | 1         |
| 8      | 1000   | 3                      | 8         |
| 12     | 1100   | 2                      | 4         |

Notice the pattern: if a number has its lowest set bit at position `k`, then the LSB value is `2^k`. For powers of 2 (1, 2, 4, 8, 16…), the LSB value equals the number itself.

> ✋ **Pause and try**
> What is the lowest set bit value of 10? Of 16? Of 7?
>
> <details>
> <summary>Show answer</summary>
>
> - 10 in binary is `1010`. Lowest set bit is bit 1 → LSB value = **2**.
> - 16 in binary is `10000`. Lowest set bit is bit 4 → LSB value = **16**.
> - 7 in binary is `0111`. Lowest set bit is bit 0 → LSB value = **1**.
> </details>

---

<a id="lesson-6"></a>
## Lesson 6 — The lowbit trick: `x & -x`

Here's the magic formula at the heart of every Fenwick Tree:

```js
function lowbit(x) {
  return x & -x;
}
```

This extracts the **value** of the lowest set bit of `x`. Let's see why it works.

### Why does `-x` flip the right bits?

In computers, negative numbers are stored in **two's complement**. To negate a number:
1. Flip all bits.
2. Add 1.

Let's walk through it for `x = 6`:

```
x  =  6:   0 0 0 0 0 1 1 0
Step 1 — flip all bits:
           1 1 1 1 1 0 0 1
Step 2 — add 1:
           1 1 1 1 1 0 1 0
So -x = -6 = 1111 1010

Now AND them together:
  x  =  0 0 0 0 0 1 1 0
 -x  =  1 1 1 1 1 0 1 0
x&-x =  0 0 0 0 0 0 1 0  ← that's 2
```

The AND of `x` and `-x` isolates exactly the lowest set bit. Here's the pattern:

```
x = 1:  binary 0001   -x = 1111   x & -x = 0001 = 1
x = 2:  binary 0010   -x = 1110   x & -x = 0010 = 2
x = 3:  binary 0011   -x = 1101   x & -x = 0001 = 1
x = 4:  binary 0100   -x = 1100   x & -x = 0100 = 4
x = 5:  binary 0101   -x = 1011   x & -x = 0001 = 1
x = 6:  binary 0110   -x = 1010   x & -x = 0010 = 2
x = 7:  binary 0111   -x = 1001   x & -x = 0001 = 1
x = 8:  binary 1000   -x = 1000   x & -x = 1000 = 8
x = 12: binary 1100   -x = 0100   x & -x = 0100 = 4
```

> 🎯 **Key takeaway**
> `x & -x` gives you the value of the lowest set bit of `x`. This one formula is the engine that drives both the `update` and `query` operations of a Fenwick Tree.

> 💡 **Tip**
> You'll see this written as `i & -i` inside BIT code. It's the same thing — just applied to the index `i`. You do not need to understand two's complement deeply. Just trust the pattern: `i & -i` = "the power of 2 hidden in the rightmost 1-bit of `i`."

---

<a id="lesson-7"></a>
## Lesson 7 — Why we use 1-indexed arrays

Most JavaScript arrays start at index 0. But Fenwick Trees use **1-indexed** arrays — everything starts at 1.

Why? Because `lowbit(0) = 0 & -0 = 0`, and if we ever call `update(0, ...)` or `query(0)`, we'd loop forever:

```js
// query loop: i -= i & -i
// if i = 0: 0 -= lowbit(0) → 0 -= 0 → i stays 0 → infinite loop!
```

By reserving index 0 and starting at 1, we guarantee:
- `lowbit(i) >= 1` for all `i >= 1`.
- Both loops always terminate.

In practice, if the problem gives you a 0-indexed array `arr`, you just say "BIT index 1 corresponds to `arr[0]`" and shift by 1 everywhere. This is a minor adjustment you'll do naturally after a couple of problems.

```js
class BIT {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0);   // n+1 slots, index 0 unused
  }
}
```

> ⚠️ **Common mistake**
> Forgetting to allocate `n + 1` slots (so index `n` is valid) or forgetting to shift 0-indexed inputs to 1-indexed before calling `update`/`query`. Always double-check your indexing.

---

<a id="lesson-8"></a>
## Lesson 8 — How the tree is laid out in one flat array

This is the part that looks magical at first. The Fenwick Tree is stored as a single flat array `tree[1..n]`, but each cell `tree[i]` doesn't store just one value — it stores the **sum of a range** of the original data.

Specifically:

> `tree[i]` stores the sum of `arr[i - lowbit(i) + 1]` through `arr[i]`.

Let's work this out for `n = 8`:

```
Index i   lowbit(i)   Range covered by tree[i]
─────────────────────────────────────────────────
  1         1           arr[1..1]      (length 1)
  2         2           arr[1..2]      (length 2)
  3         1           arr[3..3]      (length 1)
  4         4           arr[1..4]      (length 4)
  5         1           arr[5..5]      (length 1)
  6         2           arr[5..6]      (length 2)
  7         1           arr[7..7]      (length 1)
  8         8           arr[1..8]      (length 8)
```

Picture it as a ladder where each rung covers a different range:

```
Index:  1   2   3   4   5   6   7   8

tree[8] ───────────────────────────────  covers all 8
tree[4] ─────────────────              covers 1–4
tree[2] ─────────                      covers 1–2
tree[6] ─────────────────────          covers 5–6
tree[1] ───                            covers just 1
tree[3] ─────────                      covers just 3
tree[5] ─────────────────              covers just 5
tree[7] ─────────────────────          covers just 7
```

This overlapping arrangement, driven by the lowbit values, is what makes both update and query so fast: every operation traverses a path of at most `log₂(n)` cells.

> 💡 **Tip**
> You do not need to memorize this layout. Just remember: each `tree[i]` cell stores a partial sum, and the lowbit of `i` tells you exactly how big that partial sum is. The rest falls out of the two loops.

---

<a id="lesson-9"></a>
## Lesson 9 — The `update` operation — step by step

When you update position `i` by adding `delta`, you need to update every `tree` cell that **covers** index `i`. Those cells form a chain that you walk upward by repeatedly **adding** `lowbit(i)` to `i`.

```js
update(i, delta) {
  for (; i <= this.n; i += i & -i) {
    this.tree[i] += delta;
  }
}
```

Let's trace `update(3, +5)` on a BIT of size 8:

```
Step 1:  i = 3,  lowbit(3) = 1,  update tree[3],  i becomes 3 + 1 = 4
Step 2:  i = 4,  lowbit(4) = 4,  update tree[4],  i becomes 4 + 4 = 8
Step 3:  i = 8,  lowbit(8) = 8,  update tree[8],  i becomes 8 + 8 = 16
Step 4:  i = 16 > n = 8  →  stop
```

We touched exactly 3 cells. For any `n`, you'll touch at most `log₂(n)` cells because each step at least doubles `i` (actually it moves to the next "ancestor" in the binary tree). For `n = 1,000,000` that's at most 20 steps.

Let's trace another: `update(6, +2)`:

```
Step 1:  i = 6,  lowbit(6) = 2,  update tree[6],  i becomes 6 + 2 = 8
Step 2:  i = 8,  lowbit(8) = 8,  update tree[8],  i becomes 8 + 8 = 16
Step 3:  i = 16 > 8  →  stop
```

Two cells. Fast.

> ✋ **Pause and try**
> Trace `update(5, +3)` on a BIT of size 8. Which cells get updated?
>
> <details>
> <summary>Show answer</summary>
>
> ```
> i = 5,  lowbit(5) = 1,  update tree[5],  i = 5 + 1 = 6
> i = 6,  lowbit(6) = 2,  update tree[6],  i = 6 + 2 = 8
> i = 8,  lowbit(8) = 8,  update tree[8],  i = 8 + 8 = 16  → stop
> ```
> Cells updated: `tree[5]`, `tree[6]`, `tree[8]`.
> </details>

> 🎯 **Key takeaway**
> `update(i, delta)`: walk upward by adding `lowbit(i)` at each step. This updates exactly the cells that cover position `i`. At most O(log n) steps.

---

<a id="lesson-10"></a>
## Lesson 10 — The `query` operation — step by step

The **prefix query** `query(i)` returns the sum of all elements from index 1 through index `i`. You get it by collecting the cells that together cover `[1..i]` without overlap. You walk **downward** by repeatedly **subtracting** `lowbit(i)` from `i`.

```js
query(i) {
  let s = 0;
  for (; i > 0; i -= i & -i) {
    s += this.tree[i];
  }
  return s;
}
```

Let's trace `query(7)` on a BIT of size 8:

```
Step 1:  i = 7,  lowbit(7) = 1,  s += tree[7]  (covers arr[7])
         i becomes 7 - 1 = 6
Step 2:  i = 6,  lowbit(6) = 2,  s += tree[6]  (covers arr[5..6])
         i becomes 6 - 2 = 4
Step 3:  i = 4,  lowbit(4) = 4,  s += tree[4]  (covers arr[1..4])
         i becomes 4 - 4 = 0
Step 4:  i = 0  →  stop

Total: tree[7] + tree[6] + tree[4]  =  arr[7] + arr[5..6] + arr[1..4]
                                     =  arr[1..7]  ✅
```

The three cells we collected — `tree[4]` (covers 1–4), `tree[6]` (covers 5–6), `tree[7]` (covers 7) — tile the range `[1..7]` exactly without overlap.

Let's trace `query(6)`:

```
Step 1:  i = 6,  lowbit(6) = 2,  s += tree[6]  (covers arr[5..6])
         i becomes 6 - 2 = 4
Step 2:  i = 4,  lowbit(4) = 4,  s += tree[4]  (covers arr[1..4])
         i becomes 4 - 4 = 0  →  stop

Total: tree[6] + tree[4]  =  arr[5..6] + arr[1..4]  =  arr[1..6]  ✅
```

Two steps only. Beautiful.

> ✋ **Pause and try**
> Trace `query(5)` on a BIT of size 8. Which cells are summed?
>
> <details>
> <summary>Show answer</summary>
>
> ```
> i = 5,  lowbit(5) = 1,  s += tree[5]  (covers arr[5])
> i = 4,  lowbit(4) = 4,  s += tree[4]  (covers arr[1..4])
> i = 0  → stop
> ```
> Cells: `tree[5]` + `tree[4]` = arr[5] + arr[1..4] = arr[1..5] ✅
> </details>

> 🎯 **Key takeaway**
> `query(i)`: walk downward by subtracting `lowbit(i)` at each step. The cells you collect tile `[1..i]` without overlap. At most O(log n) steps.

---

<a id="lesson-11"></a>
## Lesson 11 — Range query: `query(r) - query(l - 1)`

So far we've only done **prefix** queries (sum from 1 to `i`). What if you want the sum over an arbitrary range `[l, r]`?

Simple subtraction:

```
sum(l, r) = sum(1, r) - sum(1, l - 1)
           = query(r) - query(l - 1)
```

Why does this work? `query(r)` gives `sum(1..r)`. `query(l-1)` gives `sum(1..l-1)`. Subtracting removes the prefix we don't want.

```js
rangeQuery(l, r) {
  return this.query(r) - this.query(l - 1);
}
```

Example: sum of `[3..6]`:

```
query(6) = sum(1..6)
query(2) = sum(1..2)

sum(3..6) = query(6) - query(2)
```

Each `query` is O(log n), so `rangeQuery` is O(log n) too.

> 💡 **Tip**
> Edge case: if `l = 1`, then `query(l - 1) = query(0) = 0` (the loop doesn't execute at all because `i = 0` fails the `i > 0` check immediately). This is correct — no prefix to subtract.

> 🎯 **Key takeaway**
> Range query = two prefix queries, subtracted. This is the core reason BIT is so useful: it turns range sums into two O(log n) operations.

---

<a id="lesson-12"></a>
## Lesson 12 — Why BIT is faster and simpler than a Segment Tree in practice

Let's compare the two for the "range sum + point update" use case:

| Property | Segment Tree | Fenwick Tree |
|---|---|---|
| Storage | `4 * n` cells | `n + 1` cells |
| Update | O(log n) | O(log n) |
| Query | O(log n) | O(log n) |
| Code size | ~30-50 lines | ~10 lines |
| Cache behavior | Scattered node accesses | Sequential array traversal |
| Handles range min/max | ✅ | ❌ |
| Handles non-invertible ops | ✅ | ❌ |

Both are O(log n) on paper. In practice, BIT wins because:

1. **Memory**: 4x less storage means less cache pressure.
2. **Code**: fewer lines means fewer bugs.
3. **Branch-free loops**: the BIT update and query loops are tight, predictable inner loops that CPUs love.

A common benchmark on 10^6 operations shows BIT running roughly 2–3x faster than a naive Segment Tree implementation.

> ✋ **Pause and think**
> Given this comparison, when would you *choose* a Segment Tree over a BIT?
>
> <details>
> <summary>Show answer</summary>
>
> When you need:
> - Range minimum or maximum queries (BIT can't do these without tricks).
> - Non-invertible operations like GCD over a range.
> - "Lazy propagation" (range updates that apply to millions of cells efficiently).
> - More complex queries like "how many elements in range [l, r] are > k".
>
> For plain range sums with point updates, BIT wins every time.
> </details>

---

<a id="lesson-13"></a>
## Lesson 13 — What BIT cannot do (and why)

BIT works because of the `rangeQuery(l, r) = query(r) - query(l - 1)` trick. That subtraction only works when the operation is **invertible** — you can "undo" a prefix to get a range.

- **Sum**: `sum(l,r) = prefix(r) - prefix(l-1)` ✅ (subtraction is the inverse of addition)
- **Product**: same idea — `product(l,r) = prefix(r) / prefix(l-1)` ✅ (division is the inverse)
- **Min / Max**: no inverse exists. `min(l,r)` cannot be derived from two prefix minimums.

Example of why min fails:

```
arr = [3, 1, 4, 1, 5]

prefixMin(4) = min(arr[1..4]) = 1
prefixMin(1) = min(arr[1..1]) = 3

There's no formula: prefixMin(4) ??? prefixMin(1)  →  min(arr[2..4]) = ?
```

You can't subtract or divide minimums. So range-min requires a Segment Tree (or sparse table for static arrays).

> ⚠️ **Remember this**
> BIT = sum, XOR, product (anything with an inverse).
> BIT ≠ min, max, GCD (over a range).

---

<a id="lesson-14"></a>
## Lesson 14 — Advanced: range-update + point-query with a difference array

So far we've only done **point updates** (add to one position) and **range queries** (sum over a range). Can we flip it — **update a whole range at once** and then query a single point?

Yes! The trick is to maintain a BIT of the **difference array** instead of the values themselves.

### The difference array idea

Define `diff[i] = arr[i] - arr[i-1]` (with `arr[0] = 0`). Then:

```
arr[i] = diff[1] + diff[2] + ... + diff[i] = prefix sum of diff up to i
```

So if we store `diff` in a BIT, **querying a single point** `i` becomes a prefix sum (O(log n)), and **range update** `add(l, r, v)` becomes two point updates:

```js
bit.update(l, +v);      // diff[l] increases by v  → arr[l..n] all increase by v
bit.update(r + 1, -v);  // diff[r+1] decreases by v → arr[r+1..n] reverts
```

This precisely adds `v` to every element from `l` to `r` and nothing outside.

```js
class BITRangeUpdatePointQuery {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 2).fill(0);
  }
  // add v to every element in [l, r]
  addRange(l, r, v) {
    this._update(l, v);
    this._update(r + 1, -v);
  }
  // get the current value of element i
  pointQuery(i) {
    return this._query(i);
  }
  _update(i, delta) {
    for (; i <= this.n; i += i & -i) this.tree[i] += delta;
  }
  _query(i) {
    let s = 0;
    for (; i > 0; i -= i & -i) s += this.tree[i];
    return s;
  }
}
```

> 🎯 **Key takeaway**
> By storing differences instead of values, you swap the roles: range update becomes O(log n), point query becomes O(log n). This is the **difference array BIT** trick.

---

<a id="lesson-15"></a>
## Lesson 15 — Advanced: range-update + range-query with two BITs

What if you need **both** range update and range query? "Add `v` to every element in `[l, r]`, then ask for the sum over `[l', r']`."

This requires the most advanced BIT technique: **two BITs**. The math is a little involved, but the code stays simple.

### The derivation (follow along slowly)

After adding `v` to range `[l, r]`, the prefix sum `sum(1..i)` changes by:

```
if i < l:        change = 0
if l <= i <= r:  change = v * (i - l + 1)   = v*i - v*(l-1)
if i > r:        change = v * (r - l + 1)   = v*(r+1-1) - v*(l-1)   ... simplified
```

This can be decomposed as:

```
sum(1..i) = (sum of delta[j] * i) - (sum of delta[j] * (j - 1))
           = i * B1.query(i)  -  B2.query(i)
```

where `B1` stores the deltas themselves, and `B2` stores `delta[j] * (j - 1)` for each update.

In code:

```js
class BITRangeUpdateRangeQuery {
  constructor(n) {
    this.n = n;
    this.b1 = new Array(n + 2).fill(0);  // stores delta
    this.b2 = new Array(n + 2).fill(0);  // stores delta * (j - 1)
  }
  addRange(l, r, v) {
    this._update(this.b1, l, v);
    this._update(this.b1, r + 1, -v);
    this._update(this.b2, l, v * (l - 1));
    this._update(this.b2, r + 1, -v * r);
  }
  prefixSum(i) {
    return this._query(this.b1, i) * i - this._query(this.b2, i);
  }
  rangeSum(l, r) {
    return this.prefixSum(r) - this.prefixSum(l - 1);
  }
  _update(bit, i, delta) {
    for (; i <= this.n; i += i & -i) bit[i] += delta;
  }
  _query(bit, i) {
    let s = 0;
    for (; i > 0; i -= i & -i) s += bit[i];
    return s;
  }
}
```

Both `addRange` and `rangeSum` are O(log n).

> 💡 **Tip**
> Don't memorize the derivation. Just remember: two BITs + the formula `i * B1.query(i) - B2.query(i)`. Look it up when you need it.

> ⚠️ **When to use this**
> Only use the two-BIT trick when you genuinely need *both* range updates *and* range queries. If you only need one or the other, the simpler single-BIT variants from Lessons 9-11 and Lesson 14 are cleaner.

---

<a id="lesson-16"></a>
## Lesson 16 — 2D BIT — a sneak peek

Everything we've done scales naturally to two dimensions. A **2D BIT** answers "sum of all values in the sub-rectangle from `(r1, c1)` to `(r2, c2)`" with point updates.

```js
class BIT2D {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.tree = Array.from({ length: rows + 1 }, () =>
      new Array(cols + 1).fill(0)
    );
  }
  update(r, c, delta) {
    for (let i = r; i <= this.rows; i += i & -i) {
      for (let j = c; j <= this.cols; j += j & -j) {
        this.tree[i][j] += delta;
      }
    }
  }
  query(r, c) {
    let s = 0;
    for (let i = r; i > 0; i -= i & -i) {
      for (let j = c; j > 0; j -= j & -j) {
        s += this.tree[i][j];
      }
    }
    return s;
  }
  rectQuery(r1, c1, r2, c2) {
    return this.query(r2, c2)
         - this.query(r1 - 1, c2)
         - this.query(r2, c1 - 1)
         + this.query(r1 - 1, c1 - 1);   // inclusion-exclusion
  }
}
```

The `rectQuery` formula is **inclusion-exclusion**: you add back the top-left corner because it was subtracted twice.

```
rect(r1,c1 → r2,c2) = prefix(r2,c2) - prefix(r1-1,c2) - prefix(r2,c1-1) + prefix(r1-1,c1-1)
```

Both `update` and `query` are now O(log(rows) * log(cols)).

> 🔬 **Going deeper (optional)**
> The 2D BIT is widely used in problems where you have a dynamic grid of counts — for example, counting points in rectangles, or dynamic submatrix sums. Once you're comfortable with the 1D version, the 2D version is just two nested loops.

---

<a id="lesson-17"></a>
## Lesson 17 — Quick reference

Everything in one place.

### Core BIT class

```js
class BIT {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0);
  }
  // Add delta to position i (1-indexed)
  update(i, delta) {
    for (; i <= this.n; i += i & -i) this.tree[i] += delta;
  }
  // Prefix sum: sum of arr[1..i]
  query(i) {
    let s = 0;
    for (; i > 0; i -= i & -i) s += this.tree[i];
    return s;
  }
  // Range sum: sum of arr[l..r]
  rangeQuery(l, r) {
    return this.query(r) - this.query(l - 1);
  }
}
```

### Build BIT from an existing array

```js
// O(n log n) — simple
function buildBIT(arr) {
  const bit = new BIT(arr.length);
  for (let i = 0; i < arr.length; i++) {
    bit.update(i + 1, arr[i]);   // shift: arr[0] → BIT index 1
  }
  return bit;
}

// O(n) — advanced (using the "propagate" trick)
function buildBITFast(arr) {
  const n = arr.length;
  const tree = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    tree[i] += arr[i - 1];
    const parent = i + (i & -i);
    if (parent <= n) tree[parent] += tree[i];
  }
  return tree;
}
```

### Complexity table

| Operation | Time | Space |
|---|---|---|
| Build from array | O(n log n) simple, O(n) optimized | O(n) |
| Point update | O(log n) | O(1) |
| Prefix query | O(log n) | O(1) |
| Range query | O(log n) | O(1) |
| Range-update point-query (diff BIT) | O(log n) | O(n) |
| Range-update range-query (2 BITs) | O(log n) | O(n) |
| 2D point update | O(log m · log n) | O(m·n) |
| 2D rect query | O(log m · log n) | O(1) extra |

### Lowbit cheat sheet

```
i   binary   lowbit(i) = i & -i
────────────────────────────────
1   0001         1
2   0010         2
3   0011         1
4   0100         4
5   0101         1
6   0110         2
7   0111         1
8   1000         8
```

### Common patterns

**Coordinate compression** (for large value ranges):

```js
const vals = [...new Set(arr)].sort((a, b) => a - b);
const compress = x => vals.indexOf(x) + 1;   // or use binary search
const bit = new BIT(vals.length);
```

**Count inversions** (merge-sort alternative):

```js
// Walk right-to-left. For each arr[i], count how many elements already
// in the BIT are strictly less than arr[i].
// That count = query(rank(arr[i]) - 1).
// Then update(rank(arr[i]), 1).
```

**Kth smallest** (binary lifting on BIT):

```js
function kthSmallest(bit, k) {
  let pos = 0;
  for (let pw = 1 << Math.floor(Math.log2(bit.n)); pw > 0; pw >>= 1) {
    if (pos + pw <= bit.n && bit.tree[pos + pw] < k) {
      pos += pw;
      k -= bit.tree[pos];
    }
  }
  return pos + 1;
}
```

---

<a id="lesson-18"></a>
## Lesson 18 — You did it. Now what?

Take a breath. That was a lot of bit manipulation. **You don't have to have it all memorized.**

What you should walk away with:

1. **The problem**: range sum with point updates; naïve approaches fail at scale.
2. **The insight**: each `tree[i]` covers a range whose length equals `lowbit(i)`. This is the whole trick.
3. **`x & -x`**: extracts the lowest set bit. The engine of everything.
4. **Update**: walk up by adding `lowbit(i)` — O(log n).
5. **Query**: walk down by subtracting `lowbit(i)` — O(log n).
6. **Range query**: two prefix queries, subtracted — O(log n).
7. **What BIT can't do**: min, max, anything without an inverse.
8. **Extensions**: difference BIT (range-update + point-query), two-BIT trick (range-update + range-query), 2D BIT.

### What to do next

1. Open [`questions/01-build-bit.md`](./questions/01-build-bit.md).
2. Try to implement the BIT class from scratch without looking at the template.
3. Write your solution in `solutions/01-build-bit.js`.
4. If you get stuck, re-read Lessons 7–10, then peek at the hints.
5. Tick the box in `README.md`. Move on.

### Pacing

- **Don't try to do all 18 problems in one session.** Two or three a day for a week or so is better.
- **Easy questions feel easy** — that's intentional. They build the muscle memory you need for the hard ones.
- **The hard ones will hurt.** Inversions, reverse pairs, coordinate compression — these combine BIT with other ideas. Take your time.

You're in good shape. See you in Q1. 💪
