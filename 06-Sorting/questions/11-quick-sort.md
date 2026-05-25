# Q11 — Quick Sort

**Difficulty:** Medium (Implement from scratch)
**Pattern:** Divide and conquer, partition
**Expected:** O(n log n) average · O(n²) worst · O(log n) space (stack)

## Problem

Implement **Quick Sort** from scratch.

Quick sort picks a **pivot** element, then **partitions** the array so all elements less than the pivot end up to its left and all greater elements to its right. The pivot is now in its final sorted position. Recurse on the left and right partitions.

You must implement the **Lomuto partition scheme** (details below) as your primary solution. The **Hoare scheme** is a bonus follow-up.

**Lomuto partition scheme:**
- Pick the last element as the pivot.
- Use a pointer `i` to track the boundary of the "less-than" region (starts at `low - 1`).
- Walk pointer `j` from `low` to `high - 1`. Whenever `arr[j] <= pivot`, increment `i` and swap `arr[i]` with `arr[j]`.
- After the scan, place the pivot in its final position by swapping `arr[i + 1]` with `arr[high]`.
- Return `i + 1` (the pivot's final index).

**Rules:**
1. Sort **in place**.
2. Sort in **ascending** order.
3. Do **not** use JavaScript's built-in `.sort()`.

**Properties:**
- **Stable**: No
- **In-place**: Yes (O(log n) extra for the recursion stack on average)
- **Time**: O(n log n) average, O(n²) worst case (avoidable with random pivot)

## Examples

### Example 1
```
Input:  [3, 6, 8, 10, 1, 2, 1]
Output: [1, 1, 2, 3, 6, 8, 10]
```

### Example 2
```
Input:  [5, 3, 1, 4, 2]
Pivot = 2 (last element)
Partition:
  i=-1, j=0: arr[j]=5 > 2, skip
  j=1: arr[j]=3 > 2, skip
  j=2: arr[j]=1 <= 2, i=0, swap arr[0]↔arr[2] → [1,3,5,4,2]
  j=3: arr[j]=4 > 2, skip
  place pivot: swap arr[i+1]=arr[1] with arr[4] → [1,2,5,4,3]
  pivot at index 1 (its final position!)
  recurse on [1] and [5,4,3]
Output: [1, 2, 3, 4, 5]
```

### Example 3
```
Input:  [1]   → [1]
Input:  []    → []
```

## Constraints
- `0 <= arr.length <= 10^4`
- `-10^6 <= arr[i] <= 10^6`
- In-place, ascending order.

## Hints

<details>
<summary>Hint 1 — function signature</summary>

Quick sort is naturally recursive, but it doesn't return a new array — it modifies in place. You'll need a helper that takes the array and a range `[low, high]`:

```js
function quickSort(arr) {
  sort(arr, 0, arr.length - 1);
  return arr;
}

function sort(arr, low, high) {
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    sort(arr, low, pivotIdx - 1);    // sort left of pivot
    sort(arr, pivotIdx + 1, high);   // sort right of pivot
  }
}
```
</details>

<details>
<summary>Hint 2 — Lomuto partition</summary>

```js
function partition(arr, low, high) {
  const pivot = arr[high];   // last element as pivot
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;   // pivot's final index
}
```
</details>

<details>
<summary>Hint 3 — the worst case and how to avoid it</summary>

If the pivot is always the smallest or largest element, one partition has n-1 elements and the other has 0. Recursion depth reaches n, giving O(n²) time and O(n) stack space.

This happens on already-sorted or reverse-sorted input with the "last element" pivot strategy.

**Fix:** pick a random pivot.

```js
// At the start of partition:
const randIdx = low + Math.floor(Math.random() * (high - low + 1));
[arr[randIdx], arr[high]] = [arr[high], arr[randIdx]];  // swap random to end
// then proceed with last-element pivot as usual
```
</details>

<details>
<summary>Hint 4 — Hoare partition scheme (bonus)</summary>

Hoare's original scheme uses two pointers that converge from both ends. It is more efficient than Lomuto (fewer swaps) but slightly trickier:

```
low pointer moves right, skipping elements < pivot
high pointer moves left, skipping elements > pivot
when both stop, swap them
repeat until pointers cross
```

The pivot is not necessarily placed in its final position after one partition — the recursion handles it. Hoare's scheme does roughly 3x fewer swaps than Lomuto on random data.
</details>

## Write your solution
→ [`../solutions/11-quick-sort.js`](../solutions/11-quick-sort.js)

## Follow-ups
- Implement the random pivot optimization and verify it doesn't degrade on sorted input.
- Implement Hoare's partition scheme and compare the number of swaps to Lomuto on the same input.
- "Three-way partition" (Dutch National Flag variant) makes quicksort O(n) on arrays with many duplicate elements. How does it work?
