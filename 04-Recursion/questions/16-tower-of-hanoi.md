# Q16 — Tower of Hanoi

**Difficulty:** Medium
**Pattern:** Divide and conquer recursion — reduce n disks to n-1 disks
**Expected:** O(2^n) time (minimum possible moves) · O(n) space (call stack)

## Problem

In the Tower of Hanoi puzzle:
- There are 3 pegs: **source** (A), **auxiliary** (B), and **destination** (C).
- There are `n` disks stacked on the source peg, the largest at the bottom and the smallest at the top.

Rules:
1. Move only one disk at a time.
2. A larger disk can never be placed on top of a smaller disk.
3. You can use the auxiliary peg as a holding area.

Write a recursive function `hanoi(n, source, destination, auxiliary)` that:
1. **Prints** each move in the format: `"Move disk n from A to C"`.
2. **Returns** the total number of moves made.

> **Why this problem?** Tower of Hanoi is the quintessential example of a problem that looks impossible at first, then collapses into a clean 3-line recursive solution. Once you see the insight, you'll feel the real power of the recursive leap of faith. The minimum number of moves required is exactly `2^n - 1`.

## Examples

### Example 1 — n=1
```
Input:  n=1, source='A', destination='C', auxiliary='B'
Output (printed):
Move disk 1 from A to C
Total moves: 1
```

### Example 2 — n=2
```
Output (printed):
Move disk 1 from A to B
Move disk 2 from A to C
Move disk 1 from B to C
Total moves: 3
```

### Example 3 — n=3
```
Output (printed):
Move disk 1 from A to C
Move disk 2 from A to B
Move disk 1 from C to B
Move disk 3 from A to C
Move disk 1 from B to A
Move disk 2 from B to C
Move disk 1 from A to C
Total moves: 7
```

## Constraints
- `1 <= n <= 20` (for printing; n=20 prints over a million lines!)
- For large n, just return the count without printing.
- Time: O(2^n) — you cannot do better than `2^n - 1` moves.

## Hints

<details>
<summary>Hint 1 — the key insight (read this carefully)</summary>

To move `n` disks from A to C, think about the biggest disk (disk n). It needs to end up on C alone — nothing else can be on top of C when it arrives.

So you must:
1. Move the top `n-1` disks from A to B (using C as aux). This frees the big disk.
2. Move the big disk from A to C.
3. Move the `n-1` disks from B to C (using A as aux).

That's it. Three steps, and step 1 and 3 are the **same problem** with one fewer disk.
</details>

<details>
<summary>Hint 2 — the 3-line recursive solution</summary>

```js
function hanoi(n, source, destination, auxiliary) {
  if (n === 1) {
    console.log(`Move disk 1 from ${source} to ${destination}`);
    return 1;
  }
  const left  = hanoi(n - 1, source, auxiliary, destination);  // step 1
  console.log(`Move disk ${n} from ${source} to ${destination}`);  // step 2
  const right = hanoi(n - 1, auxiliary, destination, source);  // step 3
  return left + 1 + right;
}
```

Notice how the aux and destination peg names rotate to correctly label each subproblem.
</details>

<details>
<summary>Hint 3 — tracing n=2 by hand</summary>

```
hanoi(2, 'A', 'C', 'B')
  step 1: hanoi(1, 'A', 'B', 'C')
    n=1: prints "Move disk 1 from A to B", returns 1
  prints "Move disk 2 from A to C"
  step 3: hanoi(1, 'B', 'C', 'A')
    n=1: prints "Move disk 1 from B to C", returns 1
  total: 1 + 1 + 1 = 3 moves
```
</details>

<details>
<summary>Hint 4 — why 2^n - 1 is optimal</summary>

Each call to `hanoi(n, ...)` makes 2 calls to `hanoi(n-1, ...)` plus 1 move. So:
- `T(1) = 1`
- `T(n) = 2 × T(n-1) + 1`

Solving: `T(n) = 2^n - 1`.

For n=3: `2^3 - 1 = 7` moves. For n=20: `2^20 - 1 = 1,048,575` moves. You literally cannot do it faster — this is mathematically proven.
</details>

## Write your solution
→ [`../solutions/16-tower-of-hanoi.js`](../solutions/16-tower-of-hanoi.js)

## Follow-ups
- Verify that your function returns exactly `2^n - 1` for all n.
- If `n = 64` (the legend of the monks who would end the world when done), how many moves is that? `2^64 - 1 ≈ 1.8 × 10^19`. At one move per second, that's about 585 billion years.
- Frame-Stewart algorithm: Tower of Hanoi with 4 pegs — can you do it in fewer moves?
