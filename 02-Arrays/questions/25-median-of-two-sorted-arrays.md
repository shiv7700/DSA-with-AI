# Q25 — Median of Two Sorted Arrays

**Difficulty:** Hard (a FAANG favorite)
**Pattern:** Binary search on the partition point
**Expected:** O(log(min(m, n))) time · O(1) space

## Problem

You are given two **sorted** arrays, `nums1` (length `m`) and `nums2` (length `n`). Return the **median** of the combined sorted array.

- If the combined length is **odd**, the median is the single middle element.
- If the combined length is **even**, the median is the **average** of the two middle elements.

The constraint: your solution must run in **O(log(min(m, n)))**. The straightforward "merge them, then pick the middle" runs in O(m + n) and is **not** acceptable.

## Examples

### Example 1
```
Input:  nums1 = [1, 3],  nums2 = [2]
Output: 2.0
```
Combined sorted: `[1, 2, 3]`. Middle is 2.

### Example 2
```
Input:  nums1 = [1, 2],  nums2 = [3, 4]
Output: 2.5
```
Combined sorted: `[1, 2, 3, 4]`. The two middle values are 2 and 3. Average: 2.5.

### Example 3 (one empty)
```
Input:  nums1 = [],  nums2 = [1]
Output: 1.0
```

### Example 4
```
Input:  nums1 = [1, 3, 8, 9, 15],  nums2 = [7, 11, 18, 19, 21, 25]
Output: 11.0
```

## Constraints
- `0 <= m, n <= 1000`, with `m + n >= 1`.
- Both inputs are sorted in ascending order.
- Must achieve O(log(min(m, n))).

## Hints

<details>
<summary>Hint 1 — the easy O(m + n) solution (for warm-up)</summary>

Merge the two arrays with two pointers, then return the middle element(s). Simple — but doesn't meet the asymptotic bound.
</details>

<details>
<summary>Hint 2 — partition-based approach</summary>

Make `nums1` the shorter array (so binary search runs on the smaller dimension). Binary-search a **partition point** `i` in `nums1` between 0 and `m`. Set `j = ((m + n + 1) / 2) - i` so that the "left half" of the combined sorted array contains exactly `(m + n + 1) / 2` elements.

Define:
- `L1 = nums1[i - 1]`,  `R1 = nums1[i]`
- `L2 = nums2[j - 1]`,  `R2 = nums2[j]`

If `L1 <= R2` and `L2 <= R1`, you've found the correct partition. The median depends on `max(L1, L2)` and `min(R1, R2)`.

If `L1 > R2`, you partitioned too far right in `nums1` — move `i` left.
If `L2 > R1`, you partitioned too far left in `nums1` — move `i` right.
</details>

<details>
<summary>Hint 3 — boundary sentinels</summary>

When `i = 0` (nothing taken from `nums1` for the left half), set `L1 = -Infinity`. When `i = m`, set `R1 = +Infinity`. Same idea for `j` and `nums2`. This keeps the comparisons valid at the edges.
</details>

## Write your solution
→ [`../solutions/25-median-of-two-sorted-arrays.js`](../solutions/25-median-of-two-sorted-arrays.js)

## Follow-ups
- **Median of K sorted arrays.**
- **K-th smallest in two sorted arrays** — a generalization of the partition technique.
