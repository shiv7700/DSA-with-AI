# Q8 — Remove Element

**Difficulty:** Easy
**Pattern:** Two Pointers (same direction — slow / fast)
**Expected:** O(n) time · O(1) space

## Problem

Given an integer array `nums` and an integer `val`, remove all occurrences of `val` from `nums` in place. The order of the remaining elements may change.

Return `k` — the count of elements not equal to `val`. The first `k` elements of `nums` should hold these remaining values; you don't need to worry about anything beyond index `k - 1`.

## Examples

### Example 1
```
Input:  nums = [3, 2, 2, 3],  val = 3
Output: k = 2,  nums = [2, 2, _, _]
```

### Example 2
```
Input:  nums = [0, 1, 2, 2, 3, 0, 4, 2],  val = 2
Output: k = 5,  nums = [0, 1, 4, 0, 3, _, _, _]
```
(The first 5 elements can be in any order — as long as none of them equals `val`.)

### Example 3
```
Input:  nums = [1],  val = 2
Output: k = 1,  nums = [1]
```

### Example 4 (all match)
```
Input:  nums = [2, 2],  val = 2
Output: k = 0
```

## Constraints
- `0 <= nums.length <= 100`
- `0 <= nums[i] <= 50`
- `0 <= val <= 100`

## Hints

<details>
<summary>Hint 1 — it's a compaction</summary>

This is the same slow/fast pattern as Q6 (Move Zeros). Instead of moving zeros out, you're moving `val` out. Keep all non-`val` elements, discard `val` elements.
</details>

<details>
<summary>Hint 2 — the simple version</summary>

`slow = 0`. Walk `fast` from 0 to end. If `nums[fast] !== val`, copy it to `nums[slow]` and advance `slow`. At the end, `slow` equals `k`.
</details>

<details>
<summary>Hint 3 — optimizing for rare removals</summary>

If `val` is very rare, most elements get copied to themselves (no real work). An alternative: when `nums[fast] === val`, swap it with the last element and shrink the effective length. This avoids unnecessary writes but only helps when removals are sparse.
</details>

## Write your solution
→ [`../solutions/08-remove-element.js`](../solutions/08-remove-element.js)

## Follow-ups
- Compare this with Q6. How is "remove element `val`" the same structure as "move zeros to end"?
- What if the array must preserve its original relative order AND elements equal to `val` must appear at the end (like Move Zeros)? Does your solution still work?
