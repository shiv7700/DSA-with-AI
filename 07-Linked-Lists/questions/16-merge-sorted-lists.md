# Q16 — Merge Two Sorted Lists

**Difficulty:** Medium
**Pattern:** Two-pointer merge / Dummy node
**Expected:** O(n + m) time · O(1) iterative / O(n + m) recursive space

## Problem

You are given the heads of two singly linked lists, `list1` and `list2`, both sorted in **non-decreasing order**. Merge them into one sorted linked list and return the head of the merged list.

The merged list should be made by **splicing together** the nodes from the two lists (not creating new nodes).

## Examples

### Example 1
```
Input:  list1 = 1 -> 2 -> 4 -> null
        list2 = 1 -> 3 -> 4 -> null
Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> null
```

### Example 2
```
Input:  list1 = null,  list2 = null
Output: null
```

### Example 3
```
Input:  list1 = null,  list2 = 0 -> null
Output: 0 -> null
```

## Constraints
- `0 <= list length <= 50` each
- `-100 <= Node.val <= 100`
- Both lists are sorted in non-decreasing order.

## Hints

<details>
<summary>Hint 1 — use a dummy node to simplify</summary>

Use a dummy node as the head of your result list. This avoids the special case of the first node being empty.

```
dummy -> (result builds here)
tail pointer tracks the end of the result
```

At the end, return `dummy.next`.
</details>

<details>
<summary>Hint 2 — the merge loop</summary>

While both `list1` and `list2` are non-null:
- Compare `list1.val` and `list2.val`.
- Attach the smaller node to `tail.next`.
- Advance the pointer in the chosen list and advance `tail`.

After the loop, attach whatever remains (one of them may still have nodes).

```js
const dummy = new ListNode(0);
let tail = dummy;

while (list1 !== null && list2 !== null) {
  if (list1.val <= list2.val) {
    tail.next = list1;
    list1 = list1.next;
  } else {
    tail.next = list2;
    list2 = list2.next;
  }
  tail = tail.next;
}
tail.next = list1 !== null ? list1 : list2;
return dummy.next;
```
</details>

<details>
<summary>Hint 3 — recursive alternative</summary>

```js
function mergeTwoLists(l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  if (l1.val <= l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}
```

Elegant but O(n + m) stack space. The iterative version is preferred for large lists.
</details>

## Write your solution
→ [`../solutions/16-merge-sorted-lists.js`](../solutions/16-merge-sorted-lists.js)

## Follow-ups
- **Merge K Sorted Lists** (Q29) — generalize to k lists using a min-heap.
- What if both lists could have duplicates? Does your solution still handle them correctly?
- What is the time complexity if one list has n nodes and the other has m nodes?
