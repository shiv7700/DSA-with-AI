# Q11 — Single Number

**Difficulty:** Medium
**Pattern:** XOR — self-cancellation identity
**Expected:** O(n) time · O(1) space

## Problem

You are given a non-empty array of integers `nums` where every element appears **exactly twice**, except for one element which appears **exactly once**.

Return the element that appears only once.

> **Why this constraint?** The O(n) time + O(1) space requirement rules out sorting (O(n log n)) and hash maps (O(n) space). XOR is the only clean path.

## Examples

### Example 1
```
Input:  [2, 2, 1]
Output: 1
```

### Example 2
```
Input:  [4, 1, 2, 1, 2]
Output: 4
```

### Example 3
```
Input:  [1]
Output: 1
```

## Constraints
- `1 <= nums.length <= 3 × 10^4`
- `-3 × 10^4 <= nums[i] <= 3 × 10^4`
- Every element appears exactly twice except for one element.

## Hints

<details>
<summary>Hint 1 — brute force with a hash map</summary>

Count each number's occurrences with a `Map`. The entry with count 1 is your answer. This is O(n) time and O(n) space — valid, but the follow-up asks for O(1) space.
</details>

<details>
<summary>Hint 2 — XOR's magic: pairs cancel</summary>

Recall: `x ^ x = 0` and `x ^ 0 = x`.

XOR every element together. All paired elements cancel each other out. The solo element has nothing to cancel with, so it's left over.

```
4 ^ 1 ^ 2 ^ 1 ^ 2
= 4 ^ (1 ^ 1) ^ (2 ^ 2)
= 4 ^ 0 ^ 0
= 4
```

Order doesn't matter because XOR is commutative and associative.
</details>

<details>
<summary>Hint 3 — implementation</summary>

```js
nums.reduce((acc, n) => acc ^ n, 0);
```

Or a plain loop starting with `let result = 0`:

```js
let result = 0;
for (const n of nums) result ^= n;
return result;
```
</details>

## Write your solution
→ [`../solutions/11-single-number.js`](../solutions/11-single-number.js)

## Follow-ups
- **Single Number II** (Q12): every element appears three times except one. XOR alone won't work. How do you solve it?
- **Single Number III** (Q13): two elements appear once, all others appear twice.
- What if the array contained one element appearing three times and all others appearing twice — does XOR still work?
