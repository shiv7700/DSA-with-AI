# Q4 — Remove Duplicates (preserve order)

**Difficulty:** Easy
**Pattern:** Hash set · or slow-fast pointers (when sorted)
**Expected:** O(n) time · O(n) space (or O(1) extra space if input is sorted)

## Problem

Given an array, return a new array with all duplicate values removed. The relative order of the remaining elements must match the order they first appeared in the input.

Then, do it again for the case where the **input is already sorted** — but this time do it **in place** using only O(1) extra space, and return the new length of the unique section.

## Examples

### Example 1 — unsorted input
```
Input:  [1, 3, 2, 1, 4, 3, 5]
Output: [1, 3, 2, 4, 5]
```

### Example 2 — strings
```
Input:  ['a', 'b', 'a', 'c', 'b']
Output: ['a', 'b', 'c']
```

### Example 3 — sorted input, in place
```
Input:  arr = [1, 1, 2, 2, 3, 4, 4, 5]
After:  arr starts with [1, 2, 3, 4, 5, ...] and the function returns 5.
        (The values beyond index 5 don't matter.)
```

### Example 4 (edge cases)
```
Input:  []      →  []
Input:  [7]     →  [7]
```

## Constraints
- `0 <= arr.length <= 10^5`
- For the in-place sorted version, do not allocate a new array.

## Hints

<details>
<summary>Hint 1 — unsorted version</summary>

Use a `Set` to remember which values you've already seen. Walk through the array. For each element, check if it's in the set. If it's not, add it to both the set and your result array.
</details>

<details>
<summary>Hint 2 — sorted version, in place</summary>

When the array is sorted, duplicates are always next to each other. Use two pointers:

- `slow` — the next slot where a unique value should go.
- `fast` — scans forward through the array.

For each value at `fast`, only write it to `arr[slow]` if it's different from the previous value already at `arr[slow - 1]`. Then advance `slow`.
</details>

<details>
<summary>Hint 3</summary>

After the loop, the unique values occupy positions `0` through `slow - 1`. You can either return `slow` (the new logical length), or set `arr.length = slow` to truncate the array.
</details>

## Write your solution
→ [`../solutions/04-remove-duplicates.js`](../solutions/04-remove-duplicates.js)

## Follow-ups
- Allow at most **two** copies of each value (sorted, in place).
- Handle a stream of values that's too large to fit in memory — research the "Bloom filter" data structure (this comes much later).
