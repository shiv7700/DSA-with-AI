# Q16 — Minimum Number of Arrows to Burst Balloons

**Difficulty:** Medium
**Pattern:** Greedy · Sort by Right Endpoint
**Expected:** O(n log n) time · O(1) space

## Problem

There are spherical balloons taped to a flat wall. Each balloon is represented by `points[i] = [x_start, x_end]`, denoting a balloon whose **horizontal extent** goes from `x_start` to `x_end` (inclusive).

Arrows are shot vertically upward from the floor. An arrow at position `x` bursts all balloons that contain `x` (i.e., `x_start <= x <= x_end`). Arrows can travel infinitely and burst multiple balloons.

Return the **minimum number of arrows** needed to burst all balloons.

## Examples

### Example 1
```
Input:  points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
```
Arrow 1 at x=6 bursts [2,8] and [1,6].
Arrow 2 at x=11 bursts [10,16] and [7,12].

### Example 2
```
Input:  points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
```
No two balloons overlap — need one arrow each.

### Example 3
```
Input:  points = [[1,2],[2,3],[3,4],[4,5]]
Output: 2
```
Arrow at x=2 bursts [1,2] and [2,3]. Arrow at x=4 bursts [3,4] and [4,5].

## Constraints
- `1 <= points.length <= 10^5`
- `points[i].length == 2`
- `-2^31 <= x_start <= x_end <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — connection to activity selection</summary>

This is equivalent to: what is the minimum number of "piercing lines" needed to intersect all intervals? Every arrow corresponds to a point that must lie within a set of intervals.

Equivalently: what is the maximum number of non-overlapping "groups" of intervals — because you need at least one arrow per group?
</details>

<details>
<summary>Hint 2 — what's the greedy rule?</summary>

Sort balloons by their **right endpoint**. Shoot the first arrow as far right as possible for the first balloon (at `x = x_end` of the leftmost-ending balloon). This arrow bursts every balloon whose left endpoint ≤ that `x_end`.

For the next balloon not yet burst, repeat: shoot at its right endpoint.

The greedy rule: **shoot each arrow at the right endpoint of the earliest-ending unbursted balloon**.
</details>

<details>
<summary>Hint 3 — implementation sketch</summary>

```js
points.sort((a, b) => a[1] - b[1]);
let arrows = 1, arrowPos = points[0][1];
for (let i = 1; i < points.length; i++) {
  if (points[i][0] > arrowPos) {     // this balloon is not hit
    arrows++;
    arrowPos = points[i][1];         // shoot at its right end
  }
}
return arrows;
```
</details>

## Write your solution
→ [`../solutions/16-minimum-arrows-burst-balloons.js`](../solutions/16-minimum-arrows-burst-balloons.js)

## Follow-ups
- **Non-Overlapping Intervals** (Q17) — uses the same sort-by-end-time greedy.
- What if each arrow costs a different amount depending on its horizontal position?
