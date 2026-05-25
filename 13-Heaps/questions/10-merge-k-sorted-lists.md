# Q10 — Merge K Sorted Lists

**Difficulty:** Hard
**Pattern:** Min-heap tracking (value, list index, element index)
**Expected:** O(n log k) time · O(k) space

## Problem

You are given an array of `k` linked lists, where each linked list is sorted in ascending order. Merge all the linked lists into one sorted linked list and return its head.

For this JavaScript implementation, represent each linked list as a sorted array. Return the merged result as a single sorted array.

## Examples

### Example 1
```
Input:  lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
Output: [1, 1, 2, 3, 4, 4, 5, 6]
```

### Example 2
```
Input:  lists = []
Output: []
```

### Example 3
```
Input:  lists = [[]]
Output: []
```

### Example 4
```
Input:  lists = [[1], [0]]
Output: [0, 1]
```

## Constraints
- `0 <= k <= 10^4` (number of lists)
- `0 <= lists[i].length <= 500`
- `-10^4 <= lists[i][j] <= 10^4`
- Each list is sorted in non-decreasing order.

## Hints

<details>
<summary>Hint 1 — why not just concatenate and sort?</summary>

You could flatten all arrays and sort: O(n log n) total, where n is the total number of elements. This works but ignores the sorted structure of the input.

The heap approach takes advantage of the sorted property to achieve O(n log k) — replacing the `n` factor in the sort with `k`. When k << n (e.g. 10 lists of 10,000 elements each), this is far better.
</details>

<details>
<summary>Hint 2 — seed the heap with the first element from each list</summary>

Initialize a min-heap with the first element from each non-empty list, along with metadata to track which list and which index it came from:

```
heap = min-heap by value
For each list i:
  if lists[i].length > 0:
    push { val: lists[i][0], listIdx: i, elemIdx: 0 }
```

Each pop gives you the globally smallest remaining element. After popping from list `i` at index `j`, push the next element `lists[i][j+1]` if it exists.
</details>

<details>
<summary>Hint 3 — the full loop</summary>

```
result = []
while heap is not empty:
  { val, listIdx, elemIdx } = heap.pop()
  result.push(val)
  nextIdx = elemIdx + 1
  if nextIdx < lists[listIdx].length:
    heap.push({ val: lists[listIdx][nextIdx], listIdx, elemIdx: nextIdx })
return result
```

The heap size stays at most `k` throughout, so each pop/push is O(log k). Total elements = n, so total time = O(n log k).
</details>

## Write your solution
→ [`../solutions/10-merge-k-sorted-lists.js`](../solutions/10-merge-k-sorted-lists.js)

## Follow-ups
- **Merge K sorted arrays** (this problem, just with arrays instead of linked lists).
- What if the lists were linked lists (actual `ListNode` objects)? How would the solution change?
- Can you solve merge-2-sorted-lists without a heap? (Two-pointer approach — O(n+m) time.)
