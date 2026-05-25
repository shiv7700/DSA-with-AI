# Q23 — Trapping Rain Water

**Difficulty:** Hard
**Pattern:** Two pointers · or prefix-max + suffix-max
**Expected:** O(n) time · O(1) space (with the two-pointer version)

## Problem

You are given an array `height` of non-negative integers. Each value represents the height of a bar of width 1. After it rains and all water settles, calculate **how much water is trapped** between the bars.

For each position `i`, the water depth there is:
```
trapped[i] = max(0, min(maxLeft[i], maxRight[i]) - height[i])
```
where `maxLeft[i]` is the tallest bar at or before position `i`, and `maxRight[i]` is the tallest bar at or after position `i`.

## Examples

### Example 1
```
Input:  height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6
```

Visualization (`#` = bar, `~` = trapped water):
```
                #
        # ~ ~ ~ # # ~ #
    # ~ # # ~ # # # # #
0 1 0 2 1 0 1 3 2 1 2 1
```
Total trapped water = 6 units.

### Example 2
```
Input:  height = [4, 2, 0, 3, 2, 5]
Output: 9
```

### Example 3 (no water possible)
```
Input:  [3, 2, 1]
Output: 0
```
The heights are strictly decreasing — there's nothing to trap water against on the right.

### Example 4 (edge cases)
```
Input:  []        →  0
Input:  [5]       →  0
Input:  [5, 5]    →  0
```

## Constraints
- `1 <= height.length <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

## Hints

<details>
<summary>Hint 1 — brute force</summary>

For each index `i`, scan to the left for `maxLeft[i]` and to the right for `maxRight[i]`. Then add `min(maxLeft, maxRight) - height[i]` to the total. This is O(n²).
</details>

<details>
<summary>Hint 2 — prefix max + suffix max (O(n) time, O(n) space)</summary>

Pre-compute two helper arrays:
- `leftMax[i]`  = max of `height[0..i]`
- `rightMax[i]` = max of `height[i..n-1]`

Then `water[i] = min(leftMax[i], rightMax[i]) - height[i]`. Sum across all indexes.
</details>

<details>
<summary>Hint 3 — two pointers (O(n) time, O(1) space)</summary>

Use two pointers `l = 0`, `r = n - 1`, plus running variables `leftMax` and `rightMax`.

At each step:
- If `height[l] < height[r]`: the water at position `l` is limited by the **left side**. Update `leftMax`, add `leftMax - height[l]` to the total, advance `l`.
- Otherwise: symmetric on the right.

Why this works: the **shorter side determines the cap**. We process whichever side is currently shorter, because we know the trapped water at that position can't exceed the shorter side's height — regardless of what's still hiding on the taller side.
</details>

## Write your solution
→ [`../solutions/23-trapping-rain-water.js`](../solutions/23-trapping-rain-water.js)

## Follow-ups
- **Container With Most Water** (Q15) — a different problem that's often confused with this one.
- **Trapping Rain Water II** — the 2D version (a grid of heights). Uses a min-heap (priority queue) BFS.
