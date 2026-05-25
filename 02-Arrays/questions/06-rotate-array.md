# Q6 — Rotate an Array by K positions

**Difficulty:** Easy / Medium
**Pattern:** Reversal trick · or cyclic replacements
**Expected:** O(n) time · O(1) space

## Problem

Given an array `arr` and a non-negative integer `k`, rotate the array **to the right** by `k` positions. Modify the array in place.

A "right rotation by 1" means: the last element moves to the front; everything else shifts one position right. A "rotation by k" applies that operation k times — but you should not actually perform it k times (that would be slow).

If `k` is larger than the array length, treat it as `k % arr.length`.

## Examples

### Example 1
```
Input:  arr = [1, 2, 3, 4, 5, 6, 7],  k = 3
Output: [5, 6, 7, 1, 2, 3, 4]
```
After 1 rotation: `[7, 1, 2, 3, 4, 5, 6]`.
After 2 rotations: `[6, 7, 1, 2, 3, 4, 5]`.
After 3 rotations: `[5, 6, 7, 1, 2, 3, 4]`.

### Example 2
```
Input:  arr = [-1, -100, 3, 99],  k = 2
Output: [3, 99, -1, -100]
```

### Example 3 (k larger than length)
```
Input:  arr = [1, 2, 3],  k = 5
Output: [2, 3, 1]    // k = 5 % 3 = 2
```

### Example 4 (edge cases)
```
Input:  arr = [1, 2, 3],  k = 0   →  [1, 2, 3]
Input:  arr = [],          k = 3   →  []
```

## Constraints
- `1 <= arr.length <= 10^5`
- `0 <= k <= 10^9`
- Modify the array in place. Use O(1) extra space.

## Hints

<details>
<summary>Hint 1 — naive approach (and why it's too slow)</summary>

Rotating one position at a time, `k` times, is O(n × k). For large `k`, this is way too slow.
</details>

<details>
<summary>Hint 2 — using an extra array</summary>

Allocate a new array of the same length. Place each `arr[i]` at position `(i + k) % n` in the new array. This is O(n) time, but uses O(n) extra space — which fails the in-place requirement.
</details>

<details>
<summary>Hint 3 — the reversal trick</summary>

Here is the standard, elegant solution. Three reversals do the job:

1. Reverse the entire array.
2. Reverse the first `k` elements.
3. Reverse the remaining `n - k` elements.

Walk through it with `[1, 2, 3, 4, 5, 6, 7]`, `k = 3`:
- After step 1: `[7, 6, 5, 4, 3, 2, 1]`
- After step 2: `[5, 6, 7, 4, 3, 2, 1]`
- After step 3: `[5, 6, 7, 1, 2, 3, 4]` ✓

Total time: O(n). Extra space: O(1).

(There's a similar visualization in [`notes.md`](../notes.md) under "Diagrams".)
</details>

## Write your solution
→ [`../solutions/06-rotate-array.js`](../solutions/06-rotate-array.js)

## Follow-ups
- Rotate to the **left** by `k`.
- Rotate a 2D matrix by 90° (see Q21).
