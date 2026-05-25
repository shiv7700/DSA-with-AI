# Segment Tree — Lessons from Zero

> 👋 Hey. This file is for someone who has never seen a segment tree before. Segment trees have a reputation for being scary — but that reputation is mostly because people skip the foundations and jump straight into the code. We're not going to do that.
>
> We'll build up the idea from scratch, starting with a problem you already know how to solve — but slowly. Each lesson delivers one concept. Take breaks. Draw the diagrams on paper. You'll be surprised how natural it feels by the end.
>
> Total reading time at a relaxed pace: about 2–3 hours, with breaks. **You absolutely do not have to read it all in one sitting.**

---

## Table of Lessons

1. [The problem: range queries on a mutable array](#lesson-1)
2. [Naive approach: the flat array, scan every time](#lesson-2)
3. [Smarter: prefix sums — blazing fast queries, but updates hurt](#lesson-3)
4. [The key insight: summarize ranges in a tree](#lesson-4)
5. [Meet the segment tree — structure and shape](#lesson-5)
6. [Building a segment tree — step by step](#lesson-6)
7. [Range query — walking the tree](#lesson-7)
8. [Point update — propagating a change](#lesson-8)
9. [Why O(log n) — the height argument](#lesson-9)
10. [Space: why 4·n and not 2·n](#lesson-10)
11. [What operations work? (anything associative)](#lesson-11)
12. [The iterative implementation (bottom-up)](#lesson-12)
13. [Range update — the problem with naive propagation](#lesson-13)
14. [Lazy propagation — defer the work](#lesson-14)
15. [Lazy propagation — the full walkthrough](#lesson-15)
16. [2D segment tree — a quick preview](#lesson-16)
17. [Coordinate compression — segment trees on huge sparse keys](#lesson-17)
18. [Segment tree vs Fenwick tree — which should you pick?](#lesson-18)
19. [Quick reference](#lesson-19)
20. [You did it — what to do next](#lesson-20)

---

<a id="lesson-1"></a>
## Lesson 1 — The problem: range queries on a mutable array

Imagine you work at a bank. You have a row of accounts, each with a balance:

```
Account:  #0      #1      #2      #3      #4      #5      #6      #7
        ┌──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┐
Balance:│  3   │  1   │  4   │  1   │  5   │  9   │  2   │  6   │
        └──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┘
```

Your manager keeps asking two kinds of questions over and over:

1. **Range query:** "What is the total balance of accounts #2 through #5?"
2. **Point update:** "Account #4 just deposited $10. Update the balance."

And they alternate. Query. Update. Query. Query. Update. Query. Thousands of times.

You need both operations to be **fast**. Not O(n) fast — O(log n) fast.

> 🎯 **Key takeaway**
> A segment tree solves the combination of "fast range queries" and "fast point updates" on an array. That combination is what makes it special.

---

<a id="lesson-2"></a>
## Lesson 2 — Naive approach: the flat array, scan every time

The simplest approach: keep the array as-is and loop over the range each time.

```js
// Sum of arr[l..r] inclusive
function rangeSum(arr, l, r) {
  let sum = 0;
  for (let i = l; i <= r; i++) sum += arr[i];
  return sum;
}

// Point update
function update(arr, i, val) {
  arr[i] = val;
}
```

**Update:** O(1) — just write to a slot. Instant.

**Query:** O(n) — in the worst case you scan the whole array. With 10 million accounts and 10 million queries, that's **10^14 operations**. Far too slow.

We need something better for queries.

---

<a id="lesson-3"></a>
## Lesson 3 — Smarter: prefix sums — blazing fast queries, but updates hurt

You might remember **prefix sums** from the Arrays chapter. The idea: precompute a running total so any range sum is just two lookups.

```
Account:   #0   #1   #2   #3   #4   #5   #6   #7
Array:   [  3,   1,   4,   1,   5,   9,   2,   6 ]
Prefix:  [  0,   3,   4,   8,   9,  14,  23,  25,  31 ]
          ↑
          prefix[0] = 0 (nothing summed yet)
          prefix[i] = sum of arr[0..i-1]
```

Now: `sum(2, 5) = prefix[6] - prefix[2] = 23 - 4 = 19`. That's O(1)!

But when account #4 deposits $10:

- `arr[4]` changes from 5 to 15.
- Every prefix from `prefix[5]` onwards has to be recomputed.
- That's O(n) in the worst case.

So:

| Approach | Query | Update |
|---|---|---|
| Flat array | O(n) | O(1) |
| Prefix sum | O(1) | O(n) |
| **Segment tree** | **O(log n)** | **O(log n)** |

The segment tree is the balanced middle ground.

> 💡 **Tip**
> If your array is **never updated** after it's built, prefix sums are perfect — O(n) build and O(1) queries. Only reach for a segment tree when you need updates too.

---

<a id="lesson-4"></a>
## Lesson 4 — The key insight: summarize ranges in a tree

Here's the core idea. Instead of storing just the raw values, what if we also precomputed the **sum of every "range chunk"** that we might ever need?

Think of it like a sports tournament bracket. Eight players compete. Each match produces a winner. The bracket remembers the winner of every sub-tournament — from individual matches all the way up to the final winner of everyone.

```
                    ╔═══════════════════════════════════╗
                    ║  Total: 3+1+4+1+5+9+2+6 = 31     ║
                    ╚═══════════════════════════════════╝
                           /               \
             ╔═════════════╗           ╔═════════════╗
             ║  Left: 9    ║           ║  Right: 22  ║
             ║  [0..3]     ║           ║  [4..7]     ║
             ╚═════════════╝           ╚═════════════╝
               /       \                 /       \
         ╔═══════╗ ╔═══════╗       ╔═══════╗ ╔═══════╗
         ║ 4     ║ ║ 5     ║       ║ 14    ║ ║ 8     ║
         ║[0..1] ║ ║[2..3] ║       ║[4..5] ║ ║[6..7] ║
         ╚═══════╝ ╚═══════╝       ╚═══════╝ ╚═══════╝
          /    \    /    \           /    \    /    \
        [3]  [1]  [4]  [1]         [5]  [9]  [2]  [6]
         0    1    2    3           4    5    6    7
```

Now: "what is the sum of accounts 2 through 5?"

Instead of scanning 4 elements, you can cover that range by combining just 2 precomputed nodes: `[2..3]` (sum = 5) and `[4..5]` (sum = 14). Answer: 19.

**That's a segment tree.** A binary tree where each node stores a summary of a range, and you build the full picture by combining children bottom-up.

> 🎯 **Key takeaway**
> Each node in a segment tree covers a range and stores its summary (sum, min, max, etc.). To answer a query, combine only the nodes that perfectly tile your target range — typically 2 to 2·log(n) nodes.

---

<a id="lesson-5"></a>
## Lesson 5 — Meet the segment tree — structure and shape

Let's give names to the key properties.

**Node structure:**

- Every node covers a contiguous range `[start, end]`.
- A leaf node covers a single element: `[i, i]`.
- An internal node's two children split the range at the midpoint:
  - Left child: `[start, mid]`
  - Right child: `[mid+1, end]`
  - where `mid = Math.floor((start + end) / 2)`

**How we store it:**

We store the tree in a plain array, **1-indexed**, using the same trick as a binary heap:

```
- Node at index k
- Left child at index 2k
- Right child at index 2k + 1
- Parent at index Math.floor(k / 2)
```

The root is at index 1.

For our 8-element array, the tree array looks like this:

```
Index:  1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
Value: [31,   9,  22,   4,   5,  14,   8,   3,   1,   4,   1,   5,   9,   2,   6]
Range: [0-7][0-3][4-7][0-1][2-3][4-5][6-7][0,0][1,1][2,2][3,3][4,4][5,5][6,6][7,7]
```

Leaves (indexes 8–15) hold the original array values. Each internal node holds the sum of its two children.

> ✋ **Pause and try**
> For the array `[3, 1, 4, 1]`, draw the segment tree by hand. The root should be 9. What are the left and right children of the root?
>
> <details>
> <summary>Show answer</summary>
>
> ```
>         [9]   ← root, covers [0..3], index 1
>        /    \
>      [4]    [5]   ← index 2 covers [0..1]; index 3 covers [2..3]
>     /   \  /   \
>   [3]  [1] [4]  [1]   ← leaves at indexes 4, 5, 6, 7
> ```
> </details>

---

<a id="lesson-6"></a>
## Lesson 6 — Building a segment tree — step by step

Let's build a segment tree for `arr = [3, 1, 4, 1, 5, 9, 2, 6]` from scratch using a recursive approach.

### The recursive build function

```js
const arr = [3, 1, 4, 1, 5, 9, 2, 6];
const n = arr.length;
const tree = new Array(4 * n).fill(0);   // safe size — more on this in Lesson 10

function build(node, start, end) {
  if (start === end) {
    // Leaf: store the actual value
    tree[node] = arr[start];
  } else {
    const mid = Math.floor((start + end) / 2);
    build(2 * node,     start, mid);   // build left child
    build(2 * node + 1, mid + 1, end); // build right child
    // Internal node = sum of its two children
    tree[node] = tree[2 * node] + tree[2 * node + 1];
  }
}

build(1, 0, n - 1);   // start from root (node=1), covering full array
```

### What happens, visually

```
build(1, 0, 7)
  build(2, 0, 3)
    build(4, 0, 1)
      build(8, 0, 0)  → tree[8] = 3   (leaf)
      build(9, 1, 1)  → tree[9] = 1   (leaf)
      tree[4] = 3 + 1 = 4
    build(5, 2, 3)
      build(10, 2, 2) → tree[10] = 4  (leaf)
      build(11, 3, 3) → tree[11] = 1  (leaf)
      tree[5] = 4 + 1 = 5
    tree[2] = 4 + 5 = 9
  build(3, 4, 7)
    build(6, 4, 5)
      build(12, 4, 4) → tree[12] = 5  (leaf)
      build(13, 5, 5) → tree[13] = 9  (leaf)
      tree[6] = 5 + 9 = 14
    build(7, 6, 7)
      build(14, 6, 6) → tree[14] = 2  (leaf)
      build(15, 7, 7) → tree[15] = 6  (leaf)
      tree[7] = 2 + 6 = 8
    tree[3] = 14 + 8 = 22
  tree[1] = 9 + 22 = 31
```

**Build time:** O(n) — we visit every node exactly once, and there are 2n−1 nodes.

> 🎯 **Key takeaway**
> Build is a simple post-order traversal: fill leaves first, then fill each internal node as `left + right`. Time: O(n).

---

<a id="lesson-7"></a>
## Lesson 7 — Range query — walking the tree

Now comes the magic. Let's query the sum of `arr[2..5]`.

We walk down the tree. At each node, we're given its range `[start, end]` and our query range `[l, r]`. There are three cases:

```
Case A: Node range is ENTIRELY OUTSIDE query range
        → return 0 (contributes nothing)

Case B: Node range is ENTIRELY INSIDE query range
        → return this node's value (perfect fit!)

Case C: Node range PARTIALLY OVERLAPS query range
        → recurse into both children and combine their answers
```

```js
function query(node, start, end, l, r) {
  // Case A: no overlap
  if (r < start || end < l) return 0;

  // Case B: total overlap
  if (l <= start && end <= r) return tree[node];

  // Case C: partial overlap
  const mid = Math.floor((start + end) / 2);
  const leftSum  = query(2 * node,     start, mid,     l, r);
  const rightSum = query(2 * node + 1, mid + 1, end,   l, r);
  return leftSum + rightSum;
}

query(1, 0, 7, 2, 5);   // sum of arr[2..5]
```

### Walking query(1, 0, 7, 2, 5) step by step

```
query(1, [0..7], l=2, r=5)   → partial overlap (0..7 straddles 2..5)
  query(2, [0..3], l=2, r=5)   → partial overlap
    query(4, [0..1], l=2, r=5)   → NO overlap (0..1 is left of 2..5) → return 0
    query(5, [2..3], l=2, r=5)   → TOTAL overlap (2..3 is inside 2..5) → return 5
    return 0 + 5 = 5
  query(3, [4..7], l=2, r=5)   → partial overlap
    query(6, [4..5], l=2, r=5)   → TOTAL overlap (4..5 inside 2..5) → return 14
    query(7, [6..7], l=2, r=5)   → NO overlap (6..7 is right of 2..5) → return 0
    return 14 + 0 = 14
  return 5 + 14 = 19  ✅
```

We only touched **5 nodes** instead of 4 array elements. For larger arrays with millions of elements, we'd touch at most `4 · log₂(n)` nodes.

> 💡 **Tip**
> Think of Case B as "this node's pre-computed answer is exactly what I need — take it and stop descending." That's where the speedup comes from.

---

<a id="lesson-8"></a>
## Lesson 8 — Point update — propagating a change

Account #4 deposits $10. `arr[4]` goes from 5 to 15. How do we update the tree?

We walk down to the leaf for index 4, update it, then **bubble up**, recomputing every ancestor on the way back.

```js
function update(node, start, end, idx, val) {
  if (start === end) {
    // We've reached the leaf for idx
    arr[idx] = val;
    tree[node] = val;
    return;
  }
  const mid = Math.floor((start + end) / 2);
  if (idx <= mid) {
    update(2 * node,     start, mid,     idx, val);
  } else {
    update(2 * node + 1, mid + 1, end,   idx, val);
  }
  // Recompute this node from updated children
  tree[node] = tree[2 * node] + tree[2 * node + 1];
}

update(1, 0, 7, 4, 15);   // set arr[4] = 15
```

### Walking update(1, 0, 7, idx=4, val=15) step by step

```
update(1, [0..7], idx=4)
  4 > 3 → go right
  update(3, [4..7], idx=4)
    4 <= 5 → go left
    update(6, [4..5], idx=4)
      4 <= 4 → go left
      update(12, [4..4], idx=4)   → LEAF → tree[12] = 15
      ↑ back up: tree[6] = tree[12] + tree[13] = 15 + 9 = 24
    ↑ back up: tree[3] = tree[6] + tree[7] = 24 + 8 = 32
  ↑ back up: tree[1] = tree[2] + tree[3] = 9 + 32 = 41
```

Only 4 nodes changed — exactly the path from root to leaf. Height of a balanced tree of size 8 is 3, so we touched `log₂(8) + 1 = 4` nodes.

> 🎯 **Key takeaway**
> A point update modifies exactly one leaf, then recomputes every node on the path from that leaf back to the root. That path is exactly log₂(n) nodes long.

---

<a id="lesson-9"></a>
## Lesson 9 — Why O(log n) — the height argument

Let's be precise about why both operations are O(log n).

A segment tree built on `n` elements is a **complete binary tree**. (Or nearly complete — we'll allow n to not be a power of 2.)

The height of a binary tree with `n` leaves is `⌈log₂(n)⌉`. For n = 8, that's 3. For n = 1,000,000, that's about 20.

**Why point update is O(log n):**

When you update index `i`, you walk a single path: root → ... → leaf. This path has exactly `height + 1 = O(log n)` nodes. Nothing else is touched.

**Why range query is O(log n):**

At each level of the tree, your query range can "cover" at most 2 nodes completely (one on each side of the range). Everything else is either entirely inside (Case B, return immediately) or entirely outside (Case A, return 0 immediately). This means you touch at most `4 · log₂(n)` nodes total.

```
                   Level 0:  1 node   (root)
                   Level 1:  2 nodes
                   Level 2:  4 nodes
                       …
                   Level k:  2^k nodes   (leaves at level log₂(n))
```

At any given level, at most **4 nodes** can be "partially overlapping" — the rest are either fully in or fully out. Since there are `log₂(n)` levels, the total is bounded by `4 · log₂(n)` = O(log n).

> 💡 **Why 4 and not 2?**
> At each level, the query range can start in the middle of one node and end in the middle of another — that's at most 2 partial nodes. But those 2 partial nodes each might split again at the next level. Detailed analysis shows the total never exceeds `4 · log n`.

---

<a id="lesson-10"></a>
## Lesson 10 — Space: why 4·n and not 2·n

When you store a segment tree in an array using the `2k / 2k+1` indexing trick, why do we allocate `4n` slots instead of just `2n`?

Let's think about it for a perfect binary tree with `n = 8` leaves:

```
Leaves (level 3):       8 nodes   → indexes 8..15
Level 2:                4 nodes   → indexes 4..7
Level 1:                2 nodes   → indexes 2..3
Root (level 0):         1 node    → index  1
Total nodes:           15          → fits in array of size 16 = 2n
```

For a power-of-2 size, `2n` is enough. But what if `n = 5`?

```
The "conceptual" tree for n=5 has leaves at:
  node 8, 9, 10, 11 for the first 4 elements
  node 12 (or 12/13) for the 5th element

Actually, the right child of node 5 would need to go to index 11,
which forces index 5's subtree to reach level 3 → index 22.
```

When `n` is not a power of 2, the tree is unbalanced and some leaf nodes live deeper than you'd expect. The **maximum node index** can be as high as `4n − 1`.

The safe rule: **allocate `4n` slots**. This always works.

> ⚠️ **A common bug**
> Allocating `2n + 5` or `2 * nextPowerOfTwo(n)` can work but requires careful calculation. In competitions and interviews, just use `4n` and move on.

```js
// Safe allocation
const tree = new Array(4 * n).fill(0);
```

If `n` can be up to 10^5, `4n` = 400,000 slots. Totally fine.

---

<a id="lesson-11"></a>
## Lesson 11 — What operations work? (anything associative)

So far we've been summing. But a segment tree is not married to addition. It works with **any associative operation**.

An operation ⊕ is **associative** if:
```
(a ⊕ b) ⊕ c  =  a ⊕ (b ⊕ c)
```

Here's why that matters: when you combine two children to compute a parent, or combine two tree nodes to answer a query, you're relying on:
```
answer(l..r) = answer(l..mid) ⊕ answer(mid+1..r)
```

That's only valid when ⊕ is associative.

### Operations that work on a segment tree

| Operation | Identity element | Example use |
|---|---|---|
| Sum | 0 | Total sales in a date range |
| Minimum | +Infinity | Lowest stock price in a period |
| Maximum | -Infinity | Highest temperature ever recorded |
| GCD | 0 | GCD of all elements in a range |
| XOR | 0 | Bitwise XOR across a subarray |
| Product | 1 | Product of a subrange |
| Bitwise AND | all-1s | Range AND |
| Bitwise OR | 0 | Range OR |
| Count (with condition) | 0 | Count of elements > x |

### Operations that do NOT directly work

- **Median** — not associative. You can't combine left-median and right-median to get the overall median.
- **Mode** — same problem.
- **k-th smallest** — more complex; requires a "merge sort tree" or "wavelet tree".

> 🎯 **Key takeaway**
> If you can reduce your operation to "combine left answer and right answer", and that combination is associative, a segment tree can handle it. The leaf initialization and the `merge` function are the only two things that change between different segment tree variants.

---

<a id="lesson-12"></a>
## Lesson 12 — The iterative implementation (bottom-up)

There's a beautifully simple **iterative** (non-recursive) way to implement a segment tree for sum queries. It's worth knowing — it's faster in practice (no recursion overhead) and easier to write in contest pressure.

The trick: store leaves in the second half of the array (indexes `n` through `2n-1`), and internal nodes in the first half.

```
Array size 2n:
  Indexes 0 .. n-1  :  internal nodes  (index 0 unused)
  Indexes n .. 2n-1 :  leaves  (leaf for arr[i] is at tree[n + i])

Parent of node k: Math.floor(k / 2)
Children of node k: 2k (left), 2k+1 (right)
```

### Build

```js
class SegTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(2 * this.n).fill(0);
    // Fill leaves
    for (let i = 0; i < this.n; i++) {
      this.tree[this.n + i] = arr[i];
    }
    // Fill internal nodes bottom-up
    for (let i = this.n - 1; i > 0; i--) {
      this.tree[i] = this.tree[2 * i] + this.tree[2 * i + 1];
    }
  }
```

### Point Update

```js
  update(i, val) {
    // Move to the leaf, then bubble up
    let pos = this.n + i;
    this.tree[pos] = val;
    pos = Math.floor(pos / 2);       // go to parent
    while (pos >= 1) {
      this.tree[pos] = this.tree[2 * pos] + this.tree[2 * pos + 1];
      pos = Math.floor(pos / 2);
    }
  }
```

### Range Query

The query uses a slightly different approach: instead of "case A / B / C", move both pointers `l` and `r` inward from the leaves.

```js
  // Sum of arr[l..r] inclusive
  query(l, r) {
    let sum = 0;
    // Convert to leaf positions
    l += this.n;
    r += this.n + 1;   // make r exclusive: [l, r)
    while (l < r) {
      if (l & 1) sum += this.tree[l++];   // l is a right child — take it
      if (r & 1) sum += this.tree[--r];   // r is a right child — take it
      l >>= 1;   // move up
      r >>= 1;   // move up
    }
    return sum;
  }
}
```

### Why the iterative query works (intuition)

Think of `l` and `r` as two walls closing in on the target range. At each level:
- If `l` is a **right child**, its parent doesn't fully cover the query (the left sibling is outside our range). So we take `l` directly and move `l` right.
- If `r` is a **right child** (r-1 is a right child in 0-indexed), we take it directly and move `r` left.
- Then both pointers jump to the parent level.

> 💡 **Tip**
> The iterative version requires `n` to work cleanly with the indexing. If your array isn't a power of 2, you can either pad it to the next power of 2, or stick with the recursive version.

---

<a id="lesson-13"></a>
## Lesson 13 — Range update — the problem with naive propagation

So far we've only done **point updates**: change a single element.

What if you need to **add 5 to every element in arr[2..6]**? This is a **range update**.

The naive way: loop from `i = 2` to `i = 6` and call `update(i, arr[i] + 5)` five times. Each call is O(log n), so total is O(k · log n) where k is the range width. If `k = n`, that's O(n log n) per range update — terrible.

Can we do better?

### The problem with "eagerly" updating everything

If we visit every node in the range and update it immediately, we have to touch all `k` leaves and update every ancestor — this is no faster than the loop above.

We need a cleverer approach: **defer the updates**. Instead of immediately pushing the change all the way down to every leaf, we mark a node: "hey, everything in your range needs this update applied, but we'll get to it later."

This is called **lazy propagation**.

> 🎯 **Key takeaway**
> For range updates, we can't afford to touch every leaf. We need to mark internal nodes with a "pending update" and push it down only when we actually need a subtree's value.

---

<a id="lesson-14"></a>
## Lesson 14 — Lazy propagation — defer the work

Let's use the analogy of a **manager at a company**.

Imagine you're a VP and you want to give everyone in a department a $500 bonus. Instead of walking to each employee's desk, you leave a memo on the department manager's door: "Give everyone under you $500." The department manager hasn't told anyone yet — they'll pass the memo down when one of their employees needs to be evaluated.

That memo is a **lazy tag**.

### The lazy array

We add a second array, `lazy[]`, alongside `tree[]`. `lazy[node]` stores any **pending update** that needs to be applied to the entire subtree rooted at `node`.

```js
const lazy = new Array(4 * n).fill(0);
```

### The push-down operation

Before we recurse into a node's children during a query or update, we **push** any pending lazy value down:

```js
function pushDown(node, start, end) {
  if (lazy[node] !== 0) {
    const mid = Math.floor((start + end) / 2);
    const leftChild  = 2 * node;
    const rightChild = 2 * node + 1;

    // Apply the lazy update to both children's tree values
    tree[leftChild]  += lazy[node] * (mid - start + 1);
    tree[rightChild] += lazy[node] * (end - mid);

    // Pass the pending update down to children's lazy arrays
    lazy[leftChild]  += lazy[node];
    lazy[rightChild] += lazy[node];

    // Clear our own lazy tag — we've passed it down
    lazy[node] = 0;
  }
}
```

When we say `tree[leftChild] += lazy[node] * (size of left child's range)`, we're saying: "if every element in this child's range increases by `lazy[node]`, the child's sum increases by that much."

> 💡 **The manager analogy in code**
> `pushDown` is the moment a manager finally calls a team meeting and says "that memo I received last week — here it is, you all get the update." Each child now has the memo on their door, and the VP's door is cleared.

---

<a id="lesson-15"></a>
## Lesson 15 — Lazy propagation — the full walkthrough

Let's put it all together with a concrete example. Array: `[3, 1, 4, 1, 5, 9, 2, 6]`.

### Range update function

"Add `val` to every element in range `[l, r]`."

```js
function rangeUpdate(node, start, end, l, r, val) {
  // Case A: no overlap
  if (r < start || end < l) return;

  // Case B: total overlap — just mark this node as lazy
  if (l <= start && end <= r) {
    tree[node]  += val * (end - start + 1);   // update this node's sum
    lazy[node]  += val;                        // mark for children
    return;
  }

  // Case C: partial overlap — push down first, then recurse
  pushDown(node, start, end);
  const mid = Math.floor((start + end) / 2);
  rangeUpdate(2 * node,     start, mid,   l, r, val);
  rangeUpdate(2 * node + 1, mid+1, end,   l, r, val);
  tree[node] = tree[2 * node] + tree[2 * node + 1];
}
```

### Range query with lazy

```js
function rangeQuery(node, start, end, l, r) {
  if (r < start || end < l) return 0;
  if (l <= start && end <= r) return tree[node];

  pushDown(node, start, end);   // push before descending!
  const mid = Math.floor((start + end) / 2);
  return rangeQuery(2 * node,     start, mid,   l, r)
       + rangeQuery(2 * node + 1, mid+1, end,   l, r);
}
```

### Step-by-step: add 2 to arr[2..5]

Initial sums in tree (from earlier):
```
tree[1]=31, tree[2]=9, tree[3]=22
tree[4]=4, tree[5]=5, tree[6]=14, tree[7]=8
Leaves: 3,1,4,1,5,9,2,6
```

`rangeUpdate(1, 0, 7, 2, 5, val=2)`:

```
At node 1 [0..7]: partial overlap
  pushDown(1) — lazy[1]=0, nothing to do
  Left: rangeUpdate(2, [0..3], 2, 5, 2)
    At node 2 [0..3]: partial overlap
      pushDown(2) — lazy[2]=0, nothing to do
      Left: rangeUpdate(4, [0..1], 2, 5, 2)
        At node 4 [0..1]: NO overlap → return
      Right: rangeUpdate(5, [2..3], 2, 5, 2)
        At node 5 [2..3]: TOTAL overlap
          tree[5] += 2 * 2 = 4 → tree[5] = 9
          lazy[5] += 2           → lazy[5] = 2
          return
      tree[2] = tree[4] + tree[5] = 4 + 9 = 13
  Right: rangeUpdate(3, [4..7], 2, 5, 2)
    At node 3 [4..7]: partial overlap
      pushDown(3) — lazy[3]=0, nothing to do
      Left: rangeUpdate(6, [4..5], 2, 5, 2)
        At node 6 [4..5]: TOTAL overlap
          tree[6] += 2 * 2 = 4 → tree[6] = 18
          lazy[6] += 2           → lazy[6] = 2
          return
      Right: rangeUpdate(7, [6..7], 2, 5, 2)
        At node 7 [6..7]: NO overlap → return
      tree[3] = tree[6] + tree[7] = 18 + 8 = 26
  tree[1] = tree[2] + tree[3] = 13 + 26 = 39
```

After this: `tree[1] = 39 = 31 + 4*2 = 31 + 8`. Correct: we added 2 to 4 elements.

`lazy[5] = 2` and `lazy[6] = 2` — the children of those nodes haven't been updated yet, but that's fine. We'll push those lazy values down only if we ever need to drill deeper.

> 🎯 **Key takeaway**
> With lazy propagation, a range update touches only O(log n) nodes — exactly the same as a point update. The pending work is stored as a lazy tag and pushed down only on demand.

---

<a id="lesson-16"></a>
## Lesson 16 — 2D segment tree — a quick preview

What if you need range queries on a **2D matrix** instead of a 1D array?

Example: "What is the sum of all values in the rectangle with top-left `(r1, c1)` and bottom-right `(r2, c2)`?"

### Approach: segment tree of segment trees

- Build a segment tree over the **rows** (outer tree).
- Each node of the outer tree holds **its own segment tree over the columns** for the rows it covers.

```
Outer tree node for rows [0..3]:
  Inner seg-tree covering all columns for those rows

Outer tree node for rows [0..1]:
  Inner seg-tree covering all columns for rows 0 and 1
```

For a query `(r1, c1, r2, c2)`:
1. Find the set of outer nodes that cover `[r1..r2]` (same as a 1D range query).
2. For each such outer node, query its inner column segment tree on `[c1..c2]`.

**Complexity:** O(log²(n)) per query and per update.

**Space:** O(n² log n) which can be large. For sparse matrices or when memory is tight, a **merge sort tree** or a **fractional cascading** structure is used instead.

> ⚠️ **For beginners**
> You won't need 2D segment trees in most problems. Learn the 1D version deeply first. The 2D version is an advanced topic you can revisit once 1D feels natural.

---

<a id="lesson-17"></a>
## Lesson 17 — Coordinate compression — segment trees on huge sparse keys

Imagine a problem: you receive timestamps in the year 2025, and each timestamp could be any value from 0 to 10^18. You need range queries over these timestamps. You can't allocate an array of size 10^18.

But here's the trick: you'll only ever see at most `n = 10^5` distinct timestamps. So instead of using the raw timestamp as your index, you **compress** the coordinates:

```js
// Step 1: collect all timestamps
const raw = [1_000_000_000, 999_999_000, 500_000_000_000, 1];

// Step 2: sort and deduplicate
const sorted = [...new Set(raw)].sort((a, b) => a - b);
// sorted = [1, 999_999_000, 1_000_000_000, 500_000_000_000]

// Step 3: map each value to its rank (0-indexed position)
const compress = new Map();
sorted.forEach((v, i) => compress.set(v, i));
// compress = { 1 → 0, 999_999_000 → 1, 1_000_000_000 → 2, 500_000_000_000 → 3 }

// Step 4: build segment tree of size sorted.length
```

Now you build a segment tree of size 4 (the number of distinct values), and whenever you need to query or update at timestamp `t`, you use `compress.get(t)` as the index.

### When to use coordinate compression

- Values are huge (up to 10^9 or 10^18) but sparse (few distinct ones)
- You know all values ahead of time (offline processing)

> ✋ **Pause and try**
> Given values `[40, 100, 40, 50, 100]`, what would the compressed array look like?
>
> <details>
> <summary>Show answer</summary>
>
> Distinct sorted values: `[40, 50, 100]`
> Compressed: `40 → 0`, `50 → 1`, `100 → 2`
> Original array after compression: `[0, 2, 0, 1, 2]`
> Build a segment tree of size 3.
> </details>

---

<a id="lesson-18"></a>
## Lesson 18 — Segment tree vs Fenwick tree — which should you pick?

You'll often hear about **Fenwick trees** (also called **Binary Indexed Trees** or BIT) in the same breath as segment trees. They both answer range queries in O(log n). How do you choose?

### Fenwick tree (BIT)

- Simpler code — about 10 lines
- Faster constant factor in practice (no recursion, simple bit operations)
- **Limitations:** only works with operations that are **invertible** (you need to "undo" a prefix sum to get a range sum — division/subtraction must be possible). Works perfectly for sum, xor, product (with modular inverse). Does NOT work for min, max, GCD without clever tricks.
- Point update + prefix query = trivial. Range update + range query = doable with two BITs, but less natural.

### Segment tree

- More code — about 40–60 lines for a full lazy version
- Slightly slower constant factor
- **Works for any associative operation**, including non-invertible ones (min, max, GCD)
- Range updates with lazy propagation are natural
- 2D variant is feasible

### Rule of thumb

| Need | Prefer |
|---|---|
| Sum queries (range or prefix) | Fenwick tree — simpler |
| Min/max/GCD queries | Segment tree — only option |
| Range updates | Segment tree with lazy propagation |
| Code golf / time pressure | Fenwick tree (if sum only) |
| Full flexibility | Segment tree |

> 🎯 **Key takeaway**
> For pure prefix/range sums with point updates, a Fenwick tree is the simpler and faster choice. For anything else — range updates, non-invertible operations, lazy propagation — use a segment tree.

---

<a id="lesson-19"></a>
## Lesson 19 — Quick reference

### Complexity summary

| Operation | Time | Space |
|---|---|---|
| Build | O(n) | O(n) |
| Point query | O(log n) | — |
| Point update | O(log n) | — |
| Range query | O(log n) | — |
| Range update (naive, no lazy) | O(k log n) | — |
| Range update (lazy propagation) | O(log n) | O(n) extra for lazy |
| 2D range query | O(log² n) | O(n log n) |

### Skeleton: recursive seg-tree (sum)

```js
const n = arr.length;
const tree = new Array(4 * n).fill(0);

function build(node, start, end) {
  if (start === end) { tree[node] = arr[start]; return; }
  const mid = (start + end) >> 1;
  build(2 * node, start, mid);
  build(2 * node + 1, mid + 1, end);
  tree[node] = tree[2 * node] + tree[2 * node + 1];
}

function update(node, start, end, idx, val) {
  if (start === end) { arr[idx] = val; tree[node] = val; return; }
  const mid = (start + end) >> 1;
  if (idx <= mid) update(2 * node, start, mid, idx, val);
  else            update(2 * node + 1, mid + 1, end, idx, val);
  tree[node] = tree[2 * node] + tree[2 * node + 1];
}

function query(node, start, end, l, r) {
  if (r < start || end < l) return 0;
  if (l <= start && end <= r) return tree[node];
  const mid = (start + end) >> 1;
  return query(2 * node, start, mid, l, r)
       + query(2 * node + 1, mid + 1, end, l, r);
}
```

### Skeleton: iterative seg-tree (sum)

```js
class SegTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(2 * this.n).fill(0);
    for (let i = 0; i < this.n; i++) this.tree[this.n + i] = arr[i];
    for (let i = this.n - 1; i > 0; i--)
      this.tree[i] = this.tree[2*i] + this.tree[2*i+1];
  }
  update(i, val) {
    let p = i + this.n;
    this.tree[p] = val;
    for (p >>= 1; p >= 1; p >>= 1)
      this.tree[p] = this.tree[2*p] + this.tree[2*p+1];
  }
  query(l, r) {   // [l, r] inclusive
    let res = 0;
    for (l += this.n, r += this.n + 1; l < r; l >>= 1, r >>= 1) {
      if (l & 1) res += this.tree[l++];
      if (r & 1) res += this.tree[--r];
    }
    return res;
  }
}
```

### Skeleton: lazy seg-tree (range add, range sum)

```js
const tree = new Array(4 * n).fill(0);
const lazy = new Array(4 * n).fill(0);

function pushDown(node, start, end) {
  if (lazy[node] !== 0) {
    const mid = (start + end) >> 1;
    const lc = 2 * node, rc = 2 * node + 1;
    tree[lc] += lazy[node] * (mid - start + 1);
    tree[rc] += lazy[node] * (end - mid);
    lazy[lc] += lazy[node];
    lazy[rc] += lazy[node];
    lazy[node] = 0;
  }
}

function rangeUpdate(node, start, end, l, r, val) {
  if (r < start || end < l) return;
  if (l <= start && end <= r) {
    tree[node] += val * (end - start + 1);
    lazy[node] += val;
    return;
  }
  pushDown(node, start, end);
  const mid = (start + end) >> 1;
  rangeUpdate(2 * node, start, mid, l, r, val);
  rangeUpdate(2 * node + 1, mid + 1, end, l, r, val);
  tree[node] = tree[2 * node] + tree[2 * node + 1];
}

function rangeQuery(node, start, end, l, r) {
  if (r < start || end < l) return 0;
  if (l <= start && end <= r) return tree[node];
  pushDown(node, start, end);
  const mid = (start + end) >> 1;
  return rangeQuery(2 * node, start, mid, l, r)
       + rangeQuery(2 * node + 1, mid + 1, end, l, r);
}
```

### The "five questions" checklist for any seg-tree problem

1. What is the **merge operation**? (sum, min, max, GCD, XOR, …)
2. What is the **identity element** (returned when the range is empty)?
3. Do I need **range updates** or just point updates?
4. If range updates: what is the **lazy tag** and how do I apply + propagate it?
5. Do the values fit in a plain array, or do I need **coordinate compression**?

---

<a id="lesson-20"></a>
## Lesson 20 — You did it. Now what?

That was a lot. Give yourself credit — segment trees are genuinely one of the harder data structures beginners encounter. If some parts felt fuzzy the first time through, that's completely normal.

### What you should walk away with

1. **Why we need segment trees** — when you have both range queries and updates, O(n) is too slow and prefix sums break.
2. **The structure** — binary tree, each node covers a range, stores a summary. Leaves store raw values.
3. **Build:** O(n), post-order traversal.
4. **Query:** O(log n), combine only the nodes that tile your target range.
5. **Point update:** O(log n), update the leaf and all ancestors.
6. **Space:** allocate 4n to be safe.
7. **Lazy propagation:** deferred range updates — mark nodes with pending work and push down only when needed.
8. **What operations work:** anything associative.
9. **When to pick Fenwick vs segment tree:** Fenwick for pure sums, segment tree for everything else.

### What to do next

1. Open [`questions/01-iterative-seg-tree.md`](./questions/01-iterative-seg-tree.md).
2. Implement the iterative seg-tree from scratch — **no peeking at the notes** until you're stuck.
3. Once the iterative one is solid, move to `02-lazy-seg-tree.md`.
4. The easy questions (03–07) are where you lock in the "change the merge function" pattern.
5. The medium and hard questions are where you discover every edge case.

### Pacing

- This topic rewards **depth over breadth**. Fully understanding the iterative seg-tree (Q1) is worth more than skimming all 27 questions.
- The lazy propagation lessons are dense. If they feel confusing, re-read Lesson 14 and 15 once more, then write the code yourself line by line.
- If something still doesn't click, move on and come back. Often the understanding arrives when you see the same idea from a different angle in a later problem.

You're doing the hard thing. **Keep going.**

See you in [Q1](./questions/01-iterative-seg-tree.md). 💪
