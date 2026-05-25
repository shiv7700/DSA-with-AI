# Q10 — Quick Sort (both partition schemes)

**Difficulty:** Medium
**Pattern:** Divide and Conquer — partition around pivot, recurse
**Expected:** O(n log n) average time · O(log n) space (call stack)

## Problem

Implement quicksort. Given an array of integers `nums`, sort it **in place** in ascending order.

You must implement **both** partition schemes and be able to explain the trade-off:

1. **Lomuto partition** — uses the last element as the pivot, single forward scan.
2. **Hoare partition** — uses the middle element as pivot, two-pointer scan from both ends.

Rules:
- Sort in place (no returning a new array).
- Use a random pivot to avoid O(n²) worst-case on sorted inputs.
- Time: O(n log n) average. Space: O(log n) average (call stack depth).

## Examples

### Example 1
```
Input:  [10, 7, 8, 9, 1, 5]
Output: [1, 5, 7, 8, 9, 10]  (sorted in place)
```

### Example 2
```
Input:  [3, 2, 1]
Output: [1, 2, 3]
```

### Example 3 (already sorted — without random pivot this is worst case)
```
Input:  [1, 2, 3, 4, 5]
Output: [1, 2, 3, 4, 5]
```

### Example 4 (duplicates)
```
Input:  [3, 3, 3, 1, 2]
Output: [1, 2, 3, 3, 3]
```

## Constraints

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- Average time: O(n log n). Worst case: O(n²) — prevented with random pivot.

## Hints

<details>
<summary>Hint 1 — the partition idea</summary>

Choose a **pivot** value. Rearrange the array so:
- All elements **less than or equal to** the pivot are on its left.
- All elements **greater than** the pivot are on its right.
- The pivot is now in its **final sorted position**.

Then recursively sort left and right portions.

```
Before: [3, 6, 8, 10, 1, 2, 1]   pivot = 3

After:  [1, 2, 1] | 3 | [6, 8, 10]
         ← smaller    ← larger
```
</details>

<details>
<summary>Hint 2 — Lomuto partition (simpler code)</summary>

```js
function lomutoPartition(arr, low, high) {
  // Randomize pivot to avoid worst case
  const r = low + Math.floor(Math.random() * (high - low + 1));
  [arr[r], arr[high]] = [arr[high], arr[r]];

  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
```

After this, `arr[i+1]` is the pivot in its final position.
</details>

<details>
<summary>Hint 3 — Hoare partition (fewer swaps)</summary>

```js
function hoarePartition(arr, low, high) {
  const pivot = arr[Math.floor((low + high) / 2)];
  let i = low - 1;
  let j = high + 1;

  while (true) {
    do { i++; } while (arr[i] < pivot);
    do { j--; } while (arr[j] > pivot);
    if (i >= j) return j;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
```

Note: Hoare returns `j`, which is **not** necessarily the final position of the pivot. You recurse on `[low, j]` and `[j+1, high]`.
</details>

<details>
<summary>Hint 4 — the main quickSort function</summary>

```js
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const p = lomutoPartition(arr, low, high);   // or hoarePartition
    quickSort(arr, low, p - 1);
    quickSort(arr, p + 1, high);
  }
}
```

(For Hoare, recurse on `[low, p]` and `[p+1, high]` — the split point is different.)
</details>

## Write your solution

→ [`../solutions/10-quick-sort.js`](../solutions/10-quick-sort.js)

## Follow-ups

- Implement the **three-way partition** (Dutch National Flag) for arrays with many duplicates. Instead of two regions, you maintain three: `< pivot`, `= pivot`, `> pivot`. This makes quicksort O(n log n) even on inputs like `[3,3,3,3,3]`.
- What is the **worst-case** input for Lomuto with a fixed last-element pivot? How does random pivot selection defend against it?
- Why is quicksort generally **faster in practice** than merge sort, even though both are O(n log n)?
