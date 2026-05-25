# Q4 — Find Duplicates in an Array

**Difficulty:** Easy
**Pattern:** Frequency map / Set membership
**Expected:** O(n) time · O(n) space

## Problem

Given an array of integers `nums`, return a list of all the values that appear **more than once**. The result can be in any order.

## Examples

### Example 1
```
Input:  [1, 2, 3, 2, 4, 3]
Output: [2, 3]
```

### Example 2
```
Input:  [1, 1, 1, 2, 2]
Output: [1, 2]
```
Note: `1` appears three times but only needs to be in the result once.

### Example 3 (no duplicates)
```
Input:  [5, 6, 7, 8]
Output: []
```

### Example 4
```
Input:  [4]
Output: []
```

## Constraints
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- Each duplicate value should appear in the result only **once** even if it occurs three or more times.

## Hints

<details>
<summary>Hint 1 — frequency map approach</summary>

Walk the array and count how many times each number appears (using a `Map`). Then walk the map and collect all keys whose count is greater than 1.
</details>

<details>
<summary>Hint 2 — two-Set approach</summary>

Maintain two sets: `seen` (all values encountered so far) and `dupes` (values added to `seen` a second time). Walk the array once: if `seen` already has a value, add it to `dupes`; otherwise add it to `seen`. Return `[...dupes]`.
</details>

## Write your solution
→ [`../solutions/04-find-duplicates.js`](../solutions/04-find-duplicates.js)

## Follow-ups
- Return the **count** of each duplicate (i.e., how many times it actually appeared).
- Find duplicates in O(1) extra space — is it possible if the values are in the range `[1, n]` for an array of length `n`? (This is Q31.)
- What if the array is sorted? Can you find duplicates in O(1) space without a hash map?
