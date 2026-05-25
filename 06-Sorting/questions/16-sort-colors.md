# Q16 — Sort 0s, 1s, and 2s (Dutch National Flag)

**Difficulty:** Easy
**Pattern:** Three-way partition (Dutch National Flag)
**Expected:** O(n) time · O(1) space

## Problem

You are given an array containing only the integers `0`, `1`, and `2`. Sort the array **in place** so that all `0`s come first, then all `1`s, then all `2`s.

You must solve this in a **single pass** (O(n)) without using any sorting library function.

> This problem is known as the **Dutch National Flag problem**, introduced by Edsger Dijkstra. The three colors — red (0), white (1), blue (2) — represent the Dutch flag. The algorithm that solves it is also the basis of quicksort's three-way partition for handling duplicate pivot values.

## Examples

### Example 1
```
Input:  [2, 0, 2, 1, 1, 0]
Output: [0, 0, 1, 1, 2, 2]
```

### Example 2
```
Input:  [2, 0, 1]
Output: [0, 1, 2]
```

### Example 3 (edge cases)
```
Input:  [0]         → [0]
Input:  [1, 1, 1]   → [1, 1, 1]
Input:  [2, 2, 0]   → [0, 2, 2]  (wait — is this right? think again)
```

## Constraints
- `1 <= nums.length <= 300`
- `nums[i]` is `0`, `1`, or `2`.
- Must be **in place** with **O(1) extra space**.
- Must solve in a **single pass**.

## Hints

<details>
<summary>Hint 1 — the naive approach (two passes)</summary>

You could count the 0s, 1s, and 2s in one pass, then overwrite the array in a second pass. This works but uses two passes. Try to do it in one pass.
</details>

<details>
<summary>Hint 2 — three pointers</summary>

Use three pointers:
- `low` — everything to the left of `low` is a `0`
- `mid` — the current element being inspected
- `high` — everything to the right of `high` is a `2`

The region `[low, high]` is unexplored (contains 0s, 1s, and 2s). We shrink it until `mid > high`.

```
[0...0 | 1...1 | ? ? ? | 2...2]
         ↑       ↑       ↑
        low     mid     high
```
</details>

<details>
<summary>Hint 3 — the three cases for arr[mid]</summary>

While `mid <= high`:

- **arr[mid] === 0**: swap `arr[low]` and `arr[mid]`, increment both `low` and `mid`.
- **arr[mid] === 1**: it's already in the right zone, just increment `mid`.
- **arr[mid] === 2**: swap `arr[mid]` and `arr[high]`, decrement `high`. **Do not increment `mid`** — the swapped-in element hasn't been inspected yet.
</details>

## Write your solution
→ [`../solutions/16-sort-colors.js`](../solutions/16-sort-colors.js)

## Follow-ups
- Extend the algorithm to sort four distinct values (0, 1, 2, 3) in a single pass.
- This problem is related to quicksort's three-way partition. How would you use this technique to make quicksort O(n) on arrays with many duplicate elements equal to the pivot?
