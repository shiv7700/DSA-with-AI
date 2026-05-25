# Q16 — Convert Sorted Linked List to BST

**Difficulty:** Medium
**Pattern:** Slow/fast pointer to find midpoint + divide and conquer
**Expected:** O(n log n) time · O(log n) space

## Problem

Given the head of a singly linked list where elements are sorted in **ascending order**, convert it to a height-balanced BST.

A `ListNode` is defined as:

```js
class ListNode {
  constructor(val = 0, next = null) {
    this.val  = val;
    this.next = next;
  }
}
```

## Examples

### Example 1

```
Input:  -10 → -3 → 0 → 5 → 9

Output (one valid result):
        0
       / \
     -3   9
     /   /
   -10  5
```

### Example 2

```
Input:  0 → 1 → 2 → null

Output:
    1
   / \
  0   2
```

### Example 3 (single element)

```
Input:  42 → null
Output: TreeNode(42)
```

## Constraints

- The number of nodes is in the range `[0, 2 * 10^4]`.
- `-10^5 <= Node.val <= 10^5`
- Nodes are sorted in strictly increasing order.

## Hints

<details>
<summary>Hint 1 — why is this harder than the sorted array version?</summary>

With an array, finding the middle element is O(1) — just `nums[mid]`. With a linked list, you can't jump to the middle directly. You have to walk to it: O(n) for each call.

That's why the overall time is O(n log n) instead of O(n): at each level of the recursion (log n levels), you spend O(n) total walking to midpoints.
</details>

<details>
<summary>Hint 2 — finding the middle of a linked list</summary>

Use the **slow/fast pointer trick**:
- `slow` advances 1 step at a time.
- `fast` advances 2 steps at a time.
- When `fast` reaches the end, `slow` is at the middle.

You also need `prev` (the node before `slow`) so you can cut the list in half.
</details>

<details>
<summary>Hint 3 — template</summary>

```js
function sortedListToBST(head) {
  if (!head) return null;
  if (!head.next) return new TreeNode(head.val);

  let prev = null, slow = head, fast = head;
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  // slow is now at the middle — it becomes the root
  prev.next = null;  // cut the left half

  const node  = new TreeNode(slow.val);
  node.left   = sortedListToBST(head);        // left half
  node.right  = sortedListToBST(slow.next);   // right half
  return node;
}
```
</details>

## Write your solution
→ [`../solutions/16-sorted-list-to-bst.js`](../solutions/16-sorted-list-to-bst.js)

## Follow-ups

- Can you achieve O(n) time? Yes — use an inorder construction approach: count the nodes first, then build the tree using the inorder traversal order of the list (consuming nodes left to right as you go).
- How does this compare to Q15 (sorted array → BST)? What's the key structural difference?
