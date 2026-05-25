# Q7 — GCD of an Array

**Difficulty:** Easy
**Pattern:** Reduce with GCD
**Expected:** O(n log M) time · O(1) space   (M = max element)

## Problem

Given an array of positive integers, return the GCD of all elements in the array.

The GCD of an array is the largest integer that divides **every** element in the array without a remainder.

## Examples

### Example 1
```
Input:  [12, 8, 4]
Output: 4
```
gcd(12, 8) = 4, gcd(4, 4) = 4.

### Example 2
```
Input:  [6, 10, 15]
Output: 1
```
No common divisor greater than 1 — the array is coprime.

### Example 3
```
Input:  [100, 75, 50]
Output: 25
```

### Example 4 (single element)
```
Input:  [42]
Output: 42
```

## Constraints
- `1 <= nums.length <= 10^4`
- `1 <= nums[i] <= 10^9`

## Hints

<details>
<summary>Hint 1 — key property</summary>

`gcd(a, b, c) = gcd(gcd(a, b), c)`

GCD is **associative** — you can process the array left-to-right, maintaining a running GCD.
</details>

<details>
<summary>Hint 2 — implementation</summary>

Start with `result = nums[0]`. Loop through the rest of the array, updating `result = gcd(result, nums[i])`. Return `result` when the loop ends.
</details>

<details>
<summary>Hint 3 — early exit optimization</summary>

If at any point `result === 1`, you can stop immediately — 1 divides everything, so the GCD of the whole array can never be smaller than 1.
</details>

## Write your solution
→ [`../solutions/07-gcd-array.js`](../solutions/07-gcd-array.js)

## Follow-ups
- What's the GCD of an array if you remove one element at a time? (Hint: prefix and suffix GCD arrays — similar to "product except self".)
- Can you use `Array.prototype.reduce` to express this in one line?
