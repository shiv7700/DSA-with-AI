# Q8 — Array to Linked List and Back

**Difficulty:** Easy
**Pattern:** Traversal / Construction
**Expected:** O(n) time · O(n) space

## Problem

Implement two conversion utilities:

1. `arrayToList(arr)` — Given a JavaScript array, return the head of a singly linked list with the same values in the same order. Return `null` for an empty array.

2. `listToArray(head)` — Given the head of a singly linked list, return a JavaScript array with all values in order. Return `[]` for an empty list.

These two functions are extremely useful as helpers for testing. You'll use them constantly throughout this chapter.

## Examples

### Example 1 — arrayToList
```
Input:  [1, 2, 3, 4]
Output: 1 -> 2 -> 3 -> 4 -> null
```

### Example 2 — listToArray
```
Input:  1 -> 2 -> 3 -> 4 -> null
Output: [1, 2, 3, 4]
```

### Example 3 — empty inputs
```
arrayToList([])   →  null
listToArray(null) →  []
```

### Example 4 — single element
```
arrayToList([42]) →  42 -> null
listToArray(42 -> null) →  [42]
```

## Constraints
- `0 <= arr.length <= 10^4`
- Values can be any number.
- `arrayToList` followed by `listToArray` should give back the original array.

## Hints

<details>
<summary>Hint 1 — arrayToList approach</summary>

Use a dummy node to avoid the empty-list special case:

```js
const dummy = new ListNode(0);
let tail = dummy;
for (const val of arr) {
  tail.next = new ListNode(val);
  tail = tail.next;
}
return dummy.next;
```

Or manually: create the first node, keep a `tail` pointer, append each subsequent node.
</details>

<details>
<summary>Hint 2 — listToArray approach</summary>

Walk the list and collect values:

```js
const result = [];
let curr = head;
while (curr !== null) {
  result.push(curr.val);
  curr = curr.next;
}
return result;
```
</details>

<details>
<summary>Hint 3 — round-trip test</summary>

After implementing both, verify:
```js
const arr = [1, 2, 3, 4, 5];
const list = arrayToList(arr);
const back = listToArray(list);
console.log(JSON.stringify(arr) === JSON.stringify(back)); // true
```
</details>

## Write your solution
→ [`../solutions/08-array-conversion.js`](../solutions/08-array-conversion.js)

## Follow-ups
- Implement `arrayToList` recursively.
- Could you build the list in reverse order (from the last element to the first) and still get the correct forward-ordered list? What extra step would be needed?
