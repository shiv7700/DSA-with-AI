# Q9 — Find the Missing Number

**Difficulty:** Easy
**Pattern:** Set membership (or math formula)
**Expected:** O(n) time · O(n) space (Set approach) or O(1) space (math approach)

## Problem

You are given an array `nums` containing `n` distinct numbers in the range `[0, n]`. Return the one number in that range that is **missing** from the array.

There will always be exactly one missing number.

## Examples

### Example 1
```
Input:  [3, 0, 1]
Output: 2
```
n = 3, the range is [0, 1, 2, 3]. `2` is missing.

### Example 2
```
Input:  [0, 1]
Output: 2
```
n = 2, the range is [0, 1, 2]. `2` is missing.

### Example 3
```
Input:  [9, 6, 4, 2, 3, 5, 7, 0, 1]
Output: 8
```

### Example 4
```
Input:  [0]
Output: 1
```

## Constraints
- `n == nums.length`
- `1 <= n <= 10^4`
- `0 <= nums[i] <= n`
- All numbers in `nums` are distinct.

## Hints

<details>
<summary>Hint 1 — Set approach (matches this chapter)</summary>

Put all numbers in a `Set`. Then loop from `0` to `n` and return the first number not in the set.

This is O(n) time and O(n) space — perfect for this chapter's focus.
</details>

<details>
<summary>Hint 2 — math trick (O(1) space)</summary>

The sum of integers from 0 to n is `n * (n + 1) / 2`. Subtract the actual sum of the array. The difference is the missing number.

```js
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = n * (n + 1) / 2;
  const actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
```

No extra memory. Elegant. Know both approaches — interviewers like to ask for the O(1) space version as a follow-up.
</details>

## Write your solution
→ [`../solutions/09-missing-number.js`](../solutions/09-missing-number.js)

## Follow-ups
- What if there are **two** missing numbers? (The math trick no longer works directly — but XOR does.)
- What if values can be negative? Does the math trick still apply?
