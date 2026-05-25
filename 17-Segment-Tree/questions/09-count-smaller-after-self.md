# Q9 — Count of Smaller Numbers After Self

**Difficulty:** Medium
**Pattern:** Segment Tree with coordinate compression — or merge sort
**Expected:** O(n log n) time · O(n) space

## Problem

Given an integer array `nums`, return a new array `counts` where `counts[i]` is the number of elements to the **right** of `nums[i]` that are **strictly smaller** than `nums[i]`.

## Examples

### Example 1

```
Input:  [5, 2, 6, 1]
Output: [2, 1, 1, 0]
```
- `nums[0] = 5`: elements to its right that are smaller: `2, 1` → count = 2
- `nums[1] = 2`: elements to its right that are smaller: `1` → count = 1
- `nums[2] = 6`: elements to its right that are smaller: `1` → count = 1
- `nums[3] = 1`: nothing to its right → count = 0

### Example 2

```
Input:  [1]
Output: [0]
```

### Example 3

```
Input:  [-1, -1]
Output: [0, 0]
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — the brute force</summary>

For each `i`, scan `j = i+1..n-1` and count values smaller than `nums[i]`. O(n²). Too slow.
</details>

<details>
<summary>Hint 2 — segment tree approach</summary>

Process the array **right to left**. Maintain a segment tree over value-space (all possible values of `nums`). For each element `nums[i]`:

1. **Query:** count of elements already inserted (i.e., to the right of `i`) with value in `[-10^4, nums[i]-1]`.
2. **Update:** mark `nums[i]` as "inserted" (increment count at position `nums[i]` in the tree).

Since values range from `-10^4` to `10^4` (total 20001 values), build a frequency segment tree of that size. Or compress coordinates first.
</details>

<details>
<summary>Hint 3 — coordinate compression for general values</summary>

If values could be huge:
1. Collect and sort all unique values.
2. Map each value to its rank `[0..k-1]`.
3. Build a segment tree of size `k`.
4. "Count smaller" becomes "query prefix sum up to rank(nums[i]) - 1".
</details>

<details>
<summary>Hint 4 — merge sort alternative</summary>

This problem is also classically solved with a **modified merge sort** (counting inversions). During the merge step, when you pick an element from the right half, all remaining elements in the left half are greater — add their count to the left elements' results. O(n log n) and no coordinate compression needed.
</details>

## Write your solution

→ [`../solutions/09-count-smaller-after-self.js`](../solutions/09-count-smaller-after-self.js)

## Follow-ups

- **Count of Larger Numbers After Self** — how does your approach change? Just flip the query range.
- **Reverse Pairs** (Q11) — a harder variant where the condition is `nums[i] > 2 * nums[j]`.
