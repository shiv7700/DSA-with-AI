# Q10 — Squares of a Sorted Array

**Difficulty:** Easy
**Pattern:** Two pointers (opposite ends)
**Expected:** O(n) time · O(n) space

## Problem

You are given an array sorted in **non-decreasing** order. It may contain negative numbers. Return a new array containing the **squares of each element**, also sorted in non-decreasing order.

The naive solution — square every element, then sort — is O(n log n). Your goal is to do it in **O(n)**.

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

### Example 3 (all positive)
```
Input:  [1, 2, 3, 4]
Output: [1, 4, 9, 16]
```

### Example 4 (all negative)
```
Input:  [-5, -4, -3, -1]
Output: [1, 9, 16, 25]
```

## Constraints
- `1 <= arr.length <= 10^4`
- Input is sorted in non-decreasing order.
- Solve in O(n).

## Hints

<details>
<summary>Hint 1 — key observation</summary>

In a sorted array that contains negative numbers, the **largest squares** come from the two ends of the array (the most negative value and the most positive value). The smallest square is somewhere in the middle.
</details>

<details>
<summary>Hint 2 — two pointers, fill the result from the back</summary>

Use `left = 0`, `right = n - 1`, and an index `i = n - 1` into your result array.

While `left <= right`:
- Compare `|arr[left]|` and `|arr[right]|`.
- Whichever is larger, its square goes into `result[i]`. Decrement `i` and move the corresponding pointer inward.
</details>

<details>
<summary>Hint 3 — why fill the result from the back</summary>

Because the **largest** value is decided each step, and the largest value belongs at the **end** of the sorted result.
</details>

## Write your solution
→ [`../solutions/10-sorted-squares.js`](../solutions/10-sorted-squares.js)

## Follow-ups
- What if the input is sorted in descending order instead?
- Could you do it in place? (You'd need a place to stash overwritten values — typically you can't, so a new array is the cleanest approach here.)
