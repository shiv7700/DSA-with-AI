# Q21 — Painter's Partition Problem

**Difficulty:** Hard
**Pattern:** Binary search on the answer space — minimize maximum
**Expected:** O(n log(sum)) time · O(1) space

## Problem

You have `n` boards with lengths `boards[0..n-1]` and `k` painters. Each painter can only paint **contiguous** boards, and each painter paints at a fixed rate of 1 unit per minute. Assign boards to painters to **minimize the time** required to paint all boards.

All painters paint simultaneously. The total time is determined by the painter with the most work.

> **Why it's here:** This is the same "binary search on the answer, greedy feasibility check" as Q15 and Q20. The goal is for you to write the same structural code a third time and notice how naturally it all fits together. After this, the pattern should feel automatic.

## Examples

### Example 1
```
Input:  boards = [10, 20, 30, 40], k = 2
Output: 60

Painter 1: [10, 20, 30]  = 60 minutes
Painter 2: [40]           = 40 minutes
Max = 60. (Any other split gives 70 or more.)
```

### Example 2
```
Input:  boards = [10, 20, 30, 40], k = 1
Output: 100   (one painter does everything)
```

### Example 3
```
Input:  boards = [10, 20, 30, 40], k = 4
Output: 40    (each painter takes one board; bottleneck is 40)
```

## Constraints
- `1 <= k <= n <= 10^5`
- `1 <= boards[i] <= 10^5`

## Hints

<details>
<summary>Hint 1 — search range</summary>

Minimum possible answer: `max(boards)` — at least one painter must paint the longest board.

Maximum possible answer: `sum(boards)` — one painter does all.

Binary search between these.
</details>

<details>
<summary>Hint 2 — feasibility check: can k painters finish in time T?</summary>

Go left to right. Assign boards to the current painter until adding the next board would exceed `T`. Give that board to a new painter. Count painters used. If `painters <= k`, feasible.

```js
function canFinish(boards, k, maxTime) {
  let painters = 1, time = 0;
  for (const b of boards) {
    if (time + b > maxTime) {
      painters++;
      time = 0;
    }
    time += b;
  }
  return painters <= k;
}
```
</details>

<details>
<summary>Hint 3 — compare with Q15 and Q20</summary>

This feasibility check is nearly character-for-character identical to Q15's `canShip`. You're minimizing the maximum — so binary search for the leftmost feasible `T`:
- `canFinish(mid)` is true → try smaller: `right = mid`.
- `canFinish(mid)` is false → try bigger: `left = mid + 1`.
</details>

## Write your solution
→ [`../solutions/21-painters-partition.js`](../solutions/21-painters-partition.js)

## Follow-ups
- Compare your solution with Q15 and Q22. How many lines differ?
- What if painters paint at different rates? (The greedy check becomes a different problem.)
- **Dynamic programming** also solves this in O(k × n²) — after this chapter, revisit with DP to see the tradeoff.
