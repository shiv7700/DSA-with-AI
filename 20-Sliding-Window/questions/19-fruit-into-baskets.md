# Q19 — Fruit Into Baskets

**Difficulty:** Medium (LeetCode 904)
**Pattern:** Variable-size sliding window + frequency map
**Expected:** O(n) time · O(1) space

## Problem

You are picking fruit from a row of trees. Each tree `fruits[i]` produces fruit of type `fruits[i]`.

You have **two baskets**, and each basket can hold **only one type of fruit** (but unlimited quantity). Starting from any tree, you pick fruit from trees moving **only to the right**, until you must put a fruit in a basket that already holds a different type.

Return the **maximum number of fruits** you can pick.

> **Translation:** find the longest contiguous subarray that contains **at most 2 distinct values**.

## Examples

### Example 1
```
Input:  fruits = [1, 2, 1]
Output: 3
```
Pick all three fruits (types 1 and 2) — both fit in two baskets.

### Example 2
```
Input:  fruits = [0, 1, 2, 2]
Output: 3
```
Pick from index 1 to 3: [1, 2, 2] — two types, 3 fruits.

### Example 3
```
Input:  fruits = [1, 2, 3, 2, 2]
Output: 4
```
Pick from index 1 to 4: [2, 3, 2, 2] — two types, 4 fruits.

### Example 4
```
Input:  fruits = [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]
Output: 5
```

## Constraints
- `1 <= fruits.length <= 10^5`
- `0 <= fruits[i] < fruits.length`

## Hints

<details>
<summary>Hint 1 — recognize it as Q15</summary>

"At most 2 distinct values" is exactly Q15 (Longest Substring with At Most Two Distinct Characters), just on an integer array instead of a string. The algorithm is identical.
</details>

<details>
<summary>Hint 2 — frequency map approach</summary>

Use a Map from fruit type → count in the window.

- Add `fruits[right]` to the map.
- While the map has more than 2 keys, remove `fruits[left]` from the map (decrement count, delete key if count reaches 0) and advance `left`.
- Update `maxLen = Math.max(maxLen, right - left + 1)`.
</details>

## Write your solution
→ [`../solutions/19-fruit-into-baskets.js`](../solutions/19-fruit-into-baskets.js)

## Follow-ups
- What if you had **3 baskets** instead of 2? How does the solution scale?
- What's the minimum number of starting positions you'd need to check to guarantee finding the optimal window? (Answer: all of them — hence the O(n) algorithm.)
