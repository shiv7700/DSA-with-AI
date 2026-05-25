# Binary Search Trees — Lessons from Zero

> 👋 Hey. If you've read the Binary Trees chapter, a lot of what's here will feel familiar. Good. This chapter takes that foundation and adds **one powerful rule** — and that rule changes everything.
>
> If you haven't read the Binary Trees chapter yet, that's okay too. We'll explain what we need as we go.
>
> Take it lesson by lesson. Don't rush. Each lesson earns you one solid idea.

---

## Table of Lessons

1. [Quick recap: what's a binary tree?](#lesson-1)
2. [The one rule that makes a BST special](#lesson-2)
3. [Searching a BST — like guessing a number](#lesson-3)
4. [Inorder traversal gives you sorted output — and why that's magical](#lesson-4)
5. [Inserting a value — finding the right empty spot](#lesson-5)
6. [Building a BST step by step (with ASCII diagrams)](#lesson-6)
7. [Finding min and max](#lesson-7)
8. [Deletion — the three cases](#lesson-8)
9. [The inorder-successor trick (the hardest delete case made easy)](#lesson-9)
10. [Successor and predecessor — not just for deletes](#lesson-10)
11. [Floor and ceiling in a BST](#lesson-11)
12. [Kth smallest and kth largest](#lesson-12)
13. [The unbalanced BST failure mode — a linked list in disguise](#lesson-13)
14. [Balanced BSTs preview — AVL and Red-Black](#lesson-14)
15. [BST vs hash map — when to use which](#lesson-15)
16. [Validating a BST — the trap that fools beginners](#lesson-16)
17. [Quick reference — complexity table and patterns](#lesson-17)
18. [🔬 Going deeper: how real languages implement ordered maps (optional)](#lesson-18)
19. [You did it — what to do next](#lesson-19)

---

<a id="lesson-1"></a>
## Lesson 1 — Quick recap: what's a binary tree?

Before we talk about BSTs, let's make sure we're on the same page about trees in general.

A **binary tree** is a structure made of **nodes**. Each node holds a value and has at most two children — a **left** child and a **right** child. There's one special node at the top called the **root**.

```
        10
       /  \
      5    15
     / \     \
    3   7    20
```

Reading this:
- 10 is the root.
- 10's left child is 5. 10's right child is 15.
- 5's children are 3 and 7.
- 15 has no left child, but its right child is 20.
- 3, 7, and 20 have no children — we call those **leaves**.

In JavaScript, each node is a small object:

```js
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val   = val;
    this.left  = left;
    this.right = right;
  }
}
```

A tree with just a root looks like: `new TreeNode(10)`.

> 🎯 **Key takeaway**
> A binary tree is a set of connected nodes. Each node has a value, a left child, and a right child (either or both can be `null`).

---

<a id="lesson-2"></a>
## Lesson 2 — The one rule that makes a BST special

A regular binary tree can have values in any order. A **Binary Search Tree** adds one rule:

> **For every node N:**
> - Everything in N's **left** subtree is **less than** N's value.
> - Everything in N's **right** subtree is **greater than** N's value.

And this rule applies to **every** node in the tree — not just the root.

```
        10          ← root
       /  \
      5    15       ← 5 < 10 ✓, 15 > 10 ✓
     / \     \
    3   7    20     ← 3 < 5 ✓, 7 > 5 ✓,  20 > 15 ✓
```

Check the root 10: everything on the left (3, 5, 7) is less than 10. Everything on the right (15, 20) is greater. ✓

Check node 5: everything in its left subtree (just 3) is less than 5. Everything in its right subtree (just 7) is greater. ✓

Check node 15: nothing on the left, and 20 on the right is greater than 15. ✓

**This tree is a valid BST.**

Now here's an **invalid** BST:

```
        10
       /  \
      5    15
     / \     \
    3   12   20     ← 12 is in 5's right subtree...
```

Wait — is 12 > 5? Yes. So the local rule at node 5 is fine.
But 12 is also in 10's **left** subtree. And 12 > 10. **That violates the global rule.** This is NOT a valid BST.

> ⚠️ **The trap**
> The BST rule is not just "left child < parent < right child." It applies to **entire subtrees**. Every node in the left subtree must be less than the root. This is the most common mistake when writing a BST validator.

> 🎯 **Key takeaway**
> BST rule: left subtree < node < right subtree — for every node. Strict "less than" (no duplicates in the standard definition; some implementations use ≤ for duplicates).

---

<a id="lesson-3"></a>
## Lesson 3 — Searching a BST — like guessing a number

You've probably played the "guess a number" game. Someone picks a secret number between 1 and 100. You guess 50. They say "higher." You guess 75. They say "lower." And so on, halving the range each time.

**Searching a BST is exactly that game, but on a tree.**

Let's search for the value **7** in this BST:

```
        10
       /  \
      5    15
     / \     \
    3   7    20
```

Start at the root (10). Is 10 the number we want? No.
Is 7 < 10? Yes → go left to node 5.
Is 5 the number? No.
Is 7 < 5? No, 7 > 5 → go right to node 7.
Is 7 the number? **Yes! Found it.** ✓

Now let's search for **6**, which is NOT in the tree:

```
Start at 10. 6 < 10 → go left to 5.
6 > 5 → go right to 7.
6 < 7 → go left... but there IS no left child of 7. It's null.
→ 6 is not in this tree.
```

At every step we eliminate roughly half the remaining nodes. That's what gives BST search its **O(log n) average time complexity**.

In code:

```js
function search(root, target) {
  if (root === null) return null;         // not found
  if (root.val === target) return root;   // found!
  if (target < root.val) return search(root.left, target);
  return search(root.right, target);
}
```

Or iteratively (often preferred in interviews because it doesn't use call-stack space):

```js
function search(root, target) {
  let curr = root;
  while (curr !== null) {
    if (curr.val === target) return curr;
    curr = target < curr.val ? curr.left : curr.right;
  }
  return null;
}
```

> ✋ **Pause and try**
> Trace through searching for **15** in the tree above. How many comparisons does it take?
>
> <details>
> <summary>Show answer</summary>
>
> - Compare 15 with root 10: 15 > 10, go right.
> - Compare 15 with node 15: match! Return node.
> - **2 comparisons.** (In a balanced BST of 6 nodes, log₂(6) ≈ 2.6, so 2–3 comparisons is expected.)
> </details>

> 🎯 **Key takeaway**
> BST search halves the search space at each node, just like binary search on a sorted array. O(log n) average, O(n) worst case.

---

<a id="lesson-4"></a>
## Lesson 4 — Inorder traversal gives you sorted output — and why that's magical

There are three classic ways to "walk" a binary tree and visit every node:

- **Preorder:** visit root → left subtree → right subtree
- **Inorder:** visit left subtree → root → right subtree
- **Postorder:** visit left subtree → right subtree → root

For BSTs, **inorder** is special. Here's why.

Take our BST:

```
        10
       /  \
      5    15
     / \     \
    3   7    20
```

Inorder traversal visits: 3, 5, 7, 10, 15, 20.

**That's sorted order.** And it's not a coincidence — it's a consequence of the BST rule.

Think about it: for any node N, the BST rule guarantees that everything to its left is smaller and everything to its right is larger. Inorder traversal visits "all things smaller than me" first, then "me", then "all things larger than me". That's sorting, by definition.

```js
function inorder(root, result = []) {
  if (root === null) return result;
  inorder(root.left, result);    // everything smaller
  result.push(root.val);         // me
  inorder(root.right, result);   // everything larger
  return result;
}

inorder(root);  // [3, 5, 7, 10, 15, 20]
```

> 💡 **Why this matters**
> If you need the Nth smallest element, or want to check if two BSTs contain the same values, or need to convert a BST to a sorted array — inorder traversal does it in O(n). No extra sorting needed. The tree is already sorted by structure.

> 🎯 **Key takeaway**
> Inorder traversal of a BST always produces a sorted sequence. This is one of the most useful properties in all of BST-land.

---

<a id="lesson-5"></a>
## Lesson 5 — Inserting a value — finding the right empty spot

Inserting into a BST is like inserting a value into the right place in a sorted structure — except the "place" is a `null` slot in the tree.

The algorithm is simple:
1. Start at the root.
2. If the value is **less than** the current node, go left.
3. If the value is **greater than** the current node, go right.
4. If you reach a `null` slot, that's where the new node goes.

Let's insert **8** into our BST:

```
Start:          Step 1:         Step 2:          Step 3:
    10              10              10               10
   /  \            /  \            /  \             /  \
  5    15         5    15         5    15           5    15
 / \     \       / \     \       / \     \         / \     \
3   7    20     3   7    20     3   7    20        3   7    20
                             8>5, 8>7,           8>5, 8>7,
                             go right of 7...    null found → insert!
                                                    / \
                                                   7   (null)
                                                  / \
                                             (null)  8   ← new node
```

The final tree:

```
        10
       /  \
      5    15
     / \     \
    3   7    20
         \
          8
```

In code:

```js
function insert(root, val) {
  if (root === null) return new TreeNode(val);  // found the spot
  if (val < root.val) root.left  = insert(root.left,  val);
  else                root.right = insert(root.right, val);
  return root;
}
```

The recursive version reads cleanly: "If the spot is empty, create the node. Otherwise, delegate to the correct child."

> ⚠️ **What about duplicates?**
> The standard BST definition usually says no duplicates. If you need to support duplicates, pick a policy: either `val <= root.val` goes left, or `val >= root.val` goes right. Just be consistent.

> 🎯 **Key takeaway**
> To insert, walk the tree using the same left/right decision as search. When you hit a `null`, drop the new node there.

---

<a id="lesson-6"></a>
## Lesson 6 — Building a BST step by step (with ASCII diagrams)

Let's build a BST from scratch by inserting values one at a time: **[10, 5, 15, 3, 7, 12, 20]**

**Step 1: Insert 10**

The tree is empty. 10 becomes the root.

```
  10
```

**Step 2: Insert 5**

5 < 10 → go left. Left is null → insert here.

```
  10
 /
5
```

**Step 3: Insert 15**

15 > 10 → go right. Right is null → insert here.

```
  10
 /  \
5    15
```

**Step 4: Insert 3**

3 < 10 → go left (to 5). 3 < 5 → go left. Left of 5 is null → insert.

```
    10
   /  \
  5    15
 /
3
```

**Step 5: Insert 7**

7 < 10 → go left (to 5). 7 > 5 → go right. Right of 5 is null → insert.

```
    10
   /  \
  5    15
 / \
3   7
```

**Step 6: Insert 12**

12 > 10 → go right (to 15). 12 < 15 → go left. Left of 15 is null → insert.

```
    10
   /  \
  5    15
 / \   /
3   7 12
```

**Step 7: Insert 20**

20 > 10 → go right (to 15). 20 > 15 → go right. Right of 15 is null → insert.

```
      10
     /  \
    5    15
   / \  /  \
  3   7 12  20
```

We now have a balanced BST of 7 nodes. Each level down, the search space roughly halves.

> 💡 **Order matters!**
> If we had inserted the same values in a different order — say [3, 5, 7, 10, 12, 15, 20] (already sorted) — look what would happen:

```
Step 1: Insert 3      →   3
Step 2: Insert 5      →   3
                           \
                            5
Step 3: Insert 7      →   3
                           \
                            5
                             \
                              7
Step 4: ...
```

Every value is larger than the previous one, so we always go right. After inserting all 7 values in sorted order, the tree looks like this:

```
3
 \
  5
   \
    7
     \
      10
       \
        12
         \
          15
           \
            20
```

That's just a linked list! Searching for 20 requires 7 comparisons instead of 3. This is the **unbalanced tree failure mode** — we'll cover it deeply in Lesson 13.

> 🎯 **Key takeaway**
> The order in which you insert values determines the shape of the BST. A well-balanced BST gives O(log n) operations. A skewed BST degrades to O(n).

---

<a id="lesson-7"></a>
## Lesson 7 — Finding min and max

These are delightfully simple once you've internalized the BST rule.

**Minimum value:** always the **leftmost** node. Keep going left until you can't.

```
      10
     /  \
    5    15
   / \  /  \
  3   7 12  20
 /
?
```

Start at root (10). Go left to 5. Go left to 3. 3 has no left child. **3 is the minimum.**

```js
function findMin(root) {
  let curr = root;
  while (curr.left !== null) curr = curr.left;
  return curr;
}
```

**Maximum value:** always the **rightmost** node. Keep going right until you can't.

```js
function findMax(root) {
  let curr = root;
  while (curr.right !== null) curr = curr.right;
  return curr;
}
```

In the tree above, the max is 20 (root → 15 → 20, can't go right).

> ✋ **Pause and try**
> In a BST, where does the minimum of the entire tree live? Could the minimum ever be a non-leaf node?
>
> <details>
> <summary>Show answer</summary>
>
> The minimum is always the leftmost node. It can be a non-leaf — specifically if it has a right child. Example:
>
> ```
>     5
>      \
>       7
> ```
> Here 5 is the minimum, but 5 is also the root (not a leaf). It has a right child (7) but no left child — that's what makes it the leftmost.
> </details>

> 🎯 **Key takeaway**
> Min = go left as far as possible. Max = go right as far as possible. Both are O(h) where h is the height of the tree — O(log n) for a balanced BST.

---

<a id="lesson-8"></a>
## Lesson 8 — Deletion — the three cases

Deletion is where BSTs get genuinely tricky. There are **three distinct cases** depending on how many children the node to be deleted has.

Let's use this tree for all examples:

```
        10
       /  \
      5    15
     / \  /  \
    3   7 12  20
```

### Case 1: The node is a leaf (no children)

Delete **3**. It has no children. Just remove it.

```
Before:         After:
    10              10
   /  \            /  \
  5    15          5    15
 / \  /  \          \  /  \
3   7 12  20         7 12  20
```

Simple — just set the parent's pointer to `null`.

### Case 2: The node has exactly one child

Delete **15**. It has one child (let's say 15 has only the right child 20 in this variant):

```
Before:         After:
    10              10
   /  \            /  \
  5    20          5    20
 / \              / \
3   7            3   7
```

"Promote" the child: set the parent's pointer to skip over the deleted node and point directly to the child.

### Case 3: The node has two children

Delete **10** (the root). It has two children (5 and 15). We can't just remove it — we need to find someone to take its place who won't break the BST property.

The trick: find the **inorder successor** of 10. That's the next value larger than 10 in sorted order — which is **12** (the smallest value in 10's right subtree).

Replace 10's value with 12, then delete 12 from its original location (which falls into Case 1 or 2):

```
Step 1: Find inorder successor of 10.
        Inorder successor = leftmost node in right subtree = 12.

Step 2: Copy 12's value into the node where 10 was.

Step 3: Delete the original node that held 12
        (which has at most one child, since it was the leftmost in its subtree).

Before:         After:
    10              12
   /  \            /  \
  5    15          5    15
 / \  /  \        / \     \
3   7 12  20      3   7    20
```

We'll explore the inorder successor more carefully in the next lesson.

> ⚠️ **Why the inorder successor?**
> After replacing the deleted node's value with its inorder successor's value:
> - Everything to its left is still smaller ✓ (the original left subtree didn't change)
> - The inorder successor was the smallest value in the right subtree, so it's smaller than all other values in the right subtree ✓
> - The BST property is maintained.

> 🎯 **Key takeaway**
> Three deletion cases: (1) leaf — just remove it, (2) one child — bypass the node, (3) two children — replace with inorder successor, then delete the successor.

---

<a id="lesson-9"></a>
## Lesson 9 — The inorder-successor trick (the hardest delete case made easy)

The **inorder successor** of a node N is the next value in sorted order — the smallest value that's still greater than N.

### How to find the inorder successor

**Case A: N has a right subtree.**
The successor is the **leftmost** node in that right subtree.

```
        10
       /  \
      5    15
     / \  /  \
    3   7 12  20
```

Inorder successor of 10? Go right to 15, then go as far left as possible → 12.
Inorder successor of 5? Go right to 7, then go as far left as possible → 7 (already leftmost).

**Case B: N has no right subtree.**
The successor is the lowest ancestor of N for which N is in the left subtree.

Inorder successor of 7? 7 has no right child. Walk up the tree. 7 is the right child of 5. 5 is the left child of 10. So 10 is the successor of 7.

```js
function inorderSuccessor(root, node) {
  let successor = null;
  let curr = root;
  while (curr !== null) {
    if (node.val < curr.val) {
      successor = curr;          // curr could be the successor
      curr = curr.left;
    } else {
      curr = curr.right;
    }
  }
  return successor;
}
```

### And the inorder predecessor?

The **inorder predecessor** of N is the next value in sorted order that's *smaller* than N — the opposite direction. Find it by going to N's **left** subtree and finding the rightmost node there.

> 💡 **Tip**
> In interview deletion problems, you can choose either the inorder successor (min of right subtree) OR the inorder predecessor (max of left subtree) to replace a two-child node. Both are correct. Most textbooks use the successor.

---

<a id="lesson-10"></a>
## Lesson 10 — Successor and predecessor — not just for deletes

The inorder successor and predecessor come up constantly in BST problems:

- **Find the floor** of a value: largest value ≤ target (that's the predecessor or the target itself if present)
- **Find the ceiling**: smallest value ≥ target (the successor or target itself)
- **Kth smallest**: do inorder traversal and stop at the Kth element
- **Range queries**: all values in [low, high]

They also help you reason about sorted-order neighbors without doing a full traversal.

```
Sorted view:  3   5   7   10   12   15   20
                           ↑
             predecessor  12    15  ← successor
             of 10 is 7        of 10 is 12
```

For any node N in a BST:
- **Predecessor**: rightmost node of N's left subtree (or the first ancestor where N is a right child)
- **Successor**: leftmost node of N's right subtree (or the first ancestor where N is a left child)

> 🎯 **Key takeaway**
> Successor = "what would come right after me in sorted order." Predecessor = "what would come right before me." Both can be found in O(h) time.

---

<a id="lesson-11"></a>
## Lesson 11 — Floor and ceiling in a BST

These are a step above min/max — instead of the absolute extremes, you want values relative to a target.

**Floor(target):** the largest value in the BST that is ≤ target.
**Ceiling(target):** the smallest value in the BST that is ≥ target.

Think of a BST storing prices: [10, 20, 30, 40, 50]. If the target is 35:
- Floor: 30 (the biggest price that's still ≤ 35)
- Ceiling: 40 (the smallest price that's still ≥ 35)

### How to find floor

```js
function floor(root, target) {
  if (root === null) return null;
  if (root.val === target) return root.val;     // exact match is its own floor
  if (root.val > target) return floor(root.left, target);  // too big, go left
  // root.val < target: root could be the floor, but there might be something
  // bigger in the right subtree that's still ≤ target
  const rightFloor = floor(root.right, target);
  return rightFloor !== null ? rightFloor : root.val;
}
```

### How to find ceiling

Mirror image: if the current node is too small, go right. If it's equal, that's the ceiling. If it's too big, the current node might be the ceiling, but check left first.

```js
function ceil(root, target) {
  if (root === null) return null;
  if (root.val === target) return root.val;
  if (root.val < target) return ceil(root.right, target);
  const leftCeil = ceil(root.left, target);
  return leftCeil !== null ? leftCeil : root.val;
}
```

> 🎯 **Key takeaway**
> Floor and ceiling are natural BST operations — the BST's sorted structure lets you home in on the right range in O(log n) average time.

---

<a id="lesson-12"></a>
## Lesson 12 — Kth smallest and kth largest

"Find the 3rd smallest value in a BST" — how?

Since inorder traversal gives sorted order, **the kth smallest is just the kth element in the inorder traversal.**

**Approach 1: collect all, then index**

```js
function kthSmallest(root, k) {
  const sorted = [];
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    sorted.push(node.val);
    inorder(node.right);
  }
  inorder(root);
  return sorted[k - 1];   // k is 1-indexed
}
```

This is O(n) time and O(n) space. It works, but we can do better.

**Approach 2: stop early (iterative)**

Use an explicit stack to simulate inorder traversal. Keep a counter. When the counter hits k, return immediately — no need to traverse the rest of the tree.

```js
function kthSmallest(root, k) {
  const stack = [];
  let curr = root;
  let count = 0;

  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    count++;
    if (count === k) return curr.val;
    curr = curr.right;
  }
}
```

This is O(h + k) time and O(h) space — much better when k is small and the tree is balanced.

**For kth largest:** either do reverse inorder (right → root → left) and count, or find the (n − k + 1)th smallest.

> 🎯 **Key takeaway**
> Kth smallest = kth step of inorder traversal. For efficiency, use iterative inorder and stop as soon as you reach k.

---

<a id="lesson-13"></a>
## Lesson 13 — The unbalanced BST failure mode — a linked list in disguise

This is the lesson that determines whether you truly understand BSTs or just know the surface.

### The promise

We said BST operations are O(log n). That's true — **when the tree is balanced**.

### The problem

A tree is balanced when its height is O(log n). For a perfectly balanced tree of n nodes, each level doubles the number of nodes, so:
- 1 node → height 0
- 3 nodes → height 1
- 7 nodes → height 2
- 15 nodes → height 3
- n nodes → height ≈ log₂(n)

**But the BST invariant says nothing about balance.** You can build a completely valid BST that looks like this:

```
Insert [1, 2, 3, 4, 5, 6, 7] in sorted order:

1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
           \
            7
```

This is a valid BST! 1 < 2 < 3 < 4 < 5 < 6 < 7. But every single node only has a right child. The height is n − 1 = 6.

Searching for 7 takes **7 comparisons**. That's O(n), not O(log n).

This is the **linked list in disguise** — a perfectly valid BST that has the worst-case performance of a linked list.

### When does this happen?

Every time you insert values in **sorted (or reverse-sorted) order**.

Sorted input → always take the same branch (always right, or always left) → linear chain → O(n) everything.

### How bad is it?

| Tree state | Height | Search | Insert | Delete |
|---|---|---|---|---|
| Perfectly balanced | O(log n) | O(log n) | O(log n) | O(log n) |
| Slightly unbalanced | O(log n) | O(log n) | O(log n) | O(log n) |
| Completely skewed | O(n) | O(n) | O(n) | O(n) |

A skewed BST is as slow as a linked list. Worse, actually — it uses more memory per node than a linked list (extra `left` and `right` pointers).

### A visual comparison

```
Balanced BST of 7 nodes:       Skewed BST of 7 nodes:

        4                       1
       / \                       \
      2   6                       2
     / \ / \                       \
    1  3 5  7                       3
                                     \
                                      4
                                       \
                                        5
                                         \
                                          6
                                           \
                                            7

Height: 2   Search for 7: 3 steps    Height: 6   Search for 7: 7 steps
```

> ⚠️ **The key insight**
> A plain BST gives no guarantee of balance. If you're unlucky with your insertion order (or if someone knows your algorithm and deliberately feeds you sorted data), you get O(n) performance.

> 🎯 **Key takeaway**
> Basic BSTs degrade to O(n) in the worst case. For production use where you need reliable O(log n), you need a **self-balancing BST**.

---

<a id="lesson-14"></a>
## Lesson 14 — Balanced BSTs preview — AVL and Red-Black

Self-balancing BSTs add extra bookkeeping to automatically keep the tree balanced after every insert and delete. You don't need to know all the details right now, but you should know they exist and roughly how they work.

### AVL Trees

Named after Adelson-Velsky and Landis (1962), AVL trees maintain the **balance factor** of every node:

```
balance_factor(node) = height(left subtree) - height(right subtree)
```

The rule: balance factor must be in {-1, 0, +1} for every node. If an insert or delete causes any node's balance factor to become +2 or -2, the tree **rotates** to fix it.

```
Before (balance factor of root = +2, unbalanced):

    A
   /
  B
 /
C

After "right rotation" at A:

  B
 / \
C   A
```

Rotations are O(1) operations. The tree stays balanced, keeping height O(log n) always.

**AVL trees favor fast lookups** because they're strictly balanced (height difference ≤ 1). The cost: inserts and deletes may require more rotations.

### Red-Black Trees

Red-Black trees color each node red or black and maintain a set of coloring rules that ensure the tree stays "approximately balanced" — the longest path is at most 2× the shortest.

Less strict than AVL (can be slightly taller) but **faster inserts and deletes** because fewer rotations are needed.

Most standard library implementations use Red-Black trees:
- C++ `std::map` and `std::set` → Red-Black tree
- Java `TreeMap` and `TreeSet` → Red-Black tree
- Linux kernel's CFS scheduler → Red-Black tree

### Why JavaScript doesn't expose these

JavaScript's built-in `Map` keeps insertion order, not sort order. There's no built-in sorted map. If you need a sorted key-value store in JavaScript, you'd either implement a BST yourself or use a library.

> 💡 **Splay trees** are another variant — they "splay" recently accessed nodes to the top, giving excellent amortized performance for repeated lookups of the same values. Useful for caches.

> 🎯 **Key takeaway**
> AVL and Red-Black trees are self-balancing BSTs that guarantee O(log n) for all operations. The tradeoff is implementation complexity. For interviews, understanding they exist and roughly why is usually sufficient — full implementations are asked only in senior interviews.

---

<a id="lesson-15"></a>
## Lesson 15 — BST vs hash map — when to use which

This is a question you should be able to answer confidently in an interview.

### Hash map strengths

| Operation | Hash Map | BST (balanced) |
|---|---|---|
| Insert | O(1) average | O(log n) |
| Delete | O(1) average | O(log n) |
| Lookup | O(1) average | O(log n) |
| Min / Max | O(n) | O(log n) |
| Sorted iteration | O(n log n) (re-sort) | O(n) (inorder) |
| Floor / Ceiling | Not supported | O(log n) |
| Range query | O(n) | O(log n + k) |

Hash maps win on point lookups. BSTs win on any operation that depends on **order**.

### Use a BST (or sorted map) when you need:

- **Sorted iteration** over keys
- **Range queries**: "give me all keys between 50 and 100"
- **Floor / ceiling**: "what's the nearest key to this value?"
- **Kth smallest / largest**: "what's the 10th largest key?"
- **Ordered statistics**: "how many keys are less than X?"
- **Predecessor / successor**

### Use a hash map when you need:

- Fast point lookups and you don't care about order
- Counting frequencies
- Detecting duplicates
- Two-sum style "have I seen this before?" checks

> 💡 **Real-world analogy**
> Think of a hash map as an unordered warehouse with bins labeled by code. You can find any item instantly if you know its code. But "give me all items that cost between $50 and $100" requires scanning every bin.
>
> A BST is like a sorted warehouse where items are arranged by price. "Give me all items $50–$100" → walk straight to the $50 shelf and stop at $100. Very efficient.

> 🎯 **Key takeaway**
> Hash maps win for raw lookup speed. BSTs win when you need order-based operations. If you're always asking "where is X?" → hash map. If you're asking "what's near X?" or "what's between X and Y?" → BST.

---

<a id="lesson-16"></a>
## Lesson 16 — Validating a BST — the trap that fools beginners

A very common interview problem: "Given a binary tree, determine if it's a valid BST."

### The naive (wrong) approach

Check that for every node:
- `node.left.val < node.val`
- `node.right.val > node.val`

This seems right. But it fails on this tree:

```
    5
   / \
  1   4
     / \
    3   6
```

At node 4: left child (3) < 4 ✓, right child (6) > 4 ✓. Local check passes.
At node 5: left child (1) < 5 ✓, right child (4) < 5... wait, 4 < 5, right child should be > 5. ✗

But even that check wouldn't catch this:

```
        5
       / \
      1   6
         / \
        3   7
```

At node 6: left child (3) < 6 ✓, right child (7) > 6 ✓. Node 6 looks fine locally.
At node 5: left child (1) < 5 ✓, right child (6) > 5 ✓. Node 5 looks fine locally.
**But 3 is in 5's right subtree, and 3 < 5. That's invalid!**

### The correct approach: propagate min/max bounds

Pass a valid range [min, max] down the tree. Every node must have a value within its current range:

```js
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val)     // left: max shrinks to root.val
      && isValidBST(root.right, root.val, max);   // right: min grows to root.val
}
```

Trace through the second invalid tree:

```
isValidBST(5, -∞, +∞):
  isValidBST(1, -∞, 5): 1 in (-∞, 5) ✓ → both children null ✓
  isValidBST(6, 5, +∞):
    isValidBST(3, 5, 6): 3 ≤ 5 → return false ✗
```

Caught it. The range constraint `3 > 5` fails because node 3 is in the subtree rooted at 6, and 6 is the right child of 5, so all nodes in that subtree must be > 5.

> 🎯 **Key takeaway**
> BST validation requires tracking the valid range for each node — not just comparing to the immediate parent. Pass (min, max) bounds down the tree recursively.

---

<a id="lesson-17"></a>
## Lesson 17 — Quick reference — complexity table and patterns

Here's the cheat sheet. Everything on this table is something we've talked about.

### Complexity (balanced BST of height h = O(log n))

| Operation | Average (balanced) | Worst (skewed) |
|---|---|---|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Find min / max | O(log n) | O(n) |
| Inorder traversal | O(n) | O(n) |
| Floor / Ceiling | O(log n) | O(n) |
| Kth smallest (stop-early) | O(h + k) | O(n) |

### The three BST patterns you'll use over and over

**Pattern 1: Walk left or right based on comparison**

Used for: search, insert, find min/max, floor/ceiling, LCA.

```js
let curr = root;
while (curr !== null) {
  if (target < curr.val)      curr = curr.left;
  else if (target > curr.val) curr = curr.right;
  else                        return curr;  // found
}
```

**Pattern 2: Inorder traversal (left → node → right)**

Used for: sorted output, kth smallest, validate (by checking previous value), convert to sorted array.

```js
// Recursive
function inorder(node, result = []) {
  if (!node) return;
  inorder(node.left, result);
  result.push(node.val);
  inorder(node.right, result);
}

// Iterative with stack
const stack = [];
let curr = root;
while (curr || stack.length) {
  while (curr) { stack.push(curr); curr = curr.left; }
  curr = stack.pop();
  visit(curr);
  curr = curr.right;
}
```

**Pattern 3: Pass min/max bounds recursively**

Used for: BST validation, trim BST, range sum.

```js
function solve(node, min, max) {
  if (!node) return base_case;
  if (node.val <= min || node.val >= max) return ...;
  return combine(solve(node.left, min, node.val),
                 solve(node.right, node.val, max));
}
```

### Common BST problem categories

| Category | Representative problems |
|---|---|
| Basic operations | Insert, search, min/max |
| Traversal | Inorder, sorted output, kth element |
| Structural validation | Is BST valid?, height, count nodes |
| Construction | Sorted array → BST, preorder → BST |
| Augmented search | Floor/ceil, successor/predecessor, range query |
| Advanced operations | Delete, LCA, recover BST |
| Conversion | BST → sorted DLL, BST → sorted array |

---

<a id="lesson-18"></a>
## Lesson 18 — 🔬 Going deeper: how real languages implement ordered maps (optional)

> This lesson is for the curious. **You can skip it entirely** and still solve every problem in this topic.

### Java's TreeMap and TreeSet

Java's `TreeMap` is a Red-Black tree under the hood. It provides O(log n) get, put, remove — and uniquely, it also provides methods like:
- `floorKey(k)` — floor in the BST sense
- `ceilingKey(k)` — ceiling
- `firstKey()` / `lastKey()` — min / max
- `subMap(from, to)` — range slice
- `headMap(to)` / `tailMap(from)` — prefix / suffix views

All of these are O(log n) and come "for free" from the BST structure.

### C++'s std::map and std::set

Same idea — Red-Black tree. `lower_bound` and `upper_bound` are the C++ equivalents of floor/ceiling.

### Why JavaScript doesn't have this

JavaScript's `Map` preserves insertion order (by spec since ES2015). It's not sorted. If you need sorted keys:
- Write your own BST or import a library (`sorted-btree`, `mnemonist`, etc.)
- Use an array + binary search for simple cases (if keys are rarely inserted after initial setup)
- For infrequent operations, sort on demand: `[...map.keys()].sort((a, b) => a - b)`

### Treaps — a probabilistic BST

A **treap** is a BST where each node has both a key (following BST order) and a random priority (following heap order). The randomness guarantees O(log n) height with high probability — without any rotations. Treaps are simpler to implement than AVL or Red-Black trees and are used in some competitive programming solutions.

```
Treap node: { key: 10, priority: 0.73, left: ..., right: ... }
```

> 🎯 **Key takeaway**
> In production systems, sorted key-value stores use Red-Black trees (Java `TreeMap`, C++ `std::map`). JavaScript's built-in `Map` is unordered — if you need sorted keys in JS, you need to bring your own structure.

---

<a id="lesson-19"></a>
## Lesson 19 — You did it. Now what?

Take a breath. Let's look at what you now know:

1. **The BST invariant** — left < root < right, for every node, globally.
2. **Why it works** — the rule lets you eliminate half the tree at each step, just like binary search.
3. **Inorder traversal produces sorted output** — and you know why.
4. **Insert** — walk to find the right `null` slot.
5. **Delete** — three cases; the two-children case uses the inorder successor.
6. **Successor, predecessor, floor, ceiling** — the order-aware cousins of min/max.
7. **The unbalanced failure mode** — sorted input → linked list in disguise → O(n) everything.
8. **Balanced BSTs** — AVL and Red-Black guarantee O(log n) at the cost of complexity.
9. **BST vs hash map** — use BST when order matters; hash map for raw lookup speed.
10. **BST validation** — requires propagating min/max bounds, not just local comparisons.

That's a lot. You don't have to master all of it before starting the problems.

### What to do next

1. Open [`questions/00-implement-bst.md`](./questions/00-implement-bst.md). Build the class. This is the single most important exercise in this chapter.
2. Work through the easy questions. Each one exercises exactly one concept from these lessons.
3. Once you're comfortable with insert, search, and inorder, tackle the medium questions.
4. If you get stuck, come back to the relevant lesson. Don't peek at solutions prematurely — the struggle is where the learning happens.

### Pacing

- The "implement BST" question will take longer than a normal question. That's expected. Budget 30–60 minutes.
- Easy questions: 10–20 minutes each.
- Medium questions: 20–40 minutes each.
- Hard questions: take as long as you need. Some are legitimately hard.

You're building something real here. Keep going.

See you in [Q0](./questions/00-implement-bst.md). 💪
