# Q15 — Task Scheduler

**Difficulty:** Medium
**Pattern:** Max-heap by frequency + cooldown queue
**Expected:** O(n log 26) = O(n) time · O(1) space (at most 26 distinct tasks)

## Problem

You are given a list of CPU tasks, each represented by a capital letter `A` through `Z`. Each task takes exactly one unit of time. Between two identical tasks there must be a cooldown period of at least `n` units (so the CPU must wait at least `n` time units before running the same task again).

During the cooldown period the CPU can run a different task or stay idle.

Return the **minimum number of time units** required to finish all tasks.

## Examples

### Example 1
```
Input:  tasks = ["A","A","A","B","B","B"],  n = 2
Output: 8
```
```
A → B → idle → A → B → idle → A → B
Time:  1   2     3   4   5     6   7   8
```
Each A and B must be separated by 2 units.

### Example 2
```
Input:  tasks = ["A","A","A","B","B","B"],  n = 0
Output: 6
```
No cooldown — just run tasks back to back.

### Example 3
```
Input:  tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"],  n = 2
Output: 16
```
A is the most frequent (6 times). It forces a certain structure.

## Constraints
- `1 <= tasks.length <= 10^4`
- `tasks[i]` is an uppercase English letter.
- `0 <= n <= 100`

## Hints

<details>
<summary>Hint 1 — greedy: always schedule the most frequent available task</summary>

At each time unit, pick the task with the highest remaining count that is not in its cooldown period. This greedy choice minimizes idle time.

A max-heap (ordered by remaining count) makes "pick the most frequent available" O(log 26) = O(1).
</details>

<details>
<summary>Hint 2 — tracking cooldowns with a queue</summary>

When you execute a task, it must wait `n` units before it can run again. Keep a queue of `[remainingCount, readyAtTime]` pairs. At each time unit:

1. If the queue front is ready (current time >= readyAtTime), move it back to the heap.
2. If the heap is not empty, pop the most frequent task, execute it, and push `[count - 1, currentTime + n + 1]` to the queue (if count - 1 > 0).
3. If the heap is empty, the CPU is idle (still advance time).
</details>

<details>
<summary>Hint 3 — mathematical shortcut (no simulation needed)</summary>

Let `maxFreq` = frequency of the most common task. Let `maxCount` = number of tasks with that frequency.

```
result = max(
  tasks.length,
  (maxFreq - 1) * (n + 1) + maxCount
)
```

This formula works because the most frequent task determines the "frame" structure. Tasks fill the frames, and anything leftover fits without adding idle time. If total tasks exceed the frame structure, no idles are needed at all.
</details>

## Write your solution
→ [`../solutions/15-task-scheduler.js`](../solutions/15-task-scheduler.js)

## Follow-ups
- **Reorganize String** (Q16) — a similar problem where no two adjacent characters can be the same.
- Can you prove why the mathematical shortcut formula is correct?
- What if different tasks had different durations?
