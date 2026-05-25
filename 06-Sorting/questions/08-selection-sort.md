# Q8 — Selection Sort

**Difficulty:** Easy (Implement from scratch)
**Pattern:** In-place comparison sort
**Expected:** O(n²) time all cases · O(1) space

## Problem

Implement **Selection Sort** from scratch.

Selection sort maintains a sorted left portion and an unsorted right portion. On each iteration, it **selects the minimum element** from the unsorted portion and swaps it to the front of the unsorted portion.

Think of organizing books on a shelf: scan all the books for the shortest title, move it to position 1. Then scan the remaining books for the shortest, move it to position 2. Repeat until the shelf is organized.

**Rules:**
1. Sort the input array **in place**.
2. Sort in **ascending** order.
3. Do **not** use JavaScript's built-in `.sort()`.

**Properties:**
- **Stable**: No (swapping the minimum past equal elements can break order)
- **In-place**: Yes (O(1) extra space)
- **Time**: O(n²) in all cases (best, average, worst — no early exit)
- **Swaps**: At most n-1 swaps total (useful when writes are expensive)

## Examples

### Example 1
```
Input:  [5, 3, 1, 4, 2]

Pass 1: find min (1) in [5,3,1,4,2], swap with index 0 → [1, 3, 5, 4, 2]
Pass 2: find min (2) in [3,5,4,2], swap with index 1 → [1, 2, 5, 4, 3]
Pass 3: find min (3) in [5,4,3], swap with index 2 → [1, 2, 3, 4, 5]
Pass 4: find min (4) in [4,5], already at front → [1, 2, 3, 4, 5]

Output: [1, 2, 3, 4, 5]
```

### Example 2
```
Input:  [1, 2, 3, 4, 5]   (already sorted)
Output: [1, 2, 3, 4, 5]   (still takes O(n²) — no early exit)
```

### Example 3
```
Input:  [42]
Output: [42]

Input:  []
Output: []
```

## Constraints
- `0 <= arr.length <= 10^4`
- `-10^6 <= arr[i] <= 10^6`
- Sort in ascending order.
- In-place (O(1) extra space).

## Hints

<details>
<summary>Hint 1 — structure of the algorithm</summary>

For each starting position `i` from `0` to `n-2`:
1. Find the index of the minimum element in `arr[i..n-1]`.
2. If that index is not `i`, swap `arr[i]` with `arr[minIndex]`.

The outer loop runs n-1 times. The inner "find min" loop runs n-i-1 times. Total: O(n²) comparisons.
</details>

<details>
<summary>Hint 2 — finding the minimum</summary>

```js
let minIndex = i;
for (let j = i + 1; j < n; j++) {
  if (arr[j] < arr[minIndex]) {
    minIndex = j;
  }
}
```

After this inner loop, `minIndex` holds the position of the smallest element in the unsorted portion.
</details>

<details>
<summary>Hint 3 — only swap if necessary</summary>

```js
if (minIndex !== i) {
  [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
}
```

This avoids a no-op swap when the minimum is already in place. It doesn't change the time complexity, but it saves a write.
</details>

## Write your solution
→ [`../solutions/08-selection-sort.js`](../solutions/08-selection-sort.js)

## Follow-ups
- Selection sort always does exactly the same number of **comparisons** regardless of input. Why? Is this an advantage or a disadvantage?
- Selection sort makes at most n-1 swaps. Name a real-world scenario where minimizing swaps (writes) is more important than minimizing comparisons (reads).
- Implement a variant that finds both the minimum and maximum on each pass and places them at both ends simultaneously. How many passes does this take?
