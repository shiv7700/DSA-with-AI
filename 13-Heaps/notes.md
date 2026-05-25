# Heaps & Priority Queues — Lessons from Zero

> 👋 Hey. This file is for someone who's never worked with heaps before. Don't worry — a heap sounds intimidating (it's a tree! it's an array! it does logarithmic things!) but the core idea fits in your head in about ten minutes. Each lesson teaches **one small thing**. By the end you'll have the intuition to solve the most common heap problems at interviews and in real code.
>
> Total reading time at a relaxed pace: about 90 minutes, with breaks. **You do not have to read it all in one sitting.**

---

## Table of Lessons

1. [The problem we're trying to solve](#lesson-1)
2. [Priority queues — the concept](#lesson-2)
3. [A heap is the implementation](#lesson-3)
4. [Min-heap vs max-heap — the invariant](#lesson-4)
5. [The "almost complete binary tree" shape](#lesson-5)
6. [Why a heap lives in a plain array](#lesson-6)
7. [The parent/child index math](#lesson-7)
8. [Push (bubble-up) — step by step](#lesson-8)
9. [Pop (sift-down) — step by step](#lesson-9)
10. [buildHeap from an array is O(n) — wait, what?](#lesson-10)
11. [Heap sort](#lesson-11)
12. [Heap vs BST — different superpowers](#lesson-12)
13. ["Top K" problems — the killer use case](#lesson-13)
14. [Building a MinHeap class in JavaScript](#lesson-14)
15. [Building a MaxHeap and a generic PriorityQueue](#lesson-15)
16. [Dijkstra and Prim — a quick preview](#lesson-16)
17. [Quick reference](#lesson-17)
18. [You did it — what to do next](#lesson-18)

---

<a id="lesson-1"></a>
## Lesson 1 — The problem we're trying to solve

Before we talk about heaps, let's talk about *why* heaps exist. They solve a specific problem that comes up constantly.

Imagine you're running a hospital emergency room. Patients keep arriving all day. Each patient has a severity score: 1 (minor cut) up to 10 (cardiac arrest). When a doctor becomes free, they should always see **the most urgent patient first**, regardless of who arrived when.

How would you keep track of this with the data structures you already know?

**Option A: unsorted array**

Just add each patient to the end of the array. When a doctor is free, scan the whole array for the highest severity. That scan is O(n). With 1,000 patients that means a thousand comparisons every single time you need to pick the next patient.

**Option B: sorted array (or sorted list)**

Keep patients sorted by severity at all times. Picking the most urgent is O(1) — just look at the front. But *inserting* a new patient in the right place means finding the insertion point and shifting everyone to the right: O(n) work.

Neither option is great. We need something that's fast for **both** insertion **and** getting the best element.

**Option C: a heap**

| Operation | Array (unsorted) | Sorted Array | Heap |
|---|---|---|---|
| Insert a new element | O(1) | O(n) | **O(log n)** |
| Get the min (or max) | O(n) | O(1) | **O(1)** |
| Remove the min (or max) | O(n) | O(n) | **O(log n)** |

A heap gives you the best of both worlds: O(log n) insertion, O(1) peek, O(log n) removal. For large inputs, that's a massive improvement.

> 🎯 **Key takeaway**
> A heap is the right tool when you repeatedly need to quickly get the "best" (smallest or largest) item from a collection that keeps changing.

---

<a id="lesson-2"></a>
## Lesson 2 — Priority queues — the concept

The **priority queue** is an abstract data type (a concept, not a specific implementation). It works like a queue — things go in, things come out — except items come out in **priority order**, not arrival order.

Think of it as a to-do list that always shows you the most important task next. You can add tasks whenever you want, and the list always keeps the highest-priority task at the front.

```
Add task "Reply to email"     (priority 3)
Add task "Fix critical bug"   (priority 9)
Add task "Team lunch"         (priority 1)
Add task "Deploy hotfix"      (priority 10)

Next() → "Deploy hotfix"   (priority 10, highest)
Next() → "Fix critical bug" (priority 9)
Next() → "Reply to email"  (priority 3)
Next() → "Team lunch"       (priority 1)
```

The key promise: **dequeue always gives you the item with the best priority**.

There are multiple ways to implement a priority queue. A binary heap is by far the most common because it achieves the O(log n) operations we just described. That's what we'll spend most of this chapter on.

> 💡 **Tip**
> When an interview problem says "priority queue", think "heap." When it says "heap", it probably means "priority queue." They're almost always interchangeable in practice.

---

<a id="lesson-3"></a>
## Lesson 3 — A heap is the implementation

A **binary heap** is a concrete data structure that satisfies two rules simultaneously:

1. **Shape property** — it's an "almost complete binary tree" (we'll explain this in Lesson 5)
2. **Heap property** — every node satisfies an ordering rule relative to its children (we'll explain this in Lesson 4)

These two rules together are what make all the O(log n) operations possible. They're simple but powerful.

For now, let's get a feel for what a heap *looks* like as a tree. Here's a heap storing the numbers 1 through 9:

```
            1
          /   \
        3       2
       / \     / \
      7   5   4   6
     / \
    9   8
```

Notice a few things:
- The smallest number (1) is always at the very top. This is a **min-heap**.
- Every parent is smaller than both of its children.
- The tree looks "filled left to right" — no gaps, levels fill up before moving to the next.

That's a heap. Let's now understand each of those properties in depth.

> 🎯 **Key takeaway**
> A binary heap is a nearly-complete binary tree where every parent beats its children in priority. The winner is always at the top.

---

<a id="lesson-4"></a>
## Lesson 4 — Min-heap vs max-heap — the invariant

There are two flavors of heap. They're mirror images of each other.

### Min-heap

**Invariant:** every parent is **≤** both of its children.

The result: the **minimum** element is always at the root (top of the tree, index 0 in the array).

```
            1         ← always the smallest
          /   \
        3       2
       / \     / \
      7   5   4   6
```

Use a min-heap when you need to repeatedly pull out the **smallest** item.

### Max-heap

**Invariant:** every parent is **≥** both of its children.

The result: the **maximum** element is always at the root.

```
            9         ← always the largest
          /   \
        7       8
       / \     / \
      3   5   4   6
```

Use a max-heap when you need to repeatedly pull out the **largest** item.

### The invariant is NOT a full sort

This is the most common misconception. Look at the min-heap above: `5` is to the right of `7`, and `7 > 5`, but `5` is not a child of `7`. The heap only guarantees a parent is better than its **own** children — not that the whole tree is sorted left-to-right like a BST.

> ⚠️ **Common misconception**
> A heap is NOT a sorted array. You cannot binary search a heap. Elements at the same level can be in any order relative to each other. The only guarantee is parent ≤ children (min-heap) or parent ≥ children (max-heap).

> 🎯 **Key takeaway**
> Min-heap: root is always the minimum. Max-heap: root is always the maximum. The invariant only applies parent-to-child, not across siblings.

---

<a id="lesson-5"></a>
## Lesson 5 — The "almost complete binary tree" shape

A **complete binary tree** is one where every level except possibly the last is completely filled, and the last level is filled **from left to right** with no gaps.

Here's a complete binary tree with 9 elements:

```
Level 0:          1               ← full (1 node)
Level 1:       3     2            ← full (2 nodes)
Level 2:     7   5  4   6         ← full (4 nodes)
Level 3:    9  8                  ← last level, left-filled
```

And here is a tree that is NOT a valid heap shape (has a gap on the left of the last level):

```
Level 0:          1
Level 1:       3     2
Level 2:     7   5  4   6
Level 3:              9   8   ← ❌ gap on the left!
```

**Why does the shape matter?**

1. **No gaps means we can store it in a plain array.** When there are no holes, the array index math works perfectly (Lesson 7).
2. **The height is always O(log n).** Because levels fill up completely before a new level starts, a heap with `n` nodes is always `log₂(n)` levels tall. That's what gives us O(log n) operations — push and pop only need to travel up or down one path from root to leaf.

> ✋ **Pause and think**
> A heap with 1 million nodes has a height of about log₂(1,000,000) ≈ 20. So push/pop at most do 20 comparisons. Contrast that with a sorted linked list where finding the right position could take 1,000,000 steps. Do you see why the shape matters so much?

> 🎯 **Key takeaway**
> The "left-filled" shape keeps the heap balanced, which keeps the height at O(log n), which keeps all operations fast.

---

<a id="lesson-6"></a>
## Lesson 6 — Why a heap lives in a plain array

Here's the real magic. A heap looks like a tree on paper, but in code, we **never create tree nodes or pointers**. We store everything in a flat JavaScript array.

How? Because the heap's shape is so predictable (left-filled, level by level) that we can just lay it out in memory level by level:

```
Tree:                Array:
      1              index:  0  1  2  3  4  5  6  7  8
    /   \            value: [1, 3, 2, 7, 5, 4, 6, 9, 8]
  3       2
 / \     / \
7   5   4   6
/ \
9  8
```

We simply read the tree top-to-bottom, left-to-right, and pack it into an array. Because there are no gaps (the shape property guarantees this), there's no wasted space.

This is beautiful for two reasons:

1. **Memory efficiency** — no extra pointers or node objects. Just a plain array of values.
2. **Cache performance** — elements that are near each other in the tree are near each other in memory. Processors love sequential access.

> 💡 **Tip**
> In JavaScript, a heap is literally just:
> ```js
> class MinHeap {
>   constructor() {
>     this.heap = [];  // that's it!
>   }
> }
> ```
> Everything else is just clever index arithmetic.

> 🎯 **Key takeaway**
> Heaps are stored in arrays. The "almost complete" shape makes this possible without any gaps or wasted space.

---

<a id="lesson-7"></a>
## Lesson 7 — The parent/child index math

Now that we know the heap lives in an array, we need to navigate it. Given that node `i` is at some index in the array, where are its children? Where is its parent?

The formulas are:

```
parent(i)       = Math.floor((i - 1) / 2)    ← or: (i - 1) >> 1  (bit shift, same thing)
left child(i)   = 2 * i + 1
right child(i)  = 2 * i + 2
```

Let's verify with our example: `[1, 3, 2, 7, 5, 4, 6, 9, 8]`

```
Index:  0   1   2   3   4   5   6   7   8
Value: [1,  3,  2,  7,  5,  4,  6,  9,  8]
```

- Node at index 1 (value `3`):
  - Parent: `(1-1) >> 1 = 0` → value `1` ✅
  - Left child: `2*1+1 = 3` → value `7` ✅
  - Right child: `2*1+2 = 4` → value `5` ✅

- Node at index 2 (value `2`):
  - Parent: `(2-1) >> 1 = 0` → value `1` ✅
  - Left child: `2*2+1 = 5` → value `4` ✅
  - Right child: `2*2+2 = 6` → value `6` ✅

- Node at index 0 (root, value `1`):
  - No parent (it's the root)
  - Left child: index 1 → value `3` ✅
  - Right child: index 2 → value `2` ✅

```js
const parent     = i => (i - 1) >> 1;
const leftChild  = i => 2 * i + 1;
const rightChild = i => 2 * i + 2;
```

Memorize these three formulas. They're the entire "tree navigation" for a heap.

> ✋ **Pause and verify**
> In the array `[1, 3, 2, 7, 5, 4, 6, 9, 8]`, what is the parent of the node at index 7 (value `9`)? What are the children of node at index 3 (value `7`)?
>
> <details>
> <summary>Show answer</summary>
>
> - Parent of index 7: `(7-1) >> 1 = 3` → value `7` ✅ (9 is a child of 7)
> - Children of index 3 (value `7`):
>   - Left: `2*3+1 = 7` → value `9` ✅
>   - Right: `2*3+2 = 8` → value `8` ✅
> </details>

> 🎯 **Key takeaway**
> Three formulas: `parent = (i-1)>>1`, `left = 2i+1`, `right = 2i+2`. These replace every pointer you'd need in a traditional tree node.

---

<a id="lesson-8"></a>
## Lesson 8 — Push (bubble-up) — step by step

Inserting into a heap is a two-step process:

1. **Append** the new value to the end of the array (this maintains the shape property).
2. **Bubble-up** (also called sift-up or percolate-up): swap the new value with its parent, over and over, until the heap property is restored.

Let's walk through inserting `2` into this min-heap:

**Before:**
```
Heap array: [3, 5, 7, 8, 10, 12]

        3
      /   \
    5       7
   / \     /
  8  10   12
```

**Step 1: Append to end (index 6)**
```
Heap array: [3, 5, 7, 8, 10, 12, 2]

        3
      /   \
    5       7
   / \     / \
  8  10  12   2   ← 2 just landed here
```

**Step 2: Bubble-up. Current index = 6. Parent = (6-1)>>1 = 2 (value 7). Is 2 < 7? Yes — swap!**
```
Heap array: [3, 5, 2, 8, 10, 12, 7]

        3
      /   \
    5       2   ← 2 moved up
   / \     / \
  8  10  12   7
```

**Step 3: Current index = 2. Parent = (2-1)>>1 = 0 (value 3). Is 2 < 3? Yes — swap!**
```
Heap array: [2, 5, 3, 8, 10, 12, 7]

        2   ← 2 reached the root
      /   \
    5       3
   / \     / \
  8  10  12   7
```

**Step 4: Current index = 0. No parent (we're at the root). Done.**

The final heap is valid: every parent ≤ both children. And we only did **O(log n)** comparisons — one for each level we traveled up.

```js
_siftUp(i) {
  while (i > 0) {
    const p = (i - 1) >> 1;               // parent index
    if (this.heap[p] <= this.heap[i]) break;  // heap property satisfied
    [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]]; // swap
    i = p;                                  // move up
  }
}

push(val) {
  this.heap.push(val);          // step 1: append
  this._siftUp(this.heap.length - 1);  // step 2: bubble-up
}
```

> 🎯 **Key takeaway**
> Push = append to end + bubble-up by swapping with parent until the heap property holds. At most O(log n) swaps.

---

<a id="lesson-9"></a>
## Lesson 9 — Pop (sift-down) — step by step

Removing (always removes the root — the min or max) is trickier. We can't just yank out the root, because that leaves a hole at the top. Here's the process:

1. **Swap** the root with the **last element** in the array.
2. **Remove** the last element (which is now the old root — the value we wanted).
3. **Sift-down** (also called percolate-down): swap the new root with its **smaller child** (for min-heap), over and over, until the heap property is restored.

Let's pop from this heap:

**Before:**
```
Heap array: [2, 5, 3, 8, 10, 12, 7]

        2   ← we want this
      /   \
    5       3
   / \     / \
  8  10  12   7
```

**Step 1: Swap root with last element**
```
Heap array: [7, 5, 3, 8, 10, 12, 2]

        7   ← temporary
      /   \
    5       3
   / \     / \
  8  10  12   2
```

**Step 2: Remove the last element (value 2 — that's our extracted min)**
```
Heap array: [7, 5, 3, 8, 10, 12]

        7
      /   \
    5       3
   / \     /
  8  10  12
```

**Step 3: Sift-down. Index = 0 (value 7). Children: left=1 (value 5), right=2 (value 3). Smallest child is 3 (index 2). Is 7 > 3? Yes — swap!**
```
Heap array: [3, 5, 7, 8, 10, 12]

        3
      /   \
    5       7   ← 7 moved down
   / \     /
  8  10  12
```

**Step 4: Index = 2 (value 7). Children: left=5 (value 12), right=6 (out of bounds). Only child: index 5 (value 12). Is 7 > 12? No — done.**

The heap is valid again! We extracted `2` and the heap re-organized in O(log n) time.

```js
_siftDown(i) {
  const n = this.heap.length;
  while (true) {
    let smallest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n && this.heap[l] < this.heap[smallest]) smallest = l;
    if (r < n && this.heap[r] < this.heap[smallest]) smallest = r;
    if (smallest === i) break;  // heap property holds
    [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
    i = smallest;
  }
}

pop() {
  if (this.heap.length === 0) return undefined;
  const min = this.heap[0];
  const last = this.heap.pop();
  if (this.heap.length > 0) {
    this.heap[0] = last;    // put last element at root
    this._siftDown(0);      // restore heap property
  }
  return min;
}
```

> ⚠️ **Sift-down always picks the SMALLER child (for min-heap)**
> If you swap with the larger child, you'd violate the heap property (the smaller child would become a child of something larger than it). Always pick the better child.

> 🎯 **Key takeaway**
> Pop = swap root with last + remove last + sift-down by swapping with smaller child. At most O(log n) swaps.

---

<a id="lesson-10"></a>
## Lesson 10 — buildHeap from an array is O(n) — wait, what?

Here's something genuinely counterintuitive. If you have an unsorted array of `n` elements and you want to build a min-heap from them, the naive approach is to call `push` on each element one by one. That's `n` push operations × O(log n) each = **O(n log n)** total.

But there's a smarter way — **Floyd's heap construction** — that does it in **O(n)** time. How?

**The key insight:** don't think of the array as individual elements being inserted. Think of it as a tree that already has the right *shape*, just not the right *order*. We only need to fix the ordering, and we can do that from the bottom up.

**The algorithm:**

1. Treat the input array as a heap (shape is already correct — it's a full array with no gaps).
2. The leaf nodes (second half of the array) are already valid heaps of size 1 — no work needed.
3. Start from the **last non-leaf** node (at index `Math.floor(n/2) - 1`) and sift-down each node, moving towards the root.

Let's trace this for `[9, 4, 7, 1, 8, 3, 5]`:

```
Initial array as a tree:

           9           ← index 0 (needs work)
         /   \
       4       7       ← indices 1, 2 (need work)
      / \     / \
     1   8   3   5     ← indices 3, 4, 5, 6 (leaves, already valid)
```

Last non-leaf index = `Math.floor(7/2) - 1 = 2` (value `7`).

**Step 1: Sift-down index 2 (value 7). Children: 3 (index 5), 5 (index 6). Smaller is 3. Swap.**
```
           9
         /   \
       4       3
      / \     / \
     1   8   7   5
```

**Step 2: Sift-down index 1 (value 4). Children: 1 (index 3), 8 (index 4). Smaller is 1. Swap.**
```
           9
         /   \
       1       3
      / \     / \
     4   8   7   5
```
Then sift-down continues from new position of 4 (index 3) — no children violate. Done with this node.

**Step 3: Sift-down index 0 (value 9). Children: 1 (index 1), 3 (index 2). Smaller is 1. Swap.**
```
           1
         /   \
       9       3
      / \     / \
     4   8   7   5
```
Then sift-down continues from new position of 9 (index 1). Children: 4, 8. Smaller is 4. Swap.
```
           1
         /   \
       4       3
      / \     / \
     9   8   7   5
```
Done.

**Why is it O(n) and not O(n log n)?**

Most nodes are near the bottom, and nodes near the bottom have very little room to sift down. In fact, half the nodes are leaves (0 work). A quarter need at most 1 swap. An eighth need at most 2 swaps. If you add that all up mathematically:

```
sum = n/2 × 0 + n/4 × 1 + n/8 × 2 + n/16 × 3 + …
    = n × (0 + 1/4 + 2/8 + 3/16 + …)
    = n × 1                              ← this series sums to 1
    = O(n)
```

It's a beautiful result: **building a heap from an array is O(n), not O(n log n).**

```js
static heapify(arr) {
  const h = new MinHeap();
  h.heap = arr.slice();                          // copy the array
  for (let i = Math.floor(h.heap.length / 2) - 1; i >= 0; i--) {
    h._siftDown(i);                              // sift down each non-leaf
  }
  return h;
}
```

> 🔬 **Going deeper (optional)**
> The mathematical argument that the sum converges to O(n) uses the formula for the sum of the series `∑ k/2^k`. If you're curious, it's a fun calculus/combinatorics exercise. For interviews, just knowing "buildHeap is O(n) because most nodes are leaves and barely need sifting" is sufficient.

> 🎯 **Key takeaway**
> Building a heap bottom-up (Floyd's algorithm) is O(n), not O(n log n). Half the nodes are leaves, so most nodes do almost no work.

---

<a id="lesson-11"></a>
## Lesson 11 — Heap sort

Now that we know how to build a heap and pop from it, sorting an array is almost free:

1. Build a max-heap from the array in O(n).
2. Pop the maximum element, place it at the end of the array. Repeat.

But we can do it **in place** — no extra array needed. Here's the trick:

When we pop from the max-heap, instead of discarding the last position, we keep it as part of the "sorted" section at the end. The sorted section grows from right to left.

```
Initial array:  [3, 1, 4, 1, 5, 9, 2]

Step 1: Build max-heap in place:  [9, 5, 4, 1, 1, 3, 2]

Step 2: Swap root (9) with last unsorted element (index 6, value 2):
        [2, 5, 4, 1, 1, 3, | 9]  ← 9 is now "sorted"
        Sift-down index 0 in [0..5]:
        [5, 2, 4, 1, 1, 3, | 9]
        → [5, 2, 4, 1, 1, 3, | 9]

Step 3: Swap root (5) with last unsorted (index 5, value 3):
        [3, 2, 4, 1, 1, | 5, 9]  ← 5 placed
        Sift-down → [4, 2, 3, 1, 1, | 5, 9]

... continue until fully sorted.

Final:  [1, 1, 2, 3, 4, 5, 9]
```

**Complexity:** O(n log n) time, O(1) extra space (in-place, only a constant number of extra variables).

**But why is quicksort faster in practice?**

Heap sort is O(n log n) worst-case, which is actually *better* than quicksort's O(n²) worst-case. Yet in practice, quicksort tends to run 2–5× faster. Why?

1. **Cache behavior.** Quicksort accesses elements close together in memory. Heap sort's sift-down jumps around the array unpredictably (parent at index 0, children at indices 1 and 2, their children at 3-6, etc.). Modern CPUs hate random memory access.
2. **Predictability.** Modern CPUs are great at predicting "I'll need the next element" (sequential access) but terrible at predicting heap's jump pattern.

> 💡 **Is heap sort stable?**
> No. Heap sort is not stable — equal elements can end up in different relative order than they started. If you need stability, use merge sort.

> 🎯 **Key takeaway**
> Heap sort: O(n log n) time, O(1) space. In-place. Not stable. Theoretically elegant but slower in practice than quicksort due to cache unfriendly access patterns.

---

<a id="lesson-12"></a>
## Lesson 12 — Heap vs BST — different superpowers

Both heaps and binary search trees (BSTs) are tree-based structures that organize data for fast access. But they have completely different superpowers. Picking the wrong one for a problem is a common mistake.

| Feature | Min-Heap | BST (balanced, e.g. Red-Black) |
|---|---|---|
| Find minimum | **O(1)** — it's the root | O(log n) — leftmost node |
| Find maximum | O(n) — must scan | **O(log n)** — rightmost node |
| Insert | **O(log n)** | O(log n) |
| Delete minimum | **O(log n)** | O(log n) |
| Delete arbitrary | O(n) unless you track index | **O(log n)** |
| Search for value x | O(n) — no ordering guarantee | **O(log n)** |
| In-order traversal (sorted output) | O(n log n) — must keep popping | **O(n)** — simple traversal |
| Space overhead | Low — flat array | Higher — node objects with pointers |

**When to use a heap:**
- You only care about the **minimum or maximum** element, not searching for arbitrary values.
- You need fast insert AND fast extract-min/max.
- Classic use cases: Dijkstra's algorithm, A*, merge k sorted lists, top-K elements, task scheduling.

**When to use a BST:**
- You need to **search for arbitrary values** by their key.
- You need **in-order traversal** (iterating in sorted order).
- You need to **delete arbitrary elements** efficiently.
- Classic use cases: symbol tables, range queries, database indexes, `Map`/`Set` implementations (some languages).

> 💡 **Analogy**
> A heap is like a leaderboard that always tells you who's in first place instantly, but makes you work to find who's in 500th place. A BST is like a sorted phonebook — you can look up anyone by name quickly, but finding the person with the shortest name takes a little more work.

> 🎯 **Key takeaway**
> Use a heap when you only care about the extremes (min or max). Use a BST when you need to search by value, do range queries, or iterate in sorted order.

---

<a id="lesson-13"></a>
## Lesson 13 — "Top K" problems — the killer use case

One of the most common interview problem types is **"find the top K elements"**. A heap makes these almost trivial.

### Finding the K largest elements in an array

**The trick:** use a **min-heap of size K**.

Why a *min*-heap to find the *largest*? Because the min-heap's root is the smallest element — and that's the "weakest" candidate in our current top-K. When we see a new element that beats the weakest, we kick the weakest out and promote the newcomer.

```
Find the 3 largest in [7, 10, 4, 3, 20, 15]:

Process 7:   heap = [7]
Process 10:  heap = [7, 10]
Process 4:   heap = [4, 10, 7]   (min-heap, 4 is root)
Process 3:   heap has size 3, 3 < heap.peek() (4)? Yes — skip. heap stays [4, 10, 7]
Process 20:  20 > heap.peek() (4)? Yes — pop 4, push 20. heap = [7, 10, 20]
Process 15:  15 > heap.peek() (7)? Yes — pop 7, push 15. heap = [10, 15, 20]

Result: [10, 15, 20]  — the 3 largest.
```

**Time complexity:** O(n log K). For each of `n` elements, we do at most one heap operation (O(log K)). If K is much smaller than n, this is far better than sorting (O(n log n)).

**Space complexity:** O(K) — we only ever hold K elements in the heap.

### Why not just sort?

Sorting the whole array takes O(n log n) and O(n) space. The heap approach takes O(n log K) time and O(K) space. If K = 10 and n = 1,000,000:

- Sort: ~20,000,000 operations, 1,000,000 slots of space
- Heap: ~1,000,000 × log(10) ≈ 3,300,000 operations, 10 slots of space

The heap wins by a huge margin when K << n.

### "K-th largest" vs "top K"

- **K-th largest:** same technique. After processing all elements, the root of the min-heap IS the K-th largest.
- **Top K most frequent:** use a frequency map first, then a min-heap on frequency counts.

> 🎯 **Key takeaway**
> "Top K" problems: use a min-heap of size K to find the K largest elements in O(n log K). Use a max-heap of size K to find the K smallest. The heap's root is always the "weakest" current candidate.

---

<a id="lesson-14"></a>
## Lesson 14 — Building a MinHeap class in JavaScript

JavaScript does not have a built-in heap or priority queue (unlike Python's `heapq` or Java's `PriorityQueue`). You'll need to build one from scratch or use a library. Here's a clean, commented implementation you can memorize and extend:

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Number of elements in the heap
  size() {
    return this.heap.length;
  }

  // Return the minimum element without removing it — O(1)
  peek() {
    return this.heap[0];
  }

  // Insert a new value — O(log n)
  push(val) {
    this.heap.push(val);
    this._siftUp(this.heap.length - 1);
  }

  // Remove and return the minimum value — O(log n)
  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();  // move last to root
    this._siftDown(0);
    return min;
  }

  // Bubble element at index i upward until heap property holds
  _siftUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  // Push element at index i downward until heap property holds
  _siftDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n && this.heap[l] < this.heap[smallest]) smallest = l;
      if (r < n && this.heap[r] < this.heap[smallest]) smallest = r;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }

  // Build a heap from an existing array — O(n)
  static heapify(arr) {
    const h = new MinHeap();
    h.heap = arr.slice();
    for (let i = Math.floor(h.heap.length / 2) - 1; i >= 0; i--) {
      h._siftDown(i);
    }
    return h;
  }
}
```

**Example usage:**

```js
const h = new MinHeap();
h.push(5);
h.push(3);
h.push(8);
h.push(1);

console.log(h.peek());  // 1 — always the minimum
console.log(h.pop());   // 1
console.log(h.pop());   // 3
console.log(h.pop());   // 5
console.log(h.pop());   // 8
```

> 💡 **Tip**
> In a real interview, if you're allowed to bring in a utility class, bring this one. It's ~35 lines and covers everything.

---

<a id="lesson-15"></a>
## Lesson 15 — Building a MaxHeap and a generic PriorityQueue

### MaxHeap

A MaxHeap is identical to MinHeap except all comparisons are flipped. The root is always the *largest* element.

```js
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size()  { return this.heap.length; }
  peek()  { return this.heap[0]; }

  push(val) {
    this.heap.push(val);
    this._siftUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._siftDown(0);
    return max;
  }

  _siftUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[parent] >= this.heap[i]) break;  // ← flipped
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  _siftDown(i) {
    const n = this.heap.length;
    while (true) {
      let largest = i;                                 // ← flipped
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n && this.heap[l] > this.heap[largest]) largest = l;   // ← flipped
      if (r < n && this.heap[r] > this.heap[largest]) largest = r;   // ← flipped
      if (largest === i) break;
      [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
      i = largest;
    }
  }
}
```

### Generic PriorityQueue with a comparator

Even better — write one class that handles both, and anything else you need:

```js
class PriorityQueue {
  // comparator(a, b) returns negative if a should come before b
  // Default: min-heap (a - b means smaller value wins)
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.cmp = comparator;
  }

  size()  { return this.heap.length; }
  peek()  { return this.heap[0]; }

  push(val) {
    this.heap.push(val);
    this._siftUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._siftDown(0);
    return top;
  }

  _siftUp(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(this.heap[p], this.heap[i]) <= 0) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  _siftDown(i) {
    const n = this.heap.length;
    while (true) {
      let best = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.cmp(this.heap[l], this.heap[best]) < 0) best = l;
      if (r < n && this.cmp(this.heap[r], this.heap[best]) < 0) best = r;
      if (best === i) break;
      [this.heap[i], this.heap[best]] = [this.heap[best], this.heap[i]];
      i = best;
    }
  }
}
```

**Usage examples:**

```js
// Min-heap of numbers
const minHeap = new PriorityQueue();

// Max-heap of numbers
const maxHeap = new PriorityQueue((a, b) => b - a);

// Min-heap by a custom field (objects)
const byDist = new PriorityQueue((a, b) => a.dist - b.dist);
byDist.push({ node: 'A', dist: 5 });
byDist.push({ node: 'B', dist: 2 });
console.log(byDist.pop()); // { node: 'B', dist: 2 }

// Min-heap with alphabetical tiebreak
const byFreqThenAlpha = new PriorityQueue((a, b) => {
  if (a.freq !== b.freq) return a.freq - b.freq;
  return a.word < b.word ? -1 : 1;
});
```

> ✋ **The comparator pattern**
> Comparator `(a, b)` should return:
> - **negative** if `a` should come out of the queue **before** `b`
> - **positive** if `b` should come out **before** `a`
> - **zero** if equal priority
>
> This mirrors JavaScript's `Array.prototype.sort` comparator contract.

---

<a id="lesson-16"></a>
## Lesson 16 — Dijkstra and Prim — a quick preview

Two of the most famous graph algorithms — **Dijkstra's shortest path** and **Prim's minimum spanning tree** — both use a heap at their core. Once you have a solid heap implementation, these algorithms become almost natural.

### Dijkstra's algorithm (shortest path)

The idea: find the shortest path from a source node to all other nodes in a weighted graph.

A heap lets you always expand the **nearest unvisited node** first:

```
Priority Queue (min-heap by distance):
  Start: [(dist=0, node=A)]

  Pop (dist=0, A). Explore A's neighbors:
    B at dist 4 → push (4, B)
    C at dist 2 → push (2, C)

  Pop (dist=2, C). Explore C's neighbors:
    D at dist 2+3=5 → push (5, D)
    B at dist 2+1=3 → push (3, B)  ← better than before!

  Pop (dist=3, B). Already processed B? No. Mark done.
    ...

  The heap ensures we always process the closest node next.
```

Without a heap, you'd scan all nodes for the closest one: O(n²). With a heap: O((V + E) log V) where V = vertices, E = edges.

### Prim's algorithm (minimum spanning tree)

Nearly identical structure — use a min-heap to always add the **cheapest edge** that connects a new node to the already-built spanning tree.

```
Priority Queue (min-heap by edge cost):
  Start with one arbitrary node.
  Add all its edges to the heap.
  Repeatedly: pop the cheapest edge that connects to an unvisited node.
```

> 💡 **Why does the heap matter so much here?**
> Both algorithms make a greedy choice at each step ("take the best available option"). The heap is the engine that makes the "find the best" step O(log n) rather than O(n). Without it, Dijkstra and Prim would be significantly slower on dense graphs.

You'll implement Dijkstra in questions 30–31 of this chapter.

> 🎯 **Key takeaway**
> Dijkstra and Prim both use a min-heap to greedily select the cheapest/closest next option. Knowing heaps is a prerequisite for graph algorithms.

---

<a id="lesson-17"></a>
## Lesson 17 — Quick reference

### Complexity table

| Operation | Complexity | Notes |
|---|---|---|
| `peek()` | **O(1)** | Root is always the best element |
| `push(val)` | **O(log n)** | Append + bubble-up |
| `pop()` | **O(log n)** | Swap with last + sift-down |
| `size()` | O(1) | Just `this.heap.length` |
| `buildHeap(arr)` / `heapify` | **O(n)** | Floyd's bottom-up construction |
| Heap sort | O(n log n) | Build + n pops |
| Find arbitrary element | O(n) | No ordering across levels |
| Delete arbitrary element | O(n) | Find it first, then O(log n) |

### Index math

```
parent(i)      = (i - 1) >> 1     // same as Math.floor((i-1) / 2)
leftChild(i)   = 2 * i + 1
rightChild(i)  = 2 * i + 2
```

### Min-heap vs Max-heap at a glance

```
Min-heap invariant:  parent.val ≤ both children
Max-heap invariant:  parent.val ≥ both children
Root of min-heap:    the minimum element  → pop gives you the min
Root of max-heap:    the maximum element  → pop gives you the max
```

### Common patterns

| Problem shape | Heap strategy |
|---|---|
| K largest in array | Min-heap of size K |
| K smallest in array | Max-heap of size K |
| K-th largest | Min-heap of size K — root is answer |
| K-th smallest | Max-heap of size K — root is answer |
| Merge K sorted lists/arrays | Min-heap storing (value, listIndex, elementIndex) |
| Find running median | Two heaps: max-heap for lower half, min-heap for upper half |
| Dijkstra shortest path | Min-heap by distance |
| Prim MST | Min-heap by edge weight |
| Task scheduling with cooldown | Max-heap by frequency |

### Heap vs other structures

| Need | Use |
|---|---|
| Fast min/max retrieval | **Heap** |
| Arbitrary search by value | BST or hash map |
| Sorted iteration | BST or sorted array |
| Range queries | BST or segment tree |
| Top-K elements | Heap |
| All elements sorted | Sort or BST |

---

<a id="lesson-18"></a>
## Lesson 18 — You did it. Now what?

Take a breath. Heaps pack a lot of ideas into a small space — it's normal to need to read some lessons twice.

Here's what you should now know:

1. **Why heaps exist** — O(1) peek + O(log n) push/pop is the goal.
2. **The two properties** — shape (almost complete tree) + order (min or max invariant).
3. **Array storage** — heaps live in flat arrays; no pointers needed.
4. **Index math** — `parent=(i-1)>>1`, `left=2i+1`, `right=2i+2`.
5. **Push = append + bubble-up.** Pop = swap with last + sift-down.
6. **buildHeap is O(n)** — bottom-up via Floyd's algorithm.
7. **Top-K pattern** — min-heap of size K to find K largest.
8. **When to use heap vs BST** — heaps for extremes, BSTs for search.
9. **How to implement it in JS** — no built-in; you write the class.

### What to do next

1. Open [`questions/01-implement-min-heap.md`](./questions/01-implement-min-heap.md).
2. Work through the problems **in order** — each builds on the last.
3. If you get stuck, re-read the relevant lesson here.
4. Tick off the checklist in [`README.md`](./README.md) as you finish each problem.

### Pacing

- Don't try to do all 38 problems in one day.
- The implementation questions (01–07) are your foundation — spend real time on them.
- The medium and hard problems will start feeling natural once you've internalized push/pop.

You have everything you need. Let's go. 💪
