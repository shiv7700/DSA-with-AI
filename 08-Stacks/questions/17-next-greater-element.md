# Q17 — Next Greater Element I & II

**Difficulty:** Medium
**Pattern:** Monotonic stack
**Expected:** O(n) time · O(n) space

## Problem

### Part I

You are given two distinct integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`. For each element in `nums1`, find its **Next Greater Element** in `nums2`.

The Next Greater Element of a number `x` in `nums2` is the first greater number to the right of `x`'s position in `nums2`. If it does not exist, return `-1`.

### Part II

Given a circular integer array `nums` (i.e., the next element of `nums[nums.length-1]` is `nums[0]`), return the **Next Greater Number** for every element in `nums`.

## Examples

### Part I — Example 1
```
Input:  nums1 = [4, 1, 2],  nums2 = [1, 3, 4, 2]
Output: [-1, 3, -1]
```
- `4`: no element to the right of 4 in nums2 is greater. → `-1`
- `1`: the next greater element after 1 in nums2 is `3`. → `3`
- `2`: no element to the right of 2 in nums2 is greater. → `-1`

### Part I — Example 2
```
Input:  nums1 = [2, 4],  nums2 = [1, 2, 3, 4]
Output: [3, -1]
```

### Part II — Example 1
```
Input:  nums = [1, 2, 1]
Output: [2, -1, 2]
```
- `nums[0] = 1`: next greater going right (circularly) is `2`. → `2`
- `nums[1] = 2`: no element greater than 2 anywhere in the array. → `-1`
- `nums[2] = 1`: wraps around; next greater is `2` (at index 1). → `2`

### Part II — Example 2
```
Input:  nums = [1, 2, 3, 4, 3]
Output: [2, 3, 4, -1, 4]
```

## Constraints
- Part I: `1 <= nums1.length <= nums2.length <= 1000`. All elements are distinct.
- Part II: `1 <= nums.length <= 10^4`. Values may repeat.

## Hints

<details>
<summary>Hint 1 — Part I: precompute NGE for all of nums2</summary>

Don't search for each `nums1[i]` independently. Instead:
1. Use a monotonic stack to compute the "next greater element" for **every** element in `nums2` and store results in a `Map`: `value → nextGreater`.
2. For each element in `nums1`, look it up in the map.

This gives O(n + m) instead of O(n × m).
</details>

<details>
<summary>Hint 2 — Part II: simulate going around the circle</summary>

Trick: iterate through the array **twice** (indices `0` to `2n - 1`). Use `i % n` to wrap around. The second pass resolves elements that needed to look past the end of the array.

```js
for (let i = 0; i < 2 * n; i++) {
  const idx = i % n;
  while (stack.length && nums[stack[stack.length - 1]] < nums[idx]) {
    result[stack.pop()] = nums[idx];
  }
  if (i < n) stack.push(idx);
}
```

Why not push in the second pass? Because by then we've seen all elements that could be "next greater". Any index still on the stack at the end has no greater element.
</details>

## Write your solution
→ [`../solutions/17-next-greater-element.js`](../solutions/17-next-greater-element.js)

## Follow-ups
- **Previous Greater Element** — find the nearest greater element to the **left** of each position. Hint: process right to left, same monotonic stack structure.
- **Next Smaller Element** (Q18) — same pattern, decreasing comparison.
- What if nums2 can contain duplicates in Part I? How does that change the map approach?
