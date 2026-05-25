# Q12 — Merge Intervals

**Difficulty:** Medium
**Pattern:** Greedy · Sort by Start, Merge Overlapping
**Expected:** O(n log n) time · O(n) space

## Problem

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.

Two intervals `[a, b]` and `[c, d]` overlap if `c <= b` (the second starts before the first ends).

## Examples

### Example 1
```
Input:  intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
```
Intervals [1,3] and [2,6] overlap → merged to [1,6].

### Example 2
```
Input:  intervals = [[1,4],[4,5]]
Output: [[1,5]]
```
Intervals [1,4] and [4,5] are considered overlapping (they touch at 4).

### Example 3
```
Input:  intervals = [[1,4],[0,4]]
Output: [[0,4]]
```

### Example 4
```
Input:  intervals = [[1,4],[2,3]]
Output: [[1,4]]
```
One interval is fully inside another.

## Constraints
- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^4`

## Hints

<details>
<summary>Hint 1 — sort first</summary>

If you sort intervals by their start time, you can process them left-to-right. Once you're past a start time, you never need to revisit earlier intervals. The overlapping check becomes: does the current interval's start fall within the previous merged interval?
</details>

<details>
<summary>Hint 2 — what's the greedy rule?</summary>

Keep a "current merged interval." For each next interval:
- If it overlaps with the current merged interval (its start ≤ current end), extend the current merged interval's end to `max(current end, this interval's end)`.
- If it doesn't overlap, push the current merged interval to the result and start a new current merged interval.
</details>

<details>
<summary>Hint 3 — implementation sketch</summary>

```js
intervals.sort((a, b) => a[0] - b[0]);
const merged = [intervals[0]];
for (let i = 1; i < intervals.length; i++) {
  const last = merged[merged.length - 1];
  if (intervals[i][0] <= last[1]) {
    last[1] = Math.max(last[1], intervals[i][1]);   // extend
  } else {
    merged.push(intervals[i]);                       // new interval
  }
}
return merged;
```
</details>

## Write your solution
→ [`../solutions/12-merge-intervals.js`](../solutions/12-merge-intervals.js)

## Follow-ups
- **Insert Interval** (Q13) — insert a new interval into an already-sorted, non-overlapping list.
- What if intervals could also have a "weight" and you wanted to merge only intervals of the same weight?
- Given the merged output, reconstruct which original intervals contributed to each merged interval.
