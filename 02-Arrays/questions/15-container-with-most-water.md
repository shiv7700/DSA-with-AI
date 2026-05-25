# Q15 — Container With Most Water

**Difficulty:** Medium
**Pattern:** Two pointers (opposite ends)
**Expected:** O(n) time · O(1) space

## Problem

You are given an array `height` of `n` non-negative integers. Each value `height[i]` represents the height of a vertical line drawn at position `i` on the x-axis.

Find the two lines that, together with the x-axis, form a container holding the **maximum amount of water**. Return that maximum amount.

The amount of water held between lines at indexes `i` and `j` is:

```
area = min(height[i], height[j]) * (j - i)
```

(The lines themselves have no thickness — only the horizontal distance between them counts for the width.)

## Examples

### Example 1
```
Input:  height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49
```
The lines at index 1 (height 8) and index 8 (height 7) give:
```
area = min(8, 7) * (8 - 1) = 7 * 7 = 49
```

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
Indexes 0 and 4: `min(4, 4) * 4 = 16`.

## Constraints
- `2 <= height.length <= 10^5`
- `0 <= height[i] <= 10^4`

## Hints

<details>
<summary>Hint 1 — brute force</summary>

Try every pair `(i, j)` and track the maximum area: O(n²). Too slow at the upper limit.
</details>

<details>
<summary>Hint 2 — two pointers</summary>

Start with the widest possible container: `left = 0`, `right = n - 1`. Compute its area.

To find a bigger one, you need to move one of the pointers inward. **Move the pointer at the shorter line.** Why? Because the width is going to decrease no matter which pointer you move. The only way to compensate is to gain height — and you can only gain height by abandoning the shorter line.
</details>

<details>
<summary>Hint 3 — why this works (proof sketch)</summary>

Suppose `height[left] < height[right]`. Any pair `(left, k)` where `k < right` has:
- Smaller width than `(left, right)`.
- Height still capped by `height[left]` (it's the shorter side).

So no pair involving the current `left` can ever beat the current pair. It's safe to discard `left` and move it inward.
</details>

## Write your solution
→ [`../solutions/15-container-with-most-water.js`](../solutions/15-container-with-most-water.js)

## Follow-ups
- **Trapping Rain Water** (Q23) — sounds similar but is a different problem. Read it carefully.
- What if heights could be negative? (The problem becomes ill-defined as physical water — but the algorithm still applies.)
