# Q21 — Merge Intervals

**Difficulty:** Medium
**Pattern:** Sort by start, then merge overlapping intervals
**Expected:** O(n log n) time · O(n) space

## Problem

You are given an array of intervals where `intervals[i] = [start, end]`. Merge all **overlapping** intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.

Two intervals `[a, b]` and `[c, d]` overlap if `c <= b` (the second starts before or when the first ends).

## Examples

### Example 1
```
Input:  [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
```
Intervals `[1,3]` and `[2,6]` overlap (2 <= 3) → merge into `[1,6]`.

### Example 2
```
Input:  [[1,4],[4,5]]
Output: [[1,5]]
```
`[1,4]` and `[4,5]` touch at 4 → they overlap → merge.

### Example 3
```
Input:  [[1,4],[2,3]]
Output: [[1,4]]
```
`[2,3]` is completely inside `[1,4]`.

### Example 4
```
Input:  [[1,2],[3,4],[5,6]]
Output: [[1,2],[3,4],[5,6]]
```
No overlaps — output equals input.

## Constraints
- `1 <= intervals.length <= 10^4`
- `intervals[i].length === 2`
- `0 <= start <= end <= 10^4`

## Hints

<details>
<summary>Hint 1 — sort first</summary>

If you sort intervals by their start value, you know that any interval that can overlap the current one must come right after it. You don't need to compare every pair.

After sorting by start: iterate through the sorted intervals and greedily merge.
</details>

<details>
<summary>Hint 2 — the merge condition</summary>

After sorting, maintain a `merged` result array. For each interval `[start, end]`:

- If `merged` is empty, add `[start, end]`.
- Otherwise, let `[lastStart, lastEnd]` be the last interval in `merged`.
  - If `start <= lastEnd` → they overlap: update `lastEnd = Math.max(lastEnd, end)`.
  - If `start > lastEnd` → no overlap: push `[start, end]` as a new interval.
</details>

<details>
<summary>Hint 3 — code skeleton</summary>

```js
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);  // sort by start

  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    const [start, end] = intervals[i];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);   // extend the last interval
    } else {
      result.push([start, end]);           // new non-overlapping interval
    }
  }

  return result;
}
```
</details>

## Write your solution
→ [`../solutions/21-merge-intervals.js`](../solutions/21-merge-intervals.js)

## Follow-ups
- **Insert Interval**: given a sorted non-overlapping list and one new interval, insert it and merge if needed — all in O(n).
- **Count overlapping intervals at a point**: given a list of intervals and a query point, how many intervals contain that point?
- What if intervals can have fractional endpoints (floats)? Does your solution still work?
