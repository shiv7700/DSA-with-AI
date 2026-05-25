# Q13 — Single Number III

**Difficulty:** Medium
**Pattern:** XOR — partition by a differentiating bit
**Expected:** O(n) time · O(1) space

## Problem

You are given an integer array `nums` where exactly **two elements appear exactly once**, and all other elements appear **exactly twice**.

Return an array containing the two solo elements in any order.

## Examples

### Example 1
```
Input:  [1, 2, 1, 3, 2, 5]
Output: [3, 5]   (or [5, 3])
```

### Example 2
```
Input:  [-1, 0]
Output: [-1, 0]
```

### Example 3
```
Input:  [0, 1]
Output: [0, 1]
```

## Constraints
- `2 <= nums.length <= 3 × 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`
- Each integer appears exactly twice except for two integers which appear exactly once.

## Hints

<details>
<summary>Hint 1 — XOR all elements first</summary>

XOR all numbers. Pairs cancel. You're left with `a ^ b` where `a` and `b` are the two solo elements.

The problem: you can't separate `a` and `b` from `a ^ b` directly.
</details>

<details>
<summary>Hint 2 — find a bit where a and b differ</summary>

Since `a != b`, their XOR `a ^ b` has at least one bit set. Find any set bit — e.g. the lowest set bit: `diff = (a ^ b) & -(a ^ b)`.

`a` and `b` must differ at this bit position. So one of them has that bit set and the other doesn't.
</details>

<details>
<summary>Hint 3 — partition and XOR separately</summary>

Partition all numbers into two groups:
- Group 1: numbers with the chosen bit set.
- Group 2: numbers without the chosen bit set.

Within each group, all duplicate elements cancel out (just like Q11). What's left is the solo element in that group — one group gives you `a`, the other gives you `b`.

```js
let xorAll = 0;
for (const n of nums) xorAll ^= n;     // xorAll = a ^ b

const diff = xorAll & (-xorAll);       // lowest set bit of a ^ b

let a = 0;
for (const n of nums) {
  if (n & diff) a ^= n;               // only XOR numbers with the diff-bit set
}
const b = xorAll ^ a;

return [a, b];
```
</details>

## Write your solution
→ [`../solutions/13-single-number-iii.js`](../solutions/13-single-number-iii.js)

## Follow-ups
- Why does partitioning by the lowest set bit of `a ^ b` guarantee that `a` and `b` end up in different groups?
- What if three elements appeared once and all others appeared twice? Does this approach extend?
- Can you solve this in O(n) time using a hash map? How does the space complexity compare?
