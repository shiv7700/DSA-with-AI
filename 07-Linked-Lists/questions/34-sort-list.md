# Q34 — Sort a Linked List

**Difficulty:** Hard
**Pattern:** Merge Sort on Linked Lists
**Expected:** O(n log n) time · O(log n) space (recursive call stack)

## Problem

Given the head of a singly linked list, sort the list in **ascending order** and return the head of the sorted list.

You must solve it in O(n log n) time.

## Examples

### Example 1
```
Input:  4 -> 2 -> 1 -> 3 -> null
Output: 1 -> 2 -> 3 -> 4 -> null
```

### Example 2
```
Input:  -1 -> 5 -> 3 -> 4 -> 0 -> null
Output: -1 -> 0 -> 3 -> 4 -> 5 -> null
```

### Example 3 — single node
```
Input:  1 -> null
Output: 1 -> null
```

## Constraints
- `0 <= list length <= 5 * 10^4`
- `-10^5 <= Node.val <= 10^5`

## Hints

<details>
<summary>Hint 1 — why merge sort and not quicksort?</summary>

Quicksort on a linked list requires random access (or multiple passes) to find a good pivot, making it tricky to achieve O(n log n) reliably. Merge sort is the natural fit because:
1. Splitting a list in half is O(n) with slow/fast pointers.
2. Merging two sorted lists is O(n) (Q16).
3. Both operations are pointer-based — no random access needed.
</details>

<details>
<summary>Hint 2 — the algorithm</summary>

```
sortList(head):
  1. Base case: if head === null or head.next === null, return head.
  2. Find the middle using slow/fast pointers.
  3. Split: cut the list at the middle (set mid.next = null).
  4. Recursively sort both halves.
  5. Merge the two sorted halves using mergeTwoLists (Q16).
  6. Return the merged head.
```
</details>

<details>
<summary>Hint 3 — splitting the list</summary>

```js
let slow = head;
let fast = head.next;  // note: fast starts at head.next, not head

while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;
}

const mid = slow.next;
slow.next = null;    // cut the list here
// now head...slow is the first half, mid...end is the second half
```

Using `fast = head.next` (instead of `head`) ensures that for a 2-node list, slow ends up at the first node — giving you a split of [1 node] + [1 node] rather than [2 nodes] + [0 nodes] (infinite recursion).
</details>

## Write your solution
→ [`../solutions/34-sort-list.js`](../solutions/34-sort-list.js)

## Follow-ups
- Implement the **bottom-up (iterative) merge sort** to achieve O(1) space (no call stack). This is harder but achieves truly optimal O(n log n) time and O(1) space.
- What is the space complexity of the recursive version? Why is it O(log n) rather than O(1)?
