# Q18 — Sort Colors (Dutch National Flag)

**Difficulty:** Medium
**Pattern:** Three pointers (Dutch National Flag partition)
**Expected:** O(n) time · O(1) space · single pass

## Problem

You are given an array that contains only the values `0`, `1`, and `2`. Sort it in place so that all `0`s come first, then all `1`s, then all `2`s.

You may **not** use any built-in sort function. The solution must be a **single pass** through the array.

(This problem is also known as the **Dutch National Flag** problem — sorting items into three buckets, named after the three-colored flag.)

## Examples

### Example 1
```
Input:  [2, 0, 2, 1, 1, 0]
Output: [0, 0, 1, 1, 2, 2]
```

### Example 2
```
Input:  [2, 0, 1]
Output: [0, 1, 2]
```

### Example 3 (all the same)
```
Input:  [1, 1, 1]
Output: [1, 1, 1]
```

### Example 4 (edge cases)
```
Input:  [0]    →  [0]
Input:  []     →  []
```

## Constraints
- `1 <= nums.length <= 300`
- Every `nums[i]` is `0`, `1`, or `2`.
- Sort in place. O(1) extra space.
- Single pass — you cannot count occurrences first and then overwrite.

## Hints

<details>
<summary>Hint 1 — the easy two-pass solution (which the constraints forbid)</summary>

Count how many `0`s, `1`s, and `2`s there are. Then overwrite the array with the correct counts of each. Simple, but it's two passes.
</details>

<details>
<summary>Hint 2 — three pointers (the Dutch National Flag idea)</summary>

Maintain three pointers:
- `low`  — the next position where a `0` should go.
- `mid`  — the scan cursor.
- `high` — the next position where a `2` should go.

**Invariant** (kept true after each step):
- Everything before `low` is a `0`.
- Everything from `low` to `mid - 1` is a `1`.
- Everything after `high` is a `2`.
</details>

<details>
<summary>Hint 3 — the loop</summary>

```
while (mid <= high):
  if nums[mid] == 0:
    swap(nums, low, mid)
    low++
    mid++
  else if nums[mid] == 1:
    mid++
  else:   // nums[mid] == 2
    swap(nums, mid, high)
    high--
    // do NOT advance mid here!
    // The value we just swapped in is unknown — we still need to inspect it.
```

The subtle part: when you swap with `high`, you don't advance `mid`. The value you just pulled in from `high` hasn't been inspected yet.
</details>

## Write your solution
→ [`../solutions/18-sort-colors.js`](../solutions/18-sort-colors.js)

## Follow-ups
- Sort an array containing only `k` distinct values — use **counting sort**.
- Use the same partition idea to implement quicksort's "3-way partition" (which handles arrays with many duplicate values efficiently).
