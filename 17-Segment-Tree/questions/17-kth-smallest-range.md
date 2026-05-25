# Q17 — K-th Smallest Number in a Range

**Difficulty:** Medium (advanced)
**Pattern:** Merge Sort Tree (segment tree of sorted arrays) — or Persistent Segment Tree
**Expected:** O(n log n) build · O(log² n) per query · O(n log n) space

## Problem

Given an integer array `nums`, answer multiple offline queries of the form:

- **`kthSmallest(left, right, k)`** — return the k-th smallest value in `nums[left..right]` (1-indexed).

There are no updates — the array is immutable.

## Examples

### Example 1

```
nums = [3, 1, 4, 1, 5, 9, 2, 6]

kthSmallest(0, 4, 1)  →  1    (subarray [3,1,4,1,5], 1st smallest = 1)
kthSmallest(0, 4, 3)  →  3    (subarray [3,1,4,1,5], 3rd smallest = 3)
kthSmallest(2, 7, 2)  →  2    (subarray [4,1,5,9,2,6], 2nd smallest = 2)
kthSmallest(0, 7, 4)  →  3    (all 8 elements, 4th smallest = 3)
```

### Example 2

```
nums = [7, 10, 4, 3, 20, 15]

kthSmallest(0, 5, 3)  →  7
kthSmallest(1, 3, 2)  →  4
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `1 <= k <= right - left + 1`
- Up to `10^4` queries.

## Hints

<details>
<summary>Hint 1 — brute force</summary>

For each query `(l, r, k)`, extract the subarray, sort it, return the k-th element. O(n log n) per query. Too slow for large inputs.
</details>

<details>
<summary>Hint 2 — merge sort tree</summary>

Build a segment tree where each node stores the **sorted** subarray of elements in its range. Each node at depth `d` covers a range of size `n / 2^d`, and stores those elements sorted.

Space: O(n log n) — each element appears in O(log n) nodes.

For a query `(l, r, k)`: binary search on the answer value `x`. For a given `x`, count how many elements in `[l..r]` are ≤ x by querying the O(log n) nodes that cover the range, using binary search at each node to count elements ≤ x. Total per query: O(log² n).
</details>

<details>
<summary>Hint 3 — persistent segment tree (advanced)</summary>

Build a persistent segment tree on compressed values. The j-th version of the tree contains all elements `nums[0..j-1]`. Query version `r+1` minus version `l` gives a frequency tree for `nums[l..r]`. Walk down the tree to find the k-th element in O(log n) per query.
</details>

## Write your solution

→ [`../solutions/17-kth-smallest-range.js`](../solutions/17-kth-smallest-range.js)

## Follow-ups

- Try the merge sort tree approach first — it's more approachable than persistent segment trees.
- What is the persistent segment tree's advantage in space or time over the merge sort tree?
