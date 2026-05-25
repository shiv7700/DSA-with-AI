# Q7 — Contains Duplicate

**Difficulty:** Easy
**Pattern:** Set membership
**Expected:** O(n) time · O(n) space

## Problem

Given an integer array `nums`, return `true` if any value appears **at least twice**, and `false` if every element is distinct.

## Examples

### Example 1
```
Input:  [1, 2, 3, 1]
Output: true
```
`1` appears at indexes 0 and 3.

### Example 2
```
Input:  [1, 2, 3, 4]
Output: false
```
All values are unique.

### Example 3
```
Input:  [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
Output: true
```

### Example 4
```
Input:  [99]
Output: false
```

## Constraints
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Hints

<details>
<summary>Hint 1 — brute force (then improve)</summary>

Compare every pair: for each `i`, check if `nums[i]` appears anywhere in `nums[i+1..]`. This is O(n²) — too slow.
</details>

<details>
<summary>Hint 2 — Set for O(1) membership check</summary>

Walk the array. Keep a `Set` of values you've already seen. For each new value:
- If it's already in the set → return `true` immediately.
- Otherwise, add it to the set.

If you finish the loop without finding a duplicate → return `false`.

This is O(n) time and O(n) space. You also exit early the moment you find a duplicate.
</details>

<details>
<summary>Hint 3 — one-liner</summary>

```js
return new Set(nums).size !== nums.length;
```

If any duplicates existed, the set's size will be smaller than the array's length. Clean, but doesn't benefit from early exit.
</details>

## Write your solution
→ [`../solutions/07-contains-duplicate.js`](../solutions/07-contains-duplicate.js)

## Follow-ups
- **Contains Duplicate II** — return `true` if any two equal elements are at most `k` index positions apart.
- Can you solve it in O(1) extra space? (Hint: sort the array first — but that's O(n log n) time and it mutates the input.)
