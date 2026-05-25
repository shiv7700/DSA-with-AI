# Q24 — First Missing Positive

**Difficulty:** Hard
**Pattern:** Use the array's indexes as a hash (cyclic placement)
**Expected:** O(n) time · O(1) extra space

## Problem

Given an unsorted integer array `nums`, return the **smallest positive integer** that does **not** appear in the array.

The constraints rule out the easy solutions:
- A sort would be O(n log n) — too slow.
- A `Set` would be O(n) extra space — not allowed.

You must achieve **O(n) time and O(1) extra space**.

## Examples

### Example 1
```
Input:  [1, 2, 0]
Output: 3
```

### Example 2
```
Input:  [3, 4, -1, 1]
Output: 2
```
`1` is present, but `2` is missing.

### Example 3
```
Input:  [7, 8, 9, 11, 12]
Output: 1
```
Nothing in the range `[1..n]` is present, so the answer is `1`.

### Example 4
```
Input:  [1, 1]
Output: 2
```

### Example 5 (edge cases)
```
Input:  []         →  1
Input:  [0]        →  1
Input:  [-1, -2]   →  1
```

## Constraints
- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- O(n) time, O(1) extra space.

## Hints

<details>
<summary>Hint 1 — the key observation</summary>

The answer must be in the range `[1, n + 1]`, where `n = nums.length`. Any values that are ≤ 0 or > n are **irrelevant** to the answer. (Why? Because at best, the array can cover the values `1, 2, ..., n` — making the answer `n + 1`. At worst, even smaller positive integers are missing.)
</details>

<details>
<summary>Hint 2 — place each value at its "home" index</summary>

We want to rearrange the array so that, ideally, `nums[i] == i + 1`. Then a scan finds the first index where this is violated — that's the missing value.

Walk through the array. For each position `i`, while `nums[i]` is in the range `[1, n]` **and** it's not already at its home position (i.e., `nums[nums[i] - 1] != nums[i]`), swap `nums[i]` with `nums[nums[i] - 1]`. This sends each value to its correct home.

After the pass, scan: the first `i` where `nums[i] != i + 1` gives answer `i + 1`. If everything matches, the answer is `n + 1`.
</details>

<details>
<summary>Hint 3 — careful with the swap condition</summary>

Use `nums[nums[i] - 1] !== nums[i]` (compare the value already at home), **not** `i !== nums[i] - 1`. The first version handles duplicates without infinite-looping.
</details>

## Write your solution
→ [`../solutions/24-first-missing-positive.js`](../solutions/24-first-missing-positive.js)

## Follow-ups
- **First k Missing Positives** — return the first `k` missing positive integers.
- **Find All Missing Numbers in [1..n]** — uses the same family of tricks (see Q17's negation idea).
