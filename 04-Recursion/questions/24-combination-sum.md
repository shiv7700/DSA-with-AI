# Q24 — Combination Sum

**Difficulty:** Hard
**Pattern:** Backtracking — include/exclude with repetition allowed
**Expected:** O(n^(T/M + 1)) time — T = target, M = min candidate · O(T/M) space

## Problem

Given an array `candidates` of distinct positive integers and a target integer `target`, return all unique combinations of `candidates` where the chosen numbers sum to `target`.

The **same number may be chosen from `candidates` an unlimited number of times**.

Return the combinations in any order.

> **Why this problem?** It extends the Subset Sum (Q15) and Subsequences (Q11) patterns by allowing reuse of elements. You'll need to be careful to avoid duplicate combinations (e.g., `[2,2,3]` and `[2,3,2]` should appear only once). This "no duplicate combos, repetition allowed" constraint is the key challenge.

## Examples

### Example 1
```
Input:  candidates = [2, 3, 6, 7],  target = 7
Output: [[2,2,3], [7]]
```

### Example 2
```
Input:  candidates = [2, 3, 5],  target = 8
Output: [[2,2,2,2], [2,3,3], [3,5]]
```

### Example 3
```
Input:  candidates = [2],  target = 1
Output: []   (can't reach 1 with only 2)
```

## Constraints
- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- All elements of `candidates` are distinct.
- `1 <= target <= 40`

## Hints

<details>
<summary>Hint 1 — avoid duplicates by only going forward</summary>

The trick to avoid `[2,3,2]` and `[3,2,2]` as separate answers: when you pick a candidate at index `i`, you may reuse the same index or go to later indices — but never go back to earlier ones.

Pass a `startIndex` to the backtracking function. At each step, loop from `startIndex` (not 0) through `candidates.length - 1`. You can still re-pick `candidates[startIndex]` (because repetition is allowed), but you can never pick a candidate with an earlier index.
</details>

<details>
<summary>Hint 2 — the backtracking skeleton</summary>

```js
function combinationSum(candidates, target) {
  const results = [];

  function backtrack(start, current, remaining) {
    if (remaining === 0) {
      results.push([...current]);  // found a valid combination
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) continue;  // prune: too big
      current.push(candidates[i]);
      backtrack(i, current, remaining - candidates[i]); // i (not i+1) allows reuse
      current.pop();  // ← backtrack
    }
  }

  backtrack(0, [], target);
  return results;
}
```
</details>

<details>
<summary>Hint 3 — pruning: sort candidates first</summary>

If you sort `candidates` first, you can stop the loop early when `candidates[i] > remaining` — all further candidates will also be too big.

```js
candidates.sort((a, b) => a - b);
// Then in the loop:
if (candidates[i] > remaining) break;  // break instead of continue
```
</details>

<details>
<summary>Hint 4 — trace for candidates=[2,3,6,7], target=7</summary>

```
backtrack(0, [], 7)
  pick 2 → backtrack(0, [2], 5)
    pick 2 → backtrack(0, [2,2], 3)
      pick 2 → backtrack(0, [2,2,2], 1)
        pick 2 → remaining=-1, prune
        pick 3 → remaining=-2, prune
        ... all candidates > 1
      pop → [2,2]
      pick 3 → backtrack(1, [2,2,3], 0) → push [2,2,3] ✅
      pop → [2,2]
      pick 6 → remaining=-3, prune
    pop → [2]
    pick 3 → backtrack(1, [2,3], 2)
      pick 3 → remaining=-1, prune
      ...
    ...
  pick 7 → backtrack(3, [7], 0) → push [7] ✅
```
</details>

## Write your solution
→ [`../solutions/24-combination-sum.js`](../solutions/24-combination-sum.js)

## Follow-ups
- LeetCode 39: **Combination Sum** — exact same problem.
- LeetCode 40: **Combination Sum II** — each number may only be used once, and the list may contain duplicates. Requires de-duplication logic.
- LeetCode 216: **Combination Sum III** — find all combinations of exactly `k` numbers summing to `n`, using only 1–9.
