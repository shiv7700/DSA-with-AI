# Q13 — Last Stone Weight

**Difficulty:** Easy
**Pattern:** Max-heap simulation
**Expected:** O(n log n) time · O(n) space

## Problem

You are given an array of integers `stones` where `stones[i]` is the weight of the `i`-th stone.

In each round, you pick the two **heaviest** stones and smash them together. Suppose the two heaviest stones have weights `x` and `y` where `x <= y`:

- If `x == y`, both stones are destroyed.
- If `x != y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.

The game ends when there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return `0`.

## Examples

### Example 1
```
Input:  [2, 7, 4, 1, 8, 1]
Output: 1
```
```
Round 1: heaviest = 8, 7  →  8-7=1  →  stones = [2, 4, 1, 1, 1]
Round 2: heaviest = 4, 2  →  4-2=2  →  stones = [2, 1, 1, 1]
Round 3: heaviest = 2, 1  →  2-1=1  →  stones = [1, 1, 1]
Round 4: heaviest = 1, 1  →  destroyed  →  stones = [1]
Result: 1
```

### Example 2
```
Input:  [1]
Output: 1
```

### Example 3
```
Input:  [1, 1]
Output: 0
```
Both destroyed.

## Constraints
- `1 <= stones.length <= 30`
- `1 <= stones[i] <= 1000`

## Hints

<details>
<summary>Hint 1 — which heap type fits this problem?</summary>

You need the two largest stones each round. A **max-heap** gives you the maximum in O(1) and removes it in O(log n).

Pop twice to get `y` (largest) and `x` (second largest). If `y - x > 0`, push the remainder back.
</details>

<details>
<summary>Hint 2 — termination condition</summary>

Keep looping while the heap has more than one element. When the loop ends:
- If the heap is empty, return `0`.
- Otherwise, return `heap.peek()`.
</details>

## Write your solution
→ [`../solutions/13-last-stone-weight.js`](../solutions/13-last-stone-weight.js)

## Follow-ups
- **Last Stone Weight II** (LeetCode 1049) — a harder variant where you can partition stones into two groups and want to minimize the leftover. Requires dynamic programming.
- What is the maximum number of rounds that can occur given `n` stones?
