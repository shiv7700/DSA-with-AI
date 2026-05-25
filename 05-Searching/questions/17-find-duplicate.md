# Q17 — Find the Duplicate Number

**Difficulty:** Medium
**Pattern:** Binary search on value range (or Floyd's cycle detection)
**Expected:** O(n log n) binary search · O(n) Floyd's · O(1) space for both

## Problem

You are given an array `nums` of `n + 1` integers where each integer is in the range `[1, n]` inclusive. There is **exactly one duplicate number** — find and return it.

Constraints you must follow:
- You **must not** modify the array.
- You must use only O(1) extra space.
- The runtime should be better than O(n²).

> **Two elegant approaches exist.** The binary search approach is the natural fit for this chapter. Floyd's tortoise-and-hare cycle detection is the O(n) solution and is worth learning after.

## Examples

### Example 1
```
Input:  nums = [1, 3, 4, 2, 2]
Output: 2
```

### Example 2
```
Input:  nums = [3, 1, 3, 4, 2]
Output: 3
```

### Example 3
```
Input:  nums = [1, 1]
Output: 1
```

### Example 4
```
Input:  nums = [2, 2, 2, 2, 2]
Output: 2
```

## Constraints
- `2 <= n + 1 == nums.length <= 10^5`
- `1 <= nums[i] <= n`
- Exactly one value is repeated (but it may appear more than twice).
- Do not modify `nums`.
- O(1) extra space.

## Hints

<details>
<summary>Hint 1 — binary search on the value range</summary>

Binary search on the values `1` to `n`. For a candidate value `mid`, count how many elements in `nums` are ≤ `mid`. Call this `count`.

By the pigeonhole principle: if there were no duplicates in `[1, mid]`, at most `mid` elements in the array would be ≤ `mid`. If `count > mid`, there must be a duplicate in the range `[1, mid]`. Otherwise, the duplicate is in `[mid + 1, n]`.
</details>

<details>
<summary>Hint 2 — binary search skeleton</summary>

```js
let left = 1, right = nums.length - 1;
while (left < right) {
  const mid = Math.floor((left + right) / 2);
  const count = nums.filter(x => x <= mid).length;  // O(n)
  if (count > mid) {
    right = mid;     // duplicate is in [left, mid]
  } else {
    left = mid + 1;  // duplicate is in [mid+1, right]
  }
}
return left;
```

Total: O(n) per iteration × O(log n) iterations = O(n log n).
</details>

<details>
<summary>Hint 3 — Floyd's cycle detection (O(n) bonus)</summary>

Treat `nums` as a linked list where `nums[i]` is the "next" pointer of node `i`. The duplicate creates a cycle. Use Floyd's algorithm (slow/fast pointers) to find the cycle entry point — that's the duplicate.

This is O(n) time, O(1) space, and doesn't require the values to be in any particular range. It's a beautiful but non-obvious approach.
</details>

## Write your solution
→ [`../solutions/17-find-duplicate.js`](../solutions/17-find-duplicate.js)

## Follow-ups
- Implement both the binary search and Floyd's approaches. Which is easier to reason about? Which is faster?
- **LeetCode 287** — this exact problem.
- What if there can be multiple duplicate values? (The binary search approach still finds one of them, but not necessarily all.)
