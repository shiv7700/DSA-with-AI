# Q6 — Get the Length

**Difficulty:** Easy
**Pattern:** Traversal
**Expected:** O(n) time · O(1) iterative / O(n) recursive space

## Problem

Given the head of a singly linked list, return the number of nodes in the list.

Implement it **twice**:
1. `lengthIterative(head)` — using a loop.
2. `lengthRecursive(head)` — using recursion.

## Examples

### Example 1
```
Input:  1 -> 2 -> 3 -> 4 -> null
Output: 4
```

### Example 2
```
Input:  42 -> null
Output: 1
```

### Example 3 — empty list
```
Input:  null
Output: 0
```

## Constraints
- `0 <= list length <= 10^4`

## Hints

<details>
<summary>Hint 1 — iterative approach</summary>

Walk the list with a counter:

```js
let count = 0;
let curr = head;
while (curr !== null) {
  count++;
  curr = curr.next;
}
return count;
```
</details>

<details>
<summary>Hint 2 — recursive approach</summary>

The length of a list is 1 (this node) + the length of the rest of the list.

Base case: an empty list (`null`) has length 0.

```js
function lengthRecursive(node) {
  if (node === null) return 0;
  return 1 + lengthRecursive(node.next);
}
```
</details>

<details>
<summary>Hint 3 — space trade-off</summary>

The iterative approach uses O(1) extra space — just a counter variable.

The recursive approach uses O(n) stack space — each call to `lengthRecursive` sits on the call stack until the base case is reached. For a 10,000-node list that's 10,000 stack frames.

In practice, always prefer the iterative version unless the problem specifically requires recursion.
</details>

## Write your solution
→ [`../solutions/06-get-length.js`](../solutions/06-get-length.js)

## Follow-ups
- Implement `isEmpty(head)` — return `true` if the list has zero nodes.
- Implement `lengthTailRecursive(head, acc = 0)` — a tail-recursive version that avoids building up the stack.
- Why can't you get the length in O(1) without maintaining a counter? Compare this to `Array.prototype.length`.
