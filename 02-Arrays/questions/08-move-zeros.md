# Q8 — Move All Zeros to the End

**Difficulty:** Easy
**Pattern:** Two pointers (slow/fast)
**Expected:** O(n) time · O(1) space

## Problem

Given an array of integers, move every `0` to the end of the array. The relative order of the non-zero elements must be preserved. Modify the array **in place** — do not allocate a copy.

## Examples

### Example 1
```
Input:  [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
```

### Example 2
```
Input:  [0, 0, 0, 1]
Output: [1, 0, 0, 0]
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
- `1 <= arr.length <= 10^4`
- Modify in place. Try to minimize the number of write operations.

## Hints

<details>
<summary>Hint 1 — the two-pointer idea</summary>

Use two indexes:
- `slow` — points to the next slot where a non-zero element should be placed.
- `fast` — scans forward through the array.

Whenever `arr[fast]` is non-zero, move it into `arr[slow]` and advance `slow`.
</details>

<details>
<summary>Hint 2 — one-pass swap version</summary>

A common one-pass solution: when `arr[fast]` is non-zero, **swap** `arr[fast]` with `arr[slow]`, then advance `slow`. By the end, all the zeros have naturally drifted to the back.
</details>

<details>
<summary>Hint 3 — two-pass version (simpler to write)</summary>

Alternatively:
1. Pass 1: copy all non-zero values forward, tracking `slow`.
2. Pass 2: fill the remaining slots (from `slow` to the end) with `0`.

Slightly more write operations, but easier to get right the first time.
</details>

## Write your solution
→ [`../solutions/08-move-zeros.js`](../solutions/08-move-zeros.js)

## Follow-ups
- Generalize: move all occurrences of a given value `v` to the end.
- Move all zeros to the **front** instead of the end (preserving relative order of non-zeros).
