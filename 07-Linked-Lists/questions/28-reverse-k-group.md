# Q28 — Reverse Nodes in k-Group

**Difficulty:** Hard
**Pattern:** Reversal in chunks / Recursion or iterative
**Expected:** O(n) time · O(1) iterative / O(n/k) recursive space

## Problem

Given the head of a linked list and an integer `k`, reverse the nodes of the list `k` at a time, and return the modified list head.

If the number of nodes is not a multiple of `k`, the remaining nodes at the end are left as-is.

You may not alter the values in the nodes — only the nodes themselves may be changed.

## Examples

### Example 1
```
Input:  1 -> 2 -> 3 -> 4 -> 5 -> null,  k = 2
Output: 2 -> 1 -> 4 -> 3 -> 5 -> null
```

### Example 2
```
Input:  1 -> 2 -> 3 -> 4 -> 5 -> null,  k = 3
Output: 3 -> 2 -> 1 -> 4 -> 5 -> null

First group of 3: [1,2,3] → reversed → [3,2,1]
Remaining 2 nodes: left as [4,5]
```

### Example 3
```
Input:  1 -> 2 -> null,  k = 3
Output: 1 -> 2 -> null  (less than k nodes — unchanged)
```

## Constraints
- `1 <= list length <= 5000`
- `1 <= k <= list length`
- Only node rearrangement allowed — no value modification.

## Hints

<details>
<summary>Hint 1 — check if k nodes exist before reversing</summary>

Before reversing a group, verify that there are at least `k` nodes remaining. If not, leave them as-is and stop.

Walk `k` steps forward to find the end of the current group (call it `kthNode`). If you fall off the end before reaching k steps, don't reverse.
</details>

<details>
<summary>Hint 2 — reverse a segment of exactly k nodes</summary>

After confirming the group has k nodes, reverse those k nodes using the standard three-pointer technique. Keep track of:
- `groupStart` — the first node of the group (will become the tail after reversal)
- `groupPrev` — the node before `groupStart` (its `next` needs to point to the new group head)
- `nextGroupStart` — the node after the group (the next group's start)

After reversal, wire `groupPrev.next = (new group head)` and `groupStart.next = nextGroupStart`.
</details>

<details>
<summary>Hint 3 — use a dummy node for the "before first group" case</summary>

A dummy node before `head` gives you a uniform `groupPrev` for the first group, avoiding a special case.

```js
const dummy = new ListNode(0);
dummy.next = head;
let groupPrev = dummy;

while (true) {
  const kthNode = getKthNode(groupPrev, k); // walk k steps from groupPrev
  if (kthNode === null) break; // fewer than k nodes left

  const nextGroupStart = kthNode.next;
  // reverse group from groupPrev.next to kthNode
  // rewire groupPrev.next and groupStart.next
  groupPrev = groupStart; // advance groupPrev for next iteration
}
return dummy.next;
```
</details>

## Write your solution
→ [`../solutions/28-reverse-k-group.js`](../solutions/28-reverse-k-group.js)

## Follow-ups
- **Swap Nodes in Pairs** (Q25) is this problem with `k = 2`. Verify your solution handles `k = 2` correctly.
- What if you wanted to reverse groups but leave the last group in its **original** order even when it has exactly k nodes? How would you distinguish "last group" from "other groups"?
