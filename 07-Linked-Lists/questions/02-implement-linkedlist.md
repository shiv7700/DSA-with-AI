# Q2 — Implement LinkedList Class

**Difficulty:** Easy (foundational)
**Pattern:** Class implementation / Pointer manipulation
**Expected:** Most methods O(n) time · O(1) space; head/tail operations O(1)

## Problem

Now that you have `ListNode`, build the `LinkedList` class that wraps it into a fully usable data structure.

Your `LinkedList` class must implement the following methods:

| Method | Description |
|---|---|
| `push(val)` | Append a value at the **tail**. |
| `pop()` | Remove and return the **tail** value. Return `null` if empty. |
| `shift()` | Remove and return the **head** value. Return `null` if empty. |
| `unshift(val)` | Prepend a value at the **head**. |
| `get(i)` | Return the **value** at index `i` (0-based). Return `null` if out of bounds. |
| `insert(i, val)` | Insert `val` at index `i`. Return `true` on success, `false` if out of bounds. |
| `remove(i)` | Remove the node at index `i`. Return the removed value, or `null` if out of bounds. |
| `reverse()` | Reverse the list **in place**. |
| `toArray()` | Return all values in order as a plain JS array. |

You should also maintain:
- `this.head` — points to the first node (or `null`)
- `this.tail` — points to the last node (or `null`)
- `this.length` — the number of nodes

## Examples

### Example 1 — push and toArray
```
const ll = new LinkedList();
ll.push(1);
ll.push(2);
ll.push(3);
ll.toArray()   →  [1, 2, 3]
ll.length      →  3
```

### Example 2 — pop and shift
```
ll.pop()       →  3     (removes tail)
ll.shift()     →  1     (removes head)
ll.toArray()   →  [2]
```

### Example 3 — get and insert
```
const ll = new LinkedList();
ll.push(10); ll.push(30);
ll.insert(1, 20);     // insert 20 between 10 and 30
ll.toArray()   →  [10, 20, 30]
ll.get(1)      →  20
ll.get(99)     →  null
```

### Example 4 — reverse
```
const ll = new LinkedList();
ll.push(1); ll.push(2); ll.push(3);
ll.reverse();
ll.toArray()   →  [3, 2, 1]
```

## Constraints

- All operations should handle an **empty list** gracefully (no crashes).
- `get`, `insert`, `remove` should handle out-of-bounds indexes gracefully.
- Maintain `head`, `tail`, and `length` accurately after every mutation.
- `push` and `unshift` should be **O(1)** because you maintain a `tail` pointer.
- `pop` may be O(n) for a singly linked list (you need to find the new tail).

## Hints

<details>
<summary>Hint 1 — Start with the constructor</summary>

```js
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}
```

Three properties: head, tail, length. All operations stem from these.
</details>

<details>
<summary>Hint 2 — Implement push first</summary>

`push(val)` appends to the tail:

1. Create a new node.
2. If the list is **empty** (`head === null`): set both `head` and `tail` to the new node.
3. If the list is **not empty**: point `tail.next` to the new node, then update `tail`.
4. Increment `length`.

```js
push(val) {
  const node = new ListNode(val);
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
  }
  this.length++;
}
```
</details>

<details>
<summary>Hint 3 — Implement get (needed by insert and remove)</summary>

`get(i)` walks to the i-th node:

```js
get(i) {
  if (i < 0 || i >= this.length) return null;
  let curr = this.head;
  for (let k = 0; k < i; k++) curr = curr.next;
  return curr.val;
}
```

A private helper `_getNode(i)` that returns the node (not just the value) will be useful for `insert` and `remove`.
</details>

<details>
<summary>Hint 4 — Implement reverse</summary>

Use the three-pointer dance from Lesson 16 of notes.md:

```js
reverse() {
  let prev = null;
  let curr = this.head;
  this.tail = this.head;   // old head becomes new tail
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  this.head = prev;        // old tail becomes new head
}
```
</details>

<details>
<summary>Hint 5 — Edge cases to handle</summary>

- `pop()` on a 1-element list: head and tail both become `null`.
- `shift()` on a 1-element list: same.
- `insert(0, val)` is the same as `unshift(val)` — handle it.
- `insert(this.length, val)` is the same as `push(val)` — handle it.
- `remove` on the only element: reset head, tail, and length to empty state.
</details>

## Write your solution
→ [`../solutions/02-implement-linkedlist.js`](../solutions/02-implement-linkedlist.js)

## Follow-ups
- Add a `print()` method that outputs `"1 -> 2 -> 3 -> null"`.
- Add a `find(val)` method that returns the index of the first node with that value, or `-1`.
- Why is `pop()` O(n) for a singly linked list, and how would a doubly linked list make it O(1)?
