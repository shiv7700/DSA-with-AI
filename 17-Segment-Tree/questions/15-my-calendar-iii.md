# Q15 — My Calendar III

**Difficulty:** Medium
**Pattern:** Segment Tree with lazy propagation — range add, range max
**Expected:** O(log n) per booking · O(n) space

## Problem

A `MyCalendarThree` class tracks bookings on a timeline and answers: after each new booking, what is the maximum number of **simultaneous** events (k-booking) currently on the calendar?

- **`book(startTime, endTime)`** — add event `[startTime, endTime)` (half-open interval). Return the maximum k-booking after this addition.

## Examples

### Example 1

```
cal = new MyCalendarThree()

cal.book(10, 20)  →  1
cal.book(50, 60)  →  1
cal.book(10, 40)  →  2
cal.book(5, 15)   →  3
cal.book(5, 10)   →  3
cal.book(25, 55)  →  3
```

## Constraints

- `0 <= startTime < endTime <= 10^9`
- At most `400` calls to `book`.

## Hints

<details>
<summary>Hint 1 — difference array (simple but O(n) per query)</summary>

Maintain a difference array: increment `diff[start]` and decrement `diff[end]` for each booking. The max prefix sum of `diff` is the answer. O(n) per query. With 400 bookings and up to 10^9 range, you'd need coordinate compression.
</details>

<details>
<summary>Hint 2 — segment tree: range add, range max</summary>

Build a segment tree where each node stores the max overlap count in its range. For `book(s, e)`:
1. **Range add** `+1` to `[s, e)`.
2. **Query** the global max — `tree[root]`.

Lazy propagation: when adding `val` to a range, the max in that range increases by `val`. So `tree[node] += lazy[node]` during push-down, and `tree[node] += val` on a total overlap.
</details>

<details>
<summary>Hint 3 — dynamic nodes</summary>

Values go up to `10^9` — too large for a static array. Use a dynamic segment tree where nodes are JavaScript objects created only when first accessed. Start with just a root node and allocate children as needed.
</details>

## Write your solution

→ [`../solutions/15-my-calendar-iii.js`](../solutions/15-my-calendar-iii.js)

## Follow-ups

- **My Calendar I** — just check if a new booking overlaps any existing one. Can be solved without a segment tree.
- **My Calendar II** — allow at most 2-booking (no triple overlap). Also simpler without a segment tree.
- For `My Calendar III` specifically: is the difference-array approach ever fast enough given the constraints?
