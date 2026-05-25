# Q35 — Implement a Doubly Linked List Class

**Difficulty:** Hard (Doubly Linked List Drill)
**Pattern:** Class implementation
**Expected:** O(1) for front/back operations · O(n) for middle operations

## Problem

Implement a `DoublyLinkedList` class with the following methods:

| Method | Description |
|---|---|
| `addFront(val)` | Insert `val` at the head. O(1). |
| `addBack(val)` | Insert `val` at the tail. O(1). |
| `removeFront()` | Remove and return the head value. Return `null` if empty. O(1). |
| `removeBack()` | Remove and return the tail value. Return `null` if empty. O(1). |
| `toArray()` | Return all values in forward order as a plain JS array. O(n). |
| `toArrayReverse()` | Return all values in **reverse** order as a plain JS array. O(n). |

Use a `DoublyListNode` with `val`, `next`, and `prev` pointers. Maintain `head`, `tail`, and `size`.

## Examples

### Example 1
```
const dll = new DoublyLinkedList();
dll.addBack(1);
dll.addBack(2);
dll.addBack(3);
dll.toArray()         →  [1, 2, 3]
dll.toArrayReverse()  →  [3, 2, 1]
```

### Example 2 — addFront and removals
```
dll.addFront(0);
dll.toArray()     →  [0, 1, 2, 3]
dll.removeFront() →  0
dll.removeBack()  →  3
dll.toArray()     →  [1, 2]
```

### Example 3 — empty list
```
dll.removeFront() →  null
dll.removeBack()  →  null
```

## Constraints
- `addFront` and `addBack` must be O(1) — use `head` and `tail` pointers.
- `removeFront` and `removeBack` must be O(1) — doubly linked allows back removal without traversal.
- Handle the 1-element case: removing the only node should set both `head` and `tail` to `null`.

## Hints

<details>
<summary>Hint 1 — DoublyListNode structure</summary>

```js
class DoublyListNode {
  constructor(val = 0, next = null, prev = null) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}
```
</details>

<details>
<summary>Hint 2 — addFront logic</summary>

```js
addFront(val) {
  const node = new DoublyListNode(val);
  if (this.head === null) {
    this.head = this.tail = node;
  } else {
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }
  this.size++;
}
```
</details>

<details>
<summary>Hint 3 — removeBack logic (the DLL advantage)</summary>

In a singly linked list, `removeBack` requires O(n) traversal to find the second-to-last node. In a DLL, `tail.prev` gives it to you in O(1):

```js
removeBack() {
  if (this.tail === null) return null;
  const val = this.tail.val;
  if (this.head === this.tail) {
    this.head = this.tail = null;
  } else {
    this.tail = this.tail.prev;
    this.tail.next = null;
  }
  this.size--;
  return val;
}
```
</details>

## Write your solution
→ [`../solutions/35-implement-dll.js`](../solutions/35-implement-dll.js)

## Follow-ups
- Add `insertAt(i, val)` and `removeAt(i)` methods.
- How does the LRU Cache (Q31) use a DLL internally? Map your implementation to those operations.
