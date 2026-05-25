# Q23 — Open the Lock

**Difficulty:** Medium
**Pattern:** BFS state exploration — find minimum rotations to unlock a combination lock
**Expected:** O(10^4) time · O(10^4) space

## Problem

You have a lock with four circular wheels. Each wheel has digits `0` through `9`. The wheels can rotate forward or backward. Turning a wheel by one step means rotating it one position forward (e.g., `0` → `1`) or one position backward (e.g., `0` → `9`). The lock starts at `"0000"`.

You are given a list of `deadends` — combinations that will lock the mechanism permanently if the dial reaches them. You are also given a `target` combination string. Return the **minimum total number of turns** required to reach `target`, or `-1` if it is impossible.

## Examples

### Example 1
```
Input:  deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6
```
The sequence: `0000 → 0001 → 0002 → 0102 (skip) → ... → 0202`

### Example 2
```
Input:  deadends = ["8888"], target = "0009"
Output: 1
```
Turn the last wheel back once: `0000 → 0009`.

### Example 3
```
Input:  deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
```
The target is completely surrounded by deadends.

## Constraints
- `1 <= deadends.length <= 500`
- `deadends[i].length == 4`
- `target.length == 4`
- `target` is not a deadend.

## Hints

<details>
<summary>Hint 1 — model as a shortest-path problem</summary>

Each lock state is a node in a graph. Two nodes are connected if they differ by exactly one wheel rotation. You want the shortest path from `"0000"` to `target` while avoiding deadend nodes. Use BFS — it finds shortest paths in unweighted graphs.
</details>

<details>
<summary>Hint 2 — generate neighbors</summary>

For each of the four positions, generate two neighbors: one with that wheel incremented by 1 (mod 10) and one decremented by 1 (mod 10). Each state has exactly 8 neighbors.
</details>

<details>
<summary>Hint 3 — handle the "0000" deadend edge case</summary>

If `"0000"` itself is a deadend, return `-1` immediately before starting BFS. Otherwise, add `"0000"` to visited and begin.
</details>

## Write your solution
→ [`../solutions/23-combination-locker.js`](../solutions/23-combination-locker.js)

## Follow-ups
- **Minimum Genetic Mutation** — same BFS pattern on gene strings.
- **Word Ladder** — shortest transformation sequence from one word to another.
- How would the approach change if some deadends are only active after a certain number of turns?
