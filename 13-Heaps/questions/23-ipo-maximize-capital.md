# Q23 — IPO (Maximize Capital)

**Difficulty:** Hard
**Pattern:** Two heaps — min-heap for project requirements, max-heap for available profits
**Expected:** O(n log n) time · O(n) space

## Problem

You are working as a consultant helping a company prepare for its IPO. The company has `w` units of initial capital. You want to maximize its final capital by completing at most `k` projects before the IPO.

You are given:
- `profits[i]` — the net profit from completing project `i`.
- `capital[i]` — the minimum capital required to start project `i`.

Each project can only be selected once. When you finish a project, its profit is immediately added to your capital, which may unlock additional projects.

Return the **maximum capital** after completing at most `k` projects.

## Examples

### Example 1
```
Input:  k = 2,  w = 0,  profits = [1, 2, 3],  capital = [0, 1, 1]
Output: 4
```
```
Initial capital: 0
Available projects: capital[0]=0 (requires 0 ≤ 0) → profit=1
Pick project 0 → capital = 1

Available projects: capital[1]=1, capital[2]=1 → profits = 2 and 3
Pick project 2 (highest profit) → capital = 1 + 3 = 4

After 2 projects: capital = 4
```

### Example 2
```
Input:  k = 3,  w = 0,  profits = [1, 2, 3],  capital = [0, 1, 2]
Output: 6
```
Pick project 0 → cap=1, then project 1 → cap=3, then project 2 → cap=6.

### Example 3
```
Input:  k = 1,  w = 0,  profits = [1, 2, 3],  capital = [1, 1, 2]
Output: 0
```
No project is affordable with capital 0.

## Constraints
- `1 <= k <= 10^5`
- `0 <= w <= 10^9`
- `n == profits.length == capital.length`
- `1 <= n <= 10^5`
- `0 <= profits[i] <= 10^4`
- `0 <= capital[i] <= 10^9`

## Hints

<details>
<summary>Hint 1 — two heaps capture two different phases</summary>

At any point, you want to:
1. Know which projects are currently **affordable** (capital requirement ≤ current capital).
2. Among affordable projects, pick the one with the **highest profit**.

These two needs map perfectly to two heaps:
- **Min-heap by capital requirement** — for quickly discovering which projects become affordable as capital grows.
- **Max-heap by profit** — for greedily picking the best available project.
</details>

<details>
<summary>Hint 2 — the algorithm</summary>

```
minHeapByCap = all projects sorted by capital (min at root)
maxHeapByProfit = empty

Repeat k times:
  // Move all newly affordable projects to the profit heap
  while minHeapByCap is not empty and minHeapByCap.peek().capital <= w:
    project = minHeapByCap.pop()
    maxHeapByProfit.push(project)

  // If no project is affordable, stop early
  if maxHeapByProfit is empty: break

  // Pick the most profitable available project
  best = maxHeapByProfit.pop()
  w += best.profit

return w
```
</details>

<details>
<summary>Hint 3 — why greedy is optimal here</summary>

Among all projects you can currently afford, picking the most profitable one is always optimal. There is no reason to delay a high-profit project in favor of a lower-profit one when both are available — doing the high-profit one first only increases your future options (more capital = more affordable projects).
</details>

## Write your solution
→ [`../solutions/23-ipo-maximize-capital.js`](../solutions/23-ipo-maximize-capital.js)

## Follow-ups
- What if you had to complete exactly `k` projects (not at most `k`)?
- How does the algorithm behave if all capital requirements exceed the final achievable capital?
- This problem models a real investment strategy. What real-world constraints would make the greedy approach suboptimal?
