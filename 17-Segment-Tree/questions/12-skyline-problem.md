# Q12 — The Skyline Problem

**Difficulty:** Medium
**Pattern:** Segment Tree (or priority queue / sweep line)
**Expected:** O(n log n) time · O(n) space

## Problem

A city's skyline is the outer contour of its buildings when viewed from a distance. You are given the positions of `n` buildings as `buildings[i] = [left, right, height]` (all integers, with `left < right`).

Return the skyline — the key points that define the outer silhouette — as a list of `[x, height]` pairs. A key point is where the skyline either rises or falls. The last key point always has height 0.

The output must be sorted by `x`. No two consecutive key points should have the same height.

## Examples

### Example 1

```
Input:  [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
Output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
```

Visualization:
```
       ██████████████████████
   ████████████████      ██████████████
         ████████████████████████
  |  |  |  |  |  |  |  |  |  |  |
  2  3  5  7  9  12 15 19 20 24
```

### Example 2

```
Input:  [[0,2,3],[2,5,3]]
Output: [[0,3],[5,0]]
```
(Two adjacent buildings of the same height — the skyline between them doesn't dip.)

## Constraints

- `1 <= buildings.length <= 10^4`
- `0 <= left < right <= 2^31 - 1`
- `1 <= height <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — event-based sweep line</summary>

Create events: for each building `[l, r, h]`, emit a "start" event at `x = l` with height `h` and an "end" event at `x = r`. Sort all events by `x`.

Sweep left to right. Maintain the current maximum active height. When a start event raises the max height, emit a key point. When an end event lowers the max height, emit a key point.
</details>

<details>
<summary>Hint 2 — maintaining active heights</summary>

Use a max-heap (priority queue) to track all active heights. At each x-coordinate, add new building heights and remove heights of buildings that have ended. The current max is the heap's top.

**JavaScript doesn't have a built-in heap** — use a sorted structure or implement a min-heap with negated values.
</details>

<details>
<summary>Hint 3 — segment tree approach</summary>

Compress x-coordinates. Build a max segment tree over them. For each building `[l, r, h]`, do a range-max update (set the entire range to `max(current, h)` — this is a range assign/max update). After all buildings, walk the segment tree to emit key points where the height changes.

This is more complex than the heap approach for this problem — the heap approach is usually preferred.
</details>

<details>
<summary>Hint 4 — edge case: tie in x-coordinate</summary>

When a start event and end event share the same `x`, process starts first (to avoid a spurious dip to 0).
</details>

## Write your solution

→ [`../solutions/12-skyline-problem.js`](../solutions/12-skyline-problem.js)

## Follow-ups

- What if buildings can have fractional coordinates?
- How would you merge two skylines efficiently?
