# Q18 — Counting Bits (0 to n)

**Difficulty:** Medium
**Pattern:** DP on bits — `dp[i] = dp[i >> 1] + (i & 1)`
**Expected:** O(n) time · O(n) space

## Problem

Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (where `0 <= i <= n`), `ans[i]` is the **number of 1-bits** in the binary representation of `i`.

## Examples

### Example 1
```
Input:  n = 2
Output: [0, 1, 1]
```
0 = 0, 1 = 1, 2 = 10 → popcount: 0, 1, 1.

### Example 2
```
Input:  n = 5
Output: [0, 1, 1, 2, 1, 2]
```
0=0, 1=1, 2=1, 3=2, 4=1, 5=2.

## Constraints
- `0 <= n <= 10^5`
- Solve in **O(n)** (don't call Brian Kernighan's algorithm for each number — that would be O(n log n) worst case).

## Hints

<details>
<summary>Hint 1 — look at the relationship between i and i >> 1</summary>

`i >> 1` is just `i` with the lowest bit dropped. The bit count of `i` equals the bit count of `i >> 1` plus whether bit 0 of `i` is set:

```
popcount(i) = popcount(i >> 1) + (i & 1)
```

In other words, shifting right by 1 either keeps or loses one set bit.
</details>

<details>
<summary>Hint 2 — build the dp table bottom-up</summary>

```js
const dp = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) {
  dp[i] = dp[i >> 1] + (i & 1);
}
return dp;
```

`dp[0] = 0` (base case). Every subsequent value is computed in O(1) using a previously computed result.
</details>

<details>
<summary>Hint 3 — trace for n = 5</summary>

```
i=0: dp[0] = 0
i=1: dp[0] + (1&1) = 0 + 1 = 1
i=2: dp[1] + (2&1) = 1 + 0 = 1
i=3: dp[1] + (3&1) = 1 + 1 = 2
i=4: dp[2] + (4&1) = 1 + 0 = 1
i=5: dp[2] + (5&1) = 1 + 1 = 2

[0, 1, 1, 2, 1, 2] ✓
```
</details>

## Write your solution
→ [`../solutions/18-counting-bits.js`](../solutions/18-counting-bits.js)

## Follow-ups
- There are two alternative recurrences you can use. Can you find the one based on `i & (i - 1)` (clear lowest set bit)?
- What does the pattern of set-bit counts look like as n grows? (Hint: the counts repeat in power-of-2 blocks with +1 offsets.)
- What is the total number of set bits across all integers from 0 to n? Can you compute that in O(log n)?
