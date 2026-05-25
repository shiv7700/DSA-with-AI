# Q22 — Ugly Number II

**Difficulty:** Medium
**Pattern:** Min-heap with duplicate tracking — generate the n-th number in a sequence
**Expected:** O(n log n) time · O(n) space

## Problem

An **ugly number** is a positive integer whose only prime factors are 2, 3, and 5.

The sequence of ugly numbers is: `1, 2, 3, 4, 5, 6, 8, 9, 10, 12, ...`

Given an integer `n`, return the `n`-th ugly number.

## Examples

### Example 1
```
Input:  n = 10
Output: 12
```
The first 10 ugly numbers are: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12.

### Example 2
```
Input:  n = 1
Output: 1
```
`1` is the first ugly number by definition.

### Example 3
```
Input:  n = 15
Output: 24
```
Sequence: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24.

## Constraints
- `1 <= n <= 1690`

## Hints

<details>
<summary>Hint 1 — each ugly number generates three candidates</summary>

If `u` is an ugly number, then `2u`, `3u`, and `5u` are also ugly numbers (you're only multiplying by the allowed prime factors).

Start with `1` in a min-heap. Each time you pop the current minimum ugly number `u`, push `2u`, `3u`, and `5u` if they haven't been pushed already.

After popping `n` times, the last popped value is the n-th ugly number.
</details>

<details>
<summary>Hint 2 — avoiding duplicates</summary>

The same ugly number can be generated multiple times. For example, `6 = 2×3 = 3×2` — it would be pushed twice.

Use a `Set` to track which values have already been added to the heap. Before pushing any candidate, check if it's already in the set.
</details>

<details>
<summary>Hint 3 — alternative DP approach (O(n) time)</summary>

Use three pointers `p2`, `p3`, `p5` (starting at index 0 in the `dp` array) and build ugly numbers one by one:

```
dp[0] = 1
For i from 1 to n-1:
  next = min(dp[p2]*2, dp[p3]*3, dp[p5]*5)
  dp[i] = next
  if next == dp[p2]*2: p2++
  if next == dp[p3]*3: p3++
  if next == dp[p5]*5: p5++
```

This is O(n) time and space — more efficient than the heap approach but specific to this problem's structure.
</details>

## Write your solution
→ [`../solutions/22-ugly-number-ii.js`](../solutions/22-ugly-number-ii.js)

## Follow-ups
- **Super Ugly Number** — generalization where you can use any set of prime factors.
- Can you implement the O(n) DP approach as an alternative?
- How would you efficiently list all ugly numbers up to a given limit `L`?
