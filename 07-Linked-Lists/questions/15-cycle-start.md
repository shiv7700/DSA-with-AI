# Q15 — Find the Start of a Cycle

**Difficulty:** Medium
**Pattern:** Slow / Fast Pointers + Mathematical insight
**Expected:** O(n) time · O(1) space

## Problem

Given the head of a linked list that **contains a cycle**, return the **node where the cycle begins** (the node that is entered again after the cycle completes).

If the list has no cycle, return `null`.

## Examples

### Example 1
```
List:   3 -> 1 -> 0 -> 4
                  ↑         │
                  └──────────
        (4's next points back to node with value 1)

Output: node with val = 1
```

### Example 2
```
List:   1 -> 2
        ↑         │
        └──────────
        (2's next points back to node with value 1)

Output: node with val = 1
```

### Example 3 — no cycle
```
Input:  1 -> 2 -> 3 -> null
Output: null
```

## Constraints
- The number of nodes is in the range `[0, 10^4]`.
- Return the node (not its value).
- O(1) extra space — no Sets.

## Hints

<details>
<summary>Hint 1 — Phase 1: detect the meeting point</summary>

First, run Floyd's cycle detection (from Q14) to find the point where `slow` and `fast` meet inside the cycle. Call this the **meeting point**.

If `fast` reaches `null` before meeting `slow`, there's no cycle — return `null`.
</details>

<details>
<summary>Hint 2 — Phase 2: find the cycle start (the key insight)</summary>

After the meeting point is found, reset **one** pointer back to `head`. Leave the other at the meeting point.

Now advance **both** one step at a time. The node where they meet again is the **start of the cycle**.

Why? Here's the math:
- Let `F` = distance from head to cycle start.
- Let `C` = cycle length.
- Let `a` = distance from cycle start to the meeting point.

When they meet: slow has traveled `F + a`, fast has traveled `F + a + C` (one full extra lap at minimum). Since fast moves twice as fast: `2(F + a) = F + a + C`, which gives `F = C - a`.

So: distance from head to cycle start = distance from meeting point to cycle start (going forward in the cycle). Both pointers travel `F` more steps to arrive at the same place — the cycle start.
</details>

<details>
<summary>Hint 3 — implementation sketch</summary>

```js
function detectCycleStart(head) {
  let slow = head, fast = head;

  // Phase 1: find meeting point
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  if (fast === null || fast.next === null) return null; // no cycle

  // Phase 2: find cycle start
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow; // cycle start
}
```
</details>

## Write your solution
→ [`../solutions/15-cycle-start.js`](../solutions/15-cycle-start.js)

## Follow-ups
- Implement `cycleLength(head)` — given that a cycle exists, return how many nodes are in the cycle.
- Can you find the cycle start using a `Set` of visited nodes instead? What are the trade-offs?
