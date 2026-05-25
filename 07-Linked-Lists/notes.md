# Linked Lists — Lessons from Zero

> 👋 Hey. If you just came from Arrays, you're in the right headspace. Arrays were all about numbered slots in a row. Linked lists are completely different — and understanding *why* they're different is the whole point of this chapter.
>
> We're going to go slow. Each lesson teaches one small idea. Don't skip. Don't rush. When you finish a lesson, you should feel a small win. That's the whole goal.
>
> Total reading time at a relaxed pace: about 90–100 minutes. **You do not have to read it all in one sitting.**

---

## Table of Lessons

1. [What's a linked list? (the treasure hunt idea)](#lesson-1)
2. [Nodes — the building blocks](#lesson-2)
3. [How nodes connect: the pointer](#lesson-3)
4. [Linked list vs array — the honest trade-off](#lesson-4)
5. [Why JavaScript has no built-in LinkedList](#lesson-5)
6. [Implementing a ListNode class](#lesson-6)
7. [Traversal — "following the chain"](#lesson-7)
8. [Insertion at the head](#lesson-8)
9. [Insertion at the tail](#lesson-9)
10. [Insertion in the middle](#lesson-10)
11. [Deletion — rewiring the chain](#lesson-11)
12. [The dummy / sentinel node trick](#lesson-12)
13. [Singly vs Doubly vs Circular](#lesson-13)
14. [The slow / fast pointer pattern (tortoise and hare)](#lesson-14)
15. [Cycle detection](#lesson-15)
16. [Reversing a linked list — the three-pointer dance](#lesson-16)
17. [Recursive vs iterative traversal](#lesson-17)
18. [Quick reference: complexity table](#lesson-18)
19. [You did it — what to do next](#lesson-19)

---

<a id="lesson-1"></a>
## Lesson 1 — What's a linked list? (the treasure hunt idea)

Imagine you're playing a treasure hunt. You start with the first clue. That clue doesn't just tell you something useful — it also tells you **exactly where to find the next clue**. You go there, read the next clue, and it points you to the one after. This continues until you reach the final clue, which says "THE END."

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│  Clue: "under the   │     │  Clue: "in the red   │     │  Clue: "THE END"    │
│  kitchen sink"      │     │  flowerpot"          │     │                     │
│                     │     │                      │     │                     │
│  Next: kitchen sink │────▶│  Next: red flowerpot │────▶│  Next: null         │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
```

That's a linked list. Each **clue** is a **node**. Each node has two things:

1. **A value** — the actual useful information ("under the kitchen sink").
2. **A pointer** — "go here for the next node."

The last node's pointer doesn't point anywhere. In code, it's `null`. That's how you know you've reached the end.

The treasure hunt starts at the **head** — the first node. If you want the 4th clue, you can't skip to it directly. You follow the chain: head → node 2 → node 3 → node 4.

> 🎯 **Key takeaway**
> A linked list is a chain of nodes. Each node holds a value and a reference to the next node. You always start from the head and follow the chain.

---

<a id="lesson-2"></a>
## Lesson 2 — Nodes — the building blocks

Every linked list is made of nodes. You can picture a node like a train car:

```
  ┌──────────────────┐
  │  val: 42         │
  │  next: ──────────│────▶  (next node)
  └──────────────────┘
```

The `val` is the cargo — what the node is carrying. The `next` is the coupler — how this car connects to the one behind it.

A chain of these gives you a list:

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  val: 1  │    │  val: 2  │    │  val: 3  │    │  val: 4  │
│  next: ──│───▶│  next: ──│───▶│  next: ──│───▶│  next:   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                  null (end)
```

We often write this more compactly as:

```
1 -> 2 -> 3 -> 4 -> null
```

The arrow `->` represents the `next` pointer. `null` marks the end.

> ✋ **Pause and think**
> In a linked list `5 -> 10 -> 15 -> null`, how many nodes are there? What is the `next` pointer of the node containing `10`?
>
> <details>
> <summary>Show answer</summary>
>
> - There are **3 nodes**.
> - The node containing `10` has its `next` pointing to the node containing `15`.
> </details>

---

<a id="lesson-3"></a>
## Lesson 3 — How nodes connect: the pointer

In JavaScript, objects are stored in memory somewhere, and variables hold **references** to them — like a written address on a sticky note.

When a node's `next` property holds another node, it's not copying the node — it's holding the **address** of where that node lives.

```js
// Imagine memory layout (very simplified):

// Address 0x001:  { val: 1, next: 0x002 }
// Address 0x002:  { val: 2, next: 0x003 }
// Address 0x003:  { val: 3, next: null  }

// head points to 0x001
```

When you do `head.next`, JavaScript follows the address stored in `next` and goes to that location. This "following" is what we call **pointer chasing**.

This is the central mechanism of linked lists. Everything about insertion, deletion, and traversal boils down to: **what addresses are stored in which `next` fields?**

> 💡 **Tip**
> When you're confused by a linked list operation, draw it out. Put boxes for each node. Draw arrows for each `next`. Then figure out which arrows need to be changed.

---

<a id="lesson-4"></a>
## Lesson 4 — Linked list vs array — the honest trade-off

Before we write any code, let's understand *why* you'd pick a linked list over an array. Each has genuine strengths and genuine weaknesses.

### What arrays are good at

An array's superpower is **random access** — you can jump to any element in O(1) time.

```
arr[4]  →  jump directly to slot #4. Done.
```

Arrays also have great **cache locality** — all the elements sit next to each other in memory, so the CPU can prefetch them efficiently.

### What arrays are bad at

Front operations. To insert at index 0, everything else has to shift right. With a million elements, that's a million moves.

### What linked lists are good at

**Insertion and deletion anywhere, given a node reference, in O(1) time.**

Specifically:
- Insert at the head: O(1). Just create a new node and point its `next` to the old head.
- Delete the head: O(1). Move `head` to `head.next`.
- Insert or delete at a node you already have a reference to: O(1). Just rewire a couple of pointers.

```
Inserting at the head:

BEFORE:   head ──▶ [2] ──▶ [3] ──▶ null

Create new node [1]:
           [1]

Wire it up:
           [1].next = head      →    [1] ──▶ [2] ──▶ [3] ──▶ null
           head = [1]           →   head ──▶ [1] ──▶ [2] ──▶ [3] ──▶ null

AFTER:    head ──▶ [1] ──▶ [2] ──▶ [3] ──▶ null

Two pointer assignments. No shifting. O(1). ✅
```

### What linked lists are bad at

**Random access.** To get the element at index 4, you have to start at the head and follow 4 pointers. With a million elements, reaching index 999,999 takes 999,999 steps.

```
arr[999999]         →  O(1)   ← array wins
linkedList.get(999999)  →  O(n)   ← must follow the chain
```

### The honest summary

| Operation | Array | Linked List |
|---|---|---|
| Access by index | O(1) ✅ | O(n) ❌ |
| Insert / delete at head | O(n) ❌ | O(1) ✅ |
| Insert / delete at tail | O(1) ✅ | O(1) ✅ (with tail pointer) |
| Insert / delete in middle | O(n) | O(n) to find + O(1) to do it |
| Memory | Compact, cache-friendly ✅ | Extra memory per node ❌ |
| Grows dynamically | Needs reallocation | Natural O(1) growth ✅ |

> 🎯 **Key takeaway**
> If you need to **frequently insert or delete at the front**, a linked list wins. If you need to **look up elements by position**, an array wins. Most real problems use whichever is more convenient — and for interview problems, we practice both.

---

<a id="lesson-5"></a>
## Lesson 5 — Why JavaScript has no built-in LinkedList

If you go looking in JavaScript's standard library for a `LinkedList` class, you won't find one.

Why? JavaScript's array (`Array`) is already a very flexible structure that handles most use cases well. V8 (Chrome's JS engine) internally uses clever memory tricks to make arrays fast even for push/pop style queues. The language designers judged that adding a separate `LinkedList` class to the standard library wasn't worth the complexity.

Other languages do have them — Java has `LinkedList`, Python has `collections.deque` (a doubly-linked list under the hood).

For interviews and DSA practice, **you build your own** linked list from scratch. This is actually good — implementing it yourself forces you to understand every detail.

> 💡 **Tip**
> Don't be intimidated by "no built-in." You'll implement `ListNode` and `LinkedList` as your first two exercises. After that, every single linked list problem uses the same `ListNode` class you wrote. The foundation is tiny — just a class with two properties.

---

<a id="lesson-6"></a>
## Lesson 6 — Implementing a ListNode class

Here it is. The smallest possible building block of a linked list:

```js
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

That's all a node is. A value and a reference to the next node.

Let's build the list `1 -> 2 -> 3 -> null` manually:

```js
const node3 = new ListNode(3);        // { val: 3, next: null }
const node2 = new ListNode(2, node3); // { val: 2, next: node3 }
const node1 = new ListNode(1, node2); // { val: 1, next: node2 }

const head = node1;
```

Drawn out:

```
head
 │
 ▼
┌──────────┐    ┌──────────┐    ┌──────────┐
│  val: 1  │    │  val: 2  │    │  val: 3  │
│  next: ──│───▶│  next: ──│───▶│  next:   │
└──────────┘    └──────────┘    └──────────┘
                                  null
```

Most of the time, you'll build lists from helper functions (like converting an array), not manually node-by-node. But it's worth doing it manually once so the mental model is rock solid.

> ✋ **Pause and try**
> Using the `ListNode` class above, build the list `7 -> 14 -> 21 -> null` manually. What is `head.next.val`?
>
> <details>
> <summary>Show answer</summary>
>
> ```js
> const n3 = new ListNode(21);
> const n2 = new ListNode(14, n3);
> const n1 = new ListNode(7, n2);
> const head = n1;
>
> console.log(head.next.val); // 14
> ```
> </details>

---

<a id="lesson-7"></a>
## Lesson 7 — Traversal — "following the chain"

Traversal means visiting every node in the list, one by one. It's the linked list equivalent of a `for` loop over an array.

The pattern is always the same:

```js
let current = head;
while (current !== null) {
  // do something with current.val
  current = current.next;   // move to the next node
}
```

Think of `current` as your finger pointing at the current node. Every time the loop runs, you move your finger one step forward. When your finger falls off the end (`current === null`), you stop.

### Example: print all values

```js
function printList(head) {
  let current = head;
  while (current !== null) {
    process.stdout.write(current.val + ' -> ');
    current = current.next;
  }
  console.log('null');
}

// For 1 -> 2 -> 3 -> null, prints:
// 1 -> 2 -> 3 -> null
```

### Example: sum all values

```js
function sumList(head) {
  let sum = 0;
  let current = head;
  while (current !== null) {
    sum += current.val;
    current = current.next;
  }
  return sum;
}
```

> ⚠️ **The most common traversal bug**
> Forgetting to advance `current`. If you write:
> ```js
> while (current !== null) {
>   sum += current.val;
>   // forgot: current = current.next
> }
> ```
> This loops forever. The pointer never moves. **Always make sure the last thing in a traversal loop is advancing the pointer.**

> 🎯 **Key takeaway**
> All traversal follows the same skeleton: start at `head`, loop while `current !== null`, do work, then `current = current.next`. That's it.

---

<a id="lesson-8"></a>
## Lesson 8 — Insertion at the head

Inserting a new node at the beginning of a linked list is the simplest O(1) operation.

Say we have `2 -> 3 -> null` and we want to insert `1` at the front to get `1 -> 2 -> 3 -> null`.

```
BEFORE:   head ──▶ [2] ──▶ [3] ──▶ null
```

**Step 1:** Create a new node with value `1`.

```
           [1]
```

**Step 2:** Point the new node's `next` to the current head.

```
           [1] ──▶ [2] ──▶ [3] ──▶ null
```

**Step 3:** Update `head` to point to the new node.

```
head ──▶  [1] ──▶ [2] ──▶ [3] ──▶ null
```

In code:

```js
function insertAtHead(head, val) {
  const newNode = new ListNode(val);
  newNode.next = head;   // step 2
  head = newNode;        // step 3
  return head;           // return the new head
}
```

> ⚠️ **Critical order detail**
> Always point `newNode.next` to the old `head` **before** you update `head`. If you update `head` first, you lose your reference to the rest of the list.
>
> ```js
> // ❌ Wrong order:
> head = newNode;        // now head points to newNode...
> newNode.next = head;   // ...but head IS newNode, so we're pointing to ourselves!
>
> // ✅ Correct order:
> newNode.next = head;   // link new node to old list first
> head = newNode;        // then move head
> ```

---

<a id="lesson-9"></a>
## Lesson 9 — Insertion at the tail

Inserting at the tail requires traversing to the last node first.

Say we have `1 -> 2 -> null` and we want to append `3`.

**Step 1:** Create the new node.

**Step 2:** Traverse to the last node (the one whose `next` is `null`).

**Step 3:** Point that last node's `next` to the new node.

```
BEFORE:   head ──▶ [1] ──▶ [2] ──▶ null

                          current (last node found here)
                              ↓
STEP 3:   head ──▶ [1] ──▶ [2] ──▶ [3] ──▶ null
```

In code:

```js
function insertAtTail(head, val) {
  const newNode = new ListNode(val);

  if (head === null) return newNode;  // empty list: new node IS the list

  let current = head;
  while (current.next !== null) {     // walk until the last node
    current = current.next;
  }
  current.next = newNode;             // attach new node at the end

  return head;
}
```

Notice the loop condition is `current.next !== null`, not `current !== null`. We stop when `current` is the **last** node (so we can attach to it), not after we've gone past the end.

> 💡 **Tail pointer optimization**
> The traversal makes this O(n). If you maintain a `tail` pointer alongside `head`, you can skip the traversal and do insertions at the tail in O(1). This is how a real `LinkedList` class is typically implemented. You'll build exactly this in Q2.

---

<a id="lesson-10"></a>
## Lesson 10 — Insertion in the middle

To insert a node at index `i` (0-based), we need to find the node **at index `i - 1`** (the one just before the target position), then wire in the new node.

Say we have `1 -> 2 -> 4 -> null` and we want to insert `3` at index 2 (between `2` and `4`):

```
BEFORE:  [1] ──▶ [2] ──▶ [4] ──▶ null
                  ↑
           prev (index 1)

Step 1: Create new node [3].

Step 2: Point [3].next  to  prev.next   →   [3] ──▶ [4]
Step 3: Point prev.next to  [3]         →   [2] ──▶ [3]

AFTER:   [1] ──▶ [2] ──▶ [3] ──▶ [4] ──▶ null
```

> ⚠️ **The order of those two steps matters enormously.**
>
> ```
> Step 2 BEFORE Step 3:   correct ✅
>   newNode.next = prev.next;   // newNode now points to [4]
>   prev.next = newNode;        // prev now points to newNode
>
> Step 3 BEFORE Step 2:   wrong ❌
>   prev.next = newNode;        // prev now points to newNode...
>   newNode.next = prev.next;   // ...prev.next IS newNode, so we're pointing to ourselves!
> ```
>
> The rule: **always wire the new node into the chain before detaching the old connection.**

In code:

```js
function insertAtIndex(head, index, val) {
  if (index === 0) return insertAtHead(head, val);

  const newNode = new ListNode(val);
  let current = head;
  for (let i = 0; i < index - 1; i++) {   // walk to index - 1
    if (current === null) return head;      // index out of bounds
    current = current.next;
  }
  newNode.next = current.next;   // step 2: link new node forward
  current.next = newNode;        // step 3: link predecessor to new node
  return head;
}
```

---

<a id="lesson-11"></a>
## Lesson 11 — Deletion — rewiring the chain

Deleting a node means making the previous node "skip over" it — pointing directly to the node after the deleted one.

Say we have `1 -> 2 -> 3 -> 4 -> null` and we want to delete `3` (at index 2):

```
BEFORE:  [1] ──▶ [2] ──▶ [3] ──▶ [4] ──▶ null
                  ↑        ↑
               prev      target (to delete)

STEP 1: Walk to prev (the node just BEFORE the target).
STEP 2: prev.next = prev.next.next   →   prev skips over [3]

AFTER:   [1] ──▶ [2] ──▶ [4] ──▶ null
                          ↑
                [3] is now disconnected, garbage collected
```

In code:

```js
function deleteAtIndex(head, index) {
  if (index === 0) return head.next;   // delete head: new head is second node

  let current = head;
  for (let i = 0; i < index - 1; i++) {
    if (current.next === null) return head;   // index out of bounds
    current = current.next;
  }
  current.next = current.next.next;    // skip over the target
  return head;
}
```

### Deleting the head

```
BEFORE: head ──▶ [1] ──▶ [2] ──▶ [3] ──▶ null
AFTER:  head ──▶ [2] ──▶ [3] ──▶ null

One line: return head.next
```

### Deleting the tail

Walk to the second-to-last node (the one whose `next.next` is `null`), then set its `next` to `null`.

```
BEFORE: [1] ──▶ [2] ──▶ [3] ──▶ null
AFTER:  [1] ──▶ [2] ──▶ null

Find current such that current.next.next === null, then current.next = null.
```

> 🎯 **Key takeaway**
> Deletion = find the predecessor, skip over the target. The deleted node stops being referenced and JavaScript's garbage collector reclaims its memory automatically.

---

<a id="lesson-12"></a>
## Lesson 12 — The dummy / sentinel node trick

Here's a pattern that will save you a ton of `if (head === null)` edge-case headaches.

A **dummy node** (also called a **sentinel**) is a fake node you put before the real head of the list. It has no meaningful value. Its only job is to always be there so you never have to special-case an empty list or operations at the actual head.

```js
const dummy = new ListNode(0);
dummy.next = head;   // real list starts at dummy.next
```

Visually:

```
dummy ──▶ [1] ──▶ [2] ──▶ [3] ──▶ null
  ↑
  fake node, never returned to the caller
```

### Why does this help?

Suppose you're building a new list and you want to append nodes to it. Without a dummy:

```js
let head = null;
let tail = null;

function append(val) {
  const node = new ListNode(val);
  if (head === null) {
    head = node;    // special case for empty list
    tail = node;
  } else {
    tail.next = node;
    tail = node;
  }
}
```

With a dummy:

```js
const dummy = new ListNode(0);
let tail = dummy;

function append(val) {
  tail.next = new ListNode(val);  // no special case!
  tail = tail.next;
}

const head = dummy.next;  // the real answer, skipping the dummy
```

The dummy makes the empty-list case identical to the non-empty case. The loop logic becomes uniform. You'll see this trick used constantly in merge operations, reorder operations, and any problem that builds a result list from scratch.

> 🎯 **Key takeaway**
> Create `const dummy = new ListNode(0); dummy.next = head;`. Do your operations. At the end, return `dummy.next`. This trick eliminates most head-pointer special cases.

---

<a id="lesson-13"></a>
## Lesson 13 — Singly vs Doubly vs Circular

You've been working with **singly linked lists**: each node has only a `next` pointer. There are two other flavors worth knowing.

### Doubly Linked List

Each node has both a `next` and a `prev` pointer.

```
null ◀──┐                                    ┌──▶ null
        │                                    │
       [1] ◀──────── [2] ◀──────── [3]
        │  ──▶        │  ──▶        │
        └────────────▶└────────────▶┘

Or more compactly:
null ⟵ [1] ⟷ [2] ⟷ [3] ⟶ null
```

**Pros:**
- You can traverse backwards — useful for things like a browser's back/forward history.
- Deletion is O(1) if you have a reference to the node (no need to find the predecessor).

**Cons:**
- Each node uses more memory (an extra pointer per node).
- Every insert/delete has to update two pointers (`next` and `prev`), which means more code and more chances to introduce bugs.

**Use case:** LRU Cache (Q31), browser history, undo/redo stacks.

### Circular Linked List

The tail's `next` pointer points **back to the head** instead of `null`.

```
  head
   │
   ▼
  [1] ──▶ [2] ──▶ [3]
   ▲                │
   └────────────────┘
```

**Pros:**
- You can loop through the list indefinitely — good for round-robin scheduling.
- No explicit end — you just keep going.

**Cons:**
- Traversal must track how many nodes you've visited, otherwise you loop forever.
- A cycle in a regular singly linked list is usually a **bug** (cycle detection problems). Circular linked lists have an intentional cycle.

**Use case:** Josephus problem (Q39), music playlist that loops, operating system scheduling.

> 💡 **Tip**
> In the interview context, "linked list with a cycle" almost always means a **bug** in a singly linked list (a node's `next` points back to an earlier node). The circular linked list drill problems are explicit about them being circular from the start.

---

<a id="lesson-14"></a>
## Lesson 14 — The slow / fast pointer pattern (tortoise and hare)

This is one of the most elegant tricks in all of data structures. It solves problems that seem to require extra memory — with zero extra memory.

### The setup

You use **two pointers** that start at the head. One moves **one step at a time** (the slow pointer, or "tortoise"). The other moves **two steps at a time** (the fast pointer, or "hare").

```js
let slow = head;
let fast = head;

while (fast !== null && fast.next !== null) {
  slow = slow.next;         // one step
  fast = fast.next.next;    // two steps
}
```

### What it's good for

#### Finding the middle of a linked list

When `fast` reaches the end, `slow` is at the middle. Why? Because `fast` moves twice as fast, so when `fast` has traveled the whole list, `slow` has traveled half.

```
List:  1 -> 2 -> 3 -> 4 -> 5 -> null

After step 1:   slow=2, fast=3
After step 2:   slow=3, fast=5
fast.next = null → stop. slow = 3 (the middle!) ✅
```

For an even-length list, `slow` ends up at the **second of the two middle nodes**. Whether you want the first or second middle depends on the problem — slight variations to the stopping condition handle this.

#### Finding the nth node from the end

Move `fast` n steps ahead first, then advance both until `fast` reaches the end. Wherever `slow` is, that's the nth from the end. (More on this in Q10.)

#### Detecting a cycle (preview — full lesson next)

If there's a cycle in the list, the fast pointer will eventually lap the slow pointer and they'll meet. If there's no cycle, the fast pointer will reach `null`.

> 🔬 **Why does fast pointer reach `null` when `fast.next` is `null`?**
> On a list with an even number of nodes, after the second-to-last step, `fast` is on the last node (`fast.next === null`). On the next step, if we did `fast = fast.next.next` we'd be doing `null.next` — a crash. That's why the while condition is `fast !== null && fast.next !== null`: both conditions protect against this.

> 🎯 **Key takeaway**
> Slow/fast pointer: slow moves one step, fast moves two. When fast is done, slow is halfway. If the list has a cycle, fast laps slow and they meet. This runs in O(n) time and O(1) space.

---

<a id="lesson-15"></a>
## Lesson 15 — Cycle detection

A **cycle** in a linked list means some node's `next` pointer points back to an earlier node in the list. Instead of ending at `null`, the list loops forever.

```
Cycle example:

1 -> 2 -> 3 -> 4 -> 5
               ↑         |
               └──────────
                (5's next points back to 3)
```

If you run a naive traversal on this, you loop forever. That's why you need a smarter approach.

### Floyd's Cycle Detection Algorithm

Use the slow/fast pointer setup from Lesson 14.

- If there's **no cycle**: fast will hit `null` and the loop ends. Return `false`.
- If there's **a cycle**: fast and slow will eventually be on the same node — they **meet inside the cycle**. Return `true`.

**Why do they meet?** Picture the fast pointer chasing the slow pointer around the cycle. The fast pointer closes the gap by 1 step per iteration (it moves 2, slow moves 1, net gain = 1). Starting from any gap, it will close to 0 in at most `cycle_length` steps.

```js
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;   // they met — cycle exists
  }
  return false;
}
```

### Finding where the cycle starts

This is Q15. The trick involves a beautiful mathematical proof:

1. Detect the meeting point using the same slow/fast method.
2. Then move **one** pointer back to `head`, and advance **both** pointers one step at a time.
3. They will meet exactly at the start of the cycle.

The math: if `F` is the distance from head to cycle start, and `C` is the cycle length, then the meeting point is `F` steps before the start of the cycle. When you reset one pointer to head and step both by 1, they cover `F` steps and meet at the cycle start.

> 💡 **Tip**
> For interviews, you don't need to re-derive the proof from scratch. Just remember: detect the cycle with fast/slow, then reset one pointer to head, advance both by 1, they meet at the cycle start.

---

<a id="lesson-16"></a>
## Lesson 16 — Reversing a linked list — the three-pointer dance

Reversing a linked list is the most important single manipulation you'll learn. It shows up directly in ~5 interview problems and indirectly in many more. Let's go very slowly.

### The goal

Turn `1 -> 2 -> 3 -> 4 -> null` into `4 -> 3 -> 2 -> 1 -> null`.

Every arrow needs to flip direction. `1 -> 2` becomes `1 <- 2`. And so on.

### The three pointers

We use three pointers:
- `prev` — the node behind `curr` (starts as `null`)
- `curr` — the current node we're processing
- `next` — a temporary save of `curr.next` (because we're about to overwrite it)

### Step-by-step diagram

**Initial state:**

```
prev    curr
null    [1] ──▶ [2] ──▶ [3] ──▶ [4] ──▶ null
```

**Iteration 1:** Process node `1`.

```
1. Save next = curr.next   →   next = [2]
2. curr.next = prev        →   [1].next = null  (flip the arrow!)
3. prev = curr             →   prev = [1]
4. curr = next             →   curr = [2]

State:
  null ◀── [1]      curr
   ↑                [2] ──▶ [3] ──▶ [4] ──▶ null
   prev
```

**Iteration 2:** Process node `2`.

```
1. Save next = curr.next   →   next = [3]
2. curr.next = prev        →   [2].next = [1]
3. prev = curr             →   prev = [2]
4. curr = next             →   curr = [3]

State:
  null ◀── [1] ◀── [2]      curr
                             [3] ──▶ [4] ──▶ null
                   prev
```

**Iteration 3:** Process node `3`.

```
1. next = [4]
2. [3].next = [2]
3. prev = [3]
4. curr = [4]

State:
  null ◀── [1] ◀── [2] ◀── [3]     curr
                                     [4] ──▶ null
                            prev
```

**Iteration 4:** Process node `4`.

```
1. next = null
2. [4].next = [3]
3. prev = [4]
4. curr = null   (loop ends)

State:
  null ◀── [1] ◀── [2] ◀── [3] ◀── [4]
                                      ↑
                                     prev  (this is the new head!)
```

**After loop:** `curr === null`. The new head is `prev`.

```js
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next;   // save next
    curr.next = prev;         // flip the arrow
    prev = curr;              // advance prev
    curr = next;              // advance curr
  }

  return prev;   // prev is now the new head
}
```

> ✋ **Pause and trace**
> Trace the algorithm on `5 -> 10 -> null`. What are `prev`, `curr`, and `next` after each iteration?
>
> <details>
> <summary>Show answer</summary>
>
> Start: prev = null, curr = [5]
>
> Iteration 1:
> - next = [10]
> - [5].next = null
> - prev = [5], curr = [10]
>
> Iteration 2:
> - next = null
> - [10].next = [5]
> - prev = [10], curr = null
>
> Loop ends. Return prev = [10].
> Result: 10 -> 5 -> null ✅
> </details>

### Recursive reversal

The recursive version is shorter but uses O(n) call stack space:

```js
function reverseListRecursive(head) {
  // Base case: empty list or single node
  if (head === null || head.next === null) return head;

  // Recursively reverse everything after head
  const newHead = reverseListRecursive(head.next);

  // Now head.next is the tail of the reversed sublist
  // Point it back to head
  head.next.next = head;
  head.next = null;

  return newHead;
}
```

The recursive version is elegant, but the iterative version is what you should default to in interviews: it's O(1) space and easy to trace.

> 🎯 **Key takeaway**
> Reversal uses three pointers: `prev`, `curr`, `next`. Save `next`, flip the arrow, advance both `prev` and `curr`. Repeat until `curr` is `null`. Return `prev` as the new head.

---

<a id="lesson-17"></a>
## Lesson 17 — Recursive vs iterative traversal

Both work. They have different trade-offs.

### Iterative

```js
function sumIterative(head) {
  let sum = 0;
  let current = head;
  while (current !== null) {
    sum += current.val;
    current = current.next;
  }
  return sum;
}
```

- Time: O(n)
- Space: **O(1)** — just a couple of pointer variables.
- Preferred for production code and most interviews.

### Recursive

```js
function sumRecursive(node) {
  if (node === null) return 0;             // base case
  return node.val + sumRecursive(node.next);  // recursive case
}
```

- Time: O(n)
- Space: **O(n)** — each recursive call adds a frame to the call stack. For a 10,000-node list, this creates 10,000 stack frames. JavaScript has a default stack limit of around 10,000–15,000 calls before you get a "Maximum call stack size exceeded" error.
- Can be elegant and easier to read for short lists or balanced trees.

### When recursion is cleaner

For some problems, the recursive structure is natural:

```js
// Reverse a list recursively (see Lesson 16)
// Check if a list is a palindrome by comparing the recursive "return journey"
// Tree traversals (trees are recursive by nature)
```

The key insight: a recursive function on a linked list is implicitly using the **call stack as a stack data structure**. Anything you can do with recursion, you can do iteratively with an explicit stack.

> ⚠️ **Warning for long lists**
> In interview problems, lists can have up to 10^4 or 10^5 nodes. Recursive solutions may hit JavaScript's stack limit. Always be ready to convert a recursive approach to iterative if the interviewer asks about handling large inputs.

> 🎯 **Key takeaway**
> Iterative = O(1) space, safe for large inputs. Recursive = O(n) space (call stack), can be elegant but risks stack overflow on large lists. Default to iterative; know both.

---

<a id="lesson-18"></a>
## Lesson 18 — Quick reference: complexity table

Here's the cheat sheet. Everything here comes from the lessons above.

### Singly Linked List operations

| Operation | Time | Space | Notes |
|---|---|---|---|
| Access by index | O(n) | O(1) | Must walk from head |
| Insert at head | O(1) | O(1) | Rewire one pointer |
| Insert at tail | O(n) | O(1) | Walk to end first; O(1) with tail pointer |
| Insert at index `i` | O(n) | O(1) | Walk to `i-1` |
| Delete at head | O(1) | O(1) | Move head to `head.next` |
| Delete at tail | O(n) | O(1) | Walk to second-to-last |
| Delete at index `i` | O(n) | O(1) | Walk to `i-1` |
| Search (by value) | O(n) | O(1) | Linear scan |
| Traversal | O(n) | O(1) iterative / O(n) recursive | |
| Reversal | O(n) | O(1) iterative / O(n) recursive | |
| Find middle (slow/fast) | O(n) | O(1) | Fast finishes when slow is halfway |
| Cycle detection (Floyd's) | O(n) | O(1) | Fast and slow pointers meet |

### Array vs Linked List at a glance

| | Array | Singly Linked List |
|---|---|---|
| Index access | O(1) ✅ | O(n) ❌ |
| Insert/delete at head | O(n) ❌ | O(1) ✅ |
| Insert/delete at tail | O(1) ✅ | O(1) ✅ (with tail ptr) |
| Memory per element | Compact | + 1 pointer overhead |
| Cache friendly | ✅ | ❌ (scattered in memory) |

### Common patterns

**Traversal skeleton:**
```js
let curr = head;
while (curr !== null) {
  // work
  curr = curr.next;
}
```

**Slow / fast pointer skeleton:**
```js
let slow = head, fast = head;
while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;
}
// slow is at the middle
```

**Reversal skeleton:**
```js
let prev = null, curr = head;
while (curr !== null) {
  const next = curr.next;
  curr.next = prev;
  prev = curr;
  curr = next;
}
return prev; // new head
```

**Dummy node skeleton:**
```js
const dummy = new ListNode(0);
dummy.next = head;
let curr = dummy;
// ... do work ...
return dummy.next;
```

---

<a id="lesson-19"></a>
## Lesson 19 — You did it. Now what?

Take a breath. That was a lot of new ideas. **You don't have to remember every detail right now.**

What you should walk away with:

1. **A linked list is a chain of nodes**, each holding a value and a pointer to the next node.
2. **Traversal always follows the same skeleton**: start at `head`, loop while not `null`, advance `curr = curr.next`.
3. **Insertion and deletion rewire pointers** — always set the new connection before breaking the old one, and always in the right order.
4. **The dummy node trick** eliminates most head-pointer special cases.
5. **Slow/fast pointer** finds the middle in O(1) space and detects cycles in O(1) space.
6. **Reversal uses three pointers**: `prev`, `curr`, `next` — draw it out step by step if you get confused.
7. **Iterative is usually better than recursive** for linked lists — O(1) space and no stack overflow risk.

### What to do next

1. Open [`questions/01-implement-listnode.md`](./questions/01-implement-listnode.md).
2. Implement the `ListNode` class from scratch — it's tiny but foundational.
3. Then implement the full `LinkedList` class in Q2.
4. After that, every other problem builds on what you've built. You'll recognize the patterns.

### Pacing

- **Don't rush.** The pointer manipulation is genuinely confusing until it suddenly clicks. Give yourself time.
- **Draw diagrams.** On paper. Every single problem until you feel it in your bones.
- **The easy problems are not too easy.** They build the reflexes you need for the hard ones.
- **If you get stuck, that's correct.** Come back to the relevant lesson, re-read it, then try again.

See you in [Q1](./questions/01-implement-listnode.md). 💪
