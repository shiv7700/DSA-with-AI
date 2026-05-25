# Q2 — Prefix Sum Query

**Difficulty:** Easy
**Pattern:** Fenwick Tree — basic query
**Expected:** O(n log n) build · O(log n) per query · O(n) space

## Problem

You are given an integer array `nums` (0-indexed). Answer multiple **prefix sum queries**: given an index `i`, return the sum of all elements from index `0` through index `i` (inclusive).

There are **no updates** in this problem — just queries. The goal is to use a BIT so you understand the query path before mixing in updates.

## Examples

### Example 1

```
Input:  nums = [2, 4, 1, 3, 6]
Queries: [0, 1, 2, 3, 4]

query(0) → 2
query(1) → 6   (2 + 4)
query(2) → 7   (2 + 4 + 1)
query(3) → 10  (2 + 4 + 1 + 3)
query(4) → 16  (2 + 4 + 1 + 3 + 6)
```

### Example 2

```
Input:  nums = [5]

query(0) → 5
```

### Example 3 (zeros)

```
Input:  nums = [0, 0, 5, 0, 0]

query(1) → 0
query(2) → 5
query(4) → 5
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-1000 <= nums[i] <= 1000`
- `0 <= i < nums.length` for all queries.

## Hints

<details>
<summary>Hint 1 — just use query</summary>

Build the BIT from `nums` in the constructor (call `update` for each element). Then `query(i)` translates the 0-indexed `i` to 1-indexed `i + 1` and runs the descent loop.

</details>

<details>
<summary>Hint 2 — trace the descent loop manually</summary>

For `nums = [2, 4, 1, 3, 6]`, after building the BIT (1-indexed), trace `query(3)` (0-indexed = BIT index 4):

```
i = 4,  lowbit(4) = 4,  s += tree[4]  → s = sum(1..4) = 10
i = 0  → stop
```

`tree[4]` was built to hold the sum of the first 4 elements: `2 + 4 + 1 + 3 = 10`. One step!

</details>

<details>
<summary>Hint 3 — edge case</summary>

`query(0)` (0-indexed, i.e. BIT index 1) should return just `nums[0]`. Trace it:

```
i = 1,  lowbit(1) = 1,  s += tree[1]  → s = nums[0]
i = 0  → stop
```

Correct.

</details>

## Write your solution

→ [`../solutions/02-prefix-sum-query.js`](../solutions/02-prefix-sum-query.js)

## Follow-ups

- How does this compare to a plain prefix-sum array for pure read-only queries? (Hint: the plain array gets O(1) queries but the BIT gets O(log n). For static data, the plain prefix array wins. BIT shines when data changes.)
- Can you answer "how many elements in the array are ≤ k?" using a BIT? (Hint: coordinate compression.)
