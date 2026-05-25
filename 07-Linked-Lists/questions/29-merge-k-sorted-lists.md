# Q29 — Merge k Sorted Lists

**Difficulty:** Hard
**Pattern:** Min-heap (Priority Queue)
**Expected:** O(N log k) time · O(k) space   where N = total nodes, k = number of lists

## Problem

You are given an array `lists` of `k` linked list heads. Each list is sorted in non-decreasing order. Merge all lists into one sorted linked list and return its head.

## Examples

### Example 1
```
Input:
  lists = [
    1 -> 4 -> 5 -> null,
    1 -> 3 -> 4 -> null,
    2 -> 6 -> null
  ]
Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6 -> null
```

### Example 2
```
Input:  lists = []
Output: null
```

### Example 3
```
Input:  lists = [null]
Output: null
```

## Constraints
- `0 <= k <= 10^4`
- `0 <= total nodes <= 10^4`
- `-10^4 <= Node.val <= 10^4`
- Each list is sorted in non-decreasing order.

## Hints

<details>
<summary>Hint 1 — brute force (understand the problem first)</summary>

Collect all values into an array, sort it, build a new list. This is O(N log N) and O(N) space. It works but ignores the sorted property of the lists.
</details>

<details>
<summary>Hint 2 — reduce to "merge two sorted lists" (divide and conquer)</summary>

Repeatedly merge pairs of lists. Each round halves the number of lists. With k lists, there are log k rounds, each processing all N nodes. Total: O(N log k). This is a valid interview approach and doesn't require a heap.
</details>

<details>
<summary>Hint 3 — min-heap approach (the elegant O(N log k) solution)</summary>

JavaScript has no built-in min-heap, but you can simulate one with a sorted array or implement a simple binary heap.

1. Insert the head of every list into a min-heap keyed by node value.
2. Pop the smallest node, add it to the result.
3. If that node has a `next`, push `next` into the heap.
4. Repeat until the heap is empty.

The heap always has at most k elements, so each push/pop is O(log k). With N total nodes, the total time is O(N log k).
</details>

<details>
<summary>Hint 4 — JavaScript min-heap workaround</summary>

For interviews, you can use a sorted array as a poor-man's heap (O(k) per insertion but simpler code) or implement a proper min-heap. A common interview trick is to sort the initial `lists` array and use the divide-and-conquer approach instead.
</details>

## Write your solution
→ [`../solutions/29-merge-k-sorted-lists.js`](../solutions/29-merge-k-sorted-lists.js)

## Follow-ups
- Why is O(N log k) better than O(N log N)? For k = 2, how does it compare?
- Implement the divide-and-conquer version alongside the heap version and compare code complexity.
