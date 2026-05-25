# Q14 — Detect a Cycle

**Difficulty:** Medium
**Pattern:** Slow / Fast Pointers (Floyd's Cycle Detection)
**Expected:** O(n) time · O(1) space

## Problem

Given the head of a singly linked list, determine if the list contains a **cycle**. Return `true` if there is a cycle, `false` otherwise.

A cycle exists if some node's `next` pointer points back to a previously visited node — causing the list to loop infinitely instead of ending at `null`.

## Examples

### Example 1 — cycle exists
```
List:   1 -> 2 -> 3 -> 4 -> 2  (4's next points back to node 2)

1 -> 2 -> 3 -> 4
     ↑         │
     └──────────

Output: true
```

### Example 2 — no cycle
```
Input:  1 -> 2 -> 3 -> 4 -> null
Output: false
```

### Example 3 — single node, no cycle
```
Input:  1 -> null
Output: false
```

### Example 4 — single node with self-loop
```
Input:  1 -> 1  (node's next points to itself)
Output: true
```

## Constraints
- The number of nodes is in the range `[0, 10^4]`.
- Node values can be duplicates — you can't detect a cycle by checking values.
- Use **O(1) extra space** — no storing visited nodes.

## Hints

<details>
<summary>Hint 1 — why not use a Set?</summary>

You could store every visited node in a `Set` and check if you've seen the current node before. If you see it again, there's a cycle. This works in O(n) time but uses O(n) space. Can you do it in O(1) space?
</details>

<details>
<summary>Hint 2 — Floyd's Tortoise and Hare</summary>

Use two pointers:
- `slow` advances one step at a time.
- `fast` advances two steps at a time.

If there is **no cycle**: `fast` will eventually reach `null` (the end of the list).
If there **is a cycle**: `fast` will eventually lap `slow` — they'll land on the same node.

Why? Inside a cycle, `fast` gains on `slow` by 1 step per iteration. Starting from any gap, they'll meet in at most `cycle_length` more steps.
</details>

<details>
<summary>Hint 3 — implementation</summary>

```js
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;   // they met — cycle confirmed
  }
  return false;   // fast hit null — no cycle
}
```

Note: `slow === fast` compares **node references** (same object in memory), not values. This is important because a list can have duplicate values.
</details>

## Write your solution
→ [`../solutions/14-detect-cycle.js`](../solutions/14-detect-cycle.js)

## Follow-ups
- Find **where** the cycle starts (Q15) — not just whether one exists.
- What is the maximum number of steps before `fast` and `slow` meet? (Think about cycle length.)
- What if `fast` advances 3 steps instead of 2? Does the algorithm still work?
