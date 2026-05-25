# Q6 — Move Zeros to the End

**Difficulty:** Easy
**Pattern:** Two Pointers (same direction — slow / fast)
**Expected:** O(n) time · O(1) space

## Problem

Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements.

You must do this **in place** — do not allocate a new array.

## Examples

### Example 1
```
Input:  [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
```

### Example 2
```
Input:  [0, 0, 1]
Output: [1, 0, 0]
```

### Example 3 (no zeros)
```
Input:  [1, 2, 3]
Output: [1, 2, 3]
```

### Example 4 (all zeros)
```
Input:  [0, 0, 0]
Output: [0, 0, 0]
```

## Constraints
- `1 <= nums.length <= 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`
- In-place modification required.

## Hints

<details>
<summary>Hint 1 — think of it as compaction</summary>

The `slow` pointer marks the position where the next non-zero element should be written. The `fast` pointer scans forward. When `fast` finds a non-zero, copy it to `slow`'s position and advance `slow`.
</details>

<details>
<summary>Hint 2 — don't forget the tail</summary>

After the loop, positions `slow` through `nums.length - 1` should all be set to `0`. They may hold leftover values from the original array.
</details>

<details>
<summary>Hint 3 — swap-based alternative</summary>

Instead of writing non-zeros forward and zeroing the tail separately, you can **swap** `nums[slow]` and `nums[fast]` whenever `nums[fast] !== 0`. This simultaneously moves the non-zero forward and "pushes" the zero into the position the fast pointer just left.
</details>

## Write your solution
→ [`../solutions/06-move-zeros.js`](../solutions/06-move-zeros.js)

## Follow-ups
- Can you minimize the total number of write operations? (Swap approach vs copy approach.)
- Q8 generalizes this — instead of moving `0`s out, remove any given value `val`.
- Cross-reference: [02 — Arrays Q8 — Move Zeros](../../02-Arrays/questions/08-move-zeros.md)
