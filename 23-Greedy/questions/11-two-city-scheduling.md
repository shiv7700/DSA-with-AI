# Q11 — Two City Scheduling

**Difficulty:** Medium
**Pattern:** Greedy · Sort by Cost Difference
**Expected:** O(n log n) time · O(1) space

## Problem

A company is planning to interview `2n` people. Given a 2D array `costs` where `costs[i] = [aCost_i, bCost_i]` represents the cost of flying the `i`-th person to city A or city B respectively, return the **minimum cost** to fly every person to a city such that **exactly `n` people arrive in each city**.

## Examples

### Example 1
```
Input:  costs = [[10,20],[30,200],[400,50],[30,20]]
Output: 110
```
Send person 0 to city A (10), person 1 to city A (30), person 2 to city B (50), person 3 to city B (20). Total = 110.

### Example 2
```
Input:  costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]
Output: 1859
```

### Example 3
```
Input:  costs = [[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]]
Output: 3086
```

## Constraints
- `2n == costs.length`
- `2 <= costs.length <= 200`
- `costs.length` is even.
- `1 <= aCost_i, bCost_i <= 1000`

## Hints

<details>
<summary>Hint 1 — think about the "regret" of not sending someone to city A</summary>

For each person, define the **difference** `costs[i][0] - costs[i][1]`. A very negative difference means "this person is much cheaper to send to A." A very positive difference means "this person is much cheaper to send to B."

If you could only send `n` people to A, which `n` should they be?
</details>

<details>
<summary>Hint 2 — what's the greedy rule?</summary>

Sort all people by `(costA - costB)` in ascending order. The first `n` people (most negative differences, i.e., cheapest relative to A) go to city A. The last `n` people go to city B.

This minimizes total cost because you're maximizing savings by sending each person to whichever city gives the biggest relative advantage.
</details>

<details>
<summary>Hint 3 — formal intuition (exchange argument)</summary>

Suppose in an optimal solution, a person `i` with low `aCost - bCost` goes to B, while a person `j` with high `aCost - bCost` goes to A. Swap them. The change in cost is `(aCost_i + bCost_j) - (bCost_i + aCost_j)` = `(aCost_i - bCost_i) - (aCost_j - bCost_j)`. If `i` has the lower difference, this is ≤ 0 — the swap doesn't increase cost. Repeatedly swapping leads to the sorted solution.
</details>

## Write your solution
→ [`../solutions/11-two-city-scheduling.js`](../solutions/11-two-city-scheduling.js)

## Follow-ups
- What if there were 3 cities instead of 2, each needing exactly `n` people?
- What if the number of people going to each city didn't have to be equal?
