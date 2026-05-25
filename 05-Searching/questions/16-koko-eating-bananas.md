# Q16 — Koko Eating Bananas

**Difficulty:** Medium
**Pattern:** Binary search on the answer space
**Expected:** O(n log(max)) time · O(1) space

## Problem

Koko loves to eat bananas. There are `n` piles of bananas, the `i`th pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her eating speed `k` (bananas per hour). Each hour, she picks a pile and eats `k` bananas from it. If the pile has fewer than `k` bananas, she eats all of them in that hour and doesn't eat from another pile during that same hour.

Find the **minimum integer eating speed** `k` such that she can eat all the bananas within `h` hours.

> **Same pattern as Q15, different story.** The "feasibility check" differs — but the binary search shape is identical. Practice recognizing this structure.

## Examples

### Example 1
```
Input:  piles = [3, 6, 7, 11], h = 8
Output: 4

At speed 4:
pile[0]=3: ceil(3/4) = 1 hour
pile[1]=6: ceil(6/4) = 2 hours
pile[2]=7: ceil(7/4) = 2 hours
pile[3]=11: ceil(11/4) = 3 hours
Total: 1+2+2+3 = 8 hours ✓ (exactly h)
```

### Example 2
```
Input:  piles = [30, 11, 23, 4, 20], h = 5
Output: 30
```

### Example 3
```
Input:  piles = [30, 11, 23, 4, 20], h = 6
Output: 23
```

## Constraints
- `1 <= piles.length <= 10^4`
- `piles.length <= h <= 10^9`
- `1 <= piles[i] <= 10^9`

## Hints

<details>
<summary>Hint 1 — search range</summary>

Minimum speed is `1` banana/hour. Maximum speed is `max(piles)` — eating any faster doesn't help because you stop at each pile for at most one hour regardless.
</details>

<details>
<summary>Hint 2 — feasibility check</summary>

Given speed `k`, how many hours does Koko need for pile `p`? She needs `Math.ceil(p / k)` hours.

```js
function canFinish(piles, h, k) {
  let hours = 0;
  for (const p of piles) {
    hours += Math.ceil(p / k);
  }
  return hours <= h;
}
```
</details>

<details>
<summary>Hint 3 — direction of binary search</summary>

You want the **minimum** speed that works:
- If `canFinish(k)` is true: speed `k` works. Try smaller. `right = mid`.
- If `canFinish(k)` is false: speed `k` is too slow. `left = mid + 1`.

Same lower-bound template as Q15.
</details>

## Write your solution
→ [`../solutions/16-koko-eating-bananas.js`](../solutions/16-koko-eating-bananas.js)

## Follow-ups
- **LeetCode 875** — this exact problem.
- Compare with Q15 (Capacity to Ship). Write both, then look at the structural similarities. The binary search code should be nearly identical — only `canSolve` differs.
- What if Koko can eat from multiple piles in one hour? How does the problem change?
