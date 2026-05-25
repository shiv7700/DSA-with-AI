# Q18 — Sort Colors (Dutch National Flag)

**Difficulty:** Medium
**Pattern:** Two Pointers (three-way partition — low/mid/high)
**Expected:** O(n) time · O(1) space

## Problem

Given an array `nums` with values `0`, `1`, and `2` (representing red, white, and blue), sort them in place so all `0`s come first, then all `1`s, then all `2`s.

You must solve this without using the built-in sort function, and in a single pass.

> **Dutch National Flag Problem:** devised by Edsger Dijkstra, named after the three-colored Dutch flag. A cornerstone of algorithms education.

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

### Example 3
```
Input:  [0]
Output: [0]
```

## Constraints
- `1 <= nums.length <= 300`
- `nums[i]` is `0`, `1`, or `2`.
- In-place. O(1) extra space. One pass.

## Hints

<details>
<summary>Hint 1 — three pointers, not two</summary>

Maintain three pointers:
- `low` — boundary of the `0` region (everything to the left of `low` is a `0`).
- `mid` — current element being examined.
- `high` — boundary of the `2` region (everything to the right of `high` is a `2`).

Initially: `low = 0`, `mid = 0`, `high = n - 1`.
</details>

<details>
<summary>Hint 2 — the three cases</summary>

While `mid <= high`:
- `nums[mid] === 0` → swap `nums[low]` and `nums[mid]`, advance both `low` and `mid`.
- `nums[mid] === 1` → it's in the right place, just advance `mid`.
- `nums[mid] === 2` → swap `nums[mid]` and `nums[high]`, decrease `high` only (the swapped element from `high` is unknown — you still need to examine `nums[mid]`).
</details>

<details>
<summary>Hint 3 — why advance mid after swapping with high is wrong</summary>

After swapping with `high`, the value that just arrived at `mid` was from the unexamined region. You don't know if it's 0, 1, or 2. So you must re-examine `nums[mid]` — do NOT advance `mid`. After swapping with `low`, the value that arrived came from the "already processed 1s" region, which must be a `1`, so it's safe to advance `mid`.
</details>

## Write your solution
→ [`../solutions/18-sort-colors.js`](../solutions/18-sort-colors.js)

## Follow-ups
- Cross-reference: [02 — Arrays Q18 — Sort Colors](../../02-Arrays/questions/18-sort-colors.md)
- Q41 (Three-Way Partition by Pivot) is a generalization: partition by an arbitrary pivot value, not specifically 0/1/2.
- How does this relate to the partition step in quicksort?
