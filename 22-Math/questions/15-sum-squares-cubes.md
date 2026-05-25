# Q15 — Sum of Squares and Cubes of First N Natural Numbers

**Difficulty:** Easy
**Pattern:** Closed-form formula
**Expected:** O(1) time · O(1) space

## Problem

Given a positive integer `n`, return two values:
1. The **sum of squares** of the first n natural numbers: `1² + 2² + 3² + … + n²`
2. The **sum of cubes** of the first n natural numbers: `1³ + 2³ + 3³ + … + n³`

## Examples

### Example 1
```
Input:  n = 3
sumSquares:  1 + 4 + 9 = 14
sumCubes:    1 + 8 + 27 = 36
Output: { sumSquares: 14, sumCubes: 36 }
```

### Example 2
```
Input:  n = 5
sumSquares:  1 + 4 + 9 + 16 + 25 = 55
sumCubes:    1 + 8 + 27 + 64 + 125 = 225
Output: { sumSquares: 55, sumCubes: 225 }
```

## Constraints
- `1 <= n <= 10^4`

## Hints

<details>
<summary>Hint 1 — formulas</summary>

```
Sum of squares:  1² + 2² + … + n² = n(n+1)(2n+1) / 6
Sum of cubes:    1³ + 2³ + … + n³ = [n(n+1)/2]²
```

Notice: the sum of cubes equals the **square of the sum of natural numbers**! Beautiful.

For n = 5:
- Sum of squares: 5 × 6 × 11 / 6 = 55 ✅
- Sum = 15, sum of cubes = 15² = 225 ✅
</details>

## Write your solution
→ [`../solutions/15-sum-squares-cubes.js`](../solutions/15-sum-squares-cubes.js)

## Follow-ups
- Verify that for any n, the sum of the first n cubes equals the square of the sum of the first n natural numbers.
- Sum of 4th powers: `1^4 + 2^4 + … + n^4 = n(n+1)(2n+1)(3n²+3n-1) / 30`.
