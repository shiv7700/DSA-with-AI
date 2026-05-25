# Q13 — Insert Interval

**Difficulty:** Medium
**Pattern:** Greedy · Linear Scan with Merge
**Expected:** O(n) time · O(n) space

## Problem

You are given an array of **non-overlapping** intervals `intervals` sorted in ascending order by start time, and a single `newInterval = [start, end]`.

Insert `newInterval` into `intervals` (merging if necessary) so that the result is still sorted and non-overlapping. Return the updated list.

> **Note:** you do not need to sort first — the input is already sorted.

## Examples

### Example 1
```
Input:  intervals = [[1,3],[6,9]],  newInterval = [2,5]
Output: [[1,5],[6,9]]
```
[2,5] overlaps [1,3] → merged to [1,5]. No overlap with [6,9].

### Example 2
```
Input:  intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]],  newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
```
[4,8] overlaps [3,5], [6,7], [8,10] → all merged to [3,10].

### Example 3
```
Input:  intervals = [],  newInterval = [5,7]
Output: [[5,7]]
```

### Example 4
```
Input:  intervals = [[1,5]],  newInterval = [2,3]
Output: [[1,5]]
```
New interval is fully inside an existing one.

## Constraints
- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^5`
- `intervals` is sorted by `start_i` and has no overlapping intervals.
- `newInterval.length == 2`
- `0 <= start <= end <= 10^5`

## Hints

<details>
<summary>Hint 1 — three phases</summary>

Because the list is already sorted, you can handle it in three phases:

1. **Before the new interval:** copy all intervals that end before `newInterval` starts.
2. **Overlap zone:** merge all intervals that overlap `newInterval` into one.
3. **After the new interval:** copy all intervals that start after the merged interval ends.
</details>

<details>
<summary>Hint 2 — overlap condition</summary>

An existing interval `[a, b]` overlaps with `newInterval = [s, e]` if `a <= e` AND `b >= s`. Equivalently: they don't overlap only if `b < s` (existing ends before new starts) or `a > e` (existing starts after new ends).
</details>

<details>
<summary>Hint 3 — implementation sketch</summary>

```js
const result = [];
let i = 0, n = intervals.length;
let [s, e] = newInterval;

// Phase 1: intervals ending before new starts
while (i < n && intervals[i][1] < s) result.push(intervals[i++]);

// Phase 2: merge overlapping
while (i < n && intervals[i][0] <= e) {
  s = Math.min(s, intervals[i][0]);
  e = Math.max(e, intervals[i][1]);
  i++;
}
result.push([s, e]);

// Phase 3: intervals starting after new ends
while (i < n) result.push(intervals[i++]);

return result;
```
</details>

## Write your solution
→ [`../solutions/13-insert-interval.js`](../solutions/13-insert-interval.js)

## Follow-ups
- What if the input list were not sorted? (Sort it first — now O(n log n).)
- **Merge Intervals** (Q12) — merge arbitrary overlapping intervals from scratch.
