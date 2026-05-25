# Q10 — Merge Sort

**Difficulty:** Medium (Implement from scratch)
**Pattern:** Divide and conquer
**Expected:** O(n log n) time all cases · O(n) space

## Problem

Implement **Merge Sort** from scratch.

Merge sort is a classic divide-and-conquer algorithm:

1. **Divide**: split the array in half.
2. **Conquer**: recursively sort each half.
3. **Combine**: merge the two sorted halves back together.

The key insight is that merging two sorted arrays is easy and efficient: use two pointers (one per half) and always take the smaller of the two pointed-to elements.

**Rules:**
1. You may return a new sorted array (out-of-place is fine — O(n) extra space is expected).
2. Sort in **ascending** order.
3. Do **not** use JavaScript's built-in `.sort()`.

**Properties:**
- **Stable**: Yes (when equal, take from the left half first)
- **In-place**: No (requires O(n) extra space)
- **Time**: O(n log n) in all cases (best, average, worst — no bad inputs)

## Examples

### Example 1
```
Input:  [5, 3, 1, 4, 2]
Output: [1, 2, 3, 4, 5]
```

### Example 2
```
Input:  [38, 27, 43, 3, 9, 82, 10]
Output: [3, 9, 10, 27, 38, 43, 82]
```

### Example 3
```
Input:  []
Output: []

Input:  [1]
Output: [1]

Input:  [2, 1]
Output: [1, 2]
```

## Constraints
- `0 <= arr.length <= 10^5`
- `-10^6 <= arr[i] <= 10^6`
- Sort in ascending order.
- O(n log n) time, O(n) space.

## Hints

<details>
<summary>Hint 1 — base case and splitting</summary>

The base case: if the array has 0 or 1 element, it is already sorted — return it.

For arrays with 2 or more elements:
```js
const mid = Math.floor(arr.length / 2);
const left  = mergeSort(arr.slice(0, mid));
const right = mergeSort(arr.slice(mid));
return merge(left, right);
```

`arr.slice` creates a new sub-array — this is where the O(n) space comes from (across all recursive calls, you allocate O(n) total at each of the log n levels).
</details>

<details>
<summary>Hint 2 — the merge function</summary>

```js
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {   // <= ensures stability (left takes ties)
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // append any remaining elements
  while (i < left.length)  result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}
```

The `<=` (rather than `<`) is what makes merge sort stable: when elements are equal, we always take from the left half first, preserving original order.
</details>

<details>
<summary>Hint 3 — tracing the recursion</summary>

For `[5, 3, 1, 4, 2]`:

```
mergeSort([5,3,1,4,2])
├── mergeSort([5,3,1])
│   ├── mergeSort([5])     → [5]
│   └── mergeSort([3,1])
│       ├── mergeSort([3]) → [3]
│       └── mergeSort([1]) → [1]
│       merge([3],[1])     → [1,3]
│   merge([5],[1,3])       → [1,3,5]
└── mergeSort([4,2])
    ├── mergeSort([4])     → [4]
    └── mergeSort([2])     → [2]
    merge([4],[2])         → [2,4]
merge([1,3,5],[2,4])       → [1,2,3,4,5]
```
</details>

<details>
<summary>Hint 4 — iterative bottom-up merge sort (bonus)</summary>

Instead of recursing top-down, start with sub-arrays of size 1 (already sorted), merge pairs into size 2, then merge pairs of size 2 into size 4, and so on:

```js
function mergeSortIterative(arr) {
  const n = arr.length;
  let result = [...arr];

  for (let size = 1; size < n; size *= 2) {
    for (let start = 0; start < n; start += size * 2) {
      const mid   = Math.min(start + size, n);
      const end   = Math.min(start + size * 2, n);
      const merged = merge(result.slice(start, mid), result.slice(mid, end));
      result.splice(start, merged.length, ...merged);
    }
  }
  return result;
}
```

This avoids recursion entirely and uses the same O(n log n) time and O(n) space.
</details>

## Write your solution
→ [`../solutions/10-merge-sort.js`](../solutions/10-merge-sort.js)

## Follow-ups
- Implement the iterative bottom-up version as described in Hint 4.
- Why is merge sort the algorithm of choice for sorting linked lists? (Hint: think about how splitting and merging work without random access.)
- Counting inversions (Q28) uses merge sort's merge step. Can you see how?
