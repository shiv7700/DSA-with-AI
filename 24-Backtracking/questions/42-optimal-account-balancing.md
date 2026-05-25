# Q42 — Optimal Account Balancing

**Difficulty:** Hard
**Pattern:** Backtracking — reduce debts to minimal transactions by recursive pairing
**Expected:** O(n!) time · O(n) space — where n is the number of non-zero net balances

## Problem

You are given an array of transactions `transactions` where `transactions[i] = [from_i, to_i, amount_i]` indicates that person `from_i` gave person `to_i` `amount_i` dollars.

Return the **minimum number of transactions** required to settle all debts.

## Examples

### Example 1
```
Input:  transactions = [[0,1,10],[2,0,5]]
Output: 2
```
Person 0 owes 10 to person 1 and is owed 5 by person 2. Net: person 0 owes 5, person 2 owes 5, person 1 is owed 10. Settle in 2 transactions: `2→1 $5` and `0→1 $5`.

### Example 2
```
Input:  transactions = [[0,1,10],[1,0,1],[1,2,5],[2,0,5]]
Output: 1
```
Net: everyone is even except person 0 owes 4 and person 2 is owed 4. One transaction settles it.

## Constraints
- `1 <= transactions.length <= 8`
- `0 <= from_i, to_i <= 20`
- `from_i != to_i`
- `1 <= amount_i <= 100`

## Hints

<details>
<summary>Hint 1 — compute net balances</summary>

First, compute each person's net balance: `balance[i] = (total received) - (total sent)`. Persons with `balance = 0` need no transactions. Remove them. You now have a list of debtors (negative balance) and creditors (positive balance).
</details>

<details>
<summary>Hint 2 — recursive pairing</summary>

Take the first non-zero balance. Try settling it against every other non-zero balance (of opposite sign). Settle the smaller absolute value, recurse, then backtrack. The minimum over all pairings is the answer.
</details>

<details>
<summary>Hint 3 — group detection optimization</summary>

If a subset of balances sums to exactly 0, the people in that subset can settle among themselves independently of the rest. Finding such subsets first reduces the search space dramatically. (This is optional but improves performance.)
</details>

## Write your solution
→ [`../solutions/42-optimal-account-balancing.js`](../solutions/42-optimal-account-balancing.js)

## Follow-ups
- **Simplify Balance Sheet** — a variant with different input format but the same core problem.
- Prove that the minimum number of transactions is always `n - (number of independent groups)` where n is the number of non-zero net balances.
- What graph algorithm corresponds to finding the independent groups?
