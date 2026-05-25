# Q15 — Container With Most Water

**Difficulty:** Medium
**Pattern:** Two Pointers (opposite ends, greedy)
**Expected:** O(n) time · O(1) space

## Problem

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are at `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container such that the container holds the most water.

Return the maximum amount of water a container can store.

> The container is formed by two lines and the x-axis. It cannot be slanted.

## Examples

### Example 1
```
Input:  height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49
```
Lines at index 1 (height 8) and index 8 (height 7) form the container.
Width = 8 - 1 = 7. Height = min(8, 7) = 7. Area = 49.

### Example 2
```
Input:  height = [1, 1]
Output: 1
```

### Example 3
```
Input:  height = [4, 3, 2, 1, 4]
Output: 16
```
Lines at index 0 and index 4, both height 4. Width = 4, height = 4. Area = 16.

## Constraints
- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — the area formula</summary>

For two lines at positions `left` and `right`, the water held is:
```
area = (right - left) * Math.min(height[left], height[right])
```
Width is the gap between the lines. Height is limited by the shorter line.
</details>

<details>
<summary>Hint 2 — which pointer to move?</summary>

Start `left = 0`, `right = n - 1`. At each step, compute the current area and update the max. Then:
- Always move the pointer at the **shorter** line. Why? Moving the taller line can only decrease the width without any chance of increasing the height — the shorter line is still the bottleneck. Moving the shorter line gives you a chance to find a taller line.
</details>

<details>
<summary>Hint 3 — why this greedy choice is safe</summary>

When you move the shorter pointer inward, you're saying: "any container involving the current shorter line and a position *further inside* would be strictly worse (shorter width, same or shorter height)." You rule out those pairs safely.
</details>

## Write your solution
→ [`../solutions/15-container-with-most-water.js`](../solutions/15-container-with-most-water.js)

## Follow-ups
- Don't confuse this with Trapping Rain Water (Q16) — very different problems. This asks for one optimal container; that asks for total trapped water across all positions.
- Cross-reference: [02 — Arrays Q15 — Container With Most Water](../../02-Arrays/questions/15-container-with-most-water.md)
