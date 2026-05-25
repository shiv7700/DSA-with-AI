# Q7 — Print the List

**Difficulty:** Easy
**Pattern:** Traversal
**Expected:** O(n) time · O(1) iterative / O(n) recursive space

## Problem

Given the head of a singly linked list, return a string representation of the list in the format:

```
"val1 -> val2 -> val3 -> null"
```

Implement it **twice**:
1. `printIterative(head)` — using a loop (returns the string).
2. `printRecursive(head)` — using recursion (returns the string).

## Examples

### Example 1
```
Input:  1 -> 2 -> 3 -> null
Output: "1 -> 2 -> 3 -> null"
```

### Example 2
```
Input:  10 -> null
Output: "10 -> null"
```

### Example 3 — empty list
```
Input:  null
Output: "null"
```

## Constraints
- Values can be any number.
- The string must end with `" -> null"`.

## Hints

<details>
<summary>Hint 1 — iterative approach</summary>

Collect values in an array as you traverse, then join:

```js
const parts = [];
let curr = head;
while (curr !== null) {
  parts.push(curr.val);
  curr = curr.next;
}
return parts.join(' -> ') + ' -> null';
```

Or handle the empty list: if `parts` is empty, just return `"null"`.
</details>

<details>
<summary>Hint 2 — recursive approach</summary>

The string for a list starting at `node` is:
- `"null"` if `node === null`
- `node.val + " -> " + printRecursive(node.next)` otherwise

```js
function printRecursive(node) {
  if (node === null) return 'null';
  return node.val + ' -> ' + printRecursive(node.next);
}
```
</details>

## Write your solution
→ [`../solutions/07-print-list.js`](../solutions/07-print-list.js)

## Follow-ups
- Implement `printReverse(head)` — print the list from tail to head **without** reversing it first. (Hint: recursion makes this elegant.)
- What would the iterative `printReverse` look like? (Hint: you might need an explicit stack.)
