# Q6 — Count of Smaller Numbers After Self (LeetCode 315)

**Difficulty:** Medium
**Pattern:** Fenwick Tree + coordinate compression
**Expected:** O(n log n) time · O(n) space

## Problem

This is [LeetCode 315 — Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/).

You are given an integer array `nums`. Return an integer array `counts` where `counts[i]` is the number of elements to the **right** of `nums[i]` that are **strictly smaller** than `nums[i]`.

## Examples

### Example 1

```
Input:  nums = [5, 2, 6, 1]
Output:        [2, 1, 1, 0]

Explanation:
- To the right of 5: [2, 6, 1] → two numbers smaller than 5: {2, 1}
- To the right of 2: [6, 1]   → one number smaller than 2: {1}
- To the right of 6: [1]      → one number smaller than 6: {1}
- To the right of 1: []       → zero numbers
```

### Example 2

```
Input:  nums = [1]
Output:        [0]
```

### Example 3

```
Input:  nums = [1, 1]
Output:        [0, 0]
```

### Example 4

```
Input:  nums = [-1, -1]
Output:        [0, 0]
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — the key observation</summary>

Walk through `nums` from **right to left**. When you're at index `i`, all elements you've already processed are to the right of `i`. You want to count how many of them are strictly less than `nums[i]`.

If you could instantly ask "how many values in the set so far are less than `nums[i]`?", you'd have the answer.

</details>

<details>
<summary>Hint 2 — BIT indexed by value</summary>

Instead of indexing the BIT by array position, index it by **value**. When you process `nums[i]`:
1. Query the BIT: "how many values in the range [min, nums[i] - 1] have been inserted so far?" That count is `counts[i]`.
2. Update the BIT: insert `nums[i]` (increment its count by 1).

</details>

<details>
<summary>Hint 3 — coordinate compression</summary>

Values range from -10^4 to +10^4 (20,001 possible values). You could use a BIT of size 20,001 with an offset. Or you can **compress** the values to a small range [1..k]:

```js
const sorted = [...new Set(nums)].sort((a, b) => a - b);
const rank = new Map(sorted.map((v, i) => [v, i + 1]));
// rank.get(nums[i]) gives 1-indexed rank
```

After compression, the BIT only needs `sorted.length` slots.

</details>

<details>
<summary>Hint 4 — putting it together</summary>

```
Walk right to left:
  for i from n-1 down to 0:
    r = rank(nums[i])
    counts[i] = bit.query(r - 1)   // count of values inserted so far with rank < r
    bit.update(r, 1)               // insert this value
```

</details>

## Write your solution

→ [`../solutions/06-count-smaller-after-self.js`](../solutions/06-count-smaller-after-self.js)

## Follow-ups

- Can you solve this with merge sort? It's another classic O(n log n) approach.
- What changes if the problem asked for elements ≤ `nums[i]` instead of strictly less?
- **Reverse Pairs** (Q7) uses a very similar pattern — do that one next.
