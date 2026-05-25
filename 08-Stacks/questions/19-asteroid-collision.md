# Q19 — Asteroid Collision

**Difficulty:** Medium
**Pattern:** Stack — simulate collisions
**Expected:** O(n) time · O(n) space

## Problem

You are given an array `asteroids` of integers representing asteroids in a row. For each asteroid, the absolute value represents its **size**, and the sign represents its **direction** — positive means moving right, negative means moving left.

Asteroids move at the same speed. When two asteroids collide, the smaller one explodes. If they are the same size, **both** explode. Two asteroids moving in the same direction never meet.

Return the state of the asteroids after all collisions.

## Examples

### Example 1
```
Input:  [5, 10, -5]
Output: [5, 10]
```
`10` and `-5` collide → `10` survives (10 > 5). `5` and `10` don't collide (both moving right).

### Example 2
```
Input:  [8, -8]
Output: []
```
`8` and `-8` collide → both explode (equal size).

### Example 3
```
Input:  [10, 2, -5]
Output: [10]
```
`2` and `-5` collide → `-5` survives (5 > 2). Then `10` and `-5` collide → `10` survives (10 > 5).

### Example 4
```
Input:  [-2, -1, 1, 2]
Output: [-2, -1, 1, 2]
```
No collisions: left-movers are already on the left, right-movers on the right.

## Constraints
- `2 <= asteroids.length <= 10^4`
- `-1000 <= asteroids[i] <= 1000`
- `asteroids[i] !== 0`

## Hints

<details>
<summary>Hint 1 — when does a collision happen?</summary>

A collision only happens when a **right-moving** asteroid is immediately followed (eventually) by a **left-moving** asteroid that catches up to it.

Concretely: a collision can happen when:
- Stack's top is positive (right-moving)
- Current asteroid is negative (left-moving)
</details>

<details>
<summary>Hint 2 — the algorithm</summary>

Use a stack to keep "surviving" asteroids.

For each asteroid `a`:
- If `a > 0` or stack is empty or stack top is negative: push `a` (no collision possible).
- Otherwise (`a < 0` and stack top > 0): collision!
  - If `|a|` > stack top: pop the stack (right-mover explodes), and check again with the same `a` (it might collide with the next one).
  - If `|a|` == stack top: pop the stack (both explode). Don't push `a`.
  - If `|a|` < stack top: `a` explodes. Don't push `a`.
</details>

<details>
<summary>Hint 3 — trace [10, 2, -5]</summary>

```
a=10:  stack=[], push 10.      Stack: [10]
a=2:   top=10 > 0, push 2.    Stack: [10, 2]
a=-5:  top=2 > 0, collision!
       |−5|=5 > 2 → pop 2, 2 explodes. Stack: [10]
       top=10 > 0, collision!
       |−5|=5 < 10 → -5 explodes. Done.
Stack: [10]  → result: [10] ✅
```
</details>

## Write your solution
→ [`../solutions/19-asteroid-collision.js`](../solutions/19-asteroid-collision.js)

## Follow-ups
- What if asteroids could also be stationary (value `0`)? Define a collision rule and implement it.
- What if collision produced a new asteroid of combined size? How would your solution change?
