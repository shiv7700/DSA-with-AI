# Q18 — Open the Lock

**Difficulty:** Medium
**Pattern:** BFS on state space (each lock combination is a node)
**Expected:** O(10^4) time · O(10^4) space

## Problem

You have a lock with 4 circular dials, each displaying digits `0`–`9`. The lock starts at `'0000'`. Each move, you can rotate any single dial one step forward or one step backward (`'0'` wraps to `'9'`, `'9'` wraps to `'0'`).

You are given:
- `deadends`: an array of strings — combinations you must never land on (the lock will seize if you do).
- `target`: the target combination string.

Return the **minimum number of turns** needed to reach `target`. If it is impossible, return `-1`.

**Signature:**
```js
function openLock(deadends, target) { ... }
```

## Examples

### Example 1
```
Input:  deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6

One shortest path: "0000" → "1000" → "1100" → "1200" → "1201" → "1202" → "0202"
```

### Example 2
```
Input:  deadends = ["8888"], target = "0009"
Output: 1
("0000" → "0009" — one backward turn on the last dial)
```

### Example 3
```
Input:  deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
(Can't reach 8888 without landing on a deadend.)
```

## Constraints
- `1 <= deadends.length <= 500`
- `deadends[i].length == 4`
- `target.length == 4`
- `target` is not in `deadends`.
- `target != "0000"`

## Hints

<details>
<summary>Hint 1 — this is a BFS on a graph</summary>

Think of every 4-digit combination as a node in a graph. Two nodes are connected if you can reach one from the other in exactly one turn (rotating one dial one step). You want the shortest path from `'0000'` to `target`, avoiding deadend nodes.

Shortest path on an unweighted graph = BFS.
</details>

<details>
<summary>Hint 2 — generating neighbors</summary>

From any state (4-character string), there are exactly 8 neighbors: each of the 4 dials turned +1 or -1.

```js
function neighbors(state) {
  const result = [];
  for (let i = 0; i < 4; i++) {
    const d = parseInt(state[i]);
    for (const delta of [1, -1]) {
      const newDigit = (d + delta + 10) % 10;
      result.push(state.slice(0, i) + newDigit + state.slice(i + 1));
    }
  }
  return result;
}
```
</details>

<details>
<summary>Hint 3 — BFS setup</summary>

1. Convert `deadends` to a `Set` for O(1) lookup.
2. If `'0000'` is a deadend, return `-1` immediately.
3. Use a queue of states and a `visited` Set.
4. BFS level by level (each level = one turn). Return the level when you reach `target`.
</details>

## Write your solution
→ [`../solutions/18-open-the-lock.js`](../solutions/18-open-the-lock.js)

## Follow-ups
- **Bidirectional BFS**: start BFS from both `'0000'` and `target` simultaneously, expanding the smaller frontier each step. This can reduce the search space dramatically. Try implementing it.
- What is the actual graph's size (number of nodes)? Is there a state that's unreachable even without deadends?
- How does this problem generalize to "word ladder" (Q25)?
