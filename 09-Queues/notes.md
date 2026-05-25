# Queues — Lessons from Zero

> 👋 Hey. If you worked through Arrays and Stacks first, you already know the most important intuitions. This file builds directly on those. If you haven't, that's okay — we'll explain everything from scratch.
>
> Total reading time at a relaxed pace: about 60–80 minutes. **You do not have to read it all in one sitting.**

---

## Table of Lessons

1. [What's a queue? (the coffee-shop line)](#lesson-1)
2. [FIFO — what it means and why it matters](#lesson-2)
3. [Core operations: enqueue, dequeue, peek](#lesson-3)
4. [The naive approach: using a JS array as a queue](#lesson-4)
5. [Why `arr.shift()` is secretly O(n)](#lesson-5)
6. [The fix: a linked-list-backed queue](#lesson-6)
7. [Building the queue in JavaScript](#lesson-7)
8. [Circular queue — the fixed-size ring buffer](#lesson-8)
9. [Deque — the double-ended queue](#lesson-9)
10. [Priority queue — a preview (full depth in topic 13)](#lesson-10)
11. [BFS uses a queue — and here's exactly why](#lesson-11)
12. [Multi-source BFS — a preview](#lesson-12)
13. [Sliding window maximum needs a deque](#lesson-13)
14. [Quick reference and complexity table](#lesson-14)
15. [🔬 Going deeper (optional): how the ring buffer works under the hood](#lesson-15)
16. [You did it — what to do next](#lesson-16)

---

<a id="lesson-1"></a>
## Lesson 1 — What's a queue? (the coffee-shop line)

Picture Monday morning at a busy coffee shop. People arrive one by one and join the back of the line. The barista serves whoever has been waiting longest — the person at the *front* of the line.

No cutting. No rearranging. Just: **first to arrive, first to be served.**

```
Arriving →  [ Dana | Chen | Bilal | Aisha ]  → Served first
            back                        front
```

When Aisha (the front) gets her latte and leaves, Bilal moves up. When a new customer, Evan, arrives, he joins behind Dana at the back.

That is a **queue**.

In code:

```js
const coffeeLine = [];

coffeeLine.push('Aisha');   // Aisha joins the back
coffeeLine.push('Bilal');   // Bilal joins behind Aisha
coffeeLine.push('Chen');    // Chen joins behind Bilal
coffeeLine.push('Dana');    // Dana joins behind Chen

// Now serve Aisha (she arrived first):
const served = coffeeLine.shift();   // 'Aisha'
```

Other real-world queues you've interacted with today:
- The **print queue** on your computer — documents print in the order they were sent.
- Your **browser's network request queue** — HTTP requests waiting for a connection.
- **Customer support tickets** — the oldest unresolved ticket gets picked next.
- A **conveyor belt** at an airport — bags appear at the belt in the order they were loaded.

> 🎯 **Key takeaway**
> A queue is a line. New things join at one end (the **back/rear**). Things leave from the other end (the **front**). The order of arrival is preserved.

---

<a id="lesson-2"></a>
## Lesson 2 — FIFO — what it means and why it matters

FIFO stands for **First In, First Out**. The first item you put into the queue is the first item you get out. This is the defining property of a queue.

Compare it to a **stack** (which you might have studied in topic 08). A stack is LIFO — Last In, First Out. Think of a stack of plates: you always grab the top plate, which is the one you put there most recently.

```
Stack (LIFO)            Queue (FIFO)
─────────────           ─────────────
│ Top: Dana  │          Front: Aisha → ... → Back: Dana
│      Chen  │          (added in order, removed oldest-first)
│      Bilal │
│ Bot: Aisha │
```

Why does FIFO matter? Because many real processes have **fairness** or **ordering** guarantees:

- A customer who waited longer should be served first.
- A message sent earlier should be delivered earlier.
- A task submitted first should run first (in a basic job scheduler).

If you violated FIFO in these cases — say, always serving the most recently arrived customer — you'd have a **starvation** problem: the first customer might wait forever if new customers keep cutting in.

> 💡 **Tip**
> Stack = undo history (you undo the *most recent* action). Queue = print jobs (you print the *oldest* queued document). Different data structures, different fairness models.

---

<a id="lesson-3"></a>
## Lesson 3 — Core operations: enqueue, dequeue, peek

A queue has three fundamental operations. Learn these names — you'll see them in every language and every textbook.

| Operation | What it does | Also called |
|-----------|-------------|-------------|
| `enqueue(x)` | Add item `x` to the **back** of the queue | `push`, `offer`, `add` |
| `dequeue()` | Remove and return the item at the **front** | `poll`, `shift`, `remove` |
| `peek()` | Return the front item **without** removing it | `front`, `top` |

Two helpers:

| Operation | What it does |
|-----------|-------------|
| `isEmpty()` | Returns `true` if the queue has no items |
| `size()` | Returns the number of items currently in the queue |

### Visualizing operations

Let's trace through a sequence:

```
Start:      [ ]                   (empty)

enqueue(1)  [ 1 ]                 back=1, front=1
enqueue(2)  [ 1, 2 ]              back=2, front=1
enqueue(3)  [ 1, 2, 3 ]          back=3, front=1

peek()      → 1                   (queue unchanged)

dequeue()   → 1,  queue: [ 2, 3 ] front moves to 2
dequeue()   → 2,  queue: [ 3 ]    front moves to 3

enqueue(4)  [ 3, 4 ]              back=4, front=3

dequeue()   → 3,  queue: [ 4 ]
```

Notice: the items come out in exactly the order they went in. FIFO.

> ✋ **Pause and try**
> If you enqueue `'a'`, `'b'`, `'c'`, then dequeue twice, then enqueue `'d'` and `'e'`, what does the queue contain, and what will `peek()` return?
>
> <details>
> <summary>Show answer</summary>
>
> Queue contains `['c', 'd', 'e']`. `peek()` returns `'c'`.
> </details>

> 🎯 **Key takeaway**
> Three main operations: **enqueue** (add to back), **dequeue** (remove from front), **peek** (look at front without removing). All of these should ideally run in O(1).

---

<a id="lesson-4"></a>
## Lesson 4 — The naive approach: using a JS array as a queue

The most obvious way to build a queue in JavaScript is to just use an array:

```js
const queue = [];

// enqueue: push to the back
queue.push('Aisha');
queue.push('Bilal');
queue.push('Chen');

// dequeue: remove from the front
const first = queue.shift();   // 'Aisha'

// peek
const front = queue[0];        // 'Bilal'
```

This works. It produces correct FIFO behavior. You can use it for small inputs, and many people do.

**But it has a serious hidden problem.** Let's dig into it.

> ⚠️ **Spoiler:** `shift()` is slow. Very slow on large queues.

---

<a id="lesson-5"></a>
## Lesson 5 — Why `arr.shift()` is secretly O(n)

This is the most important intuition in the whole Queues topic. It's the same lesson you learned about arrays: **operations at the front are slow because everything has to shift**.

Here's what happens when you call `queue.shift()` on an array of 5 items:

```
Before shift():
  Index:    0       1       2       3       4
          ┌──────┬──────┬──────┬──────┬──────┐
          │Aisha │Bilal │Chen  │Dana  │Evan  │
          └──────┴──────┴──────┴──────┴──────┘
            ↑ front (we want to remove this)

JavaScript's internal steps:
  1. Remove Aisha from slot 0.
  2. Move Bilal from slot 1 → slot 0.
  3. Move Chen  from slot 2 → slot 1.
  4. Move Dana  from slot 3 → slot 2.
  5. Move Evan  from slot 4 → slot 3.
  6. Decrease the length.

After shift():
  Index:    0       1       2       3
          ┌──────┬──────┬──────┬──────┐
          │Bilal │Chen  │Dana  │Evan  │
          └──────┴──────┴──────┴──────┘
```

Every single remaining element had to move one slot to the left. With 5 items that's 4 moves. With 1,000 items that's 999 moves. With 1,000,000 items — a million moves.

**This is O(n) per dequeue operation.** If you dequeue N items one by one, you've done O(n²) total work. That's the difference between your program finishing in one second and finishing in 17 minutes.

> 💡 **Tip — the contrast with `push` and `pop`:**
> `push` adds at the end — there's empty space there, so no shifting needed: O(1).
> `pop` removes from the end — no shifting needed: O(1).
> `shift` and `unshift` work at the front — everything slides: O(n).
>
> This is why a naive array queue is fine for tiny inputs but breaks down at scale.

> 🎯 **Key takeaway**
> `arr.shift()` is O(n) because every remaining element must slide left. A proper queue implementation avoids this by never physically shifting elements.

---

<a id="lesson-6"></a>
## Lesson 6 — The fix: a linked-list-backed queue

The reason `arr.shift()` is slow is that we're storing items in adjacent memory slots, so removing from the front forces a massive shuffle.

The solution: **stop storing items adjacently**. Instead, each item holds a pointer to the *next* item in line. We track the first item (head) and the last item (tail) with two separate pointers.

```
head                          tail
 ↓                              ↓
┌───────┐    ┌───────┐    ┌───────┐
│ Aisha │ →  │ Bilal │ →  │ Chen  │ →  null
└───────┘    └───────┘    └───────┘
```

Now:

**Dequeue** (remove from head): just update `head` to point to the next node. The old Aisha node gets garbage-collected. **Zero shuffling. O(1).**

```
After dequeue():

head                 tail
 ↓                    ↓
┌───────┐    ┌───────┐
│ Bilal │ →  │ Chen  │ →  null
└───────┘    └───────┘
```

**Enqueue** (add to tail): create a new node, point the old tail's `next` to it, update `tail`. **Also O(1).**

```
After enqueue('Dana'):

head                          tail
 ↓                              ↓
┌───────┐    ┌───────┐    ┌───────┐
│ Bilal │ →  │ Chen  │ →  │ Dana  │ →  null
└───────┘    └───────┘    └───────┘
```

This linked structure is called a **singly linked list**, and it's the classic foundation for an efficient queue.

> 🎯 **Key takeaway**
> A linked-list queue achieves true O(1) enqueue and dequeue by never shuffling elements — only updating two pointers.

---

<a id="lesson-7"></a>
## Lesson 7 — Building the queue in JavaScript

Let's write the full implementation step by step. No magic — every line is explained.

```js
// A single "box" that holds one item and knows where the next box is.
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;    // points to the next node in line
  }
}

class Queue {
  constructor() {
    this.head = null;    // the front of the line (dequeue from here)
    this.tail = null;    // the back of the line  (enqueue here)
    this.length = 0;     // how many items we have
  }

  // Add to the back
  enqueue(value) {
    const node = new Node(value);
    if (this.tail) {
      this.tail.next = node;   // old tail points to the new node
    }
    this.tail = node;          // new tail is the new node
    if (!this.head) {
      this.head = node;        // if the queue was empty, head = tail = new node
    }
    this.length++;
  }

  // Remove from the front
  dequeue() {
    if (!this.head) return undefined;   // queue is empty
    const value = this.head.value;
    this.head = this.head.next;         // head jumps to the next node
    if (!this.head) {
      this.tail = null;                 // queue just became empty
    }
    this.length--;
    return value;
  }

  // Look at the front without removing
  peek() {
    return this.head ? this.head.value : undefined;
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }
}
```

Let's trace through enqueue / dequeue to make sure it makes sense:

```
const q = new Queue();
q.enqueue(10)  → head → [10] ← tail
q.enqueue(20)  → head → [10] → [20] ← tail
q.enqueue(30)  → head → [10] → [20] → [30] ← tail

q.dequeue()    → returns 10
               → head → [20] → [30] ← tail

q.peek()       → returns 20  (head unchanged)
q.size()       → 2
```

> ✋ **Pause and try**
> Trace through: enqueue `'x'`, enqueue `'y'`, dequeue, enqueue `'z'`, peek. Draw the head → … → tail diagram at each step.
>
> <details>
> <summary>Show answer</summary>
>
> ```
> enqueue('x'):  head → [x] ← tail
> enqueue('y'):  head → [x] → [y] ← tail
> dequeue():     returns 'x'
>                head → [y] ← tail
> enqueue('z'):  head → [y] → [z] ← tail
> peek():        returns 'y'
> ```
> </details>

---

<a id="lesson-8"></a>
## Lesson 8 — Circular queue — the fixed-size ring buffer

The linked-list queue is great when the queue can grow unboundedly. But sometimes you want a **fixed-size queue** — for example, a hardware audio buffer, a rate-limiter with a sliding window, or an embedded system with limited memory.

Enter the **circular queue** (also called a **ring buffer**).

The idea: use a fixed-size array, but instead of physically shifting elements, use two index pointers — `front` and `rear` — and let them **wrap around** the array.

```
Capacity = 5

Initial state (empty):
  [  ,  ,  ,  ,  ]   front=0, rear=0, size=0

After enqueue(A), enqueue(B), enqueue(C):
  [ A, B, C,  ,  ]   front=0, rear=3, size=3

After dequeue() → A:
  [  , B, C,  ,  ]   front=1, rear=3, size=2

After enqueue(D), enqueue(E), enqueue(F):
  [ F, B, C, D, E ]  front=1, rear=1, size=5  (FULL)
  ↑ F wrapped around to index 0!
```

The wrap-around is done with the **modulo** operator:

```js
rear = (rear + 1) % capacity;
```

If `rear` was at index 4 (the last slot) and we increment it modulo 5, it wraps back to index 0. That's how the ring is formed.

```
Visualizing the circular structure:

          ┌───┐
    ┌─────┤ F ├──────┐
    │     └───┘      │
  ┌─┴─┐            ┌─┴─┐
  │ E │            │ B │ ← front
  └─┬─┘            └─┬─┘
    │   circular    │
  ┌─┴─┐            ┌─┴─┐
  │ D │            │ C │
  └─┬─┘            └───┘
    └──────────────┘

Items go out from front (B), in at rear (after F → wraps to front area once space opens).
```

Key rules:
- **Full check:** `size === capacity`
- **Empty check:** `size === 0`
- **Enqueue:** place at `rear`, then `rear = (rear + 1) % capacity`
- **Dequeue:** read from `front`, then `front = (front + 1) % capacity`

> 🎯 **Key takeaway**
> A circular queue uses a fixed-size array with two wraparound pointers. No shifting needed — enqueue and dequeue are both O(1). Use it when the maximum size is known in advance.

---

<a id="lesson-9"></a>
## Lesson 9 — Deque — the double-ended queue

A **deque** (pronounced "deck") stands for **Double-Ended Queue**. It's a queue that lets you add *and* remove from **both** ends — front and back — in O(1).

Think of it as a queue that's also a stack. Or a more flexible sliding window.

```
Operations a deque supports:

  addFront(x)   — add to the front
  addBack(x)    — add to the back       (same as enqueue)
  removeFront() — remove from the front (same as dequeue)
  removeBack()  — remove from the back  (same as stack pop)
  peekFront()   — look at front without removing
  peekBack()    — look at back without removing
```

Deques are typically implemented with a **doubly linked list** — each node has both a `next` and a `prev` pointer, so traversal and removal work in both directions.

```
head                                     tail
 ↓                                         ↓
┌───────┐      ┌───────┐      ┌───────┐
│   A   │ ↔   │   B   │ ↔   │   C   │
│prev:null│   │prev: A│     │prev: B│
│next: B │   │next: C│     │next:null│
└───────┘      └───────┘      └───────┘
```

With this structure:
- **addFront** / **removeFront**: update `head`. O(1).
- **addBack** / **removeBack**: update `tail`. O(1).

### When do you use a deque?

1. **Sliding window maximum** (Lesson 13 — very important in interviews).
2. **Palindrome checks** — pop from both ends simultaneously.
3. **A* and BFS variants** where items can be re-inserted at the front with priority.
4. **Undo/redo systems** — new actions go to one end, undo pops from that end, redo pops from the other.

> 💡 **Tip**
> JavaScript's built-in arrays technically support deque-like operations (`push`, `pop`, `unshift`, `shift`), but `unshift` and `shift` are O(n). If you need O(1) on both ends, build a proper doubly-linked-list deque.

---

<a id="lesson-10"></a>
## Lesson 10 — Priority queue — a preview

A **priority queue** is a queue where items don't come out in arrival order — they come out in **priority order**. The highest-priority item always comes out first, regardless of when it was inserted.

Real-world examples:
- An **emergency room**: patients aren't treated in order of arrival; a heart attack takes priority over a sprained ankle.
- An **operating system scheduler**: high-priority processes get CPU time before low-priority ones.
- **Dijkstra's shortest-path algorithm**: always processes the currently cheapest node first.

```
Regular queue:    enqueue order = dequeue order      (FIFO)
Priority queue:   priority order = dequeue order     (highest first)

Priority queue with min-priority (smallest comes first):
  enqueue(5) enqueue(1) enqueue(3) enqueue(2)
  dequeue() → 1
  dequeue() → 2
  dequeue() → 3
  dequeue() → 5
```

The efficient implementation of a priority queue uses a **binary heap** — a tree stored compactly in an array. This gives O(log n) insert and O(log n) remove-min/remove-max.

> ⚠️ **We'll cover heaps fully in topic 13.** For now, when a problem says "use a priority queue", you can stub it with a sorted array insert (O(n) insert, O(1) peek — fine for prototyping) or use the full heap implementation from topic 13.

> 🎯 **Key takeaway**
> A priority queue always returns the highest- (or lowest-) priority item, not necessarily the oldest one. Backed by a heap, it gives O(log n) insert and O(log n) extract.

---

<a id="lesson-11"></a>
## Lesson 11 — BFS uses a queue — and here's exactly why

**Breadth-First Search** (BFS) is one of the most important graph and tree algorithms. And it is fundamentally powered by a queue. Let's see why.

Imagine you're exploring a building looking for a red door. The building has rooms connected by hallways:

```
         Room 1
        /      \
     Room 2   Room 3
    /    \       \
Room 4  Room 5  Room 6
```

**BFS strategy:** explore all rooms at distance 1 from the start before going to distance 2. Then distance 2 before distance 3. And so on.

Why? Because the first time you reach any room is via the **shortest path** from the start. If you're looking for the nearest red door, BFS guarantees you find it in the minimum number of steps.

**The queue is what enforces this level-by-level order:**

```
Step 1: enqueue(Room1)
Queue: [ Room1 ]

Step 2: dequeue Room1, enqueue its neighbors Room2, Room3
Queue: [ Room2, Room3 ]   ← all distance-1 rooms

Step 3: dequeue Room2, enqueue its neighbors Room4, Room5
Queue: [ Room3, Room4, Room5 ]

Step 4: dequeue Room3, enqueue its neighbor Room6
Queue: [ Room4, Room5, Room6 ]   ← all distance-2 rooms

... and so on
```

The queue naturally maintains the ordering: "finish exploring all rooms at depth d before starting depth d+1" — because rooms at depth d were enqueued before rooms at depth d+1, and FIFO means they'll be dequeued first.

If you replaced the queue with a stack, you'd get DFS instead — diving deep before exploring neighbors. DFS doesn't give you shortest paths.

### BFS template

```js
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];           // using array for simplicity

  while (queue.length > 0) {
    const node = queue.shift();    // dequeue from front
    // ── process node here ──

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);      // enqueue at back
      }
    }
  }
}
```

> ⚠️ **Note:** In the template above we use `queue.shift()` — fine for learning and interviews. On very large graphs, swap in a proper linked-list queue or a head-pointer trick for O(1) dequeue.

> 🎯 **Key takeaway**
> BFS needs a queue because FIFO guarantees we process nodes level by level, which guarantees shortest-path correctness. A stack would give DFS, which explores depth-first instead.

---

<a id="lesson-12"></a>
## Lesson 12 — Multi-source BFS — a preview

Sometimes you don't start BFS from a single source — you start from **multiple sources simultaneously**. This is called **multi-source BFS**.

Classic examples:
- **Rotting Oranges**: multiple rotten oranges all start spreading rot at the same time (Q13).
- **01 Matrix**: find the distance from every cell to the nearest 0 — all 0-cells are sources.
- **Walls and Gates**: find distance from every empty room to the nearest gate.

The trick: enqueue *all* sources at the beginning, before the loop starts. BFS then naturally spreads outward from all of them simultaneously.

```js
// Multi-source BFS template
const queue = [];
for (const source of sources) {
  queue.push(source);    // enqueue all starting points
  visited.add(source);
}

while (queue.length > 0) {
  const node = queue.shift();
  for (const neighbor of neighbors(node)) {
    if (!visited.has(neighbor)) {
      visited.add(neighbor);
      dist[neighbor] = dist[node] + 1;
      queue.push(neighbor);
    }
  }
}
```

The result is that `dist[cell]` holds the distance to the **nearest** source, for every cell.

> 💡 **Tip**
> Multi-source BFS is just regular BFS with multiple starting points. Mentally you can imagine a single virtual "super-source" node connected to all real sources with zero-weight edges.

---

<a id="lesson-13"></a>
## Lesson 13 — Sliding window maximum needs a deque

Here's a genuinely tricky problem that shows the power of a deque:

**Given an array and a window of size `k`, find the maximum element in every possible window of size `k`.**

```
Array:   [1, 3, -1, -3, 5, 3, 6, 7]
k = 3

Windows:
  [1, 3, -1]  → max = 3
  [3, -1, -3] → max = 3
  [-1,-3, 5]  → max = 5
  [-3, 5, 3]  → max = 5
  [5, 3, 6]   → max = 6
  [3, 6, 7]   → max = 7

Output: [3, 3, 5, 5, 6, 7]
```

**Naive:** for each window, scan all k elements to find the max. That's O(nk). With n = 10^5 and k = 10^4, that's 10^9 operations. Too slow.

**Deque solution: O(n).**

The key insight: maintain a deque of **indices** that could potentially be the maximum of some future window. Keep the deque in **decreasing order** of the actual values.

The invariant at each step: **the deque front is always the index of the current window's maximum**.

Trace through:

```
Array: [1, 3, -1, -3, 5, 3, 6, 7],  k = 3
Deque stores indices.

i=0, val=1:  deque: [0]
i=1, val=3:  3 > arr[0]=1, so pop 0.  deque: [1]
i=2, val=-1: -1 < arr[1]=3, just push.  deque: [1, 2]
             window is full (i=2 ≥ k-1=2): output arr[deque[0]] = arr[1] = 3

i=3, val=-3: pop front if out of window (deque[0]=1 ≤ 3-k=0): pop 1.
             wait, 1 > 0, so don't pop front. push -3.
             -3 < arr[2]=-1, push: deque: [1, 2, 3]
             output arr[deque[0]] = arr[1] = 3

i=4, val=5:  5 > arr[3]=-3: pop 3. 5 > arr[2]=-1: pop 2. 5 > arr[1]=3: pop 1.
             deque: [4]
             output arr[4] = 5

... and so on
```

Rules:
1. **Pop from back** while `arr[dequeBack] <= arr[i]` — smaller elements can never be future maxima once `i` is in the window.
2. **Pop from front** if the front index has slid out of the current window (`front < i - k + 1`).
3. **Push** `i` to the back.
4. When `i >= k - 1`, the front of the deque is the current maximum index.

```js
function maxSlidingWindow(nums, k) {
  const deque = [];    // stores indices
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Remove indices that are out of the window
    while (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }
    // Remove indices whose values are smaller than nums[i]
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }
    deque.push(i);

    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;
}
```

> 🎯 **Key takeaway**
> The deque maintains a "candidates list" in decreasing order. Each element is pushed once and popped at most once — so total work is O(n), even though we're looking at every window.

---

<a id="lesson-14"></a>
## Lesson 14 — Quick reference and complexity table

Here's the cheat sheet for everything we've covered.

### Complexity table

| Operation | Array (naive) | Linked-list Queue | Circular Queue | Deque (doubly linked) | Priority Queue (heap) |
|-----------|:---:|:---:|:---:|:---:|:---:|
| `enqueue` / `addBack` | O(1)* | O(1) | O(1) | O(1) | O(log n) |
| `dequeue` / `removeFront` | **O(n)** | O(1) | O(1) | O(1) | O(log n) |
| `peek` | O(1) | O(1) | O(1) | O(1) | O(1) |
| `addFront` | O(n) | O(1) | O(1) | O(1) | — |
| `removeBack` | O(1) | O(1) | O(1) | O(1) | — |
| Space | O(n) | O(n) | O(capacity) | O(n) | O(n) |

\* amortized; occasional resizing is O(n)

### Which queue should I use?

| Situation | Use |
|-----------|-----|
| General purpose, unbounded | Linked-list queue |
| Fixed-size buffer, ring-wrap semantics | Circular queue |
| Need to add/remove from both ends | Deque (doubly linked) |
| Need "smallest" or "largest" always at front | Priority queue (heap) |
| Quick prototype, small input | Array with `push`/`shift` |
| BFS | Any queue (array is fine for interviews) |
| Sliding window max/min | Deque (monotonic) |

### Complexity quick-hits

| Task | Complexity | Data structure |
|------|-----------|----------------|
| BFS on graph with V vertices, E edges | O(V + E) | Queue |
| Sliding window max, n elements, window k | O(n) | Monotonic deque |
| K-th largest in a stream | O(n log k) | Min-heap of size k |
| Building a heap from n elements | O(n) | Array / heap |
| Dijkstra with priority queue | O((V + E) log V) | Min-heap |

---

<a id="lesson-15"></a>
## Lesson 15 — 🔬 Going deeper (optional): how the ring buffer works under the hood

> This lesson is for the curious. **You can skip it entirely** and still solve every problem in this topic.

When you implement a circular queue, the magic is the modulo wrapping. But there's a subtle bug that beginners often hit: **how do you distinguish between "full" and "empty"?**

If you only track `front` and `rear`, both an empty queue and a full queue can end up with `front === rear`. That's ambiguous.

There are two standard solutions:

### Solution A: track `size` separately

This is the simplest. Keep a `size` counter. Empty = `size === 0`. Full = `size === capacity`.

```js
class CircularQueue {
  constructor(capacity) {
    this.data = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enqueue(val) {
    if (this.size === this.capacity) throw new Error('Queue full');
    this.data[this.rear] = val;
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
  }

  dequeue() {
    if (this.size === 0) throw new Error('Queue empty');
    const val = this.data[this.front];
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return val;
  }
}
```

### Solution B: waste one slot

Use `capacity + 1` slots. Treat the array as full when `(rear + 1) % (capacity + 1) === front`. Treat it as empty when `front === rear`. No size counter needed — but you waste one slot.

Most people prefer **Solution A** for clarity. But both are correct.

### Why ring buffers exist in hardware

CPUs and audio drivers often use ring buffers for streaming data. The producer writes at `rear`, the consumer reads from `front`, and they never block each other as long as neither end catches up to the other. This is the basis of **lock-free single-producer-single-consumer queues** — a very cool topic once you get into systems programming.

> 🎯 **Key takeaway**
> Track `size` separately to avoid the full/empty ambiguity in circular queues. Ring buffers are used everywhere in systems software for O(1) streaming without memory allocation.

---

<a id="lesson-16"></a>
## Lesson 16 — You did it. Now what?

Take a breath. Here's what you should carry away from this file:

1. **A queue is FIFO** — first in, first out. Like a coffee-shop line.
2. **Naive array queue is O(n) per dequeue** — because `shift()` slides every element. Don't use it at scale.
3. **Linked-list queue gives true O(1)** for both enqueue and dequeue.
4. **Circular queue is for fixed-size buffers** — modulo arithmetic wraps the pointers.
5. **Deque lets you add/remove from both ends** — doubly linked list, all O(1). Critical for sliding window max.
6. **Priority queue serves highest priority first** — backed by a binary heap, O(log n) insert/extract. Full depth in topic 13.
7. **BFS uses a queue** — FIFO order guarantees level-by-level exploration and shortest paths.
8. **Monotonic deque** — keep the deque in sorted order by discarding useless candidates — unlocks O(n) sliding window max/min.

### What to do next

1. Open [`questions/01-implement-queue.md`](./questions/01-implement-queue.md).
2. Build the linked-list queue from scratch — without looking at Lesson 7.
3. When it passes all tests, move to the circular queue.
4. Do the Easy questions (queue-using-two-stacks, etc.) to cement the concepts.
5. Then tackle the Medium BFS questions — Rotting Oranges is a great first BFS on a grid.
6. Use the notes as a reference when you're stuck, not as a crutch.

### Pacing

- **Don't rush the implementations** — implement-a-queue is worth 3x more than solving an easy LeetCode problem.
- **BFS questions are pattern-repetition** — once you do two, the template clicks and the rest become fast.
- **The deque is the hardest part** — if sliding window maximum confuses you, re-read Lesson 13 and trace through it by hand.

You've got this. See you in [Q1](./questions/01-implement-queue.md). 💪
