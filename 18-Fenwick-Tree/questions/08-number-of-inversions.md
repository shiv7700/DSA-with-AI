# Q8 — Number of Inversions

**Difficulty:** Medium
**Pattern:** Fenwick Tree + coordinate compression
**Expected:** O(n log n) time · O(n) space

## Problem

Given an array of integers `nums`, count the number of **inversions**. An inversion is a pair of indexes `(i, j)` where `i < j` and `nums[i] > nums[j]`.

> **Why this matters:** the inversion count tells you how "unsorted" an array is. A fully sorted array has 0 inversions; a reverse-sorted array has the maximum, `n*(n-1)/2`. This problem is a classic that appears in both interviews and algorithm courses.

## Examples

### Example 1

```
Input:  nums = [2, 4, 1, 3, 5]
Output: 3

Inversions: (0,2): 2>1,  (1,2): 4>1,  (1,3): 4>3
```

### Example 2

```
Input:  nums = [5, 4, 3, 2, 1]
Output: 10

Every pair is an inversion. For n=5: 5*4/2 = 10.
```

### Example 3

```
Input:  nums = [1, 2, 3, 4, 5]
Output: 0
```

### Example 4

```
Input:  nums = [1]
Output: 0
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Hints

<details>
<summary>Hint 1 — brute force first</summary>

Two nested loops: for every pair `(i, j)` with `i < j`, check if `nums[i] > nums[j]`. This is O(n²) — too slow for `n = 10^5`, but implement it first to verify your optimised version.

</details>

<details>
<summary>Hint 2 — right-to-left BIT sweep</summary>

Walk through `nums` from **right to left**. When you're at index `i`:
- `nums[i]` contributes one inversion for every element already inserted into the BIT that is **strictly less** than `nums[i]`.
- Query: `bit.query(rank(nums[i]) - 1)` — count of values with rank less than `nums[i]`'s rank.
- Then insert `nums[i]`: `bit.update(rank(nums[i]), 1)`.

This is exactly Q6 with the "self" concept removed. All pairs `(i, j)` with `i < j` and `nums[i] > nums[j]` are counted.

</details>

<details>
<summary>Hint 3 — coordinate compression for large values</summary>

Values can reach 10^9, so you can't make a BIT of that size. Compress:

```js
const sorted = [...new Set(nums)].sort((a, b) => a - b);
const rank = new Map(sorted.map((v, i) => [v, i + 1]));
const bit = new BIT(sorted.length);
```

</details>

## Write your solution

→ [`../solutions/08-number-of-inversions.js`](../solutions/08-number-of-inversions.js)

## Follow-ups

- Implement the O(n log n) merge-sort version and compare.
- What is the inversion count of a randomly shuffled array of size n, on average? (Answer: n*(n-1)/4.)
- Can you count inversions in a **stream** of numbers arriving one by one?
