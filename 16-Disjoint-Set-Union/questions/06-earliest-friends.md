# Q6 — Earliest Moment When Everyone Becomes Friends

**Difficulty:** Easy
**Pattern:** DSU — process events in order, wait for single component
**Expected:** O(m log m + m · α(n)) time · O(n) space

## Problem

You have `n` people labeled `0` to `n - 1`. You are given a list of friendship events `logs` where `logs[i] = [timestamp, x, y]` means person `x` and person `y` become friends at time `timestamp`.

Friendship is **transitive**: if A is friends with B, and B is friends with C, then A and C are in the same friend group.

Return the **earliest timestamp** at which every person belongs to the same friend group. If it never happens, return `-1`.

> **Real-world analogy:** think of a social network. People join and become friends over time. You want to know: at what point is everyone in the network connected? (Maybe that's when a viral message would reach everyone.)

## Examples

### Example 1

```
Input:  n = 6,  logs = [[20190101,0,1],[20190104,3,4],[20190107,2,3],[20190211,1,5],[20190224,2,4],[20190301,0,3],[20190312,1,2],[20190322,4,5]]
Output: 20190301
```

After timestamp 20190301:
- 0-1 (ts 20190101)
- 3-4 (ts 20190104)
- 2-3 (ts 20190107)
- 1-5 (ts 20190211)
- 2-4 (ts 20190224) — redundant (2 and 4 already connected via 3)
- 0-3 (ts 20190301) — this merges {0,1,5} with {2,3,4} → all 6 connected!

### Example 2

```
Input:  n = 3,  logs = [[1,0,1],[2,1,2]]
Output: 2
```

ts 1: {0,1} and {2}. ts 2: {0,1,2}. Done.

### Example 3

```
Input:  n = 4,  logs = [[1,0,1],[2,2,3]]
Output: -1
```

Group {0,1} and {2,3} never merge. Return -1.

## Constraints

- `2 <= n <= 100`
- `1 <= logs.length <= 10^4`
- `logs[i].length == 3`
- `0 <= timestamp <= 10^9`
- `0 <= x, y < n`
- `x != y`
- All timestamps are **unique**.
- The logs may **not** be sorted by timestamp.

## Hints

<details>
<summary>Hint 1 — sort first</summary>

The logs may arrive out of order. Sort them by timestamp before processing — you want to process friendships in chronological order.
</details>

<details>
<summary>Hint 2 — when to stop</summary>

After each `union(x, y)` call, check `dsu.components`. When it reaches 1, everyone is connected. Return the current timestamp.

If you finish all logs and `dsu.components > 1`, return -1.
</details>

<details>
<summary>Hint 3 — full algorithm</summary>

```
1. Sort logs by timestamp.
2. Initialize DSU(n). (components starts at n)
3. For each [timestamp, x, y] in sorted logs:
     union(x, y)
     if dsu.components === 1: return timestamp
4. return -1
```
</details>

## Write your solution

→ [`../solutions/06-earliest-friends.js`](../solutions/06-earliest-friends.js)

## Follow-ups

- The logs are guaranteed to have unique timestamps. What if they weren't — could two events at the same timestamp both contribute to "everyone becoming friends"?
- What is the dominant cost: sorting O(m log m) or the union-find operations O(m · α(n))?
- **Q13 — Make Network Connected**: a similar "when does the network become connected?" problem, but about wires.
