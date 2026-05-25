# Q19 — Median of Two Sorted Arrays

**Difficulty:** Hard
**Pattern:** Binary search — partition two arrays simultaneously
**Expected:** O(log(min(m, n))) time · O(1) space

## Problem

Given two sorted arrays `nums1` and `nums2` of sizes `m` and `n` respectively, return the **median** of the two sorted arrays combined.

The overall time complexity must be **O(log(min(m, n)))**.

> **This is genuinely hard.** The naive approach (merge and find middle) is O(m + n). The clever binary search approach partitions both arrays simultaneously to find the exact split point. It's one of those algorithms that takes a few readings to fully understand — don't give up if it doesn't click immediately.

## Examples

### Example 1
```
Input:  nums1 = [1, 3], nums2 = [2]
Output: 2.0
```
Combined sorted: [1, 2, 3]. Median = 2.

### Example 2
```
Input:  nums1 = [1, 2], nums2 = [3, 4]
Output: 2.5
```
Combined sorted: [1, 2, 3, 4]. Median = (2 + 3) / 2 = 2.5.

### Example 3
```
Input:  nums1 = [0, 0], nums2 = [0, 0]
Output: 0.0
```

### Example 4 (one array is empty)
```
Input:  nums1 = [], nums2 = [1]
Output: 1.0
```

### Example 5
```
Input:  nums1 = [2], nums2 = []
Output: 2.0
```

## Constraints
- `nums1.length + nums2.length >= 1`
- `0 <= m, n <= 1000`
- `-10^6 <= nums1[i], nums2[i] <= 10^6`

## Hints

<details>
<summary>Hint 1 — think about partitioning</summary>

If you could split both arrays into a "left half" and "right half" such that:
- The combined left halves contain the smaller half of all elements.
- The combined right halves contain the larger half.
- `max(left halves) <= min(right halves)`

Then the median is either `max(left halves)` (odd total) or `(max(left halves) + min(right halves)) / 2` (even total).

Binary search on where to split the smaller array (`nums1`). Once you pick how many elements from `nums1` go to the left partition, the number from `nums2` is determined (to balance the total).
</details>

<details>
<summary>Hint 2 — the partition condition</summary>

Let `half = (m + n + 1) / 2` (total left partition size).
Let `i` = number of elements from `nums1` in the left partition (binary search on `i`).
Then `j = half - i` elements come from `nums2`.

The partition is valid when:
- `nums1[i - 1] <= nums2[j]` (left of nums1 ≤ right of nums2)
- `nums2[j - 1] <= nums1[i]` (left of nums2 ≤ right of nums1)

If `nums1[i - 1] > nums2[j]`: `i` is too large → `right = i - 1`.
If `nums2[j - 1] > nums1[i]`: `i` is too small → `left = i + 1`.
</details>

<details>
<summary>Hint 3 — edge cases</summary>

Handle the case where `i = 0` (left of nums1 is -Infinity) or `i = m` (right of nums1 is +Infinity), and similarly for `j`. Use `Number.NEGATIVE_INFINITY` and `Number.POSITIVE_INFINITY` as sentinels.

Always binary search on the **smaller** array to minimize iterations.
</details>

## Write your solution
→ [`../solutions/19-median-two-sorted-arrays.js`](../solutions/19-median-two-sorted-arrays.js)

## Follow-ups
- **LeetCode 4** — this exact problem (ranked "Hard" there too).
- Generalize to "find the k-th smallest element across two sorted arrays."
- Why do we binary search on the shorter array? (To keep `j` non-negative — if `nums1` is longer, picking too many from `nums1` could make `j` negative.)
