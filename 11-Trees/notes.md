# Trees (Binary Trees) — Lessons from Zero

> 👋 Hey. If arrays felt comfortable, you're ready for trees. Trees are where recursion starts to feel *natural* — where all those "recurse and trust it" intuitions finally lock into place.
>
> This is a longer chapter. Don't rush. Each lesson is one small idea. Take breaks. Come back. The diagrams are your friends — stare at them until they click before moving on.
>
> Total reading time at a relaxed pace: about 2–3 hours with breaks. **You do not have to read it all at once.**

---

## Table of Lessons

1. [What is a tree? (the hierarchy idea)](#lesson-1)
2. [Tree vocabulary: root, leaf, parent, child, sibling](#lesson-2)
3. [More vocabulary: ancestor, descendant, depth, height, level](#lesson-3)
4. [Binary trees — the special kind we mostly study](#lesson-4)
5. [Types of binary trees: full, complete, perfect, balanced, degenerate](#lesson-5)
6. [Why trees? When are they better than arrays or lists?](#lesson-6)
7. [How we represent a binary tree in JavaScript](#lesson-7)
8. [Traversals — visiting every node](#lesson-8)
9. [Preorder traversal: Root → Left → Right](#lesson-9)
10. [Inorder traversal: Left → Root → Right](#lesson-10)
11. [Postorder traversal: Left → Right → Root](#lesson-11)
12. [Level-order traversal (BFS)](#lesson-12)
13. [Recursive vs. iterative traversal — when to pick which](#lesson-13)
14. [Morris Traversal — a preview of the O(1) space trick](#lesson-14)
15. [Tree problems are mostly recursive (the universal template)](#lesson-15)
16. [How to think about base cases in tree recursion](#lesson-16)
17. [Tree DP: returning useful information from children](#lesson-17)
18. [A catalogue of tree problem shapes](#lesson-18)
19. [Quick reference: traversals, complexity, templates](#lesson-19)
20. [You did it — what to do next](#lesson-20)

---

<a id="lesson-1"></a>
## Lesson 1 — What is a tree? (the hierarchy idea)

You know what a family tree looks like. Or an org chart at a company. Or the folders on your computer. These are all **trees** — structures where things are arranged in a **hierarchy**: one thing at the top, branching downward.

Here's a company org chart:

```
                      CEO
                   /       \
              VP Eng       VP Sales
             /     \           \
         Lead A   Lead B      Manager
           /                  /    \
         Dev 1            Sales1  Sales2
```

Notice:
- **One person is at the top** (the CEO). That's the **root**.
- **Each person has at most one manager** (one parent above them).
- **Some people manage others** (they have children below them).
- **Some people manage nobody** — they're at the bottom. Those are **leaves**.

A **tree** in computer science follows exactly the same shape. It's a collection of **nodes** (the circles/boxes) connected by **edges** (the lines) with these rules:

1. There is exactly **one root** — the "top" node.
2. Every node except the root has **exactly one parent**.
3. Every node can have **zero or more children**.
4. There are **no cycles** — you can't follow edges and end up back where you started.

> 🎯 **Key takeaway**
> A tree is a hierarchical structure. One root at the top, branching downward. No cycles. Every node (except root) has exactly one parent.

---

<a id="lesson-2"></a>
## Lesson 2 — Tree vocabulary: root, leaf, parent, child, sibling

Let's build a simple tree and name all the parts.

```
             A            ← root
           /   \
          B     C         ← children of A
         / \     \
        D   E     F       ← D, E are children of B; F is child of C
```

### Root
Node `A` is the **root**. It's the only node with no parent. Every tree has exactly one root.

### Children
`B` and `C` are the **children** of `A`. `D` and `E` are the children of `B`. `F` is the child of `C`.

A node can have zero, one, two, or more children (depending on the type of tree).

### Parent
`A` is the **parent** of `B` and `C`. `B` is the parent of `D` and `E`. `C` is the parent of `F`.

Every node except the root has exactly one parent.

### Leaf
`D`, `E`, and `F` are **leaves** — nodes with **no children**. They're at the "bottom" of the tree.

`A`, `B`, and `C` are **internal nodes** — they have at least one child.

### Sibling
`B` and `C` are **siblings** — they share the same parent (`A`). `D` and `E` are siblings. `F` has no siblings in this tree.

> ✋ **Pause and try**
> In the tree below, name: the root, all leaves, the parent of G, and the siblings of E.
> ```
>         1
>       /   \
>      2     3
>     / \   / \
>    4   5 6   7
> ```
>
> <details>
> <summary>Show answer</summary>
>
> - Root: `1`
> - Leaves: `4`, `5`, `6`, `7` (no children)
> - Parent of `6` and `7`: `3`
> - Siblings of `5`: `4` (they share parent `2`)
> </details>

> 🎯 **Key takeaway**
> Root = top, no parent. Leaf = bottom, no children. Parent/child = the nodes directly above/below. Siblings = same parent.

---

<a id="lesson-3"></a>
## Lesson 3 — More vocabulary: ancestor, descendant, depth, height, level

These come up constantly in tree problems. Take them slowly.

### Ancestor and Descendant

An **ancestor** of a node is any node on the path from it up to the root (not including the node itself). A **descendant** is any node in the subtree below it.

```
             A
           /   \
          B     C
         / \
        D   E
```

- Ancestors of `D`: `B`, `A`
- Ancestors of `E`: `B`, `A`
- Ancestors of `B`: `A`
- Descendants of `A`: all other nodes (`B`, `C`, `D`, `E`)
- Descendants of `B`: `D`, `E`
- `D` has no descendants (it's a leaf)

### Depth of a node

The **depth** of a node is the number of edges from the root to that node.

```
         A        ← depth 0 (the root)
       /   \
      B     C     ← depth 1
     / \
    D   E         ← depth 2
```

Think of it like floors in a building. The root lives on floor 0.

### Height of a node (and of the whole tree)

The **height** of a node is the number of edges on the **longest path going downward** from that node to a leaf.

```
         A        ← height 3... wait, let me draw a bigger tree:

         A        ← height 2
       /   \
      B     C     ← height(B) = 1,  height(C) = 0
     / \
    D   E         ← height(D) = 0,  height(E) = 0
```

- `D` is a leaf: height 0
- `E` is a leaf: height 0
- `B` has children up to depth 1 below it: height 1
- `C` is a leaf: height 0
- `A`'s longest downward path is A→B→D (or A→B→E): height 2

**The height of a tree** is the height of the root. In the tree above, it's 2.

> 💡 **Depth vs Height — the trick to remember them**
> - **Depth**: how far DOWN from the root you are. Root = 0, grows as you go down.
> - **Height**: how far DOWN to the furthest leaf below you. Leaf = 0, grows as you go up.
>
> They go in opposite directions.

### Level

**Level** is just depth + 1 in some books, or the same as depth in others. Most competitive programming problems use "level" = depth. Don't stress — just check which convention the problem uses.

```
Level 0 (depth 0):        A
Level 1 (depth 1):      B   C
Level 2 (depth 2):    D   E
```

> 🎯 **Key takeaway**
> Depth = distance from root (grows going down). Height = distance to furthest leaf (grows going up). Ancestor = above you on the path to root. Descendant = in your subtree below.

---

<a id="lesson-4"></a>
## Lesson 4 — Binary trees — the special kind we mostly study

So far, nodes can have any number of children. In a **binary tree**, each node has **at most 2 children** — usually called `left` and `right`.

```
             10
           /    \
          5      20
         / \    /  \
        3   7  15   25
```

That's a binary tree. Every node has 0, 1, or 2 children. The children are labeled "left" and "right".

Why do we study binary trees so much?
- They're the underlying structure for **Binary Search Trees** (BSTs), **heaps**, and many other structures.
- They model **decision problems** naturally (yes/no, left/right, less/greater).
- Their recursive structure makes them *perfect* for practicing recursion.

> 💡 **A binary tree's recursive definition**
> A binary tree is either:
> - **Empty** (null), or
> - A **node** with a value, a left child (which is itself a binary tree), and a right child (which is also a binary tree).
>
> This is why recursive solutions feel so natural for trees: the tree IS defined recursively.

> 🎯 **Key takeaway**
> A binary tree = at most 2 children per node, called left and right. The entire field of tree DSA mostly works with binary trees.

---

<a id="lesson-5"></a>
## Lesson 5 — Types of binary trees: full, complete, perfect, balanced, degenerate

These terms come up in problem descriptions and complexity analysis. Let's draw each one.

### Full Binary Tree

Every node has **either 0 or 2 children** — never just 1.

```
         1
       /   \
      2     3
     / \
    4   5
```

Node 1: 2 children ✓. Node 2: 2 children ✓. Node 3: 0 children ✓. Node 4: 0 children ✓. Node 5: 0 children ✓.

This IS full.

```
         1
       /   \
      2     3
     /         ← only one child
    4
```

This is NOT full (node 2 has only 1 child).

### Complete Binary Tree

All levels are **fully filled except possibly the last**, and the last level has all nodes **pushed to the left**.

```
         1
       /   \
      2     3
     / \   /
    4   5 6
```

Level 0: full (1 node). Level 1: full (2 nodes). Level 2: has 3 nodes, all pushed left. ✓ Complete.

```
         1
       /   \
      2     3
     / \     \
    4   5     6    ← !! 6 should be on the left, not the right
```

NOT complete — the last level has a gap.

> 💡 **Why does "complete" matter?** Heaps (priority queues) are always stored as complete binary trees, which lets you represent them as a flat array without any pointers.

### Perfect Binary Tree

All internal nodes have **exactly 2 children**, and all leaves are at the **same depth**.

```
         1
       /   \
      2     3
     / \   / \
    4   5 6   7
```

Every internal node has 2 children. All leaves (`4, 5, 6, 7`) are at depth 2. ✓ Perfect.

A perfect binary tree with height `h` has `2^(h+1) - 1` total nodes.

### Balanced Binary Tree

For every node, the **height difference between its left and right subtrees is at most 1**.

```
         1
       /   \
      2     3
     / \
    4   5
```

Height of left subtree of 1 = 2 (via 2→4 or 2→5). Height of right subtree of 1 = 0 (node 3, a leaf). Difference = 2.

This is NOT balanced.

```
         1
       /   \
      2     3
     / \   /
    4   5 6
```

Left subtree height = 2. Right subtree height = 1. Difference = 1. ✓ Balanced (just barely).

**Why balanced matters:** In a balanced binary tree, most operations (search, insert, delete) run in O(log n) time. In an unbalanced tree, they can degrade to O(n).

### Degenerate (or Pathological) Binary Tree

Every node has **at most one child** — the tree has collapsed into a linked list.

```
    1
     \
      2
       \
        3
         \
          4
           \
            5
```

Or it could lean left the whole way. Either way, it looks and behaves like a linked list. Every operation is O(n).

This happens in a BST when you insert elements in sorted order (1, 2, 3, 4, 5) without any balancing.

### Summary diagram

```
Full:             Complete:         Perfect:          Degenerate:
     1                 1                1                  1
   /   \             /   \            /   \                 \
  2     3           2     3          2     3                  2
 / \                / \  /          / \   / \                  \
4   5              4  5 6          4  5  6   7                   3
```

> 🎯 **Key takeaway**
> Full = 0 or 2 children. Complete = filled from left, last level may be partial. Perfect = all levels full. Balanced = height difference ≤ 1 at every node. Degenerate = basically a linked list.

---

<a id="lesson-6"></a>
## Lesson 6 — Why trees? When are they better than arrays or lists?

Fair question. Why not just use an array for everything?

### The hierarchy problem

Some data is naturally hierarchical. A file system:

```
  /
 ├── home/
 │    └── shiv/
 │         ├── notes.txt
 │         └── projects/
 │              └── dsa/
 └── etc/
      └── hosts
```

You can't represent this naturally in a flat array. A tree is the obvious fit.

### The search problem

In a **sorted** array, searching for a value is O(log n) with binary search — but only if you never insert or delete. Inserting into a sorted array is O(n) because you shift elements.

In a **Binary Search Tree** (a special binary tree where left children are smaller and right children are larger), you can search, insert, and delete all in O(log n) — as long as the tree stays balanced.

### A quick BST taste

```
         8
        / \
       3   10
      / \    \
     1   6   14
        / \   /
       4   7 13
```

Is 6 in this tree? Start at root (8). 6 < 8, go left. At 3. 6 > 3, go right. At 6. Found! That took 3 comparisons, not a linear scan.

### Complexity comparison

| Operation | Sorted Array | Balanced BST |
|-----------|-------------|--------------|
| Search    | O(log n)    | O(log n)     |
| Insert    | O(n)        | O(log n)     |
| Delete    | O(n)        | O(log n)     |

Trees win when you need frequent insertions/deletions alongside searching.

> 🎯 **Key takeaway**
> Trees are great for hierarchical data, for enabling O(log n) insert/delete alongside O(log n) search, and for expressing recursive problem structures naturally.

---

<a id="lesson-7"></a>
## Lesson 7 — How we represent a binary tree in JavaScript

In most languages, a binary tree node is a small object with three fields: the value, a pointer to the left child, and a pointer to the right child.

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

When a node has no left child, `left` is `null`. When a node has no right child, `right` is `null`. Leaf nodes have both `left` and `right` as `null`.

### Building the tree `[1, 2, 3, 4, 5]` by hand

```
         1
       /   \
      2     3
     / \
    4   5
```

```js
const root = new TreeNode(1);
root.left  = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left  = new TreeNode(4);
root.left.right = new TreeNode(5);
```

Picture what `root` looks like in memory:

```
root → { val: 1,
         left: → { val: 2,
                   left: → { val: 4, left: null, right: null },
                   right: → { val: 5, left: null, right: null }
                 },
         right: → { val: 3, left: null, right: null }
       }
```

It's a chain of objects — each one pointing to at most two others.

### The null-terminated convention

You'll often see trees described as arrays (leetcode-style):

```
[1, 2, 3, 4, 5, null, null]
```

This is a **level-order (BFS) representation**. Read left to right, top to bottom. `null` means "no node here."

```
         1           ← index 0
       /   \
      2     3        ← indices 1, 2
     / \   / \
    4   5 null null  ← indices 3, 4, 5, 6
```

For node at index `i`:
- Left child is at index `2*i + 1`
- Right child is at index `2*i + 2`
- Parent is at index `Math.floor((i - 1) / 2)`

This array representation is how **heaps** are stored — no pointers needed!

> 🎯 **Key takeaway**
> In JavaScript, a binary tree is built from `TreeNode` objects connected by `.left` and `.right` references. `null` means "no child here." The root node is the entry point to the whole tree.

---

<a id="lesson-8"></a>
## Lesson 8 — Traversals — visiting every node

A **traversal** is a way to visit every node in a tree exactly once. With an array you only have one reasonable option (left to right). With a tree, the branching structure gives you several meaningful choices:

1. **Preorder** — root, then left subtree, then right subtree
2. **Inorder** — left subtree, then root, then right subtree
3. **Postorder** — left subtree, then right subtree, then root
4. **Level-order (BFS)** — all nodes at depth 0, then depth 1, then depth 2, ...

The first three are **depth-first** (DFS). The fourth is **breadth-first** (BFS).

Let's use this tree for all four:

```
           1
         /   \
        2     3
       / \   /
      4   5 6
```

- Preorder:   1, 2, 4, 5, 3, 6
- Inorder:    4, 2, 5, 1, 6, 3
- Postorder:  4, 5, 2, 6, 3, 1
- Level-order: 1, 2, 3, 4, 5, 6

The next four lessons walk through each one slowly. Don't try to memorize the results — understand the *process* and you'll be able to derive them yourself.

> 💡 **Tip — a memorable shorthand**
> "Pre/In/Post" refer to when you visit the **root** relative to the subtrees:
> - **Pre**order: visit root **before** the subtrees.
> - **In**order: visit root **between** the subtrees.
> - **Post**order: visit root **after** the subtrees.

---

<a id="lesson-9"></a>
## Lesson 9 — Preorder traversal: Root → Left → Right

### The rule

At every node: **print yourself, then recurse left, then recurse right**.

### Walking through it

```
           1
         /   \
        2     3
       / \   /
      4   5 6
```

Start at 1. Print **1**. Go left.

- At 2. Print **2**. Go left.
  - At 4. Print **4**. Go left → null. Go right → null. Done with 4.
- Back at 2. Go right.
  - At 5. Print **5**. Go left → null. Go right → null. Done with 5.
- Done with 2.

Back at 1. Go right.

- At 3. Print **3**. Go left.
  - At 6. Print **6**. Go left → null. Go right → null. Done with 6.
- Back at 3. Go right → null. Done with 3.

Result: **1, 2, 4, 5, 3, 6**

### The code (recursive)

```js
function preorder(root, result = []) {
  if (root === null) return result;
  result.push(root.val);       // visit root FIRST
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}
```

### The code (iterative — uses a stack)

```js
function preorderIterative(root) {
  if (!root) return [];
  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);
    // Push right FIRST so left is processed first (LIFO)
    if (node.right) stack.push(node.right);
    if (node.left)  stack.push(node.left);
  }
  return result;
}
```

> 💡 **When is preorder useful?**
> - Serializing/copying a tree (you need to create the root before you can create its children)
> - Printing directory structures (print the folder name before its contents)
> - Prefix expression trees

> 🎯 **Key takeaway**
> Preorder visits the root FIRST, then recurses left, then right. The iterative version uses an explicit stack (push right before left so left pops first).

---

<a id="lesson-10"></a>
## Lesson 10 — Inorder traversal: Left → Root → Right

### The rule

At every node: **recurse left, then print yourself, then recurse right**.

### Walking through it

```
           1
         /   \
        2     3
       / \   /
      4   5 6
```

Start at 1. DON'T print yet. Go left first.

- At 2. Don't print. Go left first.
  - At 4. Don't print. Go left → null. Now print **4**. Go right → null.
- Back at 2. Now print **2**. Go right.
  - At 5. Don't print. Go left → null. Now print **5**. Go right → null.
- Back at 1. Now print **1**. Go right.
- At 3. Don't print. Go left.
  - At 6. Don't print. Go left → null. Now print **6**. Go right → null.
- Back at 3. Now print **3**. Go right → null.

Result: **4, 2, 5, 1, 6, 3**

### The code (recursive)

```js
function inorder(root, result = []) {
  if (root === null) return result;
  inorder(root.left, result);
  result.push(root.val);        // visit root IN THE MIDDLE
  inorder(root.right, result);
  return result;
}
```

### The code (iterative — uses a stack)

```js
function inorderIterative(root) {
  const result = [];
  const stack = [];
  let curr = root;

  while (curr !== null || stack.length > 0) {
    // Go as far left as possible
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }
    // Process the node
    curr = stack.pop();
    result.push(curr.val);
    // Move to right subtree
    curr = curr.right;
  }
  return result;
}
```

The iterative version is slightly more complex because you have to "remember" where you came from. The stack acts as the call stack.

> 💡 **Inorder on a BST gives you sorted order!**
> This is a crucial property. If you have a Binary Search Tree (left < root < right), inorder traversal visits nodes in ascending order. Many BST problems exploit this directly.

> 🎯 **Key takeaway**
> Inorder visits: left subtree → root → right subtree. On a BST, this produces sorted output.

---

<a id="lesson-11"></a>
## Lesson 11 — Postorder traversal: Left → Right → Root

### The rule

At every node: **recurse left, recurse right, then print yourself**.

### Walking through it

```
           1
         /   \
        2     3
       / \   /
      4   5 6
```

Start at 1. Don't print. Go left.

- At 2. Don't print. Go left.
  - At 4. Go left → null. Go right → null. Now print **4**.
- At 2. Go right.
  - At 5. Go left → null. Go right → null. Now print **5**.
- Now print **2**.

Back at 1. Go right.

- At 3. Don't print. Go left.
  - At 6. Go left → null. Go right → null. Print **6**.
- Back at 3. Go right → null. Now print **3**.

Back at 1. Print **1**.

Result: **4, 5, 2, 6, 3, 1**

The root is always LAST in postorder.

### The code (recursive)

```js
function postorder(root, result = []) {
  if (root === null) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);        // visit root LAST
  return result;
}
```

### The code (iterative)

```js
function postorderIterative(root) {
  if (!root) return [];
  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.unshift(node.val);   // prepend instead of append
    if (node.left)  stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return result;
}
```

The trick: postorder is reverse of preorder but with left/right swapped. We collect in reverse and unshift to get the right order. (An alternative: push to result normally, then reverse at the end.)

> 💡 **When is postorder useful?**
> - Deleting a tree (delete children before deleting the parent)
> - Evaluating expression trees (evaluate sub-expressions before combining)
> - Computing sizes/heights of subtrees (you need children's answers before the parent can combine them)

> 🎯 **Key takeaway**
> Postorder visits: left subtree → right subtree → root. Root is always last. Use it when a parent's answer depends on results from both children.

---

<a id="lesson-12"></a>
## Lesson 12 — Level-order traversal (BFS)

The three DFS traversals all go deep first. Level-order goes **wide first**: it visits all nodes at depth 0, then all at depth 1, then depth 2, and so on.

### Walking through it

```
           1            ← depth 0: [1]
         /   \
        2     3         ← depth 1: [2, 3]
       / \   /
      4   5 6           ← depth 2: [4, 5, 6]
```

Result: **1, 2, 3, 4, 5, 6** — and if you group by level: **[[1], [2, 3], [4, 5, 6]]**

### The key insight: use a Queue, not a Stack

DFS traversals use a stack (either the call stack implicitly, or an explicit stack in the iterative version). Level-order uses a **queue** — first in, first out.

Algorithm:
1. Start with the root in the queue.
2. While the queue is not empty:
   a. Remove the front node (dequeue).
   b. Process it (add its value to the result).
   c. Enqueue its left child (if it exists).
   d. Enqueue its right child (if it exists).

### Walking through with the queue shown

```
Queue: [1]

Dequeue 1. Process it. Enqueue 2 (left), enqueue 3 (right).
Queue: [2, 3]

Dequeue 2. Process it. Enqueue 4 (left), enqueue 5 (right).
Queue: [3, 4, 5]

Dequeue 3. Process it. Enqueue 6 (left). No right child.
Queue: [4, 5, 6]

Dequeue 4. Process it. No children.
Queue: [5, 6]

Dequeue 5. Process it. No children.
Queue: [6]

Dequeue 6. Process it. No children.
Queue: []  ← done!

Result: [1, 2, 3, 4, 5, 6]
```

### The code

```js
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];   // in JS, we simulate a queue with an array

  while (queue.length > 0) {
    const node = queue.shift();     // dequeue from front
    result.push(node.val);
    if (node.left)  queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}
```

### Grouped by level

Many problems want `[[1], [2, 3], [4, 5, 6]]`. The trick: at the START of each outer loop iteration, the queue contains exactly the nodes of the current level.

```js
function levelOrderGrouped(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;   // ← freeze the current level's count
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
```

> ⚠️ **Performance note**
> Using `array.shift()` in JavaScript is O(n) because all elements shift left. For large trees, use a proper queue (a pointer variable to track the front index) or a `Deque` library. In interview problems with typical constraints, `shift()` is fine.

> 💡 **When is level-order useful?**
> - Finding shortest paths in an unweighted tree/graph
> - "Right side view" of a tree (last node at each level)
> - Finding nodes at a specific depth
> - Zigzag / spiral traversal variants

> 🎯 **Key takeaway**
> Level-order (BFS) uses a queue. Visit left to right, one full depth level at a time. Capture `queue.length` at the start of each level to group nodes by depth.

---

<a id="lesson-13"></a>
## Lesson 13 — Recursive vs. iterative traversal — when to pick which

By now you've seen both recursive and iterative versions of every traversal. When do you pick each?

### Why recursive is usually preferred

```js
// This is all you need for inorder:
function inorder(root, result = []) {
  if (root === null) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}
```

It's short, readable, and directly mirrors the definition. For most interview questions, this is the right choice.

**The implicit stack:** Recursive functions use the **call stack** as their memory. Each recursive call adds a frame; each return removes one. For a balanced tree of `n` nodes, the call stack grows to O(log n) depth. For a degenerate tree (linked list shape), it can grow to O(n) — and if n is large enough, you'll hit a stack overflow.

### When iterative is better

1. **Stack overflow risk** — very deep trees (n = 100,000, degenerate)
2. **Interview asks explicitly for iterative**
3. **You need to pause and resume traversal** — think "find the next inorder successor" one call at a time, like an iterator

The iterative inorder is the most commonly asked non-recursive traversal:

```js
function inorderIterative(root) {
  const result = [];
  const stack = [];
  let curr = root;

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    result.push(curr.val);
    curr = curr.right;
  }
  return result;
}
```

### A comparison

| | Recursive | Iterative |
|--|-----------|-----------|
| Code length | Short | Longer |
| Readability | Matches definition | More mechanical |
| Stack space | Call stack (O(h)) | Explicit stack (O(h)) |
| Stack overflow | Possible on deep trees | No (heap-allocated) |
| "Pauseable" | No | Yes |

`h` = height of the tree.

> 🎯 **Key takeaway**
> Default to recursive — it's cleaner. Switch to iterative when the tree might be very deep, when the problem explicitly asks for iteration, or when you need a "pauseable" traversal.

---

<a id="lesson-14"></a>
## Lesson 14 — Morris Traversal — a preview of the O(1) space trick

> 💡 This is an advanced topic. **You can skip it for now** and come back. It's asked in hard interviews.

Recursive traversal uses O(h) space on the call stack. Iterative traversal uses O(h) space with an explicit stack. Both are O(n) in the worst case (degenerate tree).

**Morris Traversal** achieves O(1) extra space by temporarily modifying the tree itself — creating "threads" (right pointers from rightmost node of left subtree back to the current node) to find the way back up without a stack.

### The idea, without the full code

```
         1
       /   \
      2     3
     / \
    4   5
```

When you're at node 2, about to go left to 4, you need a way to return to 2 after you've processed the left subtree. Normally that's the call stack. Morris traversal creates a **temporary right pointer** from node 5 (the inorder predecessor of 2) back to node 2.

```
    4 → 5 → 2 → (back to 1, then 3)   ← inorder order
         ↑
         temporarily points back to 2
```

After using the thread to navigate back, you delete it (restoring the tree to its original structure).

### When to study it

- In a hard interview when the interviewer says "can you do it in O(1) space?"
- In a problem about converting a BST to a sorted doubly linked list in place
- When you want to understand how compilers handle tree traversal efficiently

For now, knowing it exists is enough. Come back to it with Q7 (Morris Traversal question).

> 🎯 **Key takeaway**
> Morris Traversal achieves O(1) extra space by using the tree's own null pointers as temporary "thread" pointers. Advanced, but worth knowing exists.

---

<a id="lesson-15"></a>
## Lesson 15 — Tree problems are mostly recursive (the universal template)

Here is the most important insight of this entire chapter:

**Almost every binary tree problem is some variation of:**

```
function solve(root) {
  // Base case: empty tree
  if (root === null) return <base value>;

  // Recurse on left and right subtrees
  const leftResult  = solve(root.left);
  const rightResult = solve(root.right);

  // Do something with root + results from children
  return <combine root.val, leftResult, rightResult>;
}
```

That's it. The entire structure. You'll use this template for:

- Finding the height of a tree
- Counting nodes
- Finding max value
- Checking if two trees are identical
- Inverting a tree
- Finding path sums
- Computing diameter
- Checking balance
- ...and almost everything else

### Example 1 — Height of a tree

```js
function height(root) {
  if (root === null) return -1;   // empty tree has height -1 (or 0, convention varies)

  const leftHeight  = height(root.left);
  const rightHeight = height(root.right);

  return 1 + Math.max(leftHeight, rightHeight);
}
```

Walk through this on:

```
       1
      / \
     2   3
    /
   4
```

```
height(4) → left=null→-1, right=null→-1 → 1 + max(-1,-1) = 0
height(2) → left=0, right=-1 → 1 + max(0,-1) = 1
height(3) → left=-1, right=-1 → 1 + max(-1,-1) = 0
height(1) → left=1, right=0 → 1 + max(1, 0) = 2
```

Height of the tree = 2. Correct.

### Example 2 — Count total nodes

```js
function countNodes(root) {
  if (root === null) return 0;

  const leftCount  = countNodes(root.left);
  const rightCount = countNodes(root.right);

  return 1 + leftCount + rightCount;
  //     ↑ count yourself, plus everyone in each subtree
}
```

### Example 3 — Invert (mirror) a tree

```js
function invertTree(root) {
  if (root === null) return null;

  const left  = invertTree(root.left);
  const right = invertTree(root.right);

  // Swap
  root.left  = right;
  root.right = left;

  return root;
}
```

Before:                  After:
```
       4                       4
      / \                     / \
     2   7         →         7   2
    / \ / \                 / \ / \
   1  3 6  9               9  6 3  1
```

Notice: we first recursively invert both subtrees, then swap them at the current node.

> ✋ **Pause and internalize**
> Every single one of those three examples follows the exact same template:
> 1. Null check (base case)
> 2. Recurse left, recurse right
> 3. Combine
>
> If you can get this template into muscle memory, tree problems become much less scary.

> 🎯 **Key takeaway**
> The universal tree template: check null, recurse left, recurse right, combine. Adapting this template to a specific problem is 90% of the work.

---

<a id="lesson-16"></a>
## Lesson 16 — How to think about base cases in tree recursion

The base case in tree recursion is almost always: **"what do I return when I'm given an empty tree (null)?"**

The answer depends on what you're computing:

| You're computing... | Base case (null tree) |
|---|---|
| Height / max depth | return -1 or 0 (convention varies) |
| Min depth | return 0 |
| Count of nodes | return 0 |
| Sum of nodes | return 0 |
| Is the tree balanced? | return true |
| Max value | return -Infinity (or some sentinel) |
| Is path sum valid? | return false (unless target == 0 at leaf) |
| A new tree (like invert) | return null |

There's also a second base case some problems need: **"what do I return when I'm at a leaf node?"**

```js
// Path sum: does any root-to-leaf path sum to targetSum?
function hasPathSum(root, targetSum) {
  if (root === null) return false;

  // If we're at a leaf, check if we've hit the target
  if (root.left === null && root.right === null) {
    return root.val === targetSum;
  }

  // Otherwise, subtract current value and check either subtree
  return hasPathSum(root.left,  targetSum - root.val) ||
         hasPathSum(root.right, targetSum - root.val);
}
```

Here the "leaf" base case is essential — otherwise you'd keep recursing into null nodes on both sides and never check the path condition correctly.

### A checklist for writing tree recursion

1. **What is null/empty?** Always handle `root === null` first.
2. **Do I also need a leaf case?** (When the specific condition only applies at leaves — path sums, for example.)
3. **What does my function return?** Be precise. Does it return a number? A boolean? A node reference? An array?
4. **What information do I need from each child?** This determines what I recurse on and what I collect.
5. **How do I combine left and right to get the parent's answer?**

> 💡 **The "trust the recursion" mantra**
> When you call `solve(root.left)`, trust that it will return the correct answer for the left subtree — **even if you can't trace through it in your head**. You're not supposed to mentally trace 10 levels deep. You just need to answer: "assuming the left and right calls return the right thing, what do I do with them?"
>
> This is the mental leap that makes recursion click for most people.

> 🎯 **Key takeaway**
> Almost all tree recursion base cases are: `null → return some neutral value`. Sometimes also add a `leaf` check. Trust your recursive calls.

---

<a id="lesson-17"></a>
## Lesson 17 — Tree DP: returning useful information from children

Sometimes a single value isn't enough to return from a recursion — you need to return multiple pieces of information. This is sometimes called **tree DP** (dynamic programming on trees).

### Example: Diameter of a binary tree

The **diameter** is the longest path between any two nodes (counting edges). That path might or might not go through the root.

```
         1
       /   \
      2     3
     / \
    4   5
```

The diameter is 3 (the path 4→2→1→3 or 5→2→1→3 — both length 3).

But what if the tree looked like this?

```
         1
       /   \
      2     3
     / \
    4   5
   /
  6
 /
7
```

Now the diameter might be 6→4→2→5 (length 3) or 7→6→4→2→1→3 (length 5). The path doesn't have to go through the root.

**The trick:** at each node, the longest path through that node = left height + right height.

But we also need to compare that with the best path found deeper in the subtrees. So we track a **global maximum** and return only the height upward.

```js
function diameterOfBinaryTree(root) {
  let maxDiameter = 0;

  function height(node) {
    if (node === null) return -1;

    const leftH  = height(node.left);
    const rightH = height(node.right);

    // Path through this node = (leftH + 1) + (rightH + 1) edges
    // = leftH + rightH + 2 edges
    // But if one child is null, height is -1, so edge count = 0.
    const pathThrough = (leftH + 1) + (rightH + 1);
    maxDiameter = Math.max(maxDiameter, pathThrough);

    return 1 + Math.max(leftH, rightH);   // return height upward
  }

  height(root);
  return maxDiameter;
}
```

### The "return two things" pattern

Sometimes you want to return multiple values. JavaScript doesn't have tuples, but you can return an array or object:

```js
// Is the tree balanced? Return [isBalanced, height]
function checkBalance(root) {
  if (root === null) return [true, -1];

  const [leftBalanced, leftH]  = checkBalance(root.left);
  const [rightBalanced, rightH] = checkBalance(root.right);

  const balanced = leftBalanced && rightBalanced &&
                   Math.abs(leftH - rightH) <= 1;
  const h = 1 + Math.max(leftH, rightH);

  return [balanced, h];
}

function isBalanced(root) {
  return checkBalance(root)[0];
}
```

This avoids doing two separate recursive passes.

### The mental model for tree DP

```
           root
           /  \
        left  right

  leftResult  = recursion(root.left)    ← left child "reports up" its info
  rightResult = recursion(root.right)   ← right child "reports up" its info
  
  rootResult  = combine(root.val, leftResult, rightResult)
                                         ← root uses children's info to compute its own
```

Think of each node as a manager asking their reports for numbers, then doing their own computation with those numbers, then reporting upward to their own manager.

> 🎯 **Key takeaway**
> Tree DP = each node returns information upward, combining its children's reports with its own value. Use tuples/objects when you need to return multiple values per node. One pass is almost always enough.

---

<a id="lesson-18"></a>
## Lesson 18 — A catalogue of tree problem shapes

With the template and the DP pattern in mind, here's how most common tree problems fit into a shape. Recognizing the shape quickly is a skill.

### Shape 1: "Compute something at every node, combine upward"

Height, count, sum, min, max, diameter, balance check, sum of nodes at each level...

Template: `return combine(root.val, recurse(left), recurse(right))`

### Shape 2: "Find a node (or path) that meets a condition"

Path sum, LCA, kth smallest in BST, find node by value...

Template: search left or right, short-circuit when found.

```js
function findNode(root, target) {
  if (root === null) return null;
  if (root.val === target) return root;
  return findNode(root.left, target) || findNode(root.right, target);
}
```

### Shape 3: "Collect all paths / nodes that meet a condition"

All root-to-leaf paths, all paths summing to target, all leaf values...

Template: carry a "current path" array down, add to results when condition is met, backtrack on return.

```js
function allPaths(root, path = [], result = []) {
  if (root === null) return;
  path.push(root.val);

  if (!root.left && !root.right) {
    result.push([...path]);    // leaf — save a copy
  } else {
    allPaths(root.left,  path, result);
    allPaths(root.right, path, result);
  }

  path.pop();   // backtrack
  return result;
}
```

### Shape 4: "Build or transform a tree"

Invert, flatten, construct from traversals, serialize/deserialize...

Template: often postorder (process children before the parent) or preorder (create parent before children).

### Shape 5: "BFS / level-order variants"

Right side view, level averages, zigzag traversal, nodes at distance K...

Template: level-order with the `levelSize` trick from Lesson 12.

### Shape 6: "Global optimum that passes through some node"

Diameter, max path sum, widest level...

Template: use a closure variable to track global max; return the "local useful value" upward (like height), not the global max.

```
function solve(root) {
  let globalBest = -Infinity;   // closure variable

  function helper(node) {
    if (!node) return <base>;
    const left  = helper(node.left);
    const right = helper(node.right);
    const throughThis = <combine left, right, node.val>;
    globalBest = Math.max(globalBest, throughThis);
    return <value useful for parent>;   // NOT throughThis
  }

  helper(root);
  return globalBest;
}
```

> 🎯 **Key takeaway**
> Most tree problems fit one of six shapes. Identify the shape first, then apply the matching template. The template does 80% of the work.

---

<a id="lesson-19"></a>
## Lesson 19 — Quick reference: traversals, complexity, templates

### Traversal summary

| Traversal   | Order                  | Data structure | Use cases |
|-------------|------------------------|----------------|-----------|
| Preorder    | Root → Left → Right    | Stack (implicit or explicit) | Copy, serialize, prefix expressions |
| Inorder     | Left → Root → Right    | Stack (implicit or explicit) | Sorted output from BST, binary tree → sorted list |
| Postorder   | Left → Right → Root    | Stack (implicit or explicit) | Delete, evaluate, size/height |
| Level-order | Level by level, L→R    | Queue | Shortest path, right view, zigzag |

### Complexity

| | Time  | Space (balanced) | Space (worst/degenerate) |
|--|-------|-----------------|--------------------------|
| DFS traversals | O(n) | O(log n) call stack | O(n) call stack |
| BFS traversal  | O(n) | O(n) queue (last level has n/2 nodes) | O(1) (single path) |
| Morris traversal | O(n) | O(1) | O(1) |

### The universal recursive template

```js
function solve(root) {
  if (root === null) return <base value>;      // ← ALWAYS first
  const L = solve(root.left);
  const R = solve(root.right);
  return <combine root.val, L, R>;
}
```

### The global-optimum template (tree DP)

```js
function solveWithGlobal(root) {
  let best = <identity value>;   // -Infinity, 0, Infinity, etc.

  function dp(node) {
    if (node === null) return <base>;
    const L = dp(node.left);
    const R = dp(node.right);
    best = Math.max(best, <path through node using L, R>);
    return <info useful for parent>;
  }

  dp(root);
  return best;
}
```

### The BFS level-order template

```js
function bfs(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const size = queue.length;          // ← current level size
    const level = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
```

### The backtracking/paths template

```js
function paths(root, path = [], result = []) {
  if (!root) return;
  path.push(root.val);

  if (!root.left && !root.right) result.push([...path]);
  paths(root.left,  path, result);
  paths(root.right, path, result);

  path.pop();   // ← backtrack
  return result;
}
```

### The TreeNode class (use this in every solution)

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

---

<a id="lesson-20"></a>
## Lesson 20 — You did it. Now what?

If you've read this far, take a breath. Trees are genuinely the hardest chapter for most beginners — not because any single idea is hard, but because there are a lot of ideas to stack together.

### What you should walk away with

1. **Tree vocabulary** — root, leaf, parent, child, ancestor, descendant, depth, height. You can look at any tree and describe it precisely.
2. **Types of binary trees** — full, complete, perfect, balanced, degenerate. You know why balanced matters for complexity.
3. **The four traversals** — preorder, inorder, postorder, level-order. You can trace through any of them on paper and write the code from memory.
4. **The recursive template** — null check, recurse left, recurse right, combine. This handles most tree problems.
5. **Tree DP** — return useful info upward from children; use a closure for global optima.
6. **Problem shapes** — you can classify a new problem into one of six shapes before you write a line of code.

### What to do next

1. Open [`questions/01-preorder-traversal.md`](./questions/01-preorder-traversal.md) — start with traversals. They are the foundation.
2. Solve the traversals (Q1–Q7) before jumping to the "easy" section. Without traversals, everything else is guessing.
3. After each problem, check: which template did you use? What was your base case? What did each child return?
4. Tick the box in [`README.md`](./README.md) when you finish a problem.

### Pacing

- **Do traversals in one or two sittings** — they build on each other rapidly.
- **Easy problems (Q8–Q19):** 2–3 per sitting. They're quick once traversals click.
- **Medium problems:** one per sitting at first. Read the hints progressively.
- **Hard problems:** these deserve 30–45 minutes of struggle before looking at hints.

Trees will feel hard at first. That's normal. Every time you trace through a recursion and it works, the model becomes a bit clearer. Stick with it.

See you in [Q1](./questions/01-preorder-traversal.md). 💪
