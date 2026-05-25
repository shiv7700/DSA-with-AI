# Q5 — Check If Array Is a Valid Min-Heap

**Difficulty:** Easy
**Pattern:** Heap property validation
**Expected:** O(n) time · O(1) space

## Problem

Given an array of integers, determine whether it represents a valid min-heap.

An array represents a valid min-heap if for every index `i` with children at `2*i+1` (left) and `2*i+2` (right), the parent's value is **less than or equal to** both children's values.

Return `true` if valid, `false` otherwise.

## Examples

### Example 1
```
Input:  [1, 3, 2, 7, 5, 4, 6]
Output: true
```
Check: `1≤3` ✅, `1≤2` ✅, `3≤7` ✅, `3≤5` ✅, `2≤4` ✅, `2≤6` ✅

### Example 2
```
Input:  [1, 3, 2, 7, 5, 1, 6]
Output: false
```
Index 2 (value `2`) has right child at index 6 (value `1`). `2 > 1` — violation!

### Example 3
```
Input:  [5]
Output: true
```
A single element is trivially a valid heap.

### Example 4
```
Input:  []
Output: true
```
An empty array is a valid (empty) heap.

### Example 5
```
Input:  [10, 9, 8]
Output: false
```
`10 > 9` — root violates heap property with its left child.

## Constraints
- `0 <= arr.length <= 10^5`
- `-10^9 <= arr[i] <= 10^9`

## Hints

<details>
<summary>Hint 1 — only check non-leaf nodes</summary>

You only need to check nodes that have at least one child. That's indices `0` through `Math.floor(n/2) - 1`.

Leaves (the second half of the array) have no children, so there's nothing to validate for them.
</details>

<details>
<summary>Hint 2 — be careful with the right child</summary>

The right child at `2*i+2` might be out of bounds (when the array has even length and `i` is the last non-leaf). Always check `2*i+2 < n` before comparing.
</details>

<details>
<summary>Hint 3 — code structure</summary>

```js
function isValidMinHeap(arr) {
  const n = arr.length;
  for (let i = 0; i < Math.floor(n / 2); i++) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (arr[i] > arr[l]) return false;
    if (r < n && arr[i] > arr[r]) return false;
  }
  return true;
}
```
</details>

## Write your solution
→ [`../solutions/05-is-valid-min-heap.js`](../solutions/05-is-valid-min-heap.js)

## Follow-ups
- Write a `isValidMaxHeap(arr)` version.
- Can you do this recursively? What's the trade-off vs the iterative version?
- If the array has duplicate values, does your logic still hold? (It should — the invariant is `≤`, not `<`.)
