# Q9 — Find the Second-Largest Value

**Difficulty:** Easy
**Pattern:** Single pass / running state
**Expected:** O(n) time · O(1) space

## Problem

Given an array of numbers, return the **second-largest distinct value**.

If the array has fewer than two distinct values (e.g., it's empty, has one element, or contains all the same value), return `null`.

Solve this in a **single pass** — no sorting (sorting would be O(n log n)).

## Examples

### Example 1
```
Input:  [10, 5, 8, 12, 3]
Output: 10
```
The largest is 12, so the second-largest is 10.

### Example 2 (with duplicates)
```
Input:  [12, 12, 7, 5]
Output: 7
```
The largest is 12 (twice). The next distinct value is 7.

### Example 3 (only one distinct value)
```
Input:  [1, 1, 1, 1]
Output: null
```

### Example 4 (too short)
```
Input:  [7]      →  null
Input:  []       →  null
```

### Example 5 (negatives)
```
Input:  [-5, -10, -3, -1]
Output: -3
```

## Constraints
- `0 <= arr.length <= 10^5`
- Numbers can be negative.
- Single pass. O(1) extra space.

## Hints

<details>
<summary>Hint 1</summary>

Track two variables: `largest` and `secondLargest`. Initialize both to `-Infinity` (so any real number will replace them).
</details>

<details>
<summary>Hint 2 — the update logic</summary>

For each element `x` in the array:
- If `x > largest`: the new largest is `x`, and the old `largest` is demoted to `secondLargest`.
- Else if `x > secondLargest` **and** `x !== largest`: update `secondLargest`.

The `x !== largest` check is what keeps `secondLargest` **distinct** from `largest`.
</details>

<details>
<summary>Hint 3</summary>

After the loop, if `secondLargest` is still `-Infinity`, no valid second-largest was found — return `null`.
</details>

## Write your solution
→ [`../solutions/09-second-largest.js`](../solutions/09-second-largest.js)

## Follow-ups
- Find the **k-th largest distinct** value in O(n × k). Acceptable for small k.
- For arbitrary k, use a min-heap of size k for O(n log k). (Covered in the Heaps topic.)
