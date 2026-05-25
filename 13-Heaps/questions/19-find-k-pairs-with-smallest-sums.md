# Q19 — Find K Pairs with Smallest Sums

**Difficulty:** Medium
**Pattern:** Min-heap with lazy expansion from sorted matrix
**Expected:** O(k log k) time · O(k) space

## Problem

You are given two integer arrays `nums1` and `nums2`, both sorted in ascending order, and an integer `k`.

Define a pair `(u, v)` as one element from `nums1` and one from `nums2`. Return the `k` pairs `(u1, v1), (u2, v2), ...` with the smallest sums `u + v`.

## Examples

### Example 1
```
Input:  nums1 = [1, 7, 11],  nums2 = [2, 4, 6],  k = 3
Output: [[1, 2], [1, 4], [1, 6]]
```
All pairs sorted by sum: [1,2]=3, [1,4]=5, [1,6]=7, [7,2]=9, [7,4]=11, ...

### Example 2
```
Input:  nums1 = [1, 1, 2],  nums2 = [1, 2, 3],  k = 2
Output: [[1, 1], [1, 1]]
```
Pairs with sum 2: [1,1] and [1,1]. Both have sum 2.

### Example 3
```
Input:  nums1 = [1, 2],  nums2 = [3],  k = 3
Output: [[1, 3], [2, 3]]
```
Only 2 valid pairs exist.

## Constraints
- `1 <= nums1.length, nums2.length <= 10^5`
- `-10^9 <= nums1[i], nums2[j] <= 10^9`
- `nums1` and `nums2` are sorted in non-decreasing order.
- `1 <= k <= 10^4`

## Hints

<details>
<summary>Hint 1 — think of it as a sorted matrix</summary>

Imagine a matrix where `matrix[i][j] = nums1[i] + nums2[j]`. Each row is sorted (because `nums2` is sorted). Each column is sorted (because `nums1` is sorted).

You need the k smallest sums from this matrix. This is the same problem as "merge k sorted arrays" — each row is one sorted array.
</details>

<details>
<summary>Hint 2 — seed the heap with only column 0</summary>

You don't need to push all `m × n` pairs. Start with only the first column: push `(nums1[i] + nums2[0], i, 0)` for each `i` in `nums1`.

When you pop `(sum, i, j)`, the next candidate from the same row is `(nums1[i] + nums2[j+1], i, j+1)`. Push that if `j+1 < nums2.length`.

This way the heap grows at most to size `k` (or `m`, whichever is smaller).
</details>

<details>
<summary>Hint 3 — avoid pushing redundant states</summary>

Actually, you don't even need to seed all rows. Seed only row 0 up front: push `(nums1[0] + nums2[j], 0, j)` for all `j` — no, that's the column approach. The simpler approach:

Seed with `(nums1[i] + nums2[0], i, 0)` for `i = 0 .. min(k, m)-1`. Then expand column indices as you pop.
</details>

## Write your solution
→ [`../solutions/19-find-k-pairs-with-smallest-sums.js`](../solutions/19-find-k-pairs-with-smallest-sums.js)

## Follow-ups
- **Merge K Sorted Lists** (Q10) — each row of the matrix is a sorted list to merge.
- What if `nums1` and `nums2` were unsorted? Would the heap approach still work?
- **K-th Smallest Element in a Sorted Matrix** (Q20) — nearly identical technique.
