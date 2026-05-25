# Q7 — Reverse Pairs (LeetCode 493)

**Difficulty:** Medium
**Pattern:** Fenwick Tree + coordinate compression
**Expected:** O(n log n) time · O(n) space

## Problem

This is [LeetCode 493 — Reverse Pairs](https://leetcode.com/problems/reverse-pairs/).

Given an integer array `nums`, return the number of **reverse pairs**. A reverse pair is a pair `(i, j)` where:

- `0 <= i < j < nums.length`
- `nums[i] > 2 * nums[j]`

## Examples

### Example 1

```
Input:  nums = [1, 3, 2, 3, 1]
Output: 2

Explanation:
- (1, 4): nums[1] = 3, nums[4] = 1,  3 > 2 * 1 = 2  ✓
- (3, 4): nums[3] = 3, nums[4] = 1,  3 > 2 * 1 = 2  ✓
```

### Example 2

```
Input:  nums = [2, 4, 3, 5, 1]
Output: 3

Explanation:
(0,4), (1,4), (3,4)  →  3 pairs
```

### Example 3

```
Input:  nums = [1, 1, 1, 1]
Output: 0
```

## Constraints

- `1 <= nums.length <= 5 * 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — similar to Q6, but the condition is different</summary>

In Q6 you counted elements to the right that are **smaller than** `nums[i]`. Here, you need pairs where `nums[i] > 2 * nums[j]` — which is `nums[j] < nums[i] / 2`.

The approach is the same: walk right to left, using a BIT indexed by compressed value. The difference is in which compressed rank you query.

</details>

<details>
<summary>Hint 2 — coordinate compression with 2x values</summary>

You need to compare `nums[i]` against values `2 * nums[j]`. When compressing coordinates, include both `nums[i]` **and** `2 * nums[j]` in your sorted unique-value list. This ensures you can rank `2 * nums[j]` accurately.

⚠️ Watch for integer overflow — `2 * nums[j]` can exceed 32-bit range. Use `BigInt` or just accept that JavaScript numbers handle up to 2^53 safely.

</details>

<details>
<summary>Hint 3 — the BIT query</summary>

When processing index `i` (walking right to left):

1. Query: how many values already inserted have value ≤ `floor(nums[i] / 2 - epsilon)`? In BIT terms: `bit.query(rank(nums[i] / 2, rounded down) - 1)` — but this is tricky with integers. Simpler: query for values `< nums[i] / 2`, which for integers means `≤ floor((nums[i] - 1) / 2)`. It is easiest to just include `2 * nums[j]` in the compression set and query rank of `nums[i] - 1`.

Actually the cleanest approach: separate the "query step" from the "insert step". For each `i` from right to left:
1. Count how many elements to the right satisfy `nums[j] * 2 < nums[i]` (already inserted).
2. Insert `nums[i]` into BIT.

</details>

## Write your solution

→ [`../solutions/07-reverse-pairs.js`](../solutions/07-reverse-pairs.js)

## Follow-ups

- Can you solve this with merge sort? LeetCode's editorial shows both approaches.
- Compare the code length of the BIT approach vs the merge-sort approach.
- **Number of Inversions** (Q8) is a simpler variant — do that one to solidify the pattern.
