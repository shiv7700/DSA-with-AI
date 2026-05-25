# Q27 — Unique BSTs Count (Catalan Numbers)

**Difficulty:** Medium
**Pattern:** Dynamic programming — Catalan number recurrence
**Expected:** O(n²) time · O(n) space

## Problem

Given an integer `n`, return the number of structurally unique BSTs that store values 1 to `n`.

## Examples

### Example 1

```
Input: n = 3
Output: 5
```

The 5 unique BSTs with values {1, 2, 3}:

```
  1         1          2          3        3
   \         \        / \        /        /
    2          3      1   3      1        2
     \        /                   \      /
      3      2                     2    1
```

### Example 2

```
Input: n = 1
Output: 1
```

### Example 3

```
Input: n = 4
Output: 14
```

## Constraints

- `1 <= n <= 19`

## Hints

<details>
<summary>Hint 1 — think about it by root choice</summary>

If we choose value `i` as the root (1 ≤ i ≤ n):
- The left subtree uses values `{1, ..., i-1}` → there are `i-1` of them.
- The right subtree uses values `{i+1, ..., n}` → there are `n-i` of them.

The number of unique BSTs rooted at `i` = `numTrees(i-1) * numTrees(n-i)`.

Total unique BSTs = sum over all possible roots:

```
numTrees(n) = Σ(i=1 to n) numTrees(i-1) * numTrees(n-i)
```

Base cases: `numTrees(0) = 1` (empty tree — one way), `numTrees(1) = 1`.
</details>

<details>
<summary>Hint 2 — DP table</summary>

```js
function numTrees(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;  // empty tree
  dp[1] = 1;  // single node

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];   // j is the root
    }
  }

  return dp[n];
}
```

`dp[i]` = number of unique BSTs with i nodes.

n=2: dp[2] = dp[0]*dp[1] + dp[1]*dp[0] = 1+1 = 2 ✓
n=3: dp[3] = dp[0]*dp[2] + dp[1]*dp[1] + dp[2]*dp[0] = 2+1+2 = 5 ✓
</details>

<details>
<summary>Hint 3 — closed form (Catalan numbers)</summary>

This recurrence produces the **Catalan numbers**: C(n) = (2n choose n) / (n + 1).

- C(0) = 1, C(1) = 1, C(2) = 2, C(3) = 5, C(4) = 14, C(5) = 42...

You can also compute it as: `C(n) = C(n-1) * 2(2n-1) / (n+1)`.

But the DP approach is cleaner and more memorable.
</details>

## Write your solution
→ [`../solutions/27-unique-bsts-count.js`](../solutions/27-unique-bsts-count.js)

## Follow-ups

- Q26 generates the actual trees. This problem just counts them — much cheaper. Why?
- The Catalan numbers appear in many other places in CS: number of ways to parenthesize expressions, number of ways to triangulate a polygon, number of paths on a grid that don't cross the diagonal. Look them up!
- Can you solve this with memoized recursion instead of bottom-up DP?
