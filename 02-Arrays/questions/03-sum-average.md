# Q3 — Sum and Average

**Difficulty:** Easy
**Pattern:** Single pass / reduce
**Expected:** O(n) time · O(1) space

## Problem

Given an array of numbers, calculate two things:
- The **sum** of all elements.
- The **average** (sum divided by length).

Return them as an object: `{ sum, average }`.

If the array is empty, return `{ sum: 0, average: 0 }`.

## Examples

### Example 1
```
Input:  [1, 2, 3, 4, 5]
Output: { sum: 15, average: 3 }
```

### Example 2
```
Input:  [10, 20, 30]
Output: { sum: 60, average: 20 }
```

### Example 3
```
Input:  [1, 2]
Output: { sum: 3, average: 1.5 }
```

### Example 4 (empty array)
```
Input:  []
Output: { sum: 0, average: 0 }
```

## Constraints
- `0 <= arr.length <= 10^6`
- Each element is a finite number (positive, negative, or zero).
- Single pass through the array.

## Hints

<details>
<summary>Hint 1 — the basic loop</summary>

Keep a running variable called `sum`, starting at 0. Loop through the array and add each element to `sum`. After the loop, compute `sum / arr.length` for the average.

Remember to guard against an empty array — dividing by zero would give `NaN`.
</details>

<details>
<summary>Hint 2 — using reduce</summary>

You can compute the sum in one line using `reduce`:
```js
const sum = arr.reduce((acc, x) => acc + x, 0);
```

It's the same operation, just written in a functional style.
</details>

<details>
<summary>Hint 3 — floating-point precision (advanced)</summary>

When you sum many floating-point numbers (like `0.1 + 0.1 + 0.1 + ...` a million times), tiny rounding errors accumulate. There's a technique called **Kahan summation** that reduces this error. Don't worry about it for this problem, but it's good to know it exists.
</details>

## Write your solution
→ [`../solutions/03-sum-average.js`](../solutions/03-sum-average.js)

## Follow-ups
- Return the **median** as well — the middle value when the array is sorted. (This requires a sort, so it's O(n log n).)
- Implement Kahan summation and compare its accuracy against the naive sum on `[0.1] * 1,000,000`.
