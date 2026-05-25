# Q16 — Daily Temperatures

**Difficulty:** Medium
**Pattern:** Monotonic stack (decreasing)
**Expected:** O(n) time · O(n) space

## Problem

Given an array `temperatures` where `temperatures[i]` is the temperature on day `i`, return an array `answer` where `answer[i]` is the number of days you have to wait after day `i` to get a warmer temperature. If there is no future warmer day, `answer[i] = 0`.

## Examples

### Example 1
```
Input:  temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
Output: [1, 1, 4, 2, 1, 1, 0, 0]
```
- Day 0 (73°): next warmer is day 1 (74°) → wait 1 day.
- Day 2 (75°): next warmer is day 6 (76°) → wait 4 days.
- Day 6 (76°): no warmer day → 0.

### Example 2
```
Input:  [30, 40, 50, 60]
Output: [1, 1, 1, 0]
```

### Example 3
```
Input:  [30, 60, 90]
Output: [1, 1, 0]
```

### Example 4
```
Input:  [90, 80, 70, 60]
Output: [0, 0, 0, 0]
```

## Constraints
- `1 <= temperatures.length <= 10^5`
- `30 <= temperatures[i] <= 100`

## Hints

<details>
<summary>Hint 1 — brute force first</summary>

For each day `i`, scan forward until you find a day `j` where `temperatures[j] > temperatures[i]`. Set `answer[i] = j - i`. This is O(n²) and will time out on the large constraint.
</details>

<details>
<summary>Hint 2 — the monotonic stack insight</summary>

This is exactly the "next greater element" problem from Lesson 9 of the notes — just asking for the **distance** rather than the value.

Maintain a stack of **indexes** (not temperatures) of days that are still waiting for a warmer day. The stack is always decreasing in temperature from bottom to top (temperatures at the bottom are warmer; temperatures at the top are cooler and waiting to be resolved).

When you process day `i`:
- While the stack is not empty AND `temperatures[i] > temperatures[stack.top()]`:
  - Pop the index `j`. Day `j`'s answer is `i - j`.
- Push `i` onto the stack.
</details>

<details>
<summary>Hint 3 — trace through [73, 74, 75, 71, 69, 72, 76, 73]</summary>

```
i=0, temp=73: stack empty → push 0.     Stack: [0]
i=1, temp=74: 74>73 → pop 0, ans[0]=1. Stack: [], push 1. Stack: [1]
i=2, temp=75: 75>74 → pop 1, ans[1]=1. Stack: [], push 2. Stack: [2]
i=3, temp=71: 71≤75 → push 3.          Stack: [2,3]
i=4, temp=69: 69≤71 → push 4.          Stack: [2,3,4]
i=5, temp=72: 72>69 → pop 4, ans[4]=1.
              72>71 → pop 3, ans[3]=2.
              72≤75 → stop. Push 5.     Stack: [2,5]
i=6, temp=76: 76>72 → pop 5, ans[5]=1.
              76>75 → pop 2, ans[2]=4.
              stack empty → push 6.     Stack: [6]
i=7, temp=73: 73≤76 → push 7.          Stack: [6,7]
End: indexes 6,7 remain → ans[6]=ans[7]=0.
```
Answer: [1,1,4,2,1,1,0,0] ✅
</details>

## Write your solution
→ [`../solutions/16-daily-temperatures.js`](../solutions/16-daily-temperatures.js)

## Follow-ups
- **Next Greater Element I & II** (Q17) — the direct sibling problem.
- What if you wanted the previous warmer temperature instead of the next?
- Stock span problem (Q33) is a close cousin.
