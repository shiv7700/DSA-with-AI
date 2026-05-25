# Q21 — Task Scheduler

**Difficulty:** Medium
**Pattern:** Greedy + max-heap (priority queue) — always run the most-frequent remaining task
**Expected:** O(n log 26) ≈ O(n) time · O(1) space (at most 26 distinct tasks)

## Problem

You are given a characters array `tasks` representing CPU tasks to execute, and a non-negative integer `n` representing the cooldown interval.

Each task takes **1 unit of time** to execute. The CPU must wait at least `n` units between two tasks of the **same type**. The CPU may be idle if no task can be run.

Return the **minimum number of time units** needed to finish all tasks.

**Signature:**
```js
function leastInterval(tasks, n) { ... }
```

## Examples

### Example 1
```
Input:  tasks = ["A","A","A","B","B","B"], n = 2
Output: 8

Schedule: A → B → idle → A → B → idle → A → B
Time:     1   2     3    4   5     6    7   8
```

### Example 2
```
Input:  tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
(No cooldown — just run all 6 tasks consecutively.)
```

### Example 3
```
Input:  tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
```

## Constraints
- `1 <= tasks.length <= 10^4`
- `tasks[i]` is uppercase English letter.
- `0 <= n <= 100`

## Hints

<details>
<summary>Hint 1 — key insight: always schedule the most frequent task available</summary>

Greedy: at each time step, run whichever task type has the highest remaining count and is off cooldown. This is the correct greedy choice — it minimizes idle time.

Use a **max-heap** (priority queue by count) to always know the most frequent available task in O(log 26) = O(1).
</details>

<details>
<summary>Hint 2 — simulation with a cooldown queue</summary>

Pair the heap with a **cooldown queue** of `(task_count, available_at_time)`:

1. Pop the most frequent task from the heap, run it, push `(count - 1, current_time + n + 1)` to the cooldown queue.
2. If the cooldown queue's front is available now, push it back to the heap.
3. If the heap is empty but the cooldown queue has tasks, add idle time.

Continue until heap and cooldown queue are both empty.
</details>

<details>
<summary>Hint 3 — math shortcut (O(n) without simulation)</summary>

Let `f` = frequency of the most common task. Let `maxCount` = number of tasks with that frequency.

```
answer = max(tasks.length, (f - 1) * (n + 1) + maxCount)
```

The formula computes how much "space" the most frequent task creates, then fills it in. If there are enough diverse tasks to fill the gaps, no idle time is needed. This is O(n) without any heap.
</details>

## Write your solution
→ [`../solutions/21-task-scheduler.js`](../solutions/21-task-scheduler.js)

## Follow-ups
- Can you implement both the heap-simulation approach and the math formula?
- What if different tasks have different durations (not all 1 unit)? How does the problem change?
- **Reorganize String** (Q32) is closely related — no two adjacent characters the same.
