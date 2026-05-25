# Q14 — Missing Number

**Difficulty:** Medium
**Pattern:** XOR (or arithmetic sum)
**Expected:** O(n) time · O(1) space

## Problem

Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the **one number in the range that is missing** from the array.

## Examples

### Example 1
```
Input:  [3, 0, 1]
Output: 2
```
Range is [0, 3]. Array has 0, 1, 3. Missing: 2.

### Example 2
```
Input:  [0, 1]
Output: 2
```
Range is [0, 2]. Missing: 2.

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
- All values are distinct.

## Hints

<details>
<summary>Hint 1 — arithmetic approach (O(n) time, O(1) space)</summary>

The sum of 0 through n is `n * (n + 1) / 2`. Subtract the actual sum of the array. The difference is the missing number.

This works and is intuitive. But what if you want a bitwise solution?
</details>

<details>
<summary>Hint 2 — XOR approach</summary>

XOR all expected values `0, 1, 2, ..., n` with all actual array values. Every present number appears once in each group → they cancel. The missing number only appears in the expected group → it survives.

```js
let xor = 0;
for (let i = 0; i <= nums.length; i++) xor ^= i;       // expected
for (const n of nums) xor ^= n;                         // actual
return xor;
```

You can compress this into a single loop:

```js
let xor = nums.length;   // seed with n (the last expected value)
for (let i = 0; i < nums.length; i++) {
  xor ^= i ^ nums[i];
}
return xor;
```
</details>

<details>
<summary>Hint 3 — trace through Example 1</summary>

`nums = [3, 0, 1]`, n = 3, expected = {0, 1, 2, 3}

XOR all expected: `0 ^ 1 ^ 2 ^ 3 = 0`
XOR all actual:   `3 ^ 0 ^ 1 = 2`
Result:           `0 ^ 2 = 2` ✓
</details>

## Write your solution
→ [`../solutions/14-missing-number.js`](../solutions/14-missing-number.js)

## Follow-ups
- What if the range is `[1, n+1]` instead of `[0, n]`? Adjust the seed value.
- What if **two** numbers are missing? (You'd need the approach from Q13.)
- When might the arithmetic sum approach overflow? Does JavaScript have this problem given its 64-bit floats?
