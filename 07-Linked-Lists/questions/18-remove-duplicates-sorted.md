# Q18 — Remove Duplicates from Sorted List

**Difficulty:** Medium
**Pattern:** Traversal with in-place removal
**Expected:** O(n) time · O(1) space

## Problem

Given the head of a **sorted** singly linked list, delete all duplicate nodes so that each value appears **only once**. Return the head of the modified list.

## Examples

### Example 1
```
Input:  1 -> 1 -> 2 -> null
Output: 1 -> 2 -> null
```

### Example 2
```
Input:  1 -> 1 -> 2 -> 3 -> 3 -> null
Output: 1 -> 2 -> 3 -> null
```

### Example 3 — no duplicates
```
Input:  1 -> 2 -> 3 -> null
Output: 1 -> 2 -> 3 -> null
```

### Example 4 — all duplicates
```
Input:  1 -> 1 -> 1 -> null
Output: 1 -> null
```

## Constraints
- `0 <= list length <= 300`
- `-100 <= Node.val <= 100`
- The list is sorted in non-decreasing order.

## Hints

<details>
<summary>Hint 1 — exploit the sorted property</summary>

Because the list is sorted, all duplicates of a value are **adjacent**. You don't need a Set or hash map — just compare each node with its neighbor.
</details>

<details>
<summary>Hint 2 — the comparison loop</summary>

Walk with `curr`. At each node, check if `curr.val === curr.next.val`.
- If they're equal, skip the next node: `curr.next = curr.next.next`.
- If they're different, advance: `curr = curr.next`.

```js
let curr = head;
while (curr !== null && curr.next !== null) {
  if (curr.val === curr.next.val) {
    curr.next = curr.next.next;  // skip the duplicate
  } else {
    curr = curr.next;            // move on
  }
}
return head;
```
</details>

<details>
<summary>Hint 3 — why don't we advance curr after skipping?</summary>

After `curr.next = curr.next.next`, the new `curr.next` might also be a duplicate (e.g., `1 -> 1 -> 1`). By staying at `curr`, the next loop iteration will catch that too. If you advanced immediately, you'd skip the comparison.
</details>

## Write your solution
→ [`../solutions/18-remove-duplicates-sorted.js`](../solutions/18-remove-duplicates-sorted.js)

## Follow-ups
- **Remove all occurrences** of duplicated values (not just extras): for input `1 -> 2 -> 2 -> 3`, return `1 -> 3 -> null` (LeetCode 82). This is harder — use a dummy node and look ahead.
- See Q19 for the unsorted version — it requires a different approach.
