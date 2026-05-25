# Q18 — 4Sum II

**Difficulty:** Medium
**Pattern:** Hash map for complement lookup across paired arrays
**Expected:** O(n²) time · O(n²) space

## Problem

Given four integer arrays `nums1`, `nums2`, `nums3`, `nums4`, each of length `n`, return the number of tuples `(i, j, k, l)` such that:

```
nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
```

## Examples

### Example 1
```
Input:
  nums1 = [1, 2]
  nums2 = [-2, -1]
  nums3 = [-1, 2]
  nums4 = [0, 2]
Output: 2
```
The two tuples:
- `(0, 0, 0, 0)` → `1 + (-2) + (-1) + 0 = -2`… wait, let's recheck.
- `(0, 0, 0, 1)` → `1 + (-2) + (-1) + 2 = 0` ✓
- `(1, 1, 0, 0)` → `2 + (-1) + (-1) + 0 = 0` ✓

### Example 2
```
Input:  nums1 = [0],  nums2 = [0],  nums3 = [0],  nums4 = [0]
Output: 1
```

## Constraints
- `n == nums1.length == nums2.length == nums3.length == nums4.length`
- `1 <= n <= 200`
- `-2^28 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2^28`

## Hints

<details>
<summary>Hint 1 — O(n⁴) brute force</summary>

Four nested loops checking every combination. O(n⁴) — way too slow for n = 200.
</details>

<details>
<summary>Hint 2 — split into two pairs (the key insight)</summary>

Split the four arrays into two pairs: `(A, B)` and `(C, D)`.

1. Build a frequency map of all possible sums `a + b` for `a` in `nums1`, `b` in `nums2`. Map: `sum → count`.
2. For each pair `(c, d)`, compute `-(c + d)`. If `-(c + d)` exists in the map, add `map.get(-(c + d))` to the answer.

This is O(n²) time and space — two n² loops instead of four.
</details>

## Write your solution
→ [`../solutions/18-four-sum-ii.js`](../solutions/18-four-sum-ii.js)

## Follow-ups
- Can you generalize this to 2k arrays using the "split in half" technique?
- Compare with the 4Sum problem on a single array — why is that harder?
