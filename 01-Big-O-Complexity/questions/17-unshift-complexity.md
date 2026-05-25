# Q17 — Why is arr.unshift(x) O(n)?

**Difficulty:** Easy (Conceptual)
**Pattern:** Array internals — front vs back operations
**Expected:** Written explanation with a diagram or trace

## Question

`arr.push(x)` is O(1) amortized. `arr.unshift(x)` is O(n). They both add one element to an array — why is one so much slower than the other?

Your answer should:
1. Explain the internal mechanics that make `unshift` O(n).
2. Contrast with why `push` is O(1).
3. Explain what `[...arr1, ...arr2]` (spread) does and what its complexity is.

## Examples

```js
const arr = ['A', 'B', 'C', 'D'];

arr.push('E');
// arr = ['A', 'B', 'C', 'D', 'E']
// What had to move? Nothing. 'E' just went into the next slot.

arr.unshift('Z');
// arr = ['Z', 'A', 'B', 'C', 'D', 'E']
// What had to move? Everything. Each element shifted one position to the right.
```

Draw or trace the step-by-step movement for `unshift` on a 4-element array. How many elements had to move?

## Hints

<details>
<summary>Hint 1 — arrays are contiguous blocks</summary>

Under the hood, a JavaScript array (when it's a homogeneous, dense array) is stored in a contiguous block of memory. Each element sits at a fixed offset from the start.

Element at index 0 → address 1000
Element at index 1 → address 1008
Element at index 2 → address 1016
...

To insert at the front, index 0 must hold the new element. But index 0 currently holds the old first element. The only option: move the old element to index 1, move index 1 to index 2, ..., shifting every element one slot to the right.
</details>

<details>
<summary>Hint 2 — why push doesn't have this problem</summary>

`push` adds to the end. The next slot is already free (no elements are there). No existing element needs to move. Just place the new value and update the length counter. O(1) work (ignoring occasional buffer resize, which is amortized O(1)).

The asymmetry: the end of the array has empty space. The beginning does not.
</details>

<details>
<summary>Hint 3 — spread complexity</summary>

`const merged = [...arr1, ...arr2]` creates a brand-new array containing all elements of arr1 followed by all elements of arr2.

Internally: allocate new buffer (O(n + m)), copy arr1's elements into it (O(n)), copy arr2's elements (O(m)).

Total: O(n + m) time and O(n + m) space. Spread is never free — it always iterates.
</details>

## Write your answer
→ [`../solutions/17-unshift-complexity.js`](../solutions/17-unshift-complexity.js)

## Follow-ups
- What data structure allows O(1) insertion and removal at **both** ends? (Hint: it's called a deque or double-ended queue.)
- If you need a queue (first-in, first-out) in JavaScript, why should you avoid using an array with `push` and `shift`? What's a better approach for large queues?
- What is the complexity of `arr.splice(0, 0, newItem)` — inserting at the front using splice?
- What is the complexity of `arr.splice(i, 1)` — removing one element in the middle at index i?
