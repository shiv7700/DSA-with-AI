# Q2 — Find the Minimum and Maximum in One Pass

**Difficulty:** Easy
**Pattern:** Single pass / running state
**Expected:** O(n) time · O(1) space

## Problem

Given an array of numbers, find both the **smallest** and the **largest** value — but you must go through the array **only once**.

Return the result as an object: `{ min, max }`.

> **Why "one pass"?** You might be tempted to write `Math.min(...arr)` and `Math.max(...arr)`. That works, but it walks the array twice (once for each). It also uses the spread operator, which can fail on very large arrays (the JavaScript engine has a limit on how many arguments a function call can have). A single hand-written loop is faster, safer, and a better habit.

## Examples

### Example 1
```
Input:  [3, 1, 7, 0, 5, 9, 2]
Output: { min: 0, max: 9 }
```

### Example 2 (negatives)
```
Input:  [-5, -10, -3]
Output: { min: -10, max: -3 }
```

### Example 3 (single element)
```
Input:  [42]
Output: { min: 42, max: 42 }
```

### Example 4 (empty array)
```
Input:  []
Output: { min: undefined, max: undefined }
```

## Constraints
- `0 <= arr.length <= 10^6`
- Each element is a finite number.
- You may walk the array only **once**.
- O(1) extra space.

## Hints

<details>
<summary>Hint 1</summary>

Start by initializing `min` and `max` to the first element of the array. Then loop from index 1 onward, updating each whenever you find something smaller or larger.
</details>

<details>
<summary>Hint 2 — handle the empty case first</summary>

If the array is empty, there is no min or max. Return `{ min: undefined, max: undefined }` before attempting any indexing.
</details>

<details>
<summary>Hint 3 — small optimization (not required)</summary>

The straightforward solution does about `2n` comparisons (`min` and `max` checked for each element). You can shave this down to about `1.5n` by processing the array in **pairs**: compare the two elements in the pair to each other first, then compare the smaller one to `min` and the larger one to `max`. Useful to know, but not required for credit.
</details>

## Write your solution
→ [`../solutions/02-min-max.js`](../solutions/02-min-max.js)

## Follow-ups
- Return the **indexes** of the min and max, not the values themselves.
- Return the second-smallest and second-largest values too, in a single pass.
