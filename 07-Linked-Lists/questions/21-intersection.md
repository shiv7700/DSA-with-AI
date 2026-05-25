# Q21 — Intersection of Two Linked Lists

**Difficulty:** Medium
**Pattern:** Two-pointer length equalization
**Expected:** O(n + m) time · O(1) space

## Problem

Given the heads of two singly linked lists, `headA` and `headB`, return the **node** at which they intersect. If the lists don't intersect, return `null`.

Two lists **intersect** when they share a node — not just a value, but the actual same node object in memory. After the intersection point, both lists share the same tail.

```
List A:  a1 -> a2 ──┐
                     ├──▶ c1 -> c2 -> c3 -> null
List B:  b1 ────────┘
```

## Examples

### Example 1
```
A:  4 -> 1 -> 8 -> 4 -> 5 -> null
B:  5 -> 6 -> 1 -> 8 -> 4 -> 5 -> null
                   ↑ intersection at node with val = 8

Output: node with val = 8
```

### Example 2 — no intersection
```
A:  2 -> 6 -> 4 -> null
B:  1 -> 5 -> null
Output: null
```

### Example 3 — intersection at head of B
```
A:  1 -> null
B:  1 -> null  (same node as A's head)
Output: the shared node (val = 1)
```

## Constraints
- `0 <= list length <= 3 * 10^4`
- Node values can be duplicates — compare by **reference**, not value.
- O(1) extra space required.

## Hints

<details>
<summary>Hint 1 — the length-difference approach</summary>

If list A has length `m` and list B has length `n`, and they intersect at some point, then from the intersection point to the end both have the same number of nodes. The longer list has `|m - n|` extra nodes at the start.

Step 1: Count both lengths. Advance a pointer in the longer list by `|m - n|` steps.
Step 2: Advance both pointers one step at a time until they meet (or both reach null).
</details>

<details>
<summary>Hint 2 — the elegant two-pointer trick (no length counting)</summary>

This is a beautiful O(1) space O(n+m) time solution:

- Pointer A starts at `headA`.
- Pointer B starts at `headB`.
- Both advance one step at a time.
- When A reaches the end of list A, redirect it to `headB`.
- When B reaches the end of list B, redirect it to `headA`.
- They will meet at the intersection node (or both reach `null` simultaneously if there's no intersection).

Why? Each pointer travels `m + n` total steps. At the point where they meet, both have traveled past the extra prefix nodes and are aligned at the intersection.
</details>

<details>
<summary>Hint 3 — comparison must be by reference</summary>

```js
if (pA === pB) return pA;  // same node object → intersection
```

Do NOT compare `pA.val === pB.val`. Lists can have nodes with the same value at different positions that are not the intersection.
</details>

## Write your solution
→ [`../solutions/21-intersection.js`](../solutions/21-intersection.js)

## Follow-ups
- Can you also return the index at which the intersection occurs?
- What would happen if both lists were circular? Is intersection detection still possible?
