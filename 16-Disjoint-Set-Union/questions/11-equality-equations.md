# Q11 — Satisfiability of Equality Equations

**Difficulty:** Medium
**Pattern:** DSU — build groups from equality, check against inequality
**Expected:** O(n · α(26)) = O(n) time · O(1) space  (only 26 variables)

## Problem

You are given a list of strings `equations` where each equation is either `"a==b"` or `"a!=b"` (where `a` and `b` are single lowercase letters).

Determine whether it is possible to assign values to the variables such that **all equations are satisfied simultaneously**.

Return `true` if satisfiable, `false` otherwise.

## Examples

### Example 1

```
Input:  equations = ["a==b","b!=c","b==c"]
Output: false
```

`a==b` and `b==c` implies `a==c`. But `b!=c` contradicts `b==c`.

### Example 2

```
Input:  equations = ["c==c","b==d","x!=z"]
Output: true
```

Assign: c=1, b=d=2, x=3, z=4. All satisfied.

### Example 3

```
Input:  equations = ["a==b","b==c","a==c"]
Output: true
```

All three are consistent: a=b=c.

### Example 4

```
Input:  equations = ["a!=a"]
Output: false
```

`a` can't be both equal and not equal to itself.

## Constraints

- `1 <= equations.length <= 500`
- `equations[i].length == 4`
- `equations[i][0]` and `equations[i][3]` are lowercase English letters.
- `equations[i][1]` is either `'='` or `'!'`.
- `equations[i][2]` is always `'='`.

## Hints

<details>
<summary>Hint 1 — two passes: equality first, then check inequalities</summary>

**Pass 1:** process only `"a==b"` equations. Union the two variables.

**Pass 2:** process only `"a!=b"` equations. For each, check `connected(a, b)`. If they ARE connected (same group), we have a contradiction → return `false`.

Return `true` if no contradiction found.
</details>

<details>
<summary>Hint 2 — indexing letters</summary>

There are only 26 possible variables (`a` to `z`). Create `DSU(26)`.

Map each letter to its index: `ch.charCodeAt(0) - 97`.

So `'a'` → 0, `'b'` → 1, ..., `'z'` → 25.
</details>

<details>
<summary>Hint 3 — why two-pass (not one-pass)?</summary>

Consider `["a!=b", "a==b"]`. If you process left to right, you'd see the inequality first, immediately check — but at that point, `a` and `b` haven't been unioned yet (they're separate), so no contradiction found. Then you union them, but never check again.

By processing ALL equalities first, you build the complete union structure before checking any inequality. This correctly catches all contradictions.
</details>

## Write your solution

→ [`../solutions/11-equality-equations.js`](../solutions/11-equality-equations.js)

## Follow-ups

- What if variables were arbitrary strings instead of single letters? How would you adapt the solution?
- Can you solve this without DSU using a graph coloring approach?
