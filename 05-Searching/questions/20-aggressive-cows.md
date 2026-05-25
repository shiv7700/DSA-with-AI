# Q20 — Aggressive Cows / Allocate Books

**Difficulty:** Hard
**Pattern:** Binary search on the answer space — maximize minimum distance
**Expected:** O(n log(max_dist)) time · O(1) space

## Problem

### Part A — Aggressive Cows

You are given `n` stalls at positions `stalls[0..n-1]` (not necessarily sorted) and `c` cows. Place the cows in stalls such that the **minimum distance** between any two cows is **maximized**. Return that maximum possible minimum distance.

### Part B — Allocate Books (variant)

Given `n` books with `pages[i]` pages and `m` students, allocate all books to students such that:
- Each student gets at least one book.
- Books are allocated **contiguously** (no splitting a sequence).
- The **maximum pages** assigned to any student is **minimized**.

Return that minimum possible maximum.

> **These two problems are structurally identical.** In Cows: maximize the minimum. In Books: minimize the maximum. Both use binary search on the answer space + a feasibility greedy check. Recognizing this shape is the goal.

## Examples

### Aggressive Cows
```
Input:  stalls = [1, 2, 4, 8, 9], c = 3
Output: 3

Place cows at positions 1, 4, 9.
Distances: (4-1)=3, (9-4)=5. Minimum = 3. ✓
```

### Allocate Books
```
Input:  pages = [12, 34, 67, 90], m = 2
Output: 113

Student 1: [12, 34, 67] = 113 pages
Student 2: [90]          = 90 pages
Maximum = 113. (Any other split gives a larger maximum.)
```

## Constraints

**Cows:**
- `2 <= c <= n <= 10^5`
- `0 <= stalls[i] <= 10^9`

**Books:**
- `1 <= m <= n <= 10^5`
- `1 <= pages[i] <= 10^3`

## Hints

<details>
<summary>Hint 1 — Aggressive Cows: binary search on minimum distance</summary>

Binary search on the answer: `lo = 1`, `hi = max(stalls) - min(stalls)`.

For candidate minimum distance `mid`, check: "can I place `c` cows such that every pair is at least `mid` apart?"

Greedy check: sort stalls, place the first cow at `stalls[0]`, then greedily place each subsequent cow at the first stall that is at least `mid` away from the last placed cow. If you can place all `c` cows, `mid` is feasible.
</details>

<details>
<summary>Hint 2 — Allocate Books: binary search on maximum pages</summary>

Binary search on the answer: `lo = max(pages)` (at least one student gets the largest book), `hi = sum(pages)` (one student gets everything).

For candidate maximum `mid`, check: "can I allocate books to `m` students such that no student reads more than `mid` pages?"

Greedy: go left to right, assign books to the current student until adding the next book would exceed `mid`. Start a new student. If the number of students needed ≤ `m`, feasible.
</details>

<details>
<summary>Hint 3 — the maximizing vs minimizing direction</summary>

- Cows: you want the LARGEST feasible minimum distance → binary search for the rightmost value where `canPlace` is true.
- Books: you want the SMALLEST feasible maximum → binary search for the leftmost value where `canAllocate` is true.

These use opposite directions of binary search but the same template.
</details>

## Write your solution
→ [`../solutions/20-aggressive-cows.js`](../solutions/20-aggressive-cows.js)

## Follow-ups
- Implement both variants in the same file and notice the structural parallel.
- **SPOJ AGGRCOW** — the original Aggressive Cows problem.
- **LeetCode 1011** — Capacity to Ship (Q15) is another instance of the same family.
