# Q5 — Squares of a Sorted Array

**Difficulty:** Easy
**Pattern:** Two Pointers (opposite ends)
**Expected:** O(n) time · O(n) space

## Problem

Given an integer array `nums` sorted in non-decreasing order (which may include negative numbers), return a new array of the **squares of each number**, also sorted in non-decreasing order.

Do not sort the squared array from scratch — use the structure of the input.

## Examples

### Example 1
```
Input:  [-4, -1, 0, 3, 10]
Output: [0, 1, 9, 16, 100]
```

### Example 2
```
Input:  [-7, -3, 2, 3, 11]
Output: [4, 9, 9, 49, 121]
```

### Example 3 (all negative)
```
Input:  [-5, -3, -1]
Output: [1, 9, 25]
```

### Example 4 (all non-negative)
```
Input:  [0, 2, 4]
Output: [0, 4, 16]
```

## Constraints
- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` is sorted in non-decreasing order.

## Hints

<details>
<summary>Hint 1 — why squaring breaks sort order</summary>

Negative numbers become positive when squared. So `[-4, -1, 0, 3, 10]` squared gives `[16, 1, 0, 9, 100]` — no longer sorted. The naive approach of squaring then sorting is O(n log n).
</details>

<details>
<summary>Hint 2 — the key observation</summary>

The largest squares come from the **ends** of the original sorted array — either the most-negative number or the most-positive. The smallest squares come from the middle (values closest to zero).

Start two pointers at the ends. Whichever end has the larger absolute value produces the next largest square. Fill the result from **right to left**.
</details>

<details>
<summary>Hint 3 — fill from the back</summary>

```js
const result = new Array(nums.length);
let pos = nums.length - 1;  // write position (right to left)
let left = 0;
let right = nums.length - 1;

while (left <= right) {
  if (Math.abs(nums[left]) > Math.abs(nums[right])) {
    result[pos--] = nums[left] ** 2;
    left++;
  } else {
    result[pos--] = nums[right] ** 2;
    right--;
  }
}
```
</details>

## Write your solution
→ [`../solutions/05-sorted-squares.js`](../solutions/05-sorted-squares.js)

## Follow-ups
- What if the input is not sorted? Does your O(n) approach still work?
- Cross-reference: [02 — Arrays Q10 — Squares of a Sorted Array](../../02-Arrays/questions/10-sorted-squares.md)
