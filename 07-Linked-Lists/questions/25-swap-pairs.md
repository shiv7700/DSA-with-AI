# Q25 — Swap Nodes in Pairs

**Difficulty:** Medium
**Pattern:** Pointer manipulation / Recursion
**Expected:** O(n) time · O(1) iterative / O(n) recursive space

## Problem

Given the head of a linked list, swap every two adjacent nodes and return the head of the modified list.

You must swap the **nodes themselves** — not just the values inside them.

## Examples

### Example 1
```
Input:  1 -> 2 -> 3 -> 4 -> null
Output: 2 -> 1 -> 4 -> 3 -> null

Pairs (1,2) and (3,4) were swapped.
```

### Example 2 — odd length
```
Input:  1 -> 2 -> 3 -> null
Output: 2 -> 1 -> 3 -> null

Pair (1,2) was swapped; lone node 3 stays in place.
```

### Example 3
```
Input:  1 -> null
Output: 1 -> null
```

### Example 4
```
Input:  null
Output: null
```

## Constraints
- `0 <= list length <= 100`
- `0 <= Node.val <= 100`
- Swap nodes, not values.

## Hints

<details>
<summary>Hint 1 — use a dummy node</summary>

Use a dummy node before the head to avoid a special case for the first pair. Your `prev` pointer starts at `dummy`.

For each pair `(first, second)`:
```
prev -> first -> second -> rest

becomes:

prev -> second -> first -> rest
```
</details>

<details>
<summary>Hint 2 — step-by-step rewiring</summary>

```js
prev.next = second;      // prev now points to second
first.next = second.next; // first now points to whatever was after second
second.next = first;     // second now points to first

// advance: prev = first (which is now second in the pair)
prev = first;
```

Using a dummy makes the first pair identical to all subsequent pairs.
</details>

<details>
<summary>Hint 3 — recursive version</summary>

```js
function swapPairs(head) {
  if (head === null || head.next === null) return head;

  const first = head;
  const second = head.next;

  first.next = swapPairs(second.next); // swap the rest
  second.next = first;                 // second comes before first

  return second; // second is now the new head of this pair
}
```

Elegant but O(n/2) stack frames.
</details>

## Write your solution
→ [`../solutions/25-swap-pairs.js`](../solutions/25-swap-pairs.js)

## Follow-ups
- **Reverse Nodes in k-Group** (Q28) — a generalization where you reverse groups of k instead of pairs of 2.
- What if instead of adjacent pairs, you had to swap nodes at positions (1, n), (2, n-1), etc.?
