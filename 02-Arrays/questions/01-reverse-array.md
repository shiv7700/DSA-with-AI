# Q1 — Reverse an Array (in place)

**Difficulty:** Easy
**Pattern:** Two Pointers (opposite ends)
**Expected:** O(n) time · O(1) space

## Problem

You're given an array. Reverse the order of its elements — the first element should end up last, the second should end up second-to-last, and so on.

There are two rules:

1. You **cannot** use the built-in `Array.prototype.reverse()` method.
2. You must do it **in place** — meaning you modify the same array that was passed in, instead of creating a new one. Your function should return that same array (the original reference).

> **Why "in place" matters:** in real programs, arrays can be very large. Making a copy doubles the memory you use. Knowing how to modify arrays in place is a foundational skill — and many interview problems require it explicitly.

## Examples

### Example 1
```
Input:  [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]
```

### Example 2
```
Input:  ['a', 'b', 'c', 'd']
Output: ['d', 'c', 'b', 'a']
```

### Example 3 (even length)
```
Input:  [1, 2]
Output: [2, 1]
```

### Example 4 (edge cases)
```
Input:  [42]    →   [42]
Input:  []      →   []
```

## Constraints
- `0 <= arr.length <= 10^5`
- Elements can be any JavaScript value (numbers, strings, objects).
- You must modify the input array directly — the function should return the **same array reference**.
- Use only O(1) extra space (a few variables — no new arrays).

## Hints

<details>
<summary>Hint 1 — visualize it</summary>

Imagine two fingers — one pointing at the first element, one pointing at the last. What would happen if you swapped what they're pointing to, then moved both fingers one step toward the middle?
</details>

<details>
<summary>Hint 2 — the "two pointers" pattern</summary>

This is a classic use of the **two pointers** pattern.

Start with `left = 0` and `right = arr.length - 1`. While `left < right`:
1. Swap `arr[left]` and `arr[right]`.
2. Move `left` one step right and `right` one step left.

When the pointers meet (or cross), the array is fully reversed.

In JavaScript, you can swap two array values in a single line using destructuring:
```js
[arr[left], arr[right]] = [arr[right], arr[left]];
```
</details>

<details>
<summary>Hint 3 — what about recursion?</summary>

You could also reverse recursively: swap the ends, then recursively reverse the inner part. It works, but each recursive call uses extra memory on the call stack — O(n) extra space. The iterative two-pointer version uses O(1) and is preferred.
</details>

## Write your solution
→ [`../solutions/01-reverse-array.js`](../solutions/01-reverse-array.js)

## Follow-ups
- Reverse only a portion of the array — between two given indexes `i` and `j`.
- Reverse without using array destructuring (use a temporary variable to swap).
- Try the same idea on a string. What changes? (Hint: strings in JavaScript are immutable — they can't be modified directly.)
