# Q24 — Largest Rectangle in Histogram

**Difficulty:** Hard
**Pattern:** Monotonic stack (increasing)
**Expected:** O(n) time · O(n) space

## Problem

Given an array `heights` where `heights[i]` represents the height of a bar of width `1` in a histogram, find the area of the **largest rectangle** that can be formed within the histogram.

## Examples

### Example 1
```
Input:  heights = [2, 1, 5, 6, 2, 3]
Output: 10
```
```
Histogram:
        ┌──┐
     ┌──┤  │
     │  │  ├──┐
┌──┐ │  │  │  │
│  │ │  │  │  │
│  ├─┤  │  │  │
 2   1  5  6  2  3

Largest rectangle: height 5, width 2 (bars at index 2 and 3 → 5×2 = 10)
```

### Example 2
```
Input:  heights = [2, 4]
Output: 4
```

### Example 3
```
Input:  heights = [1, 1, 1, 1]
Output: 4
```
(Height 1, width 4.)

## Constraints
- `1 <= heights.length <= 10^5`
- `0 <= heights[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — brute force</summary>

For each pair of bars `(i, j)`, the rectangle they form has height `min(heights[i..j])` and width `j - i + 1`. Try all pairs. This is O(n²) or O(n³).
</details>

<details>
<summary>Hint 2 — key observation</summary>

For every bar `i`, what's the largest rectangle whose height is exactly `heights[i]`?

It's bounded by the first bar **shorter than** `heights[i]` on each side. Let those positions be `left[i]` and `right[i]`. Then the width is `right[i] - left[i] - 1` and area is `heights[i] * width`.

Finding `left[i]` and `right[i]` for all `i` is exactly the "previous smaller element" and "next smaller element" problem — solvable with a monotonic stack in O(n).
</details>

<details>
<summary>Hint 3 — one-pass stack approach</summary>

Use a single monotonic (increasing) stack of indexes. When you pop an index `i`, it means the current bar is shorter — so the current bar's position is `right[i]`, and the new stack top is `left[i]`.

Area when popping index `i`:
```
width = currentIndex - stack.top() - 1   (or currentIndex if stack is empty)
area = heights[i] * width
```

Process a sentinel height `0` at the end to flush all remaining stack entries.
</details>

## Write your solution
→ [`../solutions/24-largest-rectangle-histogram.js`](../solutions/24-largest-rectangle-histogram.js)

## Follow-ups
- **Maximal Rectangle** (Q25) — extend this algorithm to a 2D binary matrix.
- What if all bars have equal height? Does your algorithm handle this correctly?
