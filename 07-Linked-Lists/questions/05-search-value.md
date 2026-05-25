# Q5 — Search for a Value

**Difficulty:** Easy
**Pattern:** Traversal
**Expected:** O(n) time · O(1) space

## Problem

Given the head of a singly linked list and a target value, search the list for the **first** node whose `val` equals `target`. Return that **node** (not just the value). If no node is found, return `null`.

## Examples

### Example 1 — value exists
```
List:   1 -> 3 -> 5 -> 7 -> null
target: 5
Output: the node { val: 5, next: -> 7 }
```

### Example 2 — value does not exist
```
List:   1 -> 3 -> 5 -> null
target: 99
Output: null
```

### Example 3 — match at head
```
List:   10 -> 20 -> 30 -> null
target: 10
Output: the node { val: 10, next: -> 20 }
```

### Example 4 — empty list
```
List:   null
target: 5
Output: null
```

### Example 5 — duplicate values (return first)
```
List:   1 -> 2 -> 2 -> 3 -> null
target: 2
Output: the first node { val: 2, next: -> 2 }
```

## Constraints
- `0 <= list length <= 10^4`
- Values can be any number (including duplicates and negatives).
- Return the **node** itself, not its index or value.

## Hints

<details>
<summary>Hint 1 — use the traversal skeleton</summary>

```js
let curr = head;
while (curr !== null) {
  if (curr.val === target) return curr;
  curr = curr.next;
}
return null;
```

You're just walking the list and checking each node as you go.
</details>

<details>
<summary>Hint 2 — why return the node and not the index?</summary>

Returning the node gives the caller a direct reference they can use for O(1) follow-up operations (like insertion before/after, or deletion). If you only returned the index, the caller would have to traverse again to find the node.
</details>

## Write your solution
→ [`../solutions/05-search-value.js`](../solutions/05-search-value.js)

## Follow-ups
- Modify the function to return the **index** of the first match, or `-1` if not found.
- Modify it to return **all** nodes that match (as an array of nodes).
- Is it possible to do better than O(n) in a linked list? Why or why not? (Compare with a sorted array where binary search gives O(log n).)
