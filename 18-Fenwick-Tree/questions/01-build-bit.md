# Q1 — Build a BIT from an Array

**Difficulty:** Easy
**Pattern:** Fenwick Tree — construction
**Expected:** O(n log n) time · O(n) space

## Problem

Given a 0-indexed integer array `nums` of length `n`, build a Binary Indexed Tree (Fenwick Tree) that supports:

1. `update(i, delta)` — add `delta` to the element at 0-indexed position `i`.
2. `query(i)` — return the prefix sum of `nums[0..i]` (0-indexed), i.e. the sum of the first `i + 1` elements.
3. `rangeQuery(l, r)` — return the sum of `nums[l..r]` (0-indexed, both inclusive).

Implement the `BIT` class with a `constructor(nums)` that initialises the tree from `nums`.

> **Why this problem matters:** building and querying a BIT correctly is the foundation of every other problem in this chapter. Get this solid first.

## Examples

### Example 1

```
nums = [1, 3, 5, 7, 9, 11]

bit.query(0)        → 1          (just nums[0])
bit.query(2)        → 9          (1 + 3 + 5)
bit.query(5)        → 36         (1 + 3 + 5 + 7 + 9 + 11)
bit.rangeQuery(2,4) → 21         (5 + 7 + 9)
bit.update(1, 2)    → (adds 2 to nums[1], so nums[1] becomes 5)
bit.query(2)        → 11         (1 + 5 + 5)
```

### Example 2

```
nums = [0, 0, 0]

bit.query(2)        → 0
bit.update(1, 10)
bit.rangeQuery(1,2) → 10
```

### Example 3 (single element)

```
nums = [42]

bit.query(0)        → 42
bit.update(0, -10)
bit.query(0)        → 32
```

## Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `-100 <= delta <= 100`
- All `query` and `rangeQuery` calls use valid in-bounds indexes.

## Hints

<details>
<summary>Hint 1 — indexing</summary>

The BIT class internally uses **1-indexed** positions. When your public methods receive a 0-indexed `i`, you need to convert it: use `i + 1` when calling the internal BIT operations.

</details>

<details>
<summary>Hint 2 — building from the array</summary>

The simplest correct approach is:
1. Initialise `this.tree = new Array(n + 1).fill(0)`.
2. For each element in `nums`, call your internal `_update(i + 1, nums[i])`.

This is O(n log n). If you want O(n), look at the "propagate" trick in `notes.md` Lesson 17 — but O(n log n) is fine for this problem.

</details>

<details>
<summary>Hint 3 — the two loops</summary>

The internal `_update` loop adds `lowbit(i)` each step. The internal `_query` loop subtracts `lowbit(i)` each step. Both terminate because `lowbit(i) >= 1` for all `i >= 1`.

```
update: for (; i <= n; i += i & -i) tree[i] += delta;
query:  for (; i > 0; i -= i & -i) s += tree[i];
```

</details>

## Write your solution

→ [`../solutions/01-build-bit.js`](../solutions/01-build-bit.js)

## Follow-ups

- Can you build the BIT in O(n) instead of O(n log n)? (Hint: for each index `i`, after setting `tree[i]`, propagate directly to `tree[i + lowbit(i)]`.)
- What happens if you call `update` with a negative `delta`? Does the BIT still work?
- How would you implement a `set(i, value)` operation (set to an exact value rather than adding a delta)? What extra information do you need to track?
