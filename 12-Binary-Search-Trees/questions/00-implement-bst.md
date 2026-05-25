# Q0 — Implement a Full BST Class

**Difficulty:** Easy–Medium (foundational)
**Pattern:** BST fundamentals — every operation you'll use in every question that follows
**Expected:** O(log n) average for insert/search/delete · O(n) for traversal

## Problem

Build a `BST` class from scratch in JavaScript. Your class must support the following operations:

| Method | Signature | Description |
|---|---|---|
| `insert` | `insert(val)` | Insert `val` into the BST. Ignore duplicates. |
| `search` | `search(val) → boolean` | Return `true` if `val` is in the BST, `false` otherwise. |
| `delete` | `delete(val)` | Remove the node with value `val`. Handle all 3 cases. |
| `min` | `min() → number` | Return the minimum value. |
| `max` | `max() → number` | Return the maximum value. |
| `inorder` | `inorder() → number[]` | Return all values in sorted ascending order. |
| `successor` | `successor(val) → number \| null` | Inorder successor of `val` (next larger), or `null` if none. |
| `predecessor` | `predecessor(val) → number \| null` | Inorder predecessor of `val` (next smaller), or `null` if none. |

The internal node structure should use:

```js
class BSTNode {
  constructor(val) {
    this.val   = val;
    this.left  = null;
    this.right = null;
  }
}
```

## Examples

```
const bst = new BST();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.insert(20);

// Tree after all inserts:
//
//       10
//      /  \
//     5    15
//    / \  /  \
//   3   7 12  20

bst.search(7);         // true
bst.search(99);        // false
bst.min();             // 3
bst.max();             // 20
bst.inorder();         // [3, 5, 7, 10, 12, 15, 20]
bst.successor(7);      // 10
bst.predecessor(12);   // 10
bst.delete(10);
bst.inorder();         // [3, 5, 7, 12, 15, 20]  (10 replaced by 12)
```

## Constraints

- `val` is a unique integer (no duplicates are inserted; you may ignore repeated inserts).
- All method calls are valid (e.g., `min()` / `max()` are only called on a non-empty BST).
- `successor` and `predecessor` return `null` if no such node exists.
- Target: O(log n) average for insert / search / delete (balanced inputs); O(n) worst case is acceptable.

## Hints

<details>
<summary>Hint 1 — insert: walk and place</summary>

Start at `this.root`. At each node, compare `val` to `node.val`:
- If `val < node.val`, go left.
- If `val > node.val`, go right.
- If you reach `null`, create a `new BSTNode(val)` there.

The recursive version is one of the neatest three-liners in all of data structures:
```js
_insert(node, val) {
  if (node === null) return new BSTNode(val);
  if (val < node.val) node.left  = this._insert(node.left,  val);
  else                node.right = this._insert(node.right, val);
  return node;
}
```
</details>

<details>
<summary>Hint 2 — delete: the three cases</summary>

1. **Leaf (no children):** return `null` to the parent — the node just disappears.
2. **One child:** return the surviving child to the parent (bypass the deleted node).
3. **Two children:** Find the inorder successor (leftmost node in the right subtree). Copy its value into the current node, then delete the inorder successor from the right subtree (which falls into Case 1 or 2).

```js
_delete(node, val) {
  if (node === null) return null;
  if (val < node.val) { node.left  = this._delete(node.left,  val); return node; }
  if (val > node.val) { node.right = this._delete(node.right, val); return node; }
  // Found the node to delete
  if (!node.left && !node.right) return null;          // Case 1
  if (!node.left)  return node.right;                  // Case 2
  if (!node.right) return node.left;                   // Case 2
  // Case 3: two children
  const successorVal = this._findMin(node.right).val;
  node.val   = successorVal;
  node.right = this._delete(node.right, successorVal);
  return node;
}
```
</details>

<details>
<summary>Hint 3 — successor and predecessor</summary>

**Successor** (next larger value):

Walk down from the root. When you turn left (because target < current), record the current node as a possible successor. When you find the target and it has a right subtree, the answer is the min of that right subtree.

**Predecessor** (next smaller value): mirror image — turn right and record, or return max of left subtree.
</details>

## Write your solution
→ [`../solutions/00-implement-bst.js`](../solutions/00-implement-bst.js)

## Follow-ups

- Add a `size()` method that returns the total number of nodes.
- Add a `height()` method.
- Add a `contains(val)` method as an alias for `search`.
- Add a `toSortedArray()` method — how does it relate to `inorder()`?
- What would you change if you needed to support duplicate values?
