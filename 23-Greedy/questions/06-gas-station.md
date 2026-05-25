# Q6 — Gas Station

**Difficulty:** Medium
**Pattern:** Greedy · Running Balance
**Expected:** O(n) time · O(1) space

## Problem

There are `n` gas stations arranged in a **circle**. The gas station at index `i` has `gas[i]` units of fuel available. Driving from station `i` to the next station `(i+1) % n` costs `cost[i]` units of fuel. You start with an empty tank.

Return the **starting station index** if you can travel around the circuit once in the clockwise direction, or `-1` if no such starting station exists. The solution is guaranteed to be unique if it exists.

## Examples

### Example 1
```
Input:  gas  = [1, 2, 3, 4, 5]
        cost = [3, 4, 5, 1, 2]
Output: 3
```
Start at station 3:
- Station 3 → 4: tank = 4 - 1 = 3 (net gain), drive to 4: tank = 3 - 1 = 2.
- Station 4 → 0: tank = 2 + 5 - 2 = 5.
- Station 0 → 1: tank = 5 + 1 - 3 = 3.
- Station 1 → 2: tank = 3 + 2 - 4 = 1.
- Station 2 → 3: tank = 1 + 3 - 5 = -1. Wait — this should work. Let me re-check.

Actually: Starting at 3, travel in order 3→4→0→1→2→3.
- Leave 3 with tank = 4, cost 1 to reach 4: tank = 3.
- At 4 pick up 5, cost 2 to reach 0: tank = 6.
- At 0 pick up 1, cost 3 to reach 1: tank = 4.
- At 1 pick up 2, cost 4 to reach 2: tank = 2.
- At 2 pick up 3, cost 5 to reach 3: tank = 0. Made it! ✅

### Example 2
```
Input:  gas  = [2, 3, 4]
        cost = [3, 4, 3]
Output: -1
```
Total gas = 9, total cost = 10. Impossible.

## Constraints
- `n == gas.length == cost.length`
- `1 <= n <= 10^5`
- `0 <= gas[i], cost[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — when is it impossible?</summary>

If the total amount of gas across all stations is less than the total cost to drive between all stations, it's impossible. Check `sum(gas) >= sum(cost)` first.
</details>

<details>
<summary>Hint 2 — what's the greedy rule?</summary>

Simulate a drive starting from index 0. Keep a running `tank` balance (gas gained minus cost spent). If `tank` ever goes negative at station `i`, you cannot start from any station in `[0..i]` — because any start in that range would arrive at `i` with even less fuel. So reset: set the new candidate start to `i + 1` and reset `tank = 0`.

The greedy rule: **whenever your tank hits negative, the start must be after the current position**.
</details>

<details>
<summary>Hint 3 — why does it work for this problem?</summary>

If total gas ≥ total cost, a valid starting position must exist (this follows from a simple circular argument). Among all candidates, the greedy rule eliminates starting positions that definitively cannot work. What remains after the single pass is the unique valid start.
</details>

## Write your solution
→ [`../solutions/06-gas-station.js`](../solutions/06-gas-station.js)

## Follow-ups
- What if there could be multiple valid starting positions — return all of them?
- What if you could travel in either direction (clockwise or counterclockwise)?
