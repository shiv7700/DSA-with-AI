# Q2 — Lemonade Change

**Difficulty:** Easy
**Pattern:** Greedy · Simulation
**Expected:** O(n) time · O(1) space

## Problem

At a lemonade stand, each lemonade costs **$5**. Customers pay with $5, $10, or $20 bills. You start with **no change**. For each customer in line, you must provide the correct change (if any) using the bills you currently have.

Return `true` if you can serve every customer in line with correct change, or `false` if at any point you cannot.

> **Why this problem matters:** it's the simplest example of a greedy feasibility check — at each step you make the best available decision, and you want to know if the strategy is globally feasible.

## Examples

### Example 1
```
Input:  bills = [5, 5, 5, 10, 20]
Output: true
```
- Customer 1 pays $5. No change needed. You hold: [three $5].
- Customer 2 pays $5. No change needed.
- Customer 3 pays $5. No change needed.
- Customer 4 pays $10. Give back $5. You hold: [two $5, one $10].
- Customer 5 pays $20. Give back $5 + $10. ✅

### Example 2
```
Input:  bills = [5, 5, 10, 10, 20]
Output: false
```
- Customers 1–2 pay $5.
- Customer 3 pays $10. Give back $5. Now: [one $5, one $10].
- Customer 4 pays $10. Give back $5. Now: [zero $5, two $10].
- Customer 5 pays $20. Need to give back $15. Options: one $10 + one $5 (no $5 left!) or three $5 (none left). Cannot make change. ❌

### Example 3
```
Input:  bills = [5, 10]
Output: true
```

## Constraints
- `1 <= bills.length <= 10^5`
- `bills[i]` is either 5, 10, or 20.

## Hints

<details>
<summary>Hint 1 — what's the greedy rule?</summary>

When giving change for a $20 bill, you can use: one $10 + one $5, or three $5 bills. Which is better to prefer?

The $10 bill is only useful for making change for $20. The $5 bill is useful for making change for both $10 and $20. So when you must give back $15, **prefer using the $10 + $5 combination** to conserve your precious $5 bills for $10 customers.
</details>

<details>
<summary>Hint 2 — why does it work for this problem?</summary>

$5 bills are strictly more flexible than $10 bills as change (they can substitute in any context a $10 can, and also serve $10 customers). So whenever you have a choice between giving a $10 or a $5, prefer the $10. Keeping $5 bills maximizes future flexibility — this is the classic "save the most versatile resource" greedy principle.
</details>

<details>
<summary>Hint 3 — implementation sketch</summary>

Track just two variables: how many $5 bills and how many $10 bills you hold. (You never give back $20 bills.)

```js
let fives = 0, tens = 0;
for (const bill of bills) {
  if (bill === 5) {
    fives++;
  } else if (bill === 10) {
    if (fives === 0) return false;
    fives--; tens++;
  } else { // bill === 20
    if (tens > 0 && fives > 0) { tens--; fives--; }   // prefer $10+$5
    else if (fives >= 3) { fives -= 3; }
    else return false;
  }
}
return true;
```
</details>

## Write your solution
→ [`../solutions/02-lemonade-change.js`](../solutions/02-lemonade-change.js)

## Follow-ups
- What if the lemonade cost $7 and customers paid with $7, $10, and $20 bills?
- What if customers could also pay with $50 bills?
