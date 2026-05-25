# Q17 — Find All Duplicates in an Array

**Difficulty:** Medium
**Pattern:** Use the array's own indexes as a hash (sign-marking trick)
**Expected:** O(n) time · O(1) extra space

## Problem

You are given an integer array `nums` of length `n`. Every value in the array is between `1` and `n` (inclusive). Some values appear **once**, and some appear **twice** — never more than twice.

Return an array of all values that appear **twice**.

You must do this in **O(n) time** with **O(1) extra space**. (The returned array does not count toward space.)

## Examples

### Example 1
```
Input:  [4, 3, 2, 7, 8, 2, 3, 1]
Output: [2, 3]
```
The order of values in the output does not matter.

### Example 2
```
Input:  [1, 1, 2]
Output: [1]
```

### Example 3 (no duplicates)
```
Input:  [1]
Output: []
```

## Constraints
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= n`  (where `n = nums.length`)
- Each value appears at most twice.
- O(n) time, O(1) extra space.

## Hints

<details>
<summary>Hint 1 — the easy way (but it breaks the space rule)</summary>

A `Set` or a frequency array makes this trivial: O(n) time but O(n) space. The constraints don't allow it.
</details>

<details>
<summary>Hint 2 — use the array's own indexes</summary>

Because every value is in the range `[1, n]`, each value maps cleanly to an index: for value `v`, look at index `v - 1`.

The trick: when you see a value, **mark** its target index by **negating** the number there. If you later see that the slot is already negative, that means you've visited it before — so the current value is a duplicate.
</details>

<details>
<summary>Hint 3 — the code skeleton</summary>

```js
const result = [];
for (let i = 0; i < nums.length; i++) {
  const idx = Math.abs(nums[i]) - 1;   // always use abs, since we may have negated
  if (nums[idx] < 0) {
    result.push(idx + 1);              // already visited → duplicate
  } else {
    nums[idx] = -nums[idx];            // mark as visited
  }
}
return result;
```

Note: this **mutates the input array**. If the problem requires the input to be left untouched, you can undo the negations in a second pass.
</details>

## Write your solution
→ [`../solutions/17-find-all-duplicates.js`](../solutions/17-find-all-duplicates.js)

## Follow-ups
- **Find the Duplicate Number** (LeetCode 287) — exactly one duplicate, but you're not allowed to modify the array. Solved with Floyd's cycle detection.
- **Find All Numbers Disappeared in an Array** — same array layout, find the values from `[1..n]` that are **missing**. Same negation trick.
