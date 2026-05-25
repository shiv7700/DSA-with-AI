# Q6 — Kth Smallest Element Using a Heap

**Difficulty:** Easy
**Pattern:** Max-heap of size K
**Expected:** O(n log k) time · O(k) space

## Problem

Given an unsorted array of integers `nums` and an integer `k`, return the **k-th smallest** element in the array.

Note: "k-th smallest" means if the array were sorted in ascending order, the element at index `k-1` (1-indexed).

> **Why use a heap here?** You could sort the array in O(n log n) and return `nums[k-1]`. That works, but the heap approach uses only O(k) space (not O(n)), which matters when the array is very large but k is small. You'll see this pattern constantly in interview problems.

## Examples

### Example 1
```
Input:  nums = [3, 2, 1, 5, 6, 4],  k = 2
Output: 2
```
Sorted: [1, 2, 3, 4, 5, 6]. The 2nd smallest is 2.

### Example 2
```
Input:  nums = [3, 2, 3, 1, 2, 4, 5, 5, 6],  k = 4
Output: 3
```
Sorted: [1, 2, 2, 3, 3, 4, 5, 5, 6]. The 4th smallest is 3.

### Example 3
```
Input:  nums = [1],  k = 1
Output: 1
```

## Constraints
- `1 <= k <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — which kind of heap?</summary>

Use a **max-heap of size k**.

The root of this max-heap will always be the **largest element in our current top-k-smallest candidates**. When we see a new element smaller than the root, we kick the root out and add the new element.

After processing all elements, the root of the max-heap IS the k-th smallest.
</details>

<details>
<summary>Hint 2 — the algorithm</summary>

```
maxHeap = new MaxHeap (size limited to k)

For each num in nums:
  If heap.size() < k:
    heap.push(num)
  Else if num < heap.peek():
    heap.pop()
    heap.push(num)

Return heap.peek()  ← this is the k-th smallest
```

After processing all elements, the heap holds the k smallest values. The largest of those (the root) is the k-th smallest overall.
</details>

<details>
<summary>Hint 3 — simulating MaxHeap without a class</summary>

If you don't have your MaxHeap class yet (or you want a quick approach):

You can simulate a max-heap using your MinHeap by **negating all values**: push `-num`, and the root will be the most-negative (most-negative = originally largest). Pop returns the most-negative, negate to get the original max.

Or just sort: `nums.sort((a, b) => a - b); return nums[k - 1];` — O(n log n), fine for the given constraints.
</details>

## Write your solution
→ [`../solutions/06-kth-smallest.js`](../solutions/06-kth-smallest.js)

## Follow-ups
- How would you find the k-th **largest** instead? (See Q8.)
- If `k = 1`, what's the simplest possible approach? (Single pass minimum.)
- Can you do it in O(n) on average with QuickSelect? (Different topic, but worth knowing.)
