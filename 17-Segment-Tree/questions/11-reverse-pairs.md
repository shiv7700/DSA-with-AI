# Q11 — Reverse Pairs

**Difficulty:** Medium
**Pattern:** Segment Tree with coordinate compression — or merge sort
**Expected:** O(n log n) time · O(n) space

## Problem

Given an integer array `nums`, return the number of **reverse pairs**.

A reverse pair is a pair `(i, j)` where:
- `0 <= i < j < nums.length`
- `nums[i] > 2 * nums[j]`

## Examples

### Example 1

```
Input:  [1, 3, 2, 3, 1]
Output: 2
```
Pairs: `(1, 4)` → `3 > 2*1`, and `(3, 4)` → `3 > 2*1`.

### Example 2

```
Input:  [2, 4, 3, 5, 1]
Output: 3
```
Pairs: `(1,4)`, `(2,4)`, `(3,4)`.

### Example 3

```
Input:  [5, 4, 3, 2, 1]
Output: 4
```

## Constraints

- `1 <= nums.length <= 5 * 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — brute force is O(n²)</summary>

Nested loop: for each `i`, scan all `j > i` and check `nums[i] > 2 * nums[j]`. Too slow.
</details>

<details>
<summary>Hint 2 — merge sort approach</summary>

Use a modified merge sort. When merging left half `L` and right half `R`:
- For each element `R[j]`, count how many elements `L[i]` satisfy `L[i] > 2 * R[j]`.
- Since `L` is already sorted, use binary search (or a two-pointer) to find this count in O(log n).
- Then perform the standard merge (for the sort order).

Key: count the reverse pairs **before** merging, because merging changes the relative order.
</details>

<details>
<summary>Hint 3 — segment tree approach</summary>

Process right to left. Maintain a frequency segment tree over compressed values. For each `nums[i]`:
1. Query: how many values in `(2 * nums[i], +∞)` have already been inserted?
2. Insert `nums[i]` into the tree.

Watch out: `2 * nums[i]` can overflow a 32-bit integer. Use `BigInt` or careful bounds checking in JavaScript.
</details>

## Write your solution

→ [`../solutions/11-reverse-pairs.js`](../solutions/11-reverse-pairs.js)

## Follow-ups

- **Count Inversions** — pairs where `nums[i] > nums[j]` (without the ×2). Simpler version of this problem.
- How does your solution handle negative numbers and potential `2 * nums[j]` overflow?
