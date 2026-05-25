# Q27 — Partition List

**Difficulty:** Medium
**Pattern:** Two dummy nodes / list splitting
**Expected:** O(n) time · O(1) space

## Problem

Given the head of a linked list and a value `x`, partition it such that all nodes with values **less than** `x` come before all nodes with values **greater than or equal to** `x`.

Preserve the original relative order of nodes within each partition.

## Examples

### Example 1
```
Input:  1 -> 4 -> 3 -> 2 -> 5 -> 2 -> null,  x = 3
Output: 1 -> 2 -> 2 -> 4 -> 3 -> 5 -> null

Nodes < 3:  1, 2, 2  (in original order)
Nodes >= 3: 4, 3, 5  (in original order)
```

### Example 2
```
Input:  2 -> 1 -> null,  x = 2
Output: 1 -> 2 -> null

Nodes < 2:  1
Nodes >= 2: 2
```

### Example 3 — all less than x
```
Input:  1 -> 2 -> 3 -> null,  x = 10
Output: 1 -> 2 -> 3 -> null
```

## Constraints
- `0 <= list length <= 200`
- `-100 <= Node.val <= 100`
- `-200 <= x <= 200`

## Hints

<details>
<summary>Hint 1 — two separate lists</summary>

Build two lists as you traverse:
- "less" list: nodes with `val < x`
- "greater" list: nodes with `val >= x`

At the end, connect the tail of "less" to the head of "greater".
</details>

<details>
<summary>Hint 2 — use two dummy heads</summary>

```js
const lessHead = new ListNode(0);   // dummy for < x list
const greaterHead = new ListNode(0); // dummy for >= x list
let less = lessHead;
let greater = greaterHead;

let curr = head;
while (curr !== null) {
  if (curr.val < x) {
    less.next = curr;
    less = less.next;
  } else {
    greater.next = curr;
    greater = greater.next;
  }
  curr = curr.next;
}

greater.next = null;         // end the greater list
less.next = greaterHead.next; // connect less to greater
return lessHead.next;
```
</details>

<details>
<summary>Hint 3 — why set greater.next = null?</summary>

After the loop, the last node in the "greater" list still has its old `next` pointer pointing somewhere in the original list. Setting it to `null` ensures the merged list terminates properly.
</details>

## Write your solution
→ [`../solutions/27-partition-list.js`](../solutions/27-partition-list.js)

## Follow-ups
- What if you wanted nodes equal to `x` in their own middle section (less | equal | greater)? This is the Dutch National Flag problem applied to linked lists.
- How does the dummy-node pattern make the empty-partition case automatic?
