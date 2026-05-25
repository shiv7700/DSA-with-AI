# Q21 — Happy Number

**Difficulty:** Medium
**Pattern:** Set for cycle detection
**Expected:** O(log n) time · O(log n) space

## Problem

Write an algorithm to determine if a number `n` is **happy**.

A happy number is defined by the following process:
1. Starting with any positive integer, replace the number by the sum of the squares of its digits.
2. Repeat the process until the number equals `1` (where it will stay), or it **loops endlessly in a cycle** that does not include `1`.
3. Numbers for which this process ends in `1` are happy.

Return `true` if `n` is a happy number, and `false` if not.

## Examples

### Example 1
```
Input:  n = 19
Output: true
```
Steps: 19 → 1² + 9² = 82 → 8² + 2² = 68 → 6² + 8² = 100 → 1² + 0² + 0² = **1** ✓

### Example 2
```
Input:  n = 2
Output: false
```
2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 (cycle detected!) → false

### Example 3
```
Input:  n = 1
Output: true
```

## Constraints
- `1 <= n <= 2^31 - 1`

## Hints

<details>
<summary>Hint 1 — why do we need cycle detection?</summary>

If `n` is not happy, the sequence of sums will eventually cycle back to a number you've already seen. Without detecting this, you'd loop forever.

A `Set` is the natural tool: add each new number to the set as you compute it. If you ever see a number already in the set, you've found a cycle → return `false`. If you reach `1` → return `true`.
</details>

<details>
<summary>Hint 2 — computing digit squares</summary>

```js
function sumOfSquares(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}
```
</details>

<details>
<summary>Hint 3 — Floyd's cycle detection (O(1) space bonus)</summary>

Instead of a `Set`, use two "runners": `slow` advances one step at a time, `fast` advances two steps. If they ever meet (and the meeting point isn't `1`), there's a cycle. This is Floyd's Tortoise and Hare algorithm — same idea used in Linked List cycle detection.
</details>

## Write your solution
→ [`../solutions/21-happy-number.js`](../solutions/21-happy-number.js)

## Follow-ups
- Implement the Floyd's cycle detection version (O(1) space).
- All unhappy numbers eventually cycle back to `4`. Can you prove why?
