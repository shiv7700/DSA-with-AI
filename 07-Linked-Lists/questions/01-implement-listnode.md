# Q1 — Implement ListNode Class

**Difficulty:** Easy
**Pattern:** Class implementation / Foundational
**Expected:** N/A — this is a building block, not an algorithmic problem

## Problem

Before you can solve any linked list problem, you need a node. Your task is to implement the `ListNode` class — the smallest unit of a linked list.

A `ListNode` has exactly two properties:

- `val` — the value stored in this node (any type; defaults to `0`)
- `next` — a reference to the next `ListNode` in the chain (defaults to `null`)

Implement the class so the following usage works:

```js
const a = new ListNode(5);
// a.val  === 5
// a.next === null

const b = new ListNode(10, a);
// b.val  === 10
// b.next === a  (b.next.val === 5)

const c = new ListNode();
// c.val  === 0
// c.next === null
```

## Examples

### Example 1 — Single node
```
new ListNode(42)
→  { val: 42, next: null }
```

### Example 2 — Node pointing to another node
```
const tail = new ListNode(3);
const head = new ListNode(1, tail);

Resulting list:  1 -> 3 -> null
```

### Example 3 — Building a list manually
```
const n3 = new ListNode(30);
const n2 = new ListNode(20, n3);
const n1 = new ListNode(10, n2);

head = n1
List: 10 -> 20 -> 30 -> null
```

### Example 4 — Default constructor
```
new ListNode()
→  { val: 0, next: null }
```

## Constraints

- `val` can be any JavaScript value (number, string, null, etc.)
- `next` must default to `null`
- `val` must default to `0`
- The class must work as the foundation for every subsequent linked list problem in this chapter

## Hints

<details>
<summary>Hint 1 — What goes in the constructor?</summary>

A `ListNode` only needs a constructor. It has no methods. The constructor receives two parameters, both with defaults:

```js
class ListNode {
  constructor(val = 0, next = null) {
    // store them as properties
  }
}
```
</details>

<details>
<summary>Hint 2 — Storing the properties</summary>

Inside the constructor, assign the parameters to `this`:

```js
this.val = val;
this.next = next;
```

That's literally the whole class.
</details>

<details>
<summary>Hint 3 — Verify with a manual chain</summary>

After implementing, test it like this:

```js
const c = new ListNode(30);
const b = new ListNode(20, c);
const a = new ListNode(10, b);

let curr = a;
while (curr !== null) {
  console.log(curr.val);
  curr = curr.next;
}
// Should print: 10, 20, 30
```
</details>

## Write your solution
→ [`../solutions/01-implement-listnode.js`](../solutions/01-implement-listnode.js)

## Follow-ups
- Add a `toString()` method that returns the list as a string `"10 -> 20 -> 30 -> null"`.
- Can you build `1 -> 2 -> 3 -> null` in a single expression (one line, no intermediate variables)?
- What happens if you create a circular reference: `a.next = a`? How would you detect that in a traversal?
