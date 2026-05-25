# Q27 — Merge K Sorted Arrays

**Difficulty:** Hard
**Pattern:** Min-heap (priority queue)
**Expected:** O(N log k) time · O(k) space — where `N` is the total number of elements and `k` is the number of arrays

## Problem

You are given `k` sorted arrays (each individually sorted in ascending order). Merge them into a single sorted array.

A simple but slow approach is to concatenate everything and sort: that's O(N log N). The required solution is **O(N log k)** — much faster when `k` is small relative to `N`.

## Examples

### Example 1
```
Input:  [
  [1, 4, 5],
  [1, 3, 4],
  [2, 6]
]
Output: [1, 1, 2, 3, 4, 4, 5, 6]
```

### Example 2
```
Input:  []
Output: []
```

### Example 3
```
Input:  [[]]
Output: []
```

### Example 4 (different sizes)
```
Input:  [[1, 2], [3], [4, 5, 6]]
Output: [1, 2, 3, 4, 5, 6]
```

## Constraints
- `k == arrays.length`
- `0 <= k <= 10^4`
- `0 <= arrays[i].length`
- The total number of elements is at most `10^4`.
- Each input array is sorted in ascending order.

## Hints

<details>
<summary>Hint 1 — min-heap of heads</summary>

A **min-heap** (priority queue that always pops the smallest) lets you efficiently get the smallest unprocessed value across all `k` arrays.

Initial state: push the **head** of each array into the heap, along with which array it came from and its current index.

Then repeatedly:
1. Pop the smallest `(value, arrayIdx, elementIdx)` from the heap.
2. Append `value` to the result.
3. If there's a next element in that array, push it onto the heap.

Each push/pop is O(log k), and there are N total elements — so O(N log k).
</details>

<details>
<summary>Hint 2 — alternative: divide and conquer</summary>

You can also avoid the heap entirely:
- Pairwise-merge: merge `arrays[0]` with `arrays[1]`, `arrays[2]` with `arrays[3]`, and so on.
- Then merge the results again, pairwise.
- Repeat for `log k` rounds.

Each round processes all N elements in linear time. Total: O(N log k). Same asymptotic, no heap needed.
</details>

<details>
<summary>Hint 3 — JavaScript has no built-in heap</summary>

JavaScript's standard library doesn't include a priority queue. You'll need to write a small `MinHeap` class (you'll learn it properly in topic [`13-Heaps`](../../13-Heaps/), but for this drill you can implement it inline).
</details>

## Write your solution
→ [`../solutions/27-merge-k-sorted-arrays.js`](../solutions/27-merge-k-sorted-arrays.js)

## Follow-ups
- **Merge K Sorted Linked Lists** — same pattern, but you're manipulating node pointers instead of array indexes.
- **Smallest Range Covering Elements from K Lists** — a more advanced extension of the heap-of-heads idea.
