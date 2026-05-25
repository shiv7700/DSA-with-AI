# Q11 — Two Sum II (Input Array Is Sorted)

**Difficulty:** Medium
**Pattern:** Two Pointers (opposite ends)
**Expected:** O(n) time · O(1) space

## Problem

You are given a **1-indexed** integer array `numbers` that is sorted in non-decreasing order. Find two numbers such that they add up to a specific `target` number. Return the indices of the two numbers — `[index1, index2]` — where `1 <= index1 < index2 <= numbers.length`.

The test cases are guaranteed to have exactly one solution. You may not use the same element twice.

> **Why this matters:** The classic Two Sum (hash-map version) uses O(n) extra space. Here, the sorted order lets you do it with O(1) space — a meaningful improvement for large inputs.

## Examples

### Example 1
```
Input:  numbers = [2, 7, 11, 15],  target = 9
Output: [1, 2]
```
`numbers[1] + numbers[2] = 2 + 7 = 9`.

### Example 2
```
Input:  numbers = [2, 3, 4],  target = 6
Output: [1, 3]
```

### Example 3 (negative numbers)
```
Input:  numbers = [-1, 0],  target = -1
Output: [1, 2]
```

### Example 4
```
Input:  numbers = [1, 2, 3, 4, 4, 9, 56, 90],  target = 8
Output: [4, 5]
```

## Constraints
- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` is sorted in non-decreasing order.
- Exactly one valid solution exists.
- You may not use the same element twice.
- Your solution must use only constant extra space.

## Hints

<details>
<summary>Hint 1 — why two pointers work here</summary>

Because the array is sorted, you can make a smart decision at every step:
- If the current sum is **less than** `target` → move `left` right to get a bigger left value.
- If the current sum is **greater than** `target` → move `right` left to get a smaller right value.
- If equal → found it!

At each step you rule out at least one element. So at most n steps total — O(n).
</details>

<details>
<summary>Hint 2 — set up the pointers</summary>

```js
let left = 0;
let right = numbers.length - 1;

while (left < right) {
  const sum = numbers[left] + numbers[right];
  if (sum === target) return [left + 1, right + 1];  // 1-indexed
  else if (sum < target) left++;
  else right--;
}
```
</details>

<details>
<summary>Hint 3 — off-by-one on the return value</summary>

The problem uses **1-based** indexing. Your pointers `left` and `right` are 0-based. Remember to return `[left + 1, right + 1]`.
</details>

## Write your solution
→ [`../solutions/11-two-sum-ii.js`](../solutions/11-two-sum-ii.js)

## Follow-ups
- How does this differ from the original Two Sum? (See [02 — Arrays Q11](../../02-Arrays/questions/11-two-sum.md).) Same problem, different constraint: sorted input → O(1) space possible.
- Q12 (3Sum) builds on this: fix one element, run Two Sum II on the rest.
- What if there can be multiple valid pairs? How would you modify the solution to return all of them?
