# Q25 — Heap Sort

**Difficulty:** Medium
**Pattern:** Build max-heap in place, then extract elements to sort
**Expected:** O(n log n) time · O(1) extra space

## Problem

Implement **heap sort** to sort an integer array `nums` in ascending order **in place**. You must not use any extra arrays or built-in sort functions.

Heap sort proceeds in two phases:
1. **Build phase:** rearrange `nums` into a valid max-heap in O(n) time using Floyd's bottom-up algorithm.
2. **Sort phase:** repeatedly swap the root (current maximum) with the last unsorted element, reduce the heap size by one, and restore the max-heap property by sifting down the new root. This extracts elements in descending order, leaving `nums` sorted ascending.

## Examples

### Example 1
```
Input:  [3, 1, 4, 1, 5, 9, 2, 6]
Output: [1, 1, 2, 3, 4, 5, 6, 9]
```

### Example 2
```
Input:  [1]
Output: [1]
```

### Example 3
```
Input:  [5, 4, 3, 2, 1]
Output: [1, 2, 3, 4, 5]
```

### Example 4
```
Input:  [2, 2, 2]
Output: [2, 2, 2]
```

## Constraints
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- Sort in place. Return the modified array.

## Hints

<details>
<summary>Hint 1 — phase 1: build the max-heap in O(n)</summary>

The max-heap sift-down is the mirror of the min-heap version: instead of tracking the smallest child, track the largest child.

```js
function siftDownMax(arr, heapSize, i) {
  while (true) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < heapSize && arr[l] > arr[largest]) largest = l;
    if (r < heapSize && arr[r] > arr[largest]) largest = r;
    if (largest === i) break;
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    i = largest;
  }
}

// Build phase: start at last non-leaf, sift down to root
for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
  siftDownMax(arr, n, i);
}
```
</details>

<details>
<summary>Hint 2 — phase 2: sort by extracting the maximum n-1 times</summary>

```
for i from n-1 down to 1:
  swap arr[0] and arr[i]       // move max to its sorted position
  siftDownMax(arr, i, 0)       // restore heap property for the reduced heap
```

After `n-1` swaps, the array is sorted ascending. The key: `heapSize` shrinks from `n` to `1`, so `siftDownMax` is called with a smaller effective array each time.
</details>

<details>
<summary>Hint 3 — why ascending? (not descending)</summary>

We use a max-heap. Each extraction puts the maximum at the end of the unsorted region. After all extractions, the largest elements are at the right end — giving ascending order from left to right.

If you used a min-heap and extracted minimums, you would need to reverse the array, or place elements from right to left.
</details>

## Write your solution
→ [`../solutions/25-heap-sort.js`](../solutions/25-heap-sort.js)

## Follow-ups
- Heap sort is O(n log n) worst-case, better than quicksort's O(n²) worst-case. Why do real implementations prefer quicksort?
- Is heap sort stable? (No — equal elements can swap relative positions during the sort phase.)
- Can you implement heap sort using a min-heap? What changes?
