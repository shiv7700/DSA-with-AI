# Q7 — Bubble Sort

**Difficulty:** Easy (Implement from scratch)
**Pattern:** In-place comparison sort
**Expected:** O(n²) time average · O(n) best · O(1) space

## Problem

Implement **Bubble Sort** from scratch.

Bubble sort works by making repeated passes through the array. On each pass, it compares every pair of adjacent elements and swaps them if they are in the wrong order. The largest unsorted element "bubbles" to the end on each pass.

**Rules:**
1. Sort the input array **in place** (modify the original array, return it).
2. Sort in **ascending** order.
3. Include the **early-exit optimization**: if a full pass completes with zero swaps, the array is already sorted — stop immediately. This makes the best case O(n) instead of O(n²).
4. Do **not** use JavaScript's built-in `.sort()`.

**Properties your implementation must have:**
- **Stable**: yes (never swap equal elements)
- **In-place**: yes (O(1) extra space)
- **Time**: O(n²) average, O(n) best, O(n²) worst

## Examples

### Example 1
```
Input:  [5, 3, 1, 4, 2]
Output: [1, 2, 3, 4, 5]
```

### Example 2
```
Input:  [1, 2, 3, 4, 5]   (already sorted)
Output: [1, 2, 3, 4, 5]   (should exit after just one pass)
```

### Example 3
```
Input:  [5, 4, 3, 2, 1]   (reverse sorted — worst case)
Output: [1, 2, 3, 4, 5]
```

### Example 4
```
Input:  [3]
Output: [3]

Input:  []
Output: []

Input:  [2, 2, 2]
Output: [2, 2, 2]
```

## Constraints
- `0 <= arr.length <= 10^4`
- `-10^6 <= arr[i] <= 10^6`
- Sort in ascending order.
- In-place (O(1) extra space beyond the input).

## Hints

<details>
<summary>Hint 1 — the outer loop</summary>

After each full pass, the largest unsorted element has reached its correct position at the end. So on the second pass you don't need to check the last element. On the third pass, you don't need to check the last two. Each pass reduces the range you need to check by one.

```
Pass 1: check indices 0..n-2
Pass 2: check indices 0..n-3
Pass k: check indices 0..n-k-1
```

Your outer loop runs at most n-1 times.
</details>

<details>
<summary>Hint 2 — the inner loop and swap</summary>

Inside the outer loop, walk from index 0 to the current upper bound. At each step:

```js
if (arr[j] > arr[j + 1]) {
  [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];   // swap
  swapped = true;
}
```

Track whether any swap happened this pass with a `swapped` boolean.
</details>

<details>
<summary>Hint 3 — early-exit optimization</summary>

```js
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;   // ← already sorted, no need for more passes
  }
  return arr;
}
```
</details>

## Write your solution
→ [`../solutions/07-bubble-sort.js`](../solutions/07-bubble-sort.js)

## Follow-ups
- What is the total number of comparisons in the worst case for n = 5?
- Cocktail shaker sort (bidirectional bubble sort) makes passes in both directions. What advantage does this have over standard bubble sort?
- Modify your implementation to sort in descending order by changing exactly one character.
