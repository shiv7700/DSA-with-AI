# Q13 — Reverse a Linked List

**Difficulty:** Medium
**Pattern:** Three-pointer reversal / Recursion
**Expected:** O(n) time · O(1) iterative / O(n) recursive space

## Problem

Given the head of a singly linked list, reverse the list and return the new head.

Implement it **twice**:
1. `reverseIterative(head)` — using three pointers (`prev`, `curr`, `next`).
2. `reverseRecursive(head)` — using recursion.

## Examples

### Example 1
```
Input:  1 -> 2 -> 3 -> 4 -> 5 -> null
Output: 5 -> 4 -> 3 -> 2 -> 1 -> null
```

### Example 2
```
Input:  1 -> 2 -> null
Output: 2 -> 1 -> null
```

### Example 3 — single node
```
Input:  42 -> null
Output: 42 -> null
```

### Example 4 — empty list
```
Input:  null
Output: null
```

## Constraints
- `0 <= list length <= 5000`
- `-5000 <= Node.val <= 5000`
- Reverse in place — do not create new nodes.

## Hints

<details>
<summary>Hint 1 — the three-pointer dance (iterative)</summary>

Keep three pointers: `prev` (starts at `null`), `curr` (starts at `head`), and `next` (a temporary save).

In each iteration:
1. Save `next = curr.next` (so you don't lose the rest of the list)
2. Flip the arrow: `curr.next = prev`
3. Advance `prev` forward: `prev = curr`
4. Advance `curr` forward: `curr = next`

When `curr` is `null`, you're done. Return `prev` as the new head.

See Lesson 16 in `notes.md` for a step-by-step ASCII diagram of this process.
</details>

<details>
<summary>Hint 2 — tracing on a short list</summary>

`1 -> 2 -> 3 -> null`

- Initial: prev=null, curr=1
- Step 1: next=2, 1.next=null, prev=1, curr=2
- Step 2: next=3, 2.next=1, prev=2, curr=3
- Step 3: next=null, 3.next=2, prev=3, curr=null
- Return prev = 3

Result: `3 -> 2 -> 1 -> null` ✅
</details>

<details>
<summary>Hint 3 — recursive approach</summary>

Base case: if `head === null` or `head.next === null`, return `head` (a single-node list is already reversed).

Recursive step:
1. Recursively reverse everything after `head`: `const newHead = reverseRecursive(head.next)`.
2. `head.next` is now the tail of the reversed sublist. Point it back at `head`: `head.next.next = head`.
3. Detach `head` from what it was pointing to: `head.next = null`.
4. Return `newHead`.
</details>

## Write your solution
→ [`../solutions/13-reverse-list.js`](../solutions/13-reverse-list.js)

## Follow-ups
- **Reverse a sublist** — given positions `left` and `right` (1-indexed), reverse only the nodes in that range (LeetCode 92).
- **Reverse in k-Group** (Q28) — reverse every group of k nodes.
- What happens if you call `reverseIterative` twice on the same list? Do you get the original list back?
