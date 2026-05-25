# Q9 — Insertion Sort

**Difficulty:** Easy (Implement from scratch)
**Pattern:** In-place comparison sort
**Expected:** O(n²) average · O(n) best · O(1) space

## Problem

Implement **Insertion Sort** from scratch.

Think of how you sort a hand of playing cards. You pick up one card at a time. Each new card you insert into its correct position among the cards already in your hand by sliding it left past any larger cards.

Insertion sort does exactly this on an array. It maintains a growing sorted region on the left. For each new element, it shifts all larger elements one position to the right to make room, then drops the new element into its correct spot.

**Rules:**
1. Sort the input array **in place**.
2. Sort in **ascending** order.
3. Do **not** use JavaScript's built-in `.sort()`.

**Properties:**
- **Stable**: Yes (equal elements are never shifted past each other — we only shift when strictly greater)
- **In-place**: Yes (O(1) extra space)
- **Time**: O(n) best (already sorted), O(n²) average, O(n²) worst (reverse sorted)
- **Adaptive**: faster on nearly-sorted data than any other O(n²) algorithm

## Examples

### Example 1
```
Input:  [5, 3, 1, 4, 2]

[5 | 3, 1, 4, 2]   start: sorted region is just [5]
  take 3: 3 < 5, shift 5 right, insert 3
[3, 5 | 1, 4, 2]

  take 1: 1 < 5, shift; 1 < 3, shift; insert 1
[1, 3, 5 | 4, 2]

  take 4: 4 < 5, shift; 4 > 3, stop; insert 4
[1, 3, 4, 5 | 2]

  take 2: 2 < 5, shift; 2 < 4, shift; 2 < 3, shift; 2 > 1, stop; insert 2
[1, 2, 3, 4, 5]

Output: [1, 2, 3, 4, 5]
```

### Example 2
```
Input:  [1, 2, 3, 4, 5]   (already sorted)
Output: [1, 2, 3, 4, 5]   (inner loop never executes → O(n) total)
```

### Example 3
```
Input:  [4, 2, 2, 1]   (with duplicates)
Output: [1, 2, 2, 4]   (equal elements stay in original order → stable)
```

## Constraints
- `0 <= arr.length <= 10^4`
- `-10^6 <= arr[i] <= 10^6`
- Sort in ascending order.
- In-place (O(1) extra space).

## Hints

<details>
<summary>Hint 1 — outer loop structure</summary>

The outer loop picks each new element to insert, starting from index 1 (index 0 is trivially "sorted" on its own):

```js
for (let i = 1; i < arr.length; i++) {
  const current = arr[i];   // the element to insert
  // now find its position in arr[0..i-1]
}
```
</details>

<details>
<summary>Hint 2 — the inner loop (shift and insert)</summary>

Walk backwards from `i - 1`, shifting elements right while they are greater than `current`:

```js
let j = i - 1;
while (j >= 0 && arr[j] > current) {
  arr[j + 1] = arr[j];   // shift right
  j--;
}
arr[j + 1] = current;    // insert
```

Note: `arr[j] > current` (strictly greater) ensures stability — equal elements are not shifted.
</details>

<details>
<summary>Hint 3 — tracing through Example 1 manually</summary>

```
i=1, current=3: compare arr[0]=5 > 3, shift → arr=[5,5,1,4,2], j=-1, insert at 0 → [3,5,1,4,2]
i=2, current=1: compare arr[1]=5 > 1, shift; arr[0]=3 > 1, shift → j=-1, insert at 0 → [1,3,5,4,2]
i=3, current=4: compare arr[2]=5 > 4, shift; arr[1]=3 < 4, stop → insert at 2 → [1,3,4,5,2]
i=4, current=2: compare arr[3]=5>2, arr[2]=4>2, arr[1]=3>2, arr[0]=1 < 2 → insert at 1 → [1,2,3,4,5]
```
</details>

## Write your solution
→ [`../solutions/09-insertion-sort.js`](../solutions/09-insertion-sort.js)

## Follow-ups
- What is the exact number of comparisons insertion sort makes on an already-sorted array of n elements?
- What is the exact number of comparisons on a reverse-sorted array?
- Binary insertion sort uses binary search to find the insertion position (reducing comparisons to O(n log n)) but still needs O(n²) shifts. When would this variant be useful?
