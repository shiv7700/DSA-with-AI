# Q15 — Capacity to Ship Packages Within D Days

**Difficulty:** Medium
**Pattern:** Binary search on the answer space
**Expected:** O(n log(sum)) time · O(1) space

## Problem

A conveyor belt has packages with weights `weights[i]`. The ship loads packages in the given order — it cannot split a package across two trips. Find the **minimum weight capacity** of the ship such that all packages can be shipped within `D` days.

Each day, you load packages onto the ship in order. When adding the next package would exceed the capacity, you stop for that day and start fresh the next day.

> **This is "binary search on the answer" in classic form.** The answer (capacity) is a number. You can write a function that checks: "given capacity X, can I ship everything in D days?" If X is too small → no. If X is large enough → yes. The condition is monotone: once X works, X+1 also works. Binary search finds the minimum X.

## Examples

### Example 1
```
Input:  weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], D = 5
Output: 15

Explanation: ship with capacity 15
Day 1: [1, 2, 3, 4, 5]  = 15
Day 2: [6, 7]            = 13
Day 3: [8]               =  8
Day 4: [9]               =  9
Day 5: [10]              = 10
```

### Example 2
```
Input:  weights = [3, 2, 2, 4, 1, 4], D = 3
Output: 6
```

### Example 3
```
Input:  weights = [1, 2, 3, 1, 1], D = 4
Output: 3
```

## Constraints
- `1 <= D <= weights.length <= 5 * 10^4`
- `1 <= weights[i] <= 500`
- The ship must carry packages in order — no reordering.

## Hints

<details>
<summary>Hint 1 — define the search range</summary>

The minimum possible capacity is `max(weights)` — the ship must be able to carry the heaviest single package.

The maximum possible capacity is `sum(weights)` — one day ships everything.

Binary search between these two values.
</details>

<details>
<summary>Hint 2 — write the feasibility check</summary>

```js
function canShip(weights, D, capacity) {
  let days = 1;
  let load = 0;
  for (const w of weights) {
    if (load + w > capacity) {
      days++;        // start a new day
      load = 0;
    }
    load += w;
  }
  return days <= D;
}
```

This runs in O(n). Your binary search calls it O(log(sum)) times → total O(n log(sum)).
</details>

<details>
<summary>Hint 3 — binary search structure</summary>

You're looking for the **minimum** capacity that works:
- If `canShip(mid)` is `true`: mid might be the answer, but try smaller. `right = mid`.
- If `canShip(mid)` is `false`: mid is too small. `left = mid + 1`.

Use the lower-bound template: `right = MAX`, `while (left < right)`, `right = mid` on success.
</details>

## Write your solution
→ [`../solutions/15-capacity-to-ship.js`](../solutions/15-capacity-to-ship.js)

## Follow-ups
- **Koko Eating Bananas** (Q16) — same binary-search-on-answer structure.
- **Split Array Largest Sum** (Q22) — equivalent formulation, different story.
- What's the time complexity if `weights.length = 50,000` and each weight is up to 500? Answer: O(50000 × log(25,000,000)) ≈ O(50000 × 24.5) ≈ 1.2M operations. Very fast.
