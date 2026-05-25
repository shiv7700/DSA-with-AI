# Q22 — Design Hit Counter

**Difficulty:** Medium
**Pattern:** Queue (sliding window over time) — evict events older than 5 minutes
**Expected:** O(1) amortized per hit/getHits · O(300) space

## Problem

Design a hit counter which counts the number of hits received in the **past 5 minutes** (the past `300` seconds).

| Method | Description |
|--------|-------------|
| `hit(timestamp)` | Record a hit at the given `timestamp` (in seconds). Multiple hits can have the same timestamp. |
| `getHits(timestamp)` | Return the number of hits in the interval `[timestamp - 299, timestamp]` (inclusive). |

**Rules:**
- Timestamps are called in **non-decreasing order**.
- Each hit and getHits call is given with a valid `timestamp`.

**Signature:**
```js
class HitCounter {
  constructor() { ... }
  hit(timestamp) { ... }
  getHits(timestamp) { ... }
}
```

## Examples

```
const counter = new HitCounter();

counter.hit(1);
counter.hit(2);
counter.hit(3);
counter.getHits(4)    // 3   (hits at 1, 2, 3 are all within the past 300s)
counter.hit(300);
counter.getHits(300)  // 4   (hits at 1, 2, 3, 300)
counter.getHits(301)  // 3   (hit at 1 is now outside the 300s window)
```

## Constraints
- `1 <= timestamp <= 2 * 10^9`
- All calls are made in non-decreasing order of `timestamp`.
- At most `300` calls to `hit` and `getHits` combined.

## Hints

<details>
<summary>Hint 1 — use a queue of timestamps</summary>

Store each hit's timestamp in a queue. When `getHits(t)` is called, evict any timestamps from the **front** of the queue that are older than `t - 299`. The queue's size is the answer.

This is a classic sliding-window-over-time approach.
</details>

<details>
<summary>Hint 2 — evicting old hits</summary>

Since timestamps are non-decreasing, old hits are always at the front of the queue:

```js
getHits(timestamp) {
  while (this.queue.length && this.queue[0] <= timestamp - 300) {
    this.queue.shift();
  }
  return this.queue.length;
}
```

Also call this cleanup logic inside `hit()` to keep the queue lean.
</details>

<details>
<summary>Hint 3 — optimization for many hits per second</summary>

If millions of hits can arrive at the same timestamp, storing each individually wastes memory. Instead, store `(timestamp, count)` pairs. This reduces space to O(unique_timestamps_in_window).

For the constraints above (300 calls total), the simple queue is fine.
</details>

## Write your solution
→ [`../solutions/22-design-hit-counter.js`](../solutions/22-design-hit-counter.js)

## Follow-ups
- What if hits can arrive **out of order** (backfill)? How would you change the data structure?
- **Rate limiter**: how would you use this to implement "at most K requests per 5 minutes per user"?
- What if you need hit counts at multiple time granularities (per second, per minute, per hour) simultaneously?
