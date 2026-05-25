# Q18 — Couples Holding Hands

**Difficulty:** Medium
**Pattern:** DSU — count swaps = components - 1
**Expected:** O(n · α(n)) time · O(n) space

## Problem

`n` couples sit in `2n` seats arranged in a row. Seats are numbered `0` to `2n - 1`. The input array `row` tells you who is sitting in each seat.

Couples are numbered `0` to `n - 1`. Couple `k` consists of persons `2k` and `2k + 1`.

Every minute, you can swap the positions of any two people. Return the **minimum number of swaps** so that every couple is sitting side by side.

> **The goal:** after all swaps, for each bench of two adjacent seats (0-1, 2-3, 4-5, ...), the two people sitting there must form a couple.

## Examples

### Example 1

```
Input:  row = [0,2,1,3]
Output: 1
```

Swap seats 1 and 2 (persons 2 and 1) → [0,1,2,3]. Now bench 0-1 has persons 0 and 1 (couple 0) ✅, bench 2-3 has persons 2 and 3 (couple 1) ✅.

### Example 2

```
Input:  row = [3,2,0,1]
Output: 0
```

Bench 0-1: persons 3 and 2 → couple 1 ✅. Bench 2-3: persons 0 and 1 → couple 0 ✅. Already correct!

### Example 3

```
Input:  row = [5,4,2,6,3,1,0,7]
Output: 2
```

## Constraints

- `2 <= n <= 30`  (so `2n` seats)
- `n` is even.
- `row` is a permutation of `0` to `2n - 1`.

## Hints

<details>
<summary>Hint 1 — think in terms of benches</summary>

Group the seats into `n` benches: bench 0 = seats (0,1), bench 1 = seats (2,3), etc.

Each bench holds two people. Person `p` belongs to couple `Math.floor(p / 2)`.

A bench is "correct" if both people belong to the same couple. Otherwise, the two couples on the bench need to be "resolved".
</details>

<details>
<summary>Hint 2 — union the couples that share a bench</summary>

For each bench (adjacent pair), find which two couples are sitting there. If they're different couples, union them. If they're the same couple, the bench is already correct.

After all unions: the answer is `(total couples) - (number of DSU components)`.

Why? Each connected component of size `s` needs `s - 1` swaps. Sum across all components: total swaps = `n - components`.
</details>

<details>
<summary>Hint 3 — worked example</summary>

`row = [5,4,2,6,3,1,0,7]` → benches: (5,4),(2,6),(3,1),(0,7)

- Bench 0: persons 5,4 → couples 2,2 → same couple. Already correct. No union.
- Bench 1: persons 2,6 → couples 1,3 → different. union(1,3).
- Bench 2: persons 3,1 → couples 1,0 → different. union(1,0). Now {0,1,3} in one component.
- Bench 3: persons 0,7 → couples 0,3 → same component (0 and 3 are already unioned). Correct seat.

Wait, that gives 1 component of size 3 and 1 component of size 1 (couple 2 is isolated).
Total swaps = 4 - 2 = 2. ✅
</details>

## Write your solution

→ [`../solutions/18-couples-holding-hands.js`](../solutions/18-couples-holding-hands.js)

## Follow-ups

- Prove that the minimum swaps for a connected component of `s` coupled couples is exactly `s - 1`.
- Can you solve this greedily without DSU? (Yes — but DSU gives a cleaner, more general framework.)
