# Q10 — Maximum Units on a Truck

**Difficulty:** Easy
**Pattern:** Greedy · Sort by Value Descending
**Expected:** O(n log n) time · O(1) space

## Problem

You are given a 2D integer array `boxTypes` where `boxTypes[i] = [numberOfBoxes_i, numberOfUnitsPerBox_i]`. You are also given an integer `truckSize` — the maximum number of boxes you can load on the truck.

Load the boxes to **maximize the total number of units** on the truck. You can load any number of boxes of each type, up to the available count.

Return the **maximum total number of units** that can be loaded.

## Examples

### Example 1
```
Input:  boxTypes = [[1,3],[2,2],[3,1]],  truckSize = 4
Output: 8
```
Pick 1 box of type 0 (3 units each) + 2 boxes of type 1 (2 units each) + 1 box of type 2 (1 unit each) = 3 + 4 + 1 = 8. (4 boxes total, within truckSize.)

### Example 2
```
Input:  boxTypes = [[5,10],[2,5],[4,7],[3,9]],  truckSize = 10
Output: 91
```

### Example 3
```
Input:  boxTypes = [[1,100]],  truckSize = 5
Output: 100
```
Only 1 box available.

## Constraints
- `1 <= boxTypes.length <= 1000`
- `1 <= numberOfBoxes_i, numberOfUnitsPerBox_i <= 1000`
- `1 <= truckSize <= 10^6`

## Hints

<details>
<summary>Hint 1 — what's the greedy rule?</summary>

To maximize total units, always load the box type with the **most units per box** first. Fill as many boxes of that type as the truck can hold, then move to the next best type, and so on.

This is the fractional knapsack applied to whole items (and since we're maximizing without a weight constraint on items themselves — each box occupies one "slot" — the greedy is exact).
</details>

<details>
<summary>Hint 2 — why does it work for this problem?</summary>

Each box slot on the truck is identical — it holds exactly one box. So you want every slot filled by the highest-value box possible. There's no "weight" tradeoff: a high-value box doesn't cost more slots. Greedy is correct because loading the best available box at each step never prevents you from loading another good box later.
</details>

<details>
<summary>Hint 3 — implementation sketch</summary>

```js
boxTypes.sort((a, b) => b[1] - a[1]);  // sort by units/box descending
let units = 0;
for (const [count, unitsPerBox] of boxTypes) {
  const take = Math.min(count, truckSize);
  units += take * unitsPerBox;
  truckSize -= take;
  if (truckSize === 0) break;
}
return units;
```
</details>

## Write your solution
→ [`../solutions/10-maximum-units-on-a-truck.js`](../solutions/10-maximum-units-on-a-truck.js)

## Follow-ups
- What if different box types had different physical sizes (not just unit counts)? (Now it's the fractional knapsack — same greedy works if you can split; 0/1 knapsack if you can't.)
- What if you wanted to minimize the number of box types used while still maximizing units?
