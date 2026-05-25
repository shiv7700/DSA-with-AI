# Q33 — Stock Span Problem

**Difficulty:** Medium (Monotonic Stack Drill)
**Pattern:** Monotonic stack (decreasing)
**Expected:** O(n) time · O(n) space

## Problem

The **stock span** of a stock's price on a given day is defined as the maximum number of consecutive days (starting from that day and going backwards) for which the price was **less than or equal to** today's price.

Given an array `prices` where `prices[i]` is the stock price on day `i`, return an array `spans` where `spans[i]` is the stock span for day `i`.

## Examples

### Example 1
```
Input:  prices = [100, 80, 60, 70, 60, 75, 85]
Output: spans  = [1, 1, 1, 2, 1, 4, 6]
```
- Day 0, price=100: no previous days. Span = 1.
- Day 1, price=80:  day 0 (100) > 80. Span = 1.
- Day 2, price=60:  day 1 (80) > 60. Span = 1.
- Day 3, price=70:  day 2 (60) ≤ 70 → count it; day 1 (80) > 70 → stop. Span = 2.
- Day 4, price=60:  day 3 (70) > 60. Span = 1.
- Day 5, price=75:  day 4 (60), day 3 (70), day 2 (60) all ≤ 75; day 1 (80) > 75. Span = 4.
- Day 6, price=85:  days 5,4,3,2,1 all ≤ 85; day 0 (100) > 85. Span = 6.

### Example 2
```
Input:  [10, 20, 30, 40, 50]
Output: [1, 2, 3, 4, 5]
```
Prices are strictly increasing — each day's span extends back to day 0.

### Example 3
```
Input:  [50, 40, 30, 20, 10]
Output: [1, 1, 1, 1, 1]
```
Prices are strictly decreasing — each day only spans itself.

## Constraints
- `1 <= prices.length <= 10^5`
- `1 <= prices[i] <= 10^5`

## Hints

<details>
<summary>Hint 1 — connection to "Previous Greater Element"</summary>

The span for day `i` = `i - (index of previous greater price)`.

Finding the previous greater element for each day is the "Previous Greater Element" problem — a monotonic stack.

Maintain a decreasing stack (of indexes). For each day `i`:
- Pop indexes from the stack where `prices[stack.top()] <= prices[i]` (they're smaller, they don't limit the span).
- If stack is empty: span = `i + 1` (price is the highest so far, spans back to day 0).
- Otherwise: span = `i - stack.top()`.
- Push `i`.
</details>

<details>
<summary>Hint 2 — trace [100, 80, 60, 70, 60, 75, 85]</summary>

```
Stack stores indexes.

i=0, p=100: stack empty → span=1. push 0. stack=[0]
i=1, p=80:  p[0]=100 > 80, stop. span=1-0=1. push 1. stack=[0,1]
i=2, p=60:  p[1]=80 > 60, stop. span=2-1=1. push 2. stack=[0,1,2]
i=3, p=70:  p[2]=60 ≤ 70, pop 2.
            p[1]=80 > 70, stop. span=3-1=2. push 3. stack=[0,1,3]
i=4, p=60:  p[3]=70 > 60, stop. span=4-3=1. push 4. stack=[0,1,3,4]
i=5, p=75:  p[4]=60 ≤ 75, pop 4.
            p[3]=70 ≤ 75, pop 3.
            p[1]=80 > 75, stop. span=5-1=4. push 5. stack=[0,1,5]
i=6, p=85:  p[5]=75 ≤ 85, pop 5.
            p[1]=80 ≤ 85, pop 1.
            p[0]=100 > 85, stop. span=6-0=6. push 6. stack=[0,6]
```
Result: [1,1,1,2,1,4,6] ✅
</details>

## Write your solution
→ [`../solutions/33-stock-span.js`](../solutions/33-stock-span.js)

## Follow-ups
- What if you want the span going **forward** (days after today where price ≤ today's price)? How does the algorithm change?
- Online version: prices arrive one at a time (streaming). Can you process each price in O(1) amortized time as it arrives? (Yes — just maintain the monotonic stack persistently.)
