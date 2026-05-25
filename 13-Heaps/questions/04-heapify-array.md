# Q4 — Build a Heap from an Unsorted Array (Heapify)

**Difficulty:** Easy
**Pattern:** Floyd's bottom-up heap construction
**Expected:** O(n) time · O(1) extra space (in-place)

## Problem

Given an unsorted array of integers, rearrange it **in place** so that it satisfies the **min-heap property**: every element at index `i` is less than or equal to its children at `2*i+1` and `2*i+2`.

Return the modified array.

> **Why this matters:** the naive approach (insert each element into a heap one by one) runs in O(n log n). Floyd's algorithm does it in O(n) by working bottom-up and exploiting the fact that half the nodes are leaves (they need zero work). Understanding this is a classic interview question.

## Examples

### Example 1
```
Input:  [9, 4, 7, 1, 8, 3, 5]
Output: a valid min-heap, e.g. [1, 4, 3, 9, 8, 7, 5]
```
Verify: `1 ≤ 4` ✅, `1 ≤ 3` ✅, `4 ≤ 9` ✅, `4 ≤ 8` ✅, `3 ≤ 7` ✅, `3 ≤ 5` ✅

### Example 2
```
Input:  [5]
Output: [5]
```

### Example 3
```
Input:  [3, 1, 2]
Output: [1, 3, 2]  (or any valid min-heap arrangement)
```

### Example 4
```
Input:  [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
Output: a valid min-heap (1 will be at index 0)
```

## Constraints
- `1 <= arr.length <= 10^5`
- `-10^9 <= arr[i] <= 10^9`
- Modify the array in place.
- Must be O(n) — not O(n log n).

## Hints

<details>
<summary>Hint 1 — start from the last non-leaf node</summary>

Leaf nodes (the bottom half of the array) are already valid heaps of size 1 — no work needed. The last non-leaf is at index `Math.floor(n/2) - 1`.

Loop from that index DOWN to 0. For each index `i`, call `siftDown(arr, n, i)`.
</details>

<details>
<summary>Hint 2 — the siftDown helper</summary>

```js
function siftDown(arr, n, i) {
  while (true) {
    let smallest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n && arr[l] < arr[smallest]) smallest = l;
    if (r < n && arr[r] < arr[smallest]) smallest = r;
    if (smallest === i) break;
    [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
    i = smallest;
  }
}
```

Then your main function is:
```js
function heapify(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(arr, n, i);
  }
  return arr;
}
```
</details>

<details>
<summary>Hint 3 — verify your output</summary>

After running your function, write a quick verifier:
```js
function isMinHeap(arr) {
  for (let i = 0; i < arr.length; i++) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < arr.length && arr[i] > arr[l]) return false;
    if (r < arr.length && arr[i] > arr[r]) return false;
  }
  return true;
}
```
</details>

## Write your solution
→ [`../solutions/04-heapify-array.js`](../solutions/04-heapify-array.js)

## Follow-ups
- Modify your function to build a **max-heap** instead.
- What would the complexity be if you inserted elements one by one using `push` instead of bottom-up siftDown?
- Can you trace through `[9, 4, 7, 1, 8, 3, 5]` step by step to verify you get a valid min-heap?
