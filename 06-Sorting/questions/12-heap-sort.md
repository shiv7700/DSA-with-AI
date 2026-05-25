# Q12 — Heap Sort

**Difficulty:** Medium (Implement from scratch)
**Pattern:** Heap, in-place sort
**Expected:** O(n log n) time all cases · O(1) space

## Problem

Implement **Heap Sort** from scratch.

Heap sort sorts an array using a **max-heap** — a data structure where every parent is greater than or equal to its children, and the largest element sits at the root (index 0).

The algorithm has two phases:

**Phase 1 — Build a max-heap (heapify the array):**
Start from the last non-leaf node (at index `Math.floor(n/2) - 1`) and sift each node downward. After this phase, `arr[0]` is the largest element.

**Phase 2 — Extract max repeatedly:**
Swap `arr[0]` (the maximum) with the last unsorted element. The array's sorted portion grows from the right. Sift the new root down to restore the heap property. Repeat n-1 times.

**Heap index arithmetic (0-based array):**
```
Element at index i:
  Left child:   2 * i + 1
  Right child:  2 * i + 2
  Parent:       Math.floor((i - 1) / 2)
```

**Rules:**
1. Sort **in place**.
2. Sort in **ascending** order.
3. Do **not** use JavaScript's built-in `.sort()`.

**Properties:**
- **Stable**: No
- **In-place**: Yes (O(1) extra space — just the array itself)
- **Time**: O(n log n) in all cases

## Examples

### Example 1
```
Input:  [4, 10, 3, 5, 1]

Build max-heap:
  Start from index 1 (last non-leaf for n=5)
  Sift down index 1: children are index 3 (5) and 4 (1), max child is 5 > 10? No.
  Sift down index 0: children are index 1 (10) and 2 (3), max child is 10 > 4? Yes.
    swap arr[0] and arr[1] → [10, 4, 3, 5, 1]
    continue sifting down index 1: children are index 3 (5) and 4 (1), 5 > 4? Yes.
    swap arr[1] and arr[3] → [10, 5, 3, 4, 1]
  Max-heap: [10, 5, 3, 4, 1]

Extract max (n-1 times):
  Swap arr[0] with arr[4]: [1, 5, 3, 4, | 10], sift down → [5, 4, 3, 1, | 10]
  Swap arr[0] with arr[3]: [1, 4, 3, | 5, 10], sift down → [4, 1, 3, | 5, 10]
  Swap arr[0] with arr[2]: [3, 1, | 4, 5, 10], sift down → [3, 1, | 4, 5, 10]
  Swap arr[0] with arr[1]: [1, | 3, 4, 5, 10] ← done

Output: [1, 3, 4, 5, 10]
```

### Example 2
```
Input:  [5, 3, 1, 4, 2]
Output: [1, 2, 3, 4, 5]
```

## Constraints
- `0 <= arr.length <= 10^4`
- `-10^6 <= arr[i] <= 10^6`
- In-place, ascending, O(1) extra space.

## Hints

<details>
<summary>Hint 1 — the siftDown function</summary>

`siftDown(arr, i, heapSize)` — push element at index `i` down until the heap property is restored:

```js
function siftDown(arr, i, heapSize) {
  let largest = i;
  const left  = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < heapSize && arr[left] > arr[largest])   largest = left;
  if (right < heapSize && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    siftDown(arr, largest, heapSize);
  }
}
```
</details>

<details>
<summary>Hint 2 — building the heap</summary>

Start from the last non-leaf node and go backwards:

```js
const n = arr.length;
for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
  siftDown(arr, i, n);
}
```

This is O(n) — not O(n log n) as it might seem. The proof uses the fact that most nodes are near the leaves and need very little sifting.
</details>

<details>
<summary>Hint 3 — extracting elements</summary>

```js
for (let heapSize = n - 1; heapSize > 0; heapSize--) {
  [arr[0], arr[heapSize]] = [arr[heapSize], arr[0]];  // max to end
  siftDown(arr, 0, heapSize);                          // restore heap
}
```

After this loop, elements are sorted ascending (smallest first) because we always moved the maximum to the end.
</details>

## Write your solution
→ [`../solutions/12-heap-sort.js`](../solutions/12-heap-sort.js)

## Follow-ups
- Heap sort is O(n log n) worst case with O(1) space — better properties than both quicksort (O(n²) worst) and merge sort (O(n) space). Why is it not the default algorithm used in practice?
- What modification would you make to sort in descending order using heap sort? (Hint: use a min-heap instead.)
- Implement `heapSort` using a min-heap to sort in descending order.
