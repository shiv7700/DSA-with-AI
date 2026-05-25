# Q8 — Binary Search (recursive)

**Difficulty:** Easy
**Pattern:** Divide and Conquer — halve the search space each step
**Expected:** O(log n) time · O(log n) space (call stack)

## Problem

You are given a sorted array of distinct integers `nums` and a `target` value. Return the index of `target` in `nums`, or `-1` if it does not exist.

You must implement binary search **recursively** (using a helper function that takes `low` and `high` bounds).

Rules:
- The array is sorted in **ascending order**.
- All elements are **distinct**.
- You may not use any built-in search method.

> **Why recursive binary search?** The iterative version is more common in production (no stack overhead). But the recursive version makes the D&C structure explicit: Divide (pick a midpoint), Conquer (recurse on one half), Combine (return the result directly — no merge needed). Great for understanding the pattern.

## Examples

### Example 1
```
Input:  nums = [-1, 0, 3, 5, 9, 12],  target = 9
Output: 4
```

### Example 2
```
Input:  nums = [-1, 0, 3, 5, 9, 12],  target = 2
Output: -1
```

### Example 3 (single element, found)
```
Input:  nums = [5],  target = 5
Output: 0
```

### Example 4 (single element, not found)
```
Input:  nums = [5],  target = 3
Output: -1
```

## Constraints

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i], target <= 10^4`
- All integers in `nums` are **unique**.
- `nums` is sorted in ascending order.

## Hints

<details>
<summary>Hint 1 — think in terms of Divide / Conquer / Combine</summary>

**Divide**: pick the middle index `mid = Math.floor((low + high) / 2)`. Compare `nums[mid]` to `target`.

**Conquer**: based on the comparison, recurse on EITHER the left half (if target < nums[mid]) or the right half (if target > nums[mid]).

**Combine**: the recursive call returns the final answer directly — there is nothing to merge.
</details>

<details>
<summary>Hint 2 — base cases</summary>

You need two base cases:
1. `low > high` → the search space is empty → return -1.
2. `nums[mid] === target` → found it → return `mid`.
</details>

<details>
<summary>Hint 3 — full structure</summary>

```js
function search(nums, target, low, high) {
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);

  if (nums[mid] === target) return mid;
  if (nums[mid] < target)  return search(nums, target, mid + 1, high);
  return search(nums, target, low, mid - 1);
}
```

Your public function wraps this with `low = 0` and `high = nums.length - 1`.
</details>

## Write your solution

→ [`../solutions/08-binary-search.js`](../solutions/08-binary-search.js)

## Follow-ups

- Rewrite as an **iterative** binary search (using a `while` loop instead of recursion). Compare the space complexity: iterative is O(1), recursive is O(log n) due to the call stack.
- What happens if the array has **duplicates** and you want the leftmost occurrence of `target`? How would you modify the algorithm?
- Binary search on the answer: many problems can be solved with binary search on a value range rather than an array index. Can you think of one?
