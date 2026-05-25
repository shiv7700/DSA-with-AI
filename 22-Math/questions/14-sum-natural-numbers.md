# Q14 — Sum of First N Natural Numbers

**Difficulty:** Easy
**Pattern:** Closed-form formula
**Expected:** O(1) time · O(1) space

## Problem

Given a positive integer `n`, return the sum of the first `n` natural numbers:

```
1 + 2 + 3 + … + n
```

Implement it using the **closed-form formula** (not a loop).

## Examples

### Example 1
```
Input:  n = 5
Output: 15
```
1 + 2 + 3 + 4 + 5 = 15.

### Example 2
```
Input:  n = 100
Output: 5050
```
Legend has it Gauss computed this as a child: pair up 1+100, 2+99, …, 50+51 → 50 pairs each summing to 101 → 5050.

### Example 3
```
Input:  n = 1
Output: 1
```

## Constraints
- `1 <= n <= 10^6`

## Hints

<details>
<summary>Hint 1 — the Gauss formula</summary>

```
1 + 2 + … + n = n × (n + 1) / 2
```

For n = 5: 5 × 6 / 2 = 15. ✅
For n = 100: 100 × 101 / 2 = 5050. ✅
</details>

<details>
<summary>Hint 2 — overflow caution</summary>

For n = 10^6: `n * (n + 1) / 2 = 10^6 * 10^6 / 2 = 5 × 10^11`. That's within `Number.MAX_SAFE_INTEGER` (9 × 10^15), so plain `Number` is fine here.
</details>

## Write your solution
→ [`../solutions/14-sum-natural-numbers.js`](../solutions/14-sum-natural-numbers.js)

## Follow-ups
- Sum of first n **even** numbers: `2 + 4 + … + 2n = n(n+1)`.
- Sum of first n **odd** numbers: `1 + 3 + 5 + … + (2n-1) = n²`.
- How many integers from 1 to n are divisible by either 3 or 5? (Hint: inclusion-exclusion.)
