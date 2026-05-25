# Q7 — Candy

**Difficulty:** Hard
**Pattern:** Greedy · Two-Pass
**Expected:** O(n) time · O(n) space

## Problem

There are `n` children standing in a line. Each child has a **rating** value given in the integer array `ratings`.

You must distribute candies to the children following these rules:
1. Each child must receive **at least one** candy.
2. Children with a **higher rating than their immediate neighbor** must receive **more** candies than that neighbor.

Return the **minimum total number of candies** you must give.

## Examples

### Example 1
```
Input:  ratings = [1, 0, 2]
Output: 5
```
Give candies: [2, 1, 2]. Child 0 (rating 1) > child 1 (rating 0), so child 0 gets more. Child 2 (rating 2) > child 1, so child 2 gets more. Total = 5.

### Example 2
```
Input:  ratings = [1, 2, 2]
Output: 4
```
Give candies: [1, 2, 1]. Children with equal ratings need no special ordering. Total = 4.

### Example 3
```
Input:  ratings = [1, 3, 2, 2, 1]
Output: 7
```
Give candies: [1, 3, 2, 1, 1] — wait, child 2 has rating 2 > child 3's rating 2? Equal, no rule applies. Let's check: [1, 2, 1, 2, 1]? Child 1 (rating 3) > child 0 (rating 1) and > child 2 (rating 2). So child 1 needs more than both. [1, 3, 2, 1, 1] works. Total = 8? Actually [1, 2, 1, 1, 1] → child 1 needs more than child 0 (yes, 2>1) and more than child 2 (yes, 2>1). Total = 6. Hmm — verify: ratings [1,3,2,2,1], candies [1,2,1,2,1]: child 3 (rating 2) > child 4 (rating 1) → needs more: 2>1 ✅. Total = 7.

## Constraints
- `n == ratings.length`
- `1 <= n <= 2 * 10^4`
- `0 <= ratings[i] <= 2 * 10^4`

## Hints

<details>
<summary>Hint 1 — why one pass is hard</summary>

A child's required candy count depends on both neighbors. You can't decide a child's count while scanning left-to-right because you haven't seen the right neighbor yet. A two-pass approach handles each side independently.
</details>

<details>
<summary>Hint 2 — what's the greedy rule?</summary>

**Pass 1 (left → right):** give each child 1 candy to start. Then, if `ratings[i] > ratings[i-1]`, set `candies[i] = candies[i-1] + 1`. This satisfies all left-neighbor constraints.

**Pass 2 (right → left):** if `ratings[i] > ratings[i+1]`, set `candies[i] = max(candies[i], candies[i+1] + 1)`. The `max` preserves the left-pass result if it was already large enough.

Sum all `candies[i]`.
</details>

<details>
<summary>Hint 3 — why does the two-pass approach give the minimum?</summary>

Each pass handles one direction of the constraint independently, using the minimum values needed. The `max` in pass 2 takes the minimum value that satisfies both constraints simultaneously. Any lower value would violate one of the two rules.
</details>

## Write your solution
→ [`../solutions/07-candy.js`](../solutions/07-candy.js)

## Follow-ups
- Can you solve this in O(1) extra space? (It's possible with a slope-counting technique — quite tricky.)
- What if the constraint were "children with strictly higher ratings get strictly more candies than **all** adjacent children, not just immediate neighbors"?
