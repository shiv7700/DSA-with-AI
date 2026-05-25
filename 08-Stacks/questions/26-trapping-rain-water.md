# Q26 — Trapping Rain Water (Stack Approach)

**Difficulty:** Hard
**Pattern:** Stack — layer-by-layer water accumulation
**Expected:** O(n) time · O(n) space

## Problem

You are given an array `height` of non-negative integers where each value represents the height of a bar of width 1. Compute how much water is trapped between the bars after it rains.

> **Note:** This problem appeared in the Arrays chapter (Q23) with a two-pointer solution. Here you must solve it using a **stack**. The two approaches give the same answer but compute it in different ways.

## Examples

### Example 1
```
Input:  height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6
```

### Example 2
```
Input:  height = [4, 2, 0, 3, 2, 5]
Output: 9
```

## Constraints
- `1 <= height.length <= 2 × 10^4`
- `0 <= height[i] <= 10^5`

## Hints

<details>
<summary>Hint 1 — the stack approach: layer by layer</summary>

Unlike the two-pointer approach (which computes water column by column), the stack approach computes water **layer by layer** (horizontal slabs).

The stack stores indexes of bars in **non-increasing** order of height. When you encounter a bar taller than the top, you've found a "bowl" — water can be trapped.
</details>

<details>
<summary>Hint 2 — when to compute water</summary>

When `height[i] > height[stack.top()]`:
1. Pop the "bottom" of the bowl: `bottom = stack.pop()`.
2. If the stack is now empty, no left wall — skip.
3. Otherwise: `left = stack.top()`, `right = i`.
   - `width = right - left - 1`
   - `waterHeight = min(height[left], height[right]) - height[bottom]`
   - `water += width * waterHeight`
4. Repeat while `height[i] > height[stack.top()]` (might fill multiple layers).
5. Push `i`.
</details>

<details>
<summary>Hint 3 — compare with the two-pointer approach</summary>

Two-pointer (from Arrays Q23): processes each column independently — for each `i`, asks "what is the water level above bar `i`?"

Stack approach: processes each horizontal layer — finds a bowl (left wall, bottom, right wall) and computes the water in that bowl.

Both are O(n) time. The two-pointer is O(1) space. The stack approach is O(n) space but is conceptually different and worth understanding.
</details>

## Write your solution
→ [`../solutions/26-trapping-rain-water.js`](../solutions/26-trapping-rain-water.js)

## Follow-ups
- Implement the two-pointer version from memory and compare the two code structures side by side.
- Which approach is easier to explain in an interview? Why?
