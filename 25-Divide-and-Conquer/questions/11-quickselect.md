# Q11 — Quickselect — Kth Smallest Element

**Difficulty:** Medium
**Pattern:** Divide and Conquer — partition and recurse on one side only
**Expected:** O(n) average time · O(log n) average space

## Problem

Given an unsorted array of integers `nums` and an integer `k`, return the `k`th **smallest** element in the array (1-indexed: k=1 means the smallest, k=2 means the second smallest, etc.).

You must solve this **without fully sorting** the array. The expected time complexity is O(n).

## Examples

### Example 1
```
Input:  nums = [3, 2, 1, 5, 6, 4],  k = 2
Output: 2
```

### Example 2
```
Input:  nums = [3, 2, 3, 1, 2, 4, 5, 5, 6],  k = 4
Output: 3
```

### Example 3 (k = 1)
```
Input:  nums = [7, 10, 4, 3, 20, 15],  k = 3
Output: 7
```

## Constraints

- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- Expected time: O(n) average, O(n²) worst case.

## Hints

<details>
<summary>Hint 1 — the key insight</summary>

After you partition around a pivot (placing pivot at index `p`):

- All elements at indices `< p` are smaller than the pivot.
- All elements at indices `> p` are larger than the pivot.
- The pivot itself is the `(p+1)`th smallest element (1-indexed).

So:
- If `p + 1 === k`: **the pivot is your answer**.
- If `p + 1 > k`: the kth smallest is in the left partition.
- If `p + 1 < k`: the kth smallest is in the right partition.

You only recurse on **one** side — that's why this is O(n) average instead of O(n log n).
</details>

<details>
<summary>Hint 2 — recursion tree comparison</summary>

```
Quicksort:          Quickselect:
     n                   n
   /   \               /
 n/2   n/2           n/2          ← only recurse LEFT (if target is there)
 / \   / \          /
n/4 n/4 ...       n/4
                  ...

Quicksort total: n + n + n + ... (log n levels) = n log n
Quickselect total: n + n/2 + n/4 + ... = 2n = O(n)
```
</details>

<details>
<summary>Hint 3 — code outline</summary>

```js
function quickSelect(nums, k) {
  // Partition nums[low..high] and return the pivot's final index
  // If pivotIndex + 1 === k, return nums[pivotIndex]
  // Else recurse on the appropriate half
}
```

Use a random pivot (swap a random element into the last position before partitioning) to avoid O(n²) worst case.
</details>

## Write your solution

→ [`../solutions/11-quickselect.js`](../solutions/11-quickselect.js)

## Follow-ups

- What is the **worst-case** scenario for quickselect? When does it degrade to O(n²)?
- **Median of Medians** is a deterministic algorithm that guarantees O(n) worst case for selection. Look it up — how does it pick a "good" pivot without randomness?
- Quickselect can also find the kth **largest** element. How would you adapt it?
- This is the core of the "Top K Elements" pattern — also solvable with a max-heap of size k in O(n log k). When would you prefer the heap approach?
