# Q16 — Trapping Rain Water (O(1) Space)

**Difficulty:** Medium (Hard if you haven't seen it before)
**Pattern:** Two Pointers (opposite ends + running max)
**Expected:** O(n) time · O(1) space

## Problem

You are given an array `height` of non-negative integers representing the height of bars of width 1. Calculate how much water can be trapped after it rains.

This is the same problem as [02 — Arrays Q23](../../02-Arrays/questions/23-trapping-rain-water.md), but here the goal is to achieve O(1) space using two pointers instead of the O(n) space prefix-max approach.

## Examples

### Example 1
```
Input:  height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6
```

Visualization:
```
                #
        # ~ ~ ~ # # ~ #
    # ~ # # ~ # # # # #
0 1 0 2 1 0 1 3 2 1 2 1
```

### Example 2
```
Input:  height = [4, 2, 0, 3, 2, 5]
Output: 9
```

### Example 3
```
Input:  [3, 2, 1]
Output: 0
```

## Constraints
- `1 <= height.length <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

## Hints

<details>
<summary>Hint 1 — the prefix-max approach (O(n) space, to understand first)</summary>

Pre-compute `leftMax[i]` = tallest bar from index 0 to i. Pre-compute `rightMax[i]` = tallest from i to end.
Water at position i = `max(0, min(leftMax[i], rightMax[i]) - height[i])`.
This works but uses O(n) extra space. Can you eliminate those two arrays?
</details>

<details>
<summary>Hint 2 — the two-pointer insight</summary>

Use `left = 0`, `right = n - 1`, plus `leftMax = 0`, `rightMax = 0`.

At each step, whichever side has the **shorter current maximum** determines the water at that position — because we know the other side has at least that much height to trap against.

- If `height[left] < height[right]`: the constraining side is the left. Update `leftMax`, add `leftMax - height[left]` to the total, advance `left`.
- Else: symmetric on the right.
</details>

<details>
<summary>Hint 3 — why the shorter side determines the water</summary>

If `leftMax < rightMax`, then at position `left`, the water level is capped by `leftMax` (the shorter side). We don't need to know the exact right maximum beyond the current `right` pointer — because `rightMax` is already at least as tall as `leftMax`, which is what caps the water anyway. Any future right values won't change the cap at this left position.
</details>

## Write your solution
→ [`../solutions/16-trapping-rain-water.js`](../solutions/16-trapping-rain-water.js)

## Follow-ups
- Read the O(n) space prefix-max solution first (Arrays Q23) if two pointers feels too abstract — it's the same answer arrived at differently.
- **Trapping Rain Water II** (Q38 here) is the 2D version — it requires a min-heap, not pure two pointers.
- Cross-reference: [02 — Arrays Q23 — Trapping Rain Water](../../02-Arrays/questions/23-trapping-rain-water.md)
